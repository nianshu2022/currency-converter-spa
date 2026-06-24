/* ==========================================================================
   GlobalRate Core Application Logic
   ========================================================================== */

// Constant Metadata for Currency Details (Chinese translations, symbols, and custom flag mappings)
const CURRENCY_METADATA = {
    "USD": { name: "美元", flag: "us", symbol: "$" },
    "EUR": { name: "欧元", flag: "eu", symbol: "€" },
    "GBP": { name: "英镑", flag: "gb", symbol: "£" },
    "CNY": { name: "人民币", flag: "cn", symbol: "¥" },
    "JPY": { name: "日元", flag: "jp", symbol: "¥" },
    "CAD": { name: "加元", flag: "ca", symbol: "C$" },
    "AUD": { name: "澳元", flag: "au", symbol: "A$" },
    "HKD": { name: "港币", flag: "hk", symbol: "HK$" },
    "SGD": { name: "新加坡元", flag: "sg", symbol: "S$" },
    "CHF": { name: "瑞士法郎", flag: "ch", symbol: "CHF" },
    "NZD": { name: "新西兰元", flag: "nz", symbol: "NZ$" },
    "KRW": { name: "韩元", flag: "kr", symbol: "₩" },
    "RUB": { name: "卢布", flag: "ru", symbol: "₽" },
    "INR": { name: "印度卢比", flag: "in", symbol: "₹" },
    "BRL": { name: "巴西雷亚尔", flag: "br", symbol: "R$" },
    "ZAR": { name: "南非兰特", flag: "za", symbol: "R" },
    "MXN": { name: "墨西哥比索", flag: "mx", symbol: "$" },
    "DKK": { name: "丹麦克朗", flag: "dk", symbol: "kr" },
    "SEK": { name: "瑞典克朗", flag: "se", symbol: "kr" },
    "NOK": { name: "挪威克朗", flag: "no", symbol: "kr" },
    "PLN": { name: "波兰兹罗提", flag: "pl", symbol: "zł" },
    "TRY": { name: "土耳其里拉", flag: "tr", symbol: "₺" },
    "THB": { name: "泰铢", flag: "th", symbol: "฿" },
    "MYR": { name: "马来西亚林吉特", flag: "my", symbol: "RM" },
    "PHP": { name: "菲律宾比索", flag: "ph", symbol: "₱" },
    "IDR": { name: "印尼盾", flag: "id", symbol: "Rp" },
    "HUF": { name: "匈牙利福林", flag: "hu", symbol: "Ft" },
    "CZK": { name: "捷克克朗", flag: "cz", symbol: "Kč" },
    "ILS": { name: "以色列新谢克尔", flag: "il", symbol: "₪" },
    "BGN": { name: "保加利亚列弗", flag: "bg", symbol: "лв" },
    "RON": { name: "罗马尼亚列伊", flag: "ro", symbol: "lei" },
    "ISK": { name: "冰岛克朗", flag: "is", symbol: "kr" },
    
    // Additional global currencies support for full coverage
    "AED": { name: "阿联酋迪拉姆", flag: "ae", symbol: "د.إ" },
    "AFN": { name: "阿富汗尼", flag: "af", symbol: "؋" },
    "ALL": { name: "阿尔巴尼亚列克", flag: "al", symbol: "L" },
    "AMD": { name: "亚美尼亚德拉姆", flag: "am", symbol: "֏" },
    "ANG": { name: "荷属安的列斯盾", flag: "an", symbol: "ƒ" },
    "AOA": { name: "安哥拉宽扎", flag: "ao", symbol: "Kz" },
    "ARS": { name: "阿根廷比索", flag: "ar", symbol: "$" },
    "AWG": { name: "阿鲁巴弗罗林", flag: "aw", symbol: "ƒ" },
    "AZN": { name: "阿塞拜疆马纳特", flag: "az", symbol: "₼" },
    "BAM": { name: "波黑可兑换马克", flag: "ba", symbol: "KM" },
    "BBD": { name: "巴巴多斯元", flag: "bb", symbol: "$" },
    "BDT": { name: "孟加拉塔卡", flag: "bd", symbol: "৳" },
    "BHD": { name: "巴林第纳尔", flag: "bh", symbol: ".د.ب" },
    "BIF": { name: "布隆迪法郎", flag: "bi", symbol: "FBu" },
    "BMD": { name: "百慕大元", flag: "bm", symbol: "$" },
    "BND": { name: "文莱元", flag: "bn", symbol: "$" },
    "BOB": { name: "玻利维亚诺", flag: "bo", symbol: "$b" },
    "BSD": { name: "巴哈马元", flag: "bs", symbol: "$" },
    "BTN": { name: "不丹努尔特鲁姆", flag: "bt", symbol: "Nu." },
    "BWP": { name: "博茨瓦纳普拉", flag: "bw", symbol: "P" },
    "BYN": { name: "白俄罗斯卢布", flag: "by", symbol: "Br" },
    "BZD": { name: "伯利兹元", flag: "bz", symbol: "BZ$" },
    "CDF": { name: "刚果法郎", flag: "cd", symbol: "FC" },
    "CLP": { name: "智利比索", flag: "cl", symbol: "$" },
    "COP": { name: "哥伦比亚比索", flag: "co", symbol: "$" },
    "CRC": { name: "哥斯达黎加科朗", flag: "cr", symbol: "₡" },
    "CUP": { name: "古巴比索", flag: "cu", symbol: "₱" },
    "CVE": { name: "佛得角埃斯库多", flag: "cv", symbol: "$" },
    "DJF": { name: "吉布提法郎", flag: "dj", symbol: "Fdj" },
    "DOP": { name: "多米尼加比索", flag: "do", symbol: "RD$" },
    "DZD": { name: "阿尔及利亚第纳尔", flag: "dz", symbol: "د.ج" },
    "EGP": { name: "埃及镑", flag: "eg", symbol: "£" },
    "ERN": { name: "厄立特里亚纳克法", flag: "er", symbol: "Nfk" },
    "ETB": { name: "埃塞俄比亚比尔", flag: "et", symbol: "Br" },
    "FJD": { name: "斐济元", flag: "fj", symbol: "$" },
    "FKP": { name: "福克兰群岛镑", flag: "fk", symbol: "£" },
    "GEL": { name: "格鲁吉亚拉里", flag: "ge", symbol: "₾" },
    "GGP": { name: "根西岛镑", flag: "gg", symbol: "£" },
    "GHS": { name: "加纳塞地", flag: "gh", symbol: "₵" },
    "GIP": { name: "直布罗陀镑", flag: "gi", symbol: "£" },
    "GMD": { name: "冈比亚达拉西", flag: "gm", symbol: "D" },
    "GNF": { name: "几内亚法郎", flag: "gn", symbol: "FG" },
    "GTQ": { name: "危地马拉格查尔", flag: "gt", symbol: "Q" },
    "GYD": { name: "圭亚那元", flag: "gy", symbol: "$" },
    "HNL": { name: "洪都拉斯伦皮拉", flag: "hn", symbol: "L" },
    "HTG": { name: "海地古德", flag: "ht", symbol: "G" },
    "IMP": { name: "马恩岛镑", flag: "im", symbol: "£" },
    "IQD": { name: "伊拉克第纳尔", flag: "iq", symbol: "ع.د" },
    "IRR": { name: "伊朗里亚尔", flag: "ir", symbol: "﷼" },
    "JEP": { name: "泽西岛镑", flag: "je", symbol: "£" },
    "JMD": { name: "牙买加元", flag: "jm", symbol: "J$" },
    "JOD": { name: "约旦第纳尔", flag: "jo", symbol: "د.ا" },
    "KES": { name: "肯尼亚先令", flag: "ke", symbol: "KSh" },
    "KGS": { name: "吉尔吉斯斯坦索姆", flag: "kg", symbol: "сом" },
    "KHR": { name: "柬埔寨瑞尔", flag: "kh", symbol: "៛" },
    "KMF": { name: "科摩罗法郎", flag: "km", symbol: "CF" },
    "KPW": { name: "朝鲜圆", flag: "kp", symbol: "₩" },
    "KWD": { name: "科威特第纳尔", flag: "kw", symbol: "د.ك" },
    "KYD": { name: "开曼群岛元", flag: "ky", symbol: "$" },
    "KZT": { name: "哈萨克斯坦坚戈", flag: "kz", symbol: "₸" },
    "LAK": { name: "老挝基普", flag: "la", symbol: "₭" },
    "LBP": { name: "黎巴嫩镑", flag: "lb", symbol: "ل.ل" },
    "LKR": { name: "斯里兰卡卢比", flag: "lk", symbol: "₨" },
    "LRD": { name: "利比里亚元", flag: "lr", symbol: "$" },
    "LSL": { name: "莱索托洛蒂", flag: "ls", symbol: "M" },
    "LYD": { name: "利比亚第纳尔", flag: "ly", symbol: "ل.د" },
    "MAD": { name: "摩洛哥迪拉姆", flag: "ma", symbol: "د.م." },
    "MDL": { name: "摩尔多瓦列伊", flag: "md", symbol: "L" },
    "MGA": { name: "马达加斯加阿里亚里", flag: "mg", symbol: "Ar" },
    "MKD": { name: "马其顿代纳尔", flag: "mk", symbol: "ден" },
    "MMK": { name: "缅甸元", flag: "mm", symbol: "K" },
    "MNT": { name: "蒙古图格里克", flag: "mn", symbol: "₮" },
    "MOP": { name: "澳门币", flag: "mo", symbol: "MOP$" },
    "MRU": { name: "毛里塔尼亚乌吉亚", flag: "mr", symbol: "UM" },
    "MUR": { name: "毛里求斯卢比", flag: "mu", symbol: "₨" },
    "MVR": { name: "马尔代夫拉菲亚", flag: "mv", symbol: "Rf" },
    "MWK": { name: "马拉维克瓦查", flag: "mw", symbol: "MK" },
    "MZN": { name: "莫桑比克梅蒂卡尔", flag: "mz", symbol: "MT" },
    "NAD": { name: "纳米比亚元", flag: "na", symbol: "$" },
    "NGN": { name: "尼日利亚奈拉", flag: "ng", symbol: "₦" },
    "NIO": { name: "尼加拉瓜科多巴", flag: "ni", symbol: "C$" },
    "NPR": { name: "尼泊尔卢比", flag: "np", symbol: "₨" },
    "OMR": { name: "阿曼里亚尔", flag: "om", symbol: "ر.ع." },
    "PAB": { name: "巴拿马巴波亚", flag: "pa", symbol: "B/." },
    "PEN": { name: "秘鲁索尔", flag: "pe", symbol: "S/." },
    "PGK": { name: "巴布亚新几内亚基那", flag: "pg", symbol: "K" },
    "PKR": { name: "巴基斯坦卢比", flag: "pk", symbol: "₨" },
    "PYG": { name: "巴拉圭瓜拉尼", flag: "py", symbol: "₲" },
    "QAR": { name: "卡塔尔里亚尔", flag: "qa", symbol: "ر.ق" },
    "RSD": { name: "塞尔维亚第纳尔", flag: "rs", symbol: "дн." },
    "RWF": { name: "卢旺达法郎", flag: "rw", symbol: "FRw" },
    "SAR": { name: "沙特里亚尔", flag: "sa", symbol: "ر.س" },
    "SBD": { name: "所罗门群岛元", flag: "sb", symbol: "$" },
    "SCR": { name: "塞舌尔卢比", flag: "sc", symbol: "₨" },
    "SDG": { name: "苏丹镑", flag: "sd", symbol: "ج.س." },
    "SHP": { name: "圣赫勒拿镑", flag: "sh", symbol: "£" },
    "SLL": { name: "塞拉利昂利昂", flag: "sl", symbol: "Le" },
    "SOS": { name: "索马里先令", flag: "so", symbol: "Sh.So." },
    "SRD": { name: "苏里南元", flag: "sr", symbol: "$" },
    "SSP": { name: "南苏丹镑", flag: "ss", symbol: "£" },
    "STN": { name: "圣多美多布拉", flag: "st", symbol: "Db" },
    "SVC": { name: "萨尔瓦多科朗", flag: "sv", symbol: "₡" },
    "SYP": { name: "叙利亚镑", flag: "sy", symbol: "LS" },
    "SZL": { name: "斯威士兰里兰吉尼", flag: "sz", symbol: "E" },
    "TJS": { name: "塔吉克斯坦索莫尼", flag: "tj", symbol: "SM" },
    "TMT": { name: "土库曼斯坦马纳特", flag: "tm", symbol: "m" },
    "TND": { name: "突尼斯第纳尔", flag: "tn", symbol: "د.ت" },
    "TOP": { name: "汤加潘加", flag: "to", symbol: "T$" },
    "TTD": { name: "特立尼达和多巴哥元", flag: "tt", symbol: "TT$" },
    "TWD": { name: "新台币", flag: "tw", symbol: "NT$" },
    "TZS": { name: "坦桑尼亚先令", flag: "tz", symbol: "TSh" },
    "UAH": { name: "乌克兰格里夫纳", flag: "ua", symbol: "₴" },
    "UGX": { name: "乌干达先令", flag: "ug", symbol: "USh" },
    "UYU": { name: "乌拉圭比索", flag: "uy", symbol: "$U" },
    "UZS": { name: "乌兹别克斯坦苏姆", flag: "uz", symbol: "so'm" },
    "VES": { name: "委内瑞拉玻利瓦尔", flag: "ve", symbol: "Bs.S" },
    "VND": { name: "越南盾", flag: "vn", symbol: "₫" },
    "VUV": { name: "瓦努阿图瓦图", flag: "vu", symbol: "VT" },
    "WST": { name: "萨摩亚塔拉", flag: "ws", symbol: "T" },
    "XAF": { name: "中非金融合作法郎", flag: "cf", symbol: "FCFA" },
    "XCD": { name: "东加勒比元", flag: "dm", symbol: "$" },
    "XOF": { name: "西非金融合作法郎", flag: "sn", symbol: "CFA" },
    "XPF": { name: "太平洋法郎", flag: "pf", symbol: "₣" },
    "YER": { name: "也门里亚尔", flag: "ye", symbol: "﷼" },
    "ZMW": { name: "赞比亚克瓦查", flag: "zm", symbol: "ZK" }
};

