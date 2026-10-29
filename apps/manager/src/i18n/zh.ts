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
};
