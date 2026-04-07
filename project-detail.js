const stages = {
  1: {
    index: '01',
    time: '2026-01-24 ~ 2026-01-25',
    title: 'ofd2pdf：第一次做完整功能闭环',
    summary: '上传、校验、预览、导出，全链路打通。重点是“可用流程”而不是“功能堆砌”。',
    bullets: ['学会流程化设计而非单点功能', '重视异常提示与操作反馈', '形成产品化思维雏形'],
    tags: ['流程闭环', '错误处理', '产品化'],
    image: './assets/stage01-ofd2pdf.jpg',
    link: './index.html#chapter-1',
  },
  2: {
    index: '02',
    time: '2026-01-26 ~ 2026-01-27',
    title: '亲戚相册：从功能到场景',
    summary: '开始真正以用户场景定义需求：拍照、语音、分类、检索，围绕“春节认亲”痛点组织功能。',
    bullets: ['从“我想做什么”转向“用户怎么用”', 'PRD先行，编码后置', '建立场景驱动需求逻辑'],
    tags: ['场景建模', 'PRD思维', '路径设计'],
    image: './assets/stage02-relative-album.png',
    link: './index.html#chapter-2',
  },
  3: {
    index: '03',
    time: '2026-02-01 ~ 2026-02-22',
    title: '食遇记：从V1到V2的迭代能力',
    summary: '寒假最完整项目：文案、交互、持久化、定位、包体、发布全链条持续优化。',
    bullets: ['形成“问题定位 → 修复验证 → 复盘沉淀”循环', '工程性与体验性并重', '完成可交付版本意识建立'],
    tags: ['迭代能力', '工程修复', '可交付'],
    image: './assets/stage03-snapfood.jpg',
    link: './index.html#chapter-3',
  },
  4: {
    index: '04',
    time: '2026-02-19 ~ 2026-02-22',
    title: '导师筛选网站：逻辑可信优先',
    summary: '开始做“决策工具”而非展示页。推荐要可解释，路径要连贯，移动端阅读要高效。',
    bullets: ['业务逻辑优先级超过视觉装饰', '关键路径优化：先看详情再跳官网', '真机反馈驱动迭代'],
    tags: ['推荐逻辑', '信息层级', '移动体验'],
    image: './assets/stage04-mentor-site.png',
    link: './index.html#chapter-4',
  },
  5: {
    index: '05',
    time: '2026-02-21 ~ 2026-03-20',
    title: '套样机工具：把重复劳动自动化',
    summary: '通过 Node + Sharp + Web 面板，实现从输入截图到样机输出的一键流程，进入工具化生产阶段。',
    bullets: ['手工操作转为可复用脚本', '搭建任务管理与日志可视化', '形成“重复任务先自动化”原则'],
    tags: ['自动化', '工具开发', '批处理'],
    image: './assets/stage05-mockup-tool.png',
    link: './index.html#chapter-5',
  },
  6: {
    index: '06',
    time: '2026-03',
    title: 'VSCode写论文：能力迁移到学术工作流',
    summary: '用脚本处理图表、文本与数据整理，让科研写作变得可追踪、可复现、可维护。',
    bullets: ['从开发场景迁移到学术场景', '减少机械搬运，提高一致性', '建立“写作也可工程化”观念'],
    tags: ['流程化写作', '脚本支持', '可复核'],
    image: './assets/stage06-paper-workflow.jpg',
    link: './index.html#chapter-6',
  },
  7: {
    index: '07',
    time: '2026-03-12 ~ 2026-03-27',
    title: '教材与本子：写作流程工程化',
    summary: '建立 SOP、口径统一、版本管理和质检机制，写作从“个人发挥”走向“团队可执行流程”。',
    bullets: ['标准化流程：校准→契约→映射→质检→复盘', '降低返工，提升产出稳定性', '工程思维跨领域落地'],
    tags: ['SOP', '版本管理', '质量控制'],
    image: './assets/stage07-textbook.png',
    link: './index.html#chapter-7',
  },
  8: {
    index: '08',
    time: '2026-03-23 ~ 2026-03-26',
    title: 'AI计划大师：让系统管理学习',
    summary: 'Python 自动发邮件计划，把“计划制定-任务投递-执行提醒”串成系统闭环。',
    bullets: ['从作品型开发升级为系统型设计', '把重复决策交给自动化流程', '为长期成长建立可持续机制'],
    tags: ['自动提醒', '系统闭环', '长期复利'],
    image: './assets/stage08-plan-master.png',
    link: './index.html#chapter-8',
  },
};

const params = new URLSearchParams(window.location.search);
const stageParam = Number(params.get('stage'));
const stage = stages[stageParam] || stages[1];

const detailIndex = document.getElementById('detailIndex');
const detailTime = document.getElementById('detailTime');
const detailTitle = document.getElementById('detailTitle');
const detailSummary = document.getElementById('detailSummary');
const detailImage = document.getElementById('detailImage');
const detailBullets = document.getElementById('detailBullets');
const detailTags = document.getElementById('detailTags');
const detailLink = document.getElementById('detailLink');

detailIndex.textContent = stage.index;
detailTime.textContent = stage.time;
detailTitle.textContent = stage.title;
detailSummary.textContent = stage.summary;
detailImage.src = stage.image;
detailImage.alt = stage.title;
detailBullets.innerHTML = stage.bullets.map((item) => `<li>${item}</li>`).join('');
detailTags.innerHTML = stage.tags.map((tag) => `<span class="detail-tag">${tag}</span>`).join('');
detailLink.href = stage.link;

document.title = `${stage.title}｜项目详情`;