// Global App State
const state = {
    baseCurrency: "USD",
    targetCurrency: "CNY",
    amount: 100,
    rates: {}, // Cache of conversion rates with USD as baseline
    lastUpdated: null,
    pinnedCurrencies: ["CNY", "EUR", "GBP", "JPY", "HKD", "CAD"],
    theme: "system", // system, dark, light
    accentColor: "indigo", // indigo, purple, blue, emerald, rose
    chartInstance: null,
    chartDays: 30,
    chartLabels: [], // Stored for CSV export
    chartData: [],   // Stored for CSV export
    activeSelectorTrigger: null, // "from", "to", or "pin"
    availableCurrenciesList: [], // Populated dynamically from API
    dailyChanges: {}, // { CODE: pctChange } – yesterday vs today
    conversionHistory: [] // Last 10 conversions
};

// Config & API Endpoints
const CONFIG = {
    PRIMARY_API: "https://api.frankfurter.dev/v1",
    PRIMARY_API_FALLBACK: "https://api.frankfurter.app",
    FALLBACK_API: "https://api.exchangerate.fun",
    CACHE_EXPIRY: 60 * 60 * 1000, // 1 hour caching
    FLAG_CDN: "https://flagcdn.com/w40"
};

// Helper: Get Flag image URL by currency code
function getFlagUrl(currencyCode) {
    const code = currencyCode.toUpperCase();
    if (CURRENCY_METADATA[code] && CURRENCY_METADATA[code].flag) {
        return `${CONFIG.FLAG_CDN}/${CURRENCY_METADATA[code].flag}.png`;
    }
    // Fallback heuristic: take first two characters as flag code
    const countryCode = code.substring(0, 2).toLowerCase();
    return `${CONFIG.FLAG_CDN}/${countryCode}.png`;
}

