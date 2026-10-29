/**
 * English source text → Chinese, for the signed-in shell and the sign-in and
 * setup screens. Keys are the exact English strings the components carry:
 * changing one up there means changing the key here, and an entry that falls
 * out of step simply stops applying (the page shows English again) rather than
 * breaking.
 *
 * Placeholders are `{name}`, the same as in the English.
 */
export const ZH: Record<string, string> = {
  // Navigation and the signed-in shell.
  Home: "首页",
  Catalog: "应用中心",
  Jobs: "任务",
  Settings: "设置",
  "Your apps": "我的应用",
  "Expand sidebar": "展开侧边栏",
  "Collapse sidebar": "收起侧边栏",
  "Open navigation": "打开导航",
  "Filter your apps": "筛选我的应用",
  "Filter apps": "筛选应用",
  "No app matches “{query}”.": "没有匹配“{query}”的应用。",
  "Settings pages": "设置页面",
  "Settings page": "设置页面",
  "Needs attention": "需要处理",

  // The status of an app in the sidebar (`home/attention.ts`).
  "Using far more than usual": "用量远高于平常",
  "Used up a free daily limit": "已用完每日免费额度",
  Paused: "已暂停",
  "Something did not finish": "有操作未完成",
  "Not responding": "无响应",
  "Update available": "有可用更新",
  "New version takes a reinstall": "新版本需要重新安装",

  // Settings pages, from `components/navigation.ts`.
  "Your account": "账户",
  "The Cloudflare account Appflare works in, and what it can run.":
    "Appflare 使用的 Cloudflare 账户，以及该账户能运行哪些应用。",
  "Building apps": "构建应用",
  "Build apps that have no ready-made release in your own account, including apps from private GitHub repositories.":
    "在自己的账户里构建没有现成发布版本的应用，包括来自私有 GitHub 仓库的应用。",
  Updates: "更新",
  "How your apps and Appflare itself stay up to date.": "应用与 Appflare 自身如何保持最新。",
  "Users and sign-in": "用户与登录",
  "Who can sign in to Appflare, and how.": "谁可以登录 Appflare，以及如何登录。",
  Domains: "域名",
  "Serve apps on hostnames in other people's DNS, through Cloudflare for SaaS on one of your domains.":
    "通过自有域名上的 Cloudflare for SaaS，让应用跑在别人 DNS 下的主机名上。",
  Notifications: "通知",
  "Send messages about updates, jobs and health to Telegram, Slack, Discord or your own webhook.":
    "把更新、任务和健康状态的消息推送到 Telegram、Slack、Discord 或你自己的 webhook。",
  Catalogs: "应用目录",
  "Where apps come from: the official catalog, and catalogs you add with their signing keys.":
    "应用的来源：官方目录，以及用签名密钥添加的自有目录。",
  "Removed apps": "已移除的应用",
  "Uninstalled apps whose data was kept in the account when they were uninstalled.":
    "卸载时保留了数据的应用。",
  "Anonymous report": "匿名报告",
  "The anonymous daily report Appflare can send.": "Appflare 可以发送的每日匿名报告。",

  // Sign-in.
  "Sign in": "登录",
  "Sign in to Appflare": "登录 Appflare",
  "Use your email and password, or a passkey.": "使用邮箱和密码，或使用通行密钥。",
  Email: "邮箱",
  Password: "密码",
  "Forgot your password?": "忘记密码？",
  "Sign in with a passkey": "使用通行密钥登录",
  "Add a passkey": "添加通行密钥",
  "Not now": "暂不",
  or: "或",
  "Step {step} of {count}": "第 {step} 步，共 {count} 步",
  "Set up Appflare": "设置 Appflare",
  "Appflare documentation": "Appflare 文档",

  // Home: the page, the empty state and an app's card.
  "What needs your attention, and the apps in this Cloudflare account.":
    "这里列出需要你处理的事项，以及这个 Cloudflare 账户里的应用。",
  "No apps installed yet": "还没有安装应用",
  "Install an app from the catalog. It runs in this Cloudflare account, and Appflare keeps it updated.":
    "从应用中心安装一个应用。它运行在这个 Cloudflare 账户里，Appflare 会持续为它更新。",
  "Browse the catalog": "浏览应用中心",
  Manage: "管理",
  "Manage {name}": "管理 {name}",
  Open: "打开",
  "Open {label}": "打开 {label}",
  "Open {host} in a new tab": "在新标签页打开 {host}",
  "Running · {version} · updated {when}": "运行中 · {version} · {when}更新",
  Installing: "安装中",
  Updating: "更新中",
  "Install did not finish": "安装未完成",
  "Removal did not finish": "移除未完成",
  "Being removed": "正在移除",
  "Last change did not finish": "上次变更未完成",

  // "Needs attention".
  "The most urgent first.": "最紧急的排在前面。",
  "Update all": "全部更新",
  "Each app's page shows its update as it runs.": "每个应用的更新进度会显示在它的页面上。",
  "Could not start the updates.": "无法启动更新。",
  "Go to Your account": "前往账户设置",
  "View log": "查看日志",
  "Install again": "重新安装",
  "Turn on": "开启",
  Review: "查看详情",
  Update: "更新",
  "Not needed": "不需要",
  "Update Appflare": "更新 Appflare",
  "See usage": "查看用量",
  "Check again": "重新检查",
  "Could not check the app.": "无法检查这个应用。",
  Done: "完成",
  "Show the steps": "展开步骤",

  // A failed job, as a sentence about its app.
  "Restoring the database of {label} did not finish": "恢复 {label} 的数据库未完成",
  "Deleting the kept data of {label} did not finish": "删除 {label} 保留的数据未完成",
  "Installing {label} did not finish": "安装 {label} 未完成",
  "Updating {label} did not finish": "更新 {label} 未完成",
  "Updating {label} to {version} did not finish": "把 {label} 更新到 {version} 未完成",
  "Removing {label} did not finish": "移除 {label} 未完成",
  "Rolling back {label} did not finish": "回滚 {label} 未完成",
  "Saving the settings of {label} did not finish": "保存 {label} 的设置未完成",
  "Pausing {label} did not finish": "暂停 {label} 未完成",
  "Resuming {label} did not finish": "恢复 {label} 未完成",
  "A change to {label} did not finish": "对 {label} 的一次变更未完成",
  "The app keeps running as it was. The log shows the step that failed and why.":
    "应用保持原样继续运行。日志里能看到失败的步骤和原因。",
  "It may still be running and using Cloudflare. The log shows the step that failed and why.":
    "它可能仍在运行并消耗 Cloudflare 用量。日志里能看到失败的步骤和原因。",
  "It stays paused; resume it again to carry on. The log shows the step that failed and why.":
    "它仍是暂停状态，再次恢复即可继续。日志里能看到失败的步骤和原因。",
  "The log shows the step that failed and why.": "日志里能看到失败的步骤和原因。",
  "{label} is not responding": "{label} 没有响应",
  "It answered its last check with an error.": "它上次健康检查返回了错误。",
  "It did not answer its last check. It may still have been starting up.":
    "它没有回应上次健康检查，可能当时还在启动。",
  "{label} must run behind Cloudflare Access": "{label} 必须运行在 Cloudflare Access 之后",
  "The catalog now says this app must run behind Cloudflare Access. Appflare never protects it on its own, and holds its updates until it is protected.":
    "应用目录现在要求这个应用必须运行在 Cloudflare Access 之后。Appflare 不会自行替它开启保护，在受保护之前会暂停它的更新。",
  "{label} {version} takes a reinstall": "{label} {version} 需要重新安装",
  "{label} {version} is available": "{label} {version} 已可用",
  "You have {version}.": "你当前是 {version}。",
  "Clean up the deploy copy": "清理部署副本",
  "The Deploy to Cloudflare button left a copy of Appflare connected to this account. A push to it would put that older Appflare back.":
    "“Deploy to Cloudflare”按钮在账户里留下了一份连接中的 Appflare 副本。向它推送代码会把旧版 Appflare 装回来。",
  "This Appflare ({version}) is older than its database":
    "这个 Appflare（{version}）比它的数据库旧",
  "A newer version set up this database, and an older one now runs{after}. Appflare keeps working, but what the newer version added is missing until you update again.":
    "更新版本建立了这个数据库，现在运行的却是旧版本{after}。Appflare 仍可工作，但更新版本新增的功能要等你再次升级后才会出现。",
  ", perhaps after a push to the deploy copy": "，可能是向部署副本推送代码造成的",

  // Home's "Usage" section.
  Usage: "用量",
  "This Cloudflare account, by app. Estimates from Cloudflare's analytics, a few minutes behind.":
    "这个 Cloudflare 账户按应用拆分的用量。数据来自 Cloudflare 分析，约有几分钟延迟。",
  "Usage could not be read just now. Reload the page to try again.":
    "暂时无法读取用量。刷新页面重试。",
  "Reconnect Cloudflare to see usage: Appflare needs permission to read Cloudflare's analytics.":
    "重新连接 Cloudflare 才能看到用量：Appflare 需要读取 Cloudflare 分析的权限。",
  "An admin can reconnect it.": "管理员可以重新连接。",
  "Appflare's API token needs permission to read Cloudflare's analytics before usage shows here.":
    "Appflare 的 API 令牌需要具备读取 Cloudflare 分析的权限，用量才会显示在这里。",
  "An admin can give it.": "管理员可以授予该权限。",
  "No usage in the last 7 days.": "最近 7 天没有用量。",
  "Reconnect Cloudflare": "重新连接 Cloudflare",
  "Cloudflare connection": "Cloudflare 连接",
  "{product} by app, per hour, {when}: {apps}.": "{product}按应用每小时用量，{when}：{apps}。",
  "Usage shows up about an hour after install": "用量大约在安装一小时后开始显示",
  "{name}: {product}, last 7 days. {line}.": "{name}：{product}，最近 7 天。{line}。",
  "({product}, last 7 days)": "（{product}，最近 7 天）",

  // The usage totals and chart captions.
  "Other apps": "其他应用",
  "Last 7 days{share}": "最近 7 天{share}",
  " · {percent} of {of}": " · 占 {of} 的 {percent}",
  "Usage this month": "本月用量",
  "Appflare's apps, past what the $5 plan includes (estimate)":
    "Appflare 所装应用超出 $5 套餐包含额度的部分（估算）",
  "Projected month": "本月预计",
  "Appflare's apps and the $5 plan, if the last day's pace holds":
    "按最后一天的用量推算，Appflare 应用加上 $5 套餐的总量",
  "Apps needing a look": "需要关注的应用",
  "Loops, limits and pauses": "死循环、限额与暂停",
  "Paused at {time}": "已于 {time} 暂停",
  "Paused on {time}": "已于 {time} 暂停",
  "Burning now": "当前消耗",
  "Mostly {label}": "主要来自 {label}",
  "At list price, before included usage": "按标价计算，未扣除含额度",
  "Can be billed": "可能产生费用",
  "R2 bills past its free amount, even on Free: {amount} by the month's end at this pace":
    "R2 超出免费额度就会计费，免费套餐也一样：按此速度月底约 {amount}",
  "$0 so far": "目前 $0",
  "On pace for {amount} (R2): R2 bills past its free amount, even on Free":
    "按此速度将达到 {amount}（R2）：R2 超出免费额度就会计费，免费套餐也一样",
  "Free plan: Cloudflare stops apps at the daily limits":
    "免费套餐：达到每日限额后 Cloudflare 会停止应用",
  "Not charted: {other}, {amount} today, {share} of today's free limit.":
    "未计入图表：{other}，今日 {amount}，占今日免费额度的 {share}。",
  "Closest daily limit": "最接近的每日限额",
  "{product}, counted for the whole account": "{product}，按整个账户统计",
  "{product}: {share} of the limit is {other}": "{product}：限额的 {share} 来自{other}",

  // Pause and Resume.
  "{action}: {label}": "{action}：{label}",
  "Pause {label}": "暂停 {label}",
  "It stops using Cloudflare until you resume it.": "在你恢复之前，它会停止消耗 Cloudflare 用量。",
  "Pausing {label}": "正在暂停 {label}",
  "It stops within a few seconds. Resume it when the cause is fixed.":
    "它会在几秒内停止。原因解决后再恢复它。",
  "Visitors see a “paused” page and its scheduled work stops. Its data stays as it is. Resume it from Home or its Usage tab.":
    "访客会看到“已暂停”页面，定时任务也会停止。数据保持原样。可以在首页或它的“用量”标签页恢复。",
  "Resuming {label}": "正在恢复 {label}",
  "Its cap is set aside until it resets. The loop check still runs.":
    "它的额度上限会被暂时搁置，直到重置。死循环检查仍会运行。",
  "The loop check still runs: if it loops again, Appflare pauses it again.":
    "死循环检查仍会运行：如果它再次陷入死循环，Appflare 会再次暂停它。",
  "Resume: {label}": "恢复：{label}",
  "Could not resume the app.": "无法恢复这个应用。",
  Resume: "恢复",
  "Resume {label}": "恢复 {label}",
  "Resume until the cap resets": "恢复，直到额度重置",
  "To keep a cap,": "如果要保留上限，",
  "change it": "请修改它",
  "instead.": "。",
  "Pause app": "暂停应用",
  Pause: "暂停",

  // Spend protection rows.
  "{product} at {amount} an hour": "{product} 每小时 {amount}",
  "{times} its normal": "达到平时的 {times}",
  "far above its normal": "远高于平时",
  "{rate} since {time}": "{rate}（自 {time} 起）",
  "with no usual week yet to compare with": "还没有可比的平时周用量",
  "with no usual usage to compare against yet": "还没有可比的平时用量",
  "{rate}, {noNormal}.": "{rate}，{noNormal}。",
  "Since {time}, {noNormal}.": "自 {time} 起，{noNormal}。",
  "{rate}, {normal}.": "{rate}，{normal}。",
  "Since {time}, its usage is {normal}.": "自 {time} 起，用量{normal}。",
  " About {burn} an hour at Cloudflare's prices{spent}.":
    " 按 Cloudflare 价格约每小时 {burn}{spent}。",
  ", {spent} so far today": "，今天已用 {spent}",
  " At this pace it uses {share} of today's free {product}.":
    " 按此速度会占掉今日免费 {product} 的 {share}。",
  " Sent to {to}.": " 已通知 {to}。",
  "Unusual usage": "用量异常",
  "{label} is new and already using a lot": "{label} 刚装好，用量就已经很高",
  "{label} is already using a lot": "{label} 的用量已经很高",
  "{label} is using far more than usual": "{label} 的用量远高于平时",
  ", {share} of them by {other}": "，其中 {share} 来自{other}",
  ", {share} of them by {label}{other}": "，其中 {share} 来自{label}{other}",
  " and {share} by {other}": "，{share} 来自{other}",
  "{label} went into a loop at {time} and used this account's {limit} for today.":
    "{label} 在 {time} 陷入死循环，用光了本账户今日的 {limit}。",
  "This account used its {limit} for today{shares}.": "本账户用光了今日的 {limit}{shares}。",
  "Limit reached": "已达上限",
  "Today's free {product} are used up": "今日免费的 {product} 已用尽",
  "Cloudflare refuses more until 00:00 UTC, so {effect} until then. The Free plan bills nothing; pausing stops it happening again tomorrow.":
    "在 UTC 00:00 之前 Cloudflare 会拒绝更多请求，因此在此之前{effect}。免费套餐不会产生费用；暂停应用可以避免明天再次发生。",
  "{label} is paused": "{label} 已暂停",
  '{by} paused it at {time}{after}. Visitors see a "paused" page until it is resumed.':
    "{by} 在 {time} 暂停了它{after}。在恢复之前，访客会看到“已暂停”页面。",
  " after unusual usage that began at {time}": "，此前从 {time} 开始的用量异常",
  "Appflare paused {label}": "Appflare 暂停了 {label}",
  "Appflare paused it at {time}.": "Appflare 在 {time} 暂停了它。",
  "{share} of today's {product} is {other}.": "今日 {product} 的 {share} 来自{other}。",
  "{label} is getting {share} of today's {product}{other}.":
    "{label} 占用了今日 {product} 的 {share}{other}。",
  "; {share} is {other}": "，其中 {share} 来自{other}",
  "Free {product} run out around {time}": "免费 {product} 预计在 {time} 左右用完",
  "When the account's {count} free {product} for the day are used, {effect} until 00:00 UTC.":
    "账户每日 {count} 的免费 {product} 用完之后，到 UTC 00:00 之前{effect}。",
  "Near a free limit": "接近免费额度",
  'Visitors see a "paused" page. Resume it when its cap resets, or change the cap on its Usage tab.':
    "访客会看到“已暂停”页面。等额度重置后恢复它，或在它的“用量”标签页修改上限。",
  'Visitors see a "paused" page. Resume it when the budget allows, or exempt it from the budget on its Usage tab.':
    "访客会看到“已暂停”页面。等预算允许时恢复它，或在它的“用量”标签页把它移出预算。",
  'Visitors see a "paused" page. Resume when the cause is fixed, for example by undoing the settings change that started it.':
    "访客会看到“已暂停”页面。原因解决后再恢复，例如撤销触发它的那次设置改动。",
  "every app stops answering": "所有应用都会停止响应",
  "apps that need them fail": "需要它们的应用会失败",
  "It's still past its {period} cap: {spent}{amount}.": "它仍超出{period}上限：{spent}{amount}。",
  "Resumed as it is, auto-pause would pause it again within 5 minutes. Resuming sets the cap aside until it resets at {time}; the loop check keeps running.":
    "按原样恢复的话，自动暂停会在 5 分钟内再次暂停它。恢复会把上限搁置到 {time} 重置为止；死循环检查仍会运行。",
  "{count} free {product}": "{count} 免费 {product}",
  daily: "每日",
  weekly: "每周",
  monthly: "每月",
  "other usage in this account (not Appflare apps)": "本账户的其他用量（非 Appflare 应用）",

  // Product names, as they read inside a sentence.
  "Worker requests": "Worker 请求",
  "Worker CPU time": "Worker CPU 时间",
  "Durable Objects requests": "Durable Objects 请求",
  "Durable Objects duration": "Durable Objects 时长",
  "Durable Objects rows read": "Durable Objects 读取行数",
  "Durable Objects rows written": "Durable Objects 写入行数",
  "Durable Objects storage": "Durable Objects 存储",
  "D1 rows read": "D1 读取行数",
  "D1 rows written": "D1 写入行数",
  "D1 storage": "D1 存储",
  "KV reads": "KV 读取",
  "KV writes": "KV 写入",
  "KV deletes": "KV 删除",
  "KV lists": "KV 列表",
  "KV storage": "KV 存储",
  "R2 class A operations": "R2 A 类操作",
  "R2 class B operations": "R2 B 类操作",
  "R2 storage": "R2 存储",
  "Queue operations": "队列操作",
  "Workflow steps": "Workflow 步骤",
  "Workers AI neurons": "Workers AI 神经元",
  "Vectorize queried dimensions": "Vectorize 查询维度",
  "Vectorize stored dimensions": "Vectorize 存储维度",
  "Analytics Engine data points": "Analytics Engine 数据点",
  "Browser Run hours": "Browser Run 小时",
  "Container memory": "容器内存",
  "Container CPU": "容器 CPU",
  "Container disk": "容器磁盘",
  "Workers Logs events": "Workers Logs 事件",

  // Settings > Catalogs.
  "Each catalog lists apps, and Appflare checks every release it installs from one with that catalog's keys.":
    "每个目录提供一批应用，Appflare 会用该目录自己的密钥校验从它安装的每一个版本。",
  "Could not change the catalog.": "无法修改这个目录。",
  On: "开",
  Off: "关",
  "The catalog Appflare ships with. Its releases are verified with the keys built into Appflare. It can be turned off, not removed.":
    "Appflare 自带的目录。它的发布版本用内置在 Appflare 里的密钥校验。可以关闭，但不能删除。",
  "Added by an admin. Its releases are verified with the keys pinned below, and with no other key.":
    "由管理员添加。它的发布版本只用下面固定的密钥校验，不接受其他密钥。",
  "While it is off, its apps are not listed and apps installed from it get no updates.":
    "关闭期间，它的应用不会列出，从它安装的应用也不会再收到更新。",
  "Index URL": "索引地址",
  Key: "密钥",
  Keys: "密钥",
  "None recorded": "未记录",
  Apps: "应用数",
  "Not loaded yet": "尚未加载",
  "Installed from it": "已安装数量",
  "Last refreshed": "上次刷新",
  "Last attempt failed:": "上次尝试失败：",
  Added: "添加时间",
  "Actions for {label}": "{label} 的操作",
  Edit: "编辑",
  Remove: "移除",
  "The fingerprint could not be worked out in this browser.": "无法在这个浏览器里计算指纹。",
  "Remove a catalog first.": "请先移除一个目录。",
  "Add catalog": "添加目录",
  "Check the URL.": "请检查地址。",
  "Check the label.": "请检查名称。",
  "Paste the catalog's public key.": "请粘贴这个目录的公钥。",
  "{label} added": "已添加 {label}",
  '{slug} {version} verified with the key "{keyId}".':
    "{slug} {version} 已用密钥“{keyId}”校验通过。",
  "Could not save the catalog.": "无法保存这个目录。",
  "Add a catalog": "添加目录",
  "Edit {label}": "编辑 {label}",
  "Get the index URL and the public key from the catalog's owner. Saving loads the index and verifies one of its releases with the key before the catalog is added.":
    "向目录的维护者索取索引地址和公钥。保存时会先加载索引，并用这把公钥校验它的一个发布版本，通过后才添加。",
  "A new index URL or key is checked the same way before it is saved.":
    "修改后的索引地址或公钥也会用同样的方式校验，通过后才保存。",
  "Public key": "公钥",
  "Paste the line the catalog publishes. Only releases signed with this key are installed from it.":
    "粘贴目录公布的公钥。只有用这把密钥签名的版本才会从这里安装。",
  Fingerprint: "指纹",
  "{count} fingerprints": "{count} 个指纹",
  "Compare it with the fingerprint the catalog's owner published, somewhere you already trust, before you save.":
    "保存前，请与你已经信任的渠道上、目录维护者公布的指纹核对一致。",
  Label: "名称",
  "Acme internal": "公司内部",
  "Shown on its apps' source badge.": "显示在它的应用来源徽章上。",
  Colour: "颜色",
  "Badge:": "徽章：",
  Cancel: "取消",
  "Check and add": "校验并添加",
  Save: "保存",
  "Remove {label}": "移除 {label}",
  "1 app is installed from {label}. Its updates, form revisions and checks come from this catalog, and its key verifies them, so it cannot be removed while it is installed. Uninstall it first, or turn the catalog off instead.":
    "有 1 个应用是从 {label} 安装的。它的更新、表单修订和检查都来自这个目录，并由该目录的密钥校验，所以只要它还装着就无法移除。请先卸载它，或者改为关闭这个目录。",
  "{count} apps are installed from {label}. Their updates, form revisions and checks come from this catalog, and its key verifies them, so it cannot be removed while they are installed. Uninstall them first, or turn the catalog off instead.":
    "有 {count} 个应用是从 {label} 安装的。它们的更新、表单修订和检查都来自这个目录，并由该目录的密钥校验，所以只要它们还装着就无法移除。请先卸载，或者改为关闭这个目录。",
  "Its apps leave the catalog page and its key is no longer trusted. Nothing is uninstalled. You can add it again later.":
    "它的应用会从目录页消失，它的密钥也不再被信任。不会卸载任何东西。之后可以重新添加。",
  "Remove catalog": "移除目录",

  // Settings > Updates: Appflare itself.
  "The release feed lists no Appflare release yet.": "发布源里还没有 Appflare 的发布版本。",
  "Could not check for updates.": "无法检查更新。",
  "Check now": "立即检查",
  "Up to date": "已是最新",
  "The version of Appflare running here, its newest release, and whether it updates itself.":
    "这里运行的 Appflare 版本、它的最新发布版本，以及它是否会自动更新。",
  "Running version": "运行版本",
  "Latest release": "最新发布版本",
  "None found yet": "尚未找到",
  published: "发布于",
  "Last checked": "上次检查",
  "View update log": "查看更新日志",
  "Update Appflare to {version}": "更新 Appflare 到 {version}",
  "Appflare update started": "Appflare 更新已开始",
  "From {from}. Appflare keeps the current version for a rollback.":
    "从 {from} 升级。Appflare 会保留当前版本以便回滚。",
  "Appflare uploads the new version next to the current one; the current one keeps serving.":
    "Appflare 会把新版本上传到当前版本旁边，当前版本继续提供服务。",
  "It checks the new version's preview: it must report version {version} and a working database. That first request already migrates Appflare's database to the new version's schema, before the switch; migrations only add to it, so the current version keeps working with it.":
    "然后它会检查新版本的预览：新版本必须报告版本 {version} 且数据库可用。这个首次请求会在切换之前就把 Appflare 的数据库迁移到新版本的结构；迁移只会新增内容，所以当前版本仍能继续用它。",
  "Then it switches all traffic to the new version. The page you are on reloads by itself once the new version answers.":
    "接着它会把所有流量切到新版本。新版本开始响应后，你当前所在的页面会自动刷新。",
  "Nothing else runs during the update: installs, updates, and uninstalls wait until it finishes. If the new version fails its check, the current one keeps serving. To go back later, roll back under":
    "更新期间不会执行其他任务：安装、更新和卸载都会等它结束。如果新版本检查不通过，当前版本继续提供服务。之后要回退，请在",
  ".": "里回滚。",

  // Settings > Removed apps.
  "Apps that were uninstalled but kept some of their data in the account.":
    "已卸载、但还在这账户里保留了一些数据的应用。",
  "No removed apps": "没有已移除的应用",
  "No uninstalled app that keeps data is listed. Apps you forgot are not listed here even when they still keep data; their own pages show what they kept.":
    "这里不会列出保留着数据的已卸载应用。被你“忽略”的应用即使仍保留数据也不会出现在这里；它们自己的页面会显示保留了什么。",
  Deleting: "删除中",
  "{name}, Worker {worker}, uninstalled": "{name}，Worker {worker}，卸载于",
  "Kept in the account": "在本账户中保留的资源",
  "Deleting the kept data did not finish": "删除保留的数据未完成",
  "The job failed.": "任务失败。",

  // What a Cloudflare resource is called (`components/format.ts`).
  "KV namespace": "KV 命名空间",
  "D1 database": "D1 数据库",
  "R2 bucket": "R2 存储桶",
  Queue: "队列",
  "Queue consumer": "队列消费者",
  "Vectorize index": "Vectorize 索引",
  "Hyperdrive configuration": "Hyperdrive 配置",
  "Replaced Hyperdrive configuration": "已替换的 Hyperdrive 配置",
  "Pipelines stream": "Pipelines 流",
  "Pipelines sink": "Pipelines 接收端",
  Pipeline: "Pipeline",
  "R2 Data Catalog": "R2 数据目录",
  "Durable Object class": "Durable Object 类",
  Workflow: "Workflow",
  "Cron trigger": "定时触发器",
  Secret: "密钥",
  "workers.dev route": "workers.dev 路由",
  "Rate limit": "速率限制",
  "Custom domain": "自定义域名",
  "External domain": "外部域名",
  "Wildcard domain": "通配域名",
  "DNS record": "DNS 记录",
  "Workers route": "Workers 路由",
  "Email route": "邮件路由",
  "Access service token": "Access 服务令牌",
  "Access application": "Access 应用",

  // What a job is doing (`components/format.ts`).
  Install: "安装",
  Uninstall: "卸载",
  Rollback: "回滚",
  "Appflare update": "Appflare 更新",
  "Settings change": "设置变更",
  "Enable sandbox builds": "启用沙盒构建",
  "Update sandbox builds": "更新沙盒构建",
  "Disable sandbox builds": "停用沙盒构建",
  "Appflare rollback": "Appflare 回滚",
  "Build for review": "构建以供审核",
  "Move Appflare's address": "迁移 Appflare 地址",

  // The same names as chart tabs, where they are shorter.
  "CPU time": "CPU 时间",
  "DO duration": "DO 时长",
  "DO rows read": "DO 读取行数",
  "DO rows written": "DO 写入行数",
  "R2 class A": "R2 A 类",
  "R2 class B": "R2 B 类",
  Queues: "队列",

  // ── The rest of the manager, one section per screen ──────────────────────
  Name: "名称",
  "Turn off": "关闭",
  Source: "来源",
  "Reading the account's domains…": "正在读取账户的域名…",
  "Copy it now": "立即复制",
  Details: "详情",
  "Protect with Cloudflare Access": "用 Cloudflare Access 保护",
  Worker: "Worker",
  "Cloudflare API token": "Cloudflare API 令牌",
  "External domains": "外部域名",
  Sponsored: "推广",
  Actions: "操作",
  "Appflare version": "Appflare 版本",
  "Go back to workers.dev": "回到 workers.dev",
  "Worker version": "Worker 版本",
  "Containers pricing": "Containers 定价",
  "Technical details": "技术细节",
  Job: "任务",
  Resources: "资源",
  Status: "状态",
  "Started by": "发起人",
  Started: "开始时间",
  Finished: "结束时间",
  App: "应用",
  "Usage by product": "按产品的用量",
  "Monthly budget": "每月预算",
  "Change the default": "修改默认值",
  "Zero Trust team": "Zero Trust 团队",
  "Checking the token and the Zero Trust organization…": "正在校验令牌和 Zero Trust 组织…",
  Address: "地址",
  "Turn off Cloudflare Access": "关闭 Cloudflare Access",
  "Make public": "设为公开",
  Secrets: "密钥",
  "The current value stays until the new one is saved.": "保存新值之前，当前值保持不变。",
  Dismiss: "忽略",
  "Branch, tag or commit": "分支、标签或提交",
  "Sandbox builds are off, and Appflare cannot turn them on":
    "沙盒构建已关闭，而且 Appflare 无法开启它",
  Add: "添加",
  License: "许可证",
  "Create a user token instead": "改为创建一个用户令牌",
  "Stored as an encrypted secret on this Worker. Appflare never shows it again.":
    "以加密密钥的形式保存在这个 Worker 上。Appflare 之后不会再显示它。",
  "Some permissions could not be confirmed": "部分权限无法确认",
  "Add domain": "添加域名",
  "Remove domain": "移除域名",
  "Add wildcard domain": "添加通配域名",
  "Cloudflare connection settings": "Cloudflare 连接设置",
  "Part of the app's email is not set up": "应用的邮件功能有一部分还没配置好",
  "Set up email again": "重新配置邮件",
  "Hostnames in DNS outside this account, such as a customer's domain.":
    "本账户之外 DNS 里的主机名，例如客户自己的域名。",
  Type: "类型",
  "Not set up": "未配置",
  "Gateway domain": "网关域名",
  "Add token": "添加令牌",
  "Search your domains…": "搜索你的域名…",
  "Worker name": "Worker 名称",
  Reload: "重新加载",
  Created: "创建时间",
  "Roll back": "回滚",
  URL: "URL",
  Kind: "类型",
  "Add passkey": "添加通行密钥",
  "Deleting data is permanent": "删除数据是不可恢复的",
  "Stays in the account": "保留在账户中",
  Rename: "重命名",
  Repository: "仓库",
  "its job log": "它的任务日志",
  "Update sandbox": "更新沙盒",
  "No preview check for this update": "这次更新不做预览检查",
  "Update without checking the new version first": "不检查新版本，直接更新",
  "Email changes with this version": "这个版本会改动邮件设置",
  "New secrets": "新的密钥",
  Versions: "版本历史",
  Subdomain: "子域名",
  "Rotate the auth secret": "轮换认证密钥",
  "Remove Appflare from this account": "从本账户移除 Appflare",
  "Notification channels": "通知渠道",
  "Remove Appflare": "移除 Appflare",
  "App not found": "找不到这个应用",
  "Email in the app's settings": "应用设置里的邮件",
  "danger zone": "危险区",
  "Job history": "任务历史",
  Binding: "绑定",
  Version: "版本",
  Built: "构建时间",
  "Built from": "构建自",
  "The catalog is unavailable": "应用目录不可用",
  "The catalog is unavailable.": "应用目录不可用。",
  "Refresh the list of apps": "刷新应用列表",
  "The link may be wrong.": "链接可能有误。",
  "Throw away": "丢弃",
  Log: "日志",
  "Back to sign in": "返回登录",
  "Password changed": "密码已修改",
  "New password": "新密码",
  "Pause automatically": "自动暂停",
  "Pause apps automatically": "自动暂停应用",
  "Open the manager": "打开管理面板",
  "Locked out?": "被挡在外面了？",
  "Cloudflare Access settings": "Cloudflare Access 设置",
  ". If that page cannot be reached:": "。如果打不开那个页面：",
  "Whether apps update on their own when a new version needs nothing from you.":
    "当新版本不需要你做任何事时，应用是否自动更新。",
  "Only admins can change it.": "只有管理员可以修改。",
  "Choose plan": "选择套餐",
  "Appflare cannot read the plan from Cloudflare, so it uses the one you choose here.":
    "Appflare 无法从 Cloudflare 读取套餐，因此使用你在这里选择的那个。",
  "Protect this manager with Cloudflare Access, in front of its sign-in page.":
    "用 Cloudflare Access 保护这个管理面板，挡在它的登录页之前。",
  "Put this manager behind Cloudflare Access. Before anyone reaches the sign-in page, Access asks them to prove they own an admin's email. Appflare then checks the Access token on every request and refuses the rest. The health check at /api/health stays open.":
    "把这个管理面板放到 Cloudflare Access 之后。在任何人到达登录页之前，Access 会先要求他证明自己拥有某个管理员的邮箱。之后 Appflare 会校验每个请求上的 Access 令牌，其余一律拒绝。/api/health 的健康检查保持开放。",
  "Only admins can turn this on.": "只有管理员可以开启。",
  "Protected address": "受保护的地址",
  "On since": "开启于",
  "Allowed admins": "允许的管理员",
  "Appflare creates a self-hosted Access application for this address that allows only the admins' emails.":
    "Appflare 会为这个地址创建一个自托管 Access 应用，只放行管理员的邮箱。",
  "Allowed emails": "允许的邮箱",
  "Login methods": "登录方式",
  "Cloudflare Access protection is on": "Cloudflare Access 保护已开启",
  "Reload and sign in": "重新加载并登录",
  "Access asks for this before Appflare's own sign-in. With the Cloudflare account login method, only members of this Cloudflare account get in, with their Cloudflare login email. To let other emails in, add One-time PIN as a login method in the Zero Trust dashboard first.":
    "Access 会在 Appflare 自己的登录之前先要求这一步。若使用“Cloudflare 账户登录”方式，只有这个 Cloudflare 账户的成员能进，用的是他们的 Cloudflare 登录邮箱。要放行其他邮箱，请先在 Zero Trust 面板里添加“一次性 PIN”作为登录方式。",
  "If Access keeps you out, you see Cloudflare's page, not Appflare's. To recover:":
    "如果 Access 把你挡在外面，你看到的是 Cloudflare 的页面，而不是 Appflare 的。恢复办法：",
  Appearance: "外观",
  Feedback: "反馈",
  "Give us a star": "给我们一颗星",
  "Sign out": "退出登录",
  "Cloudflare Access": "Cloudflare Access",
  Protected: "已保护",
  "Ask for a Cloudflare sign-in on every address of the app, so only Appflare's users reach it.":
    "在应用的每个地址上都要求 Cloudflare 登录，这样只有 Appflare 的用户能访问。",
  "Cloudflare Access is not in step with this app's addresses":
    "Cloudflare Access 与这个应用的地址不一致",
  "Another Access application covers part of this app": "另一个 Access 应用覆盖了这个应用的一部分",
  "Who gets in": "谁能进入",
  "Sign-in": "登录",
  "Public paths": "公开路径",
  "Open in Zero Trust": "在 Zero Trust 中打开",
  "View its log": "查看它的日志",
  "Only admins can change this.": "只有管理员可以修改。",
  "Protect again": "重新保护",
  "This account cannot protect apps yet": "这个账户还不能保护应用",
  "App token": "应用令牌",
  "New app token": "新的应用令牌",
  By: "由",
  "Before you install": "安装前须知",
  "My account has these": "我的账户已具备",
  "Nothing beyond what every Cloudflare account has.":
    "除了每个 Cloudflare 账户本来就有的之外，没有额外要求。",
  "Settings and secrets": "设置与密钥",
  "Only admins can change settings": "只有管理员可以修改设置",
  "A job of this app is running": "这个应用有任务正在运行",
  "Settings can be saved once it has finished.": "等它结束后才能保存设置。",
  "This app has no settings or secrets to change.": "这个应用没有可修改的设置或密钥。",
  "Set by the catalog entry": "由目录条目设定",
  Databases: "数据库",
  "Connection strings are never stored, so they are never shown. A new one gets a new Hyperdrive configuration, which the new version binds. The old configuration is kept until the next update or settings change, so undoing this change from Versions still reaches the old database.":
    "连接字符串从不保存，因此也从不显示。填一个新的会生成新的 Hyperdrive 配置，由新版本绑定；旧配置会保留到下次更新或改动设置，所以从“版本历史”里撤销这次更改仍然连得到旧数据库。",
  "Moving email did not finish": "迁移邮件未完成",
  "No preview check for this change": "这次更改不做预览检查",
  "Save without checking the new settings first": "不检查新设置，直接保存",
  "No configuration recorded": "没有记录的配置",
  "Not set": "未设置",
  "Not used by this version": "当前版本未使用",
  "Will be removed": "将被移除",
  "In the form, narrow the token to this account and the zones the app needs.":
    "在表单里把令牌限定到这个账户和应用所需的区域。",
  "The new version did not answer yet.": "新版本还没有响应。",
  "Advanced: build from source at a commit": "高级：从某个提交构建源码",
  "* Save *": "保存",
  "From a repository…": "从仓库…",
  "Worker only: nothing beyond a Worker, which every plan includes.":
    "仅需 Worker：除了每个套餐都包含的 Worker 之外没有别的。",
  "See all": "查看全部",
  "Active filters": "已启用的筛选",
  "Filter by plan, license or installed": "按套餐、许可证或是否已安装筛选",
  Filters: "筛选",
  Plan: "套餐",
  "Any plan": "任意套餐",
  "Any license": "任意许可证",
  "Every catalog": "全部目录",
  "Search apps": "搜索应用",
  "stars on GitHub": "个 GitHub 星标",
  Categories: "分类",
  Account: "账户",
  "Needs reconnecting": "需要重新连接",
  Active: "生效中",
  "Waiting for redeploy": "等待重新部署",
  "Start again": "重新开始",
  State: "状态",
  Since: "起始于",
  "Account ID": "账户 ID",
  "Last renewed": "上次续期",
  "OAuth client ID": "OAuth 客户端 ID",
  "Last verified": "上次验证",
  "Stored as": "保存方式",
  Permissions: "权限",
  "Token permissions": "令牌权限",
  "Not granted": "未授予",
  "Use this Appflare on appflare.dev": "在 appflare.dev 上使用这个 Appflare",
  "Install buttons on appflare.dev then open here, in this browser.":
    "在 appflare.dev 上点安装按钮，然后在这个浏览器里打开这里。",
  "How Appflare connects": "Appflare 如何连接",
  "Sign in with Cloudflare": "使用 Cloudflare 登录",
  "1. Create a token": "1. 创建令牌",
  "It also selects permissions that only one optional feature uses. You can remove them from the token if you will not use that feature, and add them back later by editing or rotating the token:":
    "它还会勾选只有某个可选功能才用到的权限。如果你不用那个功能，可以从令牌里去掉；之后通过编辑或轮换令牌再加回来：",
  "2. Paste and verify it": "2. 粘贴并校验",
  "Verification failed": "校验失败",
  "Token verified": "令牌已校验",
  "This token cannot manage Workers": "这个令牌无法管理 Workers",
  "Appflare needs Workers Scripts: Edit to store the token on itself and install apps. Create a token from the link above.":
    "Appflare 需要“Workers Scripts: 编辑”权限，才能把令牌保存在自己身上并安装应用。请从上面的链接创建令牌。",
  "Create a token": "创建令牌",
  "The link opens Cloudflare with the permissions already selected. Scroll down, choose Review token, then Create token, and copy it.":
    "链接会在权限已勾选的情况下打开 Cloudflare。往下滚，选择“查看令牌”，再选“创建令牌”，然后复制它。",
  "What the token can do": "令牌能做什么",
  "Paste it": "粘贴它",
  Connect: "连接",
  ". Continuing…": "。继续…",
  "to confirm": "以确认",
  "Add a custom domain": "添加自定义域名",
  "Add a wildcard domain": "添加通配域名",
  "Learn more": "了解更多",
  "Appflare cannot see any domain in this account": "Appflare 在这个账户里看不到任何域名",
  "The Cloudflare token cannot set up Email Routing yet": "Cloudflare 令牌暂时还无法配置邮件路由",
  "Whether this app also sends email is unknown until it is built":
    "在构建之前，无法确定这个应用是否也会发送邮件",
  "This app also sends email": "这个应用也会发送邮件",
  "Serving with its own certificate.": "使用它自己的证书提供服务。",
  "Cloudflare says": "Cloudflare 返回",
  "DNS records": "DNS 记录",
  Value: "值",
  "Add external domain": "添加外部域名",
  "Add an external domain": "添加外部域名",
  "Reading the gateway…": "正在读取网关…",
  "The gateway is not set up": "网关尚未配置",
  Hostname: "主机名",
  "Visitors reach it through": "访客通过以下方式访问",
  "About sponsored items": "关于推广内容",
  Hide: "隐藏",
  "Hide this sponsored item": "隐藏这条推广",
  Ready: "就绪",
  "The gateway that serves apps on hostnames in other people's DNS, set up once on one of your domains.":
    "让应用跑在别人 DNS 下的主机名上的网关，在你的某个域名上配置一次即可。",
  "An external domain is a hostname in DNS you do not manage in this Cloudflare account, such as a customer's or a domain at another registrar. The gateway runs on one domain of this account, which keeps serving its own sites as before.":
    "外部域名是指不在这个 Cloudflare 账户里管理的 DNS 主机名，比如客户的域名或注册在别家的域名。网关运行在本账户的某个域名上，那个域名原来的站点照常提供服务。",
  "Appflare cannot list the account's domains": "Appflare 无法列出这个账户的域名",
  "External domains need one domain on Cloudflare in this account":
    "外部域名需要本账户里有一个已接入 Cloudflare 的域名",
  "Only admins can set up the gateway.": "只有管理员可以配置网关。",
  "A domain of this account with Cloudflare for SaaS on. A domain of its own is tidiest, but one that serves a site works: its own hostnames pass through the gateway to their origin unchanged.":
    "本账户里一个开启了 Cloudflare for SaaS 的域名。单独用一个域名最干净，但已经在提供站点的域名也可以：它自己的主机名会原样穿过网关到达源站。",
  "CNAME target": "CNAME 目标",
  "Cloudflare for SaaS": "Cloudflare for SaaS",
  "Gateway Worker": "网关 Worker",
  "Set up": "配置",
  "Setting up the gateway did not finish": "配置网关未完成",
  "Finish setup": "完成配置",
  "A new route or DNS record can take a minute. If it stays like this, check the Worker's routes on the domain in the Cloudflare dashboard.":
    "新增的路由或 DNS 记录可能要一分钟才生效。如果一直这样，请在 Cloudflare 面板里检查该域名上 Worker 的路由。",
  "Turn off gateway": "关闭网关",
  "Turn off the gateway": "关闭网关",
  "Read-only GitHub tokens for installing from private repositories and for downloading Appflare's own releases. Each token is kept as a secret on the sandbox Worker and is never shown again.":
    "只读的 GitHub 令牌，用于从私有仓库安装，以及下载 Appflare 自己的发布版本。每个令牌都以密钥形式保存在沙盒 Worker 上，之后不再显示。",
  "Loading the tokens…": "正在加载令牌…",
  "No GitHub access tokens": "没有 GitHub 访问令牌",
  "Public repositories need none. Add a token to install from a private one.":
    "公共仓库不需要。要从私有仓库安装就添加一个令牌。",
  "Sandbox builds are off": "沙盒构建已关闭",
  "Tokens are kept on the sandbox Worker, which also clones the repositories. Enable sandbox builds above to add one. Disabling sandbox builds removes every token.":
    "令牌保存在沙盒 Worker 上，clone 仓库的也是它。要添加令牌请先在上方开启沙盒构建。关闭沙盒构建会移除所有令牌。",
  "The sandbox Worker cannot use tokens yet": "沙盒 Worker 暂时还无法使用令牌",
  "To update it, choose Update sandbox above.": "要更新它，请在上方选择“更新沙盒”。",
  "The sandbox Worker did not answer": "沙盒 Worker 没有响应",
  "Tokens can be added once it answers again. Reload the page in a minute.":
    "等它恢复响应后就可以添加令牌。请在一分钟后重新加载页面。",
  "GitHub tokens": "GitHub 令牌",
  "Used for": "用于",
  "Last used": "上次使用",
  "Add a GitHub access token": "添加 GitHub 访问令牌",
  "Contents: Read-only": "内容：只读",
  "Metadata: Read-only": "元数据：只读",
  "Acme private apps": "示例公司的私有应用",
  Token: "令牌",
  "Stored on the sandbox Worker as a secret. Appflare cannot show it again.":
    "以密钥形式保存在沙盒 Worker 上。Appflare 无法再次显示它。",
  "Builds of private repositories": "私有仓库的构建",
  Repositories: "仓库",
  "acme/api, acme/*": "acme/api, acme/*",
  "Appflare release downloads": "Appflare 发布包下载",
  "Delete token": "删除令牌",
  Required: "必需",
  "The gateway for other domains is not set up": "用于其他域名的网关尚未配置",
  "Not yet": "还没有",
  "Yes, it shows another site": "有，它已经在提供别的站点",
  "Search your domains": "搜索你的域名",
  "Type a name for the address.": "为这个地址输入一个名称。",
  "Its resources are named after it. Each install of an app needs its own.":
    "它的资源按这个名字命名。同一个应用每次安装都需要各自的名字。",
  Available: "可用",
  "What it left": "它留下了什么",
  "All filled in": "全部已填写",
  "The app's installer runs with it from your sandbox Worker. Appflare keeps no copy.":
    "应用的安装程序会带着它从你的沙盒 Worker 上运行。Appflare 不保留副本。",
  "Optional settings": "可选设置",
  "Plan and cost": "套餐与费用",
  "Not checked": "未检查",
  "Open the catalog": "打开应用中心",
  "What failed": "失败原因",
  "Where it stopped": "停在哪一步",
  "Cloudflare error codes": "Cloudflare 错误码",
  "Workers plan": "Workers 套餐",
  "Job log": "任务日志",
  Appflare: "Appflare",
  "Checking the name and attaching the domain…": "正在检查名称并绑定域名…",
  "The move's log": "迁移日志",
  "Cloudflare Access refused the last few checks of the move, so this page cannot tell where it stands. Reload the page, or open Appflare at its new address.":
    "Cloudflare Access 拒绝了迁移最后几次检查，所以这个页面无法判断进度。请重新加载页面，或者在 Appflare 的新地址打开它。",
  "Open the job": "打开任务",
  "Sign in again there.": "在那里重新登录。",
  "Where you and your users open Appflare: its workers.dev address, or a domain of yours.":
    "你和用户访问 Appflare 的地址：它的 workers.dev 地址，或你自己的域名。",
  "Cloudflare no longer lists it among the domains of Appflare's Worker. Appflare goes back to its workers.dev address at its next check.":
    "Cloudflare 已不再把它列在 Appflare Worker 的域名之中。Appflare 会在下次检查时回到它的 workers.dev 地址。",
  "Use it as Appflare's address": "把它用作 Appflare 的地址",
  "Appflare moves to a name in one of your domains on Cloudflare, which creates its DNS record and certificate. It switches once the new address answers, and its workers.dev address then sends visits there. Everyone signs in again at the new address.":
    "Appflare 会迁移到你在 Cloudflare 上某个域名下的名字，并自动创建对应的 DNS 记录和证书。等新地址开始响应后就会切换，之后它的 workers.dev 地址会把访问转发过去。每个人都要在新地址重新登录。",
  "Cloudflare lists no versions of Appflare's Worker.":
    "Cloudflare 没有列出 Appflare Worker 的任何版本。",
  "Appflare versions": "Appflare 版本",
  "Made by": "制作者",
  Serving: "正在提供服务",
  "It did not answer here yet.": "它在那边还没有响应。",
  "The database is not rolled back": "数据库不会随之回滚",
  "Cloudflare refuses a version whose secrets changed since it was deployed, such as an older API token. Pick a newer version of the same release then.":
    "如果某个版本的密钥在部署后又改过（比如换过 API 令牌），Cloudflare 会拒绝回到这个版本。那就选同一发布里更新的版本。",
  "Automatic updates of Appflare are turned off, so the older version is not updated again right away.":
    "Appflare 的自动更新已关闭，所以旧版本不会立刻又被更新。",
  "Nothing else may run during the rollback. This page reloads once the older version answers.":
    "回滚期间不会执行其他操作。旧版本开始响应后，本页面会重新加载。",
  "Page not found": "页面不存在",
  "Nothing lives at this address. The link may be wrong, or what it pointed to was removed.":
    "这个地址上没有内容。链接可能有误，或者它指向的东西已被移除。",
  "Go to Home": "回到首页",
  "No notification channels": "没有通知渠道",
  "Credentials unreadable": "凭据无法读取",
  Delivered: "已送达",
  "Nothing sent yet": "还没有发送过",
  "Replace signing secret": "替换签名密钥",
  Events: "事件",
  Deliveries: "投递记录",
  "Last delivered:": "上次送达：",
  "The stored credentials cannot be read, so nothing is sent. Edit the channel and enter its details again.":
    "保存的凭据无法读取，因此不会发送任何消息。请编辑这个渠道并重新填写信息。",
  "Test message not delivered": "测试消息未送达",
  "Test message delivered": "测试消息已送达",
  "Appflare stores it encrypted and never shows it again. Replace it from the channel's menu if it is lost.":
    "Appflare 会加密保存它，之后不再显示。如果丢失，请从渠道菜单里替换。",
  "Team chat": "团队聊天",
  "Bot token": "机器人令牌",
  "Chat id": "会话 ID",
  Replace: "替换",
  "Appflare stops sending to this channel and deletes its stored credentials. Messages waiting for a retry are dropped.":
    "Appflare 会停止向这个渠道发送，并删除保存的凭据。等待重试的消息会被丢弃。",
  "Remove channel": "移除渠道",
  "Sign in with your fingerprint, face, screen lock, or a security key instead of your password. Your password keeps working.":
    "用指纹、面容、屏幕锁或安全密钥代替密码登录。密码仍然可用。",
  "Open this page in a current browser to add a passkey.":
    "请用较新的浏览器打开这个页面来添加通行密钥。",
  "No passkeys yet": "还没有通行密钥",
  "Add a passkey to sign in without typing your password.":
    "添加一个通行密钥，登录时就不用输入密码。",
  Passkeys: "通行密钥",
  "Name it after the device or password manager that keeps it, so you can tell your passkeys apart. Your browser then asks you to create it.":
    "按保存它的设备或密码管理器命名，方便区分不同的通行密钥。随后浏览器会提示你创建。",
  "Work laptop": "工作笔记本",
  "Create passkey": "创建通行密钥",
  "You will no longer be able to sign in with it. Delete it from your device or password manager as well.":
    "之后就无法用它登录了。也请从设备或密码管理器里删除它。",
  "Remove passkey": "移除通行密钥",
  "How someone who forgot their password gets back in.": "忘记密码的人如何重新登录。",
  "Last reset without the old password:": "上次免旧密码重置：",
  "Password reset emails": "密码重置邮件",
  "Appflare is restarting with reset emails turned on": "Appflare 正在开启重置邮件并重启",
  "Reload this page in a few seconds.": "几秒后重新加载本页面。",
  "Send me a test email": "给我发一封测试邮件",
  "Turn off password reset emails": "关闭密码重置邮件",
  "People who forget their password then need a recovery code from an admin, or from whoever manages the Cloudflare account. Appflare restarts without email in a few seconds.":
    "忘记密码的人需要向管理员、或向维护这个 Cloudflare 账户的人索取恢复码。Appflare 会在几秒内以关闭邮件的方式重启。",
  "Appflare can email reset links through Cloudflare Email Sending. Enter an address on a domain set up for it in this account. Without Workers Paid, emails reach only addresses verified in Email Routing.":
    "Appflare 可以通过 Cloudflare Email Sending 发送重置链接。请输入本账户中已为此配置好的域名下的地址。没有 Workers Paid 时，邮件只能发到在邮件路由里验证过的地址。",
  "Send from": "发件地址",
  "appflare@example.com": "appflare@example.com",
  "Off. Only the owner can turn on reset emails.": "已关闭。只有所有者可以开启重置邮件。",
  "Deletes every resource below from your Cloudflare account. The app stays uninstalled, and its jobs stay in the history.":
    "从你的 Cloudflare 账户里删除下面列出的所有资源。应用保持未安装状态，它的任务记录仍留在历史里。",
  "Delete retained data": "删除保留的数据",
  "Each resource is deleted with everything in it, including every object in an R2 bucket.":
    "每个资源都会连同其中的全部内容一起删除，包括 R2 存储桶里的每个对象。",
  Deleted: "已删除",
  "Forget and keep the resources": "忽略并保留资源",
  "The name Appflare shows for this install. The Worker, its address and its resources keep their names.":
    "Appflare 为这次安装显示的名称。Worker、它的地址和资源仍保留原来的名字。",
  "Install from a repository": "从仓库安装",
  "Email a reset link": "通过邮件发送重置链接",
  "Show a recovery code": "显示恢复码",
  "You pass it on yourself. It works once, for 30 minutes.":
    "由你转交。它只能使用一次，有效期 30 分钟。",
  "Appflare shows a one-time recovery code for you to pass on. It works once, for 30 minutes. Turn on password reset emails below to send a link instead.":
    "Appflare 会显示一个一次性恢复码供你转交，只能使用一次，有效期 30 分钟。开启下面的密码重置邮件后，可以改为发送链接。",
  'On the sign-in page they choose "Forgot your password?", then "I have a recovery code", and enter their email, this code and a new password. It works once, for 30 minutes.':
    "在登录页选择“忘记密码？”，再选“我有恢复码”，然后输入邮箱、这个恢复码和新密码。它只能使用一次，有效期 30 分钟。",
  "Reset link sent": "重置链接已发送",
  "It works for 30 minutes. If it does not arrive, show a recovery code instead.":
    "链接有效期 30 分钟。如果没收到，改用恢复码。",
  "Something went wrong": "出错了",
  "How this works": "工作原理",
  "Some catalog apps have no ready-made release. Appflare can build them from their pinned commit in a container in your own account, with the optional sandbox Worker. Builds need Workers Paid and are not signed.":
    "有些目录应用没有现成的发布版本。Appflare 可以用可选的沙盒 Worker，在你自己的账户里用一个容器从它们固定的提交构建。构建需要 Workers Paid，而且不做签名。",
  "Appflare now runs with its binding to the sandbox Worker. It can take a few seconds to show here.":
    "Appflare 现在已经带着沙盒 Worker 的绑定运行。这里可能要几秒才会显示。",
  Changing: "正在变更",
  "Not answering": "无响应",
  ". The actions here come back when it ends.": "。它结束后这里的操作会恢复。",
  See: "查看",
  "for what happened.": "了解发生了什么。",
  "Workers Paid usage applies while builds run: each build runs one container, billed as container time beyond what Workers Paid includes each month. Nothing runs between builds.":
    "构建运行期间会计入 Workers Paid 用量：每次构建运行一个容器，按 Workers Paid 每月包含额度之外的容器时间计费。构建之间不运行任何东西。",
  Enable: "启用",
  "The sandbox Worker does not answer as expected": "沙盒 Worker 的响应不符合预期",
  "Sandbox Worker": "沙盒 Worker",
  Image: "镜像",
  "Fix this first": "请先解决这个问题",
  "Appflare could not check whether the sandbox Worker exists":
    "Appflare 无法确认沙盒 Worker 是否存在",
  "Only admins can enable them.": "只有管理员可以启用。",
  "Appflare still has a binding to a deleted sandbox Worker":
    "Appflare 仍然绑定着一个已删除的沙盒 Worker",
  "Sandbox builds are off. Disabling them removes the binding, and enabling them replaces it.":
    "沙盒构建已关闭。关闭会移除绑定，启用会替换绑定。",
  "A sandbox Worker is in this account.": "本账户里有一个沙盒 Worker。",
  "Connect only": "仅连接",
  "Appflare deletes the sandbox Worker with the containers it builds in and the storage that holds every build and its log, then disconnects from it. GitHub access tokens are kept on the sandbox Worker, so they are removed too.":
    "Appflare 会把沙盒 Worker 连同它用来构建的容器、以及保存每次构建和日志的存储一起删除，然后断开连接。GitHub 访问令牌保存在沙盒 Worker 上，因此也会一并删除。",
  "Disable and delete": "关闭并删除",
  "Apps still need the sandbox Worker": "仍有应用需要沙盒 Worker",
  "Apps are not affected: none of them was built in the sandbox Worker. Enable sandbox builds again at any time.":
    "应用不受影响：没有一个是沙盒 Worker 构建的。你随时可以重新开启沙盒构建。",
  "Deleted: the Worker": "已删除：Worker",
  "Previous screenshots": "上一张截图",
  "Next screenshots": "下一张截图",
  Close: "关闭",
  Next: "下一步",
  "Used once": "使用一次",
  Generated: "已生成",
  Regenerate: "重新生成",
  "First sign-in": "首次登录",
  "The install uses it once to create the first admin account. Appflare does not keep it, and this page shows it only until you leave.":
    "安装时会用它创建第一个管理员账户。Appflare 不会保存它，页面也只在你还停留时显示。",
  "Work it out": "自己推算",
  "Run this command": "运行这条命令",
  "One plain command, run after the dependencies are installed and before wrangler bundles the Worker. No pipes, quotes or variables.":
    "一条普通命令，在依赖安装之后、wrangler 打包 Worker 之前运行。不能包含管道、引号或变量。",
  None: "无",
  "Only the wrangler config's own build.command runs, as wrangler deploy would run it.":
    "只运行 wrangler 配置里自己的 build.command，与 wrangler deploy 的行为一致。",
  Command: "命令",
  "pnpm run build": "pnpm run build",
  "Built in your account, not checked": "在你的账户里构建，未做检查",
  "Rebuild and update": "重新构建并更新",
  "Rebuild for review": "重新构建以供审核",
  "Retry uninstall": "重试卸载",
  "Deleted by the app's installer": "由应用的安装程序删除",
  "Email Routing": "邮件路由",
  "Undone first, before the Worker, so no mail is sent to a Worker that no longer exists. Nothing here holds data.":
    "先于 Worker 撤销，这样邮件不会发往已经不存在的 Worker。这里不保存数据。",
  "Data resources": "数据资源",
  "This app has no data resources besides its Worker.":
    "这个应用除了它的 Worker 之外没有数据资源。",
  "Go to Uninstall": "前往卸载",
  "This version sends events into a new table in R2. Cloudflare keeps this token as the credential its event stream writes with.":
    "这个版本会把事件写入 R2 里的新表。Cloudflare 会保存这个令牌，作为事件流写入时的凭据。",
  "The update takes a snapshot of the current version and of each D1 database, checks the new version before it serves traffic where Cloudflare allows it, and keeps the current one for a rollback.":
    "更新会为当前版本和每个 D1 数据库拍快照，在 Cloudflare 允许的范围内先检查新版本再让它承载流量，并保留当前版本以便回滚。",
  "What the report is for, what it holds, and the switch that turns it off.":
    "报告有什么用、包含哪些内容，以及关闭它的开关。",
  "Who can sign in to this manager, and what each of them can change.":
    "谁可以登录这个管理面板，以及各自能改什么。",
  "Only admins can view and add users": "只有管理员可以查看和添加用户",
  "Ask an admin if you need an account for someone else.": "如果需要给别人开账户，请联系管理员。",
  Users: "用户",
  Role: "角色",
  "Appflare stores only a hash. Closing this dialog discards the password.":
    "Appflare 只保存哈希值。关闭这个对话框就会丢弃密码。",
  "Added to the Cloudflare Access policy": "已加入 Cloudflare Access 策略",
  "Not added to the Cloudflare Access policy": "未加入 Cloudflare Access 策略",
  "Not added to the Access policy of your protected apps yet": "尚未加入你受保护应用的 Access 策略",
  "Create user": "创建用户",
  "Choose one": "请选择一个",
  JSON: "JSON",
  "No updates or settings changes yet. Each takes a snapshot first: the Worker version that was serving, its settings, and a Time Travel bookmark of each D1 database.":
    "还没有更新或设置变更。每次都会先拍快照：当时正在服务的 Worker 版本、它的设置，以及每个 D1 数据库的 Time Travel 书签。",
  "Snapshot taken": "快照时间",
  "Catalog version": "目录版本",
  "Databases are not changed": "数据库不会被改动",
  "If the newer version changed its data, the older code may not read it. Restore a database from this snapshot separately if you need its data as it was.":
    "如果更新的版本改过数据结构，旧代码可能读不了。需要恢复当时的数据，请用这个快照单独还原数据库。",
  "Databases and custom domains are not changed.": "数据库和自定义域名不会被改动。",
  Restores: "还原",
  "to this point: its state when the snapshot was taken on": "到这一刻：快照拍下时的状态",
  "Everything written since then is replaced": "之后写入的一切都会被替换",
  "The Worker is not changed. Cloudflare returns a bookmark of the database as it is now, so this restore can be undone by restoring to that bookmark.":
    "Worker 不会被改动。Cloudflare 会返回数据库当前状态的书签，因此可以用那个书签撤销这次还原。",
  "Bookmark from just before the restore": "还原前一刻的书签",
  "Restore database": "还原数据库",
  "No domain matches.": "没有匹配的域名。",
  "Actions that cannot be undone. Each asks you to type a confirmation first.":
    "无法撤销的操作。每一个都会先要求你输入确认。",
  "Deletes Appflare and everything it runs on. The apps it installed stay and keep running, unmanaged.":
    "删除 Appflare 以及它运行所依赖的一切。它安装的应用会保留并继续运行，只是不再受管理。",
  "Rotate auth secret": "轮换认证密钥",
  "Appflare gives itself a new random sign-in secret, which deploys a new version of the same code with it.":
    "Appflare 会给自己生成一个新的随机登录密钥，并据此部署同一份代码的新版本。",
  "Rotate and sign everyone out": "轮换并登出所有人",
  "Everyone is signed out, you included": "所有人都会被登出，包括你自己",
  "Every session ends at once. Passwords and passkeys stay as they are, so everyone can sign in again.":
    "所有会话立即结束。密码和通行密钥保持不变，所以大家可以重新登录。",
  "Their credentials are encrypted with a key derived from this secret. After the rotation they show as unreadable, and nothing is sent to them until an admin enters the bot token or webhook URL again.":
    "它们的凭据用从这个密钥派生出的密钥加密。轮换之后会显示为无法读取，在管理员重新填写机器人令牌或 webhook 地址之前不会再发送任何消息。",
  "The secret is the": "这个密钥就是",
  BETTER_AUTH_SECRET: "BETTER_AUTH_SECRET",
  "Review what goes and what stays. This cannot be undone.":
    "确认哪些会被删除、哪些会保留。此操作无法撤销。",
  "Reading the account…": "正在读取账户…",
  "Appflare could not read what it would remove": "Appflare 无法读取将要移除的内容",
  "Appflare cannot be removed while a job is queued or running. Wait for it to finish, then open this dialog again.":
    "有任务在排队或运行时无法移除 Appflare。等它结束后再打开这个对话框。",
  "Deleted, in this order": "按以下顺序删除",
  "The R2 bucket": "R2 存储桶",
  "The external domains gateway on": "位于以下域名上的外部域名网关：",
  "The sandbox Worker": "沙盒 Worker",
  "The Cloudflare Access service tokens Appflare's health checks used for protected apps, taken out of their Access applications first.":
    "Appflare 健康检查访问受保护应用时用的 Cloudflare Access 服务令牌，会先从各自的 Access 应用里移除。",
  "Appflare's D1 database,": "Appflare 的 D1 数据库，",
  "The Cloudflare Access applications that protect Appflare, after the database, so a removal that stops earlier leaves Appflare protected.":
    "保护 Appflare 的 Cloudflare Access 应用，放在数据库之后，这样即使中途停下，Appflare 仍处于保护之下。",
  "Last, the Worker": "最后是 Worker",
  "itself, with its Workflow, cron trigger and workers.dev address. It deletes itself after the final page has reached your browser.":
    "本体，连同它的 Workflow、定时触发器和 workers.dev 地址。等最后一页到达你的浏览器后，它会删除自己。",
  "The sandbox Worker keeps the Cloudflare token each self-deploying app's installer runs with. It is deleted with the sandbox Worker. The apps keep running, but nothing can update or destroy them through their installer any more. Revoke those tokens in the Cloudflare dashboard if you no longer need them.":
    "沙盒 Worker 保存着每个自部署应用安装时使用的 Cloudflare 令牌，会随沙盒 Worker 一起删除。应用继续运行，但再也不能通过它们的安装程序更新或销毁。不再需要的话，可以在 Cloudflare 面板里吊销这些令牌。",
  "The bucket": "存储桶",
  "stays: the sandbox Worker that used it is already gone, so the bucket was kept on purpose. Delete it in the Cloudflare dashboard if you no longer need its builds.":
    "保留：使用它的沙盒 Worker 已经不在了，所以这个存储桶是有意保留的。不再需要它的构建产物的话，可以在 Cloudflare 面板里删除。",
  "A Worker named": "有一个名为",
  "exists but is not a sandbox Worker, so it is left alone, and so is any bucket named":
    "的 Worker 存在，但它不是沙盒 Worker，所以不去动它；取名为下列名字的存储桶也一样：",
  'The "Appflare users" Cloudflare Access policy, for any Access application that still uses it. Manage or delete it in the Cloudflare dashboard under Zero Trust, Access.':
    "“Appflare users”这条 Cloudflare Access 策略，以及仍在引用它的任何 Access 应用。请在 Cloudflare 面板的 Zero Trust → Access 下管理或删除。",
  ". Cloudflare keeps them when the Worker is deleted, and Appflare's token lacks Containers: Edit, so it cannot delete them. Afterwards, delete them in the Cloudflare dashboard under Workers, Containers, or add that permission to the token first.":
    "。Worker 被删除时 Cloudflare 会保留它们，而 Appflare 的令牌缺少“Containers: 编辑”权限，删不掉。移除完成后，请在 Cloudflare 面板的 Workers → Containers 下删除它们，或者先给令牌加上该权限。",
  "The container application": "容器应用",
  "The removal runs in this window and shows each step as it finishes. If a step fails, the rest stays, Appflare keeps working, and running the removal again finishes it.":
    "移除会在这个窗口里进行，每一步完成后都会显示。如果某一步失败，其余部分保持原样，Appflare 继续工作，再运行一次移除就能完成。",
  "Remove these external domains first, or their visitors lose the site":
    "请先移除这些外部域名，否则它们的访客会失去站点",
  "Disconnect Workers Builds": "断开 Workers Builds",
  "Delete the repository copy": "删除仓库副本",
  "your API tokens": "你的 API 令牌",
  "Where Appflare lives": "Appflare 所在的位置",
  "Keep the workers.dev address": "保留 workers.dev 地址",
  "Use a domain of yours": "使用你自己的域名",
  "A name in one of your domains on Cloudflare. The workers.dev address then sends visits there, and you sign in again at the new address.":
    "你在 Cloudflare 上某个域名下的名字。之后 workers.dev 地址会把访问转发过去，你需要在 新地址重新登录。",
  Later: "稍后",
  "No such install": "找不到这个安装",
  "The link may be wrong, or the install was removed.": "链接可能有误，或者这个安装已被移除。",
  "Next steps": "接下来",
  "Automatic updates": "自动更新",
  "workers.dev URL": "workers.dev 地址",
  "The app is served on its workers.dev URL only.":
    "这个应用目前只通过它的 workers.dev 地址提供服务。",
  "No resources have been created yet": "还没有创建任何资源",
  "The Worker and every resource Appflare created for it are deleted.":
    "Worker 以及 Appflare 为它创建的每个资源都会被删除。",
  "Danger zone": "危险区",
  "Finish uninstalling": "完成卸载",
  "Deletes what the last attempt left. You can keep a resource Cloudflare refuses to delete.":
    "删除上次尝试残留的内容。Cloudflare 拒绝删除的资源可以选择保留。",
  "Kept data": "保留的数据",
  ID: "ID",
  "Managed by": "管理者",
  "The app's installer": "应用的安装程序",
  "The install did not finish": "安装未完成",
  Uninstalled: "已卸载于",
  "are still there.": "仍然存在。",
  Uninstalling: "卸载中",
  "The uninstall did not finish": "卸载未完成",
  "Reinstall to update": "重新安装以更新",
  "Not served on workers.dev": "不在 workers.dev 上提供服务",
  "Other Workers": "其他 Workers",
  Health: "健康状态",
  Deployed: "部署时间",
  "Last change": "上次变更",
  "It may have been removed from the catalog, or the link is wrong.":
    "它可能已从目录中移除，或者链接有误。",
  "This app cannot be installed right now": "这个应用目前无法安装",
  About: "关于",
  "What it needs on your account": "它在你的账户上需要什么",
  "Settings you will choose": "你需要选择的设置",
  Links: "链接",
  "On your account": "在你的账户上",
  "Install another": "再装一个",
  "Apps you can add to your Cloudflare account.": "可以添加到你的 Cloudflare 账户的应用。",
  "Updates settings": "更新设置",
  "to see them.": "查看它们。",
  "No apps in the catalog yet": "目录里还没有应用",
  "The list of apps was loaded but is empty.": "应用列表已加载，但是空的。",
  "No apps match": "没有匹配的应用",
  "Try other words, or remove a filter.": "换个词试试，或者去掉一个筛选条件。",
  "Show all apps": "显示全部应用",
  "All apps": "全部应用",
  "Build not found": "找不到构建",
  "No such build": "没有这个构建",
  "Build log": "构建日志",
  "Throw away this build": "丢弃这个构建",
  "Building in your sandbox Worker": "正在你的沙盒 Worker 里构建",
  "The build failed": "构建失败",
  "Nothing was deployed. Fix what the log names, or choose another branch or build command, and build again.":
    "没有部署任何东西。修好日志里指出的问题，或者换一个分支或构建命令，然后重新构建。",
  "This build was thrown away": "这个构建已被丢弃",
  "This commit's bindings differ from the catalog's release": "这个提交的绑定与目录发布的版本不同",
  "Build command": "构建命令",
  Dependencies: "依赖",
  "Installed in this order, install scripts disabled:": "按以下顺序安装，安装脚本已禁用：",
  "Wrangler config": "Wrangler 配置",
  "In your sandbox Worker with": "在你的沙盒 Worker 中使用",
  "Installed now": "现已安装",
  "What it declares": "它声明了什么",
  "Read from the built Worker, as the install will use it.":
    "从构建出的 Worker 读取，安装时就按这个使用。",
  "Cron triggers:": "定时触发器：",
  Bindings: "绑定",
  "Runs on": "运行于",
  "Check that this account offers what the app needs:": "确认这个账户能满足应用的需求：",
  "This account meets these requirements": "这个账户满足这些要求",
  "Job not found": "找不到任务",
  "No such job": "没有这个任务",
  "Appflare is switching versions…": "Appflare 正在切换版本…",
  "Built. Review it next": "已构建。接下来请查看",
  Time: "时间",
  Level: "级别",
  Message: "消息",
  "No output yet.": "还没有输出。",
  "Installs, updates, settings changes, rollbacks and uninstalls, newest first.":
    "安装、更新、设置变更、回滚和卸载，最新的在前。",
  "No jobs yet": "还没有任务",
  "Every install, update and uninstall runs as a job with its own log, listed here.":
    "每次安装、更新和卸载都会作为一个任务运行，各自有日志，列在这里。",
  "Check your email": "查看你的邮箱",
  "Sign in with your new password. You were signed out everywhere else.":
    "用新密码登录。其他地方的登录都已退出。",
  "An admin of this Appflare can give you a code. If you manage the Cloudflare account it runs in, get one yourself by running this on your computer:":
    "这个 Appflare 的管理员可以给你一个恢复码。如果你管理着它所在的 Cloudflare 账户，也可以在自己的电脑上运行下面的命令自己取：",
  "Recovery code": "恢复码",
  "XXXXX-XXXXX-XXXXX-XXXXX": "XXXXX-XXXXX-XXXXX-XXXXX",
  "Choose a new password": "设置新密码",
  "You are signed out everywhere once it is set.": "设置完成后，所有地方都会退出登录。",
  "Sign in with your new password.": "用新密码登录。",
  "Ask for a new link": "重新申请一个链接",
  "This setup link has expired": "这个安装链接已过期",
  "Links work once, for 30 minutes. Open Appflare again from the page that installed it.":
    "链接只能使用一次，有效期 30 分钟。请从安装它的页面重新打开 Appflare。",
  "Your setup link did not go through": "你的安装链接没有走通",
  "Appflare did not answer yet.": "Appflare 还没有响应。",
  "Connect with an API token instead": "改用 API 令牌连接",
  "Back to the installer": "返回安装程序",
  "Other ways": "其他方式",
  "Waiting for the new version to answer…": "正在等待新版本响应…",
  "Create owner account": "创建所有者账户",
  "An admin needs to finish setup": "需要管理员完成设置",
  "Appflare needs a Cloudflare API token before anyone can use it. Ask an admin to sign in and add one.":
    "在任何人使用之前，Appflare 需要一个 Cloudflare API 令牌。请联系管理员登录并添加。",
  "The old setup secret could not be removed": "旧的安装密钥无法移除",
  "It guards nothing any more, so it can stay. A developer can remove it with the command under Technical details.":
    "它已经不再保护任何东西，留着也无妨。开发者可以用“技术细节”里的命令删除它。",
  "The secret is": "这个密钥是",
  SETUP_TOKEN: "SETUP_TOKEN",
  "on Appflare's own Worker. To remove it:": "在 Appflare 自己的 Worker 上。删除方法：",
  "Edit alert": "编辑提醒",
  "Remove alert": "移除提醒",
  "When it": "当它",
  "Alert when it has or is on pace to": "当它已达到或预计达到以下用量时提醒：",
  Amount: "数量",
  Unit: "单位",
  "of a free daily limit today": "的今日免费额度",
  Period: "周期",
  "Recent activity": "最近活动",
  "Nothing yet. Updates, alerts and pauses show up here.": "还没有。更新、提醒和暂停会显示在这里。",
  "Spend protection": "花费保护",
  "Unusual usage alert": "用量异常提醒",
  "Usage alerts": "用量提醒",
  "Add alert": "添加提醒",
  "Edit them": "编辑它们",
  "Budget settings": "预算设置",
  "Never pause this app for the budget": "永不因预算暂停这个应用",
  "Give the token access to usage": "给令牌授予读取用量的权限",
  "An admin can change the token.": "管理员可以更换令牌。",
  "Reconnect to see usage": "重新连接以查看用量",
  "An admin can reconnect Cloudflare.": "管理员可以重新连接 Cloudflare。",
  "No usage yet": "还没有用量",
  "Cloudflare has reported no usage for this app in the last 30 days. Appflare reads it every 5 minutes.":
    "Cloudflare 报告这个应用最近 30 天没有用量。Appflare 每 5 分钟读取一次。",
  Product: "产品",
  "Last 24 hours": "最近 24 小时",
  Today: "今天",
  "This month": "本月",
  Projected: "预计",
  "Cost past included": "超出含额度的费用",
  "Reading usage": "正在读取用量",
  "What pauses an app": "什么会暂停应用",
  "Set their own:": "使用自己的设置：",
  "Unusual usage alerts": "用量异常提醒",
  "Default unusual usage sensitivity": "默认的用量异常灵敏度",
  "Keep this month's Appflare usage under": "把本月的 Appflare 用量控制在",
  "Monthly budget in dollars": "每月预算（美元）",
  "Never paused for the budget:": "永不因预算暂停：",
  ". Their spend still counts, so other apps are paused first.":
    "。它们的开销仍会计算在内，所以会先暂停其他应用。",
  "When it loops": "当它陷入死循环",
  "Loop sensitivity": "死循环灵敏度",
  "When it spends more than": "当它的花费超过",
  "Spending cap in dollars": "花费上限（美元）",
  "Spending cap period": "花费上限周期",
  "Nothing is a trigger, so auto-pause never pauses anything.":
    "没有任何触发器，所以自动暂停不会暂停任何东西。",
  "Paused, so nothing to check until it resumes.": "已暂停，恢复之前无需检查。",
  "No notes for this release.": "这个发布没有说明。",
  New: "新",
  "Running here": "这里是当前运行的版本",
  "Not installed yet": "尚未安装",
  "View on GitHub": "在 GitHub 上查看",
  "What's new": "新变化",
  "No release notes yet": "还没有发布说明",
  "Appflare reads its releases every 30 minutes. Check back soon.":
    "Appflare 每 30 分钟读取一次发布信息，请稍后再看。",

  // The pages Appflare renders itself while removing, or rotating, itself.
  "Back to the danger zone": "返回危险区",
  "Auth secret rotated": "认证密钥已轮换",
  "The auth secret was rotated": "认证密钥已轮换",
  "Rotated on {when}.": "轮换时间：{when}。",
  "Appflare now runs with a new <code>BETTER_AUTH_SECRET</code>. Everyone is signed out, you included: every session ended, and cookies signed with the old secret no longer work. Passwords and passkeys are unchanged.":
    "Appflare 现在使用新的 <code>BETTER_AUTH_SECRET</code> 运行。所有人都被登出，包括你：所有会话都已结束，用旧密钥签发的 Cookie 也失效了。密码和通行密钥没有变化。",
  "Sign in again": "重新登录",
  "No notification channel is set up, so there are no credentials to enter again.":
    "没有配置任何通知渠道，所以没有需要重新填写的凭据。",
  'Your notification channel\'s credentials were encrypted with a key derived from the old secret and can no longer be read. Open the <a href="{href}">notification settings</a>: it shows <strong>Credentials unreadable</strong>, so edit it and enter the bot token or webhook URL again. Until then Appflare sends nothing there.':
    '你这个通知渠道的凭据用旧密钥派生的密钥加密，现在已经读不出来了。打开<a href="{href}">通知设置</a>：它会显示<strong>凭据无法读取</strong>，编辑它并重新填写机器人令牌或 webhook 地址。在此之前 Appflare 不会向那里发送任何消息。',
  'The credentials of your {count} notification channels were encrypted with a key derived from the old secret and can no longer be read. Open the <a href="{href}">notification settings</a>: they show <strong>Credentials unreadable</strong>, so edit each one and enter the bot token or webhook URL again. Until then Appflare sends nothing there.':
    '你这 {count} 个通知渠道的凭据都用旧密钥派生的密钥加密，现在已经读不出来了。打开<a href="{href}">通知设置</a>：它们会显示<strong>凭据无法读取</strong>，逐个编辑并重新填写机器人令牌或 webhook 地址。在此之前 Appflare 不会向它们发送任何消息。',
  "Removing Appflare": "正在移除 Appflare",
  "Removing Appflare from {account}": "正在从 {account} 移除 Appflare",
  "Each step shows here as it finishes; the manager Worker <code>{worker}</code> goes last. Keep this page open until the summary appears at the end.":
    "每一步完成后都会显示在这里；管理 Worker <code>{worker}</code> 放在最后处理。请保持这个页面打开，直到最后出现汇总。",
  Skipped: "已跳过",
  Failed: "失败",
  "Cloudflare Access protection was off; there was nothing to remove there.":
    "Cloudflare Access 保护当时是关闭的，那里没有需要移除的东西。",
  "Cloudflare Access protection is still on: its applications are removed last, so the manager stays protected until everything else is gone.":
    "Cloudflare Access 保护仍然开着：它的应用放在最后移除，这样在其他东西都清理干净之前，管理面板始终处于保护之下。",
  "The Cloudflare Access applications that protected the manager are deleted.":
    "保护管理面板的 Cloudflare Access 应用已删除。",
  "These Cloudflare Access applications could not be deleted: {apps}. Delete them under Zero Trust, Access, Applications, or they keep asking for a sign-in on the manager's address.":
    "这些 Cloudflare Access 应用无法删除：{apps}。请在 Zero Trust → Access → 应用中删除它们，否则它们会继续在管理面板的地址上要求登录。",
  "The removal stopped": "移除中止了",
  "What was deleted stays deleted. The manager Worker <code>{worker}</code>, its database and everything after the failed step are still in the account, so Appflare keeps working and jobs can start again.":
    "已经删除的不会恢复。管理 Worker <code>{worker}</code>、它的数据库以及失败步骤之后的所有东西都还在账户里，所以 Appflare 仍能正常工作，任务也可以重新启动。",
  'Fix the cause if the message names one, then run <strong>Remove Appflare from this account</strong> again from the <a href="{href}">danger zone</a>. Steps that are already done are skipped.':
    '如果提示里说明了原因，先解决它，然后从<a href="{href}">危险区</a>再次运行<strong>从本账户移除 Appflare</strong>。已完成的步骤会被跳过。',
  "Last step: the manager Worker": "最后一步：管理 Worker",
  "Now that this page has been sent, the Worker <code>{worker}</code> deletes itself, with its Workflow, its cron trigger and its workers.dev address. That takes a few seconds. This page is all that is left of Appflare; there is nothing to reload.":
    "这个页面发出之后，Worker <code>{worker}</code> 就会删除自己，连同它的 Workflow、定时触发器和 workers.dev 地址。这需要几秒钟。这个页面就是 Appflare 剩下的全部内容，没有可刷新的东西。",
  'If <code>{worker}</code> is still listed in the <a href="{href}" rel="noreferrer">Cloudflare dashboard</a> in a minute, delete it there.':
    '如果一分钟后 <code>{worker}</code> 仍出现在<a href="{href}" rel="noreferrer">Cloudflare 面板</a>里，请在那里删除它。',
  "Appflare's access to your account": "Appflare 对你账户的访问权限",
  'Appflare connected to Cloudflare with an authorization, not an API token. Right after deleting its Worker it withdraws that authorization, so it ends with nothing that can reach your account. If Appflare is still listed among the applications your Cloudflare profile has authorized, remove it there. Revoke any API tokens you created for apps that you no longer need under <a href="{href}" rel="noreferrer">Account API tokens</a>.':
    'Appflare 是通过授权（而不是 API 令牌）连接到 Cloudflare 的。删掉自己的 Worker 后，它会立刻撤回这项授权，所以最后不会留下任何能访问你账户的东西。如果 Appflare 仍出现在你 Cloudflare 档案已授权的应用里，请在那里移除它。你为不再需要的应用创建的 API 令牌，请在<a href="{href}" rel="noreferrer">账户 API 令牌</a>下吊销。',
  "Revoke the Appflare API token": "吊销 Appflare 的 API 令牌",
  'The Cloudflare API token you created for Appflare still works. Nothing uses it any more: revoke it under <a href="{href}" rel="noreferrer">Account API tokens</a> (or under My Profile, API Tokens if you created a user token), together with any tokens you created for apps that you no longer need.':
    '你为 Appflare 创建的 Cloudflare API 令牌仍然有效，但已经没有东西在用它了：请在<a href="{href}" rel="noreferrer">账户 API 令牌</a>下吊销它（如果你创建的是用户令牌，则在“我的个人资料 → API 令牌”下），连同你为不再需要的应用创建的令牌一起吊销。',
  "What stays": "保留下来的内容",
  "Every app Appflare installed, with its Worker, databases, buckets, namespaces and secrets. They keep running, unmanaged: nothing updates them any more.":
    "Appflare 安装的每个应用，连同它的 Worker、数据库、存储桶、命名空间和密钥。它们会继续运行，但不再受管理：没有任何东西会再更新它们。",
  "Custom domains of apps, which keep serving them.": "应用的自定义域名，它们会继续提供访问。",
  'The Cloudflare Access applications of apps Appflare protected, and the "Appflare users" policy they use, so those apps keep asking for a sign-in. Who can sign in is managed under Zero Trust, Access in the Cloudflare dashboard from now on.':
    "Appflare 保护的各个应用的 Cloudflare Access 应用，以及它们使用的 “Appflare users” 策略，所以这些应用仍会要求登录。此后谁能登录，在 Cloudflare 面板的 Zero Trust → Access 下管理。",
  'To manage the apps again, reinstall Appflare with the installer from the repository, as <a href="{href}" rel="noreferrer">the install guide</a> describes. It starts empty and does not know the apps already in the account.':
    '要重新管理这些应用，请按<a href="{href}" rel="noreferrer">安装指南</a>用仓库里的安装程序重新安装 Appflare。它启动时是空的，并不知道账户里已有的应用。',
  "Cloudflare did not let Appflare use Containers with its Cloudflare sign-in, so the sandbox Worker's container applications were not deleted. If they are still listed under Workers, Containers in the dashboard, delete them there.":
    "Cloudflare 不允许 Appflare 用它的 Cloudflare 登录使用 Containers，所以沙盒 Worker 的容器应用没有被删除。如果它们仍列在面板的 Workers → Containers 下，请在那里删除。",
  "Appflare's token cannot use Containers, so the sandbox Worker's container applications were not deleted. If they are still listed under Workers, Containers in the dashboard, delete them there.":
    "Appflare 的令牌无法使用 Containers，所以沙盒 Worker 的容器应用没有被删除。如果它们仍列在面板的 Workers → Containers 下，请在那里删除。",
  "See in Your account": "在“账户”里查看",
  "This account is on Workers Paid": "这个账户是 Workers Paid",
  Domain: "域名",
  "Choose a domain": "选择一个域名",
  "secret of Appflare's own Worker.": "是 Appflare 自己 Worker 的密钥。",

  // The password reset email and the pages around it.
  "To choose a new password, open this link within 30 minutes:":
    "要设置新密码，请在 30 分钟内打开这个链接：",
  "If that was not you, ignore this email. Your password stays the same.":
    "如果这不是你本人操作的，忽略这封邮件即可，你的密码不会改变。",
  ". The link works for 30 minutes.": "。链接有效期 30 分钟。",
  "Password reset emails work: people who forget their password can ask for a reset link on the sign-in page.":
    "密码重置邮件工作正常：忘记密码的人可以在登录页申请重置链接。",
  "Reset your Appflare password": "重置你的 Appflare 密码",
  "Appflare test email": "Appflare 测试邮件",
  "Delete a Cloudflare Access application of the manager": "删除管理面板的 Cloudflare Access 应用",
  "The auth secret was not rotated": "认证密钥未轮换",
  "Appflare was not removed": "Appflare 未被移除",
  "It is not available right now. Try again later.": "它目前不可用，请稍后再试。",

  // Labels a module hands to the UI: job step names, section titles, badges.
  "Appflare health check": "Appflare 健康检查",
  "Appflare gateway check": "Appflare 网关检查",
  "The passkey prompt was closed before a passkey was created.":
    "创建通行密钥之前，提示框就被关闭了。",
  "Automatically update apps": "自动更新应用",
  "Automatically update Appflare": "自动更新 Appflare",
  "Automatic app updates": "应用自动更新",
  "No catalog app uses it yet.": "目前还没有目录应用用到它。",
  "Not checked yet.": "尚未检查。",
  "Not checked yet": "尚未检查",
  "No address registered": "未登记地址",
  "Needs Workers Paid": "需要 Workers Paid",
  "Workers R2 Storage": "Workers R2 存储",
  "Workers KV Storage": "Workers KV 存储",
  "Workers KV Storage: Edit": "Workers KV 存储：编辑",
  "Workers R2 Data Catalog": "Workers R2 数据目录",
  "Workers Scripts: Edit": "Workers Scripts：编辑",
  "Workers Routes: Edit": "Workers 路由：编辑",
  "You provide it": "由你提供",
  "No catalog could be refreshed.": "没有任何目录可以刷新。",
  "Use a shorter URL.": "请使用更短的地址。",
  "Most popular first": "最热门优先",
  "This form is too large.": "这个表单太大了。",
  "Apps with a database elsewhere": "使用外部数据库的应用",
  "Show fewer categories": "收起部分分类",
  "Its workers.dev address": "它的 workers.dev 地址",
  "Appflare lives at its workers.dev address.": "Appflare 目前使用它的 workers.dev 地址。",
  "I have a recovery code": "我有恢复码",
  "Show recovery code": "显示恢复码",
  "Appflare sets it for you.": "Appflare 会自动为你填好。",
  "Email stays as it is": "邮件保持不变",
  "The bucket is empty.": "存储桶是空的。",
  "GitHub's list of refs is malformed": "GitHub 返回的 refs 列表格式不正确",
  "No update started": "没有启动更新",
  "Appflare update available": "Appflare 有可用更新",
  "Paste a Discord webhook URL.": "粘贴 Discord 的 webhook 地址。",
  "Test message from Appflare": "来自 Appflare 的测试消息",
  "Where should Appflare live?": "Appflare 应该放在哪里？",
  "No secrets are set.": "没有设置任何密钥。",
  "List of apps refreshed": "应用列表已刷新",
  "List of apps partly refreshed": "应用列表部分刷新",
  "Review a build": "审核构建",
  "Before you update": "更新前须知",
  "The job log has the details.": "任务日志里有详细信息。",
  "This app is already paused.": "这个应用已经暂停了。",
  "Of free limit": "的免费额度",
  "Free limit used up": "免费额度已用尽",
  "Visitors see a “paused” page.": "访客会看到“已暂停”页面。",
  "Appflare paused it.": "Appflare 暂停了它。",
  "Cap set aside": "上限已搁置",
  "Alerts go to Home.": "提醒会显示在首页。",
  "Off for this app": "这个应用已关闭",
  "Customize for this app": "为此应用自定义",

  // Messages the server and the modules hand to the UI.
  "There is no such install.": "没有这个安装。",
  "Included on every Workers plan.": "所有 Workers 套餐都包含。",
  "Could not read the account's domains.": "无法读取账户的域名。",
  "Appflare does not know its own Worker yet": "Appflare 还不知道自己的 Worker",
  "Serve on workers.dev": "在 workers.dev 上提供服务",
  "There is no such app.": "没有这个应用。",
  "What this account can run": "这个账户能运行什么",
  "Show technical names": "显示技术名称",
  "HTTP 200 from something that is not Appflare": "返回 HTTP 200 的并不是 Appflare",
  "Another job of this install is queued or running, or its state changed. Reload the page.":
    "这个安装还有任务在排队或运行，或者它的状态变了。请重新加载页面。",
  "Appflare does not know its Cloudflare account and Worker yet. Finish setup first.":
    "Appflare 还不知道自己的 Cloudflare 账户和 Worker。请先完成设置。",
  "This Access sign-in is not readable": "这个 Access 登录凭证无法解析",
  "Appflare could not check your Access sign-in": "Appflare 无法校验你的 Access 登录凭证",
  "BETTER_AUTH_SECRET is not set on this Worker.": "这个 Worker 上没有设置 BETTER_AUTH_SECRET。",
  "There are no admins to allow through Cloudflare Access.":
    "没有可以放行通过 Cloudflare Access 的管理员。",
  "No single version serves all of Appflare's traffic (a gradual deployment is in progress). Finish or undo it in the Cloudflare dashboard first.":
    "目前没有哪个单一版本承载了 Appflare 的全部流量（正在逐步部署）。请先在 Cloudflare 面板里完成或撤销它。",
  "The app's catalog listing was not loaded before its manifest.":
    "读取清单之前，应用的目录条目还没有加载。",
  "Could not save the choice.": "无法保存这个选择。",
  "Turn on in Cloudflare": "在 Cloudflare 中开启",
  "Add a domain in Cloudflare": "在 Cloudflare 中添加域名",
  "Edit token in Cloudflare": "在 Cloudflare 中编辑令牌",
  "Filled in for you": "已为你填好",
  "Suggested value filled in": "已填入建议值",
  "Sign in first.": "请先登录。",
  "There is no such catalog.": "没有这个目录。",
  "The image is larger than Appflare serves.": "图片超出了 Appflare 的提供上限。",
  "The catalog has not been loaded yet.": "目录还没有加载。",
  "Built in your account": "在你的账户中构建",
  "Could not save the token.": "无法保存令牌。",
  "Could not add the domain.": "无法添加域名。",
  "Checking the name…": "正在检查名称…",
  "This app is not in your catalogs": "这个应用不在你的目录里",
  "Sandbox builds in Your account": "账户里的沙盒构建",
  "Could not create the user.": "无法创建用户。",
  "Setup is already complete. Sign in instead.": "设置已经完成，请直接登录。",
  "GitHub answered with something that is not a list of refs": "GitHub 返回的内容不是 refs 列表",
  "Choose a zone.": "请选择一个区域。",
  "There is no such build.": "没有这个构建。",
  "That snapshot does not belong to this install.": "那个快照不属于这个安装。",
  "Appflare is not connected to the sandbox Worker, so this install's builds stay in its bucket (appflare-builds).":
    "Appflare 没有连上沙盒 Worker，所以这个安装的构建产物留在它的存储桶（appflare-builds）里。",
  "Everything was created": "全部已创建",
  "Preview URLs are enabled for this Worker.": "这个 Worker 已启用预览地址。",
  "Appflare: settings change": "Appflare：设置变更",
  "Databases in the app's settings": "应用设置里的数据库",
  "Only a job that failed can be reported.": "只有失败的任务才能提交报告。",
  "Send a report": "发送报告",
  "Nothing to change.": "没有需要更改的内容。",
  "Durable Object namespaces": "Durable Object 命名空间",
  "Cloudflare Access turned on": "Cloudflare Access 已开启",
  "The Access application was deleted in Cloudflare, so the app's addresses no longer ask for a sign-in. Protect it again.":
    "Access 应用已在 Cloudflare 中被删除，所以应用的地址不再要求登录。请重新保护它。",
  "Protecting it again brings its Access applications in step now.":
    "重新保护会立即让它的 Access 应用恢复一致。",
  "Only Appflare's users get in, members included.": "只有 Appflare 的用户能进入，包括成员。",
  "Everything at the app's addresses asks for a sign-in, links you share with others included.":
    "应用地址上的所有访问都要求登录，包括你分享给别人的链接。",
  "Cloudflare Access refused this request. Sign in through Access and try again.":
    "Cloudflare Access 拒绝了这个请求。请先通过 Access 登录再试。",
  "Sign in with Cloudflare Access": "使用 Cloudflare Access 登录",
  "This request did not come through Cloudflare Access, so Appflare did not answer it. Open the manager at its address and sign in when Access asks.":
    "这个请求不是经过 Cloudflare Access 的，所以 Appflare 没有响应。请通过管理面板的地址打开它，并在 Access 要求时登录。",
  "Your Access sign-in has expired": "你的 Access 登录已过期",
  "Reload the page to sign in with Cloudflare Access again.":
    "重新加载页面，以再次通过 Cloudflare Access 登录。",
  "Your Access sign-in is not valid yet": "你的 Access 登录尚未生效",
  "The sign-in token is dated in the future. Reload the page in a minute.":
    "登录令牌的时间在未来。请一分钟后重新加载页面。",
  "This Access sign-in is for another application": "这个 Access 登录属于另一个应用",
  "The request carried a Cloudflare Access sign-in, but not one for this manager. This happens when the Access application for the manager was deleted or re-created in the Cloudflare dashboard.":
    "请求带了 Cloudflare Access 登录凭证，但不是这个管理面板的。管理面板的 Access 应用在 Cloudflare 面板里被删除或重建时会出现这种情况。",
  "This Access sign-in is from another team": "这个 Access 登录来自另一个团队",
  "The request carried a Cloudflare Access sign-in issued by a different Zero Trust team than the one this manager was set up with.":
    "请求携带的 Cloudflare Access 登录由另一个 Zero Trust 团队签发，与这个管理面板配置的团队不同。",
  "This Access sign-in is not genuine": "这个 Access 登录不是真的",
  "Its signature does not match your Zero Trust team's keys.":
    "它的签名与你 Zero Trust 团队的密钥不匹配。",
  "The Cf-Access-Jwt-Assertion header is not a valid token.":
    "Cf-Access-Jwt-Assertion 头不是有效的令牌。",
  "The token is not signed the way Cloudflare Access signs tokens.":
    "这个令牌的签名方式与 Cloudflare Access 签发令牌的方式不符。",
  "It could not read its own settings. Try again in a minute.":
    "它无法读取自己的设置。请一分钟后重试。",
  "The Access team's signing keys could not be fetched recently":
    "最近无法获取 Access 团队的签名密钥",
  "This app is not protected with Cloudflare Access, so every path of it is public already.":
    "这个应用没有用 Cloudflare Access 保护，所以它的每个路径本来都是公开的。",
  "This app no longer exists.": "这个应用已不存在。",
  "Access: Apps and Policies: Edit": "Access：应用与策略：编辑",
  "Access: Organizations, Identity Providers, and Groups: Read":
    "Access：组织、身份提供商和组：读取",
  "Access: Service Tokens: Edit": "Access：服务令牌：编辑",
  "Another Access change is in progress. Try again in a minute.":
    "另一个 Access 变更正在进行。请一分钟后重试。",
  "The Access application was created, but the team's signing keys could not be fetched, so protection was not turned on and the application was removed. Try again in a minute.":
    "Access 应用已创建，但无法获取该团队的签名密钥，所以没有开启保护，应用也被移除了。请一分钟后重试。",
  "The Access policy for the manager no longer exists. Turn protection off and on again to recreate it.":
    "管理面板的 Access 策略已不存在。请关闭再重新开启保护以重建它。",
  "The Cloudflare Access application for the manager no longer exists. Turn protection off and on again to recreate it.":
    "管理面板的 Cloudflare Access 应用已不存在。请关闭再重新开启保护以重建它。",
  "This Worker has no BETTER_AUTH_SECRET, so Appflare cannot keep a service token's secret safely.":
    "这个 Worker 没有 BETTER_AUTH_SECRET，Appflare 无法安全保存服务令牌的密钥。",
  "There are no Appflare users to allow through Cloudflare Access.":
    "没有可以放行通过 Cloudflare Access 的 Appflare 用户。",
  "This app has no Cloudflare Access service token recorded.":
    "这个应用没有记录 Cloudflare Access 服务令牌。",
  "This app's Cloudflare Access service token no longer exists. Protecting the app again makes a new one.":
    "这个应用的 Cloudflare Access 服务令牌已不存在。重新保护这个应用会生成新的。",
  "This app's Cloudflare Access service token is still named in an Access policy. Remove the app's Access application (or the token from its policy) first, then try again.":
    "这个应用的 Cloudflare Access 服务令牌仍被某个 Access 策略引用。请先删除该应用的 Access 应用（或从策略中移除该令牌），然后重试。",
  "This app is not installed.": "这个应用尚未安装。",
  "This app is being uninstalled, so it cannot be protected.": "这个应用正在卸载，无法保护。",
  "This app has no Worker yet, so there is nothing to protect.":
    "这个应用还没有 Worker，没有可保护的东西。",
  "This app's Cloudflare Access application no longer exists. Protect the app again to make a new one.":
    "这个应用的 Cloudflare Access 应用已不存在。重新保护应用以生成新的。",
  "One-time PIN (a code sent by email)": "一次性 PIN（通过邮件发送的验证码）",
  "Apps that need Workers Paid ask for a confirmation, and installs count the account's cron triggers.":
    "需要 Workers Paid 的应用会要求确认，安装时也会统计账户的定时触发器数量。",
  "Installs and updates skip the Workers Paid confirmations and the count of cron triggers.":
    "安装和更新会跳过 Workers Paid 确认和定时触发器统计。",
  "Add Billing: Read to the token and Appflare detects this itself.":
    "给令牌加上“Billing：读取”权限，Appflare 就能自己识别。",
  "Remember this for the account": "为此账户记住这个选择",
  "Workers plan on Your account": "账户里的 Workers 套餐",
  "Sign in to continue.": "请登录后继续。",
  "You do not have permission to do that.": "你没有执行该操作的权限。",
  "The passkey prompt timed out. Try again.": "通行密钥提示超时了。请重试。",
  "Passkeys cannot be used at this address. Open the manager at its own address and try again.":
    "这个地址无法使用通行密钥。请通过管理面板自己的地址打开再试。",
  "Too many sign-in attempts. Wait a minute, then try again.": "登录尝试次数过多。请等一分钟再试。",
  "Passkey sign-in failed. Try again, or sign in with your email and password.":
    "通行密钥登录失败。请重试，或改用邮箱和密码登录。",
  "This browser does not support passkeys": "这个浏览器不支持通行密钥",
  "This device already has a passkey for your account.": "这个设备已经为你的账户存有通行密钥。",
  "Appflare: turn on password reset emails": "Appflare：开启密码重置邮件",
  "Appflare: turn off password reset emails": "Appflare：关闭密码重置邮件",
  "Appflare is being removed": "Appflare 正在被移除",
  "That recovery code is not right, was already used, or has expired. Check it, or get a new one.":
    "恢复码不正确、已使用或已过期。请核对，或获取新的。",
  "This reset link is not valid any more: it was used, or it is older than 30 minutes.":
    "这个重置链接已失效：它已被使用，或者已经超过 30 分钟。",
  "Password reset emails are off on this Appflare. Use a recovery code instead.":
    "这个 Appflare 关闭了密码重置邮件。请改用恢复码。",
  "If an account uses that address, a link to choose a new password is on its way. It works for 30 minutes.":
    "如果有账户使用该地址，设置新密码的链接已经在路上了，有效期 30 分钟。",
  "Could not reset the password. Try again in a moment.": "无法重置密码。请稍后重试。",
  "The email or password is not correct. Check both and try again.":
    "邮箱或密码不正确。请检查后重试。",
  "Enter a valid email address.": "请输入有效的邮箱地址。",
  "Appflare refused the sign-in from this address. Open the manager at its own address and try again.":
    "Appflare 拒绝了这个地址的登录。请通过管理面板自己的地址打开再试。",
  "Could not sign you in. Try again in a moment.": "无法让你登录。请稍后重试。",
  "Could not reach Appflare. Check your connection and try again.":
    "无法连接到 Appflare。请检查网络后重试。",
  "It changed how it is installed, so it cannot be updated in place: uninstall it and install it again to get this version.":
    "它改变了安装方式，无法就地更新：请卸载后重新安装以获得这个版本。",
  "It is built in your account or runs its own installer, which you approve each time.":
    "它在你账户里构建，或者运行自己的安装程序，每次都需要你确认。",
  "An update to this version failed before.": "之前更新到这个版本失败过。",
  "It was rolled back from this version.": "它曾从这个版本回滚过。",
  "Cloudflare sign-in cannot share the account's Workers plan with Appflare, so choose it once here. If the account can use Containers, Appflare counts it as Workers Paid by itself.":
    "Cloudflare 登录方式无法把账户的 Workers 套餐告知 Appflare，所以请在这里选择一次。如果账户能用 Containers，Appflare 会自行判定为 Workers Paid。",
  "Cloudflare sign-in cannot share the account's Workers plan with Appflare, so Appflare uses the one you chose. If the account can use Containers, Appflare counts it as Workers Paid by itself.":
    "Cloudflare 登录方式无法把账户的 Workers 套餐告知 Appflare，所以 Appflare 使用你选择的那个。如果账户能用 Containers，Appflare 会自行判定为 Workers Paid。",
  "The token cannot read the account's workers.dev subdomain (Workers Scripts permission).":
    "这个令牌无法读取账户的 workers.dev 子域（需要 Workers Scripts 权限）。",
  "Cloudflare refused the token's Analytics Engine query, so Appflare cannot tell whether it is on.":
    "Cloudflare 拒绝了这个令牌的 Analytics Engine 查询，所以 Appflare 无法判断它是否已开启。",
  "Cloudflare's answer did not say which Workers plan applies (for example a contract plan).":
    "Cloudflare 的响应没有说明适用哪种 Workers 套餐（例如合约套餐）。",
  "Paid plan only": "仅限付费套餐",
  "Could not check": "无法检查",
  "Reconnect Cloudflare and allow every permission Appflare asks for.":
    "重新连接 Cloudflare，并允许 Appflare 请求的所有权限。",
  "Some apps need Workers Paid, which lifts the free plan's limits and runs containers.":
    "有些应用需要 Workers Paid，它能解除免费套餐的限制并运行容器。",
  "Not known, treated as Workers Free": "未知，按 Workers Free 处理",
  "Appflare checks Email Routing on a domain of the account, and could not list the domains.":
    "Appflare 要在账户的某个域名上检查邮件路由，但无法列出域名。",
  "Stores what apps count and chart, such as page views. Turning it on is free.":
    "存储应用统计和绘制的数据，比如页面浏览量。开启是免费的。",
  "Builds apps that have no ready-made release inside your account.":
    "在账户内构建没有现成发布版本的应用。",
  "The catalog lists no signed release, so its key cannot be checked. Add it once it has released one.":
    "这个目录没有列出任何已签名的发布版本，因此无法校验它的密钥。等它发布之后再添加。",
  "Choose one of the colours.": "请选择一种颜色。",
  "GitHub is limiting requests from Cloudflare's network right now (Workers share their addresses, and GitHub allows each address 60 requests an hour without a token).":
    "GitHub 现在限制了来自 Cloudflare 网络的请求（Worker 共享出口地址，而不带令牌时 GitHub 每小时只允许每个地址 60 次请求）。",
  "Appflare asks again after": "Appflare 会在以下时间之后再次询问：",
  "Try again after": "请在以下时间之后重试：",
  "The catalog site could not be reached.": "无法访问目录站点。",
  "The image does not match the digest the catalog lists.": "图片与目录列出的摘要不一致。",
  "Domain and DNS": "域名与 DNS",
  "Included on every Workers plan, with a daily free allocation.":
    "所有 Workers 套餐都包含，每天有免费额度。",
  "Included on every Workers plan, with limited browser time on Workers Free.":
    "所有 Workers 套餐都包含，Workers Free 下浏览器时间有限。",
  "Included on every Cloudflare plan, with a monthly free allocation.":
    "所有 Cloudflare 套餐都包含，每月有免费额度。",
  "Provided by you: a PostgreSQL or MySQL database outside Cloudflare, whose connection string you enter when you install. Hyperdrive, included on every Workers plan, connects the app to it.":
    "由你提供：一个 Cloudflare 之外的 PostgreSQL 或 MySQL 数据库，安装时填入它的连接字符串。所有 Workers 套餐都包含的 Hyperdrive 会把应用连接到它。",
  "Detected: this account has an active zone.": "已检测到：这个账户有已激活的区域。",
  "Turn on Analytics Engine once in the dashboard, then choose Check again on Your account.":
    "先在面板里开启一次 Analytics Engine，然后在“账户”页选择“重新检查”。",
  "Detected: Analytics Engine is turned on.": "已检测到：Analytics Engine 已开启。",
  "Detected: R2 is enabled.": "已检测到：R2 已启用。",
  "Appflare could not check R2 on this account.": "Appflare 无法检查这个账户的 R2。",
  "Detected: Containers are available.": "已检测到：Containers 可用。",
  "Built in your account, so the rest is known once it is built.":
    "在你的账户里构建，构建完成后才能知道其余信息。",
  "Appflare has not read this version's manifest yet, so only its requirements are shown.":
    "Appflare 还没有读取这个版本的清单，所以这里只显示它的要求。",
  "Email Routing must be enabled on a zone in the account so that email can be delivered to the app's Worker.":
    "必须在账户的某个区域上启用邮件路由，邮件才能投递到应用的 Worker。",
  "The app drives a headless browser with Browser Rendering, whose free plan allows limited browser time a day.":
    "这个应用用 Browser Rendering 驱动无头浏览器，免费套餐每天允许的浏览器时间有限。",
  "The app's installer runs in a container in this account, which needs the Workers Paid plan.":
    "这个应用的安装程序在这个账户的容器里运行，需要 Workers Paid 套餐。",
  "Email Routing must be enabled on a zone in the account so that email can be delivered to the app. Appflare does not set Email Routing up for an app that deploys itself.":
    "必须在账户的某个区域上启用邮件路由，邮件才能投递到应用。对于自行部署的应用，Appflare 不会配置邮件路由。",
  "Newest test results first, until the catalog says when each app was added.":
    "最新的测试结果排在前面，直到目录给出每个应用的添加时间。",
  "Most starred on GitHub": "GitHub 星标最多",
  "CF_API_BASE_URL ignored: only loopback hosts are allowed":
    "已忽略 CF_API_BASE_URL：只允许回环地址",
  "The Cloudflare API token is not configured. Finish setup at /setup.":
    "还没有配置 Cloudflare API 令牌。请在 /setup 完成设置。",
  "The Cloudflare account is not known yet. Finish setup at /setup.":
    "还不知道 Cloudflare 账户。请在 /setup 完成设置。",
  "Appflare is still redeploying itself with its new Cloudflare connection. Try again in a few seconds.":
    "Appflare 仍在用新的 Cloudflare 连接重新部署自己。请几秒后重试。",
  "Appflare could not renew its access to Cloudflare just now: Cloudflare did not answer or was busy. Try again in a minute.":
    "Appflare 刚才无法续期它对 Cloudflare 的访问：Cloudflare 没有响应或正忙。请一分钟后重试。",
  "Appflare is renewing its access to Cloudflare in another request. Try again in a minute.":
    "Appflare 正在另一个请求中续期它对 Cloudflare 的访问。请一分钟后重试。",
  "Reconnect Appflare to Cloudflare": "重新连接 Appflare 与 Cloudflare",
  "Your apps keep running, but none can be installed or changed until then.":
    "你的应用会继续运行，但在那之前无法安装或修改任何应用。",
  "Your apps keep running. Reconnect to install or change them again.":
    "你的应用仍在运行。重新连接后即可再次安装或修改。",
  "Your apps keep running. An administrator reconnects here.":
    "你的应用仍在运行。由管理员在这里重新连接。",
  "Change how Appflare connects": "更改 Appflare 的连接方式",
  "How Appflare reaches your Cloudflare account.": "Appflare 如何访问你的 Cloudflare 账户。",
  "An API token": "API 令牌",
  "Your apps keep running either way.": "无论哪种方式，你的应用都会继续运行。",
  "Recommended. Nothing to copy or paste.": "推荐。不需要复制粘贴任何东西。",
  "Use a new API token": "使用新的 API 令牌",
  "Use an API token": "使用 API 令牌",
  "Create one in Cloudflare and paste it here. It replaces the sign-in.":
    "在 Cloudflare 里创建一个并粘贴到这里。它会取代登录授权。",
  "Create one in Cloudflare and paste it here. It replaces the current token.":
    "在 Cloudflare 里创建一个并粘贴到这里。它会取代当前令牌。",
  "Cloudflare no longer accepts this connection: it was withdrawn in Cloudflare, it expired, or it was used somewhere else.":
    "Cloudflare 不再接受这个连接：它在 Cloudflare 里被撤销、已过期，或在别处用过。",
  "Cloudflare did not answer when Appflare renewed its access. Appflare tries again by itself.":
    "Appflare 续期访问时 Cloudflare 没有响应。Appflare 会自行重试。",
  "This version of Appflare cannot read its saved connection to Cloudflare.":
    "这个版本的 Appflare 无法读取已保存的 Cloudflare 连接。",
  "The stored Cloudflare connection is not in a format Appflare reads.":
    "保存的 Cloudflare 连接格式无法被 Appflare 识别。",
  "Appflare is not connected to a Cloudflare account yet. Finish setup first, then reconnect here.":
    "Appflare 还没有连接 Cloudflare 账户。请先完成设置，再在这里重新连接。",
  "Appflare can only return from Cloudflare to an https address. Open Appflare at its https address and start again.":
    "Appflare 只能从 Cloudflare 返回到 https 地址。请通过它的 https 地址打开并重新开始。",
  "The Cloudflare token cannot see that zone.": "Cloudflare 令牌看不到那个区域。",
  "The Cloudflare token cannot see that domain. It needs Zone: Read, DNS: Edit and Workers Routes: Edit on it.":
    "Cloudflare 令牌看不到那个域名。它需要在该域名上具备“Zone：读取”“DNS：编辑”和“Workers 路由：编辑”权限。",
  "Workers plan detection": "Workers 套餐识别",
  "Not selected for you: Cloudflare's token link has no way to select it. Add it in the form.":
    "未替你勾选：Cloudflare 的令牌链接无法选择它。请在表单里自行添加。",
  "Cloudflare rejected this token. Check that you copied the whole value and that the token is active.":
    "Cloudflare 拒绝了这个令牌。请确认你复制了完整内容，且令牌处于启用状态。",
  "Cloudflare rejected this token, or it lacks the Account Settings: Read permission Appflare needs to find its account.":
    "Cloudflare 拒绝了这个令牌，或者它缺少 Appflare 查找账户所需的“Account Settings：读取”权限。",
  "This token cannot see any Cloudflare account. Add the Account Settings: Read permission.":
    "这个令牌看不到任何 Cloudflare 账户。请加上“Account Settings：读取”权限。",
  "This token is not valid for the Cloudflare account Appflare runs in. Create it in that account.":
    "这个令牌对 Appflare 所在的 Cloudflare 账户无效。请在该账户里创建。",
  "This manager cannot verify which Cloudflare account it runs in, so it cannot accept a token here. Update it or reinstall it, or open it at its workers.dev address.":
    "这个管理面板无法确认自己运行在哪个 Cloudflare 账户里，因此不能在这里接受令牌。请更新或重装它，或者通过它的 workers.dev 地址打开。",
  "Could not reach the Cloudflare API. Try again.": "无法访问 Cloudflare API。请重试。",
  "This Cloudflare authorization cannot list the account's Workers, so Appflare cannot confirm it runs there. Connect again and allow every permission Appflare asks for.":
    "这个 Cloudflare 授权无法列出账户的 Workers，所以 Appflare 无法确认它运行在那里。请重新连接并允许 Appflare 请求的所有权限。",
  "Settings change started": "设置变更已开始",
  "Could not save the settings.": "无法保存设置。",
  "Generated for you. Copy it now if you need it: it cannot be shown again once saved.":
    "已为你生成。需要的话现在就复制：保存之后就无法再次显示。",
  "Built from its pinned commit and signed by the catalog.": "从它固定的提交构建，由目录签名。",
  "No prebuilt release: your sandbox Worker builds the pinned commit on Workers Paid. The build is not signed.":
    "没有预构建的发布版本：你的沙盒 Worker 会在 Workers Paid 下构建那个固定的提交。该构建不做签名。",
  "Ships its own installer, which your sandbox Worker runs on Workers Paid with a Cloudflare token you create for the app.":
    "自带安装程序，由你的沙盒 Worker 在 Workers Paid 下、用你为该应用创建的 Cloudflare 令牌运行。",
  "Clear search and filters": "清除搜索和筛选",
  "From the official Appflare catalog, verified with the keys built into Appflare.":
    "来自官方 Appflare 目录，用内置在 Appflare 里的密钥校验。",
  "Custom domains, added on each installed app's page": "自定义域名，在每个已安装应用的页面上添加",
  "Installing an app that receives email (it also needs Zone: Read and DNS: Edit from the custom domains list)":
    "安装接收邮件的应用（还需要自定义域名列表里的“Zone：读取”和“DNS：编辑”）",
  "Could not verify the token.": "无法校验令牌。",
  "Something went wrong. Try again.": "出错了，请重试。",
  "No custom domains. The app is served on its workers.dev URL only.":
    "没有自定义域名。应用只通过它的 workers.dev 地址提供服务。",
  "No custom domains.": "没有自定义域名。",
  "Could not check the domain.": "无法检查域名。",
  "The app stops answering on this hostname. If this is its last live domain while workers.dev is off, Appflare turns workers.dev back on first, unless an admin turned it off.":
    "应用将在这个主机名上停止响应。如果这是在 workers.dev 关闭时它最后一个可用域名，Appflare 会先重新开启 workers.dev，除非是管理员关掉的。",
  "The app keeps its data in a database you run elsewhere. Appflare never stores the connection string.":
    "应用的数据保存在你在别处运行的数据库里。Appflare 从不保存连接字符串。",
  "The Cloudflare token cannot manage custom domains yet":
    "Cloudflare 令牌暂时还无法管理自定义域名",
  "Could not read Email Routing for that domain.": "无法读取该域名的邮件路由。",
  "Sponsors pay for this spot, which helps fund Appflare.":
    "赞助商为这个位置付费，用于支持 Appflare。",
  "Cloudflare Access change": "Cloudflare Access 变更",
  "Could not load the tokens.": "无法加载令牌。",
  "Could not read the domains.": "无法读取域名。",
  "Its review opens with the choices from last time once it is built.":
    "构建完成后，它的审核页会带上上次的选择。",
  "Only admins can install apps": "只有管理员可以安装应用",
  "Could not start the install.": "无法开始安装。",
  "Cloudflare Access answered, so Appflare can't check the app itself. Open the app and sign in to check it.":
    "响应的是 Cloudflare Access，所以 Appflare 无法自己检查应用。请打开应用并登录检查。",
  "The official catalog is turned off on this Appflare, so its apps are not listed. An admin can turn it back on in Catalog settings.":
    "这个 Appflare 关闭了官方目录，所以不列出它的应用。管理员可以在目录设置里重新开启。",
  "This link does not name a GitHub repository": "这个链接没有指明 GitHub 仓库",
  "An install link for a repository looks like /install/github/owner/repo. Check the link, or install from a repository on the catalog page.":
    "仓库安装链接的样子是 /install/github/owner/repo。请检查链接，或在应用中心页从仓库安装。",
  "Could not prepare the report.": "无法准备报告。",
  "Its log shows each step as it runs.": "它的日志会显示每一步的执行情况。",
  "The move's job could not be found. Reload the page.": "找不到迁移任务。请重新加载页面。",
  "Could not move Appflare. Try again.": "无法迁移 Appflare。请重试。",
  "Replace records and move": "替换记录并迁移",
  "Replace the existing DNS records with the one for Appflare":
    "用 Appflare 的记录替换现有的 DNS 记录",
  "Cloudflare deletes them, and Appflare cannot put them back, not even if Appflare later leaves this address.":
    "Cloudflare 会删除它们，Appflare 无法恢复，即使之后 Appflare 离开这个地址也不行。",
  "Could not read Appflare's address.": "无法读取 Appflare 的地址。",
  "R2 in the dashboard": "面板里的 R2",
  "This device only": "仅此设备",
  "Could not rename the app.": "无法重命名这个应用。",
  "Used once to create the first admin account. Appflare does not keep it.":
    "只用于创建第一个管理员账户。Appflare 不会保存它。",
  "The app already has this key. Paste it to keep existing push subscriptions, or generate a new one (subscribers must subscribe again).":
    "应用已经有这个密钥。粘贴以保留现有的推送订阅，或生成新的（订阅者需要重新订阅）。",
  "The app already has this secret. Enter its current value to keep it, or a new one to replace it.":
    "应用已经有这个密钥。填入当前值以保留，或填入新值以替换。",
  "Paste it with its line breaks. It is hidden once saved.": "连换行一起粘贴。保存后会被隐藏。",
  "The app's page shows the job while it runs.": "任务运行期间，应用的页面会显示它。",
  "Could not check for changes.": "无法检查变更。",
  "It was built from a commit, which never changes. Rebuild it to pick up a new build command or a moved dependency.":
    "它是从某个提交构建的，而提交不会变。要采用新的构建命令或变更后的依赖，请重新构建。",
  "Could not start the update.": "无法开始更新。",
  "Could not build the preview.": "无法生成预览。",
  "Only the owner can change roles or delete users.": "只有所有者可以更改角色或删除用户。",
  "The Cloudflare Access policy of your protected apps was not updated. Appflare tries again within 30 minutes.":
    "你受保护应用的 Cloudflare Access 策略没有更新。Appflare 会在 30 分钟内重试。",
  "Appflare has no email provider, so you share a temporary password with them.":
    "Appflare 没有邮件服务，所以需要你把这个临时密码告诉对方。",
  "Not available: this update changed the app's Durable Object classes, and Cloudflare refuses to roll a Worker back across such a change.":
    "不可用：这次更新改变了应用的 Durable Object 类，而 Cloudflare 拒绝跨这类变更回滚 Worker。",
  "Could not change the workers.dev URL.": "无法修改 workers.dev 地址。",
  "Choose a domain first.": "请先选择一个域名。",
  "Only the owner can rotate the auth secret or remove Appflare.":
    "只有所有者可以轮换认证密钥或移除 Appflare。",
  "Appflare is being removed from this account, so no job can start.":
    "Appflare 正在从这个账户移除，无法启动任务。",
  "Sign in as the owner, then try again.": "请以所有者身份登录后重试。",
  "A removal of Appflare is already running. Wait for its page to finish.":
    "已经有一个移除 Appflare 的过程在运行。请等它的页面结束。",
  "Timed out waiting for another isolate to finish migrating": "等待另一个 isolate 完成迁移超时",
  "Appflare's address is already being changed. Try again in a minute.":
    "Appflare 的地址正在变更中。请一分钟后重试。",
  "Appflare does not know its own Worker name yet. Save the Cloudflare token under Your account first.":
    "Appflare 还不知道自己的 Worker 名称。请先在“账户”页保存 Cloudflare 令牌。",
  "Appflare lives at its workers.dev address. Choose a domain to move it there.":
    "Appflare 目前使用它的 workers.dev 地址。选择一个域名即可迁移过去。",
  "Appflare could not find this account's workers.dev subdomain, so it cannot tell its workers.dev address.":
    "Appflare 找不到这个账户的 workers.dev 子域，因此无法确定它的 workers.dev 地址。",
  "Waiting for the certificate and the new address": "正在等待证书和新地址",
  "Moving Cloudflare Access": "正在迁移 Cloudflare Access",
  "Switching the address": "正在切换地址",
  "Detaching the old domain": "正在解绑旧域名",
  "Waiting longer would not change that answer: see what serves the name, then start the move again.":
    "再等也不会改变结果：看看是什么在提供这个名字，然后重新开始迁移。",
  "Appflare moves here once it is ready.": "Appflare 就绪后会迁移到这里。",
  "Appflare moved to this address. Sign in again with your password.":
    "Appflare 已迁移到这个地址。请用密码重新登录。",
  "Next time, sign in with your fingerprint, face or screen lock.":
    "下次可以用指纹、面容或屏幕锁登录。",
  "Appflare is moving to ": "Appflare 正在迁移到 ",
  "Appflare is not waiting to move anywhere.": "Appflare 没有待迁移的目标。",
  "The sandbox Worker did not answer. Try again in a minute.":
    "沙盒 Worker 没有响应。请一分钟后重试。",
  "There is no such token.": "没有这个令牌。",
  "Give the token a label.": "请给令牌起个名称。",
  "Choose what Appflare uses the token for.": "请选择 Appflare 用这个令牌做什么。",
  "Appflare: read-only access to build private repositories":
    "Appflare：用于构建私有仓库的只读访问",
  "Cloudflare must be connected again from the page that installed Appflare.":
    "必须从安装 Appflare 的那个页面重新连接 Cloudflare。",
  "This request did not come from the page that installed this Appflare.":
    "这个请求不是来自安装此 Appflare 的页面。",
  "Requests from this page are not accepted.": "不接受来自这个页面的请求。",
  "This is not a valid handoff request.": "这不是有效的交接请求。",
  "This handoff request is too large.": "这个交接请求太大了。",
  "The first handoff must carry the Cloudflare authorization and the account.":
    "第一次交接必须携带 Cloudflare 授权和账户。",
  "Appflare could not finish connecting to Cloudflare. Try again.":
    "Appflare 未能完成与 Cloudflare 的连接。请重试。",
  "New permission for usage": "读取用量所需的新权限",
  "Reconnect to Cloudflare to see each app's usage and turn on spend protection.":
    "重新连接 Cloudflare，才能看到每个应用的用量并开启花费保护。",
  "It needs something from you first, such as a new setting or a confirmation.":
    "它需要你先提供一些东西，比如一个新的设置或一次确认。",
  "Only apps that deploy themselves have a token in Appflare.":
    "只有自行部署的应用才会在 Appflare 里有令牌。",
  "Leave empty for the root domain": "根域名留空",
  "Being set up": "正在配置",
  "This app needs every name under its hostname. Add a wildcard domain instead.":
    "这个应用需要它的主机名下所有名字。请改为添加通配域名。",
  "That is not a custom domain of this app.": "那不是这个应用的自定义域名。",
  "The name cannot be empty.": "名称不能为空。",
  "The name cannot hold line breaks or tabs.": "名称不能包含换行或制表符。",
  "Cloudflare dashboard under Email Service, Email Routing, Destination addresses. Sending to any ":
    "Cloudflare 面板的 Email Service → 邮件路由 → 目标地址。向任何",
  "That is not an external domain of this app.": "那不是这个应用的外部域名。",
  "The app is being uninstalled.": "这个应用正在卸载。",
  "The account's workers.dev subdomain is not known yet.": "还不知道账户的 workers.dev 子域。",
  "There is no such install to install again.": "没有可以重新安装的安装。",
  "Only an install that did not finish can be installed again. This one finished, or it was removed or installed again already.":
    "只有未完成的安装才能重新安装。这个已经完成，或者已被移除、已经重装过。",
  "This install was built from a repository or from source, so it is installed again from the review of its build.":
    "这个安装是从仓库或源码构建的，请从它构建的审核页重新安装。",
  "This install came from the catalog, so it is installed again from the app's catalog page.":
    "这个安装来自目录，请从应用的目录页重新安装。",
  "A job of this install is running. Wait for it to finish, then install it again.":
    "这个安装有任务正在运行。等它结束后再重新安装。",
  "Appflare has no record of the build this install was made from.":
    "Appflare 没有记录这个安装是从哪次构建来的。",
  "Sandbox builds are off, so Appflare cannot read this build. Turning them off deletes every build.":
    "沙盒构建已关闭，所以 Appflare 无法读取这个构建。关闭沙盒构建会删除所有构建。",
  "The build's files are no longer in the sandbox Worker's bucket.":
    "这个构建的文件已不在沙盒 Worker 的存储桶里。",
  "The sandbox Worker did not answer, so Appflare could not check that the build is still there. Reload the page to try again.":
    "沙盒 Worker 没有响应，所以 Appflare 无法确认构建是否还在。请重新加载页面重试。",
  "Reload the page to build it again.": "请重新加载页面再构建一次。",
  "This install does not record the repository it came from.": "这个安装没有记录它来自哪个仓库。",
  "Appflare never stores database connection strings, so enter them again.":
    "Appflare 从不保存数据库连接字符串，请重新输入。",
  "Another app here already uses this name. Choose another.":
    "这里已经有另一个应用用了这个名字。请换一个。",
  "Could not check whether the name is in use.": "无法检查这个名字是否已被占用。",
  "The install will leave this name out": "这次安装会跳过这个名称",
  "The Worker lacks Durable Object migrations its version declares. Update or reinstall the app to change its settings.":
    "这个 Worker 缺少它版本声明的 Durable Object 迁移。要修改设置，请更新或重装应用。",
  "What is left out of the app's email changed since this page was loaded. Reload it to see what setting it up again does now.":
    "这个页面加载之后，应用邮件里被排除的内容变了。请重新加载，看看现在重新配置会做什么。",
  "A job of this install is queued or running. Wait for it to finish, then try again.":
    "这个安装有任务在排队或运行。请等它结束后重试。",
  "Not from the catalog, not checked": "非目录来源，未检查",
  "Built from source, not checked": "从源码构建，未检查",
  "The catalog manifest of this app is not available.": "这个应用的目录清单不可用。",
  "The build runs in your sandbox Worker on Workers Paid. Confirm its cost.":
    "构建会在 Workers Paid 下的沙盒 Worker 里运行。请确认费用。",
  "Another job of this install is queued or running, sandbox builds are being changed, or Appflare is updating itself. Wait for it to finish, then try again.":
    "这个安装还有任务在排队或运行、沙盒构建正在变更，或者 Appflare 正在更新自己。请等它结束后重试。",
  "Sandbox builds are being changed, or Appflare is updating itself. Wait for it to finish, then try again.":
    "沙盒构建正在变更，或者 Appflare 正在更新自己。请等它结束后重试。",
  "The build is still running.": "构建仍在运行。",
  "The build's record is incomplete. Start a new build.": "这个构建的记录不完整。请开始新的构建。",
  "This build is in use by an install.": "这个构建正被某个安装使用。",
  "This build was thrown away already.": "这个构建已被丢弃。",
  "The build changed meanwhile. Reload the page.": "构建在此期间变了。请重新加载页面。",
  "Only an unfinished uninstall can be retried.": "只有未完成的卸载才能重试。",
  "The Worker already runs the version this snapshot recorded.":
    "Worker 已经在运行这个快照记录的版本。",
  "This update changed the app's Durable Object classes, and Cloudflare refuses to roll a Worker back across such a change.":
    "这次更新改变了应用的 Durable Object 类，而 Cloudflare 拒绝跨这类变更回滚 Worker。",
  "That is not a wildcard domain of this app.": "那不是这个应用的通配域名。",
  "Enter a name.": "请输入名称。",
  "The app's own installer decides whether its Worker answers on workers.dev.":
    "应用的 Worker 是否在 workers.dev 上响应，由它自己的安装程序决定。",
  "This app has no custom or external domain, so workers.dev is its only address. Add one first.":
    "这个应用没有自定义域名或外部域名，所以 workers.dev 是它唯一的地址。请先添加一个。",
  "Live behind Cloudflare Access. Access answered with its sign-in page, so Appflare can't check the app itself through this domain.":
    "运行在 Cloudflare Access 之后。响应的是 Access 的登录页，所以 Appflare 无法通过这个域名检查应用本身。",
  "The app answers only on its custom and external domains. Update checks still use the Worker's preview URLs.":
    "应用只在它的自定义域名和外部域名上响应。更新检查仍使用 Worker 的预览地址。",
  "The admin confirmed this account meets these requirements.":
    "管理员已确认这个账户满足这些要求。",
  "This app version": "这个应用版本",
  "Cloudflare Access destinations not updated": "Cloudflare Access 目标未更新",
  "The public paths this version drops were taken off Cloudflare Access before the job failed. Within 30 minutes, Appflare makes them public again for the version that still serves.":
    "这个版本要去掉的公开路径，在任务失败前已从 Cloudflare Access 移除。Appflare 会在 30 分钟内为仍在服务的版本重新把它们设为公开。",
  "Delete D1 databases the account no longer uses (for example by uninstalling an app that has one without keeping its data)":
    "删除账户已不再使用的 D1 数据库（例如卸载一个带数据库的应用且不保留数据）",
  "Delete Hyperdrive configurations the account no longer uses (for example by uninstalling an app that connects to a database)":
    "删除账户已不再使用的 Hyperdrive 配置（例如卸载一个连接到数据库的应用）",
  "Delete Vectorize indexes the account no longer uses (for example by uninstalling an app that has one without keeping its data)":
    "删除账户已不再使用的 Vectorize 索引（例如卸载一个带索引的应用且不保留数据）",
  "Workers plan in Your account": "“账户”里的 Workers 套餐",
  "Cloudflare did not return an assets completion token": "Cloudflare 没有返回静态资源的完成令牌",
  "The app is protected now": "应用现在已受保护",
  "The protection is removed": "保护已移除",
  "The new settings are in place": "新设置已生效",
  "The API token can use Pipelines on this account.": "API 令牌可以在本账户上使用 Pipelines。",
  "Enable R2 in the Cloudflare dashboard under R2 Object Storage. Cloudflare asks for a payment ":
    "在 Cloudflare 面板的 R2 Object Storage 下启用 R2。Cloudflare 会要求填写支付信息",
  "Then try again.": "然后重试。",
  "Appflare removes what this install created.": "Appflare 会移除这次安装创建的东西。",
  "Appflare's Cloudflare sign-in reaches this account.":
    "Appflare 的 Cloudflare 登录能访问这个账户。",
  "Delete the Workflow in the Cloudflare dashboard, or update the app to a version that defines it.":
    "在 Cloudflare 面板里删除这个 Workflow，或把应用更新到定义它的版本。",
  "Rolling Appflare back": "正在回滚 Appflare",
  "Turning on sandbox builds": "正在开启沙盒构建",
  "Updating sandbox builds": "正在更新沙盒构建",
  "Turning off sandbox builds": "正在关闭沙盒构建",
  "Building for review": "正在构建以供审核",
  "Moving Appflare to its new address": "正在把 Appflare 迁移到新地址",
  "Cloudflare did not accept Appflare's access.": "Cloudflare 没有接受 Appflare 的访问。",
  "Cloudflare refused a permission Appflare needs.": "Cloudflare 拒绝了 Appflare 需要的一项权限。",
  "The app keeps running as it was.": "应用保持原样继续运行。",
  "Appflare stays at its current address.": "Appflare 停留在当前地址。",
  "An earlier pause of the app did not finish. This one carries on from what it recorded.":
    "之前暂停这个应用的过程没有完成。这次会从它记录的位置继续。",
  "This Worker does not exist on your account.": "你的账户里没有这个 Worker。",
  "This app is paused by its owner": "这个应用被它的所有者暂停了",
  "Cloudflare never started the job's Workflow instance":
    "Cloudflare 从未启动这个任务的 Workflow 实例",
  "Nothing changes: the settings, secrets, database connections and email zone are as they are.":
    "不会有任何变化：设置、密钥、数据库连接和邮件区域都保持原样。",
  "Recorded the new settings and secret names on the install.":
    "已在安装上记录新的设置和密钥名称。",
  "Nothing was changed. Once that is done, set up the app's email again from its settings.":
    "没有任何改动。等那一步完成之后，再从应用设置里重新配置邮件。",
  "Resuming the app. Its pause recorded no Worker, so no Worker changes.":
    "正在恢复应用。它的暂停没有记录 Worker，所以不会改动 Worker。",
  "Automatic updates on the app's page": "应用页面上的自动更新",
  "The Worker that serves the app has no workers.dev route, so Appflare cannot check it. Open the app from the address its installer printed.":
    "为应用提供服务的 Worker 没有 workers.dev 路由，所以 Appflare 无法检查它。请从安装程序打印的地址打开应用。",
  "The sandbox Worker holds the app's token and secrets for this install.":
    "沙盒 Worker 保存着这次安装的应用令牌和密钥。",
  "Secrets in the app's settings": "应用设置里的密钥",
  "Nothing changes: the settings and secrets are as they are.":
    "不会有任何变化：设置和密钥保持原样。",
  "The running Worker reports no database id for its DB binding.":
    "运行中的 Worker 没有报告它的 DB 绑定的数据库 id。",
  "Preview URLs are enabled for Appflare's Worker.": "Appflare 的 Worker 已启用预览地址。",
  "HTTP 404 (the preview is not live yet)": "HTTP 404（预览还没上线）",
  "Automatic updates of Appflare are now off, so the cron does not update it again.":
    "Appflare 的自动更新现在已关闭，定时任务不会再更新它。",
  "The following secrets have changed:": "以下密钥发生了变化：",
  "No Appflare release is known yet. Check for updates first.":
    "还不知道任何 Appflare 发布版本。请先检查更新。",
  "The job's own requests used up what this run of it may make.":
    "任务自身的请求已经用完了本次运行允许的额度。",
  "This job had already ended before Cloudflare started it, so it stops here and changes nothing.":
    "这个任务在 Cloudflare 启动它之前就已经结束了，所以它在这里停止，不做任何改动。",
  "Waiting 5 minutes before the next step: on Workers Free, Cloudflare lets a job make 50 requests at a time, and this app's Workers need more. The job carries on by itself with a fresh allowance.":
    "下一步之前等待 5 分钟：在 Workers Free 下，Cloudflare 允许一个任务一次发出 50 个请求，而这个应用的 Worker 需要更多。任务会用新的额度自行继续。",
  "Deleted the Access application of the app's public paths.": "已删除应用公开路径的 Access 应用。",
  "The external domains gateway is gone, and its bindings with it.":
    "外部域名网关已删除，它的绑定也随之移除。",
  "Workers Routes: Edit and DNS: Edit": "Workers 路由：编辑 和 DNS：编辑",
  "Removed the app's Cloudflare Access application and its service token.":
    "已移除应用的 Cloudflare Access 应用及其服务令牌。",
  "The app's Cloudflare Access protection was already removed.":
    "应用的 Cloudflare Access 保护已经被移除了。",
  "Retry the uninstall": "重试卸载",
  "Run Delete retained data again": "再次运行“删除保留的数据”",
  "Cloudflare's answer for the account's container applications held no list.":
    "Cloudflare 对账户容器应用的回答里没有列表。",
  "Cloudflare runs containers only on Workers Paid and refuses them to this account, so the app has no container applications.":
    "Cloudflare 只在 Workers Paid 下运行容器，并拒绝了这个账户，所以应用没有容器应用。",
  "The app has no Durable Objects, so no container application runs for it.":
    "应用没有 Durable Objects，所以不会为它运行容器应用。",
  "No container application runs for the app.": "应用没有运行任何容器应用。",
  "No queue delivers its messages to the app's Workers any more.":
    "已经没有队列再把消息投递给应用的 Worker。",
  "Deleted the app's Cloudflare Access application, its public paths and its service token.":
    "已删除应用的 Cloudflare Access 应用、它的公开路径和服务令牌。",
  "The app had no Cloudflare Access protection to remove.":
    "应用本来就没有需要移除的 Cloudflare Access 保护。",
  "Cloudflare refused the upload: the app's startup used more CPU time than Cloudflare allows. Startup time varies, so the upload is sent once more.":
    "Cloudflare 拒绝了上传：应用的启动占用了超过 Cloudflare 允许的 CPU 时间。启动耗时会有波动，因此会再上传一次。",
  "This version changes the Durable Object classes its exports declare, so this update deploys the whole Worker at once instead of checking a preview first.":
    "这个版本改变了它导出的 Durable Object 类，所以这次更新会一次性部署整个 Worker，而不先检查预览。",
  "The next update or rollback of the app sets it up once that is resolved":
    "解决之后，应用的下一次更新或回滚会配置它",
  "Email Routing not finished": "邮件路由未完成",
  "To finish it sooner, make the change in the Cloudflare dashboard (Email Service, Email Routing).":
    "想更快完成，可以在 Cloudflare 面板（Email Service → 邮件路由）里手动修改。",
  "Cloudflare Access answered the preview URL with its sign-in page, so the new version was not checked before it serves traffic":
    "Cloudflare Access 用登录页回应了预览地址，所以新版本在承载流量之前没有经过检查",
  "There is no such channel.": "没有这个渠道。",
  "This manager has no BETTER_AUTH_SECRET, so it cannot store credentials.":
    "这个管理面板没有 BETTER_AUTH_SECRET，无法保存凭据。",
  "The stored credentials cannot be read. Edit the channel and enter its details again.":
    "保存的凭据无法读取。请编辑这个渠道并重新填写信息。",
  "An incoming webhook posts to a channel.": "由传入的 webhook 向某个渠道推送。",
  "A channel's webhook posts the messages.": "由某个渠道的 webhook 推送消息。",
  "Signed JSON posted to a URL you run.": "把签名的 JSON 推送到你自己运行的地址。",
  "Health check failing": "健康检查失败",
  "Paste the bot token BotFather gave you.": "粘贴 BotFather 给你的机器人令牌。",
  "Use a numeric chat id or a public @channel name.": "使用数字会话 ID 或公开的 @channel 名称。",
  "Paste a Slack incoming webhook URL.": "粘贴 Slack 的 incoming webhook 地址。",
  "Appflare's address stopped working": "Appflare 的地址停止工作了",
  "Pause it from Home or its Usage tab if this is not expected.":
    "如果这不是预期情况，请在首页或它的“用量”标签页暂停它。",
  "Appflare pauses apps, the one with the largest share of this month's usage first, until it fits the budget. Apps set to never pause for the budget keep running.":
    "Appflare 会暂停应用，从占本月用量最多的开始，直到符合预算为止。设置为“永不因预算暂停”的应用会继续运行。",
  "Appflare is not set up yet. Open it to finish setup.":
    "Appflare 还没有完成设置。请打开它完成设置。",
  "Sandbox builds are off, and Appflare turns them on first only while no other job is queued or running. Wait for it to finish, then try again.":
    "沙盒构建已关闭，只有在没有其他任务排队或运行时 Appflare 才会先开启它。请等它结束后重试。",
  "Sandbox builds are being updated or disabled now. Wait for that job to finish, then try again.":
    "沙盒构建正在更新或停用。请等那个任务结束后重试。",
  "Appflare: connect sandbox builds": "Appflare：连接沙盒构建",
  "Appflare: disconnect sandbox builds": "Appflare：断开沙盒构建",
  "Appflare does not know its own Worker yet. Finish setup first.":
    "Appflare 还不知道自己的 Worker。请先完成设置。",
  "There are no container applications of the sandbox Worker.": "沙盒 Worker 没有容器应用。",
  "There is no build bucket yet.": "还没有构建存储桶。",
  "Sandbox builds will be turned on first (about two minutes).": "会先开启沙盒构建（大约两分钟）。",
  "Could not remove the passkey.": "无法移除通行密钥。",
  "Appflare is still restarting with reset emails turned on. Try again in a few seconds.":
    "Appflare 仍在开启重置邮件并重启。请几秒后重试。",
  "Password reset emails are off. Turn them on first.": "密码重置邮件已关闭。请先开启它。",
  "Paste the API token.": "粘贴 API 令牌。",
  "That is too long to be a Cloudflare API token.": "这太长了，不可能是 Cloudflare API 令牌。",
  "The token contains spaces or unexpected characters.": "令牌里含有空格或意外的字符。",
  "Give the passkey a name.": "请给通行密钥起个名称。",
  "Use at most 100 characters.": "最多 100 个字符。",
  "Appflare: add the service binding to its own job units":
    "Appflare：为自己的任务单元添加服务绑定",
  "Could not create the owner account.": "无法创建所有者账户。",
  "Too many attempts from this network. Wait ten minutes, then try again.":
    "这个网络的尝试次数过多。请等十分钟再试。",
  "Setup is already in progress. Try again in a minute.": "设置已经在进行中。请一分钟后重试。",
  "Appflare is still redeploying itself with its new secrets. Try again in a few seconds.":
    "Appflare 仍在用新密钥重新部署自己。请几秒后重试。",
  "No Cloudflare token is configured yet. Finish setup first.":
    "还没有配置 Cloudflare 令牌。请先完成设置。",
  "Another token change is in progress. Try again in a minute.":
    "另一个令牌变更正在进行。请一分钟后重试。",
  "This token cannot list Workers scripts, so Appflare cannot store it on itself. Add the Workers Scripts: Edit permission.":
    "这个令牌无法列出 Workers 脚本，所以 Appflare 无法把它保存在自己身上。请加上“Workers Scripts：编辑”权限。",
  "Appflare already holds a token for another Cloudflare account. Paste a token for the account Appflare runs in.":
    "Appflare 已经保存了另一个 Cloudflare 账户的令牌。请粘贴 Appflare 所在账户的令牌。",
  "Only the owner can change roles, delete users, or transfer ownership.":
    "只有所有者可以更改角色、删除用户或转移所有权。",
  "That user no longer exists. Reload the page.": "那个用户已不存在。请重新加载页面。",
  "The owner is always an admin. To step down, transfer ownership to another admin first.":
    "所有者始终是管理员。要卸任，请先把所有权转给另一个管理员。",
  "The owner cannot be deleted. Transfer ownership to another admin first.":
    "所有者不能被删除。请先把所有权转给另一个管理员。",
  "That user can no longer be deleted: ownership or the user changed meanwhile. Reload the page.":
    "那个用户已经无法删除：所有权或用户在此期间变了。请重新加载页面。",
  "You are already the owner.": "你已经是所有者了。",
  "Ownership can only go to an admin. Make them an admin first.":
    "所有权只能转给管理员。请先把对方设为管理员。",
  "Ownership did not change. Reload the page and try again.":
    "所有权没有变化。请重新加载页面再试。",
  "Only the owner can reset an admin's password, and nobody can reset the owner's or their own from here. Use \"Forgot your password?\" on the sign-in page instead.":
    "只有所有者可以重置管理员的密码，而且任何人都不能在这里重置所有者的或自己的密码。请改用登录页上的“忘记密码？”。",
  "Failed to fetch dynamically imported module": "动态导入的模块加载失败",
  "Importing a module script failed": "导入模块脚本失败",
  "Unable to preload CSS for": "无法预加载 CSS：",
  "There is no such job.": "没有这个任务。",
  "Send a report to the Appflare team so we can fix this": "向 Appflare 团队发送报告，帮助我们修复",
  "The report tells us what went wrong. Passwords, keys, tokens, email addresses, your Cloudflare account id, your domains and your Worker names are taken out before it leaves.":
    "报告会告诉我们哪里出了问题。发出之前，密码、密钥、令牌、邮箱地址、你的 Cloudflare 账户 id、你的域名和 Worker 名称都会被移除。",
  "What the report contains": "报告包含什么",
  "Anything to add? (optional)": "还有什么要补充的？（可选）",
  "What you were trying to do, or anything that looked odd. Please leave out passwords and keys.":
    "你当时想做什么，或者有什么看起来不对。请不要填密码和密钥。",
  "The anonymous report is turned off for this manager. This failure report is still sent, because you chose to send it. Nothing else is.":
    "这个管理面板关闭了匿名报告。这份故障报告仍会发送，因为是你选择发送的。其他内容不会。",
  "This is a development build of Appflare, which never sends reports.":
    "这是 Appflare 的开发版本，从不发送报告。",
  "See exactly what is sent": "查看具体发送了什么",
  "Thanks, report sent": "谢谢，报告已发送",
  "This failure was already reported. Thanks.": "这个故障已经报告过了。谢谢。",
  "The report could not be sent. Try again in a moment.": "无法发送报告。请稍后重试。",
  "Leaving this on helps everyone who runs Appflare. It lets the maintainers:":
    "保持开启能帮助所有运行 Appflare 的人。它让维护者可以：",
  "What is sent: one small report a day with counts, versions, settings such as whether passkeys are on, and error categories, plus how each install and update went.":
    "发送的内容：每天一份小报告，包含数量、版本、设置（例如是否启用通行密钥）和错误类别，以及每次安装和更新的结果。",
  "There is no such alert. It may have been removed.": "没有这个提醒。它可能已被移除。",
  "Workers Free can't bill you for Workers, so there's no dollar cap. The loop check still pauses an app.":
    "Workers Free 不会对 Workers 计费，所以没有金额上限。死循环检查仍会暂停应用。",
  "Cloudflare refused the Workers Logs settings: the token needs Workers Scripts: Edit. Add it to the token in the Cloudflare dashboard, then try again.":
    "Cloudflare 拒绝了 Workers Logs 设置：令牌需要“Workers Scripts：编辑”权限。请在 Cloudflare 面板里给它加上，然后重试。",
  "Workers Logs can be turned on or off once the app is installed.":
    "应用安装完成后才能开关 Workers Logs。",
  "Wait for the running job to finish, then try again.": "请等正在运行的任务结束后重试。",
  "This app is paused. Resume the app first, then try again.": "这个应用已暂停。请先恢复它再重试。",
  "Another job of this app is queued or running. Wait for it to finish.":
    "这个应用还有任务在排队或运行。请等它结束。",
  "This app is uninstalled.": "这个应用已卸载。",
  "The reason for the pause is not valid.": "暂停原因无效。",
  "The alert rule was not stored": "提醒规则没有被保存",
  "At least one Worker's version is needed": "至少需要一个 Worker 的版本",
  "The pause was neither stored nor found open": "这次暂停既没有保存，也没有找到未完成的记录",
  "A usage row needs an install id and a product": "用量行需要一个安装 id 和一个产品",
  "Cloudflare Access turned off": "Cloudflare Access 已关闭",
  "Dollar alerts aren't used on Workers Free.": "Workers Free 下不使用金额提醒。",
  "On Workers Free an alert watches today only.": "在 Workers Free 下，提醒只针对今天。",
  "Far above this app's normal.": "远高于这个应用的平常用量。",
  "Spend protection changed": "花费保护已更改",
  "Alert when an hour of usage is far above this app's usual hour over the past week. This is what catches a loop early.":
    "当某个小时的用量远高于这个应用过去一周的平常小时用量时提醒。这是及早发现死循环的方式。",
  "Get told when this app passes an amount, or is on pace to pass it before the day, week or month ends.":
    "当这个应用超过某个金额，或按当前速度会在当天、本周或本月结束前超过时通知你。",
  "Get told when this app uses, or is on pace to use, a share of a free daily limit.":
    "当这个应用用掉（或按当前速度将用掉）某个比例的每日免费额度时通知你。",
  "Appflare pauses the app when a trigger below trips, then tells you. You resume it.":
    "下面任一触发器命中时，Appflare 会暂停应用并通知你。由你来恢复。",
  "Off: Appflare only alerts you and the app keeps running. Turn it on to pause the app when it loops or passes a spending cap.":
    "关闭：Appflare 只提醒你，应用继续运行。开启后，当它陷入死循环或超过花费上限时会暂停应用。",
  "Off: Appflare only alerts you and the app keeps running. Turn it on to pause the app when it loops.":
    "关闭：Appflare 只提醒你，应用继续运行。开启后，当它陷入死循环时会暂停应用。",
  "Its spend still counts toward the budget, so Appflare pauses other apps first, and alerts you if that isn't enough.":
    "它的花费仍计入预算，所以 Appflare 会先暂停其他应用；如果还不够，会通知你。",
  "Only admins can change these.": "只有管理员可以修改这些。",
  "Could not save the change.": "无法保存这次更改。",
  "Workers Logs turned on": "Workers Logs 已开启",
  "Usage from logs shows in Cloudflare within a couple of minutes.":
    "来自日志的用量会在几分钟内显示在 Cloudflare 里。",
  "What every app in this account follows. An app's Usage tab can change it for that app.":
    "这个账户里每个应用都遵循的设置。单个应用的“用量”标签页可以只改它自己。",
  "On: Appflare pauses an app when one of the triggers below trips, then tells you. You resume it.":
    "开启：下面任一触发器命中时 Appflare 会暂停应用并通知你，由你来恢复。",
  "Off: Appflare alerts you and apps keep running. Each app can still turn it on for itself.":
    "关闭：Appflare 只提醒你，应用继续运行。每个应用仍可自行开启。",
  "Used by every app with auto-pause on, unless the app sets its own.":
    "所有开启自动暂停的应用都使用它，除非应用自己设了。",
  "Spending: not a trigger": "花费：不是触发器",
  "Appflare is migrating its database. Retry shortly.": "Appflare 正在迁移数据库。请稍后重试。",
  "No usage recorded for this app in the last 30 days.": "这个应用最近 30 天没有记录任何用量。",
};
