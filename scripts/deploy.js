/* 部署脚本：themes/*.json -> 各 ST 实例 data/default-user/themes/
 * 复制 + 清理同名残留（name 字段相同但文件名不同的旧文件——曾因 "Nord Storm.json"
 * 与 "Nord-Storm.json" 同名残留导致 Luker 加载旧版）+ md5 验证
 *
 * 用法: node scripts/deploy.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const THEMES = ['Nord.json', 'Nord-Storm.json'];

// 各实例主题目录（第一个是主实例）
const TARGETS = [
  { name: '8001 Luker', dir: 'D:/Luker/data/default-user/themes' },
  { name: '8000 ST 1.18', dir: 'D:/SillyTavern-1.18.0/data/default-user/themes' },
  { name: 'NAS', dir: '//nas/sillytavern/data/default-user/themes' },
];

const md5 = (p) => crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');

// 读本地产物，记 name -> 文件名 映射，用于清理目标目录里同名变体残留
const local = {};
for (const t of THEMES) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'themes', t), 'utf8'));
  local[d.name] = t;
}

let fail = 0;
for (const target of TARGETS) {
  console.log(`== ${target.name}: ${target.dir}`);
  if (!fs.existsSync(target.dir)) { console.log('  目录不存在，跳过'); continue; }

  // 1) 清理同名残留：目标目录里 name 字段等于本地主题名、但文件名不同的文件
  for (const f of fs.readdirSync(target.dir)) {
    if (!f.endsWith('.json')) continue;
    const fp = path.join(target.dir, f);
    let name;
    try { name = JSON.parse(fs.readFileSync(fp, 'utf8')).name; } catch { continue; }
    if (local[name] && local[name] !== f) {
      console.log(`  清理残留: ${f}（name="${name}"，与 ${local[name]} 重名）`);
      fs.unlinkSync(fp);
    }
  }

  // 2) 复制 + 验证
  for (const t of THEMES) {
    const src = path.join(ROOT, 'themes', t);
    const dst = path.join(target.dir, t);
    fs.copyFileSync(src, dst);
    const ok = md5(src) === md5(dst);
    if (!ok) fail++;
    console.log(`  ${t}: ${ok ? 'OK' : 'MD5 不一致!'}`);
  }
}

console.log(fail ? `部署完成，${fail} 个文件校验失败!` : '部署完成，全部校验通过。');
process.exit(fail ? 1 : 0);