// Helper: Get currency localized/english name
function getCurrencyName(currencyCode) {
    const code = currencyCode.toUpperCase();
    if (CURRENCY_METADATA[code]) {
        return `${CURRENCY_METADATA[code].name} (${code})`;
    }
    return code;
}

// Helper: Get currency symbol
function getCurrencySymbol(currencyCode) {
    const code = currencyCode.toUpperCase();
    if (CURRENCY_METADATA[code] && CURRENCY_METADATA[code].symbol) {
        return CURRENCY_METADATA[code].symbol;
    }
    return "";
}

// Formatter for currency display numbers
function formatCurrencyNumber(value, code) {
    // High precision for small rates, normal precision for others
    const absVal = Math.abs(value);
    let digits = 2;
    if (absVal > 0 && absVal < 0.01) {
        digits = 6;
    } else if (absVal > 0 && absVal < 1) {
        digits = 4;
    }
    
    try {
        return new Intl.NumberFormat('zh-CN', {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(value);
    } catch(e) {
        return value.toFixed(digits);
    }
}

/* ==========================================================================
   API Service & Data Cache Layer
   ========================================================================== */

// Main Rates API Fetcher (dual API failover + caching)
async function fetchExchangeRates(forceRefresh = false) {
    const cachedData = localStorage.getItem("globalrate_cache");
    
    if (!forceRefresh && cachedData) {
        const parsed = JSON.parse(cachedData);
        const age = Date.now() - parsed.timestamp;
        if (age < CONFIG.CACHE_EXPIRY) {
            state.rates = parsed.rates;
            state.lastUpdated = new Date(parsed.timestamp);
            state.availableCurrenciesList = Object.keys(parsed.rates);
            updateApiStatus("live", `缓存更新于 ${formatTime(state.lastUpdated)}`);
            return;
        }
    }

    updateApiStatus("syncing", "正在同步实时汇率...");

    // Try Primary API
    try {
        const response = await fetch(`${CONFIG.PRIMARY_API}/latest?base=USD`);
        if (!response.ok) throw new Error("Primary API failed");
        const data = await response.json();
        
        // Merge USD itself into rates as 1.0
        data.rates["USD"] = 1.0;
        
        saveRatesToCache(data.rates);
        updateApiStatus("live", "汇率实时同步成功 (Frankfurter)");
        return;
    } catch (err) {
        console.warn("Primary API failed, trying primary fallback...", err);
    }

    // Try Primary Backup (Dev domain)
    try {
        const response = await fetch(`${CONFIG.PRIMARY_API_FALLBACK}/latest?base=USD`);
        if (!response.ok) throw new Error("Primary Fallback API failed");
        const data = await response.json();
        data.rates["USD"] = 1.0;
        saveRatesToCache(data.rates);
        updateApiStatus("live", "汇率实时同步成功 (Frankfurter Fallback)");
        return;
    } catch (err) {
        console.warn("Primary Fallback failed, trying Fallback API...", err);
    }

    // Try Fallback API (exchangerate.fun)
    try {
        const response = await fetch(`${CONFIG.FALLBACK_API}/latest?base=USD`);
        if (!response.ok) throw new Error("Fallback API failed");
        const data = await response.json();
        
        // Ensure rates exist
        if (data.rates) {
            data.rates["USD"] = 1.0;
            saveRatesToCache(data.rates);
            updateApiStatus("live", "汇率同步成功 (exchangerate.fun)");
            return;
        }
    } catch (err) {
        console.error("All exchange rate APIs failed.", err);
        updateApiStatus("error", "汇率同步失败，请检查网络或点击刷新");
        
        // Fallback to expired cache if available
        if (cachedData) {
            const parsed = JSON.parse(cachedData);
            state.rates = parsed.rates;
            state.lastUpdated = new Date(parsed.timestamp);
            state.availableCurrenciesList = Object.keys(parsed.rates);
            console.log("Using expired cache as emergency fallback.");
        }
    }
}

function saveRatesToCache(rates) {
    state.rates = rates;
    state.lastUpdated = new Date();
    state.availableCurrenciesList = Object.keys(rates);
    
    localStorage.setItem("globalrate_cache", JSON.stringify({
        timestamp: state.lastUpdated.getTime(),
        rates: rates
    }));
}

// Fetch Time Series data for Chart.js
async function fetchChartData(from, to, days) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDateObj = new Date();
    startDateObj.setDate(startDateObj.getDate() - days);
    const startDate = startDateObj.toISOString().split('T')[0];
    
    // API endpoint: /v1/2026-05-24..2026-06-23?base=USD&symbols=CNY
    // We fetch with 'from' as base and 'to' as symbol
    let url = `${CONFIG.PRIMARY_API}/${startDate}..${endDate}?base=${from}&symbols=${to}`;
    let backupUrl = `${CONFIG.PRIMARY_API_FALLBACK}/${startDate}..${endDate}?base=${from}&symbols=${to}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to load historical chart data");
        return await response.json();
    } catch (err) {
        console.warn("Primary historical data fetch failed, attempting fallback...", err);
        try {
            const response = await fetch(backupUrl);
            if (!response.ok) throw new Error("Fallback historical data fetch failed");
            return await response.json();
        } catch (backupErr) {
            console.error("Could not fetch historical data.", backupErr);
            throw backupErr;
        }
    }
}

// Fetch single historical date lookup
async function fetchHistoricalRate(date, from, to) {
    let url = `${CONFIG.PRIMARY_API}/${date}?base=${from}&symbols=${to}`;
    let backupUrl = `${CONFIG.PRIMARY_API_FALLBACK}/${date}?base=${from}&symbols=${to}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Historical lookup failed");
        return await response.json();
    } catch (err) {
        console.warn("Primary lookup failed, attempting fallback...", err);
        const response = await fetch(backupUrl);
        if (!response.ok) throw new Error("Fallback lookup failed");
        return await response.json();
    }
}

/* ==========================================================================
   State Helpers & Conversion Calculation
   ========================================================================== */

// Core calculation: Converts amount from one currency to another using the cached USD-base rates
function calculateConversion(amount, from, to) {
    if (!state.rates[from] || !state.rates[to]) return 0;
    
    // R_USD(to) / R_USD(from) = conversion rate from 'from' to 'to'
    const rateToUSDFrom = state.rates[from];
    const rateToUSDTo = state.rates[to];
    
    // 1 USD = rateToUSDFrom FROM
    // 1 USD = rateToUSDTo TO
    // Hence, 1 FROM = rateToUSDTo / rateToUSDFrom TO
    const rate = rateToUSDTo / rateToUSDFrom;
    return amount * rate;
}

// Get the conversion rate value itself
function getExchangeRate(from, to) {
    if (!state.rates[from] || !state.rates[to]) return 0;
    return state.rates[to] / state.rates[from];
}

/* ==========================================================================
   UI Rendering & Event Handlers
   ========================================================================== */

// Format time utility helper
function formatTime(date) {
    if (!date) return "";
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Update API connection status elements
function updateApiStatus(statusClass, message) {
    const indicator = document.querySelector("#api-status .status-indicator");
    const statusText = document.querySelector("#api-status .status-text");
    
    indicator.className = `status-indicator ${statusClass}`;
    statusText.textContent = message;
}

// Update Main conversion UI display cards
function updateConversionResults() {
    const fromVal = parseFloat(document.getElementById("amount-input").value) || 0;
    state.amount = fromVal;
    
    const convertedVal = calculateConversion(fromVal, state.baseCurrency, state.targetCurrency);
    const rateFrom = getExchangeRate(state.baseCurrency, state.targetCurrency);
    const rateTo = getExchangeRate(state.targetCurrency, state.baseCurrency);
    
    // Set currency prefix symbol
    document.getElementById("amount-prefix").textContent = getCurrencySymbol(state.baseCurrency);
    
    // Result displays
    document.getElementById("result-from-display").textContent = `${formatCurrencyNumber(fromVal, state.baseCurrency)} ${state.baseCurrency} =`;
    document.getElementById("result-to-display").textContent = formatCurrencyNumber(convertedVal, state.targetCurrency);
    document.getElementById("result-to-code").textContent = state.targetCurrency;
    
    // Formulas
    document.getElementById("rate-formula-from").textContent = `1 ${state.baseCurrency} = ${formatCurrencyNumber(rateFrom, state.targetCurrency)} ${state.targetCurrency}`;
    document.getElementById("rate-formula-to").textContent = `1 ${state.targetCurrency} = ${formatCurrencyNumber(rateTo, state.baseCurrency)} ${state.baseCurrency}`;
    
    // Sync Trigger Buttons
    document.getElementById("from-code").textContent = state.baseCurrency;
    document.getElementById("from-flag").src = getFlagUrl(state.baseCurrency);
    document.getElementById("from-flag").alt = `${state.baseCurrency} Flag`;
    
    document.getElementById("to-code").textContent = state.targetCurrency;
    document.getElementById("to-flag").src = getFlagUrl(state.targetCurrency);
    document.getElementById("to-flag").alt = `${state.targetCurrency} Flag`;
    
    // Update Pinned favorites grid conversion numbers
    renderFavoritesGrid();

    // Record to conversion history (only when amount > 0)
    if (fromVal > 0) {
        const convertedVal = calculateConversion(fromVal, state.baseCurrency, state.targetCurrency);
        addToHistory(fromVal, state.baseCurrency, convertedVal, state.targetCurrency);
    }
}

// Render the Favorites Grid card list
function renderFavoritesGrid() {
    const container = document.getElementById("favorites-container");
    container.innerHTML = "";
    
    if (state.pinnedCurrencies.length === 0) {
        container.innerHTML = `
            <div class="favorites-empty-state" style="grid-column: 1/-1; text-align: center; padding: 20px; color: var(--text-secondary); font-size: 13px;">
                <p>暂无常用汇率卡片</p>
                <p style="font-size: 11px; margin-top: 4px;">点击上方“添加货币”进行添加</p>
            </div>
        `;
        return;
    }
    
    state.pinnedCurrencies.forEach(code => {
        // Skip display if same as base
        if (code === state.baseCurrency) return;
        
        const value = calculateConversion(state.amount, state.baseCurrency, code);
        const rate = getExchangeRate(state.baseCurrency, code);

        // Build change badge HTML
        const pct = state.dailyChanges[code];
        let changeBadge = '';
        if (pct !== undefined) {
            const sign = pct > 0 ? '+' : '';
            const cls = pct > 0.01 ? 'up' : pct < -0.01 ? 'down' : 'flat';
            const arrow = pct > 0.01 ? '▲' : pct < -0.01 ? '▼' : '—';
            changeBadge = `<span class="fav-change-badge ${cls}">${arrow} ${sign}${pct.toFixed(2)}%</span>`;
        }
        
        const card = document.createElement("div");
        card.className = "fav-card";
        card.setAttribute("data-code", code);
        card.setAttribute("draggable", "true");
        
        card.innerHTML = `
            <div class="fav-card-header">
                <div class="fav-flag-code">
                    <img src="${getFlagUrl(code)}" alt="${code} Flag" class="fav-flag">
                    <span class="fav-code">
                        ${code}
                        <span class="fav-name-secondary">${CURRENCY_METADATA[code] ? CURRENCY_METADATA[code].name : ''}</span>
                        ${changeBadge}
                    </span>
                </div>
                <button class="fav-unpin-btn" data-code="${code}" title="取消置顶">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
            <div class="fav-value">${formatCurrencyNumber(value, code)}</div>
            <div class="fav-label">1 ${state.baseCurrency} = ${formatCurrencyNumber(rate, code)}</div>
        `;
        
        // Card click handler -> set as target currency
        card.addEventListener("click", (e) => {
            // If they clicked the delete icon, don't trigger currency swap
            if (e.target.closest(".fav-unpin-btn")) return;
            
            state.targetCurrency = code;
            updateConversionResults();
            updateTrendChart();
        });
        
        // Unpin button click handler
        card.querySelector(".fav-unpin-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            unpinCurrency(code);
        });
        
        container.appendChild(card);
    });
    
    lucide.createIcons();
    // Re-attach drag listeners after DOM update
    initFavDragDrop();
}

// Add/Pin currency to favorites
function pinCurrency(code) {
    if (!state.pinnedCurrencies.includes(code)) {
        state.pinnedCurrencies.push(code);
        localStorage.setItem("globalrate_pinned", JSON.stringify(state.pinnedCurrencies));
        renderFavoritesGrid();
    }
}

// Remove/Unpin currency from favorites
function unpinCurrency(code) {
    state.pinnedCurrencies = state.pinnedCurrencies.filter(c => c !== code);
    localStorage.setItem("globalrate_pinned", JSON.stringify(state.pinnedCurrencies));
    renderFavoritesGrid();
}

/* ==========================================================================
   Custom Searchable Currency Selector Modal
   ========================================================================== */

function openCurrencyModal(triggerType) {
    state.activeSelectorTrigger = triggerType;
    const modal = document.getElementById("currency-modal");
    const modalTitle = document.getElementById("modal-title");
    const searchInput = document.getElementById("currency-search-input");
    
    // Set title descriptive text
    if (triggerType === "from") {
        modalTitle.textContent = "选择源货币 (FROM)";
    } else if (triggerType === "to") {
        modalTitle.textContent = "选择目标货币 (TO)";
    } else if (triggerType === "pin") {
        modalTitle.textContent = "添加常用货币看板";
    }
    
    searchInput.value = "";
    document.getElementById("clear-search-btn").classList.add("hidden");
    
    renderModalCurrencyList();
    
    modal.classList.remove("hidden");
    // Animation tick
    setTimeout(() => {
        searchInput.focus();
    }, 100);
}

function closeCurrencyModal() {
    const modal = document.getElementById("currency-modal");
    modal.classList.add("hidden");
}

function renderModalCurrencyList(searchQuery = "") {
    const container = document.getElementById("modal-currency-list");
    container.innerHTML = "";
    
    const query = searchQuery.trim().toLowerCase();
    
    // Sort keys alphabetically
    const sortedCodes = [...state.availableCurrenciesList].sort();
    
    let matchCount = 0;
    
    sortedCodes.forEach(code => {
        const metadata = CURRENCY_METADATA[code] || { name: "", flag: "" };
        const chName = metadata.name || "";
        const enName = code;
        
        // Filter logic: matches currency code or localized chinese name
        const matchesQuery = code.toLowerCase().includes(query) || 
                             chName.toLowerCase().includes(query);
                             
        if (!matchesQuery) return;
        
        matchCount++;
        
        const isActive = (state.activeSelectorTrigger === "from" && state.baseCurrency === code) || 
                         (state.activeSelectorTrigger === "to" && state.targetCurrency === code);
                         
        const item = document.createElement("div");
        item.className = `currency-item ${isActive ? 'active' : ''}`;
        
        item.innerHTML = `
            <div class="currency-item-left">
                <img src="${getFlagUrl(code)}" alt="${code} Flag" class="currency-item-flag">
                <div class="currency-item-codes">
                    <span class="currency-item-code">${code}</span>
                    <span class="currency-item-name">${getCurrencyName(code)}</span>
                </div>
            </div>
            <i data-lucide="check" class="currency-item-active-icon"></i>
        `;
        
        item.addEventListener("click", () => {
            selectCurrencyFromModal(code);
        });
        
        container.appendChild(item);
    });
    
    if (matchCount === 0) {
        container.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                <i data-lucide="info" style="margin: 0 auto 10px; width: 32px; height: 32px; display: block;"></i>
                <p>未找到符合条件的货币 "${searchQuery}"</p>
            </div>
        `;
    }
    
    lucide.createIcons();
}

function selectCurrencyFromModal(code) {
    if (state.activeSelectorTrigger === "from") {
        if (state.targetCurrency === code) {
            // Swap if they match
            state.targetCurrency = state.baseCurrency;
        }
        state.baseCurrency = code;
        updateConversionResults();
        updateTrendChart();
    } else if (state.activeSelectorTrigger === "to") {
        if (state.baseCurrency === code) {
            // Swap if they match
            state.baseCurrency = state.targetCurrency;
        }
        state.targetCurrency = code;
        updateConversionResults();
        updateTrendChart();
    } else if (state.activeSelectorTrigger === "pin") {
        pinCurrency(code);
    }
    
    closeCurrencyModal();
}

/* ==========================================================================
   Chart.js Historical Graph Controller
   ========================================================================== */

async function updateTrendChart() {
    const loadingOverlay = document.getElementById("chart-loading");
    const subtitle = document.getElementById("chart-subtitle");
    
    subtitle.textContent = `${state.baseCurrency} / ${state.targetCurrency} 汇率趋势走势`;
    
    if (state.baseCurrency === state.targetCurrency) {
        if (state.chartInstance) {
            state.chartInstance.destroy();
            state.chartInstance = null;
        }
        document.getElementById("rate-trend-chart").getContext('2d').clearRect(0,0,100,100);
        return;
    }
    
    loadingOverlay.classList.add("active");
    
    try {
        const data = await fetchChartData(state.baseCurrency, state.targetCurrency, state.chartDays);
        
        const labels = Object.keys(data.rates);
        const dataPoints = labels.map(date => data.rates[date][state.targetCurrency]);
        
        renderChartCanvas(labels, dataPoints);
    } catch(err) {
        console.error("Failed to render trend chart", err);
        // Show error display on chart area
        const ctx = document.getElementById("rate-trend-chart").getContext('2d');
        if (state.chartInstance) {
            state.chartInstance.destroy();
            state.chartInstance = null;
        }
    } finally {
        loadingOverlay.classList.remove("active");
    }
}

function renderChartCanvas(labels, dataPoints) {
    const ctx = document.getElementById("rate-trend-chart").getContext('2d');
    // Store labels and data for export
    state.chartLabels = labels;
    state.chartData = dataPoints;

    // Clear old chart
    if (state.chartInstance) {
        state.chartInstance.destroy();
    }
    
    const isDark = document.body.classList.contains("theme-dark") || 
                   (document.body.classList.contains("theme-system") && window.matchMedia('(prefers-color-scheme: dark)').matches);
                   
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    // Gradient accent background under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.0)');
    
    state.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.map(date => {
                // Shorten labels on smaller viewports
                const parts = date.split('-');
                return `${parts[1]}-${parts[2]}`;
            }),
            datasets: [{
                label: `汇率 (${state.baseCurrency} -> ${state.targetCurrency})`,
                data: dataPoints,
                borderColor: '#6366f1',
                borderWidth: 3,
                pointBackgroundColor: '#a855f7',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1.5,
                pointRadius: dataPoints.length > 90 ? 0 : 3,
                pointHoverRadius: 6,
                fill: true,
                backgroundColor: gradient,
                tension: 0.15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // We already have a clean subtitle title
                },
                tooltip: {
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    titleColor: isDark ? '#f3f4f6' : '#1f2937',
                    bodyColor: isDark ? '#9ca3af' : '#4b5563',
                    borderColor: 'rgba(99, 102, 241, 0.2)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            // Find actual original date label
                            return labels[context[0].dataIndex];
                        },
                        label: function(context) {
                            return `1 ${state.baseCurrency} = ${formatCurrencyNumber(context.parsed.y, state.targetCurrency)} ${state.targetCurrency}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColor,
                        font: { size: 10, family: 'Outfit' },
                        maxTicksLimit: window.innerWidth < 480 ? 6 : 12
                    }
                },
                y: {
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColor,
                        font: { size: 10, family: 'Outfit' },
                        callback: function(value) {
                            return value.toFixed(3);
                        }
                    }
                }
            }
        }
    });
}

/* ==========================================================================
   Historical Date Lookup Form Controller
   ========================================================================== */

async function handleHistoricalQuery() {
    const dateInput = document.getElementById("historical-date").value;
    const resultBox = document.getElementById("lookup-result");
    const queryBtn = document.getElementById("query-historical-btn");
    
    if (!dateInput) {
        alert("请选择要查询的历史日期");
        return;
    }
    
    queryBtn.disabled = true;
    queryBtn.innerHTML = `<div class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></div> 查询中...`;
    
    try {
        const data = await fetchHistoricalRate(dateInput, state.baseCurrency, state.targetCurrency);
        
        const rate = data.rates[state.targetCurrency];
        const valFrom = state.amount;
        const valTo = valFrom * rate;
        
        document.getElementById("lookup-result-date").textContent = dateInput;
        document.getElementById("lookup-from-val").textContent = formatCurrencyNumber(valFrom, state.baseCurrency);
        document.getElementById("lookup-to-val").textContent = formatCurrencyNumber(valTo, state.targetCurrency);
        document.getElementById("lookup-to-code-label").textContent = state.targetCurrency;
        
        resultBox.classList.remove("hidden");
    } catch (err) {
        console.error("Lookup query failed", err);
        alert("汇率回溯查询失败，历史数据可能不存在或网络连接超时");
    } finally {
        queryBtn.disabled = false;
        queryBtn.innerHTML = `<i data-lucide="search"></i> 查询汇率`;
        lucide.createIcons();
    }
}

/* ==========================================================================
   Theme Management Layer
   ========================================================================== */

function setTheme(themeMode) {
    state.theme = themeMode;
    localStorage.setItem("globalrate_theme", themeMode);
    
    document.body.className = "";
    
    if (themeMode === "system") {
        document.body.classList.add("theme-system");
    } else if (themeMode === "dark") {
        document.body.classList.add("theme-dark");
    } else {
        document.body.classList.add("theme-light");
    }
    
    // Toggle active classes on buttons
    document.querySelectorAll(".theme-btn").forEach(btn => {
        if (btn.getAttribute("data-theme") === themeMode) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // Re-draw chart to adapt color system changes (text colors, grid colors)
    if (state.chartInstance) {
        updateTrendChart();
    }
}

// Detect and load initial configurations
function loadStoredSettings() {
    // Theme loading
    const storedTheme = localStorage.getItem("globalrate_theme");
    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        setTheme("system");
    }
    
    // Accent color loading
    const storedAccent = localStorage.getItem('globalrate_accent');
    if (storedAccent) setAccentColor(storedAccent);
    
    // Favorites loading
    const storedFavorites = localStorage.getItem("globalrate_pinned");
    if (storedFavorites) {
        state.pinnedCurrencies = JSON.parse(storedFavorites);
    }
    
    // Base currencies selection state loading
    const storedBase = localStorage.getItem("globalrate_base_currency");
    const storedTarget = localStorage.getItem("globalrate_target_currency");
    if (storedBase) state.baseCurrency = storedBase;
    if (storedTarget) state.targetCurrency = storedTarget;

    // Conversion history loading
    const storedHistory = localStorage.getItem('globalrate_history');
    if (storedHistory) state.conversionHistory = JSON.parse(storedHistory);
}

function saveStateToStorage() {
    localStorage.setItem("globalrate_base_currency", state.baseCurrency);
    localStorage.setItem("globalrate_target_currency", state.targetCurrency);
}

/* ==========================================================================
   Lifecycle & Event Binding Registration
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    loadStoredSettings();
    
    // Set max historical date picker restriction to today
    const datePicker = document.getElementById("historical-date");
    const todayStr = new Date().toISOString().split('T')[0];
    datePicker.max = todayStr;
    datePicker.value = todayStr;
    
    // Initial fetch
    await fetchExchangeRates();
    updateConversionResults();
    updateTrendChart();
    
    // Amount Change Event
    const amountInput = document.getElementById("amount-input");
    amountInput.addEventListener("input", () => {
        updateConversionResults();
    });
    
    // Clear amount button
    document.getElementById("clear-amount-btn").addEventListener("click", () => {
        amountInput.value = "";
        amountInput.focus();
        updateConversionResults();
    });
    
    // Swap currency buttons action
    document.getElementById("swap-currencies-btn").addEventListener("click", () => {
        const temp = state.baseCurrency;
        state.baseCurrency = state.targetCurrency;
        state.targetCurrency = temp;
        
        saveStateToStorage();
        updateConversionResults();
        updateTrendChart();
    });
    
    // Selector trigger clicks
    document.getElementById("from-currency-trigger").addEventListener("click", () => {
        openCurrencyModal("from");
    });
    
    document.getElementById("to-currency-trigger").addEventListener("click", () => {
        openCurrencyModal("to");
    });
    
    document.getElementById("manage-favorites-btn").addEventListener("click", () => {
        openCurrencyModal("pin");
    });
    
    // Modal controls close clicks
    document.getElementById("close-modal-btn").addEventListener("click", closeCurrencyModal);
    
    document.getElementById("currency-modal").addEventListener("click", (e) => {
        if (e.target.id === "currency-modal") {
            closeCurrencyModal();
        }
    });
    
    // Modal search implementation
    const searchInput = document.getElementById("currency-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        if (query) {
            clearSearchBtn.classList.remove("hidden");
        } else {
            clearSearchBtn.classList.add("hidden");
        }
        renderModalCurrencyList(query);
    });
    
    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.classList.add("hidden");
        renderModalCurrencyList("");
        searchInput.focus();
    });
    
    // Force refresh click on API Status/Logo
    document.getElementById("api-status").addEventListener("click", async () => {
        await fetchExchangeRates(true);
        updateConversionResults();
        updateTrendChart();
    });
    
    document.querySelector(".brand").addEventListener("click", async () => {
        await fetchExchangeRates(true);
        updateConversionResults();
        updateTrendChart();
    });
    
    // Timeframe selector clicks
    document.querySelectorAll(".time-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            state.chartDays = parseInt(e.target.getAttribute("data-days"));
            updateTrendChart();
        });
    });
    
    // Historical lookup button click
    document.getElementById("query-historical-btn").addEventListener("click", handleHistoricalQuery);
    
    // Theme switch clicks
    document.getElementById("theme-system-btn").addEventListener("click", () => setTheme("system"));
    document.getElementById("theme-dark-btn").addEventListener("click", () => setTheme("dark"));
    document.getElementById("theme-light-btn").addEventListener("click", () => setTheme("light"));
    
    // Handle system theme updates dynamically
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (state.theme === "system") {
            setTheme("system");
        }
    });
    
    // Mobile Tab Bar Switch Event Registration
    document.querySelectorAll(".nav-tab").forEach(tabBtn => {
        tabBtn.addEventListener("click", (e) => {
            const button = e.target.closest(".nav-tab");
            if (!button) return;
            const tabName = button.getAttribute("data-tab");
            
            // Get index of clicked tab button to calculate sliding offset
            const parent = button.parentNode;
            const tabsArray = Array.from(parent.querySelectorAll(".nav-tab"));
            const index = tabsArray.indexOf(button);
            
            // Toggle active classes on tabs
            tabsArray.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            // Update sliding pill indicator position
            const indicator = document.getElementById("nav-tab-indicator");
            if (indicator) {
                indicator.style.transform = `translateX(${index * 100}%)`;
            }
            
            // Set body attribute to change visibility in CSS
            document.body.setAttribute("data-active-tab", tabName);
            
            // Trigger Chart resizing / redraw when tab switches to chart
            if (tabName === "chart") {
                setTimeout(() => {
                    if (state.chartInstance) {
                        state.chartInstance.resize();
                        state.chartInstance.update();
                    } else {
                        updateTrendChart();
                    }
                }, 80);
            }
        });
    });

    // Handle responsive viewport size alterations for chart scaling
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (state.chartInstance) {
                // Adjust chart ticks quantity according to window size
                state.chartInstance.options.scales.x.ticks.maxTicksLimit = window.innerWidth < 480 ? 6 : 12;
                state.chartInstance.update();
            }
        }, 150);
    });

    // ── New Feature Event Listeners ─────────────────────────────────────────

    // Accent color picker
    document.querySelectorAll(".accent-dot").forEach(dot => {
        dot.addEventListener("click", () => setAccentColor(dot.dataset.accent));
    });

    // Export chart as PNG
    document.getElementById("export-chart-png-btn").addEventListener("click", exportChartAsPNG);

    // Export data as CSV
    document.getElementById("export-csv-btn").addEventListener("click", exportAsCSV);

    // Clear conversion history
    document.getElementById("clear-history-btn").addEventListener("click", () => {
        state.conversionHistory = [];
        localStorage.removeItem('globalrate_history');
        renderHistoryList();
    });

    // Render initial history list
    renderHistoryList();

    // Fetch daily change rates (background, non-blocking)
    fetchDailyChanges();

    // Init drag-and-drop after first favorites render
    initFavDragDrop();
});

// Disable double-tap zoom and multi-finger pinch-to-zoom on iOS Safari
(function disableIosZoom() {
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Prevent pinch-to-zoom (two or more fingers touch)
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Prevent gesture zoom events (iOS Safari specific)
    document.addEventListener('gesturestart', (event) => {
        event.preventDefault();
    }, { passive: false });
})();

/* ==========================================================================
   Daily Change Rate Fetcher (Yesterday vs Today Rates)
   ========================================================================== */

async function fetchDailyChanges() {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yd = yesterday.toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        // Fetch 2-day time series for all pinned currencies
        const symbols = state.pinnedCurrencies.join(',');
        if (!symbols) return;

        const url = `${CONFIG.PRIMARY_API}/${yd}..${today}?base=USD&symbols=${symbols}`;
        const resp = await fetch(url);
        if (!resp.ok) return;
        const data = await resp.json();

        const dates = Object.keys(data.rates).sort();
        if (dates.length < 2) return;

        const prevRates = data.rates[dates[dates.length - 2]] || {};
        const latestRates = data.rates[dates[dates.length - 1]] || {};

        state.dailyChanges = {};
        state.pinnedCurrencies.forEach(code => {
            const prev = prevRates[code];
            const curr = latestRates[code] || state.rates[code];
            if (prev && curr) {
                state.dailyChanges[code] = ((curr - prev) / prev) * 100;
            }
        });
        // Re-render with change badges
        renderFavoritesGrid();
    } catch (err) {
        console.warn('[dailyChanges] Could not fetch change data:', err);
    }
}

/* ==========================================================================
   Conversion History
   ========================================================================== */

function addToHistory(fromAmt, fromCode, toAmt, toCode) {
    const entry = {
        fromAmt,
        fromCode,
        toAmt,
        toCode,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    // Deduplicate if same conversion within last entry
    const last = state.conversionHistory[0];
    if (last && last.fromCode === fromCode && last.toCode === toCode &&
        Math.abs(last.fromAmt - fromAmt) < 0.001) return;

    state.conversionHistory.unshift(entry);
    if (state.conversionHistory.length > 10) state.conversionHistory.pop();
    localStorage.setItem('globalrate_history', JSON.stringify(state.conversionHistory));
    renderHistoryList();
}

function renderHistoryList() {
    const container = document.getElementById('history-list');
    if (!container) return;

    if (state.conversionHistory.length === 0) {
        container.innerHTML = `
            <div class="history-empty">
                <i data-lucide="clock"></i>
                <p>暂无换算记录</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = state.conversionHistory.map((h, i) => `
        <div class="history-item" data-index="${i}">
            <div class="history-item-left">
                <div class="history-flags">
                    <img src="${getFlagUrl(h.fromCode)}" alt="${h.fromCode}">
                    <img src="${getFlagUrl(h.toCode)}" alt="${h.toCode}">
                </div>
                <div class="history-text">
                    <div class="history-from">${formatCurrencyNumber(h.fromAmt, h.fromCode)} ${h.fromCode}</div>
                    <div class="history-to">${formatCurrencyNumber(h.toAmt, h.toCode)} ${h.toCode}</div>
                </div>
            </div>
            <span class="history-time">${h.time}</span>
        </div>
    `).join('');

    // Click to restore
    container.querySelectorAll('.history-item').forEach(el => {
        el.addEventListener('click', () => {
            const h = state.conversionHistory[parseInt(el.dataset.index)];
            state.baseCurrency = h.fromCode;
            state.targetCurrency = h.toCode;
            document.getElementById('amount-input').value = h.fromAmt;
            state.amount = h.fromAmt;
            saveStateToStorage();
            updateConversionResults();
            updateTrendChart();
        });
    });

    lucide.createIcons();
}

/* ==========================================================================
   Export Functions
   ========================================================================== */

function exportChartAsPNG() {
    if (!state.chartInstance) return;
    const canvas = document.getElementById('rate-trend-chart');
    const link = document.createElement('a');
    link.download = `GlobalRate_${state.baseCurrency}-${state.targetCurrency}_${state.chartDays}d.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
}

function exportAsCSV() {
    if (!state.chartLabels.length) return;
    const rows = [['Date', `${state.baseCurrency}/${state.targetCurrency} Rate`]];
    state.chartLabels.forEach((date, i) => {
        rows.push([date, state.chartData[i]]);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `GlobalRate_${state.baseCurrency}-${state.targetCurrency}_${state.chartDays}d.csv`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

/* ==========================================================================
   Accent Color Management
   ========================================================================== */

function setAccentColor(color) {
    // Remove all existing accent classes
    document.body.classList.remove('accent-indigo', 'accent-purple', 'accent-blue', 'accent-emerald', 'accent-rose');
    if (color !== 'indigo') {
        document.body.classList.add(`accent-${color}`);
    }
    state.accentColor = color;
    localStorage.setItem('globalrate_accent', color);

    // Update dot active state
    document.querySelectorAll('.accent-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.accent === color);
    });

    // Redraw chart for updated accent colors
    if (state.chartInstance) updateTrendChart();
}

/* ==========================================================================
   Favorites Drag-and-Drop Sorting
   ========================================================================== */

function initFavDragDrop() {
    const container = document.getElementById('favorites-container');
    let dragSrc = null;

    container.addEventListener('dragstart', e => {
        const card = e.target.closest('.fav-card');
        if (!card) return;
        dragSrc = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', card.dataset.code);
    });

    container.addEventListener('dragend', e => {
        const card = e.target.closest('.fav-card');
        if (card) card.classList.remove('dragging');
        container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });

    container.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const card = e.target.closest('.fav-card');
        container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        if (card && card !== dragSrc) card.classList.add('drag-over');
    });

    container.addEventListener('drop', e => {
        e.preventDefault();
        const targetCard = e.target.closest('.fav-card');
        if (!targetCard || targetCard === dragSrc || !dragSrc) return;

        const fromCode = dragSrc.dataset.code;
        const toCode = targetCard.dataset.code;

        const fromIdx = state.pinnedCurrencies.indexOf(fromCode);
        const toIdx = state.pinnedCurrencies.indexOf(toCode);

        if (fromIdx === -1 || toIdx === -1) return;

        // Swap positions
        [state.pinnedCurrencies[fromIdx], state.pinnedCurrencies[toIdx]] =
            [state.pinnedCurrencies[toIdx], state.pinnedCurrencies[fromIdx]];

        localStorage.setItem('globalrate_pinned', JSON.stringify(state.pinnedCurrencies));
        renderFavoritesGrid();
        // Re-init drag after re-render
        initFavDragDrop();
    });
}

/* ==========================================================================
   Service Worker Registration
   ========================================================================== */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('[SW] Registered, scope:', reg.scope))
            .catch(err => console.warn('[SW] Registration failed:', err));
    });
}
