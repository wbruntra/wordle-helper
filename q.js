var Us = Object.defineProperty,
  Ps = Object.defineProperties
var Ms = Object.getOwnPropertyDescriptors
var so = Object.getOwnPropertySymbols
var bs = Object.prototype.hasOwnProperty,
  Ys = Object.prototype.propertyIsEnumerable
var lo = (e, t, r) =>
    t in e ? Us(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r),
  Ce = (e, t) => {
    for (var r in t || (t = {})) bs.call(t, r) && lo(e, r, t[r])
    if (so) for (var r of so(t)) Ys.call(t, r) && lo(e, r, t[r])
    return e
  },
  ut = (e, t) => Ps(e, Ms(t))
var Bs = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports)
var sr = (e, t, r) =>
  new Promise((n, o) => {
    var i = (S) => {
        try {
          s(r.next(S))
        } catch (l) {
          o(l)
        }
      },
      a = (S) => {
        try {
          s(r.throw(S))
        } catch (l) {
          o(l)
        }
      },
      s = (S) => (S.done ? n(S.value) : Promise.resolve(S.value).then(i, a))
    s((r = r.apply(e, t)).next())
  })
var CR = Bs((io) => {
  const ws = function () {
    const t = document.createElement('link').relList
    if (t && t.supports && t.supports('modulepreload')) return
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o)
    new MutationObserver((o) => {
      for (const i of o)
        if (i.type === 'childList')
          for (const a of i.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && n(a)
    }).observe(document, { childList: !0, subtree: !0 })
    function r(o) {
      const i = {}
      return (
        o.integrity && (i.integrity = o.integrity),
        o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy),
        o.crossorigin === 'use-credentials'
          ? (i.credentials = 'include')
          : o.crossorigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
        i
      )
    }
    function n(o) {
      if (o.ep) return
      o.ep = !0
      const i = r(o)
      fetch(o.href, i)
    }
  }
  ws()
  const Ue = {}
  function Hs(e) {
    Ue.context = e
  }
  const Gs = (e, t) => e === t,
    at = Symbol('solid-proxy'),
    Ks = Symbol('solid-track'),
    Dr = { equals: Gs }
  let hi = gi
  const Nt = {},
    qe = 1,
    pr = 2,
    Li = { owned: null, cleanups: null, context: null, owner: null },
    [Fs, pR] = Q(!1)
  var oe = null
  let tr = null,
    ie = null,
    $t = null,
    he = null,
    Ye = null,
    wn = 0
  function Hn(e, t) {
    const r = ie,
      n = oe,
      o = e.length === 0,
      i = o ? Li : { owned: null, cleanups: null, context: null, owner: t || n },
      a = o ? e : () => e(() => Fn(i))
    ;(oe = i), (ie = null)
    try {
      return _r(a, !0)
    } finally {
      ;(ie = r), (oe = n)
    }
  }
  function Q(e, t) {
    t = t ? Object.assign({}, Dr, t) : Dr
    const r = {
        value: e,
        observers: null,
        observerSlots: null,
        pending: Nt,
        comparator: t.equals || void 0,
      },
      n = (o) => (
        typeof o == 'function' && (o = o(r.pending !== Nt ? r.pending : r.value)), Kn(r, o)
      )
    return [Ni.bind(r), n]
  }
  function Fr(e, t, r) {
    const n = Wr(e, t, !0, qe)
    Mt(n)
  }
  function w(e, t, r) {
    const n = Wr(e, t, !1, qe)
    Mt(n)
  }
  function le(e, t, r) {
    hi = Vs
    const n = Wr(e, t, !1, qe)
    ;(n.user = !0), Ye ? Ye.push(n) : Mt(n)
  }
  function b(e, t, r) {
    r = r ? Object.assign({}, Dr, r) : Dr
    const n = Wr(e, t, !0, 0)
    return (
      (n.pending = Nt),
      (n.observers = null),
      (n.observerSlots = null),
      (n.comparator = r.equals || void 0),
      Mt(n),
      Ni.bind(n)
    )
  }
  function rr(e) {
    if ($t) return e()
    let t
    const r = ($t = [])
    try {
      t = e()
    } finally {
      $t = null
    }
    return (
      _r(() => {
        for (let n = 0; n < r.length; n += 1) {
          const o = r[n]
          if (o.pending !== Nt) {
            const i = o.pending
            ;(o.pending = Nt), Kn(o, i)
          }
        }
      }, !1),
      t
    )
  }
  function Be(e) {
    let t,
      r = ie
    return (ie = null), (t = e()), (ie = r), t
  }
  function kt(e, t, r) {
    const n = Array.isArray(e)
    let o,
      i = r && r.defer
    return (a) => {
      let s
      if (n) {
        s = Array(e.length)
        for (let l = 0; l < e.length; l++) s[l] = e[l]()
      } else s = e()
      if (i) {
        i = !1
        return
      }
      const S = Be(() => t(s, o, a))
      return (o = s), S
    }
  }
  function Pe(e) {
    return oe === null || (oe.cleanups === null ? (oe.cleanups = [e]) : oe.cleanups.push(e)), e
  }
  function mi() {
    return ie
  }
  function vi() {
    return oe
  }
  function xs(e, t) {
    const r = oe
    oe = e
    try {
      return _r(t, !0)
    } finally {
      oe = r
    }
  }
  function Ws(e) {
    const t = ie,
      r = oe
    return Promise.resolve().then(() => {
      ;(ie = t), (oe = r)
      let n
      return rr(e), (ie = oe = null), n ? n.done : void 0
    })
  }
  function _s() {
    return [Fs, Ws]
  }
  function xr(e) {
    const t = Symbol('context')
    return { id: t, Provider: Zs(t), defaultValue: e }
  }
  function st(e) {
    let t
    return (t = Di(oe, e.id)) !== void 0 ? t : e.defaultValue
  }
  function Gn(e) {
    const t = b(e)
    return b(() => In(t()))
  }
  function Ni() {
    const e = tr
    if (this.sources && (this.state || e)) {
      const t = he
      ;(he = null), this.state === qe || e ? Mt(this) : Ur(this), (he = t)
    }
    if (ie) {
      const t = this.observers ? this.observers.length : 0
      ie.sources
        ? (ie.sources.push(this), ie.sourceSlots.push(t))
        : ((ie.sources = [this]), (ie.sourceSlots = [t])),
        this.observers
          ? (this.observers.push(ie), this.observerSlots.push(ie.sources.length - 1))
          : ((this.observers = [ie]), (this.observerSlots = [ie.sources.length - 1]))
    }
    return this.value
  }
  function Kn(e, t, r) {
    if ($t) return e.pending === Nt && $t.push(e), (e.pending = t), t
    if (e.comparator && e.comparator(e.value, t)) return t
    let n = !1
    return (
      (e.value = t),
      e.observers &&
        e.observers.length &&
        _r(() => {
          for (let o = 0; o < e.observers.length; o += 1) {
            const i = e.observers[o]
            n && tr.disposed.has(i),
              ((n && !i.tState) || (!n && !i.state)) &&
                (i.pure ? he.push(i) : Ye.push(i), i.observers && yi(i)),
              n || (i.state = qe)
          }
          if (he.length > 1e6) throw ((he = []), new Error())
        }, !1),
      t
    )
  }
  function Mt(e) {
    if (!e.fn) return
    Fn(e)
    const t = oe,
      r = ie,
      n = wn
    ;(ie = oe = e), $s(e, e.value, n), (ie = r), (oe = t)
  }
  function $s(e, t, r) {
    let n
    try {
      n = e.fn(t)
    } catch (o) {
      Ci(o)
    }
    ;(!e.updatedAt || e.updatedAt <= r) &&
      (e.observers && e.observers.length ? Kn(e, n) : (e.value = n), (e.updatedAt = r))
  }
  function Wr(e, t, r, n = qe, o) {
    const i = {
      fn: e,
      state: n,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: t,
      owner: oe,
      context: null,
      pure: r,
    }
    return oe === null || (oe !== Li && (oe.owned ? oe.owned.push(i) : (oe.owned = [i]))), i
  }
  function Vt(e) {
    const t = tr
    if (e.state === 0 || t) return
    if (e.state === pr || t) return Ur(e)
    if (e.suspense && Be(e.suspense.inFallback)) return e.suspense.effects.push(e)
    const r = [e]
    for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < wn); ) (e.state || t) && r.push(e)
    for (let n = r.length - 1; n >= 0; n--)
      if (((e = r[n]), e.state === qe || t)) Mt(e)
      else if (e.state === pr || t) {
        const o = he
        ;(he = null), Ur(e, r[0]), (he = o)
      }
  }
  function _r(e, t) {
    if (he) return e()
    let r = !1
    t || (he = []), Ye ? (r = !0) : (Ye = []), wn++
    try {
      const n = e()
      return ks(r), n
    } catch (n) {
      he || (Ye = null), Ci(n)
    }
  }
  function ks(e) {
    he && (gi(he), (he = null)),
      !e &&
        (Ye.length
          ? rr(() => {
              hi(Ye), (Ye = null)
            })
          : (Ye = null))
  }
  function gi(e) {
    for (let t = 0; t < e.length; t++) Vt(e[t])
  }
  function Vs(e) {
    let t,
      r = 0
    for (t = 0; t < e.length; t++) {
      const o = e[t]
      o.user ? (e[r++] = o) : Vt(o)
    }
    Ue.context && Hs()
    const n = e.length
    for (t = 0; t < r; t++) Vt(e[t])
    for (t = n; t < e.length; t++) Vt(e[t])
  }
  function Ur(e, t) {
    const r = tr
    e.state = 0
    for (let n = 0; n < e.sources.length; n += 1) {
      const o = e.sources[n]
      o.sources && (o.state === qe || r ? o !== t && Vt(o) : (o.state === pr || r) && Ur(o, t))
    }
  }
  function yi(e) {
    const t = tr
    for (let r = 0; r < e.observers.length; r += 1) {
      const n = e.observers[r]
      ;(!n.state || t) && ((n.state = pr), n.pure ? he.push(n) : Ye.push(n), n.observers && yi(n))
    }
  }
  function Fn(e) {
    let t
    if (e.sources)
      for (; e.sources.length; ) {
        const r = e.sources.pop(),
          n = e.sourceSlots.pop(),
          o = r.observers
        if (o && o.length) {
          const i = o.pop(),
            a = r.observerSlots.pop()
          n < o.length && ((i.sourceSlots[a] = n), (o[n] = i), (r.observerSlots[n] = a))
        }
      }
    if (e.owned) {
      for (t = 0; t < e.owned.length; t++) Fn(e.owned[t])
      e.owned = null
    }
    if (e.cleanups) {
      for (t = 0; t < e.cleanups.length; t++) e.cleanups[t]()
      e.cleanups = null
    }
    ;(e.state = 0), (e.context = null)
  }
  function Ci(e) {
    throw e
  }
  function Di(e, t) {
    return e ? (e.context && e.context[t] !== void 0 ? e.context[t] : Di(e.owner, t)) : void 0
  }
  function In(e) {
    if (typeof e == 'function' && !e.length) return In(e())
    if (Array.isArray(e)) {
      const t = []
      for (let r = 0; r < e.length; r++) {
        const n = In(e[r])
        Array.isArray(n) ? t.push.apply(t, n) : t.push(n)
      }
      return t
    }
    return e
  }
  function Zs(e) {
    return function (r) {
      let n
      return Fr(() => (n = Be(() => ((oe.context = { [e]: r.value }), Gn(() => r.children))))), n
    }
  }
  function y(e, t) {
    return Be(() => e(t || {}))
  }
  function lr() {
    return !0
  }
  const pi = {
    get(e, t, r) {
      return t === at ? r : e.get(t)
    },
    has(e, t) {
      return e.has(t)
    },
    set: lr,
    deleteProperty: lr,
    getOwnPropertyDescriptor(e, t) {
      return {
        configurable: !0,
        enumerable: !0,
        get() {
          return e.get(t)
        },
        set: lr,
        deleteProperty: lr,
      }
    },
    ownKeys(e) {
      return e.keys()
    },
  }
  function zr(e) {
    return (e = typeof e == 'function' ? e() : e) == null ? {} : e
  }
  function zt(...e) {
    return new Proxy(
      {
        get(t) {
          for (let r = e.length - 1; r >= 0; r--) {
            const n = zr(e[r])[t]
            if (n !== void 0) return n
          }
        },
        has(t) {
          for (let r = e.length - 1; r >= 0; r--) if (t in zr(e[r])) return !0
          return !1
        },
        keys() {
          const t = []
          for (let r = 0; r < e.length; r++) t.push(...Object.keys(zr(e[r])))
          return [...new Set(t)]
        },
      },
      pi,
    )
  }
  function Ui(e, ...t) {
    const r = new Set(t.flat()),
      n = Object.getOwnPropertyDescriptors(e),
      o = t.map((i) => {
        const a = {}
        for (let s = 0; s < i.length; s++) {
          const S = i[s]
          Object.defineProperty(
            a,
            S,
            n[S]
              ? n[S]
              : {
                  get() {
                    return e[S]
                  },
                  set() {
                    return !0
                  },
                },
          )
        }
        return a
      })
    return (
      o.push(
        new Proxy(
          {
            get(i) {
              return r.has(i) ? void 0 : e[i]
            },
            has(i) {
              return r.has(i) ? !1 : i in e
            },
            keys() {
              return Object.keys(e).filter((i) => !r.has(i))
            },
          },
          pi,
        ),
      ),
      o
    )
  }
  let Xs = 0
  function Qs() {
    const e = Ue.context
    return e ? `${e.id}${e.count++}` : `cl-${Xs++}`
  }
  function Pi(e) {
    let t = !1
    const r = b(() => e.when, void 0, { equals: (n, o) => (t ? n === o : !n == !o) })
    return b(() => {
      const n = r()
      if (n) {
        const o = e.children
        return (t = typeof o == 'function' && o.length > 0) ? Be(() => o(n)) : o
      }
      return e.fallback
    })
  }
  const Js = [
      'allowfullscreen',
      'async',
      'autofocus',
      'autoplay',
      'checked',
      'controls',
      'default',
      'disabled',
      'formnovalidate',
      'hidden',
      'indeterminate',
      'ismap',
      'loop',
      'multiple',
      'muted',
      'nomodule',
      'novalidate',
      'open',
      'playsinline',
      'readonly',
      'required',
      'reversed',
      'seamless',
      'selected',
    ],
    zs = new Set([
      'className',
      'value',
      'readOnly',
      'formNoValidate',
      'isMap',
      'noModule',
      'playsInline',
      ...Js,
    ]),
    qs = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
    js = { className: 'class', htmlFor: 'for' },
    So = {
      class: 'className',
      formnovalidate: 'formNoValidate',
      ismap: 'isMap',
      nomodule: 'noModule',
      playsinline: 'playsInline',
      readonly: 'readOnly',
    },
    el = new Set([
      'beforeinput',
      'click',
      'dblclick',
      'contextmenu',
      'focusin',
      'focusout',
      'input',
      'keydown',
      'keyup',
      'mousedown',
      'mousemove',
      'mouseout',
      'mouseover',
      'mouseup',
      'pointerdown',
      'pointermove',
      'pointerout',
      'pointerover',
      'pointerup',
      'touchend',
      'touchmove',
      'touchstart',
    ]),
    tl = { xlink: 'http://www.w3.org/1999/xlink', xml: 'http://www.w3.org/XML/1998/namespace' }
  function V(e, t) {
    return b(e, void 0, t ? void 0 : { equals: t })
  }
  function rl(e, t, r) {
    let n = r.length,
      o = t.length,
      i = n,
      a = 0,
      s = 0,
      S = t[o - 1].nextSibling,
      l = null
    for (; a < o || s < i; ) {
      if (t[a] === r[s]) {
        a++, s++
        continue
      }
      for (; t[o - 1] === r[i - 1]; ) o--, i--
      if (o === a) {
        const E = i < n ? (s ? r[s - 1].nextSibling : r[i - s]) : S
        for (; s < i; ) e.insertBefore(r[s++], E)
      } else if (i === s) for (; a < o; ) (!l || !l.has(t[a])) && t[a].remove(), a++
      else if (t[a] === r[i - 1] && r[s] === t[o - 1]) {
        const E = t[--o].nextSibling
        e.insertBefore(r[s++], t[a++].nextSibling), e.insertBefore(r[--i], E), (t[o] = r[i])
      } else {
        if (!l) {
          l = new Map()
          let A = s
          for (; A < i; ) l.set(r[A], A++)
        }
        const E = l.get(t[a])
        if (E != null)
          if (s < E && E < i) {
            let A = a,
              c = 1,
              u
            for (; ++A < o && A < i && !((u = l.get(t[A])) == null || u !== E + c); ) c++
            if (c > E - s) {
              const T = t[a]
              for (; s < E; ) e.insertBefore(r[s++], T)
            } else e.replaceChild(r[s++], t[a++])
          } else a++
        else t[a++].remove()
      }
    }
  }
  const Eo = '_$DX_DELEGATE'
  function nl(e, t, r) {
    let n
    return (
      Hn((o) => {
        ;(n = o), t === document ? e() : d(t, e(), t.firstChild ? null : void 0, r)
      }),
      () => {
        n(), (t.textContent = '')
      }
    )
  }
  function P(e, t, r) {
    const n = document.createElement('template')
    n.innerHTML = e
    let o = n.content.firstChild
    return r && (o = o.firstChild), o
  }
  function He(e, t = window.document) {
    const r = t[Eo] || (t[Eo] = new Set())
    for (let n = 0, o = e.length; n < o; n++) {
      const i = e[n]
      r.has(i) || (r.add(i), t.addEventListener(i, ll))
    }
  }
  function U(e, t, r) {
    r == null ? e.removeAttribute(t) : e.setAttribute(t, r)
  }
  function ol(e, t, r, n) {
    n == null ? e.removeAttributeNS(t, r) : e.setAttributeNS(t, r, n)
  }
  function il(e, t) {
    t == null ? e.removeAttribute('class') : (e.className = t)
  }
  function Ie(e, t, r, n) {
    if (n) Array.isArray(r) ? ((e[`$$${t}`] = r[0]), (e[`$$${t}Data`] = r[1])) : (e[`$$${t}`] = r)
    else if (Array.isArray(r)) {
      const o = r[0]
      e.addEventListener(t, (r[0] = (i) => o.call(e, r[1], i)))
    } else e.addEventListener(t, r)
  }
  function we(e, t, r = {}) {
    const n = Object.keys(t || {}),
      o = Object.keys(r)
    let i, a
    for (i = 0, a = o.length; i < a; i++) {
      const s = o[i]
      !s || s === 'undefined' || t[s] || (co(e, s, !1), delete r[s])
    }
    for (i = 0, a = n.length; i < a; i++) {
      const s = n[i],
        S = !!t[s]
      !s || s === 'undefined' || r[s] === S || !S || (co(e, s, !0), (r[s] = S))
    }
    return r
  }
  function Mi(e, t, r = {}) {
    const n = e.style,
      o = typeof r == 'string'
    if ((t == null && o) || typeof t == 'string') return (n.cssText = t)
    o && ((n.cssText = void 0), (r = {})), t || (t = {})
    let i, a
    for (a in r) t[a] == null && n.removeProperty(a), delete r[a]
    for (a in t) (i = t[a]), i !== r[a] && (n.setProperty(a, i), (r[a] = i))
    return r
  }
  function Ve(e, t, r, n) {
    typeof t == 'function' ? w((o) => Ao(e, t(), o, r, n)) : Ao(e, t, void 0, r, n)
  }
  function d(e, t, r, n) {
    if ((r !== void 0 && !n && (n = []), typeof t != 'function')) return gt(e, t, n, r)
    w((o) => gt(e, t(), o, r), n)
  }
  function al(e, t, r, n, o = {}, i = !1) {
    t || (t = {})
    for (const a in o)
      if (!(a in t)) {
        if (a === 'children') continue
        uo(e, a, null, o[a], r, i)
      }
    for (const a in t) {
      if (a === 'children') {
        n || gt(e, t.children)
        continue
      }
      const s = t[a]
      o[a] = uo(e, a, s, o[a], r, i)
    }
  }
  function sl(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (t, r) => r.toUpperCase())
  }
  function co(e, t, r) {
    const n = t.trim().split(/\s+/)
    for (let o = 0, i = n.length; o < i; o++) e.classList.toggle(n[o], r)
  }
  function uo(e, t, r, n, o, i) {
    let a, s, S
    if (t === 'style') return Mi(e, r, n)
    if (t === 'classList') return we(e, r, n)
    if (r === n) return n
    if (t === 'ref') i || r(e)
    else if (t.slice(0, 3) === 'on:') {
      const l = t.slice(3)
      n && e.removeEventListener(l, n), r && e.addEventListener(l, r)
    } else if (t.slice(0, 10) === 'oncapture:') {
      const l = t.slice(10)
      n && e.removeEventListener(l, n, !0), r && e.addEventListener(l, r, !0)
    } else if (t.slice(0, 2) === 'on') {
      const l = t.slice(2).toLowerCase(),
        E = el.has(l)
      if (!E && n) {
        const A = Array.isArray(n) ? n[0] : n
        e.removeEventListener(l, A)
      }
      ;(E || r) && (Ie(e, l, r, E), E && He([l]))
    } else if (
      (S = qs.has(t)) ||
      (!o && (So[t] || (s = zs.has(t)))) ||
      (a = e.nodeName.includes('-'))
    )
      t === 'class' || t === 'className'
        ? il(e, r)
        : a && !s && !S
        ? (e[sl(t)] = r)
        : (e[So[t] || t] = r)
    else {
      const l = o && t.indexOf(':') > -1 && tl[t.split(':')[0]]
      l ? ol(e, l, t, r) : U(e, js[t] || t, r)
    }
    return r
  }
  function ll(e) {
    const t = `$$${e.type}`
    let r = (e.composedPath && e.composedPath()[0]) || e.target
    for (
      e.target !== r && Object.defineProperty(e, 'target', { configurable: !0, value: r }),
        Object.defineProperty(e, 'currentTarget', {
          configurable: !0,
          get() {
            return r || document
          },
        }),
        Ue.registry &&
          !Ue.done &&
          ((Ue.done = !0), document.querySelectorAll('[id^=pl-]').forEach((n) => n.remove()));
      r !== null;

    ) {
      const n = r[t]
      if (n && !r.disabled) {
        const o = r[`${t}Data`]
        if ((o !== void 0 ? n.call(r, o, e) : n.call(r, e), e.cancelBubble)) return
      }
      r = r.host && r.host !== r && r.host instanceof Node ? r.host : r.parentNode
    }
  }
  function Ao(e, t, r = {}, n, o) {
    return (
      t || (t = {}),
      !o && 'children' in t && w(() => (r.children = gt(e, t.children, r.children))),
      t.ref && t.ref(e),
      w(() => al(e, t, n, !0, r, !0)),
      r
    )
  }
  function gt(e, t, r, n, o) {
    for (Ue.context && !r && (r = [...e.childNodes]); typeof r == 'function'; ) r = r()
    if (t === r) return r
    const i = typeof t,
      a = n !== void 0
    if (((e = (a && r[0] && r[0].parentNode) || e), i === 'string' || i === 'number')) {
      if (Ue.context) return r
      if ((i === 'number' && (t = t.toString()), a)) {
        let s = r[0]
        s && s.nodeType === 3 ? (s.data = t) : (s = document.createTextNode(t)),
          (r = At(e, r, n, s))
      } else
        r !== '' && typeof r == 'string' ? (r = e.firstChild.data = t) : (r = e.textContent = t)
    } else if (t == null || i === 'boolean') {
      if (Ue.context) return r
      r = At(e, r, n)
    } else {
      if (i === 'function')
        return (
          w(() => {
            let s = t()
            for (; typeof s == 'function'; ) s = s()
            r = gt(e, s, r, n)
          }),
          () => r
        )
      if (Array.isArray(t)) {
        const s = [],
          S = r && Array.isArray(r)
        if (Tn(s, t, r, o)) return w(() => (r = gt(e, s, r, n, !0))), () => r
        if (Ue.context) {
          for (let l = 0; l < s.length; l++) if (s[l].parentNode) return (r = s)
        }
        if (s.length === 0) {
          if (((r = At(e, r, n)), a)) return r
        } else S ? (r.length === 0 ? Oo(e, s, n) : rl(e, r, s)) : (r && At(e), Oo(e, s))
        r = s
      } else if (t instanceof Node) {
        if (Ue.context && t.parentNode) return (r = a ? [t] : t)
        if (Array.isArray(r)) {
          if (a) return (r = At(e, r, n, t))
          At(e, r, null, t)
        } else
          r == null || r === '' || !e.firstChild
            ? e.appendChild(t)
            : e.replaceChild(t, e.firstChild)
        r = t
      }
    }
    return r
  }
  function Tn(e, t, r, n) {
    let o = !1
    for (let i = 0, a = t.length; i < a; i++) {
      let s = t[i],
        S = r && r[i]
      if (s instanceof Node) e.push(s)
      else if (!(s == null || s === !0 || s === !1))
        if (Array.isArray(s)) o = Tn(e, s, S) || o
        else if (typeof s == 'function')
          if (n) {
            for (; typeof s == 'function'; ) s = s()
            o = Tn(e, Array.isArray(s) ? s : [s], S) || o
          } else e.push(s), (o = !0)
        else {
          const l = String(s)
          S && S.nodeType === 3 && S.data === l ? e.push(S) : e.push(document.createTextNode(l))
        }
    }
    return o
  }
  function Oo(e, t, r) {
    for (let n = 0, o = t.length; n < o; n++) e.insertBefore(t[n], r)
  }
  function At(e, t, r, n) {
    if (r === void 0) return (e.textContent = '')
    const o = n || document.createTextNode('')
    if (t.length) {
      let i = !1
      for (let a = t.length - 1; a >= 0; a--) {
        const s = t[a]
        if (o !== s) {
          const S = s.parentNode === e
          !i && !a ? (S ? e.replaceChild(o, s) : e.insertBefore(o, r)) : S && s.remove()
        } else i = !0
      }
    } else e.insertBefore(o, r)
    return [o]
  }
  function bi(e, t, r) {
    return e.addEventListener(t, r), () => e.removeEventListener(t, r)
  }
  function Sl([e, t], r, n) {
    return [r ? () => r(e()) : e, n ? (o) => t(n(o)) : t]
  }
  function Yi(e, t) {
    const r = document.getElementById(e)
    r ? r.scrollIntoView() : t && window.scrollTo(0, 0)
  }
  function Bi(e, t, r, n) {
    let o = !1
    const i = (s) => (typeof s == 'string' ? { value: s } : s),
      a = Sl(Q(i(e()), { equals: (s, S) => s.value === S.value }), void 0, (s) => (!o && t(s), s))
    return (
      r &&
        Pe(
          r((s = e()) => {
            ;(o = !0), a[1](i(s)), (o = !1)
          }),
        ),
      { signal: a, utils: n }
    )
  }
  function El(e) {
    if (e) {
      if (Array.isArray(e)) return { signal: e }
    } else return { signal: Q({ value: '' }) }
    return e
  }
  function cl() {
    return Bi(
      () => ({
        value: window.location.pathname + window.location.search + window.location.hash,
        state: history.state,
      }),
      ({ value: e, replace: t, scroll: r, state: n }) => {
        t ? window.history.replaceState(n, '', e) : window.history.pushState(n, '', e),
          Yi(window.location.hash.slice(1), r)
      },
      (e) => bi(window, 'popstate', () => e()),
      { go: (e) => window.history.go(e) },
    )
  }
  function ul() {
    return Bi(
      () => window.location.hash.slice(1),
      ({ value: e, scroll: t }) => {
        window.location.hash = e
        const r = e.indexOf('#'),
          n = r >= 0 ? e.slice(r + 1) : ''
        Yi(n, t)
      },
      (e) => bi(window, 'hashchange', () => e()),
      {
        go: (e) => window.history.go(e),
        renderPath: (e) => `#${e}`,
        parsePath: (e) => {
          const t = e.replace(/^.*?#/, '')
          if (!t.startsWith('/')) {
            const [, r = '/'] = window.location.hash.split('#', 2)
            return `${r}#${t}`
          }
          return t
        },
      },
    )
  }
  const Al = /^(?:[a-z0-9]+:)?\/\//i,
    dl = /^\/+|\/+$|\s+/g
  function Zt(e) {
    const t = e.replace(dl, '')
    return t ? (t.startsWith('?') ? t : '/' + t) : ''
  }
  function mr(e, t, r) {
    if (Al.test(t)) return
    const n = Zt(e),
      o = r && Zt(r)
    let i = ''
    return (
      !o || t.charAt(0) === '/'
        ? (i = n)
        : o.toLowerCase().indexOf(n.toLowerCase()) !== 0
        ? (i = n + o)
        : (i = o),
      i + Zt(t) || '/'
    )
  }
  function Ol(e, t) {
    if (e == null) throw new Error(t)
    return e
  }
  function wi(e, t) {
    return Zt(e).replace(/\/*(\*.*)?$/g, '') + Zt(t)
  }
  function fl(e) {
    const t = {}
    return (
      e.searchParams.forEach((r, n) => {
        t[n] = r
      }),
      t
    )
  }
  function Rl(e, t) {
    const [r, n] = e.split('/*', 2),
      o = r.split('/').filter(Boolean),
      i = o.length
    return (a) => {
      const s = a.split('/').filter(Boolean),
        S = s.length - i
      if (S < 0 || (S > 0 && n === void 0 && !t)) return null
      const l = { path: i ? '' : '/', params: {} }
      for (let E = 0; E < i; E++) {
        const A = o[E],
          c = s[E]
        if (A[0] === ':') l.params[A.slice(1)] = c
        else if (A.localeCompare(c, void 0, { sensitivity: 'base' }) !== 0) return null
        l.path += `/${c}`
      }
      return n && (l.params[n] = S ? s.slice(-S).join('/') : ''), l
    }
  }
  function Il(e) {
    const [t, r] = e.pattern.split('/*', 2),
      n = t.split('/').filter(Boolean)
    return n.reduce((o, i) => o + (i.startsWith(':') ? 2 : 3), n.length - (r === void 0 ? 0 : 1))
  }
  function Hi(e) {
    const t = new Map(),
      r = vi()
    return new Proxy(
      {},
      {
        get(n, o) {
          return (
            t.has(o) ||
              xs(r, () =>
                t.set(
                  o,
                  b(() => e()[o]),
                ),
              ),
            t.get(o)()
          )
        },
        getOwnPropertyDescriptor() {
          return { enumerable: !0, configurable: !0 }
        },
        ownKeys() {
          return Reflect.ownKeys(e())
        },
      },
    )
  }
  function Tl(e, t) {
    const r = new URLSearchParams(e)
    return (
      Object.entries(t).forEach(([n, o]) => {
        o == null || o === '' ? r.delete(n) : r.set(n, String(o))
      }),
      r.toString()
    )
  }
  const hl = 100,
    Gi = xr(),
    $r = xr(),
    nr = () => Ol(st(Gi), 'Make sure your app is wrapped in a <Router />')
  let qt
  const xn = () => qt || st($r) || nr().base,
    Ki = (e) => {
      const t = xn()
      return b(() => t.resolvePath(e()))
    },
    Ll = (e) => {
      const t = nr()
      return b(() => {
        const r = e()
        return r !== void 0 ? t.renderPath(r) : r
      })
    },
    ml = () => nr().navigatorFactory(),
    Fi = () => nr().location,
    xi = () => {
      const e = Fi(),
        t = ml(),
        r = (n, o) => {
          const i = Tl(e.search, n)
          t(i ? `?${i}` : '', ut(Ce({ scroll: !1 }, o), { resolve: !0 }))
        }
      return [e.query, r]
    }
  function vl(e, t = '', r) {
    const { path: n, component: o, data: i, children: a } = e,
      s = !a || (Array.isArray(a) && !a.length),
      S = wi(t, n),
      l = s ? S : S.split('/*', 1)[0]
    return {
      originalPath: n,
      pattern: l,
      element: o
        ? () => y(o, {})
        : () => {
            const { element: E } = e
            return E === void 0 && r ? y(r, {}) : E
          },
      preload: e.component ? o.preload : e.preload,
      data: i,
      matcher: Rl(l, !s),
    }
  }
  function Nl(e, t = 0) {
    return {
      routes: e,
      score: Il(e[e.length - 1]) * 1e4 - t,
      matcher(r) {
        const n = []
        for (let o = e.length - 1; o >= 0; o--) {
          const i = e[o],
            a = i.matcher(r)
          if (!a) return null
          n.unshift(ut(Ce({}, a), { route: i }))
        }
        return n
      },
    }
  }
  function Wi(e, t = '', r, n = [], o = []) {
    const i = Array.isArray(e) ? e : [e]
    for (let a = 0, s = i.length; a < s; a++) {
      const S = i[a]
      if (S && typeof S == 'object' && S.hasOwnProperty('path')) {
        const l = vl(S, t, r)
        if ((n.push(l), S.children)) Wi(S.children, l.pattern, r, n, o)
        else {
          const E = Nl([...n], o.length)
          o.push(E)
        }
        n.pop()
      }
    }
    return n.length ? o : o.sort((a, s) => s.score - a.score)
  }
  function gl(e, t) {
    for (let r = 0, n = e.length; r < n; r++) {
      const o = e[r].matcher(t)
      if (o) return o
    }
    return []
  }
  function yl(e, t) {
    const r = new URL('http://sar'),
      n = b(
        (S) => {
          const l = e()
          try {
            return new URL(l, r)
          } catch (E) {
            return console.error(`Invalid path ${l}`), S
          }
        },
        r,
        { equals: (S, l) => S.href === l.href },
      ),
      o = b(() => n().pathname),
      i = b(() => n().search.slice(1)),
      a = b(() => n().hash.slice(1)),
      s = b(() => '')
    return {
      get pathname() {
        return o()
      },
      get search() {
        return i()
      },
      get hash() {
        return a()
      },
      get state() {
        return t()
      },
      get key() {
        return s()
      },
      query: Hi(kt(i, () => fl(n()))),
    }
  }
  function Cl(e, t = '', r, n) {
    const {
        signal: [o, i],
        utils: a = {},
      } = El(e),
      s = a.parsePath || ((h) => h),
      S = a.renderPath || ((h) => h),
      l = mr('', t),
      E = void 0
    if (l === void 0) throw new Error(`${l} is not a valid base path`)
    l && !o().value && i({ value: l, replace: !0, scroll: !1 })
    const [A, c] = _s(),
      [u, T] = Q(o().value),
      [f, I] = Q(o().state),
      R = yl(u, f),
      m = [],
      N = {
        pattern: l,
        params: {},
        path: () => l,
        outlet: () => null,
        resolvePath(h) {
          return mr(l, h)
        },
      }
    if (r)
      try {
        ;(qt = N), (N.data = r({ data: void 0, params: {}, location: R, navigate: g(N) }))
      } finally {
        qt = void 0
      }
    function v(h, L, M) {
      Be(() => {
        if (typeof L == 'number') {
          L &&
            (a.go ? a.go(L) : console.warn('Router integration does not support relative routing'))
          return
        }
        const {
            replace: F,
            resolve: H,
            scroll: J,
            state: j,
          } = Ce({ replace: !1, resolve: !0, scroll: !0 }, M),
          Y = H ? h.resolvePath(L) : mr('', L)
        if (Y === void 0) throw new Error(`Path '${L}' is not a routable path`)
        if (m.length >= hl) throw new Error('Too many redirects')
        const Se = u()
        if (Y !== Se || j !== f()) {
          const Oe = m.push({ value: Se, replace: F, scroll: J, state: f })
          c(() => {
            T(Y), I(j)
          }).then(() => {
            m.length === Oe && O({ value: Y, state: j })
          })
        }
      })
    }
    function g(h) {
      return (h = h || st($r) || N), (L, M) => v(h, L, M)
    }
    function O(h) {
      const L = m[0]
      L &&
        ((h.value !== L.value || h.state !== L.state) &&
          i(ut(Ce({}, h), { replace: L.replace, scroll: L.scroll })),
        (m.length = 0))
    }
    w(() => {
      const { value: h, state: L } = o()
      h !== Be(u) &&
        c(() => {
          T(h), I(L)
        })
    })
    {
      let h = function (L) {
        if (
          L.defaultPrevented ||
          L.button !== 0 ||
          L.metaKey ||
          L.altKey ||
          L.ctrlKey ||
          L.shiftKey
        )
          return
        const M = L.composedPath().find(
          (ue) => ue instanceof Node && ue.nodeName.toUpperCase() === 'A',
        )
        if (!M) return
        const F = M instanceof SVGAElement,
          H = F ? M.href.baseVal : M.href
        if ((F ? M.target.baseVal : M.target) || (!H && !M.hasAttribute('state'))) return
        const j = (M.getAttribute('rel') || '').split(/\s+/)
        if (M.hasAttribute('download') || (j && j.includes('external'))) return
        const Y = F ? new URL(H, document.baseURI) : new URL(H)
        if (
          Y.origin !== window.location.origin ||
          (l && Y.pathname && !Y.pathname.toLowerCase().startsWith(l.toLowerCase()))
        )
          return
        const Se = s(Y.pathname + Y.search + Y.hash),
          Oe = M.getAttribute('state')
        L.preventDefault(),
          v(N, Se, {
            resolve: !1,
            replace: M.hasAttribute('replace'),
            scroll: !M.hasAttribute('noscroll'),
            state: Oe && JSON.parse(Oe),
          })
      }
      var D = h
      document.addEventListener('click', h), Pe(() => document.removeEventListener('click', h))
    }
    return {
      base: N,
      out: E,
      location: R,
      isRouting: A,
      renderPath: S,
      parsePath: s,
      navigatorFactory: g,
    }
  }
  function Dl(e, t, r, n) {
    const { base: o, location: i, navigatorFactory: a } = e,
      { pattern: s, element: S, preload: l, data: E } = n().route,
      A = b(() => n().path),
      c = Hi(() => n().params)
    l && l()
    const u = {
      parent: t,
      pattern: s,
      get child() {
        return r()
      },
      path: A,
      params: c,
      data: t.data,
      outlet: S,
      resolvePath(T) {
        return mr(o.path(), T, A())
      },
    }
    if (E)
      try {
        ;(qt = u), (u.data = E({ data: t.data, params: c, location: i, navigate: a(u) }))
      } finally {
        qt = void 0
      }
    return u
  }
  const pl = P('<a></a>'),
    Ul = (e) => {
      const { source: t, url: r, base: n, data: o, out: i } = e,
        a = t || cl(),
        s = Cl(a, n, o)
      return y(Gi.Provider, {
        value: s,
        get children() {
          return e.children
        },
      })
    },
    Pl = (e) => {
      const t = nr(),
        r = xn(),
        n = b(() => Wi(e.children, wi(r.pattern, e.base || ''), Ml)),
        o = b(() => gl(n(), t.location.pathname))
      t.out &&
        t.out.matches.push(
          o().map(({ route: S, path: l, params: E }) => ({
            originalPath: S.originalPath,
            pattern: S.pattern,
            path: l,
            params: E,
          })),
        )
      const i = []
      let a
      const s = b(
        kt(o, (S, l, E) => {
          let A = l && S.length === l.length
          const c = []
          for (let u = 0, T = S.length; u < T; u++) {
            const f = l && l[u],
              I = S[u]
            E && f && I.route.pattern === f.route.pattern
              ? (c[u] = E[u])
              : ((A = !1),
                i[u] && i[u](),
                Hn((R) => {
                  ;(i[u] = R),
                    (c[u] = Dl(
                      t,
                      c[u - 1] || r,
                      () => s()[u + 1],
                      () => o()[u],
                    ))
                }))
          }
          return i.splice(S.length).forEach((u) => u()), E && A ? E : ((a = c[0]), c)
        }),
      )
      return y(Pi, {
        get when() {
          return s() && a
        },
        children: (S) =>
          y($r.Provider, {
            value: S,
            get children() {
              return S.outlet()
            },
          }),
      })
    },
    wt = (e) => e,
    Ml = () => {
      const e = xn()
      return y(Pi, {
        get when() {
          return e.child
        },
        children: (t) =>
          y($r.Provider, {
            value: t,
            get children() {
              return t.outlet()
            },
          }),
      })
    }
  function _i(e) {
    const [, t] = Ui(e, ['children', 'to', 'href', 'state']),
      r = Ll(() => e.to)
    return (() => {
      const n = pl.cloneNode(!0)
      return (
        Ve(n, t, !1, !0),
        d(n, () => e.children),
        w(
          (o) => {
            const i = r() || e.href,
              a = JSON.stringify(e.state)
            return (
              i !== o._v$ && U(n, 'href', (o._v$ = i)),
              a !== o._v$2 && U(n, 'state', (o._v$2 = a)),
              o
            )
          },
          { _v$: void 0, _v$2: void 0 },
        ),
        n
      )
    })()
  }
  function ge(e) {
    const t = Ki(() => e.href)
    return y(
      _i,
      zt(e, {
        get to() {
          return t()
        },
      }),
    )
  }
  function fo(e) {
    e = zt({ inactiveClass: 'inactive', activeClass: 'active' }, e)
    const [, t] = Ui(e, ['activeClass', 'inactiveClass', 'end']),
      r = Fi(),
      n = Ki(() => e.href),
      o = b(() => {
        const i = n()
        if (i === void 0) return !1
        const a = i.split(/[?#]/, 1)[0].toLowerCase(),
          s = r.pathname.toLowerCase()
        return e.end ? a === s : s.startsWith(a)
      })
    return y(
      _i,
      zt(t, {
        get to() {
          return n()
        },
        get classList() {
          return { [e.inactiveClass]: !o(), [e.activeClass]: o() }
        },
        get ['aria-current']() {
          return o() ? 'page' : void 0
        },
      }),
    )
  }
  try {
    self['workbox:window:6.5.2'] && _()
  } catch (e) {}
  function hn(e, t) {
    return new Promise(function (r) {
      var n = new MessageChannel()
      ;(n.port1.onmessage = function (o) {
        r(o.data)
      }),
        e.postMessage(t, [n.port2])
    })
  }
  function bl(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r]
      ;(n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n)
    }
  }
  function Ro(e, t) {
    ;(t == null || t > e.length) && (t = e.length)
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
    return n
  }
  function Yl(e, t) {
    var r
    if (typeof Symbol == 'undefined' || e[Symbol.iterator] == null) {
      if (
        Array.isArray(e) ||
        (r = (function (o, i) {
          if (o) {
            if (typeof o == 'string') return Ro(o, i)
            var a = Object.prototype.toString.call(o).slice(8, -1)
            return (
              a === 'Object' && o.constructor && (a = o.constructor.name),
              a === 'Map' || a === 'Set'
                ? Array.from(o)
                : a === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
                ? Ro(o, i)
                : void 0
            )
          }
        })(e)) ||
        (t && e && typeof e.length == 'number')
      ) {
        r && (e = r)
        var n = 0
        return function () {
          return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] }
        }
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }
    return (r = e[Symbol.iterator]()).next.bind(r)
  }
  try {
    self['workbox:core:6.5.2'] && _()
  } catch (e) {}
  var qr = function () {
    var e = this
    this.promise = new Promise(function (t, r) {
      ;(e.resolve = t), (e.reject = r)
    })
  }
  function jr(e, t) {
    var r = location.href
    return new URL(e, r).href === new URL(t, r).href
  }
  var Ht = function (e, t) {
    ;(this.type = e), Object.assign(this, t)
  }
  function Sr(e, t, r) {
    return r ? (t ? t(e) : e) : ((e && e.then) || (e = Promise.resolve(e)), t ? e.then(t) : e)
  }
  function Bl() {}
  var wl = { type: 'SKIP_WAITING' }
  function Io(e, t) {
    if (!t) return e && e.then ? e.then(Bl) : Promise.resolve()
  }
  var Hl = (function (e) {
    var t, r
    function n(s, S) {
      var l, E
      return (
        S === void 0 && (S = {}),
        ((l = e.call(this) || this).nn = {}),
        (l.tn = 0),
        (l.rn = new qr()),
        (l.en = new qr()),
        (l.on = new qr()),
        (l.un = 0),
        (l.an = new Set()),
        (l.cn = function () {
          var A = l.fn,
            c = A.installing
          l.tn > 0 || !jr(c.scriptURL, l.sn.toString()) || performance.now() > l.un + 6e4
            ? ((l.vn = c), A.removeEventListener('updatefound', l.cn))
            : ((l.hn = c), l.an.add(c), l.rn.resolve(c)),
            ++l.tn,
            c.addEventListener('statechange', l.ln)
        }),
        (l.ln = function (A) {
          var c = l.fn,
            u = A.target,
            T = u.state,
            f = u === l.vn,
            I = { sw: u, isExternal: f, originalEvent: A }
          !f && l.mn && (I.isUpdate = !0),
            l.dispatchEvent(new Ht(T, I)),
            T === 'installed'
              ? (l.wn = self.setTimeout(function () {
                  T === 'installed' && c.waiting === u && l.dispatchEvent(new Ht('waiting', I))
                }, 200))
              : T === 'activating' && (clearTimeout(l.wn), f || l.en.resolve(u))
        }),
        (l.dn = function (A) {
          var c = l.hn,
            u = c !== navigator.serviceWorker.controller
          l.dispatchEvent(
            new Ht('controlling', { isExternal: u, originalEvent: A, sw: c, isUpdate: l.mn }),
          ),
            u || l.on.resolve(c)
        }),
        (l.gn =
          ((E = function (A) {
            var c = A.data,
              u = A.ports,
              T = A.source
            return Sr(l.getSW(), function () {
              l.an.has(T) &&
                l.dispatchEvent(new Ht('message', { data: c, originalEvent: A, ports: u, sw: T }))
            })
          }),
          function () {
            for (var A = [], c = 0; c < arguments.length; c++) A[c] = arguments[c]
            try {
              return Promise.resolve(E.apply(this, A))
            } catch (u) {
              return Promise.reject(u)
            }
          })),
        (l.sn = s),
        (l.nn = S),
        navigator.serviceWorker.addEventListener('message', l.gn),
        l
      )
    }
    ;(r = e),
      ((t = n).prototype = Object.create(r.prototype)),
      (t.prototype.constructor = t),
      (t.__proto__ = r)
    var o,
      i,
      a = n.prototype
    return (
      (a.register = function (s) {
        var S = (s === void 0 ? {} : s).immediate,
          l = S !== void 0 && S
        try {
          var E = this
          return (function (A, c) {
            var u = A()
            return u && u.then ? u.then(c) : c(u)
          })(
            function () {
              if (!l && document.readyState !== 'complete')
                return Io(
                  new Promise(function (A) {
                    return window.addEventListener('load', A)
                  }),
                )
            },
            function () {
              return (
                (E.mn = Boolean(navigator.serviceWorker.controller)),
                (E.yn = E.pn()),
                Sr(E.bn(), function (A) {
                  ;(E.fn = A),
                    E.yn &&
                      ((E.hn = E.yn),
                      E.en.resolve(E.yn),
                      E.on.resolve(E.yn),
                      E.yn.addEventListener('statechange', E.ln, { once: !0 }))
                  var c = E.fn.waiting
                  return (
                    c &&
                      jr(c.scriptURL, E.sn.toString()) &&
                      ((E.hn = c),
                      Promise.resolve()
                        .then(function () {
                          E.dispatchEvent(
                            new Ht('waiting', { sw: c, wasWaitingBeforeRegister: !0 }),
                          )
                        })
                        .then(function () {})),
                    E.hn && (E.rn.resolve(E.hn), E.an.add(E.hn)),
                    E.fn.addEventListener('updatefound', E.cn),
                    navigator.serviceWorker.addEventListener('controllerchange', E.dn),
                    E.fn
                  )
                })
              )
            },
          )
        } catch (A) {
          return Promise.reject(A)
        }
      }),
      (a.update = function () {
        try {
          return this.fn ? Io(this.fn.update()) : void 0
        } catch (s) {
          return Promise.reject(s)
        }
      }),
      (a.getSW = function () {
        return this.hn !== void 0 ? Promise.resolve(this.hn) : this.rn.promise
      }),
      (a.messageSW = function (s) {
        try {
          return Sr(this.getSW(), function (S) {
            return hn(S, s)
          })
        } catch (S) {
          return Promise.reject(S)
        }
      }),
      (a.messageSkipWaiting = function () {
        this.fn && this.fn.waiting && hn(this.fn.waiting, wl)
      }),
      (a.pn = function () {
        var s = navigator.serviceWorker.controller
        return s && jr(s.scriptURL, this.sn.toString()) ? s : void 0
      }),
      (a.bn = function () {
        try {
          var s = this
          return (function (S, l) {
            try {
              var E = S()
            } catch (A) {
              return l(A)
            }
            return E && E.then ? E.then(void 0, l) : E
          })(
            function () {
              return Sr(navigator.serviceWorker.register(s.sn, s.nn), function (S) {
                return (s.un = performance.now()), S
              })
            },
            function (S) {
              throw S
            },
          )
        } catch (S) {
          return Promise.reject(S)
        }
      }),
      (o = n),
      (i = [
        {
          key: 'active',
          get: function () {
            return this.en.promise
          },
        },
        {
          key: 'controlling',
          get: function () {
            return this.on.promise
          },
        },
      ]) && bl(o.prototype, i),
      n
    )
  })(
    (function () {
      function e() {
        this.Pn = new Map()
      }
      var t = e.prototype
      return (
        (t.addEventListener = function (r, n) {
          this.Sn(r).add(n)
        }),
        (t.removeEventListener = function (r, n) {
          this.Sn(r).delete(n)
        }),
        (t.dispatchEvent = function (r) {
          r.target = this
          for (var n, o = Yl(this.Sn(r.type)); !(n = o()).done; ) (0, n.value)(r)
        }),
        (t.Sn = function (r) {
          return this.Pn.has(r) || this.Pn.set(r, new Set()), this.Pn.get(r)
        }),
        e
      )
    })(),
  )
  function Gl(e = {}) {
    const {
      immediate: t = !1,
      onNeedRefresh: r,
      onOfflineReady: n,
      onRegistered: o,
      onRegisterError: i,
    } = e
    let a, s
    const S = (l = !0) =>
      sr(this, null, function* () {
        l &&
          (a == null ||
            a.addEventListener('controlling', (E) => {
              E.isUpdate && window.location.reload()
            })),
          s && s.waiting && (yield hn(s.waiting, { type: 'SKIP_WAITING' }))
      })
    if ('serviceWorker' in navigator) {
      ;(a = new Hl('/sw.js', { scope: '/', type: 'classic' })),
        a.addEventListener('activated', (l) => {
          l.isUpdate || n == null || n()
        })
      {
        const l = () => {
          r == null || r()
        }
        a.addEventListener('waiting', l), a.addEventListener('externalwaiting', l)
      }
      a.register({ immediate: t })
        .then((l) => {
          ;(s = l), o == null || o(l)
        })
        .catch((l) => {
          i == null || i(l)
        })
    }
    return S
  }
  function To(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e)
    })
  }
  const $i = (e) => {
      let t,
        r = !0
      const [n, o] = Q(),
        [i, a] = Q(),
        s = Gn(() => e.children),
        S = e.name || 's'
      e = zt(
        {
          name: S,
          enterActiveClass: S + '-enter-active',
          enterClass: S + '-enter',
          enterToClass: S + '-enter-to',
          exitActiveClass: S + '-exit-active',
          exitClass: S + '-exit',
          exitToClass: S + '-exit-to',
        },
        e,
      )
      const {
        onBeforeEnter: l,
        onEnter: E,
        onAfterEnter: A,
        onBeforeExit: c,
        onExit: u,
        onAfterExit: T,
      } = e
      function f(R, m) {
        if (!r || e.appear) {
          let D = function (h) {
            R &&
              (!h || h.target === R) &&
              (R.removeEventListener('transitionend', D),
              R.removeEventListener('animationend', D),
              R.classList.remove(...g),
              R.classList.remove(...O),
              rr(() => {
                n() !== R && o(R), i() === R && a(void 0)
              }),
              A && A(R),
              e.mode === 'inout' && I(R, m))
          }
          var N = D
          const v = e.enterClass.split(' '),
            g = e.enterActiveClass.split(' '),
            O = e.enterToClass.split(' ')
          l && l(R),
            R.classList.add(...v),
            R.classList.add(...g),
            To(() => {
              R.classList.remove(...v),
                R.classList.add(...O),
                E && E(R, () => D()),
                (!E || E.length < 2) &&
                  (R.addEventListener('transitionend', D), R.addEventListener('animationend', D))
            })
        }
        m && !e.mode ? a(R) : o(R)
      }
      function I(R, m) {
        const N = e.exitClass.split(' '),
          v = e.exitActiveClass.split(' '),
          g = e.exitToClass.split(' ')
        if (!m.parentNode) return O()
        c && c(m),
          m.classList.add(...N),
          m.classList.add(...v),
          To(() => {
            m.classList.remove(...N), m.classList.add(...g)
          }),
          u && u(m, () => O()),
          (!u || u.length < 2) &&
            (m.addEventListener('transitionend', O), m.addEventListener('animationend', O))
        function O(D) {
          ;(!D || D.target === m) &&
            (m.removeEventListener('transitionend', O),
            m.removeEventListener('animationend', O),
            m.classList.remove(...v),
            m.classList.remove(...g),
            n() === m && o(void 0),
            T && T(m),
            e.mode === 'outin' && f(R, m))
        }
      }
      return (
        Fr((R) => {
          for (t = s(); typeof t == 'function'; ) t = t()
          return Be(
            () => (
              t && t !== R && (e.mode !== 'outin' ? f(t, R) : r && o(t)),
              R && R !== t && e.mode !== 'inout' && I(t, R),
              (r = !1),
              t
            ),
          )
        }),
        [n, i]
      )
    },
    yt = 2,
    ki = 2,
    pe = yt * ki,
    ee = 9,
    Fe = 5,
    Ne = {
      year: 24 * 60 * 60 * 1e3 * 365,
      month: (24 * 60 * 60 * 1e3 * 365) / 12,
      day: 24 * 60 * 60 * 1e3,
      hour: 60 * 60 * 1e3,
      minute: 60 * 1e3,
      second: 1e3,
    },
    Pr = new Date('01/24/2022'),
    Vi = Ne.day,
    Zi = 1.3,
    Xi = 0.7,
    Kl = 0.1,
    Qi = !!navigator.vibrate,
    Fl =
      ['ipad simulator', 'iphone simulator', 'ipod simulator', 'ipad', 'iphone', 'ipod'].indexOf(
        navigator.platform.toLowerCase(),
      ) >= 0 ||
      (navigator.userAgent.toLowerCase().includes('mac') && 'ontouchend' in document),
    ho = 'standalone' in window.navigator && window.navigator.standalone === !0
  ;/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)
  window.matchMedia('(display-mode: standalone)').matches
  const xl =
      navigator.share && navigator.canShare && navigator.canShare({ text: 'test share text' }),
    Wl =
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        text: 'test share text',
        files: [new File([new Blob()], 'test.png', { type: 'image/png' })],
      }),
    Lo = 10,
    Tt = [
      'win_practice',
      'win_daily',
      'streak_practice',
      'streak_daily',
      'win_in_9',
      'win_in_8',
      'win_in_7',
      'win_in_6',
      'win_in_5',
      'win_in_4',
      'guess_word_2_same_letter',
      'guess_word_3_same_letter',
      'correct_turn_1',
      'share',
      'donate',
      'lose_1_wrong',
      'lose_2_wrong',
      'lose_3_wrong',
      'lose_4_wrong',
      'play_words',
    ],
    _l = ['donate'],
    en = Tt.filter((e) => !_l.includes(e)),
    $l = {
      win_practice: [1, 5, 10, 50, 100, 500, 1e3],
      win_daily: [1, 5, 10, 50, 100, 500, 1e3],
      streak_practice: [5, 10, 50, 100, 500],
      streak_daily: [5, 10, 50, 100, 500],
      win_in_9: [1],
      win_in_8: [1],
      win_in_7: [1],
      win_in_6: [1],
      win_in_5: [1],
      win_in_4: [1],
      guess_word_2_same_letter: [1],
      guess_word_3_same_letter: [1],
      correct_turn_1: [1],
      share: [1],
      donate: [1],
      lose_1_wrong: [1],
      lose_2_wrong: [1],
      lose_3_wrong: [1],
      lose_4_wrong: [1],
      play_words: [50, 100, 200, 300, 500, 1e3, 1e4],
    },
    kl = {
      win_practice: (e, t) => t.free.history.slice(pe - 1, ee).reduce((n, o) => n + o, 0),
      win_daily: (e, t) => t.daily.history.slice(pe - 1, ee).reduce((n, o) => n + o, 0),
      streak_practice: (e, t) => t.free.maxStreak,
      streak_daily: (e, t) => t.daily.maxStreak,
      win_in_9: (e, t) => t.daily.history[8] + t.free.history[8],
      win_in_8: (e, t) => t.daily.history[7] + t.free.history[7],
      win_in_7: (e, t) => t.daily.history[6] + t.free.history[6],
      win_in_6: (e, t) => t.daily.history[5] + t.free.history[5],
      win_in_5: (e, t) => t.daily.history[4] + t.free.history[4],
      win_in_4: (e, t) => t.daily.history[3] + t.free.history[3],
      guess_word_2_same_letter: (e, t) => {
        const r = /\w*(\w)\w*\1\w*/
        return t.daily.guesses.some((n) => n.match(r)) || t.free.guesses.some((n) => n.match(r))
          ? 1
          : t.achievements[e.type].count
      },
      guess_word_3_same_letter: (e, t) => {
        const r = /\w*(\w)\w*\1\w*\1\w*/
        return t.daily.guesses.some((n) => n.match(r)) || t.free.guesses.some((n) => n.match(r))
          ? 1
          : t.achievements[e.type].count
      },
      correct_turn_1: (e, t) =>
        t.daily.answersCorrect.indexOf(0) !== -1 || t.free.answersCorrect.indexOf(0) !== -1
          ? 1
          : t.achievements[e.type].count,
      share: (e, t) => (t.shareTime > 0 ? 1 : 0),
      donate: (e, t) => (t.donationTime > 0 ? 1 : 0),
      lose_1_wrong: (e, t) => t.daily.history[12] + t.free.history[12],
      lose_2_wrong: (e, t) => t.daily.history[11] + t.free.history[11],
      lose_3_wrong: (e, t) => t.daily.history[10] + t.free.history[10],
      lose_4_wrong: (e, t) => t.daily.history[9] + t.free.history[9],
      play_words: (e, t) => {
        const r =
            t.free.history.slice(0, ee).reduce((o, i, a) => o + i * (a + 1), 0) +
            t.daily.history.slice(0, ee).reduce((o, i, a) => o + i * (a + 1), 0),
          n =
            t.free.history.slice(ee).reduce((o, i) => o + i * ee, 0) +
            t.daily.history.slice(ee).reduce((o, i) => o + i * ee, 0)
        return r + n
      },
    },
    Wn = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }
  var Gt =
    typeof globalThis != 'undefined'
      ? globalThis
      : typeof window != 'undefined'
      ? window
      : typeof global != 'undefined'
      ? global
      : typeof self != 'undefined'
      ? self
      : {}
  function Vl(e) {
    if (e.__esModule) return e
    var t = Object.defineProperty({}, '__esModule', { value: !0 })
    return (
      Object.keys(e).forEach(function (r) {
        var n = Object.getOwnPropertyDescriptor(e, r)
        Object.defineProperty(
          t,
          r,
          n.get
            ? n
            : {
                enumerable: !0,
                get: function () {
                  return e[r]
                },
              },
        )
      }),
      t
    )
  }
  var Ze = function (e) {
    e == null && (e = new Date().getTime()),
      (this.N = 624),
      (this.M = 397),
      (this.MATRIX_A = 2567483615),
      (this.UPPER_MASK = 2147483648),
      (this.LOWER_MASK = 2147483647),
      (this.mt = new Array(this.N)),
      (this.mti = this.N + 1),
      e.constructor == Array ? this.init_by_array(e, e.length) : this.init_seed(e)
  }
  Ze.prototype.init_seed = function (e) {
    for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
      var e = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)
      ;(this.mt[this.mti] =
        ((((e & 4294901760) >>> 16) * 1812433253) << 16) + (e & 65535) * 1812433253 + this.mti),
        (this.mt[this.mti] >>>= 0)
    }
  }
  Ze.prototype.init_by_array = function (e, t) {
    var r, n, o
    for (this.init_seed(19650218), r = 1, n = 0, o = this.N > t ? this.N : t; o; o--) {
      var i = this.mt[r - 1] ^ (this.mt[r - 1] >>> 30)
      ;(this.mt[r] =
        (this.mt[r] ^ (((((i & 4294901760) >>> 16) * 1664525) << 16) + (i & 65535) * 1664525)) +
        e[n] +
        n),
        (this.mt[r] >>>= 0),
        r++,
        n++,
        r >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (r = 1)),
        n >= t && (n = 0)
    }
    for (o = this.N - 1; o; o--) {
      var i = this.mt[r - 1] ^ (this.mt[r - 1] >>> 30)
      ;(this.mt[r] =
        (this.mt[r] ^
          (((((i & 4294901760) >>> 16) * 1566083941) << 16) + (i & 65535) * 1566083941)) -
        r),
        (this.mt[r] >>>= 0),
        r++,
        r >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (r = 1))
    }
    this.mt[0] = 2147483648
  }
  Ze.prototype.random_int = function () {
    var e,
      t = new Array(0, this.MATRIX_A)
    if (this.mti >= this.N) {
      var r
      for (this.mti == this.N + 1 && this.init_seed(5489), r = 0; r < this.N - this.M; r++)
        (e = (this.mt[r] & this.UPPER_MASK) | (this.mt[r + 1] & this.LOWER_MASK)),
          (this.mt[r] = this.mt[r + this.M] ^ (e >>> 1) ^ t[e & 1])
      for (; r < this.N - 1; r++)
        (e = (this.mt[r] & this.UPPER_MASK) | (this.mt[r + 1] & this.LOWER_MASK)),
          (this.mt[r] = this.mt[r + (this.M - this.N)] ^ (e >>> 1) ^ t[e & 1])
      ;(e = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK)),
        (this.mt[this.N - 1] = this.mt[this.M - 1] ^ (e >>> 1) ^ t[e & 1]),
        (this.mti = 0)
    }
    return (
      (e = this.mt[this.mti++]),
      (e ^= e >>> 11),
      (e ^= (e << 7) & 2636928640),
      (e ^= (e << 15) & 4022730752),
      (e ^= e >>> 18),
      e >>> 0
    )
  }
  Ze.prototype.random_int31 = function () {
    return this.random_int() >>> 1
  }
  Ze.prototype.random_incl = function () {
    return this.random_int() * (1 / 4294967295)
  }
  Ze.prototype.random = function () {
    return this.random_int() * (1 / 4294967296)
  }
  Ze.prototype.random_excl = function () {
    return (this.random_int() + 0.5) * (1 / 4294967296)
  }
  Ze.prototype.random_long = function () {
    var e = this.random_int() >>> 5,
      t = this.random_int() >>> 6
    return (e * 67108864 + t) * (1 / 9007199254740992)
  }
  var Zl = Ze
  const _n = Symbol('store-raw'),
    Mr = Symbol('store-node'),
    Xl = Symbol('store-name')
  function Ji(e, t) {
    let r = e[at]
    if (!r) {
      Object.defineProperty(e, at, { value: (r = new Proxy(e, zl)) })
      const n = Object.keys(e),
        o = Object.getOwnPropertyDescriptors(e)
      for (let i = 0, a = n.length; i < a; i++) {
        const s = n[i]
        if (o[s].get) {
          const S = o[s].get.bind(r)
          Object.defineProperty(e, s, { get: S })
        }
      }
    }
    return r
  }
  function Ct(e) {
    let t
    return (
      e != null &&
      typeof e == 'object' &&
      (e[at] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
    )
  }
  function Dt(e, t = new Set()) {
    let r, n, o, i
    if ((r = e != null && e[_n])) return r
    if (!Ct(e) || t.has(e)) return e
    if (Array.isArray(e)) {
      Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e)
      for (let a = 0, s = e.length; a < s; a++) (o = e[a]), (n = Dt(o, t)) !== o && (e[a] = n)
    } else {
      Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e)
      const a = Object.keys(e),
        s = Object.getOwnPropertyDescriptors(e)
      for (let S = 0, l = a.length; S < l; S++)
        (i = a[S]), !s[i].get && ((o = e[i]), (n = Dt(o, t)) !== o && (e[i] = n))
    }
    return e
  }
  function $n(e) {
    let t = e[Mr]
    return t || Object.defineProperty(e, Mr, { value: (t = {}) }), t
  }
  function Ln(e, t, r) {
    return e[t] || (e[t] = qi(r, !0))
  }
  function Ql(e, t) {
    const r = Reflect.getOwnPropertyDescriptor(e, t)
    return (
      !r ||
        r.get ||
        !r.configurable ||
        t === at ||
        t === Mr ||
        t === Xl ||
        (delete r.value, delete r.writable, (r.get = () => e[at][t])),
      r
    )
  }
  function zi(e) {
    if (mi()) {
      const t = $n(e)
      ;(t._ || (t._ = qi()))()
    }
  }
  function Jl(e) {
    return zi(e), Reflect.ownKeys(e)
  }
  function qi(e, t) {
    const [r, n] = Q(e, t ? { internal: !0 } : { equals: !1, internal: !0 })
    return (r.$ = n), r
  }
  const zl = {
    get(e, t, r) {
      if (t === _n) return e
      if (t === at) return r
      if (t === Ks) return zi(e)
      const n = $n(e),
        o = n[t]
      let i = o ? n[t]() : e[t]
      if (t === Mr || t === '__proto__') return i
      if (!o) {
        const a = Object.getOwnPropertyDescriptor(e, t)
        mi() &&
          (typeof i != 'function' || e.hasOwnProperty(t)) &&
          !(a && a.get) &&
          (i = Ln(n, t, i)())
      }
      return Ct(i) ? Ji(i) : i
    },
    set() {
      return !0
    },
    deleteProperty() {
      return !0
    },
    ownKeys: Jl,
    getOwnPropertyDescriptor: Ql,
  }
  function pt(e, t, r) {
    if (e[t] === r) return
    const n = e[t],
      o = e.length
    r === void 0 ? delete e[t] : (e[t] = r)
    let i = $n(e),
      a
    ;(a = Ln(i, t, n)) && a.$(() => r),
      Array.isArray(e) && e.length !== o && (a = Ln(i, 'length', o)) && a.$(e.length),
      (a = i._) && a.$()
  }
  function ji(e, t) {
    const r = Object.keys(t)
    for (let n = 0; n < r.length; n += 1) {
      const o = r[n]
      pt(e, o, t[o])
    }
  }
  function ql(e, t) {
    if ((typeof t == 'function' && (t = t(e)), (t = Dt(t)), Array.isArray(t))) {
      if (e === t) return
      let r = 0,
        n = t.length
      for (; r < n; r++) {
        const o = t[r]
        e[r] !== o && pt(e, r, o)
      }
      pt(e, 'length', n)
    } else ji(e, t)
  }
  function _t(e, t, r = []) {
    let n,
      o = e
    if (t.length > 1) {
      n = t.shift()
      const a = typeof n,
        s = Array.isArray(e)
      if (Array.isArray(n)) {
        for (let S = 0; S < n.length; S++) _t(e, [n[S]].concat(t), r)
        return
      } else if (s && a === 'function') {
        for (let S = 0; S < e.length; S++) n(e[S], S) && _t(e, [S].concat(t), r)
        return
      } else if (s && a === 'object') {
        const { from: S = 0, to: l = e.length - 1, by: E = 1 } = n
        for (let A = S; A <= l; A += E) _t(e, [A].concat(t), r)
        return
      } else if (t.length > 1) {
        _t(e[n], t, [n].concat(r))
        return
      }
      ;(o = e[n]), (r = [n].concat(r))
    }
    let i = t[0]
    ;(typeof i == 'function' && ((i = i(o, r)), i === o)) ||
      (n === void 0 && i == null) ||
      ((i = Dt(i)), n === void 0 || (Ct(o) && Ct(i) && !Array.isArray(i)) ? ji(o, i) : pt(e, n, i))
  }
  function jl(...[e, t]) {
    const r = Dt(e || {}),
      n = Array.isArray(r),
      o = Ji(r)
    function i(...a) {
      rr(() => {
        n && a.length === 1 ? ql(r, a[0]) : _t(r, a)
      })
    }
    return [o, i]
  }
  const br = new WeakMap(),
    ea = {
      get(e, t) {
        if (t === _n) return e
        const r = e[t]
        let n
        return Ct(r) ? br.get(r) || (br.set(r, (n = new Proxy(r, ea))), n) : r
      },
      set(e, t, r) {
        return pt(e, t, Dt(r)), !0
      },
      deleteProperty(e, t) {
        return pt(e, t, void 0), !0
      },
    }
  function fe(e) {
    return (t) => {
      if (Ct(t)) {
        let r
        ;(r = br.get(t)) || br.set(t, (r = new Proxy(t, ea))), e(r)
      }
      return t
    }
  }
  var mo = Object.prototype.toString,
    ta = function (t) {
      var r = mo.call(t),
        n = r === '[object Arguments]'
      return (
        n ||
          (n =
            r !== '[object Array]' &&
            t !== null &&
            typeof t == 'object' &&
            typeof t.length == 'number' &&
            t.length >= 0 &&
            mo.call(t.callee) === '[object Function]'),
        n
      )
    },
    ra
  if (!Object.keys) {
    var Er = Object.prototype.hasOwnProperty,
      vo = Object.prototype.toString,
      eS = ta,
      No = Object.prototype.propertyIsEnumerable,
      tS = !No.call({ toString: null }, 'toString'),
      rS = No.call(function () {}, 'prototype'),
      cr = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor',
      ],
      tn = function (e) {
        var t = e.constructor
        return t && t.prototype === e
      },
      nS = {
        $applicationCache: !0,
        $console: !0,
        $external: !0,
        $frame: !0,
        $frameElement: !0,
        $frames: !0,
        $innerHeight: !0,
        $innerWidth: !0,
        $onmozfullscreenchange: !0,
        $onmozfullscreenerror: !0,
        $outerHeight: !0,
        $outerWidth: !0,
        $pageXOffset: !0,
        $pageYOffset: !0,
        $parent: !0,
        $scrollLeft: !0,
        $scrollTop: !0,
        $scrollX: !0,
        $scrollY: !0,
        $self: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0,
        $window: !0,
      },
      oS = (function () {
        if (typeof window == 'undefined') return !1
        for (var e in window)
          try {
            if (
              !nS['$' + e] &&
              Er.call(window, e) &&
              window[e] !== null &&
              typeof window[e] == 'object'
            )
              try {
                tn(window[e])
              } catch (t) {
                return !0
              }
          } catch (t) {
            return !0
          }
        return !1
      })(),
      iS = function (e) {
        if (typeof window == 'undefined' || !oS) return tn(e)
        try {
          return tn(e)
        } catch (t) {
          return !1
        }
      }
    ra = function (t) {
      var r = t !== null && typeof t == 'object',
        n = vo.call(t) === '[object Function]',
        o = eS(t),
        i = r && vo.call(t) === '[object String]',
        a = []
      if (!r && !n && !o) throw new TypeError('Object.keys called on a non-object')
      var s = rS && n
      if (i && t.length > 0 && !Er.call(t, 0)) for (var S = 0; S < t.length; ++S) a.push(String(S))
      if (o && t.length > 0) for (var l = 0; l < t.length; ++l) a.push(String(l))
      else for (var E in t) !(s && E === 'prototype') && Er.call(t, E) && a.push(String(E))
      if (tS)
        for (var A = iS(t), c = 0; c < cr.length; ++c)
          !(A && cr[c] === 'constructor') && Er.call(t, cr[c]) && a.push(cr[c])
      return a
    }
  }
  var aS = ra,
    sS = Array.prototype.slice,
    lS = ta,
    go = Object.keys,
    vr = go
      ? function (t) {
          return go(t)
        }
      : aS,
    yo = Object.keys
  vr.shim = function () {
    if (Object.keys) {
      var t = (function () {
        var r = Object.keys(arguments)
        return r && r.length === arguments.length
      })(1, 2)
      t ||
        (Object.keys = function (n) {
          return lS(n) ? yo(sS.call(n)) : yo(n)
        })
    } else Object.keys = vr
    return Object.keys || vr
  }
  var SS = vr,
    ES = SS,
    cS = typeof Symbol == 'function' && typeof Symbol('foo') == 'symbol',
    uS = Object.prototype.toString,
    AS = Array.prototype.concat,
    kn = Object.defineProperty,
    dS = function (e) {
      return typeof e == 'function' && uS.call(e) === '[object Function]'
    },
    OS = function () {
      var e = {}
      try {
        kn(e, 'x', { enumerable: !1, value: e })
        for (var t in e) return !1
        return e.x === e
      } catch (r) {
        return !1
      }
    },
    na = kn && OS(),
    fS = function (e, t, r, n) {
      ;(t in e && (!dS(n) || !n())) ||
        (na ? kn(e, t, { configurable: !0, enumerable: !1, value: r, writable: !0 }) : (e[t] = r))
    },
    oa = function (e, t) {
      var r = arguments.length > 2 ? arguments[2] : {},
        n = ES(t)
      cS && (n = AS.call(n, Object.getOwnPropertySymbols(t)))
      for (var o = 0; o < n.length; o += 1) fS(e, n[o], t[n[o]], r[n[o]])
    }
  oa.supportsDescriptors = !!na
  var bt = oa,
    Yt = { exports: {} },
    RS = 'Function.prototype.bind called on incompatible ',
    rn = Array.prototype.slice,
    IS = Object.prototype.toString,
    TS = '[object Function]',
    hS = function (t) {
      var r = this
      if (typeof r != 'function' || IS.call(r) !== TS) throw new TypeError(RS + r)
      for (
        var n = rn.call(arguments, 1),
          o,
          i = function () {
            if (this instanceof o) {
              var E = r.apply(this, n.concat(rn.call(arguments)))
              return Object(E) === E ? E : this
            } else return r.apply(t, n.concat(rn.call(arguments)))
          },
          a = Math.max(0, r.length - n.length),
          s = [],
          S = 0;
        S < a;
        S++
      )
        s.push('$' + S)
      if (
        ((o = Function(
          'binder',
          'return function (' + s.join(',') + '){ return binder.apply(this,arguments); }',
        )(i)),
        r.prototype)
      ) {
        var l = function () {}
        ;(l.prototype = r.prototype), (o.prototype = new l()), (l.prototype = null)
      }
      return o
    },
    LS = hS,
    Vn = Function.prototype.bind || LS,
    ia = function () {
      if (typeof Symbol != 'function' || typeof Object.getOwnPropertySymbols != 'function')
        return !1
      if (typeof Symbol.iterator == 'symbol') return !0
      var t = {},
        r = Symbol('test'),
        n = Object(r)
      if (
        typeof r == 'string' ||
        Object.prototype.toString.call(r) !== '[object Symbol]' ||
        Object.prototype.toString.call(n) !== '[object Symbol]'
      )
        return !1
      var o = 42
      t[r] = o
      for (r in t) return !1
      if (
        (typeof Object.keys == 'function' && Object.keys(t).length !== 0) ||
        (typeof Object.getOwnPropertyNames == 'function' &&
          Object.getOwnPropertyNames(t).length !== 0)
      )
        return !1
      var i = Object.getOwnPropertySymbols(t)
      if (i.length !== 1 || i[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
        return !1
      if (typeof Object.getOwnPropertyDescriptor == 'function') {
        var a = Object.getOwnPropertyDescriptor(t, r)
        if (a.value !== o || a.enumerable !== !0) return !1
      }
      return !0
    },
    Co = typeof Symbol != 'undefined' && Symbol,
    mS = ia,
    aa = function () {
      return typeof Co != 'function' ||
        typeof Symbol != 'function' ||
        typeof Co('foo') != 'symbol' ||
        typeof Symbol('bar') != 'symbol'
        ? !1
        : mS()
    },
    vS = Vn,
    sa = vS.call(Function.call, Object.prototype.hasOwnProperty),
    k,
    jt = SyntaxError,
    la = Function,
    ht = TypeError,
    nn = function (e) {
      try {
        return la('"use strict"; return (' + e + ').constructor;')()
      } catch (t) {}
    },
    nt = Object.getOwnPropertyDescriptor
  if (nt)
    try {
      nt({}, '')
    } catch (e) {
      nt = null
    }
  var on = function () {
      throw new ht()
    },
    NS = nt
      ? (function () {
          try {
            return arguments.callee, on
          } catch (e) {
            try {
              return nt(arguments, 'callee').get
            } catch (t) {
              return on
            }
          }
        })()
      : on,
    dt = aa(),
    Qe =
      Object.getPrototypeOf ||
      function (e) {
        return e.__proto__
      },
    ft = {},
    gS = typeof Uint8Array == 'undefined' ? k : Qe(Uint8Array),
    Lt = {
      '%AggregateError%': typeof AggregateError == 'undefined' ? k : AggregateError,
      '%Array%': Array,
      '%ArrayBuffer%': typeof ArrayBuffer == 'undefined' ? k : ArrayBuffer,
      '%ArrayIteratorPrototype%': dt ? Qe([][Symbol.iterator]()) : k,
      '%AsyncFromSyncIteratorPrototype%': k,
      '%AsyncFunction%': ft,
      '%AsyncGenerator%': ft,
      '%AsyncGeneratorFunction%': ft,
      '%AsyncIteratorPrototype%': ft,
      '%Atomics%': typeof Atomics == 'undefined' ? k : Atomics,
      '%BigInt%': typeof BigInt == 'undefined' ? k : BigInt,
      '%Boolean%': Boolean,
      '%DataView%': typeof DataView == 'undefined' ? k : DataView,
      '%Date%': Date,
      '%decodeURI%': decodeURI,
      '%decodeURIComponent%': decodeURIComponent,
      '%encodeURI%': encodeURI,
      '%encodeURIComponent%': encodeURIComponent,
      '%Error%': Error,
      '%eval%': eval,
      '%EvalError%': EvalError,
      '%Float32Array%': typeof Float32Array == 'undefined' ? k : Float32Array,
      '%Float64Array%': typeof Float64Array == 'undefined' ? k : Float64Array,
      '%FinalizationRegistry%':
        typeof FinalizationRegistry == 'undefined' ? k : FinalizationRegistry,
      '%Function%': la,
      '%GeneratorFunction%': ft,
      '%Int8Array%': typeof Int8Array == 'undefined' ? k : Int8Array,
      '%Int16Array%': typeof Int16Array == 'undefined' ? k : Int16Array,
      '%Int32Array%': typeof Int32Array == 'undefined' ? k : Int32Array,
      '%isFinite%': isFinite,
      '%isNaN%': isNaN,
      '%IteratorPrototype%': dt ? Qe(Qe([][Symbol.iterator]())) : k,
      '%JSON%': typeof JSON == 'object' ? JSON : k,
      '%Map%': typeof Map == 'undefined' ? k : Map,
      '%MapIteratorPrototype%':
        typeof Map == 'undefined' || !dt ? k : Qe(new Map()[Symbol.iterator]()),
      '%Math%': Math,
      '%Number%': Number,
      '%Object%': Object,
      '%parseFloat%': parseFloat,
      '%parseInt%': parseInt,
      '%Promise%': typeof Promise == 'undefined' ? k : Promise,
      '%Proxy%': typeof Proxy == 'undefined' ? k : Proxy,
      '%RangeError%': RangeError,
      '%ReferenceError%': ReferenceError,
      '%Reflect%': typeof Reflect == 'undefined' ? k : Reflect,
      '%RegExp%': RegExp,
      '%Set%': typeof Set == 'undefined' ? k : Set,
      '%SetIteratorPrototype%':
        typeof Set == 'undefined' || !dt ? k : Qe(new Set()[Symbol.iterator]()),
      '%SharedArrayBuffer%': typeof SharedArrayBuffer == 'undefined' ? k : SharedArrayBuffer,
      '%String%': String,
      '%StringIteratorPrototype%': dt ? Qe(''[Symbol.iterator]()) : k,
      '%Symbol%': dt ? Symbol : k,
      '%SyntaxError%': jt,
      '%ThrowTypeError%': NS,
      '%TypedArray%': gS,
      '%TypeError%': ht,
      '%Uint8Array%': typeof Uint8Array == 'undefined' ? k : Uint8Array,
      '%Uint8ClampedArray%': typeof Uint8ClampedArray == 'undefined' ? k : Uint8ClampedArray,
      '%Uint16Array%': typeof Uint16Array == 'undefined' ? k : Uint16Array,
      '%Uint32Array%': typeof Uint32Array == 'undefined' ? k : Uint32Array,
      '%URIError%': URIError,
      '%WeakMap%': typeof WeakMap == 'undefined' ? k : WeakMap,
      '%WeakRef%': typeof WeakRef == 'undefined' ? k : WeakRef,
      '%WeakSet%': typeof WeakSet == 'undefined' ? k : WeakSet,
    },
    yS = function e(t) {
      var r
      if (t === '%AsyncFunction%') r = nn('async function () {}')
      else if (t === '%GeneratorFunction%') r = nn('function* () {}')
      else if (t === '%AsyncGeneratorFunction%') r = nn('async function* () {}')
      else if (t === '%AsyncGenerator%') {
        var n = e('%AsyncGeneratorFunction%')
        n && (r = n.prototype)
      } else if (t === '%AsyncIteratorPrototype%') {
        var o = e('%AsyncGenerator%')
        o && (r = Qe(o.prototype))
      }
      return (Lt[t] = r), r
    },
    Do = {
      '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
      '%ArrayPrototype%': ['Array', 'prototype'],
      '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
      '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
      '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
      '%ArrayProto_values%': ['Array', 'prototype', 'values'],
      '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
      '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
      '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
      '%BooleanPrototype%': ['Boolean', 'prototype'],
      '%DataViewPrototype%': ['DataView', 'prototype'],
      '%DatePrototype%': ['Date', 'prototype'],
      '%ErrorPrototype%': ['Error', 'prototype'],
      '%EvalErrorPrototype%': ['EvalError', 'prototype'],
      '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
      '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
      '%FunctionPrototype%': ['Function', 'prototype'],
      '%Generator%': ['GeneratorFunction', 'prototype'],
      '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
      '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
      '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
      '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
      '%JSONParse%': ['JSON', 'parse'],
      '%JSONStringify%': ['JSON', 'stringify'],
      '%MapPrototype%': ['Map', 'prototype'],
      '%NumberPrototype%': ['Number', 'prototype'],
      '%ObjectPrototype%': ['Object', 'prototype'],
      '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
      '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
      '%PromisePrototype%': ['Promise', 'prototype'],
      '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
      '%Promise_all%': ['Promise', 'all'],
      '%Promise_reject%': ['Promise', 'reject'],
      '%Promise_resolve%': ['Promise', 'resolve'],
      '%RangeErrorPrototype%': ['RangeError', 'prototype'],
      '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
      '%RegExpPrototype%': ['RegExp', 'prototype'],
      '%SetPrototype%': ['Set', 'prototype'],
      '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
      '%StringPrototype%': ['String', 'prototype'],
      '%SymbolPrototype%': ['Symbol', 'prototype'],
      '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
      '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
      '%TypeErrorPrototype%': ['TypeError', 'prototype'],
      '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
      '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
      '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
      '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
      '%URIErrorPrototype%': ['URIError', 'prototype'],
      '%WeakMapPrototype%': ['WeakMap', 'prototype'],
      '%WeakSetPrototype%': ['WeakSet', 'prototype'],
    },
    kr = Vn,
    Yr = sa,
    CS = kr.call(Function.call, Array.prototype.concat),
    DS = kr.call(Function.apply, Array.prototype.splice),
    po = kr.call(Function.call, String.prototype.replace),
    Br = kr.call(Function.call, String.prototype.slice),
    pS =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
    US = /\\(\\)?/g,
    PS = function (t) {
      var r = Br(t, 0, 1),
        n = Br(t, -1)
      if (r === '%' && n !== '%') throw new jt('invalid intrinsic syntax, expected closing `%`')
      if (n === '%' && r !== '%') throw new jt('invalid intrinsic syntax, expected opening `%`')
      var o = []
      return (
        po(t, pS, function (i, a, s, S) {
          o[o.length] = s ? po(S, US, '$1') : a || i
        }),
        o
      )
    },
    MS = function (t, r) {
      var n = t,
        o
      if ((Yr(Do, n) && ((o = Do[n]), (n = '%' + o[0] + '%')), Yr(Lt, n))) {
        var i = Lt[n]
        if ((i === ft && (i = yS(n)), typeof i == 'undefined' && !r))
          throw new ht('intrinsic ' + t + ' exists, but is not available. Please file an issue!')
        return { alias: o, name: n, value: i }
      }
      throw new jt('intrinsic ' + t + ' does not exist!')
    },
    me = function (t, r) {
      if (typeof t != 'string' || t.length === 0)
        throw new ht('intrinsic name must be a non-empty string')
      if (arguments.length > 1 && typeof r != 'boolean')
        throw new ht('"allowMissing" argument must be a boolean')
      var n = PS(t),
        o = n.length > 0 ? n[0] : '',
        i = MS('%' + o + '%', r),
        a = i.name,
        s = i.value,
        S = !1,
        l = i.alias
      l && ((o = l[0]), DS(n, CS([0, 1], l)))
      for (var E = 1, A = !0; E < n.length; E += 1) {
        var c = n[E],
          u = Br(c, 0, 1),
          T = Br(c, -1)
        if (
          (u === '"' || u === "'" || u === '`' || T === '"' || T === "'" || T === '`') &&
          u !== T
        )
          throw new jt('property names with quotes must have matching quotes')
        if (
          ((c === 'constructor' || !A) && (S = !0), (o += '.' + c), (a = '%' + o + '%'), Yr(Lt, a))
        )
          s = Lt[a]
        else if (s != null) {
          if (!(c in s)) {
            if (!r)
              throw new ht(
                'base intrinsic for ' + t + ' exists, but the property is not available.',
              )
            return
          }
          if (nt && E + 1 >= n.length) {
            var f = nt(s, c)
            ;(A = !!f), A && 'get' in f && !('originalValue' in f.get) ? (s = f.get) : (s = s[c])
          } else (A = Yr(s, c)), (s = s[c])
          A && !S && (Lt[a] = s)
        }
      }
      return s
    }
  ;(function (e) {
    var t = Vn,
      r = me,
      n = r('%Function.prototype.apply%'),
      o = r('%Function.prototype.call%'),
      i = r('%Reflect.apply%', !0) || t.call(o, n),
      a = r('%Object.getOwnPropertyDescriptor%', !0),
      s = r('%Object.defineProperty%', !0),
      S = r('%Math.max%')
    if (s)
      try {
        s({}, 'a', { value: 1 })
      } catch (E) {
        s = null
      }
    e.exports = function (A) {
      var c = i(t, o, arguments)
      if (a && s) {
        var u = a(c, 'length')
        u.configurable && s(c, 'length', { value: 1 + S(0, A.length - (arguments.length - 1)) })
      }
      return c
    }
    var l = function () {
      return i(t, n, arguments)
    }
    s ? s(e.exports, 'apply', { value: l }) : (e.exports.apply = l)
  })(Yt)
  var Sa = me,
    Ea = Yt.exports,
    bS = Ea(Sa('String.prototype.indexOf')),
    lt = function (t, r) {
      var n = Sa(t, !!r)
      return typeof n == 'function' && bS(t, '.prototype.') > -1 ? Ea(n) : n
    },
    YS = me,
    BS = YS('%TypeError%'),
    wS = function (t, r) {
      if (t == null) throw new BS(r || 'Cannot call method on ' + t)
      return t
    },
    Vr = wS,
    HS = me,
    ca = HS('%Array%'),
    GS = !ca.isArray && lt('Object.prototype.toString'),
    KS =
      ca.isArray ||
      function (t) {
        return GS(t) === '[object Array]'
      },
    ua = me,
    FS = lt,
    xS = ua('%TypeError%'),
    WS = KS,
    _S = ua('%Reflect.apply%', !0) || FS('%Function.prototype.apply%'),
    $S = function (t, r) {
      var n = arguments.length > 2 ? arguments[2] : []
      if (!WS(n))
        throw new xS('Assertion failed: optional `argumentsList`, if provided, must be a List')
      return _S(t, r, n)
    },
    kS = {},
    VS = Object.freeze(
      Object.defineProperty({ __proto__: null, default: kS }, Symbol.toStringTag, {
        value: 'Module',
      }),
    ),
    ZS = Vl(VS),
    Zn = typeof Map == 'function' && Map.prototype,
    an =
      Object.getOwnPropertyDescriptor && Zn
        ? Object.getOwnPropertyDescriptor(Map.prototype, 'size')
        : null,
    wr = Zn && an && typeof an.get == 'function' ? an.get : null,
    XS = Zn && Map.prototype.forEach,
    Xn = typeof Set == 'function' && Set.prototype,
    sn =
      Object.getOwnPropertyDescriptor && Xn
        ? Object.getOwnPropertyDescriptor(Set.prototype, 'size')
        : null,
    Hr = Xn && sn && typeof sn.get == 'function' ? sn.get : null,
    QS = Xn && Set.prototype.forEach,
    JS = typeof WeakMap == 'function' && WeakMap.prototype,
    Xt = JS ? WeakMap.prototype.has : null,
    zS = typeof WeakSet == 'function' && WeakSet.prototype,
    Qt = zS ? WeakSet.prototype.has : null,
    qS = typeof WeakRef == 'function' && WeakRef.prototype,
    Uo = qS ? WeakRef.prototype.deref : null,
    jS = Boolean.prototype.valueOf,
    eE = Object.prototype.toString,
    tE = Function.prototype.toString,
    rE = String.prototype.match,
    Qn = String.prototype.slice,
    ze = String.prototype.replace,
    nE = String.prototype.toUpperCase,
    Po = String.prototype.toLowerCase,
    Aa = RegExp.prototype.test,
    Mo = Array.prototype.concat,
    Ke = Array.prototype.join,
    oE = Array.prototype.slice,
    bo = Math.floor,
    mn = typeof BigInt == 'function' ? BigInt.prototype.valueOf : null,
    ln = Object.getOwnPropertySymbols,
    vn =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? Symbol.prototype.toString
        : null,
    Ut = typeof Symbol == 'function' && typeof Symbol.iterator == 'object',
    Le =
      typeof Symbol == 'function' &&
      Symbol.toStringTag &&
      (typeof Symbol.toStringTag === Ut ? 'object' : 'symbol')
        ? Symbol.toStringTag
        : null,
    da = Object.prototype.propertyIsEnumerable,
    Yo =
      (typeof Reflect == 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) ||
      ([].__proto__ === Array.prototype
        ? function (e) {
            return e.__proto__
          }
        : null)
  function Bo(e, t) {
    if (e === 1 / 0 || e === -1 / 0 || e !== e || (e && e > -1e3 && e < 1e3) || Aa.call(/e/, t))
      return t
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g
    if (typeof e == 'number') {
      var n = e < 0 ? -bo(-e) : bo(e)
      if (n !== e) {
        var o = String(n),
          i = Qn.call(t, o.length + 1)
        return ze.call(o, r, '$&_') + '.' + ze.call(ze.call(i, /([0-9]{3})/g, '$&_'), /_$/, '')
      }
    }
    return ze.call(t, r, '$&_')
  }
  var Sn = ZS.custom,
    En = Sn && fa(Sn) ? Sn : null,
    iE = function e(t, r, n, o) {
      var i = r || {}
      if (Je(i, 'quoteStyle') && i.quoteStyle !== 'single' && i.quoteStyle !== 'double')
        throw new TypeError('option "quoteStyle" must be "single" or "double"')
      if (
        Je(i, 'maxStringLength') &&
        (typeof i.maxStringLength == 'number'
          ? i.maxStringLength < 0 && i.maxStringLength !== 1 / 0
          : i.maxStringLength !== null)
      )
        throw new TypeError(
          'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
        )
      var a = Je(i, 'customInspect') ? i.customInspect : !0
      if (typeof a != 'boolean' && a !== 'symbol')
        throw new TypeError(
          'option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`',
        )
      if (
        Je(i, 'indent') &&
        i.indent !== null &&
        i.indent !== '	' &&
        !(parseInt(i.indent, 10) === i.indent && i.indent > 0)
      )
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`')
      if (Je(i, 'numericSeparator') && typeof i.numericSeparator != 'boolean')
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`')
      var s = i.numericSeparator
      if (typeof t == 'undefined') return 'undefined'
      if (t === null) return 'null'
      if (typeof t == 'boolean') return t ? 'true' : 'false'
      if (typeof t == 'string') return Ia(t, i)
      if (typeof t == 'number') {
        if (t === 0) return 1 / 0 / t > 0 ? '0' : '-0'
        var S = String(t)
        return s ? Bo(t, S) : S
      }
      if (typeof t == 'bigint') {
        var l = String(t) + 'n'
        return s ? Bo(t, l) : l
      }
      var E = typeof i.depth == 'undefined' ? 5 : i.depth
      if ((typeof n == 'undefined' && (n = 0), n >= E && E > 0 && typeof t == 'object'))
        return Nn(t) ? '[Array]' : '[Object]'
      var A = NE(i, n)
      if (typeof o == 'undefined') o = []
      else if (Ra(o, t) >= 0) return '[Circular]'
      function c(J, j, Y) {
        if ((j && ((o = oE.call(o)), o.push(j)), Y)) {
          var Se = { depth: i.depth }
          return Je(i, 'quoteStyle') && (Se.quoteStyle = i.quoteStyle), e(J, Se, n + 1, o)
        }
        return e(J, i, n + 1, o)
      }
      if (typeof t == 'function') {
        var u = OE(t),
          T = ur(t, c)
        return (
          '[Function' +
          (u ? ': ' + u : ' (anonymous)') +
          ']' +
          (T.length > 0 ? ' { ' + Ke.call(T, ', ') + ' }' : '')
        )
      }
      if (fa(t)) {
        var f = Ut ? ze.call(String(t), /^(Symbol\(.*\))_[^)]*$/, '$1') : vn.call(t)
        return typeof t == 'object' && !Ut ? Kt(f) : f
      }
      if (LE(t)) {
        for (
          var I = '<' + Po.call(String(t.nodeName)), R = t.attributes || [], m = 0;
          m < R.length;
          m++
        )
          I += ' ' + R[m].name + '=' + Oa(aE(R[m].value), 'double', i)
        return (
          (I += '>'),
          t.childNodes && t.childNodes.length && (I += '...'),
          (I += '</' + Po.call(String(t.nodeName)) + '>'),
          I
        )
      }
      if (Nn(t)) {
        if (t.length === 0) return '[]'
        var N = ur(t, c)
        return A && !vE(N) ? '[' + gn(N, A) + ']' : '[ ' + Ke.call(N, ', ') + ' ]'
      }
      if (SE(t)) {
        var v = ur(t, c)
        return 'cause' in t && !da.call(t, 'cause')
          ? '{ [' + String(t) + '] ' + Ke.call(Mo.call('[cause]: ' + c(t.cause), v), ', ') + ' }'
          : v.length === 0
          ? '[' + String(t) + ']'
          : '{ [' + String(t) + '] ' + Ke.call(v, ', ') + ' }'
      }
      if (typeof t == 'object' && a) {
        if (En && typeof t[En] == 'function') return t[En]()
        if (a !== 'symbol' && typeof t.inspect == 'function') return t.inspect()
      }
      if (fE(t)) {
        var g = []
        return (
          XS.call(t, function (J, j) {
            g.push(c(j, t, !0) + ' => ' + c(J, t))
          }),
          wo('Map', wr.call(t), g, A)
        )
      }
      if (TE(t)) {
        var O = []
        return (
          QS.call(t, function (J) {
            O.push(c(J, t))
          }),
          wo('Set', Hr.call(t), O, A)
        )
      }
      if (RE(t)) return cn('WeakMap')
      if (hE(t)) return cn('WeakSet')
      if (IE(t)) return cn('WeakRef')
      if (cE(t)) return Kt(c(Number(t)))
      if (AE(t)) return Kt(c(mn.call(t)))
      if (uE(t)) return Kt(jS.call(t))
      if (EE(t)) return Kt(c(String(t)))
      if (!sE(t) && !lE(t)) {
        var D = ur(t, c),
          h = Yo ? Yo(t) === Object.prototype : t instanceof Object || t.constructor === Object,
          L = t instanceof Object ? '' : 'null prototype',
          M = !h && Le && Object(t) === t && Le in t ? Qn.call(je(t), 8, -1) : L ? 'Object' : '',
          F =
            h || typeof t.constructor != 'function'
              ? ''
              : t.constructor.name
              ? t.constructor.name + ' '
              : '',
          H = F + (M || L ? '[' + Ke.call(Mo.call([], M || [], L || []), ': ') + '] ' : '')
        return D.length === 0
          ? H + '{}'
          : A
          ? H + '{' + gn(D, A) + '}'
          : H + '{ ' + Ke.call(D, ', ') + ' }'
      }
      return String(t)
    }
  function Oa(e, t, r) {
    var n = (r.quoteStyle || t) === 'double' ? '"' : "'"
    return n + e + n
  }
  function aE(e) {
    return ze.call(String(e), /"/g, '&quot;')
  }
  function Nn(e) {
    return je(e) === '[object Array]' && (!Le || !(typeof e == 'object' && Le in e))
  }
  function sE(e) {
    return je(e) === '[object Date]' && (!Le || !(typeof e == 'object' && Le in e))
  }
  function lE(e) {
    return je(e) === '[object RegExp]' && (!Le || !(typeof e == 'object' && Le in e))
  }
  function SE(e) {
    return je(e) === '[object Error]' && (!Le || !(typeof e == 'object' && Le in e))
  }
  function EE(e) {
    return je(e) === '[object String]' && (!Le || !(typeof e == 'object' && Le in e))
  }
  function cE(e) {
    return je(e) === '[object Number]' && (!Le || !(typeof e == 'object' && Le in e))
  }
  function uE(e) {
    return je(e) === '[object Boolean]' && (!Le || !(typeof e == 'object' && Le in e))
  }
  function fa(e) {
    if (Ut) return e && typeof e == 'object' && e instanceof Symbol
    if (typeof e == 'symbol') return !0
    if (!e || typeof e != 'object' || !vn) return !1
    try {
      return vn.call(e), !0
    } catch (t) {}
    return !1
  }
  function AE(e) {
    if (!e || typeof e != 'object' || !mn) return !1
    try {
      return mn.call(e), !0
    } catch (t) {}
    return !1
  }
  var dE =
    Object.prototype.hasOwnProperty ||
    function (e) {
      return e in this
    }
  function Je(e, t) {
    return dE.call(e, t)
  }
  function je(e) {
    return eE.call(e)
  }
  function OE(e) {
    if (e.name) return e.name
    var t = rE.call(tE.call(e), /^function\s*([\w$]+)/)
    return t ? t[1] : null
  }
  function Ra(e, t) {
    if (e.indexOf) return e.indexOf(t)
    for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r
    return -1
  }
  function fE(e) {
    if (!wr || !e || typeof e != 'object') return !1
    try {
      wr.call(e)
      try {
        Hr.call(e)
      } catch (t) {
        return !0
      }
      return e instanceof Map
    } catch (t) {}
    return !1
  }
  function RE(e) {
    if (!Xt || !e || typeof e != 'object') return !1
    try {
      Xt.call(e, Xt)
      try {
        Qt.call(e, Qt)
      } catch (t) {
        return !0
      }
      return e instanceof WeakMap
    } catch (t) {}
    return !1
  }
  function IE(e) {
    if (!Uo || !e || typeof e != 'object') return !1
    try {
      return Uo.call(e), !0
    } catch (t) {}
    return !1
  }
  function TE(e) {
    if (!Hr || !e || typeof e != 'object') return !1
    try {
      Hr.call(e)
      try {
        wr.call(e)
      } catch (t) {
        return !0
      }
      return e instanceof Set
    } catch (t) {}
    return !1
  }
  function hE(e) {
    if (!Qt || !e || typeof e != 'object') return !1
    try {
      Qt.call(e, Qt)
      try {
        Xt.call(e, Xt)
      } catch (t) {
        return !0
      }
      return e instanceof WeakSet
    } catch (t) {}
    return !1
  }
  function LE(e) {
    return !e || typeof e != 'object'
      ? !1
      : typeof HTMLElement != 'undefined' && e instanceof HTMLElement
      ? !0
      : typeof e.nodeName == 'string' && typeof e.getAttribute == 'function'
  }
  function Ia(e, t) {
    if (e.length > t.maxStringLength) {
      var r = e.length - t.maxStringLength,
        n = '... ' + r + ' more character' + (r > 1 ? 's' : '')
      return Ia(Qn.call(e, 0, t.maxStringLength), t) + n
    }
    var o = ze.call(ze.call(e, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, mE)
    return Oa(o, 'single', t)
  }
  function mE(e) {
    var t = e.charCodeAt(0),
      r = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[t]
    return r ? '\\' + r : '\\x' + (t < 16 ? '0' : '') + nE.call(t.toString(16))
  }
  function Kt(e) {
    return 'Object(' + e + ')'
  }
  function cn(e) {
    return e + ' { ? }'
  }
  function wo(e, t, r, n) {
    var o = n ? gn(r, n) : Ke.call(r, ', ')
    return e + ' (' + t + ') {' + o + '}'
  }
  function vE(e) {
    for (var t = 0; t < e.length; t++)
      if (
        Ra(
          e[t],
          `
`,
        ) >= 0
      )
        return !1
    return !0
  }
  function NE(e, t) {
    var r
    if (e.indent === '	') r = '	'
    else if (typeof e.indent == 'number' && e.indent > 0) r = Ke.call(Array(e.indent + 1), ' ')
    else return null
    return { base: r, prev: Ke.call(Array(t + 1), r) }
  }
  function gn(e, t) {
    if (e.length === 0) return ''
    var r =
      `
` +
      t.prev +
      t.base
    return (
      r +
      Ke.call(e, ',' + r) +
      `
` +
      t.prev
    )
  }
  function ur(e, t) {
    var r = Nn(e),
      n = []
    if (r) {
      n.length = e.length
      for (var o = 0; o < e.length; o++) n[o] = Je(e, o) ? t(e[o], e) : ''
    }
    var i = typeof ln == 'function' ? ln(e) : [],
      a
    if (Ut) {
      a = {}
      for (var s = 0; s < i.length; s++) a['$' + i[s]] = i[s]
    }
    for (var S in e)
      !Je(e, S) ||
        (r && String(Number(S)) === S && S < e.length) ||
        (Ut && a['$' + S] instanceof Symbol) ||
        (Aa.call(/[^\w$]/, S)
          ? n.push(t(S, e) + ': ' + t(e[S], e))
          : n.push(S + ': ' + t(e[S], e)))
    if (typeof ln == 'function')
      for (var l = 0; l < i.length; l++)
        da.call(e, i[l]) && n.push('[' + t(i[l]) + ']: ' + t(e[i[l]], e))
    return n
  }
  var Ta = function (t) {
      return typeof t == 'string' || typeof t == 'symbol'
    },
    gE = function (t) {
      if (t === null) return 'Null'
      if (typeof t == 'undefined') return 'Undefined'
      if (typeof t == 'function' || typeof t == 'object') return 'Object'
      if (typeof t == 'number') return 'Number'
      if (typeof t == 'boolean') return 'Boolean'
      if (typeof t == 'string') return 'String'
    },
    yE = gE,
    Jn = function (t) {
      return typeof t == 'symbol' ? 'Symbol' : typeof t == 'bigint' ? 'BigInt' : yE(t)
    },
    CE = me,
    Ho = CE('%TypeError%'),
    DE = iE,
    pE = Ta,
    UE = Jn,
    ha = function (t, r) {
      if (UE(t) !== 'Object') throw new Ho('Assertion failed: Type(O) is not Object')
      if (!pE(r)) throw new Ho('Assertion failed: IsPropertyKey(P) is not true, got ' + DE(r))
      return t[r]
    },
    PE = me,
    Go = PE('%TypeError%'),
    ME = Ta,
    bE = Jn,
    YE = function (t, r) {
      if (bE(t) !== 'Object') throw new Go('Assertion failed: `O` must be an Object')
      if (!ME(r)) throw new Go('Assertion failed: `P` must be a Property Key')
      return r in t
    },
    La = Function.prototype.toString,
    Rt = typeof Reflect == 'object' && Reflect !== null && Reflect.apply,
    yn,
    Nr
  if (typeof Rt == 'function' && typeof Object.defineProperty == 'function')
    try {
      ;(yn = Object.defineProperty({}, 'length', {
        get: function () {
          throw Nr
        },
      })),
        (Nr = {}),
        Rt(
          function () {
            throw 42
          },
          null,
          yn,
        )
    } catch (e) {
      e !== Nr && (Rt = null)
    }
  else Rt = null
  var BE = /^\s*class\b/,
    Cn = function (t) {
      try {
        var r = La.call(t)
        return BE.test(r)
      } catch (n) {
        return !1
      }
    },
    wE = function (t) {
      try {
        return Cn(t) ? !1 : (La.call(t), !0)
      } catch (r) {
        return !1
      }
    },
    HE = Object.prototype.toString,
    GE = '[object Function]',
    KE = '[object GeneratorFunction]',
    FE = typeof Symbol == 'function' && !!Symbol.toStringTag,
    Ko =
      typeof document == 'object' && typeof document.all == 'undefined' && document.all !== void 0
        ? document.all
        : {},
    zn = Rt
      ? function (t) {
          if (t === Ko) return !0
          if (!t || (typeof t != 'function' && typeof t != 'object')) return !1
          if (typeof t == 'function' && !t.prototype) return !0
          try {
            Rt(t, null, yn)
          } catch (r) {
            if (r !== Nr) return !1
          }
          return !Cn(t)
        }
      : function (t) {
          if (t === Ko) return !0
          if (!t || (typeof t != 'function' && typeof t != 'object')) return !1
          if (typeof t == 'function' && !t.prototype) return !0
          if (FE) return wE(t)
          if (Cn(t)) return !1
          var r = HE.call(t)
          return r === GE || r === KE
        },
    xE = zn,
    ma = me,
    WE = ma('%Math%'),
    _E = ma('%Number%'),
    $E = _E.MAX_SAFE_INTEGER || WE.pow(2, 53) - 1,
    kE = me,
    VE = kE('%Math.abs%'),
    ZE = function (t) {
      return VE(t)
    },
    XE = Math.floor,
    QE = function (t) {
      return XE(t)
    },
    va = function (t) {
      return t === null || (typeof t != 'function' && typeof t != 'object')
    },
    JE = Object.prototype.toString,
    Na = va,
    zE = zn,
    Fo = {
      '[[DefaultValue]]': function (e) {
        var t
        if (
          (arguments.length > 1
            ? (t = arguments[1])
            : (t = JE.call(e) === '[object Date]' ? String : Number),
          t === String || t === Number)
        ) {
          var r = t === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'],
            n,
            o
          for (o = 0; o < r.length; ++o) if (zE(e[r[o]]) && ((n = e[r[o]]()), Na(n))) return n
          throw new TypeError('No default value')
        }
        throw new TypeError('invalid [[DefaultValue]] hint supplied')
      },
    },
    qE = function (t) {
      return Na(t)
        ? t
        : arguments.length > 1
        ? Fo['[[DefaultValue]]'](t, arguments[1])
        : Fo['[[DefaultValue]]'](t)
    },
    jE = qE,
    ec = jE,
    tc = function (t) {
      var r = ec(t, Number)
      if (typeof r != 'string') return +r
      var n = r.replace(
        /^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g,
        '',
      )
      return /^0[ob]|^[+-]0x/.test(n) ? NaN : +n
    },
    rc =
      Number.isNaN ||
      function (t) {
        return t !== t
      },
    nc =
      Number.isNaN ||
      function (e) {
        return e !== e
      },
    oc =
      Number.isFinite ||
      function (e) {
        return typeof e == 'number' && !nc(e) && e !== 1 / 0 && e !== -1 / 0
      },
    ic = function (t) {
      return t >= 0 ? 1 : -1
    },
    ac = ZE,
    sc = QE,
    lc = tc,
    Sc = rc,
    Ec = oc,
    cc = ic,
    uc = function (t) {
      var r = lc(t)
      return Sc(r) ? 0 : r === 0 || !Ec(r) ? r : cc(r) * sc(ac(r))
    },
    Ac = me,
    dc = Ac('RegExp.prototype.test'),
    Oc = Yt.exports,
    fc = function (t) {
      return Oc(dc, t)
    },
    Rc = function (t) {
      return t === null || (typeof t != 'function' && typeof t != 'object')
    },
    Ic = ia,
    ga = function () {
      return Ic() && !!Symbol.toStringTag
    },
    Tc = Date.prototype.getDay,
    hc = function (t) {
      try {
        return Tc.call(t), !0
      } catch (r) {
        return !1
      }
    },
    Lc = Object.prototype.toString,
    mc = '[object Date]',
    vc = ga(),
    Nc = function (t) {
      return typeof t != 'object' || t === null ? !1 : vc ? hc(t) : Lc.call(t) === mc
    },
    Dn = { exports: {} },
    gc = Object.prototype.toString,
    yc = aa()
  if (yc) {
    var Cc = Symbol.prototype.toString,
      Dc = /^Symbol\(.*\)$/,
      pc = function (t) {
        return typeof t.valueOf() != 'symbol' ? !1 : Dc.test(Cc.call(t))
      }
    Dn.exports = function (t) {
      if (typeof t == 'symbol') return !0
      if (gc.call(t) !== '[object Symbol]') return !1
      try {
        return pc(t)
      } catch (r) {
        return !1
      }
    }
  } else
    Dn.exports = function (t) {
      return !1
    }
  var Uc = typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol',
    pn = va,
    ya = zn,
    Pc = Nc,
    xo = Dn.exports,
    Mc = function (t, r) {
      if (typeof t == 'undefined' || t === null) throw new TypeError('Cannot call method on ' + t)
      if (typeof r != 'string' || (r !== 'number' && r !== 'string'))
        throw new TypeError('hint must be "string" or "number"')
      var n = r === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'],
        o,
        i,
        a
      for (a = 0; a < n.length; ++a)
        if (((o = t[n[a]]), ya(o) && ((i = o.call(t)), pn(i)))) return i
      throw new TypeError('No default value')
    },
    bc = function (t, r) {
      var n = t[r]
      if (n !== null && typeof n != 'undefined') {
        if (!ya(n))
          throw new TypeError(
            n + ' returned for property ' + r + ' of object ' + t + ' is not a function',
          )
        return n
      }
    },
    Yc = function (t) {
      if (pn(t)) return t
      var r = 'default'
      arguments.length > 1 &&
        (arguments[1] === String ? (r = 'string') : arguments[1] === Number && (r = 'number'))
      var n
      if (
        (Uc &&
          (Symbol.toPrimitive
            ? (n = bc(t, Symbol.toPrimitive))
            : xo(t) && (n = Symbol.prototype.valueOf)),
        typeof n != 'undefined')
      ) {
        var o = n.call(t, r)
        if (pn(o)) return o
        throw new TypeError('unable to convert exotic object to primitive')
      }
      return (
        r === 'default' && (Pc(t) || xo(t)) && (r = 'string'),
        Mc(t, r === 'default' ? 'number' : r)
      )
    },
    Wo = Yc,
    Bc = function (t) {
      return arguments.length > 1 ? Wo(t, arguments[1]) : Wo(t)
    },
    Zr = me,
    _o = Zr('%TypeError%'),
    $o = Zr('%Number%'),
    wc = Zr('%RegExp%'),
    ko = Zr('%parseInt%'),
    Ca = lt,
    Xr = fc,
    Hc = Rc,
    Vo = Ca('String.prototype.slice'),
    Gc = Xr(/^0b[01]+$/i),
    Kc = Xr(/^0o[0-7]+$/i),
    Fc = Xr(/^[-+]0x[0-9a-f]+$/i),
    xc = ['\x85', '\u200B', '\uFFFE'].join(''),
    Wc = new wc('[' + xc + ']', 'g'),
    _c = Xr(Wc),
    Zo = [
      `	
\v\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003`,
      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
      '\u2029\uFEFF',
    ].join(''),
    $c = new RegExp('(^[' + Zo + ']+)|([' + Zo + ']+$)', 'g'),
    kc = Ca('String.prototype.replace'),
    Vc = function (e) {
      return kc(e, $c, '')
    },
    Zc = Bc,
    Xc = function e(t) {
      var r = Hc(t) ? t : Zc(t, $o)
      if (typeof r == 'symbol') throw new _o('Cannot convert a Symbol value to a number')
      if (typeof r == 'bigint')
        throw new _o("Conversion from 'BigInt' to 'number' is not allowed.")
      if (typeof r == 'string') {
        if (Gc(r)) return e(ko(Vo(r, 2), 2))
        if (Kc(r)) return e(ko(Vo(r, 2), 8))
        if (_c(r) || Fc(r)) return NaN
        var n = Vc(r)
        if (n !== r) return e(n)
      }
      return $o(r)
    },
    Qc = uc,
    Jc = Xc,
    zc = function (t) {
      var r = Jc(t)
      return r !== 0 && (r = Qc(r)), r === 0 ? 0 : r
    },
    Xo = $E,
    qc = zc,
    jc = function (t) {
      var r = qc(t)
      return r <= 0 ? 0 : r > Xo ? Xo : r
    },
    eu = me,
    tu = eu('%TypeError%'),
    ru = ha,
    nu = jc,
    ou = Jn,
    iu = function (t) {
      if (ou(t) !== 'Object') throw new tu('Assertion failed: `obj` must be an Object')
      return nu(ru(t, 'length'))
    },
    au = me,
    su = au('%Object%'),
    lu = Vr,
    Su = function (t) {
      return lu(t), su(t)
    },
    Da = me,
    Eu = Da('%String%'),
    cu = Da('%TypeError%'),
    pa = function (t) {
      if (typeof t == 'symbol') throw new cu('Cannot convert a Symbol value to a string')
      return Eu(t)
    },
    uu = String.prototype.valueOf,
    Au = function (t) {
      try {
        return uu.call(t), !0
      } catch (r) {
        return !1
      }
    },
    du = Object.prototype.toString,
    Ou = '[object String]',
    fu = ga(),
    Ru = function (t) {
      return typeof t == 'string' ? !0 : typeof t != 'object' ? !1 : fu ? Au(t) : du.call(t) === Ou
    },
    Iu = me,
    Tu = lt,
    hu = Iu('%TypeError%'),
    Lu = $S,
    mu = ha,
    vu = YE,
    Nu = xE,
    gu = iu,
    yu = Su,
    Cu = pa,
    Du = Ru,
    pu = Tu('String.prototype.split'),
    Qo = Object('a'),
    Uu = Qo[0] !== 'a' || !(0 in Qo),
    Ua = function (t) {
      var r = yu(this),
        n = Uu && Du(this) ? pu(this, '') : r,
        o = gu(n)
      if (!Nu(t)) throw new hu('Array.prototype.forEach callback must be a function')
      var i
      arguments.length > 1 && (i = arguments[1])
      for (var a = 0; a < o; ) {
        var s = Cu(a),
          S = vu(n, s)
        if (S) {
          var l = mu(n, s)
          Lu(t, i, [l, a, n])
        }
        a += 1
      }
    },
    Pu = function (t) {
      var r = !0,
        n = !0,
        o = !1
      if (typeof t == 'function') {
        try {
          t.call('f', function (i, a, s) {
            typeof s != 'object' && (r = !1)
          }),
            t.call(
              [null],
              function () {
                'use strict'
                n = typeof this == 'string'
              },
              'x',
            )
        } catch (i) {
          o = !0
        }
        return !o && r && n
      }
      return !1
    },
    Mu = Pu,
    bu = Ua,
    Pa = function () {
      var t = Array.prototype.forEach
      return Mu(t) ? t : bu
    },
    Yu = bt,
    Bu = Pa,
    wu = function () {
      var t = Bu()
      return (
        Yu(
          Array.prototype,
          { forEach: t },
          {
            forEach: function () {
              return Array.prototype.forEach !== t
            },
          },
        ),
        t
      )
    },
    Hu = bt,
    Gu = Yt.exports,
    Ku = lt,
    Fu = Vr,
    xu = Ua,
    Ma = Pa,
    Wu = Ma(),
    _u = wu,
    $u = Ku('Array.prototype.slice'),
    ku = Gu.apply(Wu),
    ba = function (t, r) {
      return Fu(t), ku(t, $u(arguments, 1))
    }
  Hu(ba, { getPolyfill: Ma, implementation: xu, shim: _u })
  var Vu = ba,
    Zu = Vr,
    Ya = lt,
    Xu = Ya('Object.prototype.propertyIsEnumerable'),
    Qu = Ya('Array.prototype.push'),
    Ba = function (t) {
      var r = Zu(t),
        n = []
      for (var o in r) Xu(r, o) && Qu(n, [o, r[o]])
      return n
    },
    Ju = Ba,
    wa = function () {
      return typeof Object.entries == 'function' ? Object.entries : Ju
    },
    zu = wa,
    qu = bt,
    ju = function () {
      var t = zu()
      return (
        qu(
          Object,
          { entries: t },
          {
            entries: function () {
              return Object.entries !== t
            },
          },
        ),
        t
      )
    },
    eA = bt,
    tA = Yt.exports,
    rA = Ba,
    Ha = wa,
    nA = ju,
    Ga = tA(Ha(), Object)
  eA(Ga, { getPolyfill: Ha, implementation: rA, shim: nA })
  var oA = Ga,
    iA = Vr,
    aA = pa,
    sA = lt,
    Jo = sA('String.prototype.replace'),
    lA =
      /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/,
    SA =
      /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/,
    Ka = function () {
      var t = aA(iA(this))
      return Jo(Jo(t, lA, ''), SA, '')
    },
    EA = Ka,
    zo = '\u200B',
    Fa = function () {
      return String.prototype.trim && zo.trim() === zo ? String.prototype.trim : EA
    },
    cA = bt,
    uA = Fa,
    AA = function () {
      var t = uA()
      return (
        cA(
          String.prototype,
          { trim: t },
          {
            trim: function () {
              return String.prototype.trim !== t
            },
          },
        ),
        t
      )
    },
    dA = Yt.exports,
    OA = bt,
    fA = Ka,
    xa = Fa,
    RA = AA,
    Wa = dA(xa())
  OA(Wa, { getPolyfill: xa, implementation: fA, shim: RA })
  var IA = Wa,
    Gr = Vu,
    qn = oA,
    _a = sa,
    TA = IA,
    hA = function (t) {},
    LA = String.prototype.replace,
    $a = String.prototype.split,
    gr = '||||',
    un = function (e) {
      var t = e % 100,
        r = t % 10
      return t !== 11 && r === 1 ? 0 : 2 <= r && r <= 4 && !(t >= 12 && t <= 14) ? 1 : 2
    },
    ka = {
      pluralTypes: {
        arabic: function (e) {
          if (e < 3) return e
          var t = e % 100
          return t >= 3 && t <= 10 ? 3 : t >= 11 ? 4 : 5
        },
        bosnian_serbian: un,
        chinese: function () {
          return 0
        },
        croatian: un,
        french: function (e) {
          return e >= 2 ? 1 : 0
        },
        german: function (e) {
          return e !== 1 ? 1 : 0
        },
        russian: un,
        lithuanian: function (e) {
          return e % 10 === 1 && e % 100 !== 11
            ? 0
            : e % 10 >= 2 && e % 10 <= 9 && (e % 100 < 11 || e % 100 > 19)
            ? 1
            : 2
        },
        czech: function (e) {
          return e === 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2
        },
        polish: function (e) {
          if (e === 1) return 0
          var t = e % 10
          return 2 <= t && t <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
        },
        icelandic: function (e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0
        },
        slovenian: function (e) {
          var t = e % 100
          return t === 1 ? 0 : t === 2 ? 1 : t === 3 || t === 4 ? 2 : 3
        },
      },
      pluralTypeToLanguages: {
        arabic: ['ar'],
        bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
        chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],
        croatian: ['hr', 'hr-HR'],
        german: [
          'fa',
          'da',
          'de',
          'en',
          'es',
          'fi',
          'el',
          'he',
          'hi-IN',
          'hu',
          'hu-HU',
          'it',
          'nl',
          'no',
          'pt',
          'sv',
          'tr',
        ],
        french: ['fr', 'tl', 'pt-br'],
        russian: ['ru', 'ru-RU'],
        lithuanian: ['lt'],
        czech: ['cs', 'cs-CZ', 'sk'],
        polish: ['pl'],
        icelandic: ['is'],
        slovenian: ['sl-SL'],
      },
    }
  function mA(e) {
    var t = {}
    return (
      Gr(qn(e), function (r) {
        var n = r[0],
          o = r[1]
        Gr(o, function (i) {
          t[i] = n
        })
      }),
      t
    )
  }
  function vA(e, t) {
    var r = mA(e.pluralTypeToLanguages)
    return r[t] || r[$a.call(t, /-/, 1)[0]] || r.en
  }
  function NA(e, t, r) {
    return e.pluralTypes[t](r)
  }
  function gA() {
    var e = {}
    return function (t, r) {
      var n = e[r]
      return (
        n && !t.pluralTypes[n] && ((n = null), (e[r] = n)),
        n || ((n = vA(t, r)), n && (e[r] = n)),
        n
      )
    }
  }
  function qo(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  function yA(e) {
    var t = (e && e.prefix) || '%{',
      r = (e && e.suffix) || '}'
    if (t === gr || r === gr)
      throw new RangeError('"' + gr + '" token is reserved for pluralization')
    return new RegExp(qo(t) + '(.*?)' + qo(r), 'g')
  }
  var CA = gA(),
    DA = /%\{(.*?)\}/g
  function jn(e, t, r, n, o) {
    if (typeof e != 'string')
      throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string')
    if (t == null) return e
    var i = e,
      a = n || DA,
      s = typeof t == 'number' ? { smart_count: t } : t
    if (s.smart_count != null && e) {
      var S = o || ka,
        l = $a.call(e, gr),
        E = r || 'en',
        A = CA(S, E),
        c = NA(S, A, s.smart_count)
      i = TA(l[c] || l[0])
    }
    return (
      (i = LA.call(i, a, function (u, T) {
        return !_a(s, T) || s[T] == null ? u : s[T]
      })),
      i
    )
  }
  function Xe(e) {
    var t = e || {}
    ;(this.phrases = {}), this.extend(t.phrases || {}), (this.currentLocale = t.locale || 'en')
    var r = t.allowMissing ? jn : null
    ;(this.onMissingKey = typeof t.onMissingKey == 'function' ? t.onMissingKey : r),
      (this.warn = t.warn || hA),
      (this.tokenRegex = yA(t.interpolation)),
      (this.pluralRules = t.pluralRules || ka)
  }
  Xe.prototype.locale = function (e) {
    return e && (this.currentLocale = e), this.currentLocale
  }
  Xe.prototype.extend = function (e, t) {
    Gr(
      qn(e || {}),
      function (r) {
        var n = r[0],
          o = r[1],
          i = t ? t + '.' + n : n
        typeof o == 'object' ? this.extend(o, i) : (this.phrases[i] = o)
      },
      this,
    )
  }
  Xe.prototype.unset = function (e, t) {
    typeof e == 'string'
      ? delete this.phrases[e]
      : Gr(
          qn(e || {}),
          function (r) {
            var n = r[0],
              o = r[1],
              i = t ? t + '.' + n : n
            typeof o == 'object' ? this.unset(o, i) : delete this.phrases[i]
          },
          this,
        )
  }
  Xe.prototype.clear = function () {
    this.phrases = {}
  }
  Xe.prototype.replace = function (e) {
    this.clear(), this.extend(e)
  }
  Xe.prototype.t = function (e, t) {
    var r,
      n,
      o = t == null ? {} : t
    if (typeof this.phrases[e] == 'string') r = this.phrases[e]
    else if (typeof o._ == 'string') r = o._
    else if (this.onMissingKey) {
      var i = this.onMissingKey
      n = i(e, o, this.currentLocale, this.tokenRegex, this.pluralRules)
    } else this.warn('Missing translation for key: "' + e + '"'), (n = e)
    return (
      typeof r == 'string' &&
        (n = jn(r, o, this.currentLocale, this.tokenRegex, this.pluralRules)),
      n
    )
  }
  Xe.prototype.has = function (e) {
    return _a(this.phrases, e)
  }
  Xe.transformPhrase = function (t, r, n) {
    return jn(t, r, n)
  }
  var pA = Xe
  const UA = {
      appName: 'Quordle',
      keywords:
        'quordle, game, puzzle, word, words, letters, play, online, guess, brain teaser, dordle',
      description:
        'Put your skills to the test and solve four words at once! You have 9 guesses to solve all four words. A new Quordle available each day to solve.',
      webAddress: 'quordle.com',
      noJs: 'You need to enable JavaScript to run this app.',
      error404: '404',
      oops: 'Oops!',
      pageNotFound: 'Page not found',
      notFoundText: "The page you're looking for doesn't exist.",
      backToDaily: 'Back to Daily Quordle',
      close: 'Close',
      dictionaryUrl: 'https://www.merriam-webster.com/dictionary/%{word}',
    },
    PA = {
      aria: { openMoreOptions: 'Open More Options Dropdown', openPage: 'Open %{page} Page' },
      title: 'Quordle',
      daily: 'Daily',
      practice: 'Practice',
      settings: 'Settings',
      dailyStats: 'Daily Stats',
      practiceStats: 'Practice Stats',
      help: 'Help',
      moreOptions: 'More Options',
      achievements: 'Achievements',
    },
    MA = {
      keyboardHeight: 'Keyboard Height (%{height})',
      gameSize: 'Game Size',
      gameFit: 'Fit Screen',
      gameSquare: 'Always Square Tiles',
      currentSeed: 'Current Practice Game Seed',
      gameSeedDescription:
        'The input field below allows you to set a custom seed for a practice game. This is useful for sharing the same seed between multiple people (so that everyone can play with the same answers).',
      gameSeedInputLabel: 'New Practice Game Seed',
      gameSeedInputPlaceholder: 'Enter game seed here!',
      startNewPractice: 'Start New Practice Game',
      startNewPracticeWarning: 'Warning: Starting a new game will count as a loss!',
      copySeedToClipboard: 'Copy Game Seed to Clipboard',
      copiedSeedToClipboardAlert: 'Copied practice game seed "%{seed}" to clipboard!',
      resetPractice: 'Reset Current Practice',
      resetWarning: 'Warning: Resetting will count as a loss!',
      darkMode: 'Dark Mode',
      colorblindMode: 'Colorblind Mode',
      vibration: 'Vibration',
      switchKeys: 'Switch Keys (%{example})',
      switchKeysInfo:
        'Toggle to switch enter and backspace keys on the keyboard. Currently set as %{left} on the left and %{right} on the right.',
      achievementNotifs: 'Achievement Notifications',
    },
    bA = {
      aria: {
        played: 'total number of %{mode} games played is %{num}',
        winPercent: '%{mode} win percentage is %{num}%',
        numGames: '%{smart_count} game |||| %{smart_count} games',
        numGuesses: '%{smart_count} guess |||| %{smart_count} guesses',
        numWords: '%{smart_count} word |||| %{smart_count} words',
        currentStreak: '%{mode} current win streak is %{numGames}',
        maxStreak: '%{mode} maximum win streak is %{numGames}',
        winChartBar: '%{numGames} completed in %{numGuesses}',
        winRateRatio: 'Win rate ratio. Click to see loss distribution.',
        lossChartBar: '%{numGames} lost with %{numWords} missed',
      },
      dailyStatistics: 'Daily Statistics',
      practiceStatistics: 'Practice Statistics',
      played: 'Played',
      winPercent: 'Win %',
      currentStreak: `Current
Streak`,
      maxStreak: `Max
Streak`,
      winDistribution: 'Win Distribution',
      winDistExplain: '(total # guesses to complete all 4 words)',
      win: 'Win',
      loss: 'Loss',
      lossDistribution: 'Loss Distribution',
      lossDistExplain: '(# words missed)',
    },
    YA = {
      aria: {
        tutorialGuess: 'Tutorial guess %{guess}.',
        tutorialGuessBoard: 'Tutorial guess %{guess} in game board %{num}.',
      },
      tutorial: 'Tutorial',
      title: 'Guess all four Quordle words in 9 tries.',
      p1: 'Each of your guesses must be a real 5-letter word. Submit your guess using the enter button.  Each guess applies to the four different words you need to solve. After each guess, the tiles will change color to show whether the letters in your guess are correct.',
      p2: 'A Green Letter: That letter is in the word, and in the right spot.',
      p3: 'A Yellow Letter: That letter is in the word, but not in the right spot.',
      p4: 'A Gray Letter: That letter is not in the word at all.',
      examples: 'For Example...',
      exampleWord1: 'CROWN',
      exampleWord2: 'BADGE',
      exampleWord3: 'COMFY',
      exampleWord4: 'WORLD',
      example1: 'The letter C is in the right spot.',
      example2: 'The letter A is in the word, but not in the right spot.',
      example3: 'The letters C, O, M, F, Y are not in the word in any spot.',
      example4Pre: "Here's how that might look in a game:",
      example4Title: 'For the guess "WORLD," above:',
      example4b1: 'The top left word has none of the letters.',
      example4b2: 'The top right word has the R in the wrong spot and the D in the right spot.',
      example4b3: 'The bottom left word has the L in the wrong spot.',
      example4b4: 'The bottom right word has the O in the right spot and the D in the wrong spot.',
      final1: 'You have 9 guesses to get all 4 words. Good luck!',
      final2: 'A new Quordle will be available each day!',
      explanationTitle: 'Ads Instead of Donations',
      explanationP1:
        "Instead of asking for donations, we've decided to include a couple of ads on the page. We've tried to place them as nicely as possible, so they don't interfere with the game. Hope you think they look okay!",
      explanationP2:
        'A huge thank you to everyone who enjoys playing and sharing Quordle, and a special thank you to those who have supported us with your donations!',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      patronsThank:
        'A huge thank you to everyone that supports Quordle and a special thank you to all the Patrons!',
      historyTitle: 'History of Quordle',
      history: `It all started on January 29, 2022 when I saw an article mentioning <a href='https://zaratustra.itch.io/dordle' target='_blank' style='text-decoration-line:underline;'>Dordle</a> by Guilherme S. T\xF6ws and we all started playing it as a group. It was a blast to play something more difficult than Wordle, but we still found it uncommon to fail to guess both words in 7 attempts.

The first prototype of Quordle was released on January 30th and linked to the group chat. It was truly horrific code (it even had 2 keyboards \u{1F605}), but I knew that I had to continue the madness.

Over the next few weeks I rewrote the code from scratch, removed the second keyboard, and added the color quadrant keyboard. I even added Google Analytics thinking it would be funny to see the stats for our friend group playing.

At first it was just a few dozen players (there was a group of 20-30 people in Ohio that were playing constantly the first few days). But then Quordle got written about in an article in <a href='https://www.theguardian.com/games/2022/feb/06/worried-about-losing-wordle-here-are-some-alternatives-just-in-case' target='_blank' style='text-decoration-line:underline;'>The Guardian</a> and things exploded quickly from there. Now Quordle has over 2 million players daily and has had over 40 million total players.

A shoutout to our friend that plays relentlessly while indoor cycling. You were the drive to create a better version and your passion made me realize it could be popular outside of our friend group. I am so glad the world has been thoroughly cursed by Quordle and can't wait to see how Quordle strategies evolve!

I deeply appreciate watching everyone enjoy this insane game and couldn't have done it without Guilherme S. T\xF6ws and David Mah. If you have any ideas for Quordle or just want to chat, check out the socials posted above.`,
      twitter: 'Twitter',
      github: 'Github',
      facebook: 'Facebook',
      reddit: 'Reddit',
      instagram: 'Instagram',
      discord: 'Discord',
      twitch: 'Twitch',
    },
    BA = {
      achievementAndXOthers:
        '%{achievement} and %{smart_count} other achievement |||| %{achievement} and %{smart_count} other achievements',
      win_practice: 'Practice Makes Perfect (%{num})',
      win_practice_desc:
        'Win %{smart_count} practice game. |||| Win %{smart_count} practice games.',
      win_daily: 'Slow and Steady (%{num})',
      win_daily_desc: 'Win %{smart_count} daily game. |||| Win %{smart_count} daily games.',
      streak_practice: 'Relentless (%{num})',
      streak_practice_desc: 'Reach a maximum streak of %{num} in practice.',
      streak_daily: 'Unbreakable (%{num})',
      streak_daily_desc: 'Reach a maximum streak of %{num} for the daily.',
      win_in_9: 'Niner',
      win_in_9_desc: 'Win a game in 9 turns.',
      win_in_8: 'Par',
      win_in_8_desc: 'Win a game in 8 turns.',
      win_in_7: 'Birdie',
      win_in_7_desc: 'Win a game in 7 turns.',
      win_in_6: 'Eagle',
      win_in_6_desc: 'Win a game in 6 turns.',
      win_in_5: 'Albatross',
      win_in_5_desc: 'Win a game in 5 turns.',
      win_in_4: 'God Mode',
      win_in_4_desc: 'Win a game in 4 turns.',
      guess_word_2_same_letter: 'Double or Nothing',
      guess_word_2_same_letter_desc: 'Guess a word with 2 of the same letter.',
      guess_word_3_same_letter: 'Wooow',
      guess_word_3_same_letter_desc: 'Guess a word with 3 of the same letter.',
      correct_turn_1: 'One in a Million',
      correct_turn_1_desc: 'Guess an answer correctly on turn 1.',
      share: 'Spread the Word',
      share_desc: 'Share a practice or daily game result.',
      donate: 'Spread the Love',
      donate_desc: 'Donate to Quordle.',
      lose_1_wrong: 'So Close',
      lose_1_wrong_desc: 'Lose a game with 1 missed word.',
      lose_2_wrong: 'Getting the Hang of It',
      lose_2_wrong_desc: 'Lose a game with 2 missed words.',
      lose_3_wrong: 'Step It Up',
      lose_3_wrong_desc: 'Lose a game with 3 missed words.',
      lose_4_wrong: 'Are You Even Trying?',
      lose_4_wrong_desc: 'Lose a game with 4 missed words.',
      play_words: 'The More the Merrier (%{num})',
      play_words_desc:
        'Play %{smart_count} word in practice or daily. |||| Play %{smart_count} words in practice or daily.',
    },
    wA = {
      aria: {
        blank: 'Blank',
        tileNever: "'%{letter}' (letter %{column}) is never guessable (board is complete)",
        tileFuture: "'%{letter}' (letter %{column}) is a future guess",
        tileInvalid: "'%{letter}' (letter %{column}) is an invalid guess",
        tilePresent: "'%{letter}' (letter %{column}) is being guessed",
        tileDiff: "'%{letter}' (letter %{column}) is in a different spot",
        tileNone: "'%{letter}' (letter %{column}) is incorrect",
        tileCorrect: "'%{letter}' (letter %{column}) is correct",
        keyboard: 'Keyboard',
        keyboardRow: 'Keyboard Row %{row}',
        key: "'%{letter}' key. %{info}.",
        keyInfoDelimiter: '. ',
        keyNotGuessed: 'Not guessed',
        keyIncorrectAll: 'Incorrect in all game boards',
        keyDiff: 'Different spot in game board %{board}',
        keyNone: 'Incorrect in game board %{board}',
        keyCorrect: 'Correct in game board %{board}',
        gameCompleteBanner: 'Game complete banner',
        shareBanner: 'Game results and share banner',
        shareAnswer: 'Answer is %{word} for game board %{board}. %{solved}',
        shareAnswerSolved:
          'Solved in %{smart_count} guess. |||| Solved in %{smart_count} guesses.',
        shareAnswerUnsolved: 'Unsolved.',
        shareAnswerLinkDesc: 'Link to word definition',
      },
      dailyQuordleShare: 'Daily Quordle %{num}',
      practiceQuordleShare: 'Practice Quordle',
      dailyQuordleFoolsShare: 'Daily Quordle Fools %{num}!',
      practiceQuordleFoolsShare: 'Practice Quordle Fools!',
      hoursDuration: 'in %{smart_count} hour |||| in %{smart_count} hours',
      minutesDuration: 'in %{smart_count} minute |||| in %{smart_count} minutes',
      secondsDuration: 'in %{smart_count} second |||| in %{smart_count} seconds',
      newPractice: 'New Practice Game',
      nextDaily: 'Next Daily %{duration}',
      dailyResetTimer: 'Daily will reset %{duration}',
      complete: 'Quordle Complete!',
      soClose: 'So Close!',
      betterLuck: 'Better Luck Next Time!',
      copiedResults: 'Copied results to clipboard!',
      errorCopy: 'Error copying results to clipboard!',
      share: 'Share',
      shareImage: 'Share Image',
      saveImage: 'Save Image',
      copyClipboard: 'Copy',
      enterKey: 'Enter Key',
      backspaceKey: 'Backspace Key',
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      keyboard: `Q W E R T Y U I O P
A S D F G H J K L
bs Z X C V B N M enter`,
      keyboardReversed: `Q W E R T Y U I O P
A S D F G H J K L
enter Z X C V B N M bs`,
    }
  var HA = {
    app: UA,
    header: PA,
    settings: MA,
    stats: bA,
    tutorial: YA,
    achievements: BA,
    game: wA,
  }
  const GA = ut(Ce({}, HA), {
    blacklist:
      'ABORT AGORA BOOBY BUTCH DUMMY DWARF FATTY FETUS GIPSY GONAD GYPSY HUSSY IDIOT JUNTA JUNTO LEPER LYNCH MAFIA MAMMY MORON OBESE OVATE PADDY PANSY PRICK PYGMY QUEER SCREE SEMEN SISSY SLAVE SPADE SPERM WELCH WELSH WENCH WILLY ZONAL',
    wordBank:
      'ABACK ABASE ABATE ABBEY ABBOT ABHOR ABIDE ABLED ABODE ABORT ABOUT ABOVE ABUSE ABYSS ACORN ACRID ACTOR ACUTE ADAGE ADAPT ADEPT ADMIN ADMIT ADOBE ADOPT ADORE ADORN ADULT AFFIX AFIRE AFOOT AFOUL AFTER AGAIN AGAPE AGATE AGENT AGILE AGING AGLOW AGONY AGORA AGREE AHEAD AIDER AISLE ALARM ALBUM ALERT ALGAE ALIBI ALIEN ALIGN ALIKE ALIVE ALLAY ALLEY ALLOT ALLOW ALLOY ALOFT ALONE ALONG ALOOF ALOUD ALPHA ALTAR ALTER AMASS AMAZE AMBER AMBLE AMEND AMISS AMITY AMONG AMPLE AMPLY AMUSE ANGEL ANGER ANGLE ANGRY ANGST ANIME ANKLE ANNEX ANNOY ANNUL ANODE ANTIC ANVIL AORTA APART APHID APING APNEA APPLE APPLY APRON APTLY ARBOR ARDOR ARENA ARGUE ARISE ARMOR AROMA AROSE ARRAY ARROW ARSON ARTSY ASCOT ASHEN ASIDE ASKEW ASSAY ASSET ATOLL ATONE ATTIC AUDIO AUDIT AUGUR AUNTY AVAIL AVERT AVIAN AVOID AWAIT AWAKE AWARD AWARE AWASH AWFUL AWOKE AXIAL AXIOM AXION AZURE BACON BADGE BADLY BAGEL BAGGY BAKER BALER BALMY BANAL BANJO BARGE BARON BASAL BASIC BASIL BASIN BASIS BASTE BATCH BATHE BATON BATTY BAWDY BAYOU BEACH BEADY BEARD BEAST BEECH BEEFY BEFIT BEGAN BEGAT BEGET BEGIN BEGUN BEING BELCH BELIE BELLE BELLY BELOW BENCH BERET BERRY BERTH BESET BETEL BEVEL BEZEL BIBLE BICEP BIDDY BIGOT BILGE BILLY BINGE BINGO BIOME BIRCH BIRTH BISON BITTY BLACK BLADE BLAME BLAND BLANK BLARE BLAST BLAZE BLEAK BLEAT BLEED BLEEP BLEND BLESS BLIMP BLIND BLINK BLISS BLITZ BLOAT BLOCK BLOKE BLOND BLOOD BLOOM BLOWN BLUER BLUFF BLUNT BLURB BLURT BLUSH BOARD BOAST BOBBY BONEY BONGO BONUS BOOBY BOOST BOOTH BOOTY BOOZE BOOZY BORAX BORNE BOSOM BOSSY BOTCH BOUGH BOULE BOUND BOWEL BOXER BRACE BRAID BRAIN BRAKE BRAND BRASH BRASS BRAVE BRAVO BRAWL BRAWN BREAD BREAK BREED BRIAR BRIBE BRICK BRIDE BRIEF BRINE BRING BRINK BRINY BRISK BROAD BROIL BROKE BROOD BROOK BROOM BROTH BROWN BRUNT BRUSH BRUTE BUDDY BUDGE BUGGY BUGLE BUILD BUILT BULGE BULKY BULLY BUNCH BUNNY BURLY BURNT BURST BUSED BUSHY BUTCH BUTTE BUXOM BUYER BYLAW CABAL CABBY CABIN CABLE CACAO CACHE CACTI CADDY CADET CAGEY CAIRN CAMEL CAMEO CANAL CANDY CANNY CANOE CANON CAPER KAPUT CARAT CARGO CAROL CARRY CARVE CASTE CATCH CATER CATTY CAULK CAUSE CAVIL CEASE CEDAR CELLO CHAFE CHAFF CHAIN CHAIR CHALK CHAMP CHANT CHAOS CHARD CHARM CHART CHASE CHASM CHEAP CHEAT CHECK CHEEK CHEER CHESS CHEST CHICK CHIDE CHIEF CHILD CHILI CHILL CHIME CHINA CHIRP CHOCK CHOIR CHOKE CHORD CHORE CHOSE CHUCK CHUMP CHUNK CHURN CHUTE CIDER CIGAR CINCH CIRCA CIVIC CIVIL CLACK CLAIM CLAMP CLANG CLANK CLASH CLASP CLASS CLEAN CLEAR CLEAT CLEFT CLERK CLICK CLIFF CLIMB CLING CLINK CLOAK CLOCK CLONE CLOSE CLOTH CLOUD CLOUT CLOVE CLOWN CLUCK CLUED CLUMP CLUNG COACH COAST COBRA COCOA COLON COLOR COMET COMFY COMIC COMMA CONCH CONDO CONIC COPSE CORAL CORER CORNY COUCH COUGH COULD COUNT COUPE COURT COVEN COVER COVET COVEY COWER COYLY CRACK CRAFT CRAMP CRANE CRANK CRASH CRASS CRATE CRAVE CRAWL CRAZE CRAZY CREAK CREAM CREDO CREED CREEK CREEP CREME CREPE CREPT CRESS CREST CRICK CRIED CRIER CRIME CRIMP CRISP CROAK CROCK CRONE CRONY CROOK CROSS CROUP CROWD CROWN CRUDE CRUEL CRUMB CRUMP CRUSH CRUST CRYPT CUBIC CUMIN CURIO CURLY CURRY CURSE CURVE CURVY CUTIE CYBER CYCLE CYNIC DADDY DAILY DAIRY DAISY DALLY DANCE DANDY DATUM DAUNT DEALT DEATH DEBAR DEBIT DEBUG DEBUT DECAL DECAY DECOR DECOY DECRY DEFER DEIGN DEITY DELAY DELTA DELVE DEMON DEMUR DENIM DENSE DEPOT DEPTH DERBY DETER DETOX DEUCE DEVIL DIARY DICEY DIGIT DILLY DIMLY DINER DINGO DINGY DIODE DIRGE DIRTY DISCO DITCH DITTO DITTY DIVER DIZZY DODGE DODGY DOGMA DOING DOLLY DONOR DONUT DOPEY DOUBT DOUGH DOWDY DOWEL DOWNY DOWRY DOZEN DRAFT DRAIN DRAKE DRAMA DRANK DRAPE DRAWL DRAWN DREAD DREAM DRESS DRIED DRIER DRIFT DRILL DRINK DRIVE DROIT DROLL DRONE DROOL DROOP DROSS DROVE DROWN DRUID DRUNK DRYER DRYLY DUCHY DULLY DUMMY DUMPY DUNCE DUSKY DUSTY DUTCH DUVET DWARF DWELL DWELT DYING EAGER EAGLE EARLY EARTH EASEL EATEN EATER EBONY ECLAT EDICT EDIFY EERIE EGRET EIGHT EJECT EKING ELATE ELBOW ELDER ELECT ELEGY ELFIN ELIDE ELITE ELOPE ELUDE EMAIL EMBED EMBER EMCEE EMPTY ENACT ENDOW ENEMA ENEMY ENJOY ENNUI ENSUE ENTER ENTRY ENVOY EPOCH EPOXY EQUAL EQUIP ERASE ERECT ERODE ERROR ERUPT ESSAY ESTER ETHER ETHIC ETHOS ETUDE EVADE EVENT EVERY EVICT EVOKE EXACT EXALT EXCEL EXERT EXILE EXIST EXPEL EXTOL EXTRA EXULT EYING FABLE FACET FAINT FAIRY FAITH FALSE FANCY FANNY FARCE FATAL FATTY FAULT FAUNA FAVOR FEAST FECAL FEIGN FELLA FELON FEMME FEMUR FENCE FERAL FERRY FETAL FETCH FETID FETUS FEVER FEWER FIBER FIBRE FICUS FIELD FIEND FIERY FIFTH FIFTY FIGHT FILER FILET FILLY FILMY FILTH FINAL FINCH FINER FIRST FISHY FIXER FIZZY FJORD FLACK FLAIL FLAIR FLAKE FLAKY FLAME FLANK FLARE FLASH FLASK FLECK FLEET FLESH FLICK FLIER FLING FLINT FLIRT FLOAT FLOCK FLOOD FLOOR FLORA FLOSS FLOUR FLOUT FLOWN FLUFF FLUID FLUKE FLUME FLUNG FLUNK FLUSH FLUTE FLYER FOAMY FOCAL FOCUS FOGGY FOIST FOLIO FOLLY FORAY FORCE FORGE FORGO FORTE FORTH FORTY FORUM FOUND FOYER FRAIL FRAME FRANK FRAUD FREAK FREED FREER FRESH FRIAR FRIED FRILL FRISK FRITZ FROCK FROND FRONT FROST FROTH FROWN FROZE FRUIT FUDGE FUGUE FULLY FUNGI FUNKY FUNNY FUROR FURRY FUSSY FUZZY GAFFE GAILY GAMER GAMMA GAMUT GASSY GAUDY GAUGE GAUNT GAUZE GAVEL GAWKY GAYER GAYLY GAZER GECKO GEEKY GEESE GENIE GENRE GHOST GHOUL GIANT GIDDY GIPSY GIRLY GIRTH GIVEN GIVER GLADE GLAND GLARE GLASS GLAZE GLEAM GLEAN GLIDE GLINT GLOAT GLOBE GLOOM GLORY GLOSS GLOVE GLYPH GNASH GNOME GODLY GOING GOLEM GOLLY GONAD GONER GOODY GOOEY GOOFY GOOSE GORGE GOUGE GOURD GRACE GRADE GRAFT GRAIL GRAIN GRAND GRANT GRAPE GRAPH GRASP GRASS GRATE GRAVE GRAVY GRAZE GREAT GREED GREEN GREET GRIEF GRILL GRIME GRIMY GRIND GRIPE GROAN GROIN GROOM GROPE GROSS GROUP GROUT GROVE GROWL GROWN GRUEL GRUFF GRUNT GUARD GUAVA GUESS GUEST GUIDE GUILD GUILE GUILT GUISE GULCH GULLY GUMBO GUMMY GUPPY GUSTO GUSTY GYPSY HABIT HAIRY HALVE HANDY HAPPY HARDY HAREM HARPY HARRY HARSH HASTE HASTY HATCH HATER HAUNT HAUTE HAVEN HAVOC HAZEL HEADY HEARD HEART HEATH HEAVE HEAVY HEDGE HEFTY HEIST HELIX HELLO HENCE HERON HILLY HINGE HIPPO HIPPY HITCH HOARD HOBBY HOIST HOLLY HOMER HONEY HONOR HORDE HORNY HORSE HOTEL HOTLY HOUND HOUSE HOVEL HOVER HOWDY HUMAN HUMID HUMOR HUMPH HUMUS HUNCH HUNKY HURRY HUSKY HUSSY HUTCH HYDRO HYENA HYMEN HYPER ICILY ICING IDEAL IDIOM IDIOT IDLER IDYLL IGLOO ILIAC IMAGE IMBUE IMPEL IMPLY INANE INBOX INCUR INDEX INEPT INERT INFER INGOT INLAY INLET INNER INPUT INTER INTRO IONIC IRATE IRONY ISLET ISSUE ITCHY IVORY JAUNT JAZZY JELLY JERKY JETTY JEWEL JIFFY JOINT JOIST JOKER JOLLY JOUST JUDGE JUICE JUICY JUMBO JUMPY JUNTA JUNTO JUROR KAPPA KARMA KAYAK KEBAB KHAKI KINKY KIOSK KITTY KNACK KNAVE KNEAD KNEED KNEEL KNELT KNIFE KNOCK KNOLL KNOWN KOALA KRILL LABEL LABOR LADEN LADLE LAGER LANCE LANKY LAPEL LAPSE LARGE LARVA LASSO LATCH LATER LATHE LATTE LAUGH LAYER LEACH LEAFY LEAKY LEANT LEAPT LEARN LEASE LEASH LEAST LEAVE LEDGE LEECH LEERY LEFTY LEGAL LEGGY LEMON LEMUR LEPER LEVEL LEVER LIBEL LIEGE LIGHT LIKEN LILAC LIMBO LIMIT LINEN LINER LINGO LIPID LITHE LIVER LIVID LLAMA LOAMY LOATH LOBBY LOCAL LOCUS LODGE LOFTY LOGIC LOGIN LOOPY LOOSE LORRY LOSER LOUSE LOUSY LOVER LOWER LOWLY LOYAL LUCID LUCKY LUMEN LUMPY LUNAR LUNCH LUNGE LUPUS LURCH LURID LUSTY LYING LYMPH LYNCH LYRIC MACAW MACHO MACRO MADAM MADLY MAFIA MAGIC MAGMA MAIZE MAJOR MAKER MAMBO MAMMA MAMMY MANGA MANGE MANGO MANGY MANIA MANIC MANLY MANOR MAPLE MARCH MARRY MARSH MASON MASSE MATCH MATEY MAUVE MAXIM MAYBE MAYOR MEALY MEANT MEATY MECCA MEDAL MEDIA MEDIC MELEE MELON MERCY MERGE MERIT MERRY METAL METER METRO MICRO MIDGE MIDST MIGHT MILKY MIMIC MINCE MINER MINIM MINOR MINTY MINUS MIRTH MISER MISSY MOCHA MODAL MODEL MODEM MOGUL MOIST MOLAR MOLDY MONEY MONTH MOODY MOOSE MORAL MORON MORPH MOSSY MOTEL MOTIF MOTOR MOTTO MOULT MOUND MOUNT MOURN MOUSE MOUTH MOVER MOVIE MOWER MUCKY MUCUS MUDDY MULCH MUMMY MUNCH MURAL MURKY MUSHY MUSIC MUSKY MUSTY MYRRH NADIR NAIVE NANNY NASAL NASTY NATAL NAVAL NAVEL NEEDY NEIGH NERDY NERVE NEVER NEWER NEWLY NICER NICHE NIECE NIGHT NINJA NINNY NINTH NOBLE NOBLY NOISE NOISY NOMAD NOOSE NORTH NOSEY NOTCH NOVEL NUDGE NURSE NUTTY NYLON NYMPH OAKEN OBESE OCCUR OCEAN OCTAL OCTET ODDER ODDLY OFFAL OFFER OFTEN OLDEN OLDER OLIVE OMBRE OMEGA ONION ONSET OPERA OPINE OPIUM OPTIC ORBIT ORDER ORGAN OTHER OTTER OUGHT OUNCE OUTDO OUTER OUTGO OVARY OVATE OVERT OVINE OVOID OWING OWNER OXIDE OZONE PADDY PAGAN PAINT PALER PALSY PANEL PANIC PANSY PAPAL PAPER PARER PARKA PARRY PARSE PARTY PASTA PASTE PASTY PATCH PATIO PATSY PATTY PAUSE PAYEE PAYER PEACE PEACH PEARL PECAN PEDAL PENAL PENCE PENNE PENNY PERCH PERIL PERKY PESKY PESTO PETAL PETTY PHASE PHONE PHONY PHOTO PIANO PICKY PIECE PIETY PIGGY PILOT PINCH PINEY PINKY PINTO PIPER PIQUE PITCH PITHY PIVOT PIXEL PIXIE PIZZA PLACE PLAID PLAIN PLAIT PLANE PLANK PLANT PLATE PLAZA PLEAD PLEAT PLIED PLIER PLUCK PLUMB PLUME PLUMP PLUNK PLUSH POESY POINT POISE POKER POLAR POLKA POLYP POOCH POPPY PORCH POSER POSIT POSSE POUCH POUND POUTY POWER PRANK PRAWN PREEN PRESS PRICE PRICK PRIDE PRIED PRIME PRIMO PRINT PRIOR PRISM PRIVY PRIZE PROBE PRONE PRONG PROOF PROSE PROUD PROVE PROWL PROXY PRUDE PRUNE PSALM PUBIC PUDGY PUFFY PULPY PULSE PUNCH PUPAL PUPIL PUPPY PUREE PURER PURGE PURSE PUSHY PUTTY PYGMY QUACK QUAIL QUAKE QUALM QUARK QUART QUASH QUASI QUEEN QUEER QUELL QUERY QUEST QUEUE QUICK QUIET QUILL QUILT QUIRK QUITE QUOTA QUOTE QUOTH RABBI RABID RACER RADAR RADII RADIO RAINY RAISE RAJAH RALLY RALPH RAMEN RANCH RANDY RANGE RAPID RARER RASPY RATIO RATTY RAVEN RAYON RAZOR REACH REACT READY REALM REARM REBAR REBEL REBUS REBUT RECAP RECUR RECUT REEDY REFER REFIT REGAL REHAB REIGN RELAX RELAY RELIC REMIT RENAL RENEW REPAY REPEL REPLY RERUN RESET RESIN RETCH RETRO RETRY REUSE REVEL REVUE RHINO RHYME RIDER RIDGE RIFLE RIGHT RIGID RIGOR RINSE RIPEN RIPER RISEN RISER RISKY RIVAL RIVER RIVET ROACH ROAST ROBIN ROBOT ROCKY RODEO ROGER ROGUE ROOMY ROOST ROTOR ROUGE ROUGH ROUND ROUSE ROUTE ROVER ROWDY ROWER ROYAL RUDDY RUDER RUGBY RULER RUMBA RUMOR RUPEE RURAL RUSTY SADLY SAFER SAINT SALAD SALLY SALON SALSA SALTY SALVE SALVO SANDY SANER SAPPY SASSY SATIN SATYR SAUCE SAUCY SAUNA SAUTE SAVOR SAVOY SAVVY SCALD SCALE SCALP SCALY SCAMP SCANT SCARE SCARF SCARY SCENE SCENT SCION SCOFF SCOLD SCONE SCOOP SCOPE SCORE SCORN SCOUR SCOUT SCOWL SCRAM SCRAP SCREE SCREW SCRUB SCRUM SCUBA SEDAN SEEDY SEGUE SEIZE SEMEN SENSE SEPIA SERIF SERUM SERVE SETUP SEVEN SEVER SEWER SHACK SHADE SHADY SHAFT SHAKE SHAKY SHALE SHALL SHALT SHAME SHANK SHAPE SHARD SHARE SHARK SHARP SHAVE SHAWL SHEAR SHEEN SHEEP SHEER SHEET SHEIK SHELF SHELL SHIED SHIFT SHINE SHINY SHIRE SHIRK SHIRT SHOAL SHOCK SHONE SHOOK SHOOT SHORE SHORN SHORT SHOUT SHOVE SHOWN SHOWY SHREW SHRUB SHRUG SHUCK SHUNT SHUSH SHYLY SIEGE SIEVE SIGHT SIGMA SILKY SILLY SINCE SINEW SINGE SIREN SISSY SIXTH SIXTY SKATE SKIER SKIFF SKILL SKIMP SKIRT SKULK SKULL SKUNK SLACK SLAIN SLANG SLANT SLASH SLATE SLAVE SLEEK SLEEP SLEET SLEPT SLICE SLICK SLIDE SLIME SLIMY SLING SLINK SLOOP SLOPE SLOSH SLOTH SLUMP SLUNG SLUNK SLURP SLUSH SLYLY SMACK SMALL SMART SMASH SMEAR SMELL SMELT SMILE SMIRK SMITE SMITH SMOCK SMOKE SMOKY SMOTE SNACK SNAIL SNAKE SNAKY SNARE SNARL SNEAK SNEER SNIDE SNIFF SNIPE SNOOP SNORE SNORT SNOUT SNOWY SNUCK SNUFF SOAPY SOBER SOGGY SOLAR SOLID SOLVE SONAR SONIC SOOTH SOOTY SORRY SOUND SOUTH SOWER SPACE SPADE SPANK SPARE SPARK SPASM SPAWN SPEAK SPEAR SPECK SPEED SPELL SPELT SPEND SPENT SPERM SPICE SPICY SPIED SPIEL SPIKE SPIKY SPILL SPILT SPINE SPINY SPIRE SPITE SPLAT SPLIT SPOIL SPOKE SPOOF SPOOK SPOOL SPOON SPORE SPORT SPOUT SPRAY SPREE SPRIG SPUNK SPURN SPURT SQUAD SQUAT SQUIB STACK STAFF STAGE STAID STAIN STAIR STAKE STALE STALK STALL STAMP STAND STANK STARE STARK START STASH STATE STAVE STEAD STEAK STEAL STEAM STEED STEEL STEEP STEER STEIN STERN STICK STIFF STILL STILT STING STINK STINT STOCK STOIC STOKE STOLE STOMP STONE STONY STOOD STOOL STOOP STORE STORK STORM STORY STOUT STOVE STRAP STRAW STRAY STRIP STRUT STUCK STUDY STUFF STUMP STUNG STUNK STUNT STYLE SUAVE SUGAR SUING SUITE SULKY SULLY SUMAC SUNNY SUPER SURER SURGE SURLY SUSHI SWAMI SWAMP SWARM SWASH SWATH SWEAR SWEAT SWEEP SWEET SWELL SWEPT SWIFT SWILL SWINE SWING SWIRL SWISH SWOON SWOOP SWORD SWORE SWORN SWUNG SYNOD SYRUP TABBY TABLE TABOO TACIT TACKY TAFFY TAINT TAKEN TAKER TALLY TALON TAMER TANGO TANGY TAPER TAPIR TARDY TAROT TASTE TASTY TATTY TAUNT TAWNY TEACH TEARY TEASE TEDDY TEETH TEMPO TENET TENOR TENSE TENTH TEPEE TEPID TERRA TERSE TESTY THANK THEFT THEIR THEME THERE THESE THETA THICK THIEF THIGH THING THINK THIRD THONG THORN THOSE THREE THREW THROB THROW THRUM THUMB THUMP THYME TIARA TIBIA TIDAL TIGER TIGHT TILDE TIMER TIMID TIPSY TITAN TITHE TITLE TOAST TODAY TODDY TOKEN TONAL TONGA TONIC TOOTH TOPAZ TOPIC TORCH TORSO TORUS TOTAL TOTEM TOUCH TOUGH TOWEL TOWER TOXIC TOXIN TRACE TRACK TRACT TRADE TRAIL TRAIN TRAIT TRAMP TRASH TRAWL TREAD TREAT TREND TRIAD TRIAL TRIBE TRICE TRICK TRIED TRIPE TRITE TROLL TROOP TROPE TROUT TROVE TRUCE TRUCK TRUER TRULY TRUMP TRUNK TRUSS TRUST TRUTH TRYST TUBAL TUBER TULIP TULLE TUMOR TUNIC TURBO TUTOR TWANG TWEAK TWEED TWEET TWICE TWINE TWIRL TWIST TWIXT TYING UDDER ULCER ULTRA UMBRA UNCLE UNCUT UNDER UNDID UNDUE UNFED UNFIT UNIFY UNION UNITE UNITY UNLIT UNMET UNSET UNTIE UNTIL UNWED UNZIP UPPER UPSET URBAN URINE USAGE USHER USING USUAL USURP UTILE UTTER VAGUE VALET VALID VALOR VALUE VALVE VAPID VAPOR VAULT VAUNT VEGAN VENOM VENUE VERGE VERSE VERSO VERVE VICAR VIDEO VIGIL VIGOR VILLA VINYL VIOLA VIPER VIRAL VIRUS VISIT VISOR VISTA VITAL VIVID VIXEN VOCAL VODKA VOGUE VOICE VOILA VOMIT VOTER VOUCH VOWEL VYING WACKY WAFER WAGER WAGON WAIST WAIVE WALTZ WARTY WASTE WATCH WATER WAVER WAXEN WEARY WEAVE WEDGE WEEDY WEIGH WEIRD WELCH WELSH WENCH WHACK WHALE WHARF WHEAT WHEEL WHELP WHERE WHICH WHIFF WHILE WHINE WHINY WHIRL WHISK WHITE WHOLE WHOOP WHOSE WIDEN WIDER WIDOW WIDTH WIELD WIGHT WILLY WIMPY WINCE WINCH WINDY WISER WISPY WITCH WITTY WOKEN WOMAN WOMEN WOODY WOOER WOOLY WOOZY WORDY WORLD WORRY WORSE WORST WORTH WOULD WOUND WOVEN WRACK WRATH WREAK WRECK WREST WRING WRIST WRITE WRONG WROTE WRUNG WRYLY YACHT YEARN YEAST YIELD YOUNG YOUTH ZEBRA ZESTY ZONAL',
    allowed:
      'AAHED AALII AARGH AARTI ABACA ABACI ABACS ABAFT ABAKA ABAMP ABAND ABASH ABASK ABAYA ABBAS ABBED ABBES ABCEE ABEAM ABEAR ABELE ABERS ABETS ABIES ABLER ABLES ABLET ABLOW ABMHO ABOHM ABOIL ABOMA ABOON ABORD ABORE ABRAM ABRAY ABRIM ABRIN ABRIS ABSEY ABSIT ABUNA ABUNE ABUTS ABUZZ ABYES ABYSM ACAIS ACARI ACCAS ACCOY ACERB ACERS ACETA ACHAR ACHED ACHES ACHOO ACIDS ACIDY ACING ACINI ACKEE ACKER ACMES ACMIC ACNED ACNES ACOCK ACOLD ACRED ACRES ACROS ACTED ACTIN ACTON ACYLS ADAWS ADAYS ADBOT ADDAX ADDED ADDER ADDIO ADDLE ADEEM ADHAN ADIEU ADIOS ADITS ADMAN ADMEN ADMIX ADOBO ADOWN ADOZE ADRAD ADRED ADSUM ADUKI ADUNC ADUST ADVEW ADYTA ADZED ADZES AECIA AEDES AEGIS AEONS AERIE AEROS AESIR AFALD AFARA AFARS AFEAR AFLAJ AFORE AFRIT AFROS AGAMA AGAMI AGARS AGAST AGAVE AGAZE AGENE AGERS AGGER AGGIE AGGRI AGGRO AGGRY AGHAS AGILA AGIOS AGISM AGIST AGITA AGLEE AGLET AGLEY AGLOO AGLUS AGMAS AGOGE AGONE AGONS AGOOD AGRIA AGRIN AGROS AGUED AGUES AGUNA AGUTI AHEAP AHENT AHIGH AHIND AHING AHINT AHOLD AHULL AHURU AIDAS AIDED AIDES AIDOI AIDOS AIERY AIGAS AIGHT AILED AIMED AIMER AINEE AINGA AIOLI AIRED AIRER AIRNS AIRTH AIRTS AITCH AITUS AIVER AIYEE AIZLE AJIES AJIVA AJUGA AJWAN AKEES AKELA AKENE AKING AKITA AKKAS ALAAP ALACK ALAMO ALAND ALANE ALANG ALANS ALANT ALAPA ALAPS ALARY ALATE ALAYS ALBAS ALBEE ALCID ALCOS ALDEA ALDER ALDOL ALECK ALECS ALEFS ALEFT ALEPH ALEWS ALEYE ALFAS ALGAL ALGAS ALGID ALGIN ALGOR ALGUM ALIAS ALIFS ALINE ALIST ALIYA ALKIE ALKOS ALKYD ALKYL ALLEE ALLEL ALLIS ALLOD ALLYL ALMAH ALMAS ALMEH ALMES ALMUD ALMUG ALODS ALOED ALOES ALOHA ALOIN ALOOS ALOWE ALTHO ALTOS ALULA ALUMS ALURE ALVAR ALWAY AMAHS AMAIN AMATE AMAUT AMBAN AMBIT AMBOS AMBRY AMEBA AMEER AMENE AMENS AMENT AMIAS AMICE AMICI AMIDE AMIDO AMIDS AMIES AMIGA AMIGO AMINE AMINO AMINS AMIRS AMLAS AMMAN AMMON AMMOS AMNIA AMNIC AMNIO AMOKS AMOLE AMORT AMOUR AMOVE AMOWT AMPED AMPUL AMRIT AMUCK AMYLS ANANA ANATA ANCHO ANCLE ANCON ANDRO ANEAR ANELE ANENT ANGAS ANGLO ANIGH ANILE ANILS ANIMA ANIMI ANION ANISE ANKER ANKHS ANKUS ANLAS ANNAL ANNAS ANNAT ANOAS ANOLE ANOMY ANSAE ANTAE ANTAR ANTAS ANTED ANTES ANTIS ANTRA ANTRE ANTSY ANURA ANYON APACE APAGE APAID APAYD APAYS APEAK APEEK APERS APERT APERY APGAR APHIS APIAN APIOL APISH APISM APODE APODS APOOP APORT APPAL APPAY APPEL APPRO APPUI APPUY APRES APSES APSIS APSOS APTED APTER AQUAE AQUAS ARABA ARAKS ARAME ARARS ARBAS ARCED ARCHI ARCOS ARCUS ARDEB ARDRI AREAD AREAE AREAL AREAR AREAS ARECA AREDD AREDE AREFY AREIC ARENE AREPA ARERE ARETE ARETS ARETT ARGAL ARGAN ARGIL ARGLE ARGOL ARGON ARGOT ARGUS ARHAT ARIAS ARIEL ARIKI ARILS ARIOT ARISH ARKED ARLED ARLES ARMED ARMER ARMET ARMIL ARNAS ARNUT AROBA AROHA AROID ARPAS ARPEN ARRAH ARRAS ARRET ARRIS ARROZ ARSED ARSES ARSEY ARSIS ARTAL ARTEL ARTIC ARTIS ARUHE ARUMS ARVAL ARVEE ARVOS ARYLS ASANA ASCON ASCUS ASDIC ASHED ASHES ASHET ASKED ASKER ASKOI ASKOS ASPEN ASPER ASPIC ASPIE ASPIS ASPRO ASSAI ASSAM ASSES ASSEZ ASSOT ASTER ASTIR ASTUN ASURA ASWAY ASWIM ASYLA ATAPS ATAXY ATIGI ATILT ATIMY ATLAS ATMAN ATMAS ATMOS ATOCS ATOKE ATOKS ATOMS ATOMY ATONY ATOPY ATRIA ATRIP ATTAP ATTAR ATUAS AUDAD AUGER AUGHT AULAS AULIC AULOI AULOS AUMIL AUNES AUNTS AURAE AURAL AURAR AURAS AUREI AURES AURIC AURIS AURUM AUTOS AUXIN AVALE AVANT AVAST AVELS AVENS AVERS AVGAS AVINE AVION AVISE AVISO AVIZE AVOWS AVYZE AWARN AWATO AWAVE AWAYS AWDLS AWEEL AWETO AWING AWMRY AWNED AWNER AWOLS AWORK AXELS AXILE AXILS AXING AXITE AXLED AXLES AXMAN AXMEN AXOID AXONE AXONS AYAHS AYAYA AYELP AYGRE AYINS AYONT AYRES AYRIE AZANS AZIDE AZIDO AZINE AZLON AZOIC AZOLE AZONS AZOTE AZOTH AZUKI AZURN AZURY AZYGY AZYME AZYMS BAAED BAALS BABAS BABEL BABES BABKA BABOO BABUL BABUS BACCA BACCO BACCY BACHA BACHS BACKS BADDY BAELS BAFFS BAFFY BAFTS BAGHS BAGIE BAHTS BAHUS BAHUT BAILS BAIRN BAISA BAITH BAITS BAIZA BAIZE BAJAN BAJRA BAJRI BAJUS BAKED BAKEN BAKES BAKRA BALAS BALDS BALDY BALED BALES BALKS BALKY BALLS BALLY BALMS BALOO BALSA BALTI BALUN BALUS BAMBI BANAK BANCO BANCS BANDA BANDH BANDS BANDY BANED BANES BANGS BANIA BANKS BANNS BANTS BANTU BANTY BANYA BAPUS BARBE BARBS BARBY BARCA BARDE BARDO BARDS BARDY BARED BARER BARES BARFI BARFS BARIC BARKS BARKY BARMS BARMY BARNS BARNY BARPS BARRA BARRE BARRO BARRY BARYE BASAN BASED BASEN BASER BASES BASHO BASIJ BASKS BASON BASSE BASSI BASSO BASSY BASTA BASTI BASTO BASTS BATED BATES BATHS BATIK BATTA BATTS BATTU BAUDS BAUKS BAULK BAURS BAVIN BAWDS BAWKS BAWLS BAWNS BAWRS BAWTY BAYED BAYER BAYES BAYLE BAYTS BAZAR BAZOO BEADS BEAKS BEAKY BEALS BEAMS BEAMY BEANO BEANS BEANY BEARE BEARS BEATH BEATS BEATY BEAUS BEAUT BEAUX BEBOP BECAP BECKE BECKS BEDAD BEDEL BEDES BEDEW BEDIM BEDYE BEEDI BEEFS BEEPS BEERS BEERY BEETS BEFOG BEGAD BEGAR BEGEM BEGOT BEGUM BEIGE BEIGY BEINS BEKAH BELAH BELAR BELAY BELEE BELGA BELLS BELON BELTS BEMAD BEMAS BEMIX BEMUD BENDS BENDY BENES BENET BENGA BENIS BENNE BENNI BENNY BENTO BENTS BENTY BEPAT BERAY BERES BERGS BERKO BERKS BERME BERMS BEROB BERYL BESAT BESAW BESEE BESES BESIT BESOM BESOT BESTI BESTS BETAS BETED BETES BETHS BETID BETON BETTA BETTY BEVER BEVOR BEVUE BEVVY BEWET BEWIG BEZES BEZIL BEZZY BHAIS BHAJI BHANG BHATS BHELS BHOOT BHUNA BHUTS BIACH BIALI BIALY BIBBS BIBES BICCY BICES BIDED BIDER BIDES BIDET BIDIS BIDON BIELD BIERS BIFFO BIFFS BIFFY BIFID BIGAE BIGGS BIGGY BIGHA BIGHT BIGLY BIGOS BIJOU BIKED BIKER BIKES BIKIE BILBO BILBY BILED BILES BILGY BILKS BILLS BIMAH BIMAS BIMBO BINAL BINDI BINDS BINER BINES BINGS BINGY BINIT BINKS BINTS BIOGS BIONT BIOTA BIPED BIPOD BIRDS BIRKS BIRLE BIRLS BIROS BIRRS BIRSE BIRSY BISES BISKS BISOM BITCH BITER BITES BITOS BITOU BITSY BITTE BITTS BIVIA BIVVY BIZES BIZZO BIZZY BLABS BLADS BLADY BLAER BLAES BLAFF BLAGS BLAHS BLAIN BLAMS BLART BLASE BLASH BLATE BLATS BLATT BLAUD BLAWN BLAWS BLAYS BLEAR BLEBS BLECH BLEES BLENT BLERT BLEST BLETS BLEYS BLIMY BLING BLINI BLINS BLINY BLIPS BLIST BLITE BLITS BLIVE BLOBS BLOCS BLOGS BLOOK BLOOP BLORE BLOTS BLOWS BLOWY BLUBS BLUDE BLUDS BLUDY BLUED BLUES BLUET BLUEY BLUID BLUME BLUNK BLURS BLYPE BOABS BOAKS BOARS BOART BOATS BOBAC BOBAK BOBAS BOBOL BOBOS BOCCA BOCCE BOCCI BOCHE BOCKS BODED BODES BODGE BODHI BODLE BOEPS BOETS BOEUF BOFFO BOFFS BOGAN BOGEY BOGGY BOGIE BOGLE BOGUE BOGUS BOHEA BOHOS BOILS BOING BOINK BOITE BOKED BOKEH BOKES BOKOS BOLAR BOLAS BOLDS BOLES BOLIX BOLLS BOLOS BOLTS BOLUS BOMAS BOMBE BOMBO BOMBS BONCE BONDS BONED BONER BONES BONGS BONIE BONKS BONNE BONNY BONZA BONZE BOOAI BOOAY BOOBS BOODY BOOED BOOFY BOOGY BOOHS BOOKS BOOKY BOOLS BOOMS BOOMY BOONG BOONS BOORD BOORS BOOSE BOOTS BOPPY BORAK BORAL BORAS BORDE BORDS BORED BOREE BOREL BORER BORES BORGO BORIC BORKS BORMS BORNA BORON BORTS BORTY BORTZ BOSIE BOSKS BOSKY BOSON BOSUN BOTAS BOTEL BOTES BOTHY BOTTE BOTTS BOTTY BOUGE BOUKS BOULT BOUNS BOURD BOURG BOURN BOUSE BOUSY BOUTS BOVID BOWAT BOWED BOWER BOWES BOWET BOWIE BOWLS BOWNE BOWRS BOWSE BOXED BOXEN BOXES BOXLA BOXTY BOYAR BOYAU BOYED BOYFS BOYGS BOYLA BOYOS BOYSY BOZOS BRAAI BRACH BRACK BRACT BRADS BRAES BRAGS BRAIL BRAKS BRAKY BRAME BRANE BRANK BRANS BRANT BRAST BRATS BRAVA BRAVI BRAWS BRAXY BRAYS BRAZA BRAZE BREAM BREDE BREDS BREEM BREER BREES BREID BREIS BREME BRENS BRENT BRERE BRERS BREVE BREWS BREYS BRIER BRIES BRIGS BRIKI BRIKS BRILL BRIMS BRINS BRIOS BRISE BRISS BRITH BRITS BRITT BRIZE BROCH BROCK BRODS BROGH BROGS BROME BROMO BRONC BROND BROOL BROOS BROSE BROSY BROWS BRUGH BRUIN BRUIT BRULE BRUME BRUNG BRUSK BRUST BRUTS BUATS BUAZE BUBAL BUBAS BUBBA BUBBE BUBBY BUBUS BUCHU BUCKO BUCKS BUCKU BUDAS BUDIS BUDOS BUFFA BUFFE BUFFI BUFFO BUFFS BUFFY BUFOS BUFTY BUHLS BUHRS BUIKS BUIST BUKES BULBS BULGY BULKS BULLA BULLS BULSE BUMBO BUMFS BUMPH BUMPS BUMPY BUNAS BUNCE BUNCO BUNDE BUNDH BUNDS BUNDT BUNDU BUNDY BUNGS BUNGY BUNIA BUNJE BUNJY BUNKO BUNKS BUNNS BUNTS BUNTY BUNYA BUOYS BUPPY BURAN BURAS BURBS BURDS BURET BURFI BURGH BURGS BURIN BURKA BURKE BURKS BURLS BURNS BUROO BURPS BURQA BURRO BURRS BURRY BURSA BURSE BUSBY BUSES BUSKS BUSKY BUSSU BUSTI BUSTS BUSTY BUTEO BUTES BUTLE BUTOH BUTTS BUTTY BUTUT BUTYL BUZZY BWANA BWAZI BYDED BYDES BYKED BYKES BYRES BYRLS BYSSI BYTES BYWAY CAAED CABAS CABER CABOB CABOC CABRE CACAS CACKS CACKY CADEE CADES CADGE CADGY CADIE CADIS CADRE CAECA CAESE CAFES CAFFS CAGED CAGER CAGES CAGOT CAHOW CAIDS CAINS CAIRD CAJON CAJUN CAKED CAKES CAKEY CALFS CALID CALIF CALIX CALKS CALLA CALLS CALMS CALMY CALOS CALPA CALPS CALVE CALYX CAMAN CAMAS CAMES CAMIS CAMOS CAMPI CAMPO CAMPS CAMPY CAMUS CANED CANEH CANER CANES CANGS CANID CANNA CANNS CANSO CANST CANTO CANTS CANTY CAPAS CAPED CAPES CAPEX CAPHS CAPIZ CAPLE CAPON CAPOS CAPOT CAPRI CAPUL CARAP CARBO CARBS CARBY CARDI CARDS CARDY CARED CARER CARES CARET CAREX CARKS CARLE CARLS CARNS CARNY CAROB CAROM CARON CARPI CARPS CARRS CARSE CARTA CARTE CARTS CARVY CASAS CASCO CASED CASES CASKS CASKY CASTS CASUS CATES CAUDA CAUKS CAULD CAULS CAUMS CAUPS CAURI CAUSA CAVAS CAVED CAVEL CAVER CAVES CAVIE CAWED CAWKS CAXON CEAZE CEBID CECAL CECUM CEDED CEDER CEDES CEDIS CEIBA CEILI CEILS CELEB CELLA CELLI CELLS CELOM CELTS CENSE CENTO CENTS CENTU CEORL CEPES CERCI CERED CERES CERGE CERIA CERIC CERNE CEROC CEROS CERTS CERTY CESSE CESTA CESTI CETES CETYL CEZVE CHACE CHACK CHACO CHADO CHADS CHAFT CHAIS CHALS CHAMS CHANA CHANG CHANK CHAPE CHAPS CHAPT CHARA CHARE CHARK CHARR CHARS CHARY CHATS CHAVE CHAVS CHAWK CHAWS CHAYA CHAYS CHEEP CHEFS CHEKA CHELA CHELP CHEMO CHEMS CHERE CHERT CHETH CHEVY CHEWS CHEWY CHIAO CHIAS CHIBS CHICA CHICH CHICO CHICS CHIEL CHIKS CHILE CHIMB CHIMO CHIMP CHINE CHING CHINK CHINO CHINS CHIPS CHIRK CHIRL CHIRM CHIRO CHIRR CHIRT CHIRU CHITS CHIVE CHIVS CHIVY CHIZZ CHOCO CHOCS CHODE CHOGS CHOIL CHOKO CHOKY CHOLA CHOLI CHOLO CHOMP CHONS CHOOF CHOOK CHOOM CHOON CHOPS CHOTA CHOTT CHOUT CHOUX CHOWK CHOWS CHUBS CHUFA CHUFF CHUGS CHUMS CHURL CHURR CHUSE CHUTS CHYLE CHYME CHYND CIBOL CIDED CIDES CIELS CIGGY CILIA CILLS CIMAR CIMEX CINCT CINES CINQS CIONS CIPPI CIRCS CIRES CIRLS CIRRI CISCO CISSY CISTS CITAL CITED CITER CITES CIVES CIVET CIVIE CIVVY CLACH CLADE CLADS CLAES CLAGS CLAME CLAMS CLANS CLAPS CLAPT CLARO CLART CLARY CLAST CLATS CLAUT CLAVE CLAVI CLAWS CLAYS CLECK CLEEK CLEEP CLEFS CLEGS CLEIK CLEMS CLEPE CLEPT CLEVE CLEWS CLIED CLIES CLIFT CLIME CLINE CLINT CLIPE CLIPS CLIPT CLITS CLOAM CLODS CLOFF CLOGS CLOKE CLOMB CLOMP CLONK CLONS CLOOP CLOOT CLOPS CLOTE CLOTS CLOUR CLOUS CLOWS CLOYE CLOYS CLOZE CLUBS CLUES CLUEY CLUNK CLYPE CNIDA COACT COADY COALA COALS COALY COAPT COARB COATE COATI COATS COBBS COBBY COBIA COBLE COBZA COCAS COCCI COCCO COCKS COCKY COCOS CODAS CODEC CODED CODEN CODER CODES CODEX CODON COEDS COFFS COGIE COGON COGUE COHAB COHEN COHOE COHOG COHOS COIFS COIGN COILS COINS COIRS COITS COKED COKES COLAS COLBY COLDS COLED COLES COLEY COLIC COLIN COLLS COLLY COLOG COLTS COLZA COMAE COMAL COMAS COMBE COMBI COMBO COMBS COMBY COMER COMES COMIX COMMO COMMS COMMY COMPO COMPS COMPT COMTE COMUS CONED CONES CONEY CONFS CONGA CONGE CONGO CONIA CONIN CONKS CONKY CONNE CONNS CONTE CONTO CONUS CONVO COOCH COOED COOEE COOER COOEY COOFS COOKS COOKY COOLS COOLY COOMB COOMS COOMY COONS COOPS COOPT COOST COOTS COOZE COPAL COPAY COPED COPEN COPER COPES COPPY COPRA COPSY COQUI CORAM CORBE CORBY CORDS CORED CORES COREY CORGI CORIA CORKS CORKY CORMS CORNI CORNO CORNS CORNU CORPS CORSE CORSO COSEC COSED COSES COSET COSEY COSIE COSTA COSTE COSTS COTAN COTED COTES COTHS COTTA COTTS COUDE COUPS COURB COURD COURE COURS COUTA COUTH COVED COVES COVIN COWAL COWAN COWED COWKS COWLS COWPS COWRY COXAE COXAL COXED COXES COXIB COYAU COYED COYER COYPU COZED COZEN COZES COZEY COZIE CRAAL CRABS CRAGS CRAIC CRAIG CRAKE CRAME CRAMS CRANS CRAPE CRAPS CRAPY CRARE CRAWS CRAYS CREDS CREEL CREES CREMS CRENA CREPS CREPY CREWE CREWS CRIAS CRIBS CRIES CRIMS CRINE CRIOS CRIPE CRIPS CRISE CRITH CRITS CROCI CROCS CROFT CROGS CROMB CROME CRONK CRONS CROOL CROON CROPS CRORE CROST CROUT CROWS CROZE CRUCK CRUDO CRUDS CRUDY CRUES CRUET CRUFT CRUNK CRUOR CRURA CRUSE CRUSY CRUVE CRWTH CRYER CTENE CUBBY CUBEB CUBED CUBER CUBES CUBIT CUDDY CUFFO CUFFS CUIFS CUING CUISH CUITS CUKES CULCH CULET CULEX CULLS CULLY CULMS CULPA CULTI CULTS CULTY CUMEC CUNDY CUNEI CUNIT CUNTS CUPEL CUPID CUPPA CUPPY CURAT CURBS CURCH CURDS CURDY CURED CURER CURES CURET CURFS CURIA CURIE CURLI CURLS CURNS CURNY CURRS CURSI CURST CUSEC CUSHY CUSKS CUSPS CUSPY CUSSO CUSUM CUTCH CUTER CUTES CUTEY CUTIN CUTIS CUTTO CUTTY CUTUP CUVEE CUZES CWTCH CYANO CYANS CYCAD CYCAS CYCLO CYDER CYLIX CYMAE CYMAR CYMAS CYMES CYMOL CYSTS CYTES CYTON CZARS DAALS DABBA DACES DACHA DACKS DADAH DADAS DADOS DAFFS DAFFY DAGGA DAGGY DAGOS DAHLS DAIKO DAINE DAINT DAKER DALED DALES DALIS DALLE DALTS DAMAN DAMAR DAMES DAMME DAMNS DAMPS DAMPY DANCY DANGS DANIO DANKS DANNY DANTS DARAF DARBS DARCY DARED DARER DARES DARGA DARGS DARIC DARIS DARKS DARKY DARNS DARRE DARTS DARZI DASHI DASHY DATAL DATED DATER DATES DATOS DATTO DAUBE DAUBS DAUBY DAUDS DAULT DAURS DAUTS DAVEN DAVIT DAWAH DAWDS DAWED DAWEN DAWKS DAWNS DAWTS DAYAN DAYCH DAYNT DAZED DAZER DAZES DEADS DEAIR DEALS DEANS DEARE DEARN DEARS DEARY DEASH DEAVE DEAWS DEAWY DEBAG DEBBY DEBEL DEBES DEBTS DEBUD DEBUR DEBUS DEBYE DECAD DECAF DECAN DECKO DECKS DECOS DEDAL DEEDS DEEDY DEELY DEEMS DEENS DEEPS DEERE DEERS DEETS DEEVE DEEVS DEFAT DEFFO DEFIS DEFOG DEGAS DEGUM DEGUS DEICE DEIDS DEIFY DEILS DEISM DEIST DEKED DEKES DEKKO DELED DELES DELFS DELFT DELIS DELLS DELLY DELOS DELPH DELTS DEMAN DEMES DEMIC DEMIT DEMOB DEMOI DEMOS DEMPT DENAR DENAY DENCH DENES DENET DENIS DENTS DEOXY DERAT DERAY DERED DERES DERIG DERMA DERMS DERNS DERNY DEROS DERRO DERRY DERTH DERVS DESEX DESHI DESIS DESKS DESSE DEVAS DEVEL DEVIS DEVON DEVOS DEVOT DEWAN DEWAR DEWAX DEWED DEXES DEXIE DHABA DHAKS DHALS DHIKR DHOBI DHOLE DHOLL DHOLS DHOTI DHOWS DHUTI DIACT DIALS DIANE DIAZO DIBBS DICED DICER DICES DICHT DICKS DICKY DICOT DICTA DICTS DICTY DIDDY DIDIE DIDOS DIDST DIEBS DIELS DIENE DIETS DIFFS DIGHT DIKAS DIKED DIKER DIKES DIKEY DILDO DILLI DILLS DIMBO DIMER DIMES DIMPS DINAR DINED DINES DINGE DINGS DINIC DINKS DINKY DINNA DINOS DINTS DIOLS DIOTA DIPPY DIPSO DIRAM DIRER DIRKE DIRKS DIRLS DIRTS DISAS DISCI DISCS DISHY DISKS DISME DITAL DITAS DITED DITES DITSY DITTS DITZY DIVAN DIVAS DIVED DIVES DIVIS DIVNA DIVOS DIVOT DIVVY DIWAN DIXIE DIXIT DIYAS DIZEN DJINN DJINS DOABS DOATS DOBBY DOBES DOBIE DOBLA DOBRA DOBRO DOCHT DOCKS DOCOS DOCUS DODDY DODOS DOEKS DOERS DOEST DOETH DOFFS DOGAN DOGES DOGEY DOGGO DOGGY DOGIE DOHYO DOILT DOILY DOITS DOJOS DOLCE DOLCI DOLED DOLES DOLIA DOLLS DOLMA DOLOR DOLOS DOLTS DOMAL DOMED DOMES DOMIC DONAH DONAS DONEE DONER DONGA DONGS DONKO DONNA DONNE DONNY DONSY DOOBS DOOCE DOODY DOOKS DOOLE DOOLS DOOLY DOOMS DOOMY DOONA DOORN DOORS DOOZY DOPAS DOPED DOPER DOPES DORAD DORBA DORBS DOREE DORES DORIC DORIS DORKS DORKY DORMS DORMY DORPS DORRS DORSA DORSE DORTS DORTY DOSAI DOSAS DOSED DOSEH DOSER DOSES DOSHA DOTAL DOTED DOTER DOTES DOTTY DOUAR DOUCE DOUCS DOUKS DOULA DOUMA DOUMS DOUPS DOURA DOUSE DOUTS DOVED DOVEN DOVER DOVES DOVIE DOWAR DOWDS DOWED DOWER DOWIE DOWLE DOWLS DOWLY DOWNA DOWNS DOWPS DOWSE DOWTS DOXED DOXES DOXIE DOYEN DOYLY DOZED DOZER DOZES DRABS DRACK DRACO DRAFF DRAGS DRAIL DRAMS DRANT DRAPS DRATS DRAVE DRAWS DRAYS DREAR DRECK DREED DREER DREES DREGS DREKS DRENT DRERE DREST DREYS DRIBS DRICE DRIES DRILY DRIPS DRIPT DROID DROIL DROKE DROLE DROME DRONY DROOB DROOG DROOK DROPS DROPT DROUK DROWS DRUBS DRUGS DRUMS DRUPE DRUSE DRUSY DRUXY DRYAD DRYAS DSOBO DSOMO DUADS DUALS DUANS DUARS DUBBO DUCAL DUCAT DUCES DUCKS DUCKY DUCTS DUDDY DUDED DUDES DUELS DUETS DUETT DUFFS DUFUS DUING DUITS DUKAS DUKED DUKES DUKKA DULCE DULES DULIA DULLS DULSE DUMAS DUMBO DUMBS DUMKA DUMKY DUMPS DUNAM DUNCH DUNES DUNGS DUNGY DUNKS DUNNO DUNNY DUNSH DUNTS DUOMI DUOMO DUPED DUPER DUPES DUPLE DUPLY DUPPY DURAL DURAS DURED DURES DURGY DURNS DUROC DUROS DUROY DURRA DURRS DURRY DURST DURUM DURZI DUSKS DUSTS DUXES DWAAL DWALE DWALM DWAMS DWANG DWAUM DWEEB DWILE DWINE DYADS DYERS DYKED DYKES DYKEY DYKON DYNEL DYNES DZHOS EAGRE EALED EALES EANED EARDS EARED EARLS EARNS EARNT EARST EASED EASER EASES EASLE EASTS EATHE EAVED EAVES EBBED EBBET EBONS EBOOK ECADS ECHED ECHES ECHOS ECRUS EDEMA EDGED EDGER EDGES EDILE EDITS EDUCE EDUCT EEJIT EENSY EEVEN EEVNS EFFED EGADS EGERS EGEST EGGAR EGGED EGGER EGMAS EHING EIDER EIDOS EIGNE EIKED EIKON EILDS EISEL EJIDO EKKAS ELAIN ELAND ELANS ELCHI ELDIN ELEMI ELFED ELIAD ELINT ELMEN ELOGE ELOGY ELOIN ELOPS ELPEE ELSIN ELUTE ELVAN ELVEN ELVER ELVES EMACS EMBAR EMBAY EMBOG EMBOW EMBOX EMBUS EMEER EMEND EMERG EMERY EMEUS EMICS EMIRS EMITS EMMAS EMMER EMMET EMMEW EMMYS EMOJI EMONG EMOTE EMOVE EMPTS EMULE EMURE EMYDE EMYDS ENARM ENATE ENDED ENDER ENDEW ENDUE ENEWS ENFIX ENIAC ENLIT ENMEW ENNOG ENOKI ENOLS ENORM ENOWS ENROL ENSEW ENSKY ENTIA ENURE ENURN ENVOI ENZYM EORLS EOSIN EPACT EPEES EPHAH EPHAS EPHOD EPHOR EPICS EPODE EPOPT EPRIS EQUES EQUID ERBIA EREVS ERGON ERGOS ERGOT ERHUS ERICA ERICK ERICS ERING ERNED ERNES EROSE ERRED ERSES ERUCT ERUGO ERUVS ERVEN ERVIL ESCAR ESCOT ESILE ESKAR ESKER ESNES ESSES ESTOC ESTOP ESTRO ETAGE ETAPE ETATS ETENS ETHAL ETHNE ETHYL ETICS ETNAS ETTIN ETTLE ETUIS ETWEE ETYMA EUGHS EUKED EUPAD EUROS EUSOL EVENS EVERT EVETS EVHOE EVILS EVITE EVOHE EWERS EWEST EWHOW EWKED EXAMS EXEAT EXECS EXEEM EXEME EXFIL EXIES EXINE EXING EXITS EXODE EXOME EXONS EXPAT EXPOS EXUDE EXULS EXURB EYASS EYERS EYOTS EYRAS EYRES EYRIE EYRIR EZINE FABBY FACED FACER FACES FACIA FACTA FACTS FADDY FADED FADER FADES FADGE FADOS FAENA FAERY FAFFS FAFFY FAGGY FAGIN FAGOT FAIKS FAILS FAINE FAINS FAIRS FAKED FAKER FAKES FAKEY FAKIE FAKIR FALAJ FALLS FAMED FAMES FANAL FANDS FANES FANGA FANGO FANGS FANKS FANON FANOS FANUM FAQIR FARAD FARCI FARCY FARDS FARED FARER FARES FARLE FARLS FARMS FAROS FARRO FARSE FARTS FASCI FASTI FASTS FATED FATES FATLY FATSO FATWA FAUGH FAULD FAUNS FAURD FAUTS FAUVE FAVAS FAVEL FAVER FAVES FAVUS FAWNS FAWNY FAXED FAXES FAYED FAYER FAYNE FAYRE FAZED FAZES FEALS FEARE FEARS FEART FEASE FEATS FEAZE FECES FECHT FECIT FECKS FEDEX FEEBS FEEDS FEELS FEENS FEERS FEESE FEEZE FEHME FEINT FEIST FELCH FELID FELLS FELLY FELTS FELTY FEMAL FEMES FEMMY FENDS FENDY FENIS FENKS FENNY FENTS FEODS FEOFF FERER FERES FERIA FERLY FERMI FERMS FERNS FERNY FESSE FESTA FESTS FESTY FETAS FETED FETES FETOR FETTA FETTS FETWA FEUAR FEUDS FEUED FEYED FEYER FEYLY FEZES FEZZY FIARS FIATS FIBRO FICES FICHE FICHU FICIN FICOS FIDES FIDGE FIDOS FIEFS FIENT FIERE FIERS FIEST FIFED FIFER FIFES FIFIS FIGGY FIGOS FIKED FIKES FILAR FILCH FILED FILES FILII FILKS FILLE FILLO FILLS FILMI FILMS FILOS FILUM FINCA FINDS FINED FINES FINIS FINKS FINNY FINOS FIORD FIQHS FIQUE FIRED FIRER FIRES FIRIE FIRKS FIRMS FIRNS FIRRY FIRTH FISCS FISKS FISTS FISTY FITCH FITLY FITNA FITTE FITTS FIVER FIVES FIXED FIXES FIXIT FJELD FLABS FLAFF FLAGS FLAKS FLAMM FLAMS FLAMY FLANE FLANS FLAPS FLARY FLATS FLAVA FLAWN FLAWS FLAWY FLAXY FLAYS FLEAM FLEAS FLEEK FLEER FLEES FLEGS FLEME FLEUR FLEWS FLEXI FLEXO FLEYS FLICS FLIED FLIES FLIMP FLIMS FLIPS FLIRS FLISK FLITE FLITS FLITT FLOBS FLOCS FLOES FLOGS FLONG FLOPS FLORS FLORY FLOSH FLOTA FLOTE FLOWS FLUBS FLUED FLUES FLUEY FLUKY FLUMP FLUOR FLURR FLUTY FLUYT FLYBY FLYPE FLYTE FOALS FOAMS FOEHN FOGEY FOGIE FOGLE FOGOU FOHNS FOIDS FOILS FOINS FOLDS FOLEY FOLIA FOLIC FOLIE FOLKS FOLKY FOMES FONDA FONDS FONDU FONES FONLY FONTS FOODS FOODY FOOLS FOOTS FOOTY FORAM FORBS FORBY FORDO FORDS FOREL FORES FOREX FORKS FORKY FORME FORMS FORTS FORZA FORZE FOSSA FOSSE FOUAT FOUDS FOUER FOUET FOULE FOULS FOUNT FOURS FOUTH FOVEA FOWLS FOWTH FOXED FOXES FOXIE FOYLE FOYNE FRABS FRACK FRACT FRAGS FRAIM FRANC FRAPE FRAPS FRASS FRATE FRATI FRATS FRAUS FRAYS FREES FREET FREIT FREMD FRENA FREON FRERE FRETS FRIBS FRIER FRIES FRIGS FRISE FRIST FRITH FRITS FRITT FRIZE FRIZZ FROES FROGS FRONS FRORE FRORN FRORY FROSH FROWS FROWY FRUGS FRUMP FRUSH FRUST FRYER FUBAR FUBBY FUBSY FUCKS FUCUS FUDDY FUDGY FUELS FUERO FUFFS FUFFY FUGAL FUGGY FUGIE FUGIO FUGLE FUGLY FUGUS FUJIS FULLS FUMED FUMER FUMES FUMET FUNDI FUNDS FUNDY FUNGO FUNGS FUNKS FURAL FURAN FURCA FURLS FUROL FURRS FURTH FURZE FURZY FUSED FUSEE FUSEL FUSES FUSIL FUSKS FUSTS FUSTY FUTON FUZED FUZEE FUZES FUZIL FYCES FYKED FYKES FYLES FYRDS FYTTE GABBA GABBY GABLE GADDI GADES GADGE GADID GADIS GADJE GADJO GADSO GAFFS GAGED GAGER GAGES GAIDS GAINS GAIRS GAITA GAITS GAITT GAJOS GALAH GALAS GALAX GALEA GALED GALES GALLS GALLY GALOP GALUT GALVO GAMAS GAMAY GAMBA GAMBE GAMBO GAMBS GAMED GAMES GAMEY GAMIC GAMIN GAMME GAMMY GAMPS GANCH GANDY GANEF GANEV GANGS GANJA GANOF GANTS GAOLS GAPED GAPER GAPES GAPOS GAPPY GARBE GARBO GARBS GARDA GARES GARIS GARMS GARNI GARRE GARTH GARUM GASES GASPS GASPY GASTS GATCH GATED GATER GATES GATHS GATOR GAUCH GAUCY GAUDS GAUJE GAULT GAUMS GAUMY GAUPS GAURS GAUSS GAUZY GAVOT GAWCY GAWDS GAWKS GAWPS GAWSY GAYAL GAZAL GAZAR GAZED GAZES GAZON GAZOO GEALS GEANS GEARE GEARS GEATS GEBUR GECKS GEEKS GEEPS GEEST GEIST GEITS GELDS GELEE GELID GELLY GELTS GEMEL GEMMA GEMMY GEMOT GENAL GENAS GENES GENET GENIC GENII GENIP GENNY GENOA GENOM GENRO GENTS GENTY GENUA GENUS GEODE GEOID GERAH GERBE GERES GERLE GERMS GERMY GERNE GESSE GESSO GESTE GESTS GETAS GETUP GEUMS GEYAN GEYER GHAST GHATS GHAUT GHAZI GHEES GHEST GHYLL GIBED GIBEL GIBER GIBES GIBLI GIBUS GIFTS GIGAS GIGHE GIGOT GIGUE GILAS GILDS GILET GILLS GILLY GILPY GILTS GIMEL GIMME GIMPS GIMPY GINCH GINGE GINGS GINKS GINNY GINZO GIPON GIPPO GIPPY GIRDS GIRLS GIRNS GIRON GIROS GIRRS GIRSH GIRTS GISMO GISMS GISTS GITCH GITES GIUST GIVED GIVES GIZMO GLACE GLADS GLADY GLAIK GLAIR GLAMS GLANS GLARY GLAUM GLAUR GLAZY GLEBA GLEBE GLEBY GLEDE GLEDS GLEED GLEEK GLEES GLEET GLEIS GLENS GLENT GLEYS GLIAL GLIAS GLIBS GLIFF GLIFT GLIKE GLIME GLIMS GLISK GLITS GLITZ GLOAM GLOBI GLOBS GLOBY GLODE GLOGG GLOMS GLOOP GLOPS GLOST GLOUT GLOWS GLOZE GLUED GLUER GLUES GLUEY GLUGS GLUME GLUMS GLUON GLUTE GLUTS GNARL GNARR GNARS GNATS GNAWN GNAWS GNOWS GOADS GOAFS GOALS GOARY GOATS GOATY GOBAN GOBAR GOBBI GOBBO GOBBY GOBIS GOBOS GODET GODSO GOELS GOERS GOEST GOETH GOETY GOFER GOFFS GOGGA GOGOS GOIER GOJIS GOLDS GOLDY GOLES GOLFS GOLPE GOLPS GOMBO GOMER GOMPA GONCH GONEF GONGS GONIA GONIF GONKS GONNA GONOF GONYS GONZO GOOBY GOODS GOOFS GOOGS GOOKS GOOKY GOOLD GOOLS GOOLY GOONS GOONY GOOPS GOOPY GOORS GOORY GOOSY GOPAK GOPIK GORAL GORAS GORED GORES GORIS GORMS GORMY GORPS GORSE GORSY GOSHT GOSSE GOTCH GOTHS GOTHY GOTTA GOUCH GOUKS GOURA GOUTS GOUTY GOWAN GOWDS GOWFS GOWKS GOWLS GOWNS GOXES GOYIM GOYLE GRAAL GRABS GRADS GRAFF GRAIP GRAMA GRAME GRAMP GRAMS GRANA GRANS GRAPY GRAVS GRAYS GREBE GREBO GRECE GREEK GREES GREGE GREGO GREIN GRENS GRESE GREVE GREWS GREYS GRICE GRIDE GRIDS GRIFF GRIFT GRIGS GRIKE GRINS GRIOT GRIPS GRIPT GRIPY GRISE GRIST GRISY GRITH GRITS GRIZE GROAT GRODY GROGS GROKS GROMA GRONE GROOF GROSZ GROTS GROUF GROVY GROWS GRRLS GRRRL GRUBS GRUED GRUES GRUFE GRUME GRUMP GRUND GRYCE GRYDE GRYKE GRYPE GRYPT GUACO GUANA GUANO GUANS GUARS GUCKS GUCKY GUDES GUFFS GUGAS GUIDS GUIMP GUIRO GULAG GULAR GULAS GULES GULET GULFS GULFY GULLS GULPH GULPS GULPY GUMMA GUMMI GUMPS GUNDY GUNGE GUNGY GUNKS GUNKY GUNNY GUQIN GURDY GURGE GURLS GURLY GURNS GURRY GURSH GURUS GUSHY GUSLA GUSLE GUSLI GUSSY GUSTS GUTSY GUTTA GUTTY GUYED GUYLE GUYOT GUYSE GWINE GYALS GYANS GYBED GYBES GYELD GYMPS GYNAE GYNIE GYNNY GYNOS GYOZA GYPOS GYPPO GYPPY GYRAL GYRED GYRES GYRON GYROS GYRUS GYTES GYVED GYVES HAAFS HAARS HABLE HABUS HACEK HACKS HADAL HADED HADES HADJI HADST HAEMS HAETS HAFFS HAFIZ HAFTS HAGGS HAHAS HAICK HAIKA HAIKS HAIKU HAILS HAILY HAINS HAINT HAIRS HAITH HAJES HAJIS HAJJI HAKAM HAKAS HAKEA HAKES HAKIM HAKUS HALAL HALED HALER HALES HALFA HALFS HALID HALLO HALLS HALMA HALMS HALON HALOS HALSE HALTS HALVA HALWA HAMAL HAMBA HAMED HAMES HAMMY HAMZA HANAP HANCE HANCH HANDS HANGI HANGS HANKS HANKY HANSA HANSE HANTS HAOLE HAOMA HAPAX HAPLY HAPPI HAPUS HARAM HARDS HARED HARES HARIM HARKS HARLS HARMS HARNS HAROS HARPS HARTS HASHY HASKS HASPS HASTA HATED HATES HATHA HAUDS HAUFS HAUGH HAULD HAULM HAULS HAULT HAUNS HAUSE HAVER HAVES HAWED HAWKS HAWMS HAWSE HAYED HAYER HAYEY HAYLE HAZAN HAZED HAZER HAZES HEADS HEALD HEALS HEAME HEAPS HEAPY HEARE HEARS HEAST HEATS HEBEN HEBES HECHT HECKS HEDER HEDGY HEEDS HEEDY HEELS HEEZE HEFTE HEFTS HEIDS HEIGH HEILS HEIRS HEJAB HEJRA HELED HELES HELIO HELLS HELMS HELOS HELOT HELPS HELVE HEMAL HEMES HEMIC HEMIN HEMPS HEMPY HENCH HENDS HENGE HENNA HENNY HENRY HENTS HEPAR HERBS HERBY HERDS HERES HERLS HERMA HERMS HERNS HEROS HERRY HERSE HERTZ HERYE HESPS HESTS HETES HETHS HEUCH HEUGH HEVEA HEWED HEWER HEWGH HEXAD HEXED HEXER HEXES HEXYL HEYED HIANT HICKS HIDED HIDER HIDES HIEMS HIGHS HIGHT HIJAB HIJRA HIKED HIKER HIKES HIKOI HILAR HILCH HILLO HILLS HILTS HILUM HILUS HIMBO HINAU HINDS HINGS HINKY HINNY HINTS HIOIS HIPLY HIRED HIREE HIRER HIRES HISSY HISTS HITHE HIVED HIVER HIVES HIZEN HOAED HOAGY HOARS HOARY HOAST HOBOS HOCKS HOCUS HODAD HODJA HOERS HOGAN HOGEN HOGGS HOGHS HOHED HOICK HOIED HOIKS HOING HOISE HOKAS HOKED HOKES HOKEY HOKIS HOKKU HOKUM HOLDS HOLED HOLES HOLEY HOLKS HOLLA HOLLO HOLME HOLMS HOLON HOLOS HOLTS HOMAS HOMED HOMES HOMEY HOMIE HOMME HOMOS HONAN HONDA HONDS HONED HONER HONES HONGI HONGS HONKS HONKY HOOCH HOODS HOODY HOOEY HOOFS HOOKA HOOKS HOOKY HOOLY HOONS HOOPS HOORD HOORS HOOSH HOOTS HOOTY HOOVE HOPAK HOPED HOPER HOPES HOPPY HORAH HORAL HORAS HORIS HORKS HORME HORNS HORST HORSY HOSED HOSEL HOSEN HOSER HOSES HOSEY HOSTA HOSTS HOTCH HOTEN HOTTY HOUFF HOUFS HOUGH HOURI HOURS HOUTS HOVEA HOVED HOVEN HOVES HOWBE HOWES HOWFF HOWFS HOWKS HOWLS HOWRE HOWSO HOXED HOXES HOYAS HOYED HOYLE HUBBY HUCKS HUDNA HUDUD HUERS HUFFS HUFFY HUGER HUGGY HUHUS HUIAS HULAS HULES HULKS HULKY HULLO HULLS HULLY HUMAS HUMFS HUMIC HUMPS HUMPY HUNKS HUNTS HURDS HURLS HURLY HURRA HURST HURTS HUSHY HUSKS HUSOS HUTIA HUZZA HUZZY HWYLS HYDRA HYENS HYGGE HYING HYKES HYLAS HYLEG HYLES HYLIC HYMNS HYNDE HYOID HYPED HYPES HYPHA HYPHY HYPOS HYRAX HYSON HYTHE IAMBI IAMBS IBRIK ICERS ICHED ICHES ICHOR ICIER ICKER ICKLE ICONS ICTAL ICTIC ICTUS IDANT IDEAS IDEES IDENT IDLED IDLES IDOLA IDOLS IDYLS IFTAR IGAPO IGGED IGLUS IHRAM IKANS IKATS IKONS ILEAC ILEAL ILEUM ILEUS ILIAD ILIAL ILIUM ILLER ILLTH IMAGO IMAMS IMARI IMAUM IMBAR IMBED IMIDE IMIDO IMIDS IMINE IMINO IMMEW IMMIT IMMIX IMPED IMPIS IMPOT IMPRO IMSHI IMSHY INAPT INARM INBYE INCEL INCLE INCOG INCUS INCUT INDEW INDIA INDIE INDOL INDOW INDRI INDUE INERM INFIX INFOS INFRA INGAN INGLE INION INKED INKER INKLE INNED INNIT INORB INRUN INSET INSPO INTEL INTIL INTIS INTRA INULA INURE INURN INUST INVAR INWIT IODIC IODID IODIN IOTAS IPPON IRADE IRIDS IRING IRKED IROKO IRONE IRONS ISBAS ISHES ISLED ISLES ISNAE ISSEI ISTLE ITEMS ITHER IVIED IVIES IXIAS IXNAY IXORA IXTLE IZARD IZARS IZZAT JAAPS JABOT JACAL JACKS JACKY JADED JADES JAFAS JAFFA JAGAS JAGER JAGGS JAGGY JAGIR JAGRA JAILS JAKER JAKES JAKEY JALAP JALOP JAMBE JAMBO JAMBS JAMBU JAMES JAMMY JAMON JANES JANNS JANNY JANTY JAPAN JAPED JAPER JAPES JARKS JARLS JARPS JARTA JARUL JASEY JASPE JASPS JATOS JAUKS JAUPS JAVAS JAVEL JAWAN JAWED JAXIE JEANS JEATS JEBEL JEDIS JEELS JEELY JEEPS JEERS JEEZE JEFES JEFFS JEHAD JEHUS JELAB JELLO JELLS JEMBE JEMMY JENNY JEONS JERID JERKS JERRY JESSE JESTS JESUS JETES JETON JEUNE JEWED JEWIE JHALA JIAOS JIBBA JIBBS JIBED JIBER JIBES JIFFS JIGGY JIGOT JIHAD JILLS JILTS JIMMY JIMPY JINGO JINKS JINNE JINNI JINNS JIRDS JIRGA JIRRE JISMS JIVED JIVER JIVES JIVEY JNANA JOBED JOBES JOCKO JOCKS JOCKY JOCOS JODEL JOEYS JOHNS JOINS JOKED JOKES JOKEY JOKOL JOLED JOLES JOLLS JOLTS JOLTY JOMON JOMOS JONES JONGS JONTY JOOKS JORAM JORUM JOTAS JOTTY JOTUN JOUAL JOUGS JOUKS JOULE JOURS JOWAR JOWED JOWLS JOWLY JOYED JUBAS JUBES JUCOS JUDAS JUDGY JUDOS JUGAL JUGUM JUJUS JUKED JUKES JUKUS JULEP JUMAR JUMBY JUMPS JUNCO JUNKS JUNKY JUPES JUPON JURAL JURAT JUREL JURES JUSTS JUTES JUTTY JUVES JUVIE KAAMA KABAB KABAR KABOB KACHA KACKS KADAI KADES KADIS KAFIR KAGOS KAGUS KAHAL KAIAK KAIDS KAIES KAIFS KAIKA KAIKS KAILS KAIMS KAING KAINS KAKAS KAKIS KALAM KALES KALIF KALIS KALPA KAMAS KAMES KAMIK KAMIS KAMME KANAE KANAS KANDY KANEH KANES KANGA KANGS KANJI KANTS KANZU KAONS KAPAS KAPHS KAPOK KAPOW KAPUS CAPUT KARAS KARAT KARKS KARNS KAROO KAROS KARRI KARST KARSY KARTS KARZY KASHA KASME KATAL KATAS KATIS KATTI KAUGH KAURI KAURU KAURY KAVAL KAVAS KAWAS KAWAU KAWED KAYLE KAYOS KAZIS KAZOO KBARS KEBAR KEBOB KECKS KEDGE KEDGY KEECH KEEFS KEEKS KEELS KEEMA KEENO KEENS KEEPS KEETS KEEVE KEFIR KEHUA KEIRS KELEP KELIM KELLS KELLY KELPS KELPY KELTS KELTY KEMBO KEMBS KEMPS KEMPT KEMPY KENAF KENCH KENDO KENOS KENTE KENTS KEPIS KERBS KEREL KERFS KERKY KERMA KERNE KERNS KEROS KERRY KERVE KESAR KESTS KETAS KETCH KETES KETOL KEVEL KEVIL KEXES KEYED KEYER KHADI KHAFS KHANS KHAPH KHATS KHAYA KHAZI KHEDA KHETH KHETS KHOJA KHORS KHOUM KHUDS KIAAT KIACK KIANG KIBBE KIBBI KIBEI KIBES KIBLA KICKS KICKY KIDDO KIDDY KIDEL KIDGE KIEFS KIERS KIEVE KIEVS KIGHT KIKES KIKOI KILEY KILIM KILLS KILNS KILOS KILPS KILTS KILTY KIMBO KINAS KINDA KINDS KINDY KINES KINGS KININ KINKS KINOS KIORE KIPES KIPPA KIPPS KIRBY KIRKS KIRNS KIRRI KISAN KISSY KISTS KITED KITER KITES KITHE KITHS KITUL KIVAS KIWIS KLANG KLAPS KLETT KLICK KLIEG KLIKS KLONG KLOOF KLUGE KLUTZ KNAGS KNAPS KNARL KNARS KNAUR KNAWE KNEES KNELL KNISH KNITS KNIVE KNOBS KNOPS KNOSP KNOTS KNOUT KNOWE KNOWS KNUBS KNURL KNURR KNURS KNUTS KOANS KOAPS KOBAN KOBOS KOELS KOFFS KOFTA KOGAL KOHAS KOHEN KOHLS KOINE KOJIS KOKAM KOKAS KOKER KOKRA KOKUM KOLAS KOLOS KOMBU KONBU KONDO KONKS KOOKS KOOKY KOORI KOPEK KOPHS KOPJE KOPPA KORAI KORAS KORAT KORES KORMA KOROS KORUN KORUS KOSES KOTCH KOTOS KOTOW KOURA KRAAL KRABS KRAFT KRAIS KRAIT KRANG KRANS KRANZ KRAUT KRAYS KREEP KRENG KREWE KRONA KRONE KROON KRUBI KRUNK KSARS KUBIE KUDOS KUDUS KUDZU KUFIS KUGEL KUIAS KUKRI KUKUS KULAK KULAN KULAS KULFI KUMIS KUMYS KURIS KURRE KURTA KURUS KUSSO KUTAS KUTCH KUTIS KUTUS KUZUS KVASS KVELL KWELA KYACK KYAKS KYANG KYARS KYATS KYBOS KYDST KYLES KYLIE KYLIN KYLIX KYLOE KYNDE KYNDS KYPES KYRIE KYTES KYTHE LAARI LABDA LABIA LABIS LABRA LACED LACER LACES LACET LACEY LACKS LADDY LADED LADER LADES LAERS LAEVO LAGAN LAHAL LAHAR LAICH LAICS LAIDS LAIGH LAIKA LAIKS LAIRD LAIRS LAIRY LAITH LAITY LAKED LAKER LAKES LAKHS LAKIN LAKSA LALDY LALLS LAMAS LAMBS LAMBY LAMED LAMER LAMES LAMIA LAMMY LAMPS LANAI LANAS LANCH LANDE LANDS LANES LANKS LANTS LAPIN LAPIS LAPJE LARCH LARDS LARDY LAREE LARES LARGO LARIS LARKS LARKY LARNS LARNT LARUM LASED LASER LASES LASSI LASSU LASSY LASTS LATAH LATED LATEN LATEX LATHI LATHS LATHY LATKE LATUS LAUAN LAUCH LAUDS LAUFS LAUND LAURA LAVAL LAVAS LAVED LAVER LAVES LAVRA LAVVY LAWED LAWER LAWIN LAWKS LAWNS LAWNY LAXED LAXER LAXES LAXLY LAYED LAYIN LAYUP LAZAR LAZED LAZES LAZOS LAZZI LAZZO LEADS LEADY LEAFS LEAKS LEAMS LEANS LEANY LEAPS LEARE LEARS LEARY LEATS LEAVY LEAZE LEBEN LECCY LEDES LEDGY LEDUM LEEAR LEEKS LEEPS LEERS LEESE LEETS LEEZE LEFTE LEFTS LEGER LEGES LEGGE LEGGO LEGIT LEHRS LEHUA LEIRS LEISH LEMAN LEMED LEMEL LEMES LEMMA LEMME LENDS LENES LENGS LENIS LENOS LENSE LENTI LENTO LEONE LEPID LEPRA LEPTA LERED LERES LERPS LESBO LESES LESTS LETCH LETHE LETUP LEUCH LEUCO LEUDS LEUGH LEVAS LEVEE LEVES LEVIN LEVIS LEWIS LEXES LEXIS LEZES LEZZA LEZZY LIANA LIANE LIANG LIARD LIARS LIART LIBER LIBRA LIBRI LICHI LICHT LICIT LICKS LIDAR LIDOS LIEFS LIENS LIERS LIEUS LIEVE LIFER LIFES LIFTS LIGAN LIGER LIGGE LIGNE LIKED LIKER LIKES LIKIN LILLS LILOS LILTS LIMAN LIMAS LIMAX LIMBA LIMBI LIMBS LIMBY LIMED LIMEN LIMES LIMEY LIMMA LIMNS LIMOS LIMPA LIMPS LINAC LINCH LINDS LINDY LINED LINES LINEY LINGA LINGS LINGY LININ LINKS LINKY LINNS LINNY LINOS LINTS LINTY LINUM LINUX LIONS LIPAS LIPES LIPIN LIPOS LIPPY LIRAS LIRKS LIROT LISKS LISLE LISPS LISTS LITAI LITAS LITED LITER LITES LITHO LITHS LITRE LIVED LIVEN LIVES LIVOR LIVRE LLANO LOACH LOADS LOAFS LOAMS LOANS LOAST LOAVE LOBAR LOBED LOBES LOBOS LOBUS LOCHE LOCHS LOCIE LOCIS LOCKS LOCOS LOCUM LODEN LODES LOESS LOFTS LOGAN LOGES LOGGY LOGIA LOGIE LOGOI LOGON LOGOS LOHAN LOIDS LOINS LOIPE LOIRS LOKES LOLLS LOLLY LOLOG LOMAS LOMED LOMES LONER LONGA LONGE LONGS LOOBY LOOED LOOEY LOOFA LOOFS LOOIE LOOKS LOOKY LOOMS LOONS LOONY LOOPS LOORD LOOTS LOPED LOPER LOPES LOPPY LORAL LORAN LORDS LORDY LOREL LORES LORIC LORIS LOSED LOSEL LOSEN LOSES LOSSY LOTAH LOTAS LOTES LOTIC LOTOS LOTSA LOTTA LOTTE LOTTO LOTUS LOUED LOUGH LOUIE LOUIS LOUMA LOUND LOUNS LOUPE LOUPS LOURE LOURS LOURY LOUTS LOVAT LOVED LOVES LOVEY LOVIE LOWAN LOWED LOWES LOWND LOWNE LOWNS LOWPS LOWRY LOWSE LOWTS LOXED LOXES LOZEN LUACH LUAUS LUBED LUBES LUBRA LUCES LUCKS LUCRE LUDES LUDIC LUDOS LUFFA LUFFS LUGED LUGER LUGES LULLS LULUS LUMAS LUMBI LUMME LUMMY LUMPS LUNAS LUNES LUNET LUNGI LUNGS LUNKS LUNTS LUPIN LURED LURER LURES LUREX LURGI LURGY LURKS LURRY LURVE LUSER LUSHY LUSKS LUSTS LUSUS LUTEA LUTED LUTER LUTES LUVVY LUXED LUXER LUXES LWEIS LYAMS LYARD LYART LYASE LYCEA LYCEE LYCRA LYMES LYNES LYRES LYSED LYSES LYSIN LYSIS LYSOL LYSSA LYTED LYTES LYTHE LYTIC LYTTA MAAED MAARE MAARS MABES MACAS MACED MACER MACES MACHE MACHI MACHS MACKS MACLE MACON MADGE MADID MADRE MAERL MAFIC MAGES MAGGS MAGOT MAGUS MAHOE MAHUA MAHWA MAIDS MAIKO MAIKS MAILE MAILL MAILS MAIMS MAINS MAIRE MAIRS MAISE MAIST MAKAR MAKES MAKIS MAKOS MALAM MALAR MALAS MALAX MALES MALIC MALIK MALIS MALLS MALMS MALMY MALTS MALTY MALUS MALVA MALWA MAMAS MAMBA MAMEE MAMEY MAMIE MANAS MANAT MANDI MANEB MANED MANEH MANES MANET MANGS MANIS MANKY MANNA MANOS MANSE MANTA MANTO MANTY MANUL MANUS MAPAU MAQUI MARAE MARAH MARAS MARCS MARDY MARES MARGE MARGS MARIA MARID MARKA MARKS MARLE MARLS MARLY MARMS MARON MAROR MARRA MARRI MARSE MARTS MARVY MASAS MASED MASER MASES MASHY MASKS MASSA MASSY MASTS MASTY MASUS MATAI MATED MATER MATES MATHS MATIN MATLO MATTE MATTS MATZA MATZO MAUBY MAUDS MAULS MAUND MAURI MAUSY MAUTS MAUZY MAVEN MAVIE MAVIN MAVIS MAWED MAWKS MAWKY MAWNS MAWRS MAXED MAXES MAXIS MAYAN MAYAS MAYED MAYOS MAYST MAZED MAZER MAZES MAZEY MAZUT MBIRA MEADS MEALS MEANE MEANS MEANY MEARE MEASE MEATH MEATS MEBOS MECHS MECKS MEDII MEDLE MEEDS MEERS MEETS MEFFS MEINS MEINT MEINY MEITH MEKKA MELAS MELBA MELDS MELIC MELIK MELLS MELTS MELTY MEMES MEMOS MENAD MENDS MENED MENES MENGE MENGS MENSA MENSE MENSH MENTA MENTO MENUS MEOUS MEOWS MERCH MERCS MERDE MERED MEREL MERER MERES MERIL MERIS MERKS MERLE MERLS MERSE MESAL MESAS MESEL MESES MESHY MESIC MESNE MESON MESSY MESTO METED METES METHO METHS METIC METIF METIS METOL METRE MEUSE MEVED MEVES MEWED MEWLS MEYNT MEZES MEZZE MEZZO MHORR MIAOU MIAOW MIASM MIAUL MICAS MICHE MICHT MICKS MICKY MICOS MICRA MIDDY MIDGY MIDIS MIENS MIEVE MIFFS MIFFY MIFTY MIGGS MIHAS MIHIS MIKED MIKES MIKRA MIKVA MILCH MILDS MILER MILES MILFS MILIA MILKO MILKS MILLE MILLS MILOR MILOS MILPA MILTS MILTY MILTZ MIMED MIMEO MIMER MIMES MIMSY MINAE MINAR MINAS MINCY MINDS MINED MINES MINGE MINGS MINGY MINIS MINKE MINKS MINNY MINOS MINTS MIRED MIRES MIREX MIRID MIRIN MIRKS MIRKY MIRLY MIROS MIRVS MIRZA MISCH MISDO MISES MISGO MISOS MISSA MISTS MISTY MITCH MITER MITES MITIS MITRE MITTS MIXED MIXEN MIXER MIXES MIXTE MIXUP MIZEN MIZZY MNEME MOANS MOATS MOBBY MOBES MOBEY MOBIE MOBLE MOCHI MOCHS MOCHY MOCKS MODER MODES MODGE MODII MODUS MOERS MOFOS MOGGY MOHEL MOHOS MOHRS MOHUA MOHUR MOILE MOILS MOIRA MOIRE MOITS MOJOS MOKES MOKIS MOKOS MOLAL MOLAS MOLDS MOLED MOLES MOLLA MOLLS MOLLY MOLTO MOLTS MOLYS MOMES MOMMA MOMMY MOMUS MONAD MONAL MONAS MONDE MONDO MONER MONGO MONGS MONIC MONIE MONKS MONOS MONTE MONTY MOOBS MOOCH MOODS MOOED MOOKS MOOLA MOOLI MOOLS MOOLY MOONG MOONS MOONY MOOPS MOORS MOORY MOOTS MOOVE MOPED MOPER MOPES MOPEY MOPPY MOPSY MOPUS MORAE MORAS MORAT MORAY MOREL MORES MORIA MORNE MORNS MORRA MORRO MORSE MORTS MOSED MOSES MOSEY MOSKS MOSSO MOSTE MOSTS MOTED MOTEN MOTES MOTET MOTEY MOTHS MOTHY MOTIS MOTTE MOTTS MOTTY MOTUS MOTZA MOUCH MOUES MOULD MOULS MOUPS MOUST MOUSY MOVED MOVES MOWAS MOWED MOWRA MOXAS MOXIE MOYAS MOYLE MOYLS MOZED MOZES MOZOS MPRET MUCHO MUCIC MUCID MUCIN MUCKS MUCOR MUCRO MUDGE MUDIR MUDRA MUFFS MUFTI MUGGA MUGGS MUGGY MUHLY MUIDS MUILS MUIRS MUIST MUJIK MULCT MULED MULES MULEY MULGA MULIE MULLA MULLS MULSE MULSH MUMMS MUMPS MUMSY MUMUS MUNGA MUNGE MUNGO MUNGS MUNIS MUNTS MUNTU MUONS MURAS MURED MURES MUREX MURID MURKS MURLS MURLY MURRA MURRE MURRI MURRS MURRY MURTI MURVA MUSAR MUSCA MUSED MUSER MUSES MUSET MUSHA MUSIT MUSKS MUSOS MUSSE MUSSY MUSTH MUSTS MUTCH MUTED MUTER MUTES MUTHA MUTIS MUTON MUTTS MUXED MUXES MUZAK MUZZY MVULE MYALL MYLAR MYNAH MYNAS MYOID MYOMA MYOPE MYOPS MYOPY MYSID MYTHI MYTHS MYTHY MYXOS MZEES NAAMS NAANS NABES NABIS NABKS NABLA NABOB NACHE NACHO NACRE NADAS NAEVE NAEVI NAFFS NAGAS NAGGY NAGOR NAHAL NAIAD NAIFS NAIKS NAILS NAIRA NAIRU NAKED NAKER NAKFA NALAS NALED NALLA NAMED NAMER NAMES NAMMA NAMUS NANAS NANCE NANCY NANDU NANNA NANOS NANUA NAPAS NAPED NAPES NAPOO NAPPA NAPPE NAPPY NARAS NARCO NARCS NARDS NARES NARIC NARIS NARKS NARKY NARRE NASHI NATCH NATES NATIS NATTY NAUCH NAUNT NAVAR NAVES NAVEW NAVVY NAWAB NAZES NAZIR NAZIS NDUJA NEAFE NEALS NEAPS NEARS NEATH NEATS NEBEK NEBEL NECKS NEDDY NEEDS NEELD NEELE NEEMB NEEMS NEEPS NEESE NEEZE NEGRO NEGUS NEIFS NEIST NEIVE NELIS NELLY NEMAS NEMNS NEMPT NENES NEONS NEPER NEPIT NERAL NERDS NERKA NERKS NEROL NERTS NERTZ NERVY NESTS NETES NETOP NETTS NETTY NEUKS NEUME NEUMS NEVEL NEVES NEVUS NEWBS NEWED NEWEL NEWIE NEWSY NEWTS NEXTS NEXUS NGAIO NGANA NGATI NGOMA NGWEE NICAD NICHT NICKS NICOL NIDAL NIDED NIDES NIDOR NIDUS NIEFS NIEVE NIFES NIFFS NIFFY NIFTY NIGER NIGHS NIHIL NIKAB NIKAH NIKAU NILLS NIMBI NIMBS NIMPS NINER NINES NINON NIPAS NIPPY NIQAB NIRLS NIRLY NISEI NISSE NISUS NITER NITES NITID NITON NITRE NITRO NITRY NITTY NIVAL NIXED NIXER NIXES NIXIE NIZAM NKOSI NOAHS NOBBY NOCKS NODAL NODDY NODES NODUS NOELS NOGGS NOHOW NOILS NOILY NOINT NOIRS NOLES NOLLS NOLOS NOMAS NOMEN NOMES NOMIC NOMOI NOMOS NONAS NONCE NONES NONET NONGS NONIS NONNY NONYL NOOBS NOOIT NOOKS NOOKY NOONS NOOPS NOPAL NORIA NORIS NORKS NORMA NORMS NOSED NOSER NOSES NOTAL NOTED NOTER NOTES NOTUM NOULD NOULE NOULS NOUNS NOUNY NOUPS NOVAE NOVAS NOVUM NOWAY NOWED NOWLS NOWTS NOWTY NOXAL NOXES NOYAU NOYED NOYES NUBBY NUBIA NUCHA NUDDY NUDER NUDES NUDIE NUDZH NUFFS NUGAE NUKED NUKES NULLA NULLS NUMBS NUMEN NUMMY NUNNY NURDS NURDY NURLS NURRS NUTSO NUTSY NYAFF NYALA NYING NYSSA OAKED OAKER OAKUM OARED OASES OASIS OASTS OATEN OATER OATHS OAVES OBANG OBEAH OBELI OBEYS OBIAS OBIED OBIIT OBITS OBJET OBOES OBOLE OBOLI OBOLS OCCAM OCHER OCHES OCHRE OCHRY OCKER OCREA OCTAD OCTAN OCTAS OCTYL OCULI ODAHS ODALS ODEON ODEUM ODISM ODIST ODIUM ODORS ODOUR ODYLE ODYLS OFAYS OFFED OFFIE OFLAG OFTER OGAMS OGEED OGEES OGGIN OGHAM OGIVE OGLED OGLER OGLES OGMIC OGRES OHIAS OHING OHMIC OHONE OIDIA OILED OILER OINKS OINTS OJIME OKAPI OKAYS OKEHS OKRAS OKTAS OLDIE OLEIC OLEIN OLENT OLEOS OLEUM OLIOS OLLAS OLLAV OLLER OLLIE OLOGY OLPAE OLPES OMASA OMBER OMBUS OMENS OMERS OMITS OMLAH OMOVS OMRAH ONCER ONCES ONCET ONCUS ONELY ONERS ONERY ONIUM ONKUS ONLAY ONNED ONTIC OOBIT OOHED OOMPH OONTS OOPED OORIE OOSES OOTID OOZED OOZES OPAHS OPALS OPENS OPEPE OPING OPPOS OPSIN OPTED OPTER ORACH ORACY ORALS ORANG ORANT ORATE ORBED ORCAS ORCIN ORDOS OREAD ORFES ORGIA ORGIC ORGUE ORIBI ORIEL ORIXA ORLES ORLON ORLOP ORMER ORNIS ORPIN ORRIS ORTHO ORVAL ORZOS OSCAR OSHAC OSIER OSMIC OSMOL OSSIA OSTIA OTAKU OTARY OTTAR OTTOS OUBIT OUCHT OUENS OUIJA OULKS OUMAS OUNDY OUPAS OUPED OUPHE OUPHS OURIE OUSEL OUSTS OUTBY OUTED OUTRE OUTRO OUTTA OUZEL OUZOS OVALS OVELS OVENS OVERS OVIST OVOLI OVOLO OVULE OWCHE OWIES OWLED OWLER OWLET OWNED OWRES OWRIE OWSEN OXBOW OXERS OXEYE OXIDS OXIES OXIME OXIMS OXLIP OXTER OYERS OZEKI OZZIE PAALS PAANS PACAS PACED PACER PACES PACEY PACHA PACKS PACOS PACTA PACTS PADIS PADLE PADMA PADRE PADRI PAEAN PAEDO PAEON PAGED PAGER PAGES PAGLE PAGOD PAGRI PAIKS PAILS PAINS PAIRE PAIRS PAISA PAISE PAKKA PALAS PALAY PALEA PALED PALES PALET PALIS PALKI PALLA PALLS PALLY PALMS PALMY PALPI PALPS PALSA PAMPA PANAX PANCE PANDA PANDS PANDY PANED PANES PANGA PANGS PANIM PANKO PANNE PANNI PANTO PANTS PANTY PAOLI PAOLO PAPAS PAPAW PAPES PAPPI PAPPY PARAE PARAS PARCH PARDI PARDS PARDY PARED PAREN PAREO PARES PAREU PAREV PARGE PARGO PARIS PARKI PARKS PARKY PARLE PARLY PARMA PAROL PARPS PARRA PARRS PARTI PARTS PARVE PARVO PASEO PASES PASHA PASHM PASKA PASPY PASSE PASTS PATED PATEN PATER PATES PATHS PATIN PATKA PATLY PATTE PATUS PAUAS PAULS PAVAN PAVED PAVEN PAVER PAVES PAVID PAVIN PAVIS PAWAS PAWAW PAWED PAWER PAWKS PAWKY PAWLS PAWNS PAXES PAYED PAYOR PAYSD PEAGE PEAGS PEAKS PEAKY PEALS PEANS PEARE PEARS PEART PEASE PEATS PEATY PEAVY PEAZE PEBAS PECHS PECKE PECKS PECKY PEDES PEDIS PEDRO PEECE PEEKS PEELS PEENS PEEOY PEEPE PEEPS PEERS PEERY PEEVE PEGGY PEGHS PEINS PEISE PEIZE PEKAN PEKES PEKIN PEKOE PELAS PELAU PELES PELFS PELLS PELMA PELON PELTA PELTS PENDS PENDU PENED PENES PENGO PENIE PENIS PENKS PENNA PENNI PENTS PEONS PEONY PEPLA PEPOS PEPPY PEPSI PERAI PERCE PERCS PERDU PERDY PEREA PERES PERIS PERKS PERMS PERNS PEROG PERPS PERRY PERSE PERST PERTS PERVE PERVO PERVS PERVY PESOS PESTS PESTY PETAR PETER PETIT PETRE PETRI PETTI PETTO PEWEE PEWIT PEYSE PHAGE PHANG PHARE PHARM PHEER PHENE PHEON PHESE PHIAL PHISH PHIZZ PHLOX PHOCA PHONO PHONS PHOTS PHPHT PHUTS PHYLA PHYLE PIANI PIANS PIBAL PICAL PICAS PICCY PICKS PICOT PICRA PICUL PIEND PIERS PIERT PIETA PIETS PIEZO PIGHT PIGMY PIING PIKAS PIKAU PIKED PIKER PIKES PIKEY PIKIS PIKUL PILAE PILAF PILAO PILAR PILAU PILAW PILCH PILEA PILED PILEI PILER PILES PILIS PILLS PILOW PILUM PILUS PIMAS PIMPS PINAS PINED PINES PINGO PINGS PINKO PINKS PINNA PINNY PINON PINOT PINTA PINTS PINUP PIONS PIONY PIOUS PIOYE PIOYS PIPAL PIPAS PIPED PIPES PIPET PIPIS PIPIT PIPPY PIPUL PIRAI PIRLS PIRNS PIROG PISCO PISES PISKY PISOS PISSY PISTE PITAS PITHS PITON PITOT PITTA PIUMS PIXES PIZED PIZES PLAAS PLACK PLAGE PLANS PLAPS PLASH PLASM PLAST PLATS PLATT PLATY PLAYA PLAYS PLEAS PLEBE PLEBS PLENA PLEON PLESH PLEWS PLICA PLIES PLIMS PLING PLINK PLOAT PLODS PLONG PLONK PLOOK PLOPS PLOTS PLOTZ PLOUK PLOWS PLOYE PLOYS PLUES PLUFF PLUGS PLUMS PLUMY PLUOT PLUTO PLYER POACH POAKA POAKE POBOY POCKS POCKY PODAL PODDY PODEX PODGE PODGY PODIA POEMS POEPS POETS POGEY POGGE POGOS POHED POILU POIND POKAL POKED POKES POKEY POKIE POLED POLER POLES POLEY POLIO POLIS POLJE POLKS POLLS POLLY POLOS POLTS POLYS POMBE POMES POMMY POMOS POMPS PONCE PONCY PONDS PONES PONEY PONGA PONGO PONGS PONGY PONKS PONTS PONTY PONZU POODS POOED POOFS POOFY POOHS POOJA POOKA POOKS POOLS POONS POOPS POOPY POORI POORT POOTS POOVE POOVY POPES POPPA POPSY PORAE PORAL PORED PORER PORES PORGE PORGY PORIN PORKS PORKY PORNO PORNS PORNY PORTA PORTS PORTY POSED POSES POSEY POSHO POSTS POTAE POTCH POTED POTES POTIN POTOO POTSY POTTO POTTS POTTY POUFF POUFS POUKE POUKS POULE POULP POULT POUPE POUPT POURS POUTS POWAN POWIN POWND POWNS POWNY POWRE POXED POXES POYNT POYOU POYSE POZZY PRAAM PRADS PRAHU PRAMS PRANA PRANG PRAOS PRASE PRATE PRATS PRATT PRATY PRAUS PRAYS PREDY PREED PREES PREIF PREMS PREMY PRENT PREON PREOP PREPS PRESA PRESE PREST PREVE PREXY PREYS PRIAL PRICY PRIEF PRIER PRIES PRIGS PRILL PRIMA PRIMI PRIMP PRIMS PRIMY PRINK PRION PRISE PRISS PROAS PROBS PRODS PROEM PROFS PROGS PROIN PROKE PROLE PROLL PROMO PROMS PRONK PROPS PRORE PROSO PROSS PROST PROSY PROTO PROUL PROWS PROYN PRUNT PRUTA PRYER PRYSE PSEUD PSHAW PSION PSOAE PSOAI PSOAS PSORA PSYCH PSYOP PUBCO PUBES PUBIS PUCAN PUCER PUCES PUCKA PUCKS PUDDY PUDGE PUDIC PUDOR PUDSY PUDUS PUERS PUFFA PUFFS PUGGY PUGIL PUHAS PUJAH PUJAS PUKAS PUKED PUKER PUKES PUKEY PUKKA PUKUS PULAO PULAS PULED PULER PULES PULIK PULIS PULKA PULKS PULLI PULLS PULLY PULMO PULPS PULUS PUMAS PUMIE PUMPS PUNAS PUNCE PUNGA PUNGS PUNJI PUNKA PUNKS PUNKY PUNNY PUNTO PUNTS PUNTY PUPAE PUPAS PUPUS PURDA PURED PURES PURIN PURIS PURLS PURPY PURRS PURSY PURTY PUSES PUSLE PUSSY PUTID PUTON PUTTI PUTTO PUTTS PUZEL PWNED PYATS PYETS PYGAL PYINS PYLON PYNED PYNES PYOID PYOTS PYRAL PYRAN PYRES PYREX PYRIC PYROS PYXED PYXES PYXIE PYXIS PZAZZ QADIS QAIDS QAJAQ QANAT QAPIK QIBLA QOPHS QORMA QUADS QUAFF QUAGS QUAIR QUAIS QUAKY QUALE QUANT QUARE QUASS QUATE QUATS QUAYD QUAYS QUBIT QUEAN QUEME QUENA QUERN QUEYN QUEYS QUICH QUIDS QUIFF QUIMS QUINA QUINE QUINO QUINS QUINT QUIPO QUIPS QUIPU QUIRE QUIRT QUIST QUITS QUOAD QUODS QUOIF QUOIN QUOIT QUOLL QUONK QUOPS QURSH QUYTE RABAT RABIC RABIS RACED RACES RACHE RACKS RACON RADGE RADIX RADON RAFFS RAFTS RAGAS RAGDE RAGED RAGEE RAGER RAGES RAGGA RAGGS RAGGY RAGIS RAGUS RAHED RAHUI RAIAS RAIDS RAIKS RAILE RAILS RAINE RAINS RAIRD RAITA RAITS RAJAS RAJES RAKED RAKEE RAKER RAKES RAKIA RAKIS RAKUS RALES RAMAL RAMEE RAMET RAMIE RAMIN RAMIS RAMMY RAMPS RAMUS RANAS RANCE RANDS RANEE RANGA RANGI RANGS RANGY RANID RANIS RANKE RANKS RANTS RAPED RAPER RAPES RAPHE RAPPE RARED RAREE RARES RARKS RASED RASER RASES RASPS RASSE RASTA RATAL RATAN RATAS RATCH RATED RATEL RATER RATES RATHA RATHE RATHS RATOO RATOS RATUS RAUNS RAUPO RAVED RAVEL RAVER RAVES RAVEY RAVIN RAWER RAWIN RAWLY RAWNS RAXED RAXES RAYAH RAYAS RAYED RAYLE RAYNE RAZED RAZEE RAZER RAZES RAZOO READD READS REAIS REAKS REALO REALS REAME REAMS REAMY REANS REAPS REARS REAST REATA REATE REAVE REBBE REBEC REBID REBIT REBOP REBUY RECAL RECCE RECCO RECCY RECIT RECKS RECON RECTA RECTI RECTO REDAN REDDS REDDY REDED REDES REDIA REDID REDIP REDLY REDON REDOS REDOX REDRY REDUB REDUX REDYE REECH REEDE REEDS REEFS REEFY REEKS REEKY REELS REENS REEST REEVE REFED REFEL REFFO REFIS REFIX REFLY REFRY REGAR REGES REGGO REGIE REGMA REGNA REGOS REGUR REHEM REIFS REIFY REIKI REIKS REINK REINS REIRD REIST REIVE REJIG REJON REKED REKES REKEY RELET RELIE RELIT RELLO REMAN REMAP REMEN REMET REMEX REMIX RENAY RENDS RENEY RENGA RENIG RENIN RENNE RENOS RENTE RENTS REOIL REORG REPEG REPIN REPLA REPOS REPOT REPPS REPRO RERAN RERIG RESAT RESAW RESAY RESEE RESES RESEW RESID RESIT RESOD RESOW RESTO RESTS RESTY RESUS RETAG RETAX RETEM RETIA RETIE RETOX REVET REVIE REWAN REWAX REWED REWET REWIN REWON REWTH REXES REZES RHEAS RHEME RHEUM RHIES RHIME RHINE RHODY RHOMB RHONE RHUMB RHYNE RHYTA RIADS RIALS RIANT RIATA RIBAS RIBBY RIBES RICED RICER RICES RICEY RICHT RICIN RICKS RIDES RIDGY RIDIC RIELS RIEMS RIEVE RIFER RIFFS RIFTE RIFTS RIFTY RIGGS RIGOL RILED RILES RILEY RILLE RILLS RIMAE RIMED RIMER RIMES RIMUS RINDS RINDY RINES RINGS RINKS RIOJA RIOTS RIPED RIPES RIPPS RISES RISHI RISKS RISPS RISUS RITES RITTS RITZY RIVAS RIVED RIVEL RIVEN RIVES RIYAL RIZAS ROADS ROAMS ROANS ROARS ROARY ROATE ROBED ROBES ROBLE ROCKS RODED RODES ROGUY ROHES ROIDS ROILS ROILY ROINS ROIST ROJAK ROJIS ROKED ROKER ROKES ROLAG ROLES ROLFS ROLLS ROMAL ROMAN ROMEO ROMPS RONDE RONDO RONEO RONES RONIN RONNE RONTE RONTS ROODS ROOFS ROOFY ROOKS ROOKY ROOMS ROONS ROOPS ROOPY ROOSA ROOSE ROOTS ROOTY ROPED ROPER ROPES ROPEY ROQUE RORAL RORES RORIC RORID RORIE RORTS RORTY ROSED ROSES ROSET ROSHI ROSIN ROSIT ROSTI ROSTS ROTAL ROTAN ROTAS ROTCH ROTED ROTES ROTIS ROTLS ROTON ROTOS ROTTE ROUEN ROUES ROULE ROULS ROUMS ROUPS ROUPY ROUST ROUTH ROUTS ROVED ROVEN ROVES ROWAN ROWED ROWEL ROWEN ROWIE ROWME ROWND ROWTH ROWTS ROYNE ROYST ROZET ROZIT RUANA RUBAI RUBBY RUBEL RUBES RUBIN RUBLE RUBLI RUBUS RUCHE RUCKS RUDAS RUDDS RUDES RUDIE RUDIS RUEDA RUERS RUFFE RUFFS RUGAE RUGAL RUGGY RUING RUINS RUKHS RULED RULES RUMAL RUMBO RUMEN RUMES RUMLY RUMMY RUMPO RUMPS RUMPY RUNCH RUNDS RUNED RUNES RUNGS RUNIC RUNNY RUNTS RUNTY RUPIA RURPS RURUS RUSAS RUSES RUSHY RUSKS RUSMA RUSSE RUSTS RUTHS RUTIN RUTTY RYALS RYBAT RYKED RYKES RYMME RYNDS RYOTS RYPER SAAGS SABAL SABED SABER SABES SABHA SABIN SABIR SABLE SABOT SABRA SABRE SACKS SACRA SADDO SADES SADHE SADHU SADIS SADOS SADZA SAFED SAFES SAGAS SAGER SAGES SAGGY SAGOS SAGUM SAHEB SAHIB SAICE SAICK SAICS SAIDS SAIGA SAILS SAIMS SAINE SAINS SAIRS SAIST SAITH SAJOU SAKAI SAKER SAKES SAKIA SAKIS SAKTI SALAL SALAT SALEP SALES SALET SALIC SALIX SALLE SALMI SALOL SALOP SALPA SALPS SALSE SALTO SALTS SALUE SALUT SAMAN SAMAS SAMBA SAMBO SAMEK SAMEL SAMEN SAMES SAMEY SAMFU SAMMY SAMPI SAMPS SANDS SANED SANES SANGA SANGH SANGO SANGS SANKO SANSA SANTO SANTS SAOLA SAPAN SAPID SAPOR SARAN SARDS SARED SAREE SARGE SARGO SARIN SARIS SARKS SARKY SAROD SAROS SARUS SASER SASIN SASSE SATAI SATAY SATED SATEM SATES SATIS SAUBA SAUCH SAUGH SAULS SAULT SAUNT SAURY SAUTS SAVED SAVER SAVES SAVEY SAVIN SAWAH SAWED SAWER SAXES SAYED SAYER SAYID SAYNE SAYON SAYST SAZES SCABS SCADS SCAFF SCAGS SCAIL SCALA SCALL SCAMS SCAND SCANS SCAPA SCAPE SCAPI SCARP SCARS SCART SCATH SCATS SCATT SCAUD SCAUP SCAUR SCAWS SCEAT SCENA SCEND SCHAV SCHMO SCHUL SCHWA SCLIM SCODY SCOGS SCOOG SCOOT SCOPA SCOPS SCOTS SCOUG SCOUP SCOWP SCOWS SCRAB SCRAE SCRAG SCRAN SCRAT SCRAW SCRAY SCRIM SCRIP SCROB SCROD SCROG SCROW SCUDI SCUDO SCUDS SCUFF SCUFT SCUGS SCULK SCULL SCULP SCULS SCUMS SCUPS SCURF SCURS SCUSE SCUTA SCUTE SCUTS SCUZZ SCYES SDAYN SDEIN SEALS SEAME SEAMS SEAMY SEANS SEARE SEARS SEASE SEATS SEAZE SEBUM SECCO SECHS SECTS SEDER SEDES SEDGE SEDGY SEDUM SEEDS SEEKS SEELD SEELS SEELY SEEMS SEEPS SEEPY SEERS SEFER SEGAR SEGNI SEGNO SEGOL SEGOS SEHRI SEIFS SEILS SEINE SEIRS SEISE SEISM SEITY SEIZA SEKOS SEKTS SELAH SELES SELFS SELLA SELLE SELLS SELVA SEMEE SEMES SEMIE SEMIS SENAS SENDS SENES SENGI SENNA SENOR SENSA SENSI SENTE SENTI SENTS SENVY SENZA SEPAD SEPAL SEPIC SEPOY SEPTA SEPTS SERAC SERAI SERAL SERED SERER SERES SERFS SERGE SERIC SERIN SERKS SERON SEROW SERRA SERRE SERRS SERRY SERVO SESEY SESSA SETAE SETAL SETON SETTS SEWAN SEWAR SEWED SEWEL SEWEN SEWIN SEXED SEXER SEXES SEXTO SEXTS SEYEN SHADS SHAGS SHAHS SHAKO SHAKT SHALM SHALY SHAMA SHAMS SHAND SHANS SHAPS SHARN SHASH SHAUL SHAWM SHAWN SHAWS SHAYA SHAYS SHCHI SHEAF SHEAL SHEAS SHEDS SHEEL SHEND SHENT SHEOL SHERD SHERE SHERO SHETS SHEVA SHEWN SHEWS SHIAI SHIEL SHIER SHIES SHILL SHILY SHIMS SHINS SHIPS SHIRR SHIRS SHISH SHISO SHIST SHITE SHITS SHIUR SHIVA SHIVE SHIVS SHLEP SHLUB SHMEK SHMOE SHOAT SHOED SHOER SHOES SHOGI SHOGS SHOJI SHOJO SHOLA SHOOL SHOON SHOOS SHOPE SHOPS SHORL SHOTE SHOTS SHOTT SHOWD SHOWS SHOYU SHRED SHRIS SHROW SHTIK SHTUM SHTUP SHULE SHULN SHULS SHUNS SHURA SHUTE SHUTS SHWAS SHYER SIALS SIBBS SIBYL SICES SICHT SICKO SICKS SICKY SIDAS SIDED SIDER SIDES SIDHA SIDHE SIDLE SIELD SIENS SIENT SIETH SIEUR SIFTS SIGHS SIGIL SIGLA SIGNA SIGNS SIJOS SIKAS SIKER SIKES SILDS SILED SILEN SILER SILES SILEX SILKS SILLS SILOS SILTS SILTY SILVA SIMAR SIMAS SIMBA SIMIS SIMPS SIMUL SINDS SINED SINES SINGS SINHS SINKS SINKY SINUS SIPED SIPES SIPPY SIRED SIREE SIRES SIRIH SIRIS SIROC SIRRA SIRUP SISAL SISES SISTA SISTS SITAR SITED SITES SITHE SITKA SITUP SITUS SIVER SIXER SIXES SIXMO SIXTE SIZAR SIZED SIZEL SIZER SIZES SKAGS SKAIL SKALD SKANK SKART SKATS SKATT SKAWS SKEAN SKEAR SKEDS SKEED SKEEF SKEEN SKEER SKEES SKEET SKEGG SKEGS SKEIN SKELF SKELL SKELM SKELP SKENE SKENS SKEOS SKEPS SKERS SKETS SKEWS SKIDS SKIED SKIES SKIEY SKIMO SKIMS SKINK SKINS SKINT SKIOS SKIPS SKIRL SKIRR SKITE SKITS SKIVE SKIVY SKLIM SKOAL SKODY SKOFF SKOGS SKOLS SKOOL SKORT SKOSH SKRAN SKRIK SKUAS SKUGS SKYED SKYER SKYEY SKYFS SKYRE SKYRS SKYTE SLABS SLADE SLAES SLAGS SLAID SLAKE SLAMS SLANE SLANK SLAPS SLART SLATS SLATY SLAWS SLAYS SLEBS SLEDS SLEER SLEWS SLEYS SLIER SLILY SLIMS SLIPE SLIPS SLIPT SLISH SLITS SLIVE SLOAN SLOBS SLOES SLOGS SLOID SLOJD SLOMO SLOOM SLOOT SLOPS SLOPY SLORM SLOTS SLOVE SLOWS SLOYD SLUBB SLUBS SLUED SLUES SLUFF SLUGS SLUIT SLUMS SLURB SLURS SLUSE SLUTS SLYER SLYPE SMAAK SMAIK SMALM SMALT SMARM SMAZE SMEEK SMEES SMEIK SMEKE SMERK SMEWS SMIRR SMIRS SMITS SMOGS SMOKO SMOLT SMOOR SMOOT SMORE SMORG SMOUT SMOWT SMUGS SMURS SMUSH SMUTS SNABS SNAFU SNAGS SNAPS SNARF SNARK SNARS SNARY SNASH SNATH SNAWS SNEAD SNEAP SNEBS SNECK SNEDS SNEED SNEES SNELL SNIBS SNICK SNIES SNIFT SNIGS SNIPS SNIPY SNIRT SNITS SNOBS SNODS SNOEK SNOEP SNOGS SNOKE SNOOD SNOOK SNOOL SNOOT SNOTS SNOWK SNOWS SNUBS SNUGS SNUSH SNYES SOAKS SOAPS SOARE SOARS SOAVE SOBAS SOCAS SOCES SOCKO SOCKS SOCLE SODAS SODDY SODIC SODOM SOFAR SOFAS SOFTA SOFTS SOFTY SOGER SOHUR SOILS SOILY SOJAS SOJUS SOKAH SOKEN SOKES SOKOL SOLAH SOLAN SOLAS SOLDE SOLDI SOLDO SOLDS SOLED SOLEI SOLER SOLES SOLON SOLOS SOLUM SOLUS SOMAN SOMAS SONCE SONDE SONES SONGS SONLY SONNE SONNY SONSE SONSY SOOEY SOOKS SOOKY SOOLE SOOLS SOOMS SOOPS SOOTE SOOTS SOPHS SOPHY SOPOR SOPPY SOPRA SORAL SORAS SORBO SORBS SORDA SORDO SORDS SORED SOREE SOREL SORER SORES SOREX SORGO SORNS SORRA SORTA SORTS SORUS SOTHS SOTOL SOUCE SOUCT SOUGH SOUKS SOULS SOUMS SOUPS SOUPY SOURS SOUSE SOUTS SOWAR SOWCE SOWED SOWFF SOWFS SOWLE SOWLS SOWMS SOWND SOWNE SOWPS SOWSE SOWTH SOYAS SOYLE SOYUZ SOZIN SPACY SPADO SPAED SPAER SPAES SPAGS SPAHI SPAIL SPAIN SPAIT SPAKE SPALD SPALE SPALL SPALT SPAMS SPANE SPANG SPANS SPARD SPARS SPART SPATE SPATS SPAUL SPAWL SPAWS SPAYD SPAYS SPAZA SPAZZ SPEAL SPEAN SPEAT SPECS SPECT SPEEL SPEER SPEIL SPEIR SPEKS SPELD SPELK SPEOS SPETS SPEUG SPEWS SPEWY SPIAL SPICA SPICK SPICS SPIDE SPIER SPIES SPIFF SPIFS SPIKS SPILE SPIMS SPINA SPINK SPINS SPIRT SPIRY SPITS SPITZ SPIVS SPLAY SPLOG SPODE SPODS SPOOM SPOOR SPOOT SPORK SPOSH SPOTS SPRAD SPRAG SPRAT SPRED SPREW SPRIT SPROD SPROG SPRUE SPRUG SPUDS SPUED SPUER SPUES SPUGS SPULE SPUME SPUMY SPURS SPUTA SPYAL SPYRE SQUAB SQUAW SQUEG SQUID SQUIT SQUIZ STABS STADE STAGS STAGY STAIG STANE STANG STAPH STAPS STARN STARR STARS STATS STAUN STAWS STAYS STEAN STEAR STEDD STEDE STEDS STEEK STEEM STEEN STEIL STELA STELE STELL STEME STEMS STEND STENO STENS STENT STEPS STEPT STERE STETS STEWS STEWY STEYS STICH STIED STIES STILB STILE STIME STIMS STIMY STIPA STIPE STIRE STIRK STIRP STIRS STIVE STIVY STOAE STOAI STOAS STOAT STOBS STOEP STOGY STOIT STOLN STOMA STOND STONG STONK STONN STOOK STOOR STOPE STOPS STOPT STOSS STOTS STOTT STOUN STOUP STOUR STOWN STOWP STOWS STRAD STRAE STRAG STRAK STREP STREW STRIA STRIG STRIM STROP STROW STROY STRUM STUBS STUDE STUDS STULL STULM STUMM STUMS STUNS STUPA STUPE STURE STURT STYED STYES STYLI STYLO STYME STYMY STYRE STYTE SUBAH SUBAS SUBBY SUBER SUBHA SUCCI SUCKS SUCKY SUCRE SUDDS SUDOR SUDSY SUEDE SUENT SUERS SUETE SUETS SUETY SUGAN SUGHS SUGOS SUHUR SUIDS SUINT SUITS SUJEE SUKHS SUKUK SULCI SULFA SULFO SULKS SULPH SULUS SUMIS SUMMA SUMOS SUMPH SUMPS SUNIS SUNKS SUNNA SUNNS SUNUP SUPES SUPRA SURAH SURAL SURAS SURAT SURDS SURED SURES SURFS SURFY SURGY SURRA SUSED SUSES SUSUS SUTOR SUTRA SUTTA SWABS SWACK SWADS SWAGE SWAGS SWAIL SWAIN SWALE SWALY SWAMY SWANG SWANK SWANS SWAPS SWAPT SWARD SWARE SWARF SWART SWATS SWAYL SWAYS SWEAL SWEDE SWEED SWEEL SWEER SWEES SWEIR SWELT SWERF SWEYS SWIES SWIGS SWILE SWIMS SWINK SWIPE SWIRE SWISS SWITH SWITS SWIVE SWIZZ SWOBS SWOLE SWOLN SWOPS SWOPT SWOTS SWOUN SYBBE SYBIL SYBOE SYBOW SYCEE SYCES SYCON SYENS SYKER SYKES SYLIS SYLPH SYLVA SYMAR SYNCH SYNCS SYNDS SYNED SYNES SYNTH SYPED SYPES SYPHS SYRAH SYREN SYSOP SYTHE SYVER TAALS TAATA TABER TABES TABID TABIS TABLA TABOR TABUN TABUS TACAN TACES TACET TACHE TACHO TACHS TACKS TACOS TACTS TAELS TAFIA TAGGY TAGMA TAHAS TAHRS TAIGA TAIGS TAIKO TAILS TAINS TAIRA TAISH TAITS TAJES TAKAS TAKES TAKHI TAKIN TAKIS TAKKY TALAK TALAQ TALAR TALAS TALCS TALCY TALEA TALER TALES TALKS TALKY TALLS TALMA TALPA TALUK TALUS TAMAL TAMED TAMES TAMIN TAMIS TAMMY TAMPS TANAS TANGA TANGI TANGS TANHS TANKA TANKS TANKY TANNA TANSY TANTI TANTO TANTY TAPAS TAPED TAPEN TAPES TAPET TAPIS TAPPA TAPUS TARAS TARDO TARED TARES TARGA TARGE TARNS TAROC TAROK TAROS TARPS TARRE TARRY TARSI TARTS TARTY TASAR TASED TASER TASES TASKS TASSA TASSE TASSO TATAR TATER TATES TATHS TATIE TATOU TATTS TATUS TAUBE TAULD TAUON TAUPE TAUTS TAVAH TAVAS TAVER TAWAI TAWAS TAWED TAWER TAWIE TAWSE TAWTS TAXED TAXER TAXES TAXIS TAXOL TAXON TAXOR TAXUS TAYRA TAZZA TAZZE TEADE TEADS TEAED TEAKS TEALS TEAMS TEARS TEATS TEAZE TECHS TECHY TECTA TEELS TEEMS TEEND TEENE TEENS TEENY TEERS TEFFS TEGGS TEGUA TEGUS TEHRS TEIID TEILS TEIND TEINS TELAE TELCO TELES TELEX TELIA TELIC TELLS TELLY TELOI TELOS TEMED TEMES TEMPI TEMPS TEMPT TEMSE TENCH TENDS TENDU TENES TENGE TENIA TENNE TENNO TENNY TENON TENTS TENTY TENUE TEPAL TEPAS TEPOY TERAI TERAS TERCE TEREK TERES TERFE TERFS TERGA TERMS TERNE TERNS TERRY TERTS TESLA TESTA TESTE TESTS TETES TETHS TETRA TETRI TEUCH TEUGH TEWED TEWEL TEWIT TEXAS TEXES TEXTS THACK THAGI THAIM THALE THALI THANA THANE THANG THANS THANX THARM THARS THAWS THAWY THEBE THECA THEED THEEK THEES THEGN THEIC THEIN THELF THEMA THENS THEOW THERM THESP THETE THEWS THEWY THIGS THILK THILL THINE THINS THIOL THIRL THOFT THOLE THOLI THORO THORP THOUS THOWL THRAE THRAW THRID THRIP THROE THUDS THUGS THUJA THUNK THURL THUYA THYMI THYMY TIANS TIARS TICAL TICCA TICED TICES TICHY TICKS TICKY TIDDY TIDED TIDES TIERS TIFFS TIFOS TIFTS TIGES TIGON TIKAS TIKES TIKIS TIKKA TILAK TILED TILER TILES TILLS TILLY TILTH TILTS TIMBO TIMED TIMES TIMON TIMPS TINAS TINCT TINDS TINEA TINED TINES TINGE TINGS TINKS TINNY TINTS TINTY TIPIS TIPPY TIRED TIRES TIRLS TIROS TIRRS TITCH TITER TITIS TITRE TITTY TITUP TIYIN TIYNS TIZES TIZZY TOADS TOADY TOAZE TOCKS TOCKY TOCOS TODDE TOEAS TOFFS TOFFY TOFTS TOFUS TOGAE TOGAS TOGED TOGES TOGUE TOHOS TOILE TOILS TOING TOISE TOITS TOKAY TOKED TOKER TOKES TOKOS TOLAN TOLAR TOLAS TOLED TOLES TOLLS TOLLY TOLTS TOLUS TOLYL TOMAN TOMBS TOMES TOMIA TOMMY TOMOS TONDI TONDO TONED TONER TONES TONEY TONGS TONKA TONKS TONNE TONUS TOOLS TOOMS TOONS TOOTS TOPED TOPEE TOPEK TOPER TOPES TOPHE TOPHI TOPHS TOPIS TOPOI TOPOS TOPPY TOQUE TORAH TORAN TORAS TORCS TORES TORIC TORII TOROS TOROT TORRS TORSE TORSI TORSK TORTA TORTE TORTS TOSAS TOSED TOSES TOSHY TOSSY TOTED TOTER TOTES TOTTY TOUKS TOUNS TOURS TOUSE TOUSY TOUTS TOUZE TOUZY TOWED TOWIE TOWNS TOWNY TOWSE TOWSY TOWTS TOWZE TOWZY TOYED TOYER TOYON TOYOS TOZED TOZES TOZIE TRABS TRADS TRAGI TRAIK TRAMS TRANK TRANQ TRANS TRANT TRAPE TRAPS TRAPT TRASS TRATS TRATT TRAVE TRAYF TRAYS TRECK TREED TREEN TREES TREFA TREIF TREKS TREMA TREMS TRESS TREST TRETS TREWS TREYF TREYS TRIAC TRIDE TRIER TRIES TRIFF TRIGO TRIGS TRIKE TRILD TRILL TRIMS TRINE TRINS TRIOL TRIOR TRIOS TRIPS TRIPY TRIST TROAD TROAK TROAT TROCK TRODE TRODS TROGS TROIS TROKE TROMP TRONA TRONC TRONE TRONK TRONS TROOZ TROTH TROTS TROWS TROYS TRUED TRUES TRUGO TRUGS TRULL TRYER TRYKE TRYMA TRYPS TSADE TSADI TSARS TSKED TSUBA TSUBO TUANS TUART TUATH TUBAE TUBAR TUBAS TUBBY TUBED TUBES TUCKS TUFAS TUFFE TUFFS TUFTS TUFTY TUGRA TUILE TUINA TUISM TUKTU TULES TULPA TULSI TUMID TUMMY TUMPS TUMPY TUNAS TUNDS TUNED TUNER TUNES TUNGS TUNNY TUPEK TUPIK TUPLE TUQUE TURDS TURFS TURFY TURKS TURME TURMS TURNS TURNT TURPS TURRS TUSHY TUSKS TUSKY TUTEE TUTTI TUTTY TUTUS TUXES TUYER TWAES TWAIN TWALS TWANK TWATS TWAYS TWEEL TWEEN TWEEP TWEER TWERK TWERP TWIER TWIGS TWILL TWILT TWINK TWINS TWINY TWIRE TWIRP TWITE TWITS TWOER TWYER TYEES TYERS TYIYN TYKES TYLER TYMPS TYNDE TYNED TYNES TYPAL TYPED TYPES TYPEY TYPIC TYPOS TYPPS TYPTO TYRAN TYRED TYRES TYROS TYTHE TZARS UDALS UDONS UGALI UGGED UHLAN UHURU UKASE ULAMA ULANS ULEMA ULMIN ULNAD ULNAE ULNAR ULNAS ULPAN ULVAS ULYIE ULZIE UMAMI UMBEL UMBER UMBLE UMBOS UMBRE UMIAC UMIAK UMIAQ UMMAH UMMAS UMMED UMPED UMPHS UMPIE UMPTY UMRAH UMRAS UNAIS UNAPT UNARM UNARY UNAUS UNBAG UNBAN UNBAR UNBED UNBID UNBOX UNCAP UNCES UNCIA UNCOS UNCOY UNCUS UNDAM UNDEE UNDOS UNDUG UNETH UNFIX UNGAG UNGET UNGOD UNGOT UNGUM UNHAT UNHIP UNICA UNITS UNJAM UNKED UNKET UNKID UNLAW UNLAY UNLED UNLET UNLID UNMAN UNMEW UNMIX UNPAY UNPEG UNPEN UNPIN UNRED UNRID UNRIG UNRIP UNSAW UNSAY UNSEE UNSEW UNSEX UNSOD UNTAX UNTIN UNWET UNWIT UNWON UPBOW UPBYE UPDOS UPDRY UPEND UPJET UPLAY UPLED UPLIT UPPED UPRAN UPRUN UPSEE UPSEY UPTAK UPTER UPTIE URAEI URALI URAOS URARE URARI URASE URATE URBEX URBIA URDEE UREAL UREAS UREDO UREIC URENA URENT URGED URGER URGES URIAL URITE URMAN URNAL URNED URPED URSAE URSID URSON URUBU URVAS USERS USNEA USQUE USURE USURY UTERI UVEAL UVEAS UVULA VACUA VADED VADES VAGAL VAGUS VAILS VAIRE VAIRS VAIRY VAKAS VAKIL VALES VALIS VALSE VAMPS VAMPY VANDA VANED VANES VANGS VANTS VAPED VAPER VAPES VARAN VARAS VARDY VAREC VARES VARIA VARIX VARNA VARUS VARVE VASAL VASES VASTS VASTY VATIC VATUS VAUCH VAUTE VAUTS VAWTE VAXES VEALE VEALS VEALY VEENA VEEPS VEERS VEERY VEGAS VEGES VEGIE VEGOS VEHME VEILS VEILY VEINS VEINY VELAR VELDS VELDT VELES VELLS VELUM VENAE VENAL VENDS VENDU VENEY VENGE VENIN VENTS VENUS VERBS VERRA VERRY VERST VERTS VERTU VESPA VESTA VESTS VETCH VEXED VEXER VEXES VEXIL VEZIR VIALS VIAND VIBES VIBEX VIBEY VICED VICES VICHY VIERS VIEWS VIEWY VIFDA VIFFS VIGAS VIGIA VILDE VILER VILLI VILLS VIMEN VINAL VINAS VINCA VINED VINER VINES VINEW VINIC VINOS VINTS VIOLD VIOLS VIRED VIREO VIRES VIRGA VIRGE VIRID VIRLS VIRTU VISAS VISED VISES VISIE VISNE VISON VISTO VITAE VITAS VITEX VITRO VITTA VIVAS VIVAT VIVDA VIVER VIVES VIZIR VIZOR VLEIS VLIES VLOGS VOARS VOCAB VOCES VODDY VODOU VODUN VOEMA VOGIE VOIDS VOILE VOIPS VOLAE VOLAR VOLED VOLES VOLET VOLKS VOLTA VOLTE VOLTI VOLTS VOLVA VOLVE VOMER VOTED VOTES VOUGE VOULU VOWED VOWER VOXEL VOZHD VRAIC VRILS VROOM VROUS VROUW VROWS VUGGS VUGGY VUGHS VUGHY VULGO VULNS VULVA VUTTY WAACS WACKE WACKO WACKS WADDS WADDY WADED WADER WADES WADGE WADIS WADTS WAFFS WAFTS WAGED WAGES WAGGA WAGYU WAHOO WAIDE WAIFS WAIFT WAILS WAINS WAIRS WAITE WAITS WAKAS WAKED WAKEN WAKER WAKES WAKFS WALDO WALDS WALED WALER WALES WALIE WALIS WALKS WALLA WALLS WALLY WALTY WAMED WAMES WAMUS WANDS WANED WANES WANEY WANGS WANKS WANKY WANLE WANLY WANNA WANTS WANTY WANZE WAQFS WARBS WARBY WARDS WARED WARES WAREZ WARKS WARMS WARNS WARPS WARRE WARST WARTS WASES WASHY WASMS WASPS WASPY WASTS WATAP WATTS WAUFF WAUGH WAUKS WAULK WAULS WAURS WAVED WAVES WAVEY WAWAS WAWES WAWLS WAXED WAXER WAXES WAYED WAZIR WAZOO WEALD WEALS WEAMB WEANS WEARS WEBBY WEBER WECHT WEDEL WEDGY WEEDS WEEKE WEEKS WEELS WEEMS WEENS WEENY WEEPS WEEPY WEEST WEETE WEETS WEFTE WEFTS WEIDS WEILS WEIRS WEISE WEIZE WEKAS WELDS WELKE WELKS WELKT WELLS WELLY WELTS WEMBS WENDS WENGE WENNY WENTS WEROS WERSH WESTS WETAS WETLY WEXED WEXES WHAMO WHAMS WHANG WHAPS WHARE WHATA WHATS WHAUP WHAUR WHEAL WHEAR WHEEN WHEEP WHEFT WHELK WHELM WHENS WHETS WHEWS WHEYS WHIDS WHIFT WHIGS WHILK WHIMS WHINS WHIOS WHIPS WHIPT WHIRR WHIRS WHISH WHISS WHIST WHITS WHITY WHIZZ WHOMP WHOOF WHOOT WHOPS WHORE WHORL WHORT WHOSO WHOWS WHUMP WHUPS WHYDA WICCA WICKS WICKY WIDDY WIDES WIELS WIFED WIFES WIFEY WIFIE WIFTY WIGAN WIGGA WIGGY WIKIS WILCO WILDS WILED WILES WILGA WILIS WILJA WILLS WILTS WIMPS WINDS WINED WINES WINEY WINGE WINGS WINGY WINKS WINNA WINNS WINOS WINZE WIPED WIPER WIPES WIRED WIRER WIRES WIRRA WISED WISES WISHA WISHT WISPS WISTS WITAN WITED WITES WITHE WITHS WITHY WIVED WIVER WIVES WIZEN WIZES WOADS WOALD WOCKS WODGE WOFUL WOJUS WOKER WOKKA WOLDS WOLFS WOLLY WOLVE WOMBS WOMBY WOMYN WONGA WONGI WONKS WONKY WONTS WOODS WOOED WOOFS WOOFY WOOLD WOOLS WOONS WOOPS WOOPY WOOSE WOOSH WOOTZ WORDS WORKS WORMS WORMY WORTS WOWED WOWEE WOXEN WRANG WRAPS WRAPT WRAST WRATE WRAWL WRENS WRICK WRIED WRIER WRIES WRITS WROKE WROOT WROTH WRYER WUDDY WUDUS WULLS WURST WUSES WUSHU WUSSY WUXIA WYLED WYLES WYNDS WYNNS WYTED WYTES XEBEC XENIA XENIC XENON XERIC XEROX XERUS XOANA XRAYS XYLAN XYLEM XYLIC XYLOL XYLYL XYSTI XYSTS YAARS YABAS YABBA YABBY YACCA YACKA YACKS YAFFS YAGER YAGES YAGIS YAHOO YAIRD YAKKA YAKOW YALES YAMEN YAMPY YAMUN YANGS YANKS YAPOK YAPON YAPPS YAPPY YARAK YARCO YARDS YARER YARFA YARKS YARNS YARRS YARTA YARTO YATES YAUDS YAULD YAUPS YAWED YAWEY YAWLS YAWNS YAWNY YAWPS YBORE YCLAD YCLED YCOND YDRAD YDRED YEADS YEAHS YEALM YEANS YEARD YEARS YECCH YECHS YECHY YEDES YEEDS YEESH YEGGS YELKS YELLS YELMS YELPS YELTS YENTA YENTE YERBA YERDS YERKS YESES YESKS YESTS YESTY YETIS YETTS YEUKS YEUKY YEVEN YEVES YEWEN YEXED YEXES YFERE YIKED YIKES YILLS YINCE YIPES YIPPY YIRDS YIRKS YIRRS YIRTH YITES YITIE YLEMS YLIKE YLKES YMOLT YMPES YOBBO YOBBY YOCKS YODEL YODHS YODLE YOGAS YOGEE YOGHS YOGIC YOGIN YOGIS YOICK YOJAN YOKED YOKEL YOKER YOKES YOKUL YOLKS YOLKY YOMIM YOMPS YONIC YONIS YONKS YOOFS YOOPS YORES YORKS YORPS YOUKS YOURN YOURS YOURT YOUSE YOWED YOWES YOWIE YOWLS YOWZA YRAPT YRENT YRIVD YRNEH YSAME YTOST YUANS YUCAS YUCCA YUCCH YUCKO YUCKS YUCKY YUFTS YUGAS YUKED YUKES YUKKY YUKOS YULAN YULES YUMMO YUMMY YUMPS YUPON YUPPY YURTA YURTS YUZUS ZABRA ZACKS ZAIDA ZAIDY ZAIRE ZAKAT ZAMAN ZAMBO ZAMIA ZANJA ZANTE ZANZA ZANZE ZAPPY ZARFS ZARIS ZATIS ZAXES ZAYIN ZAZEN ZEALS ZEBEC ZEBUB ZEBUS ZEDAS ZEINS ZENDO ZERDA ZERKS ZEROS ZESTS ZETAS ZEXES ZEZES ZHOMO ZIBET ZIFFS ZIGAN ZILAS ZILCH ZILLA ZILLS ZIMBI ZIMBS ZINCO ZINCS ZINCY ZINEB ZINES ZINGS ZINGY ZINKE ZINKY ZIPPO ZIPPY ZIRAM ZITIS ZIZEL ZIZIT ZLOTE ZLOTY ZOAEA ZOBOS ZOBUS ZOCCO ZOEAE ZOEAL ZOEAS ZOISM ZOIST ZOMBI ZONAE ZONDA ZONED ZONER ZONES ZONKS ZOOEA ZOOEY ZOOID ZOOKS ZOOMS ZOONS ZOOTY ZOPPA ZOPPO ZORIL ZORIS ZORRO ZOUKS ZOWEE ZOWIE ZULUS ZUPAN ZUPAS ZUPPA ZURFS ZUZIM ZYGAL ZYGON ZYMES ZYMIC',
  })
  var KA = new pA({ locale: 'en', phrases: GA })
  const eo = xr(),
    FA = (e) =>
      y(eo.Provider, {
        value: KA,
        get children() {
          return e.children
        },
      }),
    $ = () => {
      const e = st(eo)
      if (!e) throw new Error('TranslationsContext has been used outside provider')
      return e
    },
    or = (e) => String(e),
    ir = (e, t) => (e === null ? t : e === 'true'),
    Va = (e) => e,
    Za = (e, t) => (e === null ? t : e),
    et = (e) => String(e),
    tt = (e, t) => {
      if (e === null) return t
      {
        const r = Number(e)
        return isFinite(r) && r >= 0 ? r : t
      }
    },
    Xa = (e) => e.join(','),
    Qa = (e, t) =>
      e === null
        ? t
        : e
        ? e.split(',').map((r) => {
            const n = Number(r)
            return isFinite(n) && n >= 0 ? n : 0
          })
        : [],
    Ja = (e) => e.join(','),
    za = (e, t) => {
      if (e) {
        const r = $(),
          n = e.split(',').map((o) => o.toLocaleUpperCase(r.locale()))
        return n.every((o) => o.length === Fe) ? n : t
      } else return t
    },
    xA = {
      key: 'dark_mode',
      getDefault: () => window.matchMedia('(prefers-color-scheme: dark)').matches,
      serialize: or,
      deserialize: ir,
    },
    WA = { key: 'colorblind', getDefault: () => !1, serialize: or, deserialize: ir },
    _A = { key: 'vibration', getDefault: () => !0, serialize: or, deserialize: ir },
    $A = { key: 'enter_bs_reversed', getDefault: () => !1, serialize: or, deserialize: ir },
    kA = { key: 'achievement_notifs', getDefault: () => !0, serialize: or, deserialize: ir },
    VA = {
      key: 'keyboard_height',
      getDefault: () => 1,
      serialize: (e) => String(e),
      deserialize: (e, t) => {
        if (e === null) return t
        {
          const r = Number(e)
          return isFinite(r) && r <= Zi && r >= Xi ? r : t
        }
      },
    },
    ZA = {
      key: 'game_size',
      getDefault: () => 'fit',
      serialize: (e) => e,
      deserialize: (e, t) => (e === 'fit' || e === 'square' ? e : t),
    },
    XA = { key: 'donation_time', getDefault: () => 0, serialize: et, deserialize: tt },
    QA = { key: 'share_time', getDefault: () => 0, serialize: et, deserialize: tt },
    JA = {
      key: 'achievements',
      getDefault: () => new Array(Tt.length).fill(0),
      serialize: (e) => e.join(','),
      deserialize: (e, t) => {
        if (e) {
          const r = e.split(',').map((o) => {
            const i = Number(o)
            return isFinite(i) && i >= 0 ? i : 0
          })
          let n = new Array(...r)
          return n.length < Tt.length && (n = n.concat(new Array(Tt.length - n.length).fill(0))), n
        } else return t
      },
    },
    zA = { key: 'last_daily', getDefault: () => 0, serialize: et, deserialize: tt },
    qA = { key: 'last_free', getDefault: () => 0, serialize: et, deserialize: tt },
    jA = { key: 'daily_guesses', getDefault: () => [], serialize: Ja, deserialize: za },
    ed = { key: 'free_guesses', getDefault: () => [], serialize: Ja, deserialize: za },
    td = { key: 'daily_current', getDefault: () => '', serialize: Va, deserialize: Za },
    rd = { key: 'free_current', getDefault: () => '', serialize: Va, deserialize: Za },
    nd = {
      key: 'daily_history',
      getDefault: () => new Array(ee + 4).fill(0),
      serialize: Xa,
      deserialize: Qa,
    },
    od = {
      key: 'free_history',
      getDefault: () => new Array(ee + 4).fill(0),
      serialize: Xa,
      deserialize: Qa,
    },
    id = { key: 'daily_current_streak', getDefault: () => 0, serialize: et, deserialize: tt },
    ad = { key: 'free_current_streak', getDefault: () => 0, serialize: et, deserialize: tt },
    sd = { key: 'daily_max_streak', getDefault: () => 0, serialize: et, deserialize: tt },
    ld = { key: 'free_max_streak', getDefault: () => 0, serialize: et, deserialize: tt },
    qa = {
      dark_mode: xA,
      colorblind: WA,
      vibration: _A,
      enter_bs_reversed: $A,
      achievement_notifs: kA,
      keyboard_height: VA,
      game_size: ZA,
      donation_time: XA,
      share_time: QA,
      achievements: JA,
      last_daily: zA,
      daily_guesses: jA,
      daily_current: td,
      daily_history: nd,
      daily_current_streak: id,
      daily_max_streak: sd,
      last_free: qA,
      free_guesses: ed,
      free_current: rd,
      free_history: od,
      free_current_streak: ad,
      free_max_streak: ld,
    }
  function se(e) {
    const t = qa[e]
    try {
      return t.deserialize(window.localStorage.getItem(t.key), t.getDefault())
    } catch (r) {
      return t.getDefault()
    }
  }
  function Te(e, t) {
    const r = qa[e]
    try {
      window.localStorage.setItem(r.key, r.serialize(t))
    } catch (n) {}
  }
  const ja = () => {
      const e = new Date()
      return (
        ((e.getTime() -
          Pr.getTime() +
          (Pr.getTimezoneOffset() - e.getTimezoneOffset()) * Ne.minute) /
          Vi) >>
        0
      )
    },
    Re = (e, t, r) => {
      window.gtag && gtag(e, t, r)
    },
    W = (e) => {
      Qi && e && navigator.vibrate(1)
    },
    jo = (e, t, r) => {
      if ('RelativeTimeFormat' in Intl) {
        const i = new Intl.RelativeTimeFormat(r.locale(), { numeric: 'auto' }),
          a = t.valueOf() - e.valueOf()
        for (const s in Ne) {
          const S = s
          if (Math.abs(a) > Ne[S] || s === 'second') return i.format(Math.round(a / Ne[S]), S)
        }
        return `${a} ms`
      }
      const n = t.getTime() - e.getTime()
      let o = Math.floor(n / Ne.hour)
      return o > 1
        ? r.t('game.hoursDuration', { smart_count: o })
        : ((o = Math.floor(n / Ne.minute)),
          o > 1
            ? r.t('game.minutesDuration', { smart_count: o })
            : r.t('game.secondsDuration', { smart_count: Math.floor(n / Ne.second) }))
    },
    Sd = (e) => {
      let t = e.length
      for (; t--; ) {
        const r = Math.floor(Math.random() * t)
        ;[e[t], e[r]] = [e[r], e[t]]
      }
      return e
    }
  function Ot(e, t) {
    return e + '_' + t
  }
  const ve = (e, t) =>
      t[e].guesses.length === ee ||
      t[e].answers.filter((r) => t[e].guesses.indexOf(r) >= 0).length === 4,
    es = (e, t) => {
      const r = t.split(''),
        n = e.split(''),
        o = new Array(Fe).fill('none'),
        i = {}
      for (let a = 0; a < Fe; a++) i[n[a]] = 0
      for (let a = 0; a < Fe; a++)
        r[a] === n[a] && ((r[a] = ' '), (i[n[a]] = 2), (n[a] = ' '), (o[a] = 'correct'))
      for (let a = 0; a < Fe; a++)
        r.indexOf(n[a]) !== -1 &&
          r[a] !== n[a] &&
          n[a] !== ' ' &&
          (i[n[a]] != 2 && (i[n[a]] = 1), (r[r.indexOf(n[a])] = ' '), (o[a] = 'diff'))
      return o
    },
    Ed = (e, t) => {
      const r = [[], [], [], []]
      for (let n = 0; n < t.length; n++) {
        const o = e.indexOf(t[n])
        for (let i = 0; i < e.length; i++) (i <= o || o === -1) && r[n].push(es(e[i], t[n]))
      }
      return r
    },
    Un = (e, t, r) => {
      let n
      const o = new Zl(e)
      o.random_int31(), o.random_int31(), o.random_int31(), o.random_int31()
      do
        n = [
          t[o.random_int31() % t.length],
          t[o.random_int31() % t.length],
          t[o.random_int31() % t.length],
          t[o.random_int31() % t.length],
        ]
      while (
        n[0] === n[1] ||
        n[0] === n[2] ||
        n[0] === n[3] ||
        n[1] === n[2] ||
        n[1] === n[3] ||
        n[2] === n[3] ||
        r.has(n[0]) ||
        r.has(n[1]) ||
        r.has(n[2]) ||
        r.has(n[3])
      )
      return n
    }
  function cd(e) {
    const t = ja(),
      r = e.t('wordBank').split(' '),
      n = e.t('allowed'),
      o = n ? n.split(' ') : [],
      i = e.t('blacklist'),
      a = i ? i.split(' ') : [],
      s = e
        .t('game.keyboard')
        .split(
          `
`,
        )
        .map((c) => c.split(' ')),
      S = e
        .t('game.keyboardReversed')
        .split(
          `
`,
        )
        .map((c) => c.split(' ')),
      l = {
        daily: {
          seed: se('last_daily'),
          guesses: [...se('daily_guesses')],
          answers: [],
          current: se('daily_current'),
          states: [[], [], [], []],
          answersCorrect: [-1, -1, -1, -1],
          history: [...se('daily_history')],
          currentStreak: se('daily_current_streak'),
          maxStreak: se('daily_max_streak'),
          extraCurrent: '',
        },
        free: {
          seed: se('last_free'),
          guesses: [...se('free_guesses')],
          answers: [],
          current: se('free_current'),
          states: [[], [], [], []],
          answersCorrect: [-1, -1, -1, -1],
          history: [...se('free_history')],
          currentStreak: se('free_current_streak'),
          maxStreak: se('free_max_streak'),
          extraCurrent: '',
        },
        wordBank: r,
        wordBankSet: new Set(r),
        allowed: o,
        allowedSet: new Set(o),
        blacklist: a,
        blacklistSet: new Set(a),
        alphabet: e.t('game.alphabet'),
        keyboard: s,
        keyboardReversed: S,
        darkMode: se('dark_mode'),
        colorblind: se('colorblind'),
        vibration: se('vibration'),
        enterBsReversed: se('enter_bs_reversed'),
        achievementNotifs: se('achievement_notifs'),
        keyboardHeight: se('keyboard_height'),
        gameSize: se('game_size'),
        donationTime: se('donation_time'),
        shareTime: se('share_time'),
        achievements: se('achievements').reduce((c, u, T) => {
          const f = Tt[T]
          return ut(Ce({}, c), { [f]: { type: f, index: T, count: u, thresholds: $l[f] } })
        }, {}),
        achievementsToNotify: [],
      }
    ;['daily', 'free'].forEach((c) => {
      const u = l[c]
      u.seed && (c === 'free' || u.seed === t)
        ? Re('event', 'restore', { mode: c, daily_seed: c === 'daily' ? u.seed : void 0 })
        : ((u.seed = c === 'daily' ? t : Date.now()),
          (u.guesses = []),
          (u.current = ''),
          (u.extraCurrent = ''),
          Re('event', 'start', { mode: c, daily_seed: c === 'daily' ? u.seed : void 0 })),
        (u.answers = Un(u.seed, l.wordBank, l.blacklistSet)),
        (u.states = Ed(u.guesses, u.answers)),
        (u.answersCorrect = [0, 1, 2, 3].map((T) => u.guesses.indexOf(u.answers[T]))),
        (l[c] = u)
    })
    const [E, A] = jl(l)
    return (
      le(() => {
        Te('dark_mode', E.darkMode)
      }),
      le(() => {
        Te('colorblind', E.colorblind)
      }),
      le(() => {
        Te('vibration', E.vibration)
      }),
      le(() => {
        Te('enter_bs_reversed', E.enterBsReversed)
      }),
      le(() => {
        Te('achievement_notifs', E.achievementNotifs)
      }),
      le(() => {
        Te('keyboard_height', E.keyboardHeight)
      }),
      le(() => {
        Te('game_size', E.gameSize)
      }),
      le(() => {
        Te('donation_time', E.donationTime)
      }),
      le(() => {
        Te('share_time', E.shareTime)
      }),
      le(() => {
        Te(
          'achievements',
          Tt.map((c) => E.achievements[c].count),
        )
      }),
      ['daily', 'free'].forEach((c) => {
        le(() => {
          Te(Ot('last', c), E[c].seed)
        }),
          le(() => {
            Te(Ot(c, 'guesses'), E[c].guesses)
          }),
          le(() => {
            Te(Ot(c, 'current'), E[c].current)
          }),
          le(() => {
            Te(Ot(c, 'history'), E[c].history)
          }),
          le(() => {
            Te(Ot(c, 'current_streak'), E[c].currentStreak)
          }),
          le(() => {
            Te(Ot(c, 'max_streak'), E[c].maxStreak)
          })
      }),
      [E, A]
    )
  }
  const to = xr(),
    ud = (e) => {
      const t = $(),
        [r, n] = cd(t),
        o = (c, u) => {
          n(
            fe((T) => {
              ve(c, T) ||
                (T[c].current.length < 5 ? (T[c].current += u) : (T[c].extraCurrent += u))
            }),
          )
        },
        i = (c) => {
          n(
            fe((u) => {
              u[c].current.length > 0 &&
                !ve(c, u) &&
                ((u[c].current = u[c].current.slice(0, -1)), (u[c].extraCurrent = ''))
            }),
          )
        },
        a = (c) => {
          n(
            fe((u) => {
              for (let T of Object.values(u.achievements)) {
                const f = u.achievements[T.type].count
                u.achievements[T.type].count = kl[T.type](T, u)
                const I = u.achievements[T.type].count
                c &&
                  u.achievements[T.type].thresholds.forEach((R) => {
                    f < R && I >= R && u.achievementsToNotify.unshift([T.type, R, Date.now()])
                  })
              }
            }),
          )
        },
        s = (c) => {
          n(
            fe((u) => {
              if (
                u[c].current.length === 5 &&
                (r.wordBankSet.has(u[c].current) || r.allowedSet.has(u[c].current)) &&
                !ve(c, u)
              ) {
                const T = u[c].current
                u[c].guesses.push(T), (u[c].current = ''), (u[c].extraCurrent = '')
                for (let f = 0; f < pe; f++) {
                  const I = u[c].guesses.indexOf(u[c].answers[f])
                  ;(I === -1 || I === u[c].guesses.length - 1) &&
                    u[c].states[f].push(es(T, u[c].answers[f])),
                    (u[c].answersCorrect[f] = u[c].guesses.indexOf(u[c].answers[f]))
                }
                if (
                  (Re('event', 'guess', {
                    mode: c,
                    daily_seed: c === 'daily' ? u[c].seed : void 0,
                    word: T,
                    row: u[c].guesses.length,
                  }),
                  ve(c, u))
                ) {
                  const f = u[c].answersCorrect.reduce((R, m) => (R += m >= 0 ? 1 : 0), 0),
                    I = {}
                  for (let [R, m] of u[c].guesses.entries()) I[`guess_${R + 1}`] = m
                  if (f === 4) {
                    const R = Math.max(...u[c].answersCorrect)
                    u[c].history[R]++,
                      u[c].currentStreak++,
                      u[c].currentStreak > u[c].maxStreak && (u[c].maxStreak = u[c].currentStreak),
                      Re(
                        'event',
                        'win',
                        Ce(
                          {
                            mode: c,
                            daily_seed: c === 'daily' ? u[c].seed : void 0,
                            total_correct: f,
                            num_guesses: R + 1,
                          },
                          I,
                        ),
                      )
                  } else
                    u[c].history[ee + f]++,
                      u[c].currentStreak > 0 &&
                        Re('event', 'streak_reset', {
                          mode: c,
                          daily_seed: c === 'daily' ? u[c].seed : void 0,
                          current_streak: u[c].currentStreak,
                          max_streak: u[c].maxStreak,
                        }),
                      (u[c].currentStreak = 0),
                      Re(
                        'event',
                        'loss',
                        Ce(
                          {
                            mode: c,
                            daily_seed: c === 'daily' ? u[c].seed : void 0,
                            total_correct: f,
                            num_guesses: u[c].guesses.length + 1,
                          },
                          I,
                        ),
                      )
                  a(!0)
                }
              } else (u[c].current = ''), (u[c].extraCurrent = '')
            }),
          )
        },
        l = [
          r,
          {
            setDarkMode(c) {
              n(
                fe((u) => {
                  u.darkMode = c
                }),
              )
            },
            setColorblind(c) {
              n(
                fe((u) => {
                  u.colorblind = c
                }),
              )
            },
            setVibration(c) {
              n(
                fe((u) => {
                  u.vibration = c
                }),
              )
            },
            setEnterBsReversed(c) {
              n(
                fe((u) => {
                  u.enterBsReversed = c
                }),
              )
            },
            setAchievementNotifs(c) {
              n(
                fe((u) => {
                  u.achievementNotifs = c
                }),
              )
            },
            setKeyboardHeight(c) {
              n(
                fe((u) => {
                  u.keyboardHeight = c
                }),
              )
            },
            setGameSize(c) {
              n(
                fe((u) => {
                  u.gameSize = c
                }),
              )
            },
            sendKey(c, u) {
              if (u.ctrlKey) return !1
              if (u.key === 'Backspace') return i(c), !0
              if (u.key === 'Enter') return s(c), !0
              if (u.key) {
                const T = u.key.toLocaleUpperCase(t.locale())
                return r.alphabet.indexOf(T) === -1 ? !1 : (o(c, T), !0)
              } else return !1
            },
            addLetter: o,
            deleteLetter: i,
            submitCurrent: s,
            resetDailyIfOld() {
              const c = ja()
              c !== r.daily.seed &&
                n(
                  fe((u) => {
                    ;(u.daily.seed = c),
                      (u.daily.guesses = []),
                      (u.daily.answers = Un(c, u.wordBank, u.blacklistSet)),
                      (u.daily.current = ''),
                      (u.daily.extraCurrent = ''),
                      (u.daily.states = [[], [], [], []]),
                      (u.daily.answersCorrect = [-1, -1, -1, -1])
                  }),
                )
            },
            resetFree(c) {
              const u = c || new Date().getTime()
              n(
                fe((T) => {
                  if (!ve('free', T)) {
                    const f = T.free.answersCorrect.reduce((R, m) => (R += m >= 0 ? 1 : 0), 0),
                      I = {}
                    for (let [R, m] of T.free.guesses.entries()) I[`guess_${R + 1}`] = m
                    T.free.history[ee + f]++,
                      T.free.currentStreak > 0 &&
                        Re('event', 'streak_reset', {
                          mode: 'free',
                          daily_seed: void 0,
                          current_streak: T.free.currentStreak,
                          max_streak: T.free.maxStreak,
                        }),
                      (T.free.currentStreak = 0),
                      Re(
                        'event',
                        'loss',
                        Ce(
                          {
                            mode: 'free',
                            daily_seed: void 0,
                            total_correct: f,
                            num_guesses: T.free.guesses.length + 1,
                          },
                          I,
                        ),
                      ),
                      Re(
                        'event',
                        'reset',
                        Ce(
                          {
                            mode: 'free',
                            daily_seed: void 0,
                            total_correct: f,
                            num_guesses: T.free.guesses.length + 1,
                          },
                          I,
                        ),
                      )
                  }
                  ;(T.free.seed = u),
                    (T.free.guesses = []),
                    (T.free.answers = Un(u, T.wordBank, T.blacklistSet)),
                    (T.free.current = ''),
                    (T.free.extraCurrent = ''),
                    (T.free.states = [[], [], [], []]),
                    (T.free.answersCorrect = [-1, -1, -1, -1])
                }),
              )
            },
            getGameVariation: () => (r.daily.seed === 67 ? 'april_fools' : 'default'),
            updateDonationTime() {
              n(
                fe((c) => {
                  ;(c.donationTime = Math.floor(Date.now() / 1e3)), a(!0)
                }),
              )
            },
            updateShareTime() {
              n(
                fe((c) => {
                  ;(c.shareTime = Math.floor(Date.now() / 1e3)), a(!0)
                }),
              )
            },
            runAchievementFuncs: a,
            clearAchievementNotifications() {
              n(
                fe((c) => {
                  c.achievementsToNotify = []
                }),
              )
            },
            cleanupAchievementNotifications() {
              n(
                fe((c) => {
                  const u = Date.now()
                  c.achievementsToNotify.some((T) => T[2] + Lo * Ne.second <= u) &&
                    (c.achievementsToNotify = c.achievementsToNotify.filter(
                      (T) => T[2] + Lo * Ne.second > u,
                    ))
                }),
              )
            },
          },
        ],
        E = setInterval(() => {
          l[1].resetDailyIfOld()
        }, 1e3),
        A = setInterval(() => {
          l[1].cleanupAchievementNotifications()
        }, 1e3)
      return (
        Pe(() => {
          clearInterval(E), clearInterval(A)
        }),
        y(to.Provider, {
          value: l,
          get children() {
            return e.children
          },
        })
      )
    },
    de = () => {
      const e = st(to)
      if (!e || !e.length) throw new Error('GamesDataContext has been used outside provider')
      return e
    },
    Ad = P(
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24px" height="24px"><title></title><rect x="0" y="0" width="12" height="12" fill="#919191"></rect><rect x="12" y="0" width="12" height="12"></rect><rect x="0" y="12" width="12" height="12"></rect><rect x="12" y="12" width="12" height="12"></rect></svg>',
    ),
    dd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title></title><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7h-2z"></path></svg>',
    ),
    Od = P(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title></title><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>',
    ),
    fd =
      P(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 204" fill="currentColor"><title></title><g><path d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
		C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
		c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
		c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
		c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
		c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"></path></g></svg>`),
    Rd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
    ),
    Id = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>',
    ),
    Td = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
    ),
    hd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 900 600"><title>Fran\xE7ais</title><rect width="900" height="600" fill="#ED2939"></rect><rect width="600" height="600" fill="#fff"></rect><rect width="300" height="600" fill="#002395"></rect></svg>',
    ),
    Ld = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 900 600"><title>Espa\xF1ol</title><rect width="900" height="600" fill="#c60b1e"></rect><rect width="900" height="300" y="150" fill="#ffc400"></rect></svg>',
    ),
    md = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 3 2"><title>Italiano</title><rect width="3" height="2" fill="#009246"></rect><rect width="2" height="2" x="1" fill="#fff"></rect><rect width="1" height="2" x="2" fill="#ce2b37"></rect></svg>',
    ),
    vd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 9 6"><title>Nederlands</title><rect fill="#21468B" width="9" height="6"></rect><rect fill="#FFF" width="9" height="4"></rect><rect fill="#AE1C28" width="9" height="2"></rect></svg>',
    ),
    Nd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 5850 3900"><title>English</title><rect width="7410" height="3900" fill="#b22234"></rect><path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"></path><rect width="2964" height="2100" fill="#3c3b6e"></rect><g fill="#fff"><g id="s18"><g id="s9"><g id="s5"><g id="s4"><path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"></path><use href="#s" y="420"></use><use href="#s" y="840"></use><use href="#s" y="1260"></use></g><use href="#s" y="1680"></use></g><use href="#s4" x="247" y="210"></use></g><use href="#s9" x="494"></use></g><use href="#s18" x="988"></use><use href="#s9" x="1976"></use><use href="#s5" x="2470"></use></g></svg>',
    ),
    gd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>',
    ),
    yd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" class="h-[20px] w-[20px]" viewBox="0 0 24 24" fill="currentColor"><title></title><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M16,5l-1.42,1.42l-1.59-1.59V16h-1.98V4.83L9.42,6.42L8,5l4-4L16,5z M20,10v11c0,1.1-0.9,2-2,2H6c-1.11,0-2-0.9-2-2V10 c0-1.11,0.89-2,2-2h3v2H6v11h12V10h-3V8h3C19.1,8,20,8.89,20,10z"></path></g></svg>',
    ),
    Cd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>',
    ),
    Dd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>',
    ),
    pd = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>',
    ),
    Ud = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
    ),
    Pd =
      P(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 297" class="h-6 w-6" fill="currentColor"><title></title><g><path d="M221.982,276.506h-46.106l-14.886-74.432h-24.98l-14.886,74.432H75.018c-5.659,0-10.247,4.588-10.247,10.247
				S69.359,297,75.018,297h146.964c5.659,0,10.247-4.588,10.247-10.247S227.641,276.506,221.982,276.506z"></path><path d="M67.845,121.42v-10.485c-37.612-2.567-37.659-25.779-37.691-44.644c-0.016-9.411-0.01-31.684-0.005-44.847h37.696V0.95
				H19.907C14.25,0.95,9.663,5.534,9.66,11.191c0,0-0.023,41.35,0,55.134c0.018,10.492,0.045,26.348,8.466,40.176
				c9.346,15.344,26.287,23.718,50.369,24.978C68.082,128.181,67.845,124.829,67.845,121.42z"></path><path d="M287.34,11.191c-0.003-5.657-4.59-10.241-10.247-10.241h-47.938v20.494h37.696c0.005,13.162,0.011,35.436-0.005,44.847
				c-0.032,18.865-0.079,42.078-37.691,44.644v10.485c0,3.409-0.237,6.761-0.65,10.06c24.082-1.261,41.023-9.634,50.369-24.978
				c8.421-13.829,8.448-29.684,8.466-40.176C287.363,52.541,287.34,11.191,287.34,11.191z"></path><path d="M136.108,95.505l-1.852,12.198l11.029-5.53c1.012-0.507,2.113-0.762,3.215-0.762s2.204,0.254,3.215,0.762l11.029,5.53
				l-1.852-12.198c-0.339-2.239,0.397-4.505,1.987-6.116l8.667-8.779l-12.173-2.008c-2.234-0.368-4.162-1.769-5.203-3.78
				l-5.67-10.958l-5.671,10.957c-1.041,2.01-2.969,3.411-5.203,3.78l-12.173,2.008l8.667,8.779
				C135.711,90.999,136.447,93.266,136.108,95.505z"></path><path d="M148.5,187.728c36.563,0,66.309-29.746,66.309-66.308V0H82.191v121.42C82.191,157.982,111.937,187.728,148.5,187.728z
				 M103.791,73.57c0.829-2.55,3.009-4.424,5.654-4.86l22.297-3.678l10.387-20.069c1.233-2.381,3.69-3.876,6.37-3.876
				s5.138,1.495,6.37,3.876l10.387,20.069l22.297,3.678c2.645,0.436,4.825,2.311,5.654,4.86c0.829,2.55,0.166,5.348-1.717,7.256
				l-15.876,16.081l3.392,22.342c0.402,2.651-0.706,5.304-2.876,6.88c-1.249,0.908-2.728,1.37-4.217,1.37
				c-1.097,0-2.198-0.251-3.214-0.762l-20.2-10.129l-20.2,10.129c-2.397,1.203-5.262,0.968-7.431-0.608
				c-2.17-1.576-3.278-4.229-2.876-6.88l3.392-22.342l-15.876-16.081C103.625,78.918,102.963,76.12,103.791,73.57z"></path></g></svg>`),
    Md = P(
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title></title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',
    ),
    bd = (e) => {
      const t = $()
      return (() => {
        const r = Ad.cloneNode(!0),
          n = r.firstChild,
          o = n.nextSibling,
          i = o.nextSibling,
          a = i.nextSibling,
          s = a.nextSibling
        return (
          Ve(r, e, !0, !0),
          d(n, () => t.t('app.appName')),
          w(
            (S) => {
              const l = e.colorblind ? '#fb923c' : '#00cc88',
                E = e.colorblind ? '#fb923c' : '#00cc88',
                A = e.colorblind ? '#60a5fa' : '#ffcc00'
              return (
                l !== S._v$ && U(i, 'fill', (S._v$ = l)),
                E !== S._v$2 && U(a, 'fill', (S._v$2 = E)),
                A !== S._v$3 && U(s, 'fill', (S._v$3 = A)),
                S
              )
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0 },
          ),
          r
        )
      })()
    },
    Yd = (e) => {
      const t = $()
      return (() => {
        const r = dd.cloneNode(!0),
          n = r.firstChild
        return (
          d(n, () => t.t('game.enterKey')),
          w(() => U(r, 'height', (e.height ? e.height : 16) + 'px')),
          r
        )
      })()
    },
    Bd = (e) => {
      const t = $()
      return (() => {
        const r = Od.cloneNode(!0),
          n = r.firstChild
        return (
          d(n, () => t.t('game.backspaceKey')),
          w(() => U(r, 'height', (e.height ? e.height : 16) + 'px')),
          r
        )
      })()
    },
    wd = (e) => {
      const t = $()
      return (() => {
        const r = fd.cloneNode(!0),
          n = r.firstChild
        return (
          d(n, () => t.t('tutorial.twitter')),
          w(() => U(r, 'height', (e.height ? e.height : 16) + 'px')),
          r
        )
      })()
    },
    Hd = () => {
      const e = $()
      return (() => {
        const t = Rd.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('header.help')), t
      })()
    },
    Qr = (e) => {
      const t = $()
      return (() => {
        const r = Id.cloneNode(!0),
          n = r.firstChild
        return Ve(r, e, !0, !0), d(n, () => t.t('header.moreOptions')), r
      })()
    },
    Gd = (e) => {
      const t = $()
      return (() => {
        const r = Td.cloneNode(!0),
          n = r.firstChild
        return Ve(r, e, !0, !0), d(n, () => t.t('header.settings')), r
      })()
    },
    Kd = (e) =>
      (() => {
        const t = hd.cloneNode(!0)
        return Ve(t, e, !0, !0), t
      })(),
    Fd = (e) =>
      (() => {
        const t = Ld.cloneNode(!0)
        return Ve(t, e, !0, !0), t
      })(),
    xd = (e) =>
      (() => {
        const t = md.cloneNode(!0)
        return Ve(t, e, !0, !0), t
      })(),
    Wd = (e) =>
      (() => {
        const t = vd.cloneNode(!0)
        return Ve(t, e, !0, !0), t
      })(),
    _d = (e) =>
      (() => {
        const t = Nd.cloneNode(!0)
        return Ve(t, e, !0, !0), t
      })(),
    $d = () => {
      const e = $()
      return (() => {
        const t = gd.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('game.share')), t
      })()
    },
    kd = () => {
      const e = $()
      return (() => {
        const t = yd.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('game.share')), t
      })()
    },
    ts = () => {
      const e = $()
      return (() => {
        const t = Cd.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('game.copyClipboard')), t
      })()
    },
    ei = () => {
      const e = $()
      return (() => {
        const t = Dd.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('game.saveImage')), t
      })()
    },
    Vd = () => {
      const e = $()
      return (() => {
        const t = pd.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('game.newPractice')), t
      })()
    },
    Zd = (e) => {
      const t = $()
      return (() => {
        const r = Ud.cloneNode(!0),
          n = r.firstChild
        return (
          d(
            n,
            (() => {
              const o = V(() => e.mode === 'daily', !0)
              return () => (o() ? t.t('stats.dailyStatistics') : t.t('stats.practiceStatistics'))
            })(),
          ),
          r
        )
      })()
    },
    rs = () => {
      const e = $()
      return (() => {
        const t = Pd.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('header.achievements')), t
      })()
    },
    ar = () => {
      const e = $()
      return (() => {
        const t = Md.cloneNode(!0),
          r = t.firstChild
        return d(r, () => e.t('app.close')), t
      })()
    },
    Xd = P(
      '<div class="px-4 py-2 rounded bg-green-800 flex flex-row items-center pointer-events-auto cursor-pointer border-4 border-green-900 overflow-hidden max-w-[100%]"><div class="w-6"></div><div class="mx-4 flex flex-col flex-1 overflow-hidden"><h1 class="text-base text-white whitespace-nowrap text-ellipsis overflow-hidden"></h1><p class="text-sm text-gray-300 whitespace-nowrap text-ellipsis overflow-hidden"></p></div><button type="button" class="text-gray-300 hover:text-white"></button></div>',
    ),
    Qd = P(
      '<div class="absolute w-full top-4 pointer-events-none flex justify-center px-6"></div>',
    ),
    Jd = P(
      '<div class="my-2 rounded-xl overflow-hidden flex flex-col bg-gray-300 dark:bg-gray-700"><div class="py-2 relative flex flex-row items-center"><div class="mx-4 flex-1 overflow-hidden"><h1 class="text-base whitespace-nowrap text-ellipsis overflow-hidden"></h1><p class="text-sm text-gray-700 dark:text-gray-300"></p></div><p class="text-base mr-4">/</p></div></div>',
    ),
    zd = P(
      '<button type="button" class="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white mr-4 transition"></button>',
    ),
    qd = P('<div class="flex flex-col"></div>'),
    jd = P(
      '<div class="py-2 relative flex flex-row items-center border-t-2 border-t-gray-200 dark:border-t-gray-600"><div class="mx-4 flex-1 overflow-hidden"><h1 class="text-base whitespace-nowrap text-ellipsis overflow-hidden"></h1><p class="text-sm text-gray-700 dark:text-gray-300"></p></div><p class="text-base mr-4">/</p></div>',
    ),
    eO = P(
      '<div id="achievements-panel" class="w-full h-full overflow-auto"><div class="max-w-[550px] w-full m-auto flex flex-row-reverse pr-4 pt-2"><button type="button" class="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-900 hover:text-black dark:text-gray-400 dark:hover:text-white"></button></div><div class="max-w-[550px] m-auto w-full px-6 mb-8"><h1 class="text-4xl mt-2 mb-2 text-center"></h1><h2 class="text-2xl text-center mb-4">/</h2></div></div>',
    ),
    ti = (e) => {
      const t = $(),
        [r, n] = de()
      return (() => {
        const o = Xd.cloneNode(!0),
          i = o.firstChild,
          a = i.nextSibling,
          s = a.firstChild,
          S = s.nextSibling,
          l = a.nextSibling
        return (
          Ie(o, 'click', e.onOpenAchievements, !0),
          d(i, y(rs, {})),
          d(s, () => e.title),
          d(S, () => e.subtitle),
          (l.$$click = (E) => {
            E.stopPropagation(), W(r.vibration), n.clearAchievementNotifications()
          }),
          d(l, y(ar, {})),
          w(() => U(l, 'aria-label', t.t('app.close'))),
          o
        )
      })()
    },
    tO = (e) => {
      const t = $(),
        [r, n] = de()
      return (() => {
        const o = Qd.cloneNode(!0)
        return (
          d(
            o,
            y($i, {
              enterClass: 'quordle-notif-enter',
              enterToClass: 'quordle-notif-enter-anim',
              exitClass: 'quordle-notif-exit',
              exitToClass: 'quordle-notif-exit-anim',
              get children() {
                return V(
                  () => !!(r.achievementNotifs && r.achievementsToNotify.length === 1),
                  !0,
                )()
                  ? y(ti, {
                      get title() {
                        return t.t(`achievements.${r.achievementsToNotify[0][0]}`, {
                          num: r.achievementsToNotify[0][1],
                          smart_count: r.achievementsToNotify[0][1],
                        })
                      },
                      get subtitle() {
                        return t.t(`achievements.${r.achievementsToNotify[0][0]}_desc`, {
                          num: r.achievementsToNotify[0][1],
                          smart_count: r.achievementsToNotify[0][1],
                        })
                      },
                      get onOpenAchievements() {
                        return e.onOpenAchievements
                      },
                    })
                  : V(() => !!(r.achievementNotifs && r.achievementsToNotify.length > 1), !0)()
                  ? y(ti, {
                      get title() {
                        return t.t('achievements.achievementAndXOthers', {
                          achievement: t.t(`achievements.${r.achievementsToNotify[0][0]}`, {
                            num: r.achievementsToNotify[0][1],
                            smart_count: r.achievementsToNotify[0][1],
                          }),
                          smart_count: r.achievementsToNotify.length - 1,
                        })
                      },
                      get subtitle() {
                        return t.t(`achievements.${r.achievementsToNotify[0][0]}_desc`, {
                          num: r.achievementsToNotify[0][1],
                          smart_count: r.achievementsToNotify[0][1],
                        })
                      },
                      get onOpenAchievements() {
                        return e.onOpenAchievements
                      },
                    })
                  : null
              },
            }),
          ),
          o
        )
      })()
    },
    rO = (e) => {
      const t = $(),
        [r, n] = de(),
        [o, i] = Q(!1),
        a = b(() => r.achievements[e.achievement]),
        s = b(
          () =>
            a().thresholds.find((E) => a().count < E) || a().thresholds[a().thresholds.length - 1],
        ),
        S = b(() => (a().count / s()) * 100)
      return (() => {
        const l = Jd.cloneNode(!0),
          E = l.firstChild,
          A = E.firstChild,
          c = A.firstChild,
          u = c.nextSibling,
          T = A.nextSibling,
          f = T.firstChild
        return (
          d(c, () => t.t(`achievements.${e.achievement}`, { num: s(), smart_count: s() })),
          d(u, () => t.t(`achievements.${e.achievement}_desc`, { num: s(), smart_count: s() })),
          d(T, () => Math.min(a().count, s()), f),
          d(T, s, null),
          d(
            E,
            (() => {
              const I = V(() => a().thresholds.length > 1, !0)
              return () =>
                I() &&
                (() => {
                  const R = zd.cloneNode(!0)
                  return (
                    (R.$$click = () => {
                      W(r.vibration), i(!o())
                    }),
                    d(R, y(Qr, {})),
                    w(
                      (m) => {
                        const N = o(),
                          v = o()
                        return (
                          N !== m._v$ && R.classList.toggle('rotate-180', (m._v$ = N)),
                          v !== m._v$2 && U(R, 'aria-expanded', (m._v$2 = v)),
                          m
                        )
                      },
                      { _v$: void 0, _v$2: void 0 },
                    ),
                    R
                  )
                })()
            })(),
            null,
          ),
          d(
            l,
            (() => {
              const I = V(() => !!(o() && a().thresholds.length > 1), !0)
              return () =>
                I() &&
                (() => {
                  const R = qd.cloneNode(!0)
                  return (
                    d(R, () =>
                      a()
                        .thresholds.filter((m) => m !== s())
                        .map((m) => {
                          const N = (a().count / m) * 100
                          return (() => {
                            const v = jd.cloneNode(!0),
                              g = v.firstChild,
                              O = g.firstChild,
                              D = O.nextSibling,
                              h = g.nextSibling,
                              L = h.firstChild
                            return (
                              d(O, () =>
                                t.t(`achievements.${e.achievement}`, { num: m, smart_count: m }),
                              ),
                              d(D, () =>
                                t.t(`achievements.${e.achievement}_desc`, {
                                  num: m,
                                  smart_count: m,
                                }),
                              ),
                              d(h, () => Math.min(a().count, m), L),
                              d(h, m, null),
                              w(() =>
                                v.style.setProperty(
                                  'background',
                                  `linear-gradient(90deg, ${
                                    r.darkMode ? '#065f46' : '#34d399'
                                  } ${N}%, transparent ${N}%)`,
                                ),
                              ),
                              v
                            )
                          })()
                        }),
                    ),
                    R
                  )
                })()
            })(),
            null,
          ),
          w(() =>
            E.style.setProperty(
              'background',
              `linear-gradient(90deg, ${
                r.darkMode ? '#065f46' : '#34d399'
              } ${S()}%, transparent ${S()}%)`,
            ),
          ),
          l
        )
      })()
    },
    nO = (e) => {
      const t = $(),
        [r, n] = de()
      le(() => {
        n.runAchievementFuncs(!1)
      })
      const o = b(
          () =>
            en
              .flatMap((s) =>
                r.achievements[s].thresholds.map((S) => r.achievements[s].count >= S),
              )
              .filter((s) => s).length,
        ),
        i = b(() => en.reduce((a, s) => a + r.achievements[s].thresholds.length, 0))
      return (() => {
        const a = eO.cloneNode(!0),
          s = a.firstChild,
          S = s.firstChild,
          l = s.nextSibling,
          E = l.firstChild,
          A = E.nextSibling,
          c = A.firstChild
        return (
          Ie(S, 'click', e.onCloseAchievements, !0),
          d(S, y(ar, {})),
          d(E, () => t.t('header.achievements')),
          d(A, o, c),
          d(A, i, null),
          d(l, () => en.map((u) => y(rO, { achievement: u })), null),
          w(
            (u) => {
              const T = t.t('header.achievements'),
                f = t.t('app.close')
              return (
                T !== u._v$3 && U(a, 'aria-label', (u._v$3 = T)),
                f !== u._v$4 && U(S, 'aria-label', (u._v$4 = f)),
                u
              )
            },
            { _v$3: void 0, _v$4: void 0 },
          ),
          a
        )
      })()
    }
  He(['click'])
  var ns = { exports: {} }
  /*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ ;(function (e) {
    ;(function () {
      var t = {}.hasOwnProperty
      function r() {
        for (var n = [], o = 0; o < arguments.length; o++) {
          var i = arguments[o]
          if (!!i) {
            var a = typeof i
            if (a === 'string' || a === 'number') n.push(i)
            else if (Array.isArray(i)) {
              if (i.length) {
                var s = r.apply(null, i)
                s && n.push(s)
              }
            } else if (a === 'object')
              if (i.toString === Object.prototype.toString)
                for (var S in i) t.call(i, S) && i[S] && n.push(S)
              else n.push(i.toString())
          }
        }
        return n.join(' ')
      }
      e.exports ? ((r.default = r), (e.exports = r)) : (window.classNames = r)
    })()
  })(ns)
  var oO = ns.exports
  const iO = '_AdContainer_1wn39_1'
  var aO = { AdContainer: iO }
  const sO = P('<div></div>'),
    os = ({ className: e, id: t }) =>
      (() => {
        const r = sO.cloneNode(!0)
        return U(r, 'id', t), w(() => (r.className = oO(aO.AdContainer, e))), r
      })(),
    lO = P(
      '<div class="bg-new-blue dark:bg-gray-900 w-screen border-b-2 border-white dark:border-gray-800"></div>',
    ),
    SO = () =>
      (() => {
        const e = lO.cloneNode(!0)
        return d(e, y(os, { id: 'footer-placement', className: 'mx-auto' })), e
      })()
  function EO(e) {
    return e !== null && (typeof e == 'object' || typeof e == 'function')
  }
  function ri(e, ...t) {
    return typeof e == 'function' ? e(...t) : e
  }
  function cO(e, t) {
    Object.entries(e).forEach(([r, n], o, i) => t(r, n, o, i, e))
  }
  var is = Object.entries,
    uO = Object.keys
  function AO(e) {
    const t = Ce({}, e),
      r = {},
      n = new Map(),
      o = (s) => {
        const S = n.get(s)
        if (S) return S[0]()
        const l = Q(t[s], { name: typeof s == 'string' ? s : void 0 })
        return n.set(s, l), delete t[s], l[0]()
      },
      i = (s, S) => {
        const l = n.get(s)
        if (l) return l[1](S)
        s in t && (t[s] = ri(S, [t[s]]))
      }
    for (const s of uO(e)) (r[s] = void 0), Object.defineProperty(r, s, { get: o.bind(void 0, s) })
    return [
      r,
      (s, S) => (
        EO(s)
          ? Be(() => {
              rr(() => {
                for (const [l, E] of is(ri(s, r))) i(l, () => E)
              })
            })
          : i(s, S),
        r
      ),
    ]
  }
  var dO = (e) => {
    const t = {}
    return is(e).forEach(([r]) => (t[r] = !1)), t
  }
  function as(e, t, r, n) {
    return e.addEventListener(t, r, n), Pe(e.removeEventListener.bind(e, t, r, n))
  }
  function OO(e) {
    let t = 0,
      r,
      n
    return () => (
      n ||
        Hn((o) => {
          ;(r = e(o)), (n = o)
        }),
      t++,
      vi() &&
        Pe(() => {
          t--,
            queueMicrotask(() => {
              t || !n || (n(), (n = void 0), (r = void 0))
            })
        }),
      r
    )
  }
  var fO = (e, t, r = !0) => {
    const n = window.matchMedia(e)
    if (!r) return () => n.matches
    const [o, i] = Q(n.matches)
    return as(n, 'change', () => i(n.matches)), o
  }
  function ro(e, t = {}) {
    var a
    if (!window.matchMedia) return (a = t.fallbackState) != null ? a : dO(e)
    const { mediaFeature: r = 'min-width', watchChange: n = !0 } = t,
      [o, i] = AO(
        (() => {
          const s = {}
          return (
            cO(e, (S, l) => {
              const E = window.matchMedia(`(${r}: ${l})`)
              ;(s[S] = E.matches), n && as(E, 'change', (A) => i(S, A.matches))
            }),
            s
          )
        })(),
      )
    return o
  }
  fO.bind(null, '(prefers-color-scheme: dark)', !1, !0)
  const RO = P('<button type="button"></button>'),
    IO = P(
      '<div class="px-4 py-2 text-center flex flex-col"><div class="text-3xl pb-2"></div></div>',
    ),
    TO = P('<div class="flex items-center justify-center"><div class="ml-2"></div></div>'),
    hO = P('<div class="text-black dark:text-white text-2xl"></div>'),
    LO = P(
      '<div class="mx-2.5 mt-1 px-4 py-2 text-center bg-rose-700 text-white text-xl rounded"></div>',
    ),
    mO = (e) =>
      (() => {
        const t = RO.cloneNode(!0)
        return (
          Ie(t, 'click', e.onClick, !0),
          d(t, () => e.children),
          w(
            (r) => {
              const n = `m-auto text-lg min-h-[40px] text-gray-900 bg-gray-300 border border-gray-400 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 text-center dark:bg-gray-600 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-800 dark:focus:ring-gray-900 transition-colors ${e.class}`,
                o = e.ariaLabel
              return (
                n !== r._v$ && (t.className = r._v$ = n),
                o !== r._v$2 && U(t, 'aria-label', (r._v$2 = o)),
                r
              )
            },
            { _v$: void 0, _v$2: void 0 },
          ),
          t
        )
      })(),
    vO = (e) => {
      ro(Wn)
      const t = $(),
        [r, n] = de(),
        o = b(() => r[e.mode].answersCorrect.reduce((l, E) => (l += E >= 0 ? 1 : 0), 0)),
        i = b(
          () =>
            new Date(
              Pr.getTime() +
                (new Date().getTimezoneOffset() - Pr.getTimezoneOffset()) * Ne.minute +
                (r[e.mode].seed + 1) * Vi,
            ),
        ),
        [a, s] = Q(new Date()),
        S = setInterval(() => s(new Date()), 1e3)
      return (
        Pe(() => clearInterval(S)),
        b(() =>
          ve(e.mode, r)
            ? (() => {
                const l = IO.cloneNode(!0),
                  E = l.firstChild
                return (
                  d(
                    E,
                    (() => {
                      const A = V(() => o() === 4, !0)
                      return () =>
                        A()
                          ? t.t('game.complete')
                          : (() => {
                              const c = V(() => o() === 3, !0)
                              return () => (c() ? t.t('game.soClose') : t.t('game.betterLuck'))
                            })()
                    })(),
                  ),
                  d(
                    l,
                    (() => {
                      const A = V(() => e.mode === 'free', !0)
                      return () =>
                        A()
                          ? y(mO, {
                              onClick: () => {
                                W(r.vibration), n.resetFree()
                              },
                              get ariaLabel() {
                                return t.t('game.newPractice')
                              },
                              get children() {
                                const c = TO.cloneNode(!0),
                                  u = c.firstChild
                                return d(c, y(Vd, {}), u), d(u, () => t.t('game.newPractice')), c
                              },
                            })
                          : (() => {
                              const c = hO.cloneNode(!0)
                              return (
                                d(c, () => t.t('game.nextDaily', { duration: jo(a(), i(), t) })), c
                              )
                            })()
                    })(),
                    null,
                  ),
                  w(
                    (A) => {
                      const c = t.t('game.aria.gameCompleteBanner'),
                        u = {
                          'text-green-600 dark:text-green-500': o() === 4,
                          'text-amber-600 dark:text-amber-400': o() === 3,
                          'text-orange-600 dark:text-orange-500': o() === 2,
                          'text-rose-600': o() <= 1,
                        }
                      return (
                        c !== A._v$3 && U(l, 'aria-label', (A._v$3 = c)),
                        (A._v$4 = we(E, u, A._v$4)),
                        A
                      )
                    },
                    { _v$3: void 0, _v$4: void 0 },
                  ),
                  l
                )
              })()
            : e.mode === 'daily' && i().getTime() - a().getTime() < Ne.minute * 5
            ? (() => {
                const l = LO.cloneNode(!0)
                return (
                  d(l, () => t.t('game.dailyResetTimer', { duration: jo(a(), i(), t) })),
                  w(() =>
                    l.classList.toggle(
                      'animate-pulse',
                      i().getTime() - a().getTime() < Ne.second * 15,
                    ),
                  ),
                  l
                )
              })()
            : null,
        )
      )
    }
  He(['click'])
  var ss = { exports: {} }
  ;(function (e, t) {
    ;(function (r, n) {
      n()
    })(Gt, function () {
      function r(l, E) {
        return (
          typeof E == 'undefined'
            ? (E = { autoBom: !1 })
            : typeof E != 'object' &&
              (console.warn('Deprecated: Expected third argument to be a object'),
              (E = { autoBom: !E })),
          E.autoBom &&
          /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type)
            ? new Blob(['\uFEFF', l], { type: l.type })
            : l
        )
      }
      function n(l, E, A) {
        var c = new XMLHttpRequest()
        c.open('GET', l),
          (c.responseType = 'blob'),
          (c.onload = function () {
            S(c.response, E, A)
          }),
          (c.onerror = function () {
            console.error('could not download file')
          }),
          c.send()
      }
      function o(l) {
        var E = new XMLHttpRequest()
        E.open('HEAD', l, !1)
        try {
          E.send()
        } catch (A) {}
        return 200 <= E.status && 299 >= E.status
      }
      function i(l) {
        try {
          l.dispatchEvent(new MouseEvent('click'))
        } catch (A) {
          var E = document.createEvent('MouseEvents')
          E.initMouseEvent('click', !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null),
            l.dispatchEvent(E)
        }
      }
      var a =
          typeof window == 'object' && window.window === window
            ? window
            : typeof self == 'object' && self.self === self
            ? self
            : typeof Gt == 'object' && Gt.global === Gt
            ? Gt
            : void 0,
        s =
          a.navigator &&
          /Macintosh/.test(navigator.userAgent) &&
          /AppleWebKit/.test(navigator.userAgent) &&
          !/Safari/.test(navigator.userAgent),
        S =
          a.saveAs ||
          (typeof window != 'object' || window !== a
            ? function () {}
            : 'download' in HTMLAnchorElement.prototype && !s
            ? function (l, E, A) {
                var c = a.URL || a.webkitURL,
                  u = document.createElement('a')
                ;(E = E || l.name || 'download'),
                  (u.download = E),
                  (u.rel = 'noopener'),
                  typeof l == 'string'
                    ? ((u.href = l),
                      u.origin === location.origin
                        ? i(u)
                        : o(u.href)
                        ? n(l, E, A)
                        : i(u, (u.target = '_blank')))
                    : ((u.href = c.createObjectURL(l)),
                      setTimeout(function () {
                        c.revokeObjectURL(u.href)
                      }, 4e4),
                      setTimeout(function () {
                        i(u)
                      }, 0))
              }
            : 'msSaveOrOpenBlob' in navigator
            ? function (l, E, A) {
                if (((E = E || l.name || 'download'), typeof l != 'string'))
                  navigator.msSaveOrOpenBlob(r(l, A), E)
                else if (o(l)) n(l, E, A)
                else {
                  var c = document.createElement('a')
                  ;(c.href = l),
                    (c.target = '_blank'),
                    setTimeout(function () {
                      i(c)
                    })
                }
              }
            : function (l, E, A, c) {
                if (
                  ((c = c || open('', '_blank')),
                  c && (c.document.title = c.document.body.innerText = 'downloading...'),
                  typeof l == 'string')
                )
                  return n(l, E, A)
                var u = l.type === 'application/octet-stream',
                  T = /constructor/i.test(a.HTMLElement) || a.safari,
                  f = /CriOS\/[\d]+/.test(navigator.userAgent)
                if ((f || (u && T) || s) && typeof FileReader != 'undefined') {
                  var I = new FileReader()
                  ;(I.onloadend = function () {
                    var N = I.result
                    ;(N = f ? N : N.replace(/^data:[^;]*;/, 'data:attachment/file;')),
                      c ? (c.location.href = N) : (location = N),
                      (c = null)
                  }),
                    I.readAsDataURL(l)
                } else {
                  var R = a.URL || a.webkitURL,
                    m = R.createObjectURL(l)
                  c ? (c.location = m) : (location.href = m),
                    (c = null),
                    setTimeout(function () {
                      R.revokeObjectURL(m)
                    }, 4e4)
                }
              })
      ;(a.saveAs = S.saveAs = S), (e.exports = S)
    })
  })(ss)
  var NO = ss.exports,
    gO =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACLlBMVEUAAAAvfDEvfDBwmiGKqyBugBtwmSEvfDEvfjIudC56mCpwmSFwmSEvfDFxmyIwfDFvmCEvfDEvfTAvfDFwmSFwmSEvfTFwmSFwmSGqwhy1zxmftSVslyJwmSGftiVwmSGftSQvfDG40hgvfDG30hgufDAvfDAvfTFwmSAvfDKjuSMvfC9xmSAwfDAwfDCftSUvezBvmSG30RietiS30RhwmSFvmSAvfDFvmSEufDEvfDAwfDBwmSFxmSFVjieetSZvmCCgtyRwmyGgtiYwezChtSO1zxopfDC30RhZjya30hixyxwufDFikySDsSJwmSEufDEvfDEvfDJvmSEwezFhkiRfkSZvmSC20Rm30Ri20BhxmiEufDKgtCS40ReftSZWjimxyB2etSW40BijtiRwmCKftCVSjSm41BYzfzNwmSEvfDG30RiftSW1zxk2fy8zfjBfkiWjuiJpliK20BhAhCxGhiugtiRwmCEwfDExfTA8gi5DhSyowCA7gS5MiipKiCpPiilZjyalvCI+hC5jkySmvSFumCE5gS9XjidWjidmlSNrlyGsxB6uxxywyRuyzBpXkSxTjChajyZckCV0pyRhkySiuCOqwx6xyhtTkStIhyqbsyWXsSRtmCGavx2Wux2qyRtHii1+pCiEpydakCZtoyV6qyNtmCKpwR9PjyxmmStZlStvnSqRriaPrSV2nyWQtR5smyqZsSaUryZroSaBryJ/oSJoliKfvx8idSH9AAAAanRSTlMA/PUXBwL4PSAHBPTbz2tGDPnu5tayrI4sDfv5+e7o5N3UyaKTi4aBU1EwLCQaDPDcyLiyspSGeXhrY1xKRkRDPzg1KCcgGBL17ebl4dXKxsC/ube2sKmlpaKenJqThHJxYmFhW1lSOC8U7lHIBQAABMJJREFUWMO9lYVXWzEUxgOjFCYwQebu7u7u7u6SvNRGW9pS2iLt6IoMNhhjMGCwwdzlv1uS916T9BXdzn7ntDkvfd+Xm3uTW/DvSds+d+tIaWbI3Kxb2039lA9ZNQxCmJ7PLcaegJQpqy7kTFqWv7AP/dYpUCV35JA0NrMpHUqsNvW0dFZuzvAc8e303IVkehJMICv5xlcPg0bSN4J8w+SUpMsfgUkZlpXEN0kaRubAAXAo02Bwpr/aWhckjD46e6ekn9tPeafHZiVDBCGUahb0puGwf0SaPDQCOyIsHcoNNsF+E+siXy5EyeYG+XBAPEaMddxgGUzgflM57AwWJlO31Ac9iLGGG5AU1McidTFhDW8RQvdhS6jMF4xAkSaks0Ey8NoeoFqo01VMXiiCETqgCihShHRmc4NcCEMIWe8LeyhGzhYySaljE7GgD1IeIJ3UjLjBWvJDRZDqOQ/JhwVgbaF6r81jhYRyxJnDL4J0Ycud5ZoHInjtkFBIIg+pI+cYEELQsdtcVhTVjq2QgcLOQIR8h5DAQeEuTaQr11EDUiPPL1VDd+CTqluERMZwg1Mw9thuY5sssaEAZETZDuo1bSAQLEMyI3gzmQgDrG7s1bpCyJy08+Kyd8HykA0ZyYsbbCYJI+WxQ069E/UJP8tX2emr1atQ2+S0ob4ZtUiIgGP3IYmyF62v36BkzACcfaGi4uBDWnoXkvG2KoTfZUb96EWAk52CCMUupwe1/2hr/NoRX/OJQil9/sigNwORbKTxzqIoFow7kMqzAqp/ivGHuPJBoKKuJBo9vXGoaLAYabymAjf+qCWgjT42Yoz1CKy8VMPHig4jRAMHbhYSYGnA+JOuF2/cJNFhvbjnUoxt8YcC8vTBilTs8r+O4DB0hGDgx9gnJuC5fgdcUGbiHe6QMQZRXlFNN8btyRLglVtGYYlvWqbgcBwRvlNRJdVYX7AEuDF+jzRKZD09M+uBgHlGqhpBNRExPUtHh1erXxRKlCDCSSCROe8wW9bREG5TtFi+0S5oe/bkhdLKxYEQjLDEppqAzExFpMBNNtP+7tXnGub7SVva5UJOEgBjMZBZrkhYLBaF8xkygqzTqfc9JVPWp+1VeqbgqZa9Cp+T9j7elTg3ehRXV4bdzfECPNYv/SxZv3t/MrGlqtuBKR/1nlGMNFIyJP246UlW9hMxo7n5p9TtjDtI0zNoeaqoVIfdTPv85duADTlJy4lFudyQw3O63uFgY4229stnNv0yWlECC8QjENdjVvZKdfEvPtQLC4z6AgeuYldSXb2s9868OH6dz+v6UuynYYSZ/q0H9UpeXH9W0QjjUjUMwpKs1N71qTv1+q3U9X7cYGFhECbPB9mje93APKARr383djfG9TvIL3tmL+1RP80MZAOW+Eq6DV3PyDDPG2VUp+RtEPr6ZVVfhbFDz/+S+YCzRhYbL8FdRWtE7hraRQkTtgEB06zE9eckNBKaxEY3xlU0DMptIGPOIwUZMyN7zrQUMl5cABLYPV6pIXq/QgfCFWDAtOie2vYy9oAkXBvfgGkFLewArAAD5ybRVWsJnDoODILrE/x6AraAQbFtPP0bIVwCg2T+gTDfwODYsmICnroL/A1pRP6/+QOpnHr2k1gJNwAAAABJRU5ErkJggg==',
    yO =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAB8lBMVEUAAAD/32X9tQL/4mX+tgP+tQH9tQL9tQL//wD/4mX+tQL/4mX+tQH/42X/tgL/tQP/42P/swD/5mP/4mX+tQL/4mX+tQL+tQL+tQL+tQL/42X+tQH/4mX9tQL9tgL/42X/4mX/uQv/tQL/tgP/4Gb/tAD/42X/32f/4mX/4mX+tQL/4mX/42X+tQP/4mX9tQL9tQL/4mX/tAL/tQP/4mX/tQP/4mT/twT/42X/twD/4GP/sgD/yCb+xib+tQL+tQL+xif/4mX+tAH/4mX9tQL/4mX/4Wb/4mX/42X/4WP/4Gb/tgP/4Gb/uAD/5GL//3/+tQL/4mX/iw3tazH+tAL+iQ/vby3xcSr9hxHubTDzdSb/jQ3+yzH6gRf8qwj9rwX/32H6vlTzgiL2jBv+wBn6pgz/kQv+sQP/31z/1UfyfSX2ex/4fhz2jhr3kxb7hBX8jhD/mQr+ogj/ngj9rQb+rwT8zVv1nUb/0T//qiz1eCP+vBD6nw7+pQb9swT+2GD/3Ff/0VT/zE73rk7/vkDveDf/rzL+xif0iB/3hBz2lhb3mRP/jxH8kg78qAr+qAb7yFr4tVL4tlH2qUz/1kv/1Un2pUf2oUHyiT7xiT74mTf/zTbwdyn+xCP8qR/7jRf6ixT8jBL5og7+uQr7pQr+nAm+IPFtAAAAUHRSTlMABKPry7SRgQH15ta7s3xPIBMN/Pr58+LW0LywlI2GhH52cF4pGxoV5N/bycXEpp2Xc2plWFVUQ0I7MSEK8O3n1rerqamObmhbTUtJMislAkJ++MAAAANFSURBVFjD7ZfnV9pQGIcp4EAU96h7a92rWkf33jcJyBIRaB2AinVba1urVq2je+/xf/bemx0SAn7rqc/H9+T55d73jpNoDvmPSOxMyS+8UnNg/0Q9gcisbz1Qxo2zBEd2U0+s+q0mbA5xGefTYtGrC7ORvbhD7iyyGYZLidHqGSUGrKyRiDWCJb86Kv3IZR0jrCLf+Zjg0HVG4V818sLqxuIG8nkKj6joaSlEZBqqIw/fQKhRWxkp4HY2oYouYsIxQh2jQh96WjNkA+Zeep6LKx2ysy/NJGpLS8L0J+sUZN3DFUbHTpbJdb+BkOPhB6RbrVb7HN7YbwbuAABkAq7pCFneU5TDZYHbyfJxdAzKNKaw4ZcQ8nio/kmS5hvgSZD4NfmEAvNWC8nwAPAUS64NHaHEOxfrTwEBRaJbC3ZfjqHXcMpudgLTQEi88OSm4Ga/eOURyHy/3CFoD0/PAhEtvF9pxGtth2s1T8uPFp7eB0JGzEBKM+d3GJheB1yTwTlGVkfLrt5FptcO3Ouvv0CUaLnp07zFfggIMLtXgDLn6M1rZPu18oO0hO4BnhlfP9y/3mWlgAIccGZg4dMX2SnfhTrG65YPiMMBeqX8Qdq3O5aW/GYgRzIOSFYK8CK9P0hCLBOikfm8vj0+IE7Bn0E+XBeMTdDXTQqBIhtxQAE93kFpwDN0AZAsI8KB2QM20gZbq8cBF1B1nHL4JAET8EFbeMBPGIvLuwAcxQFa9H4KHrf9sIAA5zu58jjFHO0pNqAZBdhhZUayiBQ1yQVM8wHssOCGycMBLai86YKJYsyfKQs3AL4Fy0t0aRiubB0OiKebuCezj2wy15B5i/bRyc7FAUWSF2/7/eMrdIKLeT/0edy7Tngz4CGdxgHFYt8PN49jy0w/+90G9T+zQAG6iQnS1Q9YYIe4QLOCzF9pJlHNRwWZFquTW4UDykTFbQeJ2FfX64qgjygXn4Ags0aRSIpLSE3XsLQBEb9DpHNqVtHNaYyv6NWIaAdRkqWPr7gp84VXEY2bpy3vVvqsOq4i52nbuvsUXDpArVlqdCm4puvYVacvR+KeSi5OrdLEgEmwtwoSUntj/x1p1+dkJem15V3pmkP+Sf4Cz3zAF4yRDX4AAAAASUVORK5CYII='
  const De = (e) => (e < 0 ? '\u{1F7E5}' : `${e + 1}\uFE0F\u20E3`),
    Ar = (e, t) => {
      let r = ''
      if (!t || t.length === 0) return '\u2B1B\u2B1B\u2B1B\u2B1B\u2B1B'
      for (let n = 0; n < t.length; n++)
        e === 'default'
          ? t[n] === 'correct'
            ? (r += '\u{1F7E9}')
            : t[n] === 'diff'
            ? (r += '\u{1F7E8}')
            : t[n] === 'none' && (r += '\u2B1C')
          : e === 'april_fools' &&
            (t[n] === 'correct'
              ? (r += '\u{1F966}')
              : t[n] === 'diff'
              ? (r += '\u{1F9C0}')
              : t[n] === 'none' && (r += '\u2B1C'))
      return r
    },
    dr = (e) =>
      e
        ? e === 'correct'
          ? '#00cc88'
          : e === 'diff'
          ? '#ffcc00'
          : e === 'none'
          ? '#e0e0e0'
          : '#2d2d2d'
        : '#2d2d2d'
  function Ft(e, t, r, n, o, i) {
    const a = { tl: i, tr: i, br: i, bl: i }
    e.beginPath(),
      e.moveTo(t + a.tl, r),
      e.lineTo(t + n - a.tr, r),
      e.quadraticCurveTo(t + n, r, t + n, r + a.tr),
      e.lineTo(t + n, r + o - a.br),
      e.quadraticCurveTo(t + n, r + o, t + n - a.br, r + o),
      e.lineTo(t + a.bl, r + o),
      e.quadraticCurveTo(t, r + o, t, r + o - a.bl),
      e.lineTo(t, r + a.tl),
      e.quadraticCurveTo(t, r, t + a.tl, r),
      e.closePath(),
      e.fill()
  }
  const Or = (e, t, r, n, o, i, a) =>
      sr(io, null, function* () {
        if ((i === 'correct' || i === 'diff') && a === 'april_fools') {
          const s = new Image()
          ;(s.width = n), (s.height = o), (s.src = i === 'correct' ? gO : yO)
          try {
            yield s.decode(), e.save(), e.clip(), e.drawImage(s, t, r, n, o), e.restore()
          } catch (S) {}
        }
      }),
    ls = (e, t, r, n) => {
      let o = ''
      e === 'daily'
        ? (o =
            n.t(t === 'april_fools' ? 'game.dailyQuordleFoolsShare' : 'game.dailyQuordleShare', {
              num: r.seed,
            }) +
            `
` +
            De(r.answersCorrect[0]) +
            De(r.answersCorrect[1]) +
            `
` +
            De(r.answersCorrect[2]) +
            De(r.answersCorrect[3]))
        : (o =
            n.t(
              t === 'april_fools' ? 'game.practiceQuordleFoolsShare' : 'game.practiceQuordleShare',
            ) +
            `
` +
            De(r.answersCorrect[0]) +
            De(r.answersCorrect[1]) +
            (' ' + r.answers[0] + ' - ' + r.answers[1]) +
            `
` +
            De(r.answersCorrect[2]) +
            De(r.answersCorrect[3]) +
            (' ' + r.answers[2] + ' - ' + r.answers[3])),
        (o +=
          `
` + n.t('app.webAddress'))
      const i = o
      o += `
`
      let a = ee - 1
      r.answersCorrect[0] >= 0 &&
        r.answersCorrect[1] >= 0 &&
        (a = Math.max(r.answersCorrect[0], r.answersCorrect[1]))
      let s = ee - 1
      r.answersCorrect[2] >= 0 &&
        r.answersCorrect[3] >= 0 &&
        (s = Math.max(r.answersCorrect[2], r.answersCorrect[3]))
      for (let S = 0; S <= a; S++)
        o +=
          Ar(t, r.states[0][S]) +
          ' ' +
          Ar(t, r.states[1][S]) +
          `
`
      o += `
`
      for (let S = 0; S <= s; S++)
        o +=
          Ar(t, r.states[2][S]) +
          ' ' +
          Ar(t, r.states[3][S]) +
          `
`
      return [o, i]
    },
    fr = (e, t, r, n, o) =>
      sr(io, null, function* () {
        const [i, a] = ls(e, t, r, o)
        if (
          (Re('event', 'share', {
            mode: e,
            share_type: n,
            daily_seed: e === 'daily' ? r.seed : void 0,
          }),
          n === 'clipboard')
        )
          navigator.clipboard
            .writeText(i)
            .then(() => alert(o.t('game.copiedResults')))
            .catch((s) => {
              console.error(s), alert(o.t('game.errorCopy'))
            })
        else if (n === 'share') navigator.share({ text: i }).catch((s) => console.error(s))
        else if (n === 'image' || n === 'image_save') {
          const s = document.createElement('canvas')
          s.style.display = 'none'
          let S = ee - 1
          r.answersCorrect[0] >= 0 &&
            r.answersCorrect[1] >= 0 &&
            (S = Math.max(r.answersCorrect[0], r.answersCorrect[1]))
          let l = ee - 1
          r.answersCorrect[2] >= 0 &&
            r.answersCorrect[3] >= 0 &&
            (l = Math.max(r.answersCorrect[2], r.answersCorrect[3]))
          const E = 64,
            A = E / 16,
            c = E / 8,
            u = 0.75,
            T = E / 4
          ;(s.width = (E + A) * 11 - A), (s.height = (E + A) * (S + 1 + l + 1 + 4) - A)
          const f = s.getContext('2d')
          if (!f) return
          ;(f.fillStyle = 'black'), f.fillRect(0, 0, s.width, s.height)
          let I = 0,
            R = 0
          for (let h = 0; h <= S; h++) {
            let L = r.states[0][h]
            for (I = 0; I < Fe; I++)
              (f.fillStyle = dr(L == null ? void 0 : L[I])),
                Ft(f, I * (E + A), R * (E + A), E, E, c),
                yield Or(f, I * (E + A), R * (E + A), E, E, L == null ? void 0 : L[I], t)
            for (L = r.states[1][h], I = 6; I < Fe + 6; I++)
              (f.fillStyle = dr(L == null ? void 0 : L[I - 6])),
                Ft(f, I * (E + A), R * (E + A), E, E, c),
                yield Or(f, I * (E + A), R * (E + A), E, E, L == null ? void 0 : L[I - 6], t)
            R++
          }
          ;(f.font = E * u + 'px Arial'),
            (f.textAlign = 'center'),
            (f.textBaseline = 'alphabetic'),
            (f.fillStyle = '#ffffff')
          const m =
            e === 'daily'
              ? o.t(
                  t === 'april_fools' ? 'game.dailyQuordleFoolsShare' : 'game.dailyQuordleShare',
                  { num: r.seed },
                )
              : o.t(
                  t === 'april_fools'
                    ? 'game.practiceQuordleFoolsShare'
                    : 'game.practiceQuordleShare',
                )
          let N = f.measureText(m),
            v = N.actualBoundingBoxAscent
          f.fillText(m, s.width / 2, R * (E + A) + E - (E - v) / 2, s.width - T * 2), R++
          for (let h = 0; h < 2; h++) {
            for (let L = 0; L < 2; L++) {
              f.fillStyle = r.answersCorrect[L + h * 2] >= 0 ? '#00a6ed' : '#f8312f'
              const M = L * 2 - 1,
                F = s.width / 2 + M * (A / 2) + M * (E / 2)
              if ((Ft(f, F - E / 2, R * (E + A), E, E, c), r.answersCorrect[L + h * 2] >= 0)) {
                ;(f.textAlign = 'center'), (f.fillStyle = '#ffffff')
                const H = String(r.answersCorrect[L + h * 2] + 1)
                ;(N = f.measureText(H)),
                  (v = N.actualBoundingBoxAscent + N.actualBoundingBoxDescent),
                  f.fillText(H, F, R * (E + A) + E - (E - v) / 2, E)
              }
            }
            if (e === 'free') {
              ;(f.textAlign = 'right'), (f.fillStyle = '#ffffff')
              let L = r.answers[0 + h * 2]
              ;(N = f.measureText(L)),
                (v = N.actualBoundingBoxAscent + N.actualBoundingBoxDescent),
                f.fillText(
                  L,
                  s.width / 2 - A / 2 - E - T,
                  R * (E + A) + E - (E - v) / 2,
                  s.width / 2 - A - E - T * 2,
                ),
                (f.textAlign = 'left'),
                (L = r.answers[1 + h * 2]),
                (N = f.measureText(L)),
                (v = N.actualBoundingBoxAscent + N.actualBoundingBoxDescent),
                f.fillText(
                  L,
                  s.width / 2 + A / 2 + E + T,
                  R * (E + A) + E - (E - v) / 2,
                  s.width / 2 - A - E - T * 2,
                )
            }
            R++
          }
          ;(f.textAlign = 'center'),
            (f.textBaseline = 'middle'),
            (f.fillStyle = '#ffffff'),
            f.fillText(o.t('app.webAddress'), s.width / 2, R * (E + A) + E / 2, s.width),
            R++
          for (let h = 0; h <= l; h++) {
            I = 0
            let L = r.states[2][h]
            for (I = 0; I < Fe; I++)
              (f.fillStyle = dr(L == null ? void 0 : L[I])),
                Ft(f, I * (E + A), R * (E + A), E, E, c),
                yield Or(f, I * (E + A), R * (E + A), E, E, L == null ? void 0 : L[I], t)
            for (L = r.states[3][h], I = 6; I < Fe + 6; I++)
              (f.fillStyle = dr(L == null ? void 0 : L[I - 6])),
                Ft(f, I * (E + A), R * (E + A), E, E, c),
                yield Or(f, I * (E + A), R * (E + A), E, E, L == null ? void 0 : L[I - 6], t)
            R++
          }
          const g = yield new Promise((h) => s.toBlob(h))
          if (!g) return
          const O = `quordle-${e === 'daily' ? 'daily' : 'practice'}-${r.seed}.png`,
            D = new File([g], O, { type: 'image/png' })
          n === 'image'
            ? navigator.share({ files: [D], text: a }).catch((h) => console.error(h))
            : n === 'image_save' && NO.saveAs(D, O)
        }
      }),
    CO = P(
      '<button type="button" class="flex-1 text-sm min-h-[40px] text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 pt-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"></button>',
    ),
    DO = P('<span><a class="underline" target="_blank"></a></span>'),
    pO = P(
      '<div class="flex flex-col rounded-t-lg text-center px-4 pt-2 pb-4"><div class="text-2xl flex"><div class="flex flex-1 justify-end items-center"><span class="font-[Arial]"></span></div><div class="flex flex-1 justify-start items-center"><span class="font-[Arial]"></span></div></div><div class="text-2xl flex"><div class="flex flex-1 justify-end items-center"><span class="font-[Arial]"></span></div><div class="flex flex-1 justify-start items-center"><span class="font-[Arial]"></span></div></div><div class="flex gap-1 mt-2"></div><textarea class="font-[Courier] w-[100%] text-sm text-black dark:text-white bg-white dark:bg-gray-800 text-center rounded-lg mt-2 resize-none" rows="8" readonly></textarea></div>',
    ),
    An = P('<div class="flex flex-col items-center justify-center"><div></div></div>'),
    UO = P(
      '<div class="inline-flex" role="group"><button type="button" class="text-sm min-h-[40px] text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-l-lg px-4 pt-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-r-[1px] border-gray-400 transition-colors"><div class="flex flex-col items-center justify-center"><div></div></div></button><button type="button" class="text-lg min-h-[40px] text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-lg px-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"></button></div>',
    ),
    dn = (e) =>
      (() => {
        const t = CO.cloneNode(!0)
        return (
          Ie(t, 'click', e.onClick, !0),
          d(t, () => e.children),
          w(() => U(t, 'aria-label', e.ariaLabel)),
          t
        )
      })(),
    Rr = (e) => {
      const t = $(),
        [r] = de(),
        n = b(() => r[e.mode].answersCorrect[e.gameIndex]),
        o = b(() => r[e.mode].answers[e.gameIndex])
      return (() => {
        const i = DO.cloneNode(!0),
          a = i.firstChild
        return (
          d(a, o),
          w(
            (s) => {
              const S = {
                  'mr-4': e.marginSide === 'right',
                  'ml-4': e.marginSide === 'left',
                  'text-green-600 dark:text-green-500': r[e.mode].answersCorrect[e.gameIndex] >= 0,
                  'text-rose-600': r[e.mode].answersCorrect[e.gameIndex] < 0,
                },
                l = t.t('game.aria.shareAnswer', {
                  word: o(),
                  board: e.gameIndex + 1,
                  solved:
                    n() >= 0
                      ? t.t('game.aria.shareAnswerSolved', { smart_count: n() + 1 })
                      : t.t('game.aria.shareAnswerUnsolved'),
                }),
                E = t.t('app.dictionaryUrl', { word: r[e.mode].answers[e.gameIndex] }),
                A = t.t('game.aria.shareAnswerLinkDesc')
              return (
                (s._v$ = we(i, S, s._v$)),
                l !== s._v$2 && U(i, 'aria-label', (s._v$2 = l)),
                E !== s._v$3 && U(a, 'href', (s._v$3 = E)),
                A !== s._v$4 && U(a, 'aria-label', (s._v$4 = A)),
                s
              )
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 },
          ),
          i
        )
      })()
    },
    PO = (e) => {
      const t = $(),
        [r, n] = de(),
        [o, i] = Q(void 0),
        [a, s] = Q(!1),
        S = b(() => ls(e.mode, n.getGameVariation(), r[e.mode], t)[0])
      return (() => {
        const l = pO.cloneNode(!0),
          E = l.firstChild,
          A = E.firstChild,
          c = A.firstChild,
          u = A.nextSibling,
          T = u.firstChild,
          f = E.nextSibling,
          I = f.firstChild,
          R = I.firstChild,
          m = I.nextSibling,
          N = m.firstChild,
          v = f.nextSibling,
          g = v.nextSibling
        return (
          d(
            A,
            y(Rr, {
              get mode() {
                return e.mode
              },
              gameIndex: 0,
              marginSide: 'right',
            }),
            c,
          ),
          d(c, () => De(r[e.mode].answersCorrect[0])),
          d(T, () => De(r[e.mode].answersCorrect[1])),
          d(
            u,
            y(Rr, {
              get mode() {
                return e.mode
              },
              gameIndex: 1,
              marginSide: 'left',
            }),
            null,
          ),
          d(
            I,
            y(Rr, {
              get mode() {
                return e.mode
              },
              gameIndex: 2,
              marginSide: 'right',
            }),
            R,
          ),
          d(R, () => De(r[e.mode].answersCorrect[2])),
          d(N, () => De(r[e.mode].answersCorrect[3])),
          d(
            m,
            y(Rr, {
              get mode() {
                return e.mode
              },
              gameIndex: 3,
              marginSide: 'left',
            }),
            null,
          ),
          d(
            v,
            xl &&
              y(dn, {
                onClick: () => {
                  W(r.vibration),
                    n.updateShareTime(),
                    fr(e.mode, n.getGameVariation(), r[e.mode], 'share', t)
                },
                get ariaLabel() {
                  return t.t('game.share')
                },
                get children() {
                  const O = An.cloneNode(!0),
                    D = O.firstChild
                  return d(O, Fl ? y(kd, {}) : y($d, {}), D), d(D, () => t.t('game.share')), O
                },
              }),
            null,
          ),
          d(
            v,
            Wl
              ? (() => {
                  const O = UO.cloneNode(!0),
                    D = O.firstChild,
                    h = D.firstChild,
                    L = h.firstChild,
                    M = D.nextSibling
                  return (
                    (D.$$click = () => {
                      W(r.vibration),
                        n.updateShareTime(),
                        fr(e.mode, n.getGameVariation(), r[e.mode], 'image', t)
                    }),
                    d(h, y(wd, { height: 16 }), L),
                    d(L, () => t.t('game.shareImage')),
                    (M.$$click = () => {
                      W(r.vibration),
                        n.updateShareTime(),
                        fr(e.mode, n.getGameVariation(), r[e.mode], 'image_save', t)
                    }),
                    d(M, y(ei, {})),
                    w(
                      (F) => {
                        const H = t.t('game.shareImage'),
                          J = t.t('game.saveImage')
                        return (
                          H !== F._v$8 && U(D, 'aria-label', (F._v$8 = H)),
                          J !== F._v$9 && U(M, 'aria-label', (F._v$9 = J)),
                          F
                        )
                      },
                      { _v$8: void 0, _v$9: void 0 },
                    ),
                    O
                  )
                })()
              : y(dn, {
                  onClick: () => {
                    W(r.vibration),
                      n.updateShareTime(),
                      fr(e.mode, n.getGameVariation(), r[e.mode], 'image_save', t)
                  },
                  get ariaLabel() {
                    return t.t('game.saveImage')
                  },
                  get children() {
                    const O = An.cloneNode(!0),
                      D = O.firstChild
                    return d(O, y(ei, {}), D), d(D, () => t.t('game.saveImage')), O
                  },
                }),
            null,
          ),
          d(
            v,
            (() => {
              const O = V(() => !!o(), !0)
              return () =>
                O() &&
                y(dn, {
                  onClick: () => {
                    W(r.vibration),
                      n.updateShareTime(),
                      Re('event', 'share', {
                        mode: e.mode,
                        share_type: 'clipboard',
                        daily_seed: e.mode === 'daily' ? r[e.mode].seed : void 0,
                      }),
                      s(!0)
                    const D = o()
                    if (D) {
                      D.select(), document.execCommand('copy')
                      const h = window.getSelection && window.getSelection()
                      h && h.removeAllRanges(), D.blur()
                    }
                    alert(t.t('game.copiedResults'))
                  },
                  get ariaLabel() {
                    return t.t('game.copyClipboard')
                  },
                  get children() {
                    const D = An.cloneNode(!0),
                      h = D.firstChild
                    return d(D, y(ts, {}), h), d(h, () => t.t('game.copyClipboard')), D
                  },
                })
            })(),
            null,
          ),
          i(g),
          d(g, S),
          w(
            (O) => {
              const D = t.t('game.aria.shareBanner'),
                h = { 'absolute top-[100%]': !a() },
                L = t.t('game.copyClipboard')
              return (
                D !== O._v$5 && U(l, 'aria-label', (O._v$5 = D)),
                (O._v$6 = we(g, h, O._v$6)),
                L !== O._v$7 && U(g, 'aria-label', (O._v$7 = L)),
                O
              )
            },
            { _v$5: void 0, _v$6: void 0, _v$7: void 0 },
          ),
          l
        )
      })()
    }
  He(['click'])
  const MO = P(
      '<div class="quordle-box w-[20%]" role="cell"><div class="quordle-box-content"> </div></div>',
    ),
    Ss = (e) => {
      const [t, r] = Q(!1),
        n = b(() =>
          e.rowTemporalState === 'present' || e.gameSize === 'square'
            ? e.presentTileHeight
            : e.tileHeight,
        )
      return (
        le(() => {
          if (n() > 0) {
            const o = setTimeout(() => {
              r(!0)
            }, 100)
            Pe(() => clearTimeout(o))
          }
        }),
        (() => {
          const o = MO.cloneNode(!0),
            i = o.firstChild,
            a = i.firstChild
          return (
            w(
              (s) => {
                const S = {
                    'bg-box-correct': e.state === 'correct' && !e.colorblind,
                    'bg-box-correct-alt': e.state === 'correct' && e.colorblind,
                    'bg-box-diff': e.state === 'diff' && !e.colorblind,
                    'bg-box-diff-alt': e.state === 'diff' && e.colorblind,
                    'bg-gray-200 dark:bg-gray-700':
                      e.state === 'none' && e.rowTemporalState === 'past',
                    'bg-gray-300 dark:bg-gray-600':
                      e.rowTemporalState === 'present' && !e.answered,
                    'bg-gray-100 dark:bg-gray-900':
                      e.rowTemporalState === 'future' ||
                      e.rowTemporalState === 'never' ||
                      (e.rowTemporalState === 'present' && e.answered),
                    'text-black': e.state === 'correct' || e.state === 'diff',
                    'text-rose-600': e.state === 'invalid',
                    'text-black dark:text-white': e.state === 'none',
                    'quordle-heartbeat-anim dark:quordle-heartbeat-anim-dark':
                      e.activeCol === e.gameCol && e.rowTemporalState === 'present' && !e.answered,
                    'quordle-letter-anim': e.letter !== '' && e.rowTemporalState === 'present',
                    'quordle-box-connected':
                      e.rowTemporalState === 'future' || e.rowTemporalState === 'never',
                    'quordle-box-animate': t(),
                  },
                  l = n() + 'px',
                  E = Math.min(n() * 0.8, 30) + 'px',
                  A = e.ariaLabel,
                  c = e.letter
                return (
                  (s._v$ = we(o, S, s._v$)),
                  l !== s._v$2 && o.style.setProperty('height', (s._v$2 = l)),
                  E !== s._v$3 && o.style.setProperty('font-size', (s._v$3 = E)),
                  A !== s._v$4 && U(o, 'aria-label', (s._v$4 = A)),
                  c !== s._v$5 && (a.data = s._v$5 = c),
                  s
                )
              },
              { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0, _v$5: void 0 },
            ),
            o
          )
        })()
      )
    },
    bO = (e) => {
      const t = $(),
        r = e.gameX + e.gameY * yt,
        [n] = de(),
        o = b(() => n[e.mode].current.length),
        i = b(() => {
          const l = n[e.mode],
            E = l.current,
            A = l.guesses
          return (
            e.gameRow <= e.answerIndex ||
            (e.answerIndex === -1 && e.gameRow < A.length) ||
            (e.answerIndex === -1 && e.gameRow === A.length && e.gameCol < E.length)
          )
        }),
        a = b(() => {
          const l = n[e.mode],
            E = l.guesses,
            A = l.current
          let c = ''
          if (i())
            e.gameRow < E.length
              ? (c = E[e.gameRow][e.gameCol])
              : e.gameRow === E.length && (c = A[e.gameCol])
          else return c
          return c
        }),
        s = b(() => {
          var u
          const l = n[e.mode],
            E = l.guesses,
            A = l.states,
            c = l.current
          if (i()) {
            if (e.gameRow < E.length)
              return ((u = A[r][e.gameRow]) == null ? void 0 : u[e.gameCol]) || 'none'
            if (
              e.gameRow === E.length &&
              c.length === 5 &&
              !n.allowedSet.has(c) &&
              !n.wordBankSet.has(c)
            )
              return 'invalid'
          }
          return 'none'
        }),
        S = b(() => {
          const l = { letter: a() ? a() : t.t('game.aria.blank'), column: e.gameCol + 1 }
          return e.answered || e.temporalState === 'never'
            ? t.t('game.aria.tileNever', l)
            : e.temporalState === 'future'
            ? t.t('game.aria.tileFuture', l)
            : s() === 'invalid'
            ? t.t('game.aria.tileInvalid', l)
            : e.temporalState === 'present'
            ? t.t('game.aria.tilePresent', l)
            : s() === 'diff'
            ? t.t('game.aria.tileDiff', l)
            : s() === 'none'
            ? t.t('game.aria.tileNone', l)
            : t.t('game.aria.tileCorrect', l)
        })
      return y(Ss, {
        get state() {
          return s()
        },
        get letter() {
          return a()
        },
        get gameRow() {
          return e.gameRow
        },
        get gameCol() {
          return e.gameCol
        },
        get rowTemporalState() {
          return e.temporalState
        },
        get activeCol() {
          return o()
        },
        get colorblind() {
          return n.colorblind
        },
        get currentRow() {
          return n[e.mode].guesses.length
        },
        get tileHeight() {
          return e.tileHeight
        },
        get presentTileHeight() {
          return e.presentTileHeight
        },
        get answered() {
          return e.answered
        },
        get gameSize() {
          return n.gameSize
        },
        get ariaLabel() {
          return S()
        },
      })
    }
  function YO(e) {
    if (typeof window != 'undefined' && window.navigator) return !!navigator.userAgent.match(e)
  }
  const Es = YO(/iP(ad|od|hone)/i),
    BO = typeof window != 'undefined' ? Es && 'download' in document.createElement('a') : null
  if (Es && !BO) {
    const e = document.querySelector('html')
    ;(e.style.cursor = 'pointer'), (e.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)')
  }
  const te = [],
    wO = (e) => {
      te.push(e)
    },
    ni = (e) => {
      const t = te.findIndex((n) => n.uniqueId === e)
      if (t === -1) return
      const r = te[t]
      return te.splice(t, 1), r
    },
    HO = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      '[tabindex]',
      '[contentEditable=true]',
    ].reduce((e, t, r) => `${e}${r ? ',' : ''}${t}:not([tabindex="-1"])`, ''),
    $e = ({
      from: e = document.activeElement,
      stopAtElement: t,
      ignoreElement: r = [],
      allowSelectors: n,
      direction: o = 'forwards',
    }) => {
      const i = e.parentElement,
        a = e,
        s = HO + (n ? ',' + n.join(',') : '')
      if (!a) return null
      const S = (f, I = window) => {
          const R = (N) => N.display === 'none' || N.visibility === 'hidden'
          if ((f.style && R(f.style)) || f.hidden) return !0
          const m = I.getComputedStyle(f)
          return !!(!m || R(m))
        },
        l = (f, I, R) => {
          const m = []
          let N = f
          if (S(N)) return !0
          for (; (N = N.parentElement), !(!N || N === I); ) m.push(N)
          for (const v of m) if (S(v, R)) return !0
          return !1
        },
        E = (f, I, R, m) => {
          const N = f.length
          if (N && S(I)) return null
          if (R) {
            for (let v = N - 1; v > -1; v--) {
              const g = f[v]
              if (!r.some((O) => O.contains(g)) && !l(g, I, m)) {
                if (g.tagName === 'IFRAME') {
                  const O = c(g, R)
                  if (O) return O
                }
                return g
              }
            }
            return null
          }
          for (let v = 0; v < N; v++) {
            const g = f[v]
            if (!r.some((O) => O.contains(g)) && !l(g, I, m)) {
              if (g.tagName === 'IFRAME') {
                const O = c(g)
                if (O) return O
              }
              return g
            }
          }
          return null
        },
        A = (f) => {
          try {
            return f.contentWindow
          } catch (I) {
            return null
          }
        },
        c = (f, I) => {
          if (!f) return null
          if (f.tagName !== 'IFRAME') return f
          const R = A(f),
            m = R.document
          if (!R || f.getAttribute('tabindex')) return f
          const v = m.querySelectorAll(s),
            g = E(v, m.documentElement, I, R)
          return c(g)
        },
        u = (f, I) => {
          let R = !1
          const m = f.children,
            N = m.length
          if (o === 'forwards')
            for (let v = 0; v < N; v++) {
              const g = m[v]
              if (R) {
                if (r.some((h) => h === g)) continue
                if (g.matches(s)) {
                  if (S(g)) continue
                  const h = c(g)
                  return h || g
                }
                const O = g.querySelectorAll(s),
                  D = E(O, g)
                if (D) return D
                continue
              }
              if (g === t) return null
              if (g === I) {
                R = !0
                continue
              }
            }
          else
            for (let v = N - 1; v >= 0; v--) {
              const g = m[v]
              if (R) {
                if (r.some((h) => h === g)) continue
                if (g.matches(s)) {
                  if (S(g)) continue
                  const h = c(g)
                  return h || g
                }
                const O = g.querySelectorAll(s),
                  D = E(O, g, !0)
                if (D) return D
                continue
              }
              if (g === t) return null
              if (g === I) {
                R = !0
                continue
              }
            }
          return (I = f), (f = f.parentElement), f ? u(f, I) : null
        }
      return u(i, a)
    }
  let On = !1,
    Pn = !1,
    It = null,
    cs = 0,
    Mn = null,
    yr = null
  const G = {
      closeByFocusSentinel: !1,
      closedBySetOpen: !1,
      addedDocumentClick: !1,
      documentClickTimeout: null,
      closedByEvents: !1,
      focusedMenuBtns: new Set(),
    },
    Pt = (e) => {
      const t = e.target
      ke(
        te,
        (r) => {
          if (
            !(
              r.overlay ||
              r.overlayElement ||
              Me(r.menuBtnEls).contains(t) ||
              r.containerEl.contains(t)
            )
          )
            return r
        },
        (r) => {
          const { setOpen: n } = r
          ;(G.closedByEvents = !0), n(!1)
        },
      ),
        (G.addedDocumentClick = !1)
    },
    us = (e) => {
      const t = te[te.length - 1]
      setTimeout(() => {
        const n = e.timeStamp - cs
        if (!document.hasFocus() && n < 50) {
          ke(
            te,
            (o) => o,
            (o) => {
              const { setOpen: i } = o
              ;(G.closedByEvents = !0), i(!1)
            },
          )
          return
        }
      })
      const r = (n) => {
        if (n.overlay || n.overlayEl || !n.closeWhenDocumentBlurs) return
        Me(n.menuBtnEls).focus(), (G.closedByEvents = !0), n.setOpen(!1)
      }
      t.overlay ||
        setTimeout(() => {
          const n = document.activeElement
          if (!n || n.tagName !== 'IFRAME') {
            ke(
              te,
              (o) => o,
              (o) => r(o),
            )
            return
          }
          ke(
            te,
            (o) => {
              const { containerEl: i } = o
              if (i.contains(n)) {
                ;(yr = n), fs(), document.addEventListener('visibilitychange', Os)
                return
              }
              return o
            },
            (o) => {
              const { setOpen: i } = o
              ;(G.closedByEvents = !0), i(!1)
            },
          )
        })
    },
    As = (e) => {
      const {
        focusedMenuBtn: t,
        setOpen: r,
        menuBtnEls: n,
        cursorKeys: o,
        closeWhenEscapeKeyIsPressed: i,
        focusElementOnClose: a,
        timeouts: s,
      } = te[te.length - 1]
      if ((e.key === 'Tab' && (cs = e.timeStamp), o && KO(e), e.key !== 'Escape' || !i)) return
      const S = Me(n),
        l = Ae({}, { inputElement: a, type: 'focusElementOnClose', subType: 'escapeKey' }) || S
      l && (l.focus(), l === S && Rs({ focusedMenuBtn: t, timeouts: s, el: l })),
        (G.closedByEvents = !0),
        r(!1)
    },
    no = (e) => {
      const t = e.target
      Mn !== t &&
        ke(
          te,
          (r) => {
            const { menuPopupEl: n } = r
            return n.contains(t) ? ((Mn = t), null) : r
          },
          (r) => {
            const { setOpen: n, focusElementOnClose: o, menuBtnEls: i } = r,
              a = Me(i)
            ;(G.closedByEvents = !0), n(!1)
            const s =
              Ae({}, { inputElement: o, type: 'focusElementOnClose', subType: 'scrolling' }) || a
            s && s.focus()
          },
        )
    },
    GO = (e) => {
      ;(Mn = null),
        !Pn &&
          e &&
          ((Pn = !1),
          window.addEventListener('wheel', no, { capture: !0, passive: !0 }),
          document.body.addEventListener('touchmove', ds)),
        !te.length &&
          (document.addEventListener('keydown', As), window.addEventListener('blur', us))
    },
    oi = () => {
      te.length ||
        ((Pn = !1),
        (G.addedDocumentClick = !1),
        window.clearTimeout(G.documentClickTimeout),
        (G.documentClickTimeout = null),
        document.removeEventListener('keydown', As),
        document.removeEventListener('click', Pt),
        window.removeEventListener('blur', us),
        window.removeEventListener('wheel', no, { capture: !0 }),
        document.body.removeEventListener('touchmove', ds))
    },
    ds = () => {
      On ||
        ((On = !0),
        document.body.addEventListener(
          'touchend',
          () => {
            On = !1
          },
          { once: !0 },
        ),
        window.addEventListener('scroll', no, { capture: !0, passive: !0, once: !0 }))
    },
    KO = (e) => {
      const t = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'],
        r = ['ArrowLeft', 'ArrowRight']
      if (!t.includes(e.key) || (e.preventDefault(), r.includes(e.key))) return
      const {
          menuBtnEls: n,
          menuPopupEl: o,
          containerEl: i,
          focusSentinelBeforeEl: a,
        } = te[te.length - 1],
        s = Me(n)
      let S = document.activeElement,
        l
      e.key === 'ArrowDown' ? (l = 'forwards') : (l = 'backwards'),
        (S === s || S === o || S === i) && ((l = 'forwards'), (S = a))
      const E = $e({ from: S, direction: l, stopAtElement: o })
      E && E.focus()
    },
    Os = () => {
      if (document.visibilityState === 'visible' && It != null) {
        fs()
        return
      }
      clearTimeout(It)
    },
    fs = () => {
      const t = () => {
        const r = document.activeElement
        if (!!r) {
          if (yr === r) {
            It = window.setTimeout(t, 250)
            return
          }
          ke(
            te,
            (n) => {
              const { containerEl: o } = n
              if (r.tagName === 'IFRAME') {
                if (o && !o.contains(r)) return n
                ;(yr = r), (It = window.setTimeout(t, 250))
              }
            },
            (n) => {
              const { setOpen: o } = n
              ;(G.closedByEvents = !0),
                o(!1),
                (yr = null),
                (It = null),
                document.removeEventListener('visibilitychange', Os)
            },
          )
        }
      }
      It = window.setTimeout(t, 250)
    },
    FO = (e, t) => {
      const { containerEl: r, setOpen: n, onClickDocumentRef: o } = e
      r.contains(t.target) ||
        ((G.closedByEvents = !0),
        n(!1),
        (e.prevFocusedEl = null),
        (e.addedFocusOutAppEvents = !1),
        document.removeEventListener('click', o))
    },
    xO = (e, t) => {
      const { containerEl: r, setOpen: n, onFocusFromOutsideAppOrTabRef: o } = e
      if (!!r) {
        if (r.contains(t.target)) {
          ;(e.addedFocusOutAppEvents = !1),
            e.prevFocusedEl && e.prevFocusedEl.removeEventListener('focus', o),
            (e.prevFocusedEl = null)
          return
        }
        e.prevFocusedEl && e.prevFocusedEl.removeEventListener('focus', o),
          (e.prevFocusedEl = null),
          (G.closedByEvents = !0),
          n(!1),
          (e.addedFocusOutAppEvents = !1)
      }
    },
    bn = (e) => {
      const { onFocusFromOutsideAppOrTabRef: t, onClickDocumentRef: r } = e
      !e.prevFocusedEl ||
        (e.prevFocusedEl.removeEventListener('focus', t),
        document.removeEventListener('click', r),
        (e.prevFocusedEl = null),
        (e.addedFocusOutAppEvents = !1))
    }
  let mt = !1
  const WO = (e, t) => {
      const {
          timeouts: r,
          closeWhenMenuButtonIsClicked: n,
          focusedMenuBtn: o,
          onClickOutsideMenuButtonRef: i,
          setOpen: a,
          open: s,
        } = e,
        S = t.currentTarget
      if (
        (G.focusedMenuBtns.forEach((l) => (l.el = null)),
        document.removeEventListener('click', i),
        setTimeout(() => {
          document.addEventListener('click', i, { once: !0 })
        }),
        (e.menuBtnKeyupTabFired = !1),
        mt && !s())
      ) {
        mt = !1
        return
      }
      if (
        ((mt = !1),
        (G.addedDocumentClick = !1),
        document.removeEventListener('click', Pt),
        S.focus(),
        (o.el = S),
        G.focusedMenuBtns.add(o),
        clearTimeout(r.containerFocusTimeoutId),
        clearTimeout(r.menuButtonBlurTimeoutId),
        (r.containerFocusTimeoutId = null),
        s() ||
          (S.addEventListener('focus', e.onFocusMenuButtonRef, { once: !0 }),
          S.addEventListener('keydown', e.onKeydownMenuButtonRef),
          S.addEventListener('blur', e.onBlurMenuButtonRef)),
        !n)
      ) {
        a(!0)
        return
      }
      s() && (G.closedByEvents = !0), a(!s())
    },
    _O = (e, t) => {
      const {
        containerEl: r,
        focusedMenuBtn: n,
        overlay: o,
        setOpen: i,
        timeouts: a,
        closeWhenMenuButtonIsClicked: s,
      } = e
      if (e.menuBtnKeyupTabFired) {
        e.menuBtnKeyupTabFired = !1
        return
      }
      if (mt && !s) return
      if (!t.relatedTarget) {
        o ||
          G.addedDocumentClick ||
          ((G.addedDocumentClick = !0), document.addEventListener('click', Pt, { once: !0 }))
        return
      }
      if ((bn(e), !r || r.contains(t.relatedTarget))) return
      const S = () => {
        ;(G.closedByEvents = !0), (n.el = null), i(!1)
      }
      a.menuButtonBlurTimeoutId = window.setTimeout(S)
    },
    $O = (e, t) => {
      const r = t.currentTarget
      if (!e.open()) {
        ke(
          te,
          (n) => {
            if (!n.containerEl.contains(r)) return n
          },
          (n) => {
            G.focusedMenuBtns.forEach((o) => (o.el = null)), (G.closedByEvents = !0), n.setOpen(!1)
          },
        ),
          (mt = !1)
        return
      }
      mt = !0
    },
    kO = (e) => {
      e.focusedMenuBtn.el = null
    },
    VO = (e, t) => {
      const {
          containerEl: r,
          setOpen: n,
          open: o,
          onKeydownMenuButtonRef: i,
          onBlurMenuButtonRef: a,
          mount: s,
          focusSentinelBeforeEl: S,
          focusSentinelAfterEl: l,
        } = e,
        E = t.currentTarget
      if (t.key !== 'Tab' || (G.focusedMenuBtns.forEach((c) => (c.el = null)), !o())) return
      if (((e.menuBtnKeyupTabFired = !0), t.key === 'Tab' && t.shiftKey)) {
        if (((G.closedByEvents = !0), !s || E.nextElementSibling !== r)) {
          t.preventDefault()
          let c = $e({ from: E, direction: 'backwards', ignoreElement: [r, S, l] })
          c && c.focus()
        }
        n(!1), E.removeEventListener('keydown', i), E.removeEventListener('blur', a)
        return
      }
      t.preventDefault()
      let A = $e({ from: S, stopAtElement: r })
      A ? A.focus() : r.focus(),
        A || (n(!1), (A = $e({ from: S })), A && A.focus()),
        E.removeEventListener('keydown', i),
        E.removeEventListener('blur', a)
    },
    ZO = (e) => {
      const { closeWhenMenuButtonIsTabbed: t, timeouts: r } = e
      t || clearTimeout(r.containerFocusTimeoutId)
    },
    Me = (e) =>
      e.length <= 1
        ? e[0]
        : e.find((t) => {
            if (!(!t || Yn(t))) return t
          }),
    Rs = ({ focusedMenuBtn: e, timeouts: t, el: r }) => {
      ;(e.el = r),
        r.addEventListener(
          'blur',
          (n) => {
            const o = n.currentTarget
            G.focusedMenuBtns.add(e),
              setTimeout(() => {
                !o.isConnected || (e.el = null)
              })
          },
          { once: !0 },
        )
    },
    Is = (e, t) => {
      !e ||
        !e.menuBtnEls ||
        e.menuBtnEls.forEach((r) => {
          r.removeEventListener('focus', e.onFocusMenuButtonRef),
            r.removeEventListener('blur', e.onBlurMenuButtonRef),
            t &&
              (r.removeEventListener('click', e.onClickMenuButtonRef),
              r.removeEventListener('mousedown', e.onMouseDownMenuButtonRef))
        })
    },
    ke = (e, t, r) => {
      for (let n = e.length - 1; n >= 0; n--) {
        const o = t(e[n])
        if (o) {
          r(o)
          continue
        }
        return
      }
    },
    XO = (e) => e.replace(/-./g, (t) => t.toUpperCase()[1]),
    QO = ({ parent: e, matchEl: t }) => {
      if (e === t) return !0
      const r = (n) => {
        if (!n) return !1
        const o = n.children[0]
        return o === t ? !0 : r(o)
      }
      return r(e)
    },
    Ae = (e, { inputElement: t, type: r, subType: n }) => {
      var o
      if (t === 'menuPopup') return e.menuPopupEl
      if (t === 'menuButton') return Me(e.menuBtnEls)
      if (r === 'focusElementOnOpen')
        return t === 'firstChild'
          ? $e({ from: e.focusSentinelBeforeEl, stopAtElement: e.containerEl })
          : typeof t == 'string'
          ? (o = e.containerEl) == null
            ? void 0
            : o.querySelector(t)
          : t instanceof Element
          ? t
          : t()
      if (t == null && r === 'menuPopup')
        return e.containerEl ? (e.menuPopupEl ? e.menuPopupEl : e.containerEl.children[1]) : null
      if ((typeof t == 'string' && r === 'menuButton') || typeof t == 'string')
        return document.querySelector(t)
      if (t instanceof Element) return t
      if (typeof t == 'function') {
        const i = t()
        if (i instanceof Element) return i
        if (r === 'closeButton') return e.containerEl ? e.containerEl.querySelector(i) : null
      }
      if (r === 'focusElementOnClose') {
        if (!t) return null
        switch (n) {
          case 'tabForwards':
            return Ae(e, { inputElement: t.tabForwards })
          case 'tabBackwards':
            return Ae(e, { inputElement: t.tabBackwards })
          case 'click':
            return Ae(e, { inputElement: t.click })
          case 'escapeKey':
            return Ae(e, { inputElement: t.escapeKey })
          case 'scrolling':
            return Ae(e, { inputElement: t.scrolling })
        }
      }
      if (t == null) return null
      if (Array.isArray(t)) return t.map((i) => Ae(e, { inputElement: i, type: r }))
      for (const i in t) {
        const a = t[i]
        return Ae(e, { inputElement: a })
      }
      return null
    },
    Yn = (e) => e.offsetHeight === 0 && e.offsetWidth === 0,
    JO = (e) => {
      const { menuPopup: t } = e
      e.menuPopupAdded ||
        ((e.menuPopupEl = Ae(e, { inputElement: t, type: 'menuPopup' })),
        e.menuPopupEl && ((e.menuPopupAdded = !0), e.menuPopupEl.setAttribute('tabindex', '-1')))
    },
    ii = (e) => {
      !e.menuPopupEl || !e.menuPopupAdded || ((e.menuPopupEl = null), (e.menuPopupAdded = !1))
    },
    ai = (e) => {
      const { useShadow: t } = e,
        r = e.marker || document.createTextNode(''),
        n = e.mount || document.body
      function o() {
        if (Ue.context) {
          const [S, l] = Q(!1)
          return queueMicrotask(() => l(!0)), () => S() && e.popupChildren
        } else return () => e.popupChildren
      }
      const i = document.createElement('div'),
        a = t && i.attachShadow ? i.attachShadow({ mode: 'open' }) : i
      Object.defineProperty(i, 'host', {
        get() {
          return r.parentNode
        },
      }),
        d(a, o())
      const s = e.overlayChildren
      return (
        s && i.insertAdjacentElement('afterbegin', s),
        n.appendChild(i),
        e.ref && e.ref(i),
        e.onCreate != null && e.onCreate(n, i, r),
        e.stopComponentEventPropagation ? null : r
      )
    },
    zO = (e) => {
      let t
      const [r, n] = Q(),
        o = Gn(() => e.children),
        {
          onBeforeEnter: i,
          onEnter: a,
          onAfterEnter: s,
          onBeforeExit: S,
          onExit: l,
          onAfterExit: E,
          appendToElement: A,
        } = e
      function c(I) {
        const R = e.name || 's',
          m = XO(I) + 'Class',
          N = e[m]
        return N ? N.split(' ') : [`${R}-${I}`]
      }
      const u = (I) =>
        A
          ? A === 'menuPopup'
            ? Ae({ containerEl: I }, { inputElement: null, type: 'menuPopup' })
            : typeof A == 'string'
            ? I.querySelector(A)
            : A
          : I
      function T(I, R) {
        const m = c('enter'),
          N = c('enter-active'),
          v = c('enter-to'),
          g = u(I)
        i && i(g),
          g.classList.add(...m),
          g.classList.add(...N),
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              g.classList.remove(...m),
                g.classList.add(...v),
                a && a(g, O),
                (!a || a.length < 2) &&
                  (g.addEventListener('transitionend', O, { once: !0 }),
                  g.addEventListener('animationend', O, { once: !0 }))
            })
          })
        function O() {
          g && (g.classList.remove(...N), g.classList.remove(...v), r() !== I && n(I), s && s(g))
        }
        n(I)
      }
      function f(I) {
        const R = c('exit'),
          m = c('exit-active'),
          N = c('exit-to'),
          v = u(I)
        if (!I.parentNode) return g()
        S && S(I),
          v.classList.add(...R),
          v.classList.add(...m),
          requestAnimationFrame(() => {
            v.classList.remove(...R), v.classList.add(...N)
          }),
          l && l(v, g),
          (!l || l.length < 2) &&
            (v.addEventListener('transitionend', g, { once: !0 }),
            v.addEventListener('animationend', g, { once: !0 }))
        function g() {
          v.classList.remove(...m), v.classList.remove(...N), r() === I && n(void 0), E && E(v)
        }
      }
      return (
        Fr((I) => {
          for (t = o(); typeof t == 'function'; ) t = t()
          return Be(() => (t && t !== I && T(t), I && I !== t && f(I), t))
        }),
        [r]
      )
    },
    si = (e, { onCleanup: t = !1 } = {}) => {
      document.removeEventListener('click', e.onClickDocumentRef), Is(e, t)
    },
    qO = (e, t) => {
      const {
          overlay: r,
          overlayElement: n,
          open: o,
          mount: i,
          setOpen: a,
          timeouts: s,
          stopComponentEventPropagation: S,
          focusedMenuBtn: l,
        } = e,
        E = t.relatedTarget
      if (!r && !n && !!o() && !G.closedBySetOpen) {
        if (i && S) {
          G.addedDocumentClick ||
            ((G.addedDocumentClick = !0), document.addEventListener('click', Pt, { once: !0 }))
          return
        }
        if (!E) {
          if (te.find((A) => A.overlay)) return
          G.addedDocumentClick ||
            ((G.addedDocumentClick = !0), document.addEventListener('click', Pt, { once: !0 }))
          return
        }
        s.containerFocusTimeoutId = window.setTimeout(() => {
          ;(G.closedByEvents = !0), a(!1)
        })
      }
    },
    jO = (e, t) => {
      const { timeouts: r } = e
      clearTimeout(r.containerFocusTimeoutId),
        clearTimeout(r.menuButtonBlurTimeoutId),
        (r.containerFocusTimeoutId = null)
    },
    ef = (e) => {
      const { focusElementOnOpen: t, focusedMenuBtn: r } = e
      if (t == null) return
      const n = Ae(e, { inputElement: t, type: 'focusElementOnOpen' })
      n &&
        setTimeout(() => {
          n.focus(), (r.el = null)
        })
    },
    tf = (e) => {
      const {
        closeWhenOverlayClicked: t,
        menuPopupEl: r,
        focusElementOnClose: n,
        menuBtnEls: o,
      } = e
      if (!t) {
        r.focus()
        return
      }
      const i = Me(o),
        a = Ae(e, { inputElement: n, type: 'focusElementOnClose', subType: 'click' }) || i
      a && a.focus(),
        ke(
          te,
          (s) => {
            if (!s.overlayElement) return s
          },
          (s) => {
            const { setOpen: S } = s
            ;(G.closedByEvents = !0), S(!1)
          },
        ),
        (G.closedByEvents = !0),
        e.setOpen(!1)
    },
    rf = (e) => {
      const {
        enableLastFocusSentinel: t,
        menuBtnEls: r,
        containerEl: n,
        focusSentinelAfterEl: o,
      } = e
      if (t) return
      const a = Me(r).nextElementSibling
      QO({ parent: a, matchEl: n }) || o.setAttribute('tabindex', '0')
    },
    li = (e, t, r) => {
      const {
          uniqueId: n,
          containerEl: o,
          menuBtnEls: i,
          focusSentinelBeforeEl: a,
          trapFocus: s,
          focusSentinelAfterEl: S,
          closeWhenMenuButtonIsTabbed: l,
          focusElementOnClose: E,
          mount: A,
          open: c,
          setOpen: u,
        } = e,
        T = Me(i)
      te.forEach((R) => window.clearTimeout(R.timeouts.containerFocusTimeoutId))
      const f = (R, m) => {
        ke(
          te,
          (N) => {
            if (m && Me(N.menuBtnEls) === R && !N.closeWhenMenuButtonIsTabbed) {
              T.addEventListener('focus', e.onFocusMenuButtonRef, { once: !0 }),
                T.addEventListener('keydown', e.onKeydownMenuButtonRef),
                T.addEventListener('blur', e.onBlurMenuButtonRef, { once: !0 })
              return
            }
            if (N.uniqueId === n || !N.containerEl.contains(R)) return N
          },
          (N) => {
            ;(G.closedByEvents = !0), N.setOpen(!1)
          },
        ),
          R && R.focus()
      }
      if (!c()) return
      if (r === o || r === T) {
        $e({ from: a, stopAtElement: o }).focus()
        return
      }
      if (t === 'before') {
        if (s) {
          $e({ from: S, direction: 'backwards', stopAtElement: o }).focus()
          return
        }
        if (l) {
          ;(G.closedByEvents = !0), u(!1), T.focus()
          return
        }
        const R =
          Ae(e, { inputElement: E, type: 'focusElementOnClose', subType: 'tabBackwards' }) || T
        f(R, !0)
        return
      }
      if (s) {
        $e({ from: a, stopAtElement: o }).focus()
        return
      }
      const I =
        Ae(e, { inputElement: E, type: 'focusElementOnClose', subType: 'tabForwards' }) ||
        $e({ from: T, ignoreElement: [o] })
      if (A) {
        f(I)
        return
      }
      I && I.focus(), (G.closedByEvents = !0), u(!1)
    },
    nf = P('<div role="presentation"></div>'),
    of = P(
      '<div><div style="position: fixed; top: 0; left: 0; outline: none; pointer-events: none; width: 0; height: 0;" aria-hidden="true"></div><div style="position: fixed; top: 0; left: 0; outline: none; pointer-events: none; width: 0; height: 0;" aria-hidden="true"></div></div>',
    ),
    af = (e) => {
      const t = e.modal || !1,
        {
          id: r,
          menuButton: n,
          menuPopup: o,
          focusElementOnClose: i,
          focusElementOnOpen: a,
          cursorKeys: s = !1,
          closeWhenMenuButtonIsTabbed: S = !1,
          closeWhenMenuButtonIsClicked: l = !0,
          closeWhenScrolling: E = !1,
          closeWhenDocumentBlurs: A = !1,
          closeWhenOverlayClicked: c = !0,
          closeWhenEscapeKeyIsPressed: u = !0,
          overlay: T = t,
          overlayElement: f = t,
          trapFocus: I = t,
          removeScrollbar: R = t,
          enableLastFocusSentinel: m = !1,
          mount: N = t ? 'body' : void 0,
          show: v = !1,
          onOpen: g,
        } = e,
        O = {
          mount: N,
          addedFocusOutAppEvents: !1,
          closeWhenOverlayClicked: c,
          closeWhenDocumentBlurs: A,
          closeWhenEscapeKeyIsPressed: u,
          closeWhenMenuButtonIsClicked: l,
          closeWhenMenuButtonIsTabbed: S,
          closeWhenScrolling: E,
          cursorKeys: s,
          focusElementOnClose: i,
          focusElementOnOpen: a,
          id: r,
          uniqueId: Qs(),
          menuBtnId: '',
          focusedMenuBtn: { el: null },
          menuBtnKeyupTabFired: !1,
          menuButton: n,
          timeouts: { containerFocusTimeoutId: null, menuButtonBlurTimeoutId: null },
          upperStackRemovedByFocusOut: !1,
          menuPopup: o,
          closeByDismissEvent: !1,
          menuPopupAdded: !1,
          enableLastFocusSentinel: m,
          overlay: T,
          overlayElement: f,
          removeScrollbar: R,
          trapFocus: I,
          hasFocusSentinels: !!i || T || !!f || I || m,
          open: e.open,
          setOpen: e.setOpen,
          onClickOutsideMenuButtonRef: () => kO(O),
          onClickDocumentRef: (C) => xO(O, C),
          onClickOverlayRef: () => tf(O),
          onFocusInContainerRef: (C) => jO(O),
          onFocusOutContainerRef: (C) => qO(O, C),
          onBlurMenuButtonRef: (C) => _O(O, C),
          onClickMenuButtonRef: (C) => WO(O, C),
          onMouseDownMenuButtonRef: (C) => $O(O, C),
          onFocusFromOutsideAppOrTabRef: (C) => FO(O, C),
          onFocusMenuButtonRef: () => ZO(O),
          onKeydownMenuButtonRef: (C) => VO(O, C),
          refContainerCb: (C) => {
            if (f && ((C.style.zIndex = '1000'), t)) {
              ;(C.style.pointerEvents = 'none'), (C.style.position = 'relative')
              const p = (B) => {
                B.style.pointerEvents = 'all'
              }
              requestAnimationFrame(() => {
                const B = C.querySelector('[role="dialog"]')
                if (!B) {
                  const K = C.children
                  if (!K) return
                  const ne = K[1].firstElementChild
                  p(ne)
                  return
                }
                p(B)
              })
            }
            e.ref && e.ref(C), (O.containerEl = C)
          },
          refOverlayCb: (C) => {
            ;(C.style.position = 'fixed'),
              (C.style.top = '0'),
              (C.style.left = '0'),
              (C.style.width = '100%'),
              (C.style.height = '100%'),
              (C.style.zIndex = '1000'),
              typeof f == 'object' && f.ref && f.ref(C),
              (O.overlayEl = C)
          },
        }
      let D = N ? document.createTextNode('') : null
      const h = !e.open()
      let L,
        M,
        F,
        H,
        J,
        j,
        Y = !1
      function Se(C, p) {
        return (
          f && (C = C.nextElementSibling),
          p
            ? p === 'menuPopup'
              ? Ae({ containerEl: C }, { inputElement: null, type: 'menuPopup' })
              : typeof p == 'string'
              ? C.querySelector(p)
              : p
            : C
        )
      }
      function Oe(C, p) {
        if (C === 'overlay' && (!e.overlay || !e.overlay.animation)) return
        const B = C === 'popup' ? e.animation : e.overlay.animation
        if (!B || (!B.appear && !h)) return
        ;(Y = !1), (p = Se(p, B.appendToElement))
        const K = B.name
        let {
          onBeforeEnter: X,
          onEnter: ne,
          onAfterEnter: ce,
          enterActiveClass: ae = K + '-enter-active',
          enterClass: xe = K + '-enter',
          enterToClass: We = K + '-enter-to',
          exitActiveClass: St = K + '-exit-active',
          exitClass: Et = K + '-exit',
          exitToClass: ct = K + '-exit-to',
        } = B
        const _e = xe.split(' '),
          Jr = ae.split(' '),
          ao = We.split(' '),
          Cs = Et.split(' '),
          Ds = St.split(' '),
          ps = ct.split(' ')
        C === 'popup'
          ? (p.removeEventListener('transitionend', F), p.removeEventListener('animationend', F))
          : (p.removeEventListener('transitionend', J), p.removeEventListener('animationend', J)),
          X && X(p),
          p.classList.remove(...Cs, ...Ds, ...ps),
          p.classList.add(..._e),
          p.classList.add(...Jr),
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              p.classList.remove(..._e),
                p.classList.add(...ao),
                ne && ne(p, Bt),
                (!ne || ne.length < 2) &&
                  (C === 'popup' ? (H = Bt) : (j = Bt),
                  p.addEventListener('transitionend', Bt, { once: !0 }),
                  p.addEventListener('animationend', Bt, { once: !0 }))
            })
          })
        function Bt() {
          p && (p.classList.remove(...Jr), p.classList.remove(...ao), ce && ce(p))
        }
      }
      function ue(C, p) {
        if (!e.animation) {
          M == null || M.removeChild(L), (L = null), (M = null)
          return
        }
        if (C === 'overlay' && (!e.overlay || !e.overlay.animation)) return
        const B = C === 'popup' ? e.animation : e.overlay.animation
        ;(Y = !0), (p = Se(p, B.appendToElement))
        const K = B.name
        let {
          onBeforeExit: X,
          onExit: ne,
          onAfterExit: ce,
          exitActiveClass: ae = K + '-exit-active',
          exitClass: xe = K + '-exit',
          exitToClass: We = K + '-exit-to',
        } = B
        const St = xe.split(' '),
          Et = ae.split(' '),
          ct = We.split(' ')
        if (
          (C === 'popup'
            ? (p.removeEventListener('transitionend', H), p.removeEventListener('animationend', H))
            : (p.removeEventListener('transitionend', j),
              p.removeEventListener('animationend', j)),
          !p.parentNode)
        )
          return _e()
        X && X(p),
          p.classList.add(...St),
          p.classList.add(...Et),
          requestAnimationFrame(() => {
            p.classList.remove(...St), p.classList.add(...ct)
          }),
          ne && ne(p, _e),
          (!ne || ne.length < 2) &&
            (C === 'popup' ? (F = _e) : (J = _e),
            p.addEventListener('transitionend', _e, { once: !0 }),
            p.addEventListener('animationend', _e, { once: !0 }))
        function _e() {
          ;(Y = !1),
            M == null || M.removeChild(L),
            (G.closedBySetOpen = !1),
            O.menuBtnEls &&
              (T || f) &&
              document.activeElement === document.body &&
              Me(O.menuBtnEls).focus(),
            ce && ce(p),
            (L = null),
            (M = null)
        }
      }
      const ye = (C) => {
          if (!!R && !(te.length > 1))
            if (C) {
              const p = document.scrollingElement
              p.style.overflow = 'hidden'
            } else {
              const p = document.scrollingElement
              p.style.overflow = ''
            }
        },
        be = () => {
          var ce
          const C = document.activeElement
          if (
            C !== document.body &&
            O.menuBtnEls.every((ae) => C !== ae) &&
            !((ce = O.containerEl) != null && ce.contains(C))
          )
            return
          const { menuBtnEls: p, focusedMenuBtn: B, timeouts: K } = O,
            X = Me(p),
            ne = Ae(O, { inputElement: i, type: 'focusElementOnClose', subType: 'click' }) || X
          ne && (ne.focus(), ne === X && Rs({ focusedMenuBtn: B, timeouts: K, el: ne }))
        },
        x = () => {
          var p
          if (G.closedByEvents) return
          const C = document.activeElement
          if (
            O.menuBtnEls.every((B) => C !== B) &&
            !((p = O.containerEl) != null && p.contains(C))
          ) {
            setTimeout(() => {
              G.closedBySetOpen = !1
            })
            return
          }
          G.closedBySetOpen ||
            ((G.addedDocumentClick = !1),
            document.removeEventListener('click', Pt),
            (G.closedBySetOpen = !0),
            setTimeout(() => {
              ;(G.closedBySetOpen = !1), be()
            }))
        }
      le(
        kt(
          () => (typeof e.menuButton == 'function' ? e.menuButton() : e.menuButton),
          (C) => {
            if (Array.isArray(C) && !C.length) return
            const { focusedMenuBtn: p } = O,
              B = Ae(O, { inputElement: C, type: 'menuButton' })
            if (!B) return
            ;(O.menuBtnEls = Array.isArray(B) ? B : [B]),
              O.menuBtnEls.forEach((X, ne, ce) => {
                p.el &&
                  p.el !== X &&
                  (ce.length > 1 ? !Yn(X) : !0) &&
                  ((p.el = X),
                  X.focus({ preventScroll: !0 }),
                  X.addEventListener('keydown', O.onKeydownMenuButtonRef)),
                  X.setAttribute('type', 'button'),
                  X.addEventListener('click', O.onClickMenuButtonRef),
                  X.addEventListener('mousedown', O.onMouseDownMenuButtonRef),
                  e.open() &&
                    (!O.focusElementOnOpen ||
                      O.focusElementOnOpen === 'menuButton' ||
                      O.focusElementOnOpen === O.menuBtnEls) &&
                    !Yn(X) &&
                    X.addEventListener('blur', O.onBlurMenuButtonRef, { once: !0 })
              })
            const K = te.find((X) => X.uniqueId === O.uniqueId)
            K && (K.menuBtnEls = O.menuBtnEls),
              Pe(() => {
                !O || Is(O, !0)
              })
          },
        ),
      ),
        v &&
          N &&
          ai({
            mount: typeof N == 'string' ? document.querySelector(N) : N,
            popupChildren: q(e.children),
            overlayChildren: f ? z() : null,
            marker: D,
            onCreate: (C, p) => {
              ;(M = C), (L = p)
            },
          }),
        Fr(
          kt(
            () => !!e.open(),
            (C, p) => {
              C !== p &&
                (C || (O.focusSentinelAfterEl && (O.focusSentinelAfterEl.tabIndex = -1), x()),
                !(!N || v) &&
                  (C
                    ? (M ||
                        ai({
                          mount: typeof N == 'string' ? document.querySelector(N) : N,
                          popupChildren: q(e.children),
                          overlayChildren: f ? z() : null,
                          marker: D,
                          onCreate: (B, K) => {
                            ;(M = B), (L = K)
                          },
                        }),
                      Oe('popup', L == null ? void 0 : L.firstElementChild),
                      Oe('overlay', O.overlayEl))
                    : (ue('popup', L == null ? void 0 : L.firstElementChild),
                      ue('overlay', O.overlayEl))))
            },
            { defer: h },
          ),
        ),
        le(
          kt(
            () => !!e.open(),
            (C, p) => {
              C !== p &&
                (C
                  ? ((G.closedByEvents = !1),
                    JO(O),
                    ef(O),
                    GO(E),
                    wO({
                      id: r,
                      uniqueId: O.uniqueId,
                      open: e.open,
                      setOpen: e.setOpen,
                      containerEl: O.containerEl,
                      menuBtnEls: O.menuBtnEls,
                      focusedMenuBtn: O.focusedMenuBtn,
                      overlayEl: O.overlayEl,
                      menuPopupEl: O.menuPopupEl,
                      overlay: T,
                      closeWhenDocumentBlurs: A,
                      closeWhenEscapeKeyIsPressed: u,
                      closeWhenMenuButtonIsTabbed: S,
                      overlayElement: f,
                      cursorKeys: s,
                      focusElementOnClose: i,
                      focusSentinelBeforeEl: O.focusSentinelBeforeEl,
                      upperStackRemovedByFocusOut: !1,
                      detectIfMenuButtonObscured: !1,
                      queueRemoval: !1,
                      timeouts: O.timeouts,
                    }),
                    ye(C),
                    g && g(C, { uniqueId: O.uniqueId, dismissStack: te }),
                    rf(O))
                  : ((G.closedByEvents = !1),
                    si(O),
                    bn(O),
                    ii(O),
                    ni(O.uniqueId),
                    oi(),
                    ye(C),
                    g && g(C, { uniqueId: O.uniqueId, dismissStack: te })))
            },
            { defer: h },
          ),
        ),
        Pe(() => {
          si(O, { onCleanup: !0 }),
            ii(O),
            bn(O),
            ni(O.uniqueId),
            oi(),
            !v &&
              N &&
              M &&
              !Y &&
              (ue('popup', L == null ? void 0 : L.firstElementChild), ue('overlay', O.overlayEl))
        })
      function z() {
        return (() => {
          const C = nf.cloneNode(!0),
            p = O.refOverlayCb
          return (
            typeof p == 'function' ? p(C) : (O.refOverlayCb = C),
            Ie(C, 'click', O.onClickOverlayRef, !0),
            w(
              (B) => {
                const K = typeof e.overlayElement == 'object' ? e.overlayElement.class : void 0,
                  X = typeof e.overlayElement == 'object' ? e.overlayElement.classList || {} : {}
                return K !== B._v$ && (C.className = B._v$ = K), (B._v$2 = we(C, X, B._v$2)), B
              },
              { _v$: void 0, _v$2: void 0 },
            ),
            C
          )
        })()
      }
      function q(C) {
        return (() => {
          const p = of.cloneNode(!0),
            B = p.firstChild,
            K = B.nextSibling,
            X = O.refContainerCb
          typeof X == 'function' ? X(p) : (O.refContainerCb = p),
            Ie(p, 'focusout', O.onFocusOutContainerRef, !0),
            Ie(p, 'focusin', O.onFocusInContainerRef, !0)
          const ne = O.focusSentinelBeforeEl
          typeof ne == 'function' ? ne(B) : (O.focusSentinelBeforeEl = B),
            B.addEventListener('focus', (ae) => {
              li(O, 'before', ae.relatedTarget)
            }),
            d(p, C, K)
          const ce = O.focusSentinelAfterEl
          return (
            typeof ce == 'function' ? ce(K) : (O.focusSentinelAfterEl = K),
            K.addEventListener('focus', () => {
              li(O, 'after')
            }),
            w(
              (ae) => {
                const xe = O.id,
                  We = e.class,
                  St = e.classList || {},
                  Et = e.open() ? '0' : '-1',
                  ct = e.open() && O.hasFocusSentinels ? '0' : '-1'
                return (
                  xe !== ae._v$3 && U(p, 'id', (ae._v$3 = xe)),
                  We !== ae._v$4 && (p.className = ae._v$4 = We),
                  (ae._v$5 = we(p, St, ae._v$5)),
                  Et !== ae._v$6 && U(B, 'tabindex', (ae._v$6 = Et)),
                  ct !== ae._v$7 && U(K, 'tabindex', (ae._v$7 = ct)),
                  ae
                )
              },
              { _v$3: void 0, _v$4: void 0, _v$5: void 0, _v$6: void 0, _v$7: void 0 },
            ),
            p
          )
        })()
      }
      if (N) return D
      if (v) return q(e.children)
      let Ee = !1
      const Z = b(() => e.open(), void 0, { equals: (C, p) => (Ee ? C === p : !C == !p) }),
        re = b(() => {
          const C = Z()
          if (C) {
            const p = e.children
            return (Ee = typeof p == 'function' && p.length > 0) ? Be(() => p(C)) : q(p)
          }
        })
      return e.animation
        ? y(
            zO,
            zt(() => e.animation, {
              get name() {
                return e.animation.name
              },
              get enterClass() {
                return e.animation.enterClass
              },
              get enterActiveClass() {
                return e.animation.enterActiveClass
              },
              get enterToClass() {
                return e.animation.enterToClass
              },
              get exitClass() {
                return e.animation.exitClass
              },
              get exitActiveClass() {
                return e.animation.exitActiveClass
              },
              get exitToClass() {
                return e.animation.exitToClass
              },
              get appear() {
                return e.animation.appear
              },
              get children() {
                return re()
              },
            }),
          )
        : re
    }
  He(['click', 'focusin', 'focusout'])
  const sf = '_logoLg_eogxx_1'
  var lf = { logoLg: sf }
  const Sf = P('<span class="mx-3 text-black sm:text-white dark:text-white text-lg"></span>'),
    Kr = ({ colorblind: e, size: t }) => {
      const r = $(),
        n = t === 'lg'
      return [
        y(bd, {
          colorblind: e,
          get classList() {
            return { [lf.logoLg]: n }
          },
        }),
        (() => {
          const o = Sf.cloneNode(!0)
          return o.classList.toggle('text-lg', n), d(o, () => r.t('header.title')), o
        })(),
      ]
    },
    Ef = P(
      '<a class="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all rounded" target="_blank"></a>',
    ),
    cf = P(
      '<div id="options-dropdown" class="quordle-options-dropdown absolute flex flex-col bg-gray-100 dark:bg-gray-800 text-black dark:text-white z-20 right-4 rounded-lg border-2 border-gray-400"><button type="button" class="flex flex-row-reverse items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all my-4" aria-controls="settings-panel"><div class="mr-3 text-black dark:text-white"></div></button><button type="button" class="flex flex-row-reverse items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all mb-4" aria-controls="statistics-panel"><div class="mr-3 text-black dark:text-white"></div></button><button type="button" class="flex flex-row-reverse items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all mb-4" aria-controls="achievements-panel"><div class="mr-3 text-black dark:text-white"></div></button><div class="m-4 flex flex-row-reverse justify-center items-center"></div></div>',
    ),
    uf = P(
      '<nav class="bg-new-blue w-screen border-b-2 border-white dark:border-gray-800"><div class="flex items-center max-w-[550px] m-auto px-4"><div class="flex flex-1 justify-center md:justify-end items-center ml-md-2"></div></div><div class="bg-slate-300 dark:bg-gray-900"><div class="flex items-center max-w-[550px] m-auto px-4 py-2 relative"><div class="flex flex-grow-0 flex-shrink-1 overflow-auto"></div><div class="flex flex-1 justify-end items-center ml-2"><button type="button" class="bg-indigo-500 dark:bg-gray-800 p-1 rounded-full text-white hover:text-gray-200 dark:text-gray-400 dark:hover:text-white transition-colors" aria-controls="tutorial-panel"></button><button type="button" class="bg-indigo-500 dark:bg-gray-800 p-1 rounded-full text-white hover:text-gray-200 dark:text-gray-400 dark:hover:text-white ml-2 transition" aria-controls="options-dropdown"></button></div></div></div></nav>',
    ),
    xt = (e) =>
      (() => {
        const t = Ef.cloneNode(!0)
        return (
          Ie(t, 'click', e.onClick, !0),
          d(
            t,
            y(e.iconComponent, {
              class: 'h-5 w-auto rounded-sm ring-1 ring-black dark:ring-white',
            }),
          ),
          w(
            (r) => {
              const n = `https://${e.lang === 'en' ? 'www' : e.lang}.quordle.com`,
                o = e.ariaLabel
              return (
                n !== r._v$ && U(t, 'href', (r._v$ = n)),
                o !== r._v$2 && U(t, 'aria-label', (r._v$2 = o)),
                r
              )
            },
            { _v$: void 0, _v$2: void 0 },
          ),
          t
        )
      })(),
    Af = (e) => {
      const t = ro(Wn),
        r = $(),
        [n, o] = de(),
        [i] = xi(),
        a = b(() => i.overlay === 'tutorial'),
        s = b(() => i.overlay === 'statistics'),
        S = b(() => i.overlay === 'settings'),
        l = b(() => i.overlay === 'achievements'),
        [E, A] = Q(!1),
        [c, u] = Q()
      return (() => {
        const T = uf.cloneNode(!0),
          f = T.firstChild,
          I = f.firstChild,
          R = f.nextSibling,
          m = R.firstChild,
          N = m.firstChild,
          v = N.nextSibling,
          g = v.firstChild,
          O = g.nextSibling
        return (
          d(
            f,
            (() => {
              const D = V(() => !!t.md, !0)
              return () =>
                D() &&
                y(Kr, {
                  size: 'lg',
                  get colorblind() {
                    return n.colorblind
                  },
                })
            })(),
            I,
          ),
          d(I, y(os, { id: 'header-placement' })),
          d(
            m,
            (() => {
              const D = V(() => !t.md, !0)
              return () =>
                D() &&
                y(Kr, {
                  size: 'sm',
                  get colorblind() {
                    return n.colorblind
                  },
                })
            })(),
            N,
          ),
          d(
            N,
            y(fo, {
              href: '/',
              activeClass: 'quordle-nav-active',
              class: 'quordle-nav',
              onClick: () => W(n.vibration),
              end: !0,
              get children() {
                return r.t('header.daily')
              },
            }),
            null,
          ),
          d(
            N,
            y(fo, {
              href: '/practice',
              activeClass: 'quordle-nav-active',
              class: 'quordle-nav ml-2',
              onClick: () => W(n.vibration),
              end: !0,
              get children() {
                return r.t('header.practice')
              },
            }),
            null,
          ),
          Ie(g, 'click', e.onOpenTutorial, !0),
          d(g, y(Hd, {})),
          (O.$$click = () => W(n.vibration)),
          ((D) => u(D))(O),
          d(O, y(Qr, {})),
          d(
            m,
            y(af, {
              class: 'z-30',
              menuButton: c,
              open: E,
              setOpen: A,
              animation: { name: 'quordle-fade' },
              get children() {
                const D = cf.cloneNode(!0),
                  h = D.firstChild,
                  L = h.firstChild,
                  M = h.nextSibling,
                  F = M.firstChild,
                  H = M.nextSibling,
                  J = H.firstChild,
                  j = H.nextSibling
                return (
                  (h.$$click = () => {
                    A(!1), e.onOpenSettings()
                  }),
                  d(h, y(Gd, {}), L),
                  d(L, () => r.t('header.settings')),
                  (M.$$click = () => {
                    A(!1), e.onOpenStatistics()
                  }),
                  d(
                    M,
                    y(Zd, {
                      get mode() {
                        return e.mode
                      },
                    }),
                    F,
                  ),
                  d(
                    F,
                    (() => {
                      const Y = V(() => e.mode === 'daily', !0)
                      return () => (Y() ? r.t('header.dailyStats') : r.t('header.practiceStats'))
                    })(),
                  ),
                  (H.$$click = () => {
                    A(!1), e.onOpenAchievements()
                  }),
                  d(H, y(rs, {}), J),
                  d(J, () => r.t('header.achievements')),
                  d(
                    j,
                    (() => {
                      const Y = V(() => r.locale() !== 'en', !0)
                      return () =>
                        Y() &&
                        y(xt, {
                          lang: 'en',
                          ariaLabel: 'English Quordle',
                          onClick: () => {
                            W(n.vibration), A(!1)
                          },
                          iconComponent: _d,
                        })
                    })(),
                    null,
                  ),
                  d(
                    j,
                    (() => {
                      const Y = V(() => r.locale() !== 'fr', !0)
                      return () =>
                        Y() &&
                        y(xt, {
                          lang: 'fr',
                          ariaLabel: 'Quordle Fran\xE7ais',
                          onClick: () => {
                            W(n.vibration), A(!1)
                          },
                          iconComponent: Kd,
                        })
                    })(),
                    null,
                  ),
                  d(
                    j,
                    (() => {
                      const Y = V(() => r.locale() !== 'es', !0)
                      return () =>
                        Y() &&
                        y(xt, {
                          lang: 'es',
                          ariaLabel: 'Quordle Espa\xF1ol',
                          onClick: () => {
                            W(n.vibration), A(!1)
                          },
                          iconComponent: Fd,
                        })
                    })(),
                    null,
                  ),
                  d(
                    j,
                    (() => {
                      const Y = V(() => r.locale() !== 'it', !0)
                      return () =>
                        Y() &&
                        y(xt, {
                          lang: 'it',
                          ariaLabel: 'Quordle Italiano',
                          onClick: () => {
                            W(n.vibration), A(!1)
                          },
                          iconComponent: xd,
                        })
                    })(),
                    null,
                  ),
                  d(
                    j,
                    (() => {
                      const Y = V(() => r.locale() !== 'nl', !0)
                      return () =>
                        Y() &&
                        y(xt, {
                          lang: 'nl',
                          ariaLabel: 'Quordle Nederlands',
                          onClick: () => {
                            W(n.vibration), A(!1)
                          },
                          iconComponent: Wd,
                        })
                    })(),
                    null,
                  ),
                  w(
                    (Y) => {
                      var q
                      const Se =
                          (((q = c()) == null ? void 0 : q.getBoundingClientRect().bottom) || 0) +
                          12 +
                          'px',
                        Oe = S(),
                        ue = r.t('header.aria.openPage', { page: r.t('header.settings') }),
                        ye = s(),
                        be = r.t('header.aria.openPage', {
                          page:
                            e.mode === 'daily'
                              ? r.t('stats.dailyStatistics')
                              : r.t('stats.practiceStatistics'),
                        }),
                        x = l(),
                        z = r.t('header.aria.openPage', { page: r.t('header.achievements') })
                      return (
                        Se !== Y._v$3 && D.style.setProperty('top', (Y._v$3 = Se)),
                        Oe !== Y._v$4 && U(h, 'aria-expanded', (Y._v$4 = Oe)),
                        ue !== Y._v$5 && U(h, 'aria-label', (Y._v$5 = ue)),
                        ye !== Y._v$6 && U(M, 'aria-expanded', (Y._v$6 = ye)),
                        be !== Y._v$7 && U(M, 'aria-label', (Y._v$7 = be)),
                        x !== Y._v$8 && U(H, 'aria-expanded', (Y._v$8 = x)),
                        z !== Y._v$9 && U(H, 'aria-label', (Y._v$9 = z)),
                        Y
                      )
                    },
                    {
                      _v$3: void 0,
                      _v$4: void 0,
                      _v$5: void 0,
                      _v$6: void 0,
                      _v$7: void 0,
                      _v$8: void 0,
                      _v$9: void 0,
                    },
                  ),
                  D
                )
              },
            }),
            null,
          ),
          w(
            (D) => {
              const h = a(),
                L = r.t('header.aria.openPage', { page: r.t('header.help') }),
                M = E(),
                F = E(),
                H = r.t('header.aria.openMoreOptions')
              return (
                h !== D._v$10 && U(g, 'aria-expanded', (D._v$10 = h)),
                L !== D._v$11 && U(g, 'aria-label', (D._v$11 = L)),
                M !== D._v$12 && O.classList.toggle('rotate-180', (D._v$12 = M)),
                F !== D._v$13 && U(O, 'aria-expanded', (D._v$13 = F)),
                H !== D._v$14 && U(O, 'aria-label', (D._v$14 = H)),
                D
              )
            },
            { _v$10: void 0, _v$11: void 0, _v$12: void 0, _v$13: void 0, _v$14: void 0 },
          ),
          T
        )
      })()
    }
  He(['click'])
  const df = P(
      '<button class="quordle-key border-gray-300 dark:border-gray-700" role="cell"><div class="quordle-box-content"></div></button>',
    ),
    Of = P(
      '<div class="w-full flex-col p-1 pb-1.5 bg-blue-200 dark:bg-cyan-900 rounded-t shadow" role="table"></div>',
    ),
    ff = P('<div class="flex w-full justify-center" role="row"></div>'),
    Rf = (e) => {
      const t = $(),
        [r, n] = de(),
        o = b(() => {
          if (e.key === 'bs' || e.key === 'enter') return !1
          const S = r[e.mode].guesses
          let l = !1
          for (let E = 0; E < S.length; E++)
            if (S[E].indexOf(e.key) >= 0) {
              l = !0
              break
            }
          return l
        }),
        i = b(() => {
          const S = r[e.mode].guesses,
            l = ['none', 'none', 'none', 'none']
          for (let E = 0; E < l.length; E++) {
            const A = r[e.mode].states[E]
            if (!(r[e.mode].answersCorrect[E] >= 0))
              for (let c = 0; c < A.length; c++)
                for (let u = 0; u < A[c].length; u++)
                  e.key === S[c][u] &&
                    (A[c][u] === 'correct' || A[c][u] === 'diff') &&
                    (A[c][u] === 'correct'
                      ? (l[E] = 'correct')
                      : A[c][u] === 'diff' && l[E] !== 'correct' && (l[E] = 'diff'))
          }
          return l
        }),
        a = b(() => {
          if (!o() || i().every((E) => E === 'none')) return ''
          const S = {
              none: r.darkMode ? '#9ca3af' : '#d1d5db',
              diff: r.colorblind ? '#60a5fa' : '#ffcc00',
              correct: r.colorblind ? '#fb923c' : '#00cc88',
            },
            l = i().map((E) => S[E])
          return (
            'background: conic-gradient(' +
            l[1] +
            ' 0deg 90deg, ' +
            l[3] +
            ' 90deg 180deg, ' +
            l[2] +
            ' 180deg 270deg, ' +
            l[0] +
            ' 270deg 360deg);'
          )
        }),
        s = b(() =>
          e.key === 'bs'
            ? t.t('game.backspaceKey')
            : e.key === 'enter'
            ? t.t('game.enterKey')
            : t.t('game.aria.key', {
                letter: e.key,
                info: o()
                  ? i().every((S) => S === 'none') && o()
                    ? t.t('game.aria.keyIncorrectAll')
                    : i()
                        .map((S, l) =>
                          S === 'diff'
                            ? t.t('game.aria.keyDiff', { board: l + 1 })
                            : S === 'none'
                            ? t.t('game.aria.keyNone', { board: l + 1 })
                            : t.t('game.aria.keyCorrect', { board: l + 1 }),
                        )
                        .join(t.t('game.aria.keyInfoDelimiter'))
                  : t.t('game.aria.keyNotGuessed'),
              }),
        )
      return (() => {
        const S = df.cloneNode(!0),
          l = S.firstChild
        return (
          Ie(S, 'focusout', e.onFocusOut, !0),
          Ie(S, 'focusin', e.onFocusIn, !0),
          (S.$$click = () => {
            W(r.vibration),
              n.sendKey(
                e.mode,
                new KeyboardEvent('keydown', {
                  keyCode:
                    e.key === 'enter' ? 13 : e.key === 'bs' ? 8 : r.alphabet.indexOf(e.key) + 65,
                  key: e.key === 'enter' ? 'Enter' : e.key === 'bs' ? 'Backspace' : e.key,
                }),
              )
          }),
          d(
            l,
            (() => {
              const E = V(() => e.key === 'enter', !0)
              return () =>
                E()
                  ? y(Yd, {
                      get height() {
                        return e.fontSize * 0.8
                      },
                    })
                  : (() => {
                      const A = V(() => e.key === 'bs', !0)
                      return () =>
                        A()
                          ? y(Bd, {
                              get height() {
                                return e.fontSize * 0.8
                              },
                            })
                          : e.key
                    })()
            })(),
          ),
          w(
            (E) => {
              const A = {
                  'w-[calc(10%-0.25rem)]':
                    (e.key !== 'enter' && e.key !== 'bs') || e.numKeysInRow === 10,
                  'w-[calc(15%-0.5rem)]':
                    (e.key === 'enter' || e.key === 'bs') && e.numKeysInRow === 9,
                  'w-[calc(20%-0.5rem)]':
                    (e.key === 'enter' || e.key === 'bs') && e.numKeysInRow === 8,
                  'w-[calc(25%-0.5rem)]':
                    (e.key === 'enter' || e.key === 'bs') && e.numKeysInRow === 7,
                  'text-black dark:text-black border-gray-400': !!a(),
                  'text-black dark:text-white bg-white dark:bg-gray-500': !a() && !o(),
                  'text-blue-300 dark:text-cyan-600 bg-blue-100 dark:bg-cyan-800 border-blue-200 dark:border-cyan-900':
                    !a() && o(),
                },
                c = 'padding-bottom: calc(' + 10 * r.keyboardHeight + '% - 0.25rem);' + a(),
                u = s()
              return (
                (E._v$ = we(S, A, E._v$)),
                (E._v$2 = Mi(S, c, E._v$2)),
                u !== E._v$3 && U(S, 'aria-label', (E._v$3 = u)),
                E
              )
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0 },
          ),
          S
        )
      })()
    },
    If = (e) => {
      const t = $(),
        [r, n] = de(),
        [o, i] = Q(),
        a = (s) => {
          e.disableInputCapture ||
            (o() && s.key === 'Enter') ||
            (n.sendKey(e.mode, s) && s.preventDefault())
        }
      return (
        document.addEventListener('keydown', a),
        Pe(() => document.removeEventListener('keydown', a)),
        (() => {
          const s = Of.cloneNode(!0)
          return (
            d(s, () =>
              (r.enterBsReversed ? r.keyboardReversed : r.keyboard).map((S, l) =>
                (() => {
                  const E = ff.cloneNode(!0)
                  return (
                    d(E, () =>
                      S.map((A, c) =>
                        y(Rf, {
                          get mode() {
                            return e.mode
                          },
                          x: c,
                          y: l,
                          key: A,
                          get numKeysInRow() {
                            return S.length
                          },
                          get fontSize() {
                            return e.fontSize
                          },
                          onFocusIn: () => i(A),
                          onFocusOut: () => i(void 0),
                        }),
                      ),
                    ),
                    w(() => U(E, 'aria-label', t.t('game.aria.keyboardRow', { row: l + 1 }))),
                    E
                  )
                })(),
              ),
            ),
            w(() => U(s, 'aria-label', t.t('game.aria.keyboard'))),
            s
          )
        })()
      )
    }
  He(['click', 'focusin', 'focusout'])
  var ot = [],
    Tf = function () {
      return ot.some(function (e) {
        return e.activeTargets.length > 0
      })
    },
    hf = function () {
      return ot.some(function (e) {
        return e.skippedTargets.length > 0
      })
    },
    Si = 'ResizeObserver loop completed with undelivered notifications.',
    Lf = function () {
      var e
      typeof ErrorEvent == 'function'
        ? (e = new ErrorEvent('error', { message: Si }))
        : ((e = document.createEvent('Event')), e.initEvent('error', !1, !1), (e.message = Si)),
        window.dispatchEvent(e)
    },
    er
  ;(function (e) {
    ;(e.BORDER_BOX = 'border-box'),
      (e.CONTENT_BOX = 'content-box'),
      (e.DEVICE_PIXEL_CONTENT_BOX = 'device-pixel-content-box')
  })(er || (er = {}))
  var it = function (e) {
      return Object.freeze(e)
    },
    mf = (function () {
      function e(t, r) {
        ;(this.inlineSize = t), (this.blockSize = r), it(this)
      }
      return e
    })(),
    Ts = (function () {
      function e(t, r, n, o) {
        return (
          (this.x = t),
          (this.y = r),
          (this.width = n),
          (this.height = o),
          (this.top = this.y),
          (this.left = this.x),
          (this.bottom = this.top + this.height),
          (this.right = this.left + this.width),
          it(this)
        )
      }
      return (
        (e.prototype.toJSON = function () {
          var t = this,
            r = t.x,
            n = t.y,
            o = t.top,
            i = t.right,
            a = t.bottom,
            s = t.left,
            S = t.width,
            l = t.height
          return { x: r, y: n, top: o, right: i, bottom: a, left: s, width: S, height: l }
        }),
        (e.fromRect = function (t) {
          return new e(t.x, t.y, t.width, t.height)
        }),
        e
      )
    })(),
    oo = function (e) {
      return e instanceof SVGElement && 'getBBox' in e
    },
    hs = function (e) {
      if (oo(e)) {
        var t = e.getBBox(),
          r = t.width,
          n = t.height
        return !r && !n
      }
      var o = e,
        i = o.offsetWidth,
        a = o.offsetHeight
      return !(i || a || e.getClientRects().length)
    },
    Ei = function (e) {
      var t, r
      if (e instanceof Element) return !0
      var n =
        (r = (t = e) === null || t === void 0 ? void 0 : t.ownerDocument) === null || r === void 0
          ? void 0
          : r.defaultView
      return !!(n && e instanceof n.Element)
    },
    vf = function (e) {
      switch (e.tagName) {
        case 'INPUT':
          if (e.type !== 'image') break
        case 'VIDEO':
        case 'AUDIO':
        case 'EMBED':
        case 'OBJECT':
        case 'CANVAS':
        case 'IFRAME':
        case 'IMG':
          return !0
      }
      return !1
    },
    Jt = typeof window != 'undefined' ? window : {},
    Ir = new WeakMap(),
    ci = /auto|scroll/,
    Nf = /^tb|vertical/,
    gf = /msie|trident/i.test(Jt.navigator && Jt.navigator.userAgent),
    Ge = function (e) {
      return parseFloat(e || '0')
    },
    vt = function (e, t, r) {
      return (
        e === void 0 && (e = 0),
        t === void 0 && (t = 0),
        r === void 0 && (r = !1),
        new mf((r ? t : e) || 0, (r ? e : t) || 0)
      )
    },
    ui = it({
      devicePixelContentBoxSize: vt(),
      borderBoxSize: vt(),
      contentBoxSize: vt(),
      contentRect: new Ts(0, 0, 0, 0),
    }),
    Ls = function (e, t) {
      if ((t === void 0 && (t = !1), Ir.has(e) && !t)) return Ir.get(e)
      if (hs(e)) return Ir.set(e, ui), ui
      var r = getComputedStyle(e),
        n = oo(e) && e.ownerSVGElement && e.getBBox(),
        o = !gf && r.boxSizing === 'border-box',
        i = Nf.test(r.writingMode || ''),
        a = !n && ci.test(r.overflowY || ''),
        s = !n && ci.test(r.overflowX || ''),
        S = n ? 0 : Ge(r.paddingTop),
        l = n ? 0 : Ge(r.paddingRight),
        E = n ? 0 : Ge(r.paddingBottom),
        A = n ? 0 : Ge(r.paddingLeft),
        c = n ? 0 : Ge(r.borderTopWidth),
        u = n ? 0 : Ge(r.borderRightWidth),
        T = n ? 0 : Ge(r.borderBottomWidth),
        f = n ? 0 : Ge(r.borderLeftWidth),
        I = A + l,
        R = S + E,
        m = f + u,
        N = c + T,
        v = s ? e.offsetHeight - N - e.clientHeight : 0,
        g = a ? e.offsetWidth - m - e.clientWidth : 0,
        O = o ? I + m : 0,
        D = o ? R + N : 0,
        h = n ? n.width : Ge(r.width) - O - g,
        L = n ? n.height : Ge(r.height) - D - v,
        M = h + I + g + m,
        F = L + R + v + N,
        H = it({
          devicePixelContentBoxSize: vt(
            Math.round(h * devicePixelRatio),
            Math.round(L * devicePixelRatio),
            i,
          ),
          borderBoxSize: vt(M, F, i),
          contentBoxSize: vt(h, L, i),
          contentRect: new Ts(A, S, h, L),
        })
      return Ir.set(e, H), H
    },
    ms = function (e, t, r) {
      var n = Ls(e, r),
        o = n.borderBoxSize,
        i = n.contentBoxSize,
        a = n.devicePixelContentBoxSize
      switch (t) {
        case er.DEVICE_PIXEL_CONTENT_BOX:
          return a
        case er.BORDER_BOX:
          return o
        default:
          return i
      }
    },
    yf = (function () {
      function e(t) {
        var r = Ls(t)
        ;(this.target = t),
          (this.contentRect = r.contentRect),
          (this.borderBoxSize = it([r.borderBoxSize])),
          (this.contentBoxSize = it([r.contentBoxSize])),
          (this.devicePixelContentBoxSize = it([r.devicePixelContentBoxSize]))
      }
      return e
    })(),
    vs = function (e) {
      if (hs(e)) return 1 / 0
      for (var t = 0, r = e.parentNode; r; ) (t += 1), (r = r.parentNode)
      return t
    },
    Cf = function () {
      var e = 1 / 0,
        t = []
      ot.forEach(function (a) {
        if (a.activeTargets.length !== 0) {
          var s = []
          a.activeTargets.forEach(function (l) {
            var E = new yf(l.target),
              A = vs(l.target)
            s.push(E), (l.lastReportedSize = ms(l.target, l.observedBox)), A < e && (e = A)
          }),
            t.push(function () {
              a.callback.call(a.observer, s, a.observer)
            }),
            a.activeTargets.splice(0, a.activeTargets.length)
        }
      })
      for (var r = 0, n = t; r < n.length; r++) {
        var o = n[r]
        o()
      }
      return e
    },
    Ai = function (e) {
      ot.forEach(function (r) {
        r.activeTargets.splice(0, r.activeTargets.length),
          r.skippedTargets.splice(0, r.skippedTargets.length),
          r.observationTargets.forEach(function (o) {
            o.isActive() && (vs(o.target) > e ? r.activeTargets.push(o) : r.skippedTargets.push(o))
          })
      })
    },
    Df = function () {
      var e = 0
      for (Ai(e); Tf(); ) (e = Cf()), Ai(e)
      return hf() && Lf(), e > 0
    },
    fn,
    Ns = [],
    pf = function () {
      return Ns.splice(0).forEach(function (e) {
        return e()
      })
    },
    Uf = function (e) {
      if (!fn) {
        var t = 0,
          r = document.createTextNode(''),
          n = { characterData: !0 }
        new MutationObserver(function () {
          return pf()
        }).observe(r, n),
          (fn = function () {
            r.textContent = '' + (t ? t-- : t++)
          })
      }
      Ns.push(e), fn()
    },
    Pf = function (e) {
      Uf(function () {
        requestAnimationFrame(e)
      })
    },
    Cr = 0,
    Mf = function () {
      return !!Cr
    },
    bf = 250,
    Yf = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
    di = [
      'resize',
      'load',
      'transitionend',
      'animationend',
      'animationstart',
      'animationiteration',
      'keyup',
      'keydown',
      'mouseup',
      'mousedown',
      'mouseover',
      'mouseout',
      'blur',
      'focus',
    ],
    Oi = function (e) {
      return e === void 0 && (e = 0), Date.now() + e
    },
    Rn = !1,
    Bf = (function () {
      function e() {
        var t = this
        ;(this.stopped = !0),
          (this.listener = function () {
            return t.schedule()
          })
      }
      return (
        (e.prototype.run = function (t) {
          var r = this
          if ((t === void 0 && (t = bf), !Rn)) {
            Rn = !0
            var n = Oi(t)
            Pf(function () {
              var o = !1
              try {
                o = Df()
              } finally {
                if (((Rn = !1), (t = n - Oi()), !Mf())) return
                o ? r.run(1e3) : t > 0 ? r.run(t) : r.start()
              }
            })
          }
        }),
        (e.prototype.schedule = function () {
          this.stop(), this.run()
        }),
        (e.prototype.observe = function () {
          var t = this,
            r = function () {
              return t.observer && t.observer.observe(document.body, Yf)
            }
          document.body ? r() : Jt.addEventListener('DOMContentLoaded', r)
        }),
        (e.prototype.start = function () {
          var t = this
          this.stopped &&
            ((this.stopped = !1),
            (this.observer = new MutationObserver(this.listener)),
            this.observe(),
            di.forEach(function (r) {
              return Jt.addEventListener(r, t.listener, !0)
            }))
        }),
        (e.prototype.stop = function () {
          var t = this
          this.stopped ||
            (this.observer && this.observer.disconnect(),
            di.forEach(function (r) {
              return Jt.removeEventListener(r, t.listener, !0)
            }),
            (this.stopped = !0))
        }),
        e
      )
    })(),
    Bn = new Bf(),
    fi = function (e) {
      !Cr && e > 0 && Bn.start(), (Cr += e), !Cr && Bn.stop()
    },
    wf = function (e) {
      return !oo(e) && !vf(e) && getComputedStyle(e).display === 'inline'
    },
    Hf = (function () {
      function e(t, r) {
        ;(this.target = t),
          (this.observedBox = r || er.CONTENT_BOX),
          (this.lastReportedSize = { inlineSize: 0, blockSize: 0 })
      }
      return (
        (e.prototype.isActive = function () {
          var t = ms(this.target, this.observedBox, !0)
          return (
            wf(this.target) && (this.lastReportedSize = t),
            this.lastReportedSize.inlineSize !== t.inlineSize ||
              this.lastReportedSize.blockSize !== t.blockSize
          )
        }),
        e
      )
    })(),
    Gf = (function () {
      function e(t, r) {
        ;(this.activeTargets = []),
          (this.skippedTargets = []),
          (this.observationTargets = []),
          (this.observer = t),
          (this.callback = r)
      }
      return e
    })(),
    Tr = new WeakMap(),
    Ri = function (e, t) {
      for (var r = 0; r < e.length; r += 1) if (e[r].target === t) return r
      return -1
    },
    hr = (function () {
      function e() {}
      return (
        (e.connect = function (t, r) {
          var n = new Gf(t, r)
          Tr.set(t, n)
        }),
        (e.observe = function (t, r, n) {
          var o = Tr.get(t),
            i = o.observationTargets.length === 0
          Ri(o.observationTargets, r) < 0 &&
            (i && ot.push(o),
            o.observationTargets.push(new Hf(r, n && n.box)),
            fi(1),
            Bn.schedule())
        }),
        (e.unobserve = function (t, r) {
          var n = Tr.get(t),
            o = Ri(n.observationTargets, r),
            i = n.observationTargets.length === 1
          o >= 0 && (i && ot.splice(ot.indexOf(n), 1), n.observationTargets.splice(o, 1), fi(-1))
        }),
        (e.disconnect = function (t) {
          var r = this,
            n = Tr.get(t)
          n.observationTargets.slice().forEach(function (o) {
            return r.unobserve(t, o.target)
          }),
            n.activeTargets.splice(0, n.activeTargets.length)
        }),
        e
      )
    })(),
    Kf = (function () {
      function e(t) {
        if (arguments.length === 0)
          throw new TypeError(
            "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.",
          )
        if (typeof t != 'function')
          throw new TypeError(
            "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.",
          )
        hr.connect(this, t)
      }
      return (
        (e.prototype.observe = function (t, r) {
          if (arguments.length === 0)
            throw new TypeError(
              "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.",
            )
          if (!Ei(t))
            throw new TypeError(
              "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element",
            )
          hr.observe(this, t, r)
        }),
        (e.prototype.unobserve = function (t) {
          if (arguments.length === 0)
            throw new TypeError(
              "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.",
            )
          if (!Ei(t))
            throw new TypeError(
              "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element",
            )
          hr.unobserve(this, t)
        }),
        (e.prototype.disconnect = function () {
          hr.disconnect(this)
        }),
        (e.toString = function () {
          return 'function ResizeObserver () { [polyfill code] }'
        }),
        e
      )
    })()
  function gs(e) {
    const [t, r] = Q([]),
      n = (a) => r((s) => s.concat(a)),
      o = new Map(),
      i = new Kf((a) => {
        if (!!Array.isArray(a))
          for (const s of a) {
            const S = Math.round(s.contentRect.width),
              l = Math.round(s.contentRect.height),
              E = o.get(s.target)
            if (!E || E.width !== S || E.height !== l) {
              const A = { width: S, height: l }
              e.onResize(A, s.target), o.set(s.target, { width: S, height: l })
            }
          }
      })
    return (
      le((a) => {
        let s = []
        if (e.refs) {
          const S = typeof e.refs == 'function' ? e.refs() : e.refs
          Array.isArray(S) ? (s = s.concat(S)) : s.push(S)
        }
        return (
          (s = s.concat(t())),
          (a = a || []),
          a.forEach((S) => {
            S in s || (i.unobserve(S), o.delete(S))
          }),
          s.forEach((S) => {
            S in a || i.observe(S)
          }),
          s
        )
      }),
      Pe(() => i.disconnect()),
      n
    )
  }
  const Ff = P(
      '<div class="text-lg mt-6 mb-3 flex items-center justify-center"><div class="text-sm text-right">:</div><input type="number" class="mx-2 text-sm text-center text-black dark:text-white bg-white dark:bg-gray-800" readonly><button class="transition"></button></div>',
    ),
    xf = P(
      '<div class="text-center"><button type="button" class="text-sm min-h-[40px] text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"><div class="flex items-center justify-center"><div class="ml-2"></div></div></button><div class="text-sm my-4"></div><label for="new_practice_seed" class="text-left block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"></label><div class="flex flex-row items-center"><input type="text" id="new_practice_seed" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxlength="20" inputmode="numeric"><button type="button" class="flex-shrink-0 font-medium rounded-lg text-sm p-2.5 text-center ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:text-gray-400 disabled:bg-gray-300 disabled:dark:text-gray-500 disabled:dark:bg-gray-700 disabled:cursor-not-allowed"></button></div></div>',
    ),
    Wf = P('<div class="text-center text-base mt-2"></div>'),
    _f = (e) => {
      const t = $(),
        [r, n] = de(),
        [o, i] = Q(!1),
        [a, s] = Q(),
        [S, l] = Q(0),
        [E, A] = Q(void 0),
        c = b(() => {
          const u = S()
          return u === 0 || u === r.free.seed || u < 1e6
        })
      return e.mode !== 'free'
        ? null
        : [
            (() => {
              const u = Ff.cloneNode(!0),
                T = u.firstChild,
                f = T.firstChild,
                I = T.nextSibling,
                R = I.nextSibling
              return (
                d(T, () => t.t('settings.currentSeed'), f),
                A(I),
                (R.$$click = () => {
                  W(r.vibration), i(!o())
                }),
                d(R, y(Qr, {})),
                w(
                  (m) => {
                    const N = r.free.seed,
                      v = t.t('settings.currentSeed'),
                      g = o()
                    return (
                      N !== m._v$ && (I.value = m._v$ = N),
                      v !== m._v$2 && U(I, 'aria-label', (m._v$2 = v)),
                      g !== m._v$3 && R.classList.toggle('rotate-180', (m._v$3 = g)),
                      m
                    )
                  },
                  { _v$: void 0, _v$2: void 0, _v$3: void 0 },
                ),
                u
              )
            })(),
            V(
              (() => {
                const u = V(() => !!o(), !0)
                return () =>
                  u() &&
                  (() => {
                    const T = xf.cloneNode(!0),
                      f = T.firstChild,
                      I = f.firstChild,
                      R = I.firstChild,
                      m = f.nextSibling,
                      N = m.nextSibling,
                      v = N.nextSibling,
                      g = v.firstChild,
                      O = g.nextSibling
                    return (
                      (f.$$click = () => {
                        W(r.vibration)
                        const D = E()
                        if (D) {
                          D.select(), document.execCommand('copy')
                          const h = window.getSelection && window.getSelection()
                          h && h.removeAllRanges(),
                            D.blur(),
                            alert(t.t('settings.copiedSeedToClipboardAlert', { seed: D.value }))
                        }
                      }),
                      d(I, y(ts, {}), R),
                      d(R, () => t.t('settings.copySeedToClipboard')),
                      d(m, () => t.t('settings.gameSeedDescription')),
                      d(N, () => t.t('settings.gameSeedInputLabel')),
                      (g.$$input = (D) => {
                        const h = a()
                        if (h) {
                          const L = Number(D.target.value)
                          if (L && !Number.isNaN(L) && Number.isFinite(L)) {
                            const M = Math.max(0, Math.min(Math.floor(L), 1e21))
                            l(M), (h.value = String(M))
                          } else l(0), (h.value = '')
                        }
                      }),
                      s(g),
                      (O.$$click = () => {
                        W(r.vibration),
                          n.resetFree(S()),
                          Re('event', 'override_free', { seed: S() }),
                          l(0)
                        const D = a()
                        D && (D.value = '')
                      }),
                      d(O, () => t.t('settings.startNewPractice')),
                      d(
                        T,
                        (() => {
                          const D = V(() => r.free.guesses.length > 0 && !ve(e.mode, r), !0)
                          return () =>
                            D() &&
                            (() => {
                              const h = Wf.cloneNode(!0)
                              return d(h, () => t.t('settings.startNewPracticeWarning')), h
                            })()
                        })(),
                        null,
                      ),
                      w(
                        (D) => {
                          const h = t.t('settings.gameSeedInputPlaceholder'),
                            L = S() ? S() : '',
                            M = c()
                          return (
                            h !== D._v$4 && U(g, 'placeholder', (D._v$4 = h)),
                            L !== D._v$5 && (g.value = D._v$5 = L),
                            M !== D._v$6 && (O.disabled = D._v$6 = M),
                            D
                          )
                        },
                        { _v$4: void 0, _v$5: void 0, _v$6: void 0 },
                      ),
                      T
                    )
                  })()
              })(),
            ),
          ]
    }
  He(['click', 'input'])
  const $f = P(
      '<div class="flex items-center m-4"><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" class="sr-only"><div class="block bg-gray-500 dark:bg-gray-600 w-14 h-8 rounded-full"></div><div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div></div><div class="ml-3 text-black dark:text-white"></div></label></div>',
    ),
    kf = P(
      '<div id="settings-panel" class="w-full h-full overflow-auto"><div class="max-w-[550px] w-full m-auto flex flex-row-reverse pr-4 pt-2"><button type="button" class="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-900 hover:text-black dark:text-gray-400 dark:hover:text-white"></button></div><div class="max-w-[550px] m-auto w-full px-6 mb-8"><div class="text-4xl mt-2 mb-4 text-center"></div><div class="flex flex-col text-base"><div class="m-4"><label for="keyboardHeightRange"></label><input type="range" class="appearance-none w-full h-2 rounded bg-gray-300 dark:bg-gray-600 cursor-pointer" id="keyboardHeightRange"></div><div class="m-4"><label for="gameSizeSelect" class="block text-black dark:text-white mb-1"></label><div class="relative"><div class="flex items-center text-black dark:text-white absolute top-0 bottom-0 right-3 pointer-events-none"></div><select id="gameSizeSelect" class="bg-gray-50 border border-gray-400 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer appearance-none"><option value="fit"></option><option value="square"></option></select></div></div></div></div></div>',
    ),
    Vf = P(
      '<div class="text-center mt-6"><button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"></button><div class="text-center text-base"></div></div>',
    ),
    Wt = (e) =>
      (() => {
        const t = $f.cloneNode(!0),
          r = t.firstChild,
          n = r.firstChild,
          o = n.firstChild,
          i = o.nextSibling,
          a = i.nextSibling,
          s = n.nextSibling
        return (
          Ie(o, 'change', e.onChange),
          Ie(o, 'click', e.onClick, !0),
          d(s, () => e.text),
          w(
            (S) => {
              const l = e.id,
                E = e.id,
                A = e.checked,
                c = e.ariaLabel,
                u = e.checked,
                T = e.checked && !e.colorblind,
                f = e.checked && e.colorblind
              return (
                l !== S._v$ && U(r, 'for', (S._v$ = l)),
                E !== S._v$2 && U(o, 'id', (S._v$2 = E)),
                A !== S._v$3 && (o.checked = S._v$3 = A),
                c !== S._v$4 && U(o, 'aria-label', (S._v$4 = c)),
                u !== S._v$5 && a.classList.toggle('translate-x-[100%]', (S._v$5 = u)),
                T !== S._v$6 && a.classList.toggle('bg-box-correct', (S._v$6 = T)),
                f !== S._v$7 && a.classList.toggle('bg-box-correct-alt', (S._v$7 = f)),
                S
              )
            },
            {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
              _v$6: void 0,
              _v$7: void 0,
            },
          ),
          t
        )
      })(),
    Zf = (e) => {
      const t = $(),
        [r, n] = de()
      return (() => {
        const o = kf.cloneNode(!0),
          i = o.firstChild,
          a = i.firstChild,
          s = i.nextSibling,
          S = s.firstChild,
          l = S.nextSibling,
          E = l.firstChild,
          A = E.firstChild,
          c = A.nextSibling,
          u = E.nextSibling,
          T = u.firstChild,
          f = T.nextSibling,
          I = f.firstChild,
          R = I.nextSibling,
          m = R.firstChild,
          N = m.nextSibling
        return (
          Ie(a, 'click', e.onCloseSettings, !0),
          d(a, y(ar, {})),
          d(S, () => t.t('header.settings')),
          d(
            l,
            y(Wt, {
              id: 'toggleDarkMode',
              get text() {
                return t.t('settings.darkMode')
              },
              get checked() {
                return r.darkMode
              },
              get colorblind() {
                return r.colorblind
              },
              onClick: () => W(r.vibration),
              onChange: (v) => n.setDarkMode(v.currentTarget.checked),
            }),
            E,
          ),
          d(
            l,
            y(Wt, {
              id: 'toggleColorblind',
              get text() {
                return t.t('settings.colorblindMode')
              },
              get checked() {
                return r.colorblind
              },
              get colorblind() {
                return r.colorblind
              },
              onClick: () => W(r.vibration),
              onChange: (v) => n.setColorblind(v.currentTarget.checked),
            }),
            E,
          ),
          d(
            l,
            Qi &&
              y(Wt, {
                id: 'toggleVibration',
                get text() {
                  return t.t('settings.vibration')
                },
                get checked() {
                  return r.vibration
                },
                get colorblind() {
                  return r.colorblind
                },
                onClick: () => W(r.vibration),
                onChange: (v) => n.setVibration(v.currentTarget.checked),
              }),
            E,
          ),
          d(
            l,
            y(Wt, {
              id: 'toggleEnterBsReversed',
              get text() {
                return t.t('settings.switchKeys', {
                  example: `${r.enterBsReversed ? '\u23CE' : '\u232B'} . . . ${
                    r.enterBsReversed ? '\u232B' : '\u23CE'
                  }`,
                })
              },
              get checked() {
                return r.enterBsReversed
              },
              get colorblind() {
                return r.colorblind
              },
              onClick: () => W(r.vibration),
              onChange: (v) => n.setEnterBsReversed(v.currentTarget.checked),
              get ariaLabel() {
                return t.t('settings.switchKeysInfo', {
                  left: r.enterBsReversed ? t.t('game.backspaceKey') : t.t('game.enterKey'),
                  right: r.enterBsReversed ? t.t('game.enterKey') : t.t('game.backspaceKey'),
                })
              },
            }),
            E,
          ),
          d(
            l,
            y(Wt, {
              id: 'toggleAchievementNotifs',
              get text() {
                return t.t('settings.achievementNotifs')
              },
              get checked() {
                return r.achievementNotifs
              },
              get colorblind() {
                return r.colorblind
              },
              onClick: () => W(r.vibration),
              onChange: (v) => n.setAchievementNotifs(v.currentTarget.checked),
              get ariaLabel() {
                return t.t('settings.achievementNotifs')
              },
            }),
            E,
          ),
          d(A, () => t.t('settings.keyboardHeight', { height: r.keyboardHeight.toFixed(1) })),
          c.addEventListener('change', (v) => n.setKeyboardHeight(Number(v.currentTarget.value))),
          (c.$$input = (v) => n.setKeyboardHeight(Number(v.currentTarget.value))),
          U(c, 'min', Xi),
          U(c, 'max', Zi),
          U(c, 'step', Kl),
          d(T, () => t.t('settings.gameSize')),
          d(I, y(Qr, {})),
          R.addEventListener('change', (v) => n.setGameSize(v.currentTarget.value)),
          (R.$$click = () => W(r.vibration)),
          d(m, () => t.t('settings.gameFit')),
          d(N, () => t.t('settings.gameSquare')),
          d(
            s,
            y(_f, {
              get mode() {
                return e.mode
              },
            }),
            null,
          ),
          d(
            s,
            (() => {
              const v = V(
                () => e.mode === 'free' && r.free.guesses.length > 0 && !ve(e.mode, r),
                !0,
              )
              return () =>
                v() &&
                (() => {
                  const g = Vf.cloneNode(!0),
                    O = g.firstChild,
                    D = O.nextSibling
                  return (
                    (O.$$click = () => {
                      W(r.vibration), n.resetFree()
                    }),
                    d(O, () => t.t('settings.resetPractice')),
                    d(D, () => t.t('settings.resetWarning')),
                    g
                  )
                })()
            })(),
            null,
          ),
          w(
            (v) => {
              const g = t.t('header.settings'),
                O = t.t('app.close'),
                D = !r.colorblind,
                h = r.colorblind,
                L = r.keyboardHeight,
                M = r.gameSize
              return (
                g !== v._v$8 && U(o, 'aria-label', (v._v$8 = g)),
                O !== v._v$9 && U(a, 'aria-label', (v._v$9 = O)),
                D !== v._v$10 && c.classList.toggle('quordle-range', (v._v$10 = D)),
                h !== v._v$11 && c.classList.toggle('quordle-range-alt', (v._v$11 = h)),
                L !== v._v$12 && (c.value = v._v$12 = L),
                M !== v._v$13 && (R.value = v._v$13 = M),
                v
              )
            },
            {
              _v$8: void 0,
              _v$9: void 0,
              _v$10: void 0,
              _v$11: void 0,
              _v$12: void 0,
              _v$13: void 0,
            },
          ),
          o
        )
      })()
    }
  He(['click', 'input'])
  const Xf = P(
      '<div id="statistics-panel" class="w-full h-full overflow-auto"><div class="max-w-[550px] w-full m-auto flex flex-row-reverse pr-4 pt-2"><button type="button" class="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-900 hover:text-black dark:text-gray-400 dark:hover:text-white"></button></div><div class="max-w-[550px] m-auto w-full px-6 mb-8"><h1 class="text-4xl mt-2 mb-4 text-center"></h1><div class="w-full grid grid-cols-4 gap-2"><div class="flex flex-col text-center"><span class="text-xl"></span><span class="text-base text-gray-600 dark:text-gray-300 break-words"></span></div><div class="flex flex-col text-center"><span class="text-xl"></span><span class="text-base text-gray-600 dark:text-gray-300 break-words"></span></div><div class="flex flex-col text-center"><span class="text-xl"></span><span class="text-base text-gray-600 dark:text-gray-300 whitespace-pre-line break-words"></span></div><div class="flex flex-col text-center"><span class="text-xl"></span><span class="text-base text-gray-600 dark:text-gray-300 whitespace-pre-line break-words"></span></div></div><h1 class="text-4xl mt-8 text-center"></h1><h2 class="text-lg mb-4 text-center"></h2><div class="text-lg"></div></div></div>',
    ),
    Ii = P(
      '<div class="flex flex-row mb-1"><div class="mr-2"></div><div class="min-w-min text-right px-2"></div></div>',
    ),
    Qf = P(
      '<div class="flex flex-row text-base mt-6 mb-1 px-2"><div class="flex-1"> - </div><div class="flex-1 text-right"> - </div></div>',
    ),
    Jf = P(
      '<div class="text-base font-bold flex flex-row items-center cursor-pointer rounded-l-xl rounded-r-xl overflow-hidden" role="button" aria-controls="loss-distribution"><div class="bg-box-correct h-6"></div><div class="bg-rose-600 dark:bg-rose-800 text-right h-6"></div></div>',
    ),
    zf = P(
      '<div id="loss-distribution"><h1 class="text-4xl mt-8 text-center"></h1><h2 class="text-lg mb-4 text-center"></h2><div class="text-lg"></div></div>',
    ),
    qf = [...Array(ee - (pe - 1)).keys()].map((e) => e + (pe - 1)),
    jf = [...Array(pe).keys()].map((e) => e + ee).reverse(),
    eR = (e) => {
      const t = $(),
        [r, n] = de(),
        [o, i] = Q(!1),
        a = b(() => Math.max(...r[e.mode].history.slice(pe - 1, ee), 1)),
        s = b(() => Math.max(...r[e.mode].history.slice(ee), 1)),
        S = b(() => r[e.mode].history.slice(pe - 1, ee).reduce((I, R) => I + R, 0)),
        l = b(() => r[e.mode].history.slice(ee).reduce((I, R) => I + R, 0)),
        E = b(() => S() + l()),
        A = b(() => r[e.mode].answersCorrect.reduce((I, R) => (I += R >= 0 ? 1 : 0), 0)),
        c = b(() => Math.max(...r[e.mode].answersCorrect)),
        u = b(() => ve(e.mode, r) && A() === pe),
        T = b(() => ve(e.mode, r) && A() < pe),
        f = b(() => (e.mode === 'daily' ? t.t('header.daily') : t.t('header.practice')))
      return (() => {
        const I = Xf.cloneNode(!0),
          R = I.firstChild,
          m = R.firstChild,
          N = R.nextSibling,
          v = N.firstChild,
          g = v.nextSibling,
          O = g.firstChild,
          D = O.firstChild,
          h = D.nextSibling,
          L = O.nextSibling,
          M = L.firstChild,
          F = M.nextSibling,
          H = L.nextSibling,
          J = H.firstChild,
          j = J.nextSibling,
          Y = H.nextSibling,
          Se = Y.firstChild,
          Oe = Se.nextSibling,
          ue = g.nextSibling,
          ye = ue.nextSibling,
          be = ye.nextSibling
        return (
          Ie(m, 'click', e.onCloseStatistics, !0),
          d(m, y(ar, {})),
          d(
            v,
            (() => {
              const x = V(() => e.mode === 'daily', !0)
              return () => (x() ? t.t('stats.dailyStatistics') : t.t('stats.practiceStatistics'))
            })(),
          ),
          d(D, () => S() + l()),
          d(h, () => t.t('stats.played')),
          d(M, () => Math.round((E() > 0 ? S() / E() : 0) * 100)),
          d(F, () => t.t('stats.winPercent')),
          d(J, () => r[e.mode].currentStreak),
          d(j, () => t.t('stats.currentStreak')),
          d(Se, () => r[e.mode].maxStreak),
          d(Oe, () => t.t('stats.maxStreak')),
          d(ue, () => t.t('stats.winDistribution')),
          d(ye, () => t.t('stats.winDistExplain')),
          d(be, () =>
            qf.map((x) =>
              (() => {
                const z = Ii.cloneNode(!0),
                  q = z.firstChild,
                  Ee = q.nextSibling
                return (
                  d(q, x + 1),
                  d(Ee, () => r[e.mode].history[x]),
                  w(
                    (Z) => {
                      const re = t.t('stats.aria.winChartBar', {
                          numGames: t.t('stats.aria.numGames', {
                            smart_count: r[e.mode].history[x],
                          }),
                          numGuesses: t.t('stats.aria.numGuesses', { smart_count: x + 1 }),
                        }),
                        C = {
                          ' text-black bg-box-correct': u() && c() === x,
                          'text-black bg-gray-300 dark:text-white dark:bg-gray-700': !(
                            u() && c() === x
                          ),
                        },
                        p = (r[e.mode].history[x] / a()) * 100 + '%'
                      return (
                        re !== Z._v$7 && U(z, 'aria-label', (Z._v$7 = re)),
                        (Z._v$8 = we(Ee, C, Z._v$8)),
                        p !== Z._v$9 && Ee.style.setProperty('width', (Z._v$9 = p)),
                        Z
                      )
                    },
                    { _v$7: void 0, _v$8: void 0, _v$9: void 0 },
                  ),
                  z
                )
              })(),
            ),
          ),
          d(
            N,
            (() => {
              const x = V(() => l() > 0, !0)
              return () =>
                x() && [
                  (() => {
                    const z = Qf.cloneNode(!0),
                      q = z.firstChild,
                      Ee = q.firstChild,
                      Z = q.nextSibling,
                      re = Z.firstChild
                    return (
                      d(q, () => t.t('stats.win'), Ee),
                      d(q, S, null),
                      d(Z, l, re),
                      d(Z, () => t.t('stats.loss'), null),
                      z
                    )
                  })(),
                  (() => {
                    const z = Jf.cloneNode(!0),
                      q = z.firstChild,
                      Ee = q.nextSibling
                    return (
                      (z.$$click = () => {
                        W(r.vibration), i(!o())
                      }),
                      w(
                        (Z) => {
                          const re = o(),
                            C = t.t('stats.aria.winRateRatio'),
                            p = (S() / E()) * 100 + '%',
                            B = (l() / E()) * 100 + '%'
                          return (
                            re !== Z._v$10 && U(z, 'aria-expanded', (Z._v$10 = re)),
                            C !== Z._v$11 && U(z, 'aria-label', (Z._v$11 = C)),
                            p !== Z._v$12 && q.style.setProperty('width', (Z._v$12 = p)),
                            B !== Z._v$13 && Ee.style.setProperty('width', (Z._v$13 = B)),
                            Z
                          )
                        },
                        { _v$10: void 0, _v$11: void 0, _v$12: void 0, _v$13: void 0 },
                      ),
                      z
                    )
                  })(),
                ]
            })(),
            null,
          ),
          d(
            N,
            (() => {
              const x = V(() => !!o(), !0)
              return () =>
                x() &&
                (() => {
                  const z = zf.cloneNode(!0),
                    q = z.firstChild,
                    Ee = q.nextSibling,
                    Z = Ee.nextSibling
                  return (
                    d(q, () => t.t('stats.lossDistribution')),
                    d(Ee, () => t.t('stats.lossDistExplain')),
                    d(Z, () =>
                      jf.map((re) =>
                        (() => {
                          const C = Ii.cloneNode(!0),
                            p = C.firstChild,
                            B = p.nextSibling
                          return (
                            d(p, pe - (re - ee)),
                            d(B, () => r[e.mode].history[re]),
                            w(
                              (K) => {
                                const X = t.t('stats.aria.lossChartBar', {
                                    numGames: t.t('stats.aria.numGames', {
                                      smart_count: r[e.mode].history[re],
                                    }),
                                    numWords: t.t('stats.aria.numWords', {
                                      smart_count: pe - (re - ee),
                                    }),
                                  }),
                                  ne = {
                                    'text-white bg-rose-600 dark:bg-rose-800':
                                      T() && A() === re - ee,
                                    'text-black bg-gray-300 dark:bg-gray-700 dark:text-white': !(
                                      T() && A() === re - ee
                                    ),
                                  },
                                  ce = (r[e.mode].history[re] / s()) * 100 + '%'
                                return (
                                  X !== K._v$14 && U(C, 'aria-label', (K._v$14 = X)),
                                  (K._v$15 = we(B, ne, K._v$15)),
                                  ce !== K._v$16 && B.style.setProperty('width', (K._v$16 = ce)),
                                  K
                                )
                              },
                              { _v$14: void 0, _v$15: void 0, _v$16: void 0 },
                            ),
                            C
                          )
                        })(),
                      ),
                    ),
                    z
                  )
                })()
            })(),
            null,
          ),
          w(
            (x) => {
              const z =
                  e.mode === 'daily'
                    ? t.t('stats.dailyStatistics')
                    : t.t('stats.practiceStatistics'),
                q = t.t('app.close'),
                Ee = t.t('stats.aria.played', { mode: f(), num: S() + l() }),
                Z = t.t('stats.aria.winPercent', {
                  mode: f(),
                  num: Math.round((E() > 0 ? S() / E() : 0) * 100),
                }),
                re = t.t('stats.aria.currentStreak', {
                  mode: f(),
                  numGames: t.t('stats.aria.numGames', { smart_count: r[e.mode].maxStreak }),
                }),
                C = t.t('stats.aria.maxStreak', {
                  mode: f(),
                  numGames: t.t('stats.aria.numGames', { smart_count: r[e.mode].maxStreak }),
                })
              return (
                z !== x._v$ && U(I, 'aria-label', (x._v$ = z)),
                q !== x._v$2 && U(m, 'aria-label', (x._v$2 = q)),
                Ee !== x._v$3 && U(O, 'aria-label', (x._v$3 = Ee)),
                Z !== x._v$4 && U(L, 'aria-label', (x._v$4 = Z)),
                re !== x._v$5 && U(H, 'aria-label', (x._v$5 = re)),
                C !== x._v$6 && U(Y, 'aria-label', (x._v$6 = C)),
                x
              )
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0, _v$5: void 0, _v$6: void 0 },
          ),
          I
        )
      })()
    }
  He(['click'])
  var tR = [
    'Alejandra P.',
    'Anna Kalata',
    'Anna Torres',
    'BEVERLY L Cheyney',
    'Bernadette McDougall',
    'Beth Secor',
    'Beth Vargas',
    'Blane Mall',
    'Bob Ezrin',
    'Bob Smith',
    'Bobby Franklin',
    'Bryan',
    'Bryan Williams',
    'Brynn Newton',
    'CJ Blake',
    'Carol Jones',
    'Carrie W NM',
    'Cat',
    'Charmiane Claxton',
    'Chris Benton',
    'Cindy McCullough',
    'Dale Johnson',
    'Dan Tienes',
    'Dancer 58',
    'David Pattillo',
    'Deborah Chadwick',
    'Dorothy Drennen',
    'Dug Karlson',
    'Elisabeth Martensen',
    'Elisabeth Puglisi',
    'Ellen Lidington',
    'Eric Johnson',
    'Eric L. Epps',
    'Flip Kromer',
    'Fredrick HAGEMEISTER',
    'Greg Webb',
    'HelenM',
    'JK Mc',
    'James Ralff',
    'Jeff LeCrone',
    'Jennifer Green',
    'Jess S',
    'Jhonny Rodriguez',
    'Jo Ann Coopwood',
    'Juliann Rulo',
    'Julie Gelfuso',
    'Jun Kwang Han',
    'June McCallum',
    'Karen Haack',
    'Karsten Rutt',
    'Kate',
    'Kathie Bollenbach',
    'Kelley Armstrong',
    'Kerin T Huber',
    'Kevin Eadie',
    'Kim Kalny',
    'LISA MOSER',
    'LadyAdrienne DelaCruz',
    'Leah Swiler',
    'Leanne Haire',
    'Linda Thomas',
    'Lloyd Lewis',
    'Lori Salganicoff',
    'Lynn M',
    'Lynn Pavalon',
    'Marcella Hilhorst',
    'Marcy Neal',
    'Margaret Minton',
    'Margaret W Sheppard',
    'Margaret Wendels',
    'Maria Ashot',
    'Mark Richards',
    'Mary Douglass Ryan',
    'Mary Kenny',
    'Mary Reddaway',
    'Maureen Shepherd',
    'Melissa Whiffin',
    'Micha\u0142 Bartoszkiewicz',
    'Mike Robertson',
    'Molly Bierman',
    'Nadia Beckett',
    'Nancy Ellis',
    'Nicole Dawson',
    'Paul Dzus',
    'Paula Gibes Smith',
    'Ralph Warren',
    'Rama Kocherlakota',
    'Renata Loewen',
    'Rob DeSisto',
    'RogueWarrior',
    'Ruth Kravitz',
    'SJ Cincotti',
    'Sabina Rogers',
    'Sally Taylor',
    'Samantha Weidenbenner',
    'Sammy Heather',
    'Sandy Niles',
    'Sara Widboom',
    'Sarah Wiley',
    'Scott Tuggle',
    'Sean G',
    'Shelley Estelle',
    'Susan Mazze',
    'Susan Thieme',
    'Tim Kunin',
    'Trisha Gorrell',
    'Ty Curtis',
    'Vonnie Matheny',
    'ZaftigShady',
    'doug wheaton',
    'eggler',
    'pp52',
    'rizen',
  ]
  const rR = P('<div class="flex w-[100%]" role="row"></div>'),
    nR = P(
      '<div id="tutorial-panel" class="w-full h-full overflow-auto"><div class="max-w-[550px] w-full m-auto flex flex-row-reverse pr-4 pt-2"><button type="button" class="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-900 hover:text-black dark:text-gray-400 dark:hover:text-white"></button></div><div class="max-w-[550px] m-auto w-full px-6"><h1 class="text-3xl mt-2 mb-1"></h1><div class="text-base mb-3"></div><div class="text-base"></div><div class="text-base"></div><div class="text-base"></div><h2 class="text-3xl mt-4 mb-2"></h2><div class="w-[50%] mb-2 pr-1" role="table"></div><div class="text-base mb-6"></div><div class="w-[50%] mb-2 pr-1" role="table"></div><div class="text-base mb-6"></div><div class="w-[50%] mb-2 pr-1" role="table"></div><div class="text-base mb-6"></div><div class="text-base"></div><div class="flex w-[100%] mb-2"><div class="w-[50%] mr-1" role="table"></div><div class="w-[50%] ml-1" role="table"></div></div><div class="flex w-[100%] my-2"><div class="w-[50%] mr-1" role="table"></div><div class="w-[50%] ml-1" role="table"></div></div><div class="text-base"></div><ol class="text-base list-decimal ml-8 mb-6"><li></li><li></li><li></li><li></li></ol><div class="text-base mb-3"></div><div class="text-base mb-8"></div><h1 class="text-3xl mb-1"></h1><div class="text-base mb-3"></div><div class="text-base font-semibold mb-8"></div><hr class="opacity-20"><div class="text-base text-center my-5 flex justify-center gap-4"></div></div></div>',
    ),
    oR = P(
      '<div class="flex item-center justify-center mb-6"><a title="Crowdin" target="_blank" href="https://crowdin.com/project/quordle" class="inline-flex"><img src="https://badges.crowdin.net/quordle/localized.svg"></a></div>',
    )
  Sd(tR)
  const rt = (e) => {
      const t = $()
      return (() => {
        const r = rR.cloneNode(!0)
        return (
          d(r, () =>
            e.word[0].split('').map((n, o) =>
              y(Ss, {
                get state() {
                  return e.word[1][o]
                },
                letter: n,
                gameRow: 0,
                gameCol: o,
                rowTemporalState: 'past',
                activeCol: 0,
                get colorblind() {
                  return e.colorblind
                },
                currentRow: 0,
                get tileHeight() {
                  return e.tileHeight
                },
                get presentTileHeight() {
                  return e.tileHeight
                },
                answered: !1,
                gameSize: 'square',
                get ariaLabel() {
                  return V(() => e.word[1][o] === 'diff', !0)()
                    ? t.t('game.aria.tileDiff', { letter: n, column: o + 1 })
                    : V(() => e.word[1][o] === 'none', !0)()
                    ? t.t('game.aria.tileNone', { letter: n, column: o + 1 })
                    : t.t('game.aria.tileCorrect', { letter: n, column: o + 1 })
                },
              }),
            ),
          ),
          r
        )
      })()
    },
    iR = (e) => {
      const t = $(),
        [r] = de(),
        [n, o] = Q(0),
        i = gs({
          onResize: ({ width: s, height: S }) => {
            const l = parseFloat(getComputedStyle(document.documentElement).fontSize)
            if (s) {
              const E = (s - l * 0.5 - l * 0.25 * 10) / 10
              o(E)
            }
          },
        }),
        a = [
          [t.t('tutorial.exampleWord1'), ['correct', 'none', 'none', 'none', 'none']],
          [t.t('tutorial.exampleWord2'), ['none', 'diff', 'none', 'none', 'none']],
          [t.t('tutorial.exampleWord3'), ['none', 'none', 'none', 'none', 'none']],
          [t.t('tutorial.exampleWord4'), ['none', 'none', 'none', 'none', 'none']],
          [t.t('tutorial.exampleWord4'), ['none', 'none', 'diff', 'none', 'correct']],
          [t.t('tutorial.exampleWord4'), ['none', 'none', 'none', 'diff', 'none']],
          [t.t('tutorial.exampleWord4'), ['none', 'correct', 'none', 'none', 'diff']],
        ]
      return (() => {
        const s = nR.cloneNode(!0),
          S = s.firstChild,
          l = S.firstChild,
          E = S.nextSibling,
          A = E.firstChild,
          c = A.nextSibling,
          u = c.nextSibling,
          T = u.nextSibling,
          f = T.nextSibling,
          I = f.nextSibling,
          R = I.nextSibling,
          m = R.nextSibling,
          N = m.nextSibling,
          v = N.nextSibling,
          g = v.nextSibling,
          O = g.nextSibling,
          D = O.nextSibling,
          h = D.nextSibling,
          L = h.firstChild,
          M = L.nextSibling,
          F = h.nextSibling,
          H = F.firstChild,
          J = H.nextSibling,
          j = F.nextSibling,
          Y = j.nextSibling,
          Se = Y.firstChild,
          Oe = Se.nextSibling,
          ue = Oe.nextSibling,
          ye = ue.nextSibling,
          be = Y.nextSibling,
          x = be.nextSibling,
          z = x.nextSibling,
          q = z.nextSibling,
          Ee = q.nextSibling,
          Z = Ee.nextSibling,
          re = Z.nextSibling
        return (
          Ie(l, 'click', e.onCloseTutorial, !0),
          d(l, y(ar, {})),
          i(E),
          d(A, () => t.t('tutorial.title')),
          d(c, () => t.t('tutorial.p1')),
          d(u, () => t.t('tutorial.p2')),
          d(T, () => t.t('tutorial.p3')),
          d(f, () => t.t('tutorial.p4')),
          d(I, () => t.t('tutorial.examples')),
          d(
            R,
            y(rt, {
              get word() {
                return a[0]
              },
              get colorblind() {
                return r.colorblind
              },
              get tileHeight() {
                return n()
              },
            }),
          ),
          d(m, () => t.t('tutorial.example1')),
          d(
            N,
            y(rt, {
              get word() {
                return a[1]
              },
              get colorblind() {
                return r.colorblind
              },
              get tileHeight() {
                return n()
              },
            }),
          ),
          d(v, () => t.t('tutorial.example2')),
          d(
            g,
            y(rt, {
              get word() {
                return a[2]
              },
              get colorblind() {
                return r.colorblind
              },
              get tileHeight() {
                return n()
              },
            }),
          ),
          d(O, () => t.t('tutorial.example3')),
          d(D, () => t.t('tutorial.example4Pre')),
          d(
            L,
            y(rt, {
              get word() {
                return a[3]
              },
              get colorblind() {
                return r.colorblind
              },
              get tileHeight() {
                return n()
              },
            }),
          ),
          d(
            M,
            y(rt, {
              get word() {
                return a[4]
              },
              get colorblind() {
                return r.colorblind
              },
              get tileHeight() {
                return n()
              },
            }),
          ),
          d(
            H,
            y(rt, {
              get word() {
                return a[5]
              },
              get colorblind() {
                return r.colorblind
              },
              get tileHeight() {
                return n()
              },
            }),
          ),
          d(
            J,
            y(rt, {
              get word() {
                return a[6]
              },
              get colorblind() {
                return r.colorblind
              },
              get tileHeight() {
                return n()
              },
            }),
          ),
          d(j, () => t.t('tutorial.example4Title')),
          d(Se, () => t.t('tutorial.example4b1')),
          d(Oe, () => t.t('tutorial.example4b2')),
          d(ue, () => t.t('tutorial.example4b3')),
          d(ye, () => t.t('tutorial.example4b4')),
          d(be, () => t.t('tutorial.final1')),
          d(x, () => t.t('tutorial.final2')),
          d(
            E,
            (() => {
              const C = V(() => t.locale() !== 'en', !0)
              return () => C() && oR.cloneNode(!0)
            })(),
            z,
          ),
          d(z, () => t.t('tutorial.explanationTitle')),
          d(q, () => t.t('tutorial.explanationP1')),
          d(Ee, () => t.t('tutorial.explanationP2')),
          d(
            re,
            y(ge, {
              href: '/privacy',
              target: '_blank',
              get children() {
                return t.t('tutorial.privacy')
              },
            }),
            null,
          ),
          d(
            re,
            y(ge, {
              href: '/terms',
              target: '_blank',
              get children() {
                return t.t('tutorial.terms')
              },
            }),
            null,
          ),
          w(
            (C) => {
              const p = t.t('tutorial.tutorial'),
                B = t.t('app.close'),
                K = t.t('tutorial.aria.tutorialGuess', { guess: a[0] }),
                X = t.t('tutorial.aria.tutorialGuess', { guess: a[1] }),
                ne = t.t('tutorial.aria.tutorialGuess', { guess: a[2] }),
                ce = t.t('tutorial.aria.tutorialGuessBoard', { guess: a[3], num: 1 }),
                ae = t.t('tutorial.aria.tutorialGuessBoard', { guess: a[4], num: 2 }),
                xe = t.t('tutorial.aria.tutorialGuessBoard', { guess: a[5], num: 3 }),
                We = t.t('tutorial.aria.tutorialGuessBoard', { guess: a[6], num: 4 })
              return (
                p !== C._v$ && U(s, 'aria-label', (C._v$ = p)),
                B !== C._v$2 && U(l, 'aria-label', (C._v$2 = B)),
                K !== C._v$3 && U(R, 'aria-label', (C._v$3 = K)),
                X !== C._v$4 && U(N, 'aria-label', (C._v$4 = X)),
                ne !== C._v$5 && U(g, 'aria-label', (C._v$5 = ne)),
                ce !== C._v$6 && U(L, 'aria-label', (C._v$6 = ce)),
                ae !== C._v$7 && U(M, 'aria-label', (C._v$7 = ae)),
                xe !== C._v$8 && U(H, 'aria-label', (C._v$8 = xe)),
                We !== C._v$9 && U(J, 'aria-label', (C._v$9 = We)),
                C
              )
            },
            {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
              _v$6: void 0,
              _v$7: void 0,
              _v$8: void 0,
              _v$9: void 0,
            },
          ),
          s
        )
      })()
    }
  He(['click'])
  const aR = P(
      '<div class="z-[500000] fixed w-full h-full text-black dark:text-white bg-white dark:bg-gray-800 overflow-auto transition-all ease-in-out duration-500"></div>',
    ),
    sR = P('<div class="flex w-full" role="row"></div>'),
    lR = P('<div class="flex flex-col flex-auto p-1 first:pl-2 last:pr-2" role="table"></div>'),
    SR = P(
      '<div class="w-full absolute flex flex-col overflow-hidden"><div class="max-w-[550px] m-auto w-full"></div><div class="quordle-desktop-scrollbar max-w-[550px] m-auto w-full flex-auto relative"><div class="w-full flex-col" aria-label="Game Boards"></div></div><div class="max-w-[550px] m-auto w-full"></div></div>',
    ),
    ER = P('<div class="flex w-full"></div>'),
    Lr = (e) =>
      y($i, {
        enterClass: 'quordle-exit-page',
        enterToClass: 'quordle-enter-page',
        exitClass: 'quordle-enter-page',
        exitToClass: 'quordle-exit-page',
        get children() {
          return (
            V(() => !!e.open, !0)() &&
            (() => {
              const t = aR.cloneNode(!0)
              return (
                d(t, () => e.children),
                w(() => t.style.setProperty('font-size', e.fontSize + 'px')),
                t
              )
            })()
          )
        },
      }),
    cR = [...Array(yt).keys()],
    uR = [...Array(ki).keys()],
    AR = [...Array(ee).keys()],
    dR = [...Array(Fe).keys()],
    OR = (e) => {
      const [t, r] = de(),
        n = e.gameX + e.gameY * yt,
        o = b(() => {
          const S = t[e.mode],
            l = S.guesses,
            E = S.answers[n]
          return l.indexOf(E)
        }),
        i = b(() => o() !== -1 && o() < e.gameRow),
        a = b(() => {
          const l = t[e.mode].guesses
          return e.gameRow === l.length
            ? ve(e.mode, t)
              ? 'never'
              : 'present'
            : i()
            ? 'never'
            : l.length > e.gameRow
            ? 'past'
            : 'future'
        }),
        s = b(() => {
          const S = e.gameX + e.gameY * yt,
            l = t[e.mode].guesses,
            E = t[e.mode].current,
            A = l[e.gameRow],
            c = t[e.mode].states[S][e.gameRow],
            u = t[e.mode].answersCorrect[S]
          return e.gameRow === u
            ? `Row ${e.gameRow + 1}. Guess ${A} is correct.`
            : e.gameRow === l.length && u < 0
            ? `Row ${e.gameRow + 1}. Current guess ${E}.`
            : A && c
            ? `Row ${e.gameRow + 1}. Guess ${A}. `
            : `Row ${e.gameRow + 1}. ` +
              (e.gameRow > u && u >= 0
                ? `Answer already guessed correctly on row ${u + 1}.`
                : 'Future guess.')
        })
      return (() => {
        const S = sR.cloneNode(!0)
        return (
          d(S, () =>
            dR.map((l) =>
              y(bO, {
                get mode() {
                  return e.mode
                },
                get gameX() {
                  return e.gameX
                },
                get gameY() {
                  return e.gameY
                },
                get gameRow() {
                  return e.gameRow
                },
                gameCol: l,
                get tileHeight() {
                  return e.tileHeight
                },
                get presentTileHeight() {
                  return e.presentTileHeight
                },
                get answerIndex() {
                  return o()
                },
                get answered() {
                  return i()
                },
                get temporalState() {
                  return a()
                },
              }),
            ),
          ),
          w(
            (l) => {
              const E = s(),
                A =
                  a() === 'present' &&
                  !i() &&
                  !!t[e.mode].extraCurrent &&
                  t[e.mode].extraCurrent.length > 0 &&
                  t[e.mode].extraCurrent.length % 2 === 0,
                c =
                  a() === 'present' &&
                  !i() &&
                  !!t[e.mode].extraCurrent &&
                  t[e.mode].extraCurrent.length > 0 &&
                  t[e.mode].extraCurrent.length % 2 === 1
              return (
                E !== l._v$ && U(S, 'aria-label', (l._v$ = E)),
                A !== l._v$2 && S.classList.toggle('quordle-shake-anim-0', (l._v$2 = A)),
                c !== l._v$3 && S.classList.toggle('quordle-shake-anim-1', (l._v$3 = c)),
                l
              )
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0 },
          ),
          S
        )
      })()
    },
    fR = (e) =>
      (() => {
        const t = lR.cloneNode(!0)
        return (
          d(t, () =>
            AR.map((r) =>
              y(OR, {
                get mode() {
                  return e.mode
                },
                get gameX() {
                  return e.gameX
                },
                get gameY() {
                  return e.gameY
                },
                gameRow: r,
                get tileHeight() {
                  return e.tileHeight
                },
                get presentTileHeight() {
                  return e.presentTileHeight
                },
              }),
            ),
          ),
          w(() => U(t, 'aria-label', `Game Board ${e.gameX + e.gameY * yt + 1}`)),
          t
        )
      })(),
    Ti = (e) => {
      const [t, r] = de(),
        [n, o] = xi(),
        [i, a] = Q(35),
        [s, S] = Q(0),
        [l, E] = Q(0),
        [A, c] = Q(!1),
        u = b(() => n.overlay === 'tutorial'),
        T = b(() => n.overlay === 'statistics'),
        f = b(() => n.overlay === 'settings'),
        I = b(() => n.overlay === 'achievements'),
        R = (N) => {
          ;(u() || T() || f()) && N.key === 'Escape' && o({ overlay: void 0 })
        }
      document.addEventListener('keydown', R), Pe(() => document.removeEventListener('keydown', R))
      const m = gs({
        onResize: ({ width: N, height: v }) => {
          const g = parseFloat(getComputedStyle(document.documentElement).fontSize)
          if (N) {
            a(N / 16)
            const O = (N - 1.5 * g - g * 0.25 * 10) / 10
            if ((E(O), v))
              if (ve(e.mode, t)) {
                const D = (v - g - g * 0.25 * 18) / 18
                c(D < O / 3), S(Math.max(O / 3, Math.min(O, D)))
              } else {
                const D = (v - g - g * 0.25 * 18 - O * 2) / 16
                c(D < O / 3), S(Math.max(O / 3, Math.min(O, D)))
              }
          }
        },
      })
      return (() => {
        const N = SR.cloneNode(!0),
          v = N.firstChild,
          g = v.nextSibling,
          O = g.firstChild,
          D = g.nextSibling
        return (
          we(N, { 'h-full': !ho, 'h-[calc(100%-25px)] bottom-[25px]': ho }),
          d(
            N,
            y(Af, {
              get mode() {
                return e.mode
              },
              onOpenTutorial: () => {
                W(t.vibration),
                  Re('event', 'tutorial', { mode: e.mode }),
                  o({ overlay: 'tutorial' })
              },
              onOpenStatistics: () => {
                W(t.vibration),
                  Re('event', 'statistics', { mode: e.mode }),
                  o({ overlay: 'statistics' })
              },
              onOpenSettings: () => {
                W(t.vibration),
                  Re('event', 'settings', { mode: e.mode }),
                  o({ overlay: 'settings' })
              },
              onOpenAchievements: () => {
                W(t.vibration),
                  Re('event', 'achievements', { mode: e.mode }),
                  o({ overlay: 'achievements' })
              },
            }),
            v,
          ),
          d(
            v,
            y(vO, {
              get mode() {
                return e.mode
              },
            }),
          ),
          m(g),
          d(O, () =>
            uR.map((h) =>
              (() => {
                const L = ER.cloneNode(!0)
                return (
                  U(L, 'aria-label', `Game Boards Row ${h + 1}`),
                  d(L, () =>
                    cR.map((M) =>
                      y(fR, {
                        get mode() {
                          return e.mode
                        },
                        gameX: M,
                        gameY: h,
                        get tileHeight() {
                          return s()
                        },
                        get presentTileHeight() {
                          return l()
                        },
                      }),
                    ),
                  ),
                  L
                )
              })(),
            ),
          ),
          d(
            g,
            y(tO, {
              onOpenAchievements: () => {
                W(t.vibration),
                  Re('event', 'achievements', { mode: e.mode }),
                  o({ overlay: 'achievements' })
              },
            }),
            null,
          ),
          d(
            D,
            (() => {
              const h = V(() => !!ve(e.mode, t), !0)
              return () =>
                h()
                  ? y(PO, {
                      get mode() {
                        return e.mode
                      },
                    })
                  : y(If, {
                      get mode() {
                        return e.mode
                      },
                      get fontSize() {
                        return i()
                      },
                      get disableInputCapture() {
                        return u() || T() || f()
                      },
                    })
            })(),
          ),
          d(
            N,
            y(Lr, {
              get open() {
                return f()
              },
              get fontSize() {
                return i()
              },
              get children() {
                return y(Zf, {
                  get mode() {
                    return e.mode
                  },
                  onCloseSettings: () => {
                    W(t.vibration), o({ overlay: void 0 })
                  },
                })
              },
            }),
            null,
          ),
          d(
            N,
            y(Lr, {
              get open() {
                return T()
              },
              get fontSize() {
                return i()
              },
              get children() {
                return y(eR, {
                  get mode() {
                    return e.mode
                  },
                  onCloseStatistics: () => {
                    W(t.vibration), o({ overlay: void 0 })
                  },
                })
              },
            }),
            null,
          ),
          d(
            N,
            y(Lr, {
              get open() {
                return u()
              },
              get fontSize() {
                return i()
              },
              get children() {
                return y(iR, {
                  onCloseTutorial: () => {
                    W(t.vibration), o({ overlay: void 0 })
                  },
                })
              },
            }),
            null,
          ),
          d(
            N,
            y(Lr, {
              get open() {
                return I()
              },
              get fontSize() {
                return i()
              },
              get children() {
                return y(nO, {
                  onCloseAchievements: () => {
                    W(t.vibration), o({ overlay: void 0 })
                  },
                })
              },
            }),
            null,
          ),
          d(
            N,
            (() => {
              const h = V(() => !!ve(e.mode, t), !0)
              return () => h() && y(SO, {})
            })(),
            null,
          ),
          w(
            (h) => {
              const L = i() + 'px',
                M = !u() && !T() && (t.gameSize === 'square' || A()),
                F = u() || T() || (t.gameSize === 'fit' && !A()),
                H = i() + 'px',
                J = i() + 'px'
              return (
                L !== h._v$4 && v.style.setProperty('font-size', (h._v$4 = L)),
                M !== h._v$5 && g.classList.toggle('overflow-auto', (h._v$5 = M)),
                F !== h._v$6 && g.classList.toggle('overflow-hidden', (h._v$6 = F)),
                H !== h._v$7 && g.style.setProperty('font-size', (h._v$7 = H)),
                J !== h._v$8 && D.style.setProperty('font-size', (h._v$8 = J)),
                h
              )
            },
            { _v$4: void 0, _v$5: void 0, _v$6: void 0, _v$7: void 0, _v$8: void 0 },
          ),
          N
        )
      })()
    },
    RR = P(
      '<div class="px-5 absolute flex items-center justify-center w-full h-full bg-gradient-to-r from-indigo-600 to-blue-400"><div class="p-10 bg-white rounded-md shadow-xl"><div class="flex flex-col items-center"><h1 class="font-bold text-blue-600 text-9xl"></h1><h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"><span class="text-red-500"></span> </h6><p class="mb-8 text-center text-gray-500 md:text-lg"></p></div></div></div>',
    ),
    IR = (e) => {
      const t = $()
      return (() => {
        const r = RR.cloneNode(!0),
          n = r.firstChild,
          o = n.firstChild,
          i = o.firstChild,
          a = i.nextSibling,
          s = a.firstChild
        s.nextSibling
        const S = a.nextSibling
        return (
          d(i, () => t.t('app.error404')),
          d(s, () => t.t('app.oops')),
          d(a, () => t.t('app.pageNotFound'), null),
          d(S, () => t.t('app.notFoundText')),
          d(
            o,
            y(ge, {
              href: '/',
              class: 'px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100',
              get children() {
                return t.t('app.backToDaily')
              },
            }),
            null,
          ),
          r
        )
      })()
    },
    TR = P(
      '<nav class="bg-new-blue w-screen border-b-2 border-white dark:border-gray-800 sticky top-0 max-w-full"></nav>',
    ),
    hR = P('<div class="flex items-center max-w-[550px] h-[58px] m-auto px-4"></div>'),
    LR = P(
      '<div class="bg-slate-300 dark:bg-gray-900"><div class="flex items-center max-w-[550px] h-[52px] m-auto px-4 py-2 relative"></div></div>',
    ),
    ys = () => {
      const e = ro(Wn),
        [t] = de()
      return (() => {
        const r = TR.cloneNode(!0)
        return (
          d(
            r,
            (() => {
              const n = V(() => !!e.md, !0)
              return () =>
                n()
                  ? (() => {
                      const o = hR.cloneNode(!0)
                      return (
                        d(
                          o,
                          (() => {
                            const i = V(() => !!e.md, !0)
                            return () =>
                              i() &&
                              y(ge, {
                                href: '/',
                                class: 'contents',
                                get children() {
                                  return y(Kr, {
                                    size: 'lg',
                                    get colorblind() {
                                      return t.colorblind
                                    },
                                  })
                                },
                              })
                          })(),
                        ),
                        o
                      )
                    })()
                  : (() => {
                      const o = LR.cloneNode(!0),
                        i = o.firstChild
                      return (
                        d(
                          i,
                          y(ge, {
                            href: '/',
                            class: 'contents',
                            get children() {
                              return y(Kr, {
                                size: 'sm',
                                get colorblind() {
                                  return t.colorblind
                                },
                              })
                            },
                          }),
                        ),
                        o
                      )
                    })()
            })(),
          ),
          r
        )
      })()
    },
    mR = P(
      `<div id="legal-page" class="max-w-[550px] m-auto overflow-hidden px-4 dark:text-white text-gray-900"><div class="mt-5 italic">Your use of our Quordle.com service is governed by our <!> <strong>OUR <!> CONTAIN DISCLAIMERS OF WARRANTIES AND LIABILITY AND A CLASS ACTION WAIVER. THESE PROVISIONS AFFECT YOUR RIGHTS ABOUT HOW TO RESOLVE ANY DISPUTE WITH QUORDLE.COM, INCLUDING UNDER THIS PRIVACY NOTICE. PLEASE REVIEW. YOUR USE OF THE QUORDLE.COM SERVICE IS ACCEPTANCE OF THIS PRIVACY NOTICE AND OUR </strong>.</div><div class="text-2xl font-bold mt-5 text-center">QUORDLE.COM</div><div class="text-2xl font-bold text-center">Website Privacy Notice</div><div class="text-center mb-5">Effective Date: August 17, 2022</div><div class="subheading">Table of Contents</div><ul><li><a href="#introduction">Introduction</a></li><li><a href="#coppa-compliance">COPPA Compliance</a></li><li><a href="#information-that-you-provide-to-us">Information that You Provide to Us</a></li><li><a href="#how-we-use-information-that-you-provide-to-us">How We Use Information that You Provide to Us</a></li><li><a href="#purposes-of-processing-the-information-that-you-provide-to-us">Purposes of Processing the Information that You Provide to Us</a></li><li><a href="#links-to-other-website">Links to Other Websites</a></li><li><a href="#information-collected-automatically-other-information-cookie-policy">Information Collected Automatically &amp; Other Information; Cookie Policy</a></li><li><a href="#your-rights-choices-opt-out">Your Rights &amp; Choices; Opt-Out</a></li><li><a href="#security-of-your-information">Security of Your Information</a></li><li><a href="#data-storage-and-retention">Data Storage and Retention</a></li><li><a href="#consent-to-process-and-transfer-of-information-about-you">Consent to Processing and Transfer of Information about You</a></li><li><a href="#correcting-updating-or-removing-personal-information-account-deletion">Correcting, Updating, or Removing Personal Information; Account Deletion</a></li><li><a href="#privacy-notice-for-california-residents">Privacy Notice for California Residents</a></li><li><a href="#eu-data-subject-rights">EU Data Subject Rights</a></li><li><a href="#eu-representative-and-data-protection-officer">EU Representative and Data Protection Officer</a></li><li><a href="#copyright">Copyright</a></li><li><a href="#business-transfers">Business Transfers</a></li><li><a href="#acceptance-of-privacy-notice-terms-and-conditions">Acceptance of Privacy Notice Terms and Conditions</a></li><li><a href="#questions-comments-or-complaints">Questions, Comments or Complaints</a></li></ul><div class="legalese"><div id="introduction" class="heading">Introduction</div><div>Your privacy is important to us. We understand that you are aware of and care about your own personal privacy interests, and we take that seriously. This Privacy Notice sets forth your privacy rights and applies to personal data we may collect solely through your use of the Quordle.com service. This Privacy Notice does not govern our collection of personal information through any means other than through Quordle.com.</div><div>Your decision to use Quordle.com and provide your personal data is voluntary. We indicate on our online, mobile, and other registration forms what types of personal data are requested. You may choose not to submit requested information online, or may choose to restrict the use of cookies (see 'Your Rights & Choices; Opt-Out\u2019 below for more information), but that may limit the services we are able to provide to you.</div><div>We recognize that information privacy is an ongoing responsibility, and so we will from time to time update this Privacy Notice as we undertake new personal data processing practices or adopt new privacy policies. If you have concerns, please contact our data protection officer at <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div id="coppa-compliance" class="heading">COPPA Compliance</div><div>Quordle.com is intended for a general audience, and is not targeted to, and does not knowingly collect personal data from, minors under 13 years of age. We request that these individuals do not provide personal data through the Quordle.com service.</div><div>In accordance with the U.S. Children\u2019s Online Privacy Protection Act of 1998 (COPPA), we will never knowingly solicit, nor will we accept, personally identifiable information from Users known to be under 13 years of age in a manner not permitted by COPPA or other applicable laws.</div><div>If you are a parent or guardian and believe that we have collected personal information from your child in a manner not permitted by law, please contact us at: <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>. We will remove the data to the extent required by applicable laws.</div><div id="information-that-you-provide-to-us" class="heading">Information that You Provide to Us</div><div>Quordle.com protects the identity of visitors to the Quordle.com service by limiting the collection of personally identifiable information. Personal information provided by you to us will not be posted or published by us, and will be shared with third parties only as provided herein. You can enjoy many of the features of Quordle.com without giving us your personal information.</div><div class="subheading">Promotions and other special features</div><div>For certain promotions and to access certain features that may be available on Quordle.com, we collect information voluntarily submitted by you to us to deliver the requested feature that may include (but not be limited to) your name, email address, city, state and age. You may edit this information at any time to change, add or remove it from our Quordle.com service. We process your personal information to deliver the requested feature to you and to inform you of other benefits or opportunities associated with our Quordle.com service. We may also use this information for legitimate business purposes that help us understand our users\u2019 needs and interests to better tailor our products and services to meet your needs.</div><div class="subheading">Game Play</div><div>Whenever you play Quordle, we collect data about your interactions with each Quordle. This information may be associated with your username, IP address or device ID for the purpose of providing the Quordle.com service and improving it.</div><div class="subheading">Payment card information</div><div>You may choose to purchase goods or services from Quordle.com using a payment card. Typically, payment card information is provided directly by a User, via the Quordle.com service, into the PCI/DSS-compliant payment processing service to which the Quordle.com service subscribes, and the Quordle.com service does not, itself, process or store your card information.</div><div id="how-we-use-information-that-you-provide-to-us" class="heading">How We Use Information that You Provide to Us</div><div class="subheading">Non-subscriber communications from us and our approved, third-party partners</div><div>If you choose to provide us with personal information through the Quordle.com service, you may receive the following types of emails from us:<ul><li>Emails related to subscription-maintenance activities;</li><li>Emails highlighting new features, content, and usage tips for the Quordle.com service; and</li><li>Special offers from our approved, third-party partners, if you "opt-in" or give us your permission to send them.</li></ul></div><div>When you provide us with your personal information, you can let us know that you do not wish to receive special offers from our third-party partners. Also, each special offer will have information available to allow you to "opt-out" if you no longer wish to receive special offers.</div><div class="subheading">Authorized service providers</div><div>For legitimate business interests, we may share your personal information with service providers that perform certain services on our behalf, such as processing credit card payments, performing business and sales analysis, and supporting the Quordle.com service\u2019s functionality.</div><div class="subheading">Business partners</div><div>When you make purchases or engage in our promotions, we may share personal information with the businesses with which we partner to offer you those products, services, promotions, contests and/or sweepstakes. When you elect to engage in a particular merchant\u2019s offer or program, you expressly authorize us to provide your email address and other information to that merchant.</div><div class="subheading">Surveys</div><div>We may occasionally conduct on-line surveys. All surveys are voluntary, and you may decline to participate.</div><div class="subheading">Law enforcement</div><div>We also may disclose your information: In response to a subpoena or as otherwise required by law. When we believe disclosure is appropriate in connection with efforts to investigate, prevent, or take other action regarding illegal activity, suspected fraud or other wrongdoing; to protect and defend the rights, property or safety of Quordle.com, our Users, our employees, or others; to comply with applicable law or cooperate with law enforcement; or to enforce our <!> or other agreements or policies.</div><div id="purposes-of-processing-the-information-that-you-provide-to-us" class="heading">Purposes of Processing the Information That You Provide to Us</div><div>As explained above, the Quordle.com service processes your data to provide you with the products and services you have requested or purchased from us, including special features and other content. Sometimes we use third-party providers to facilitate the delivery of the services described above, and these third-party providers may be supplied with or have access to your personal information for the sole purpose of providing services to you on our behalf.</div><div>We also use your data for legitimate business purposes that enable us to refine our the Quordle.com service and better tailor it to your needs and communicate with you about other products and services offered by Quordle.com. In addition, we may disclose your personal information in special legal circumstances. For instance, such information may be used where it is necessary to protect our copyright or intellectual property rights, or if the law requires us to do so.</div><div>You can update your personal information and change your marketing preferences at any time by sending an email to <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div id="links-to-other-website" class="heading">Links to Other Websites</div><div>This Privacy Notice only governs information collected through the Quordle.com service. The Quordle.com service may contain links to websites or content (including advertisements) operated and maintained by third parties, over which we have no control. We encourage you to review the privacy policy of a third-party website before disclosing any personal information to the website. Do not supply personal information to these sites unless you have verified their security and privacy policies.</div><div id="information-collected-automatically-other-information-cookie-policy" class="heading">Information Collected Automatically &amp; Other Information; Cookie Policy</div><div>Like other commercial websites, the Quordle.com service and its authorized partners use cookies (small files transferred from a website to its visitors\u2019 hard drives or browsers for record-keeping purposes), including essential, functional and analytical cookies, and other similar information-gathering technologies throughout the Quordle.com service to collect certain information automatically and store it in log files for a variety of legitimate business interests and purposes. This information may include (but is not limited to) internet protocol (IP) addresses, mobile device identifiers, the region or general location where your computer or device is accessing the internet, browser type, operating system and other usage information about your use of the Quordle.com service, including a history of the pages you view.</div><div>Web beacons, tags, and scripts may be used on the Quordle.com service or in email or other electronic communications we send to you. These assist us in delivering cookies, counting visits to the Quordle.com service, understanding usage and campaign effectiveness and determining whether an email has been opened and acted upon. We may receive reports based on the use of these technologies by our third-party service providers on an individual and aggregated basis.</div><div>Quordle.com and its authorized partners use cookies, beacons, and other similar technologies on the Quordle.com service for legitimate business interests that enable us to allow you to navigate, use, and access secure areas of the Quordle.com service. We also use these technologies for statistical purposes and to analyze and improve the use of the Quordle.com service and prepare aggregated usage reports.</div><div>As described below, we use these technologies for legitimate business purposes to provide standard advertising controls, determine User response to advertisements and promotions, and deliver targeted advertisements that we or our partners believe will be of most interest to you.</div><div>We may also use your IP address to help diagnose problems with our servers and to administer our website, analyze trends, track visitor movements, and gather broad demographic information that assists us in identifying visitor preferences.</div><div>We have a legitimate interest in understanding how our users, customers, and potential customers use the Quordle.com service. Among other things, this assists us in providing more relevant products and services. Please refer to '<a href="#your-rights-choices-opt-out">Your Rights &amp; Choices; Opt-Out</a>' below for more information.</div><div>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of the Quordle.com service. For more information about cookies, please visit <a href="https://www.allaboutcookies.org/">https://www.allaboutcookies.org/</a>.</div><ul class="mb-5 font-bold"><li>Analytics &amp; usage data</li></ul><div class="mb-5 italic">For our legitimate business interests, we may process your personal information for analytic purposes on the Quordle.com service as described in this section.</div><div>Together with <a href="https://policies.google.com/privacy?hl=en">Google Analytics</a>, we use cookies and software logs to monitor the use of the Quordle.com service and to gather non-personal information about visitors to Quordle.com. These monitoring systems allow us to track general information about our visitors, such as the type of browsers (for example, Firefox or Internet Explorer), the operating systems (for instance, Windows or Macintosh), or the Internet providers (for instance, Comcast) they use. This information is used for statistical and market research purposes to tailor content to usage patterns and to provide services requested by our customers.</div><div>We also have implemented certain <a href="https://policies.google.com/technologies/ads">Google Analytics Advertiser</a> features. These tools use cookies to collect and store standard Internet log and visitor information on our behalf, including information about what pages you visit, how long you are on Quordle.com, how you got here, and what you click on during your visit. This Google Analytics data is not tied to personal information, so this information cannot be used to identify who you are. We use the data provided by Google Analytics to develop our services and content around our User demographics, interests, and behavior on our Quordle.com service. You can opt-out of this Google Analytics Advertiser feature using the Ads Settings located at <a href="https://www.google.com/settings/ads">https://www.google.com/settings/ads</a>. In addition, you can use the <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-Out Browser Add-on</a> to disable tracking by Google Analytics. To delete these cookies, please see your browser\u2019s privacy settings or follow the above instructions.</div><div>We also may receive other data about your use of our Quordle.com service from other sources. This information may include (but is not limited to) information about your activities across unrelated websites and mobile applications, information about the possible relationships between different browsers and devices and information that we receive from our third-party service providers. We may add this information to the information to the information we have already collected through our Quordle.com service.</div><ul class="mb-5 font-bold"><li>Advertising on Quordle.com</li></ul><div>The Quordle.com service is supported by advertising and, as more fully described <a href="#third-party-activities">below</a>, Quordle.com works with third parties to display advertising, including interest-based or behavioral advertising, on the Quordle.com service.</div><div><em>We participate in the IAB Transparency & Consent Framework and comply with its <a href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/">Specifications and Policies</a>.</em> The Quordle.com service is affiliated with CMI Marketing, Inc., d/b/a CafeMedia ("<strong>CafeMedia</strong>") for the purposes of placing advertising on Quordle.com, and CafeMedia will collect and use certain data for advertising purposes as more fully described in the <a href="https://cafemedia.com/wp-content/uploads/2021/02/2020-CAM-Service-Privacy-Statement-KJK-draft-3-10-2020.pdf">CAM Service Privacy Statement</a>. <em>CafeMedia\u2019s CMP is LiveRamp with the CMP identification number 3</em>. To learn more about CafeMedia\u2019s data usage and your related rights, click here: <a href="https://cafemedia.com/publisher-advertising-privacy-policy/#:~:text=To%20be%20clear%20we%20do,exchanges%2C%20and%20demand%20side%20platforms.">CafeMedia Advertising Privacy Statement</a>.</div><div>The Quordle.com service may also rely on third-party service providers to do things like: take user-level information, anonymize it through hashing (a hashed email address might look something like this: <strong>e820bb4aba5ad74c5a6ff1aca16641f6</strong>) and match it against other anonymized, people-based identifiers \u2013 doing this helps us serve you personalized, relevant advertisements. Specifically, when you use our ad-supported Quordle.com service, we may share information that we may collect from you, including your email (in hashed form), IP address or information about your browser or operating system, with our third-party service provider, LiveRamp Inc. and its group companies ('LiveRamp\u2019). LiveRamp may use our first party cookie on your browser to match your shared information to their marketing databases in order to provide back a pseudonymous privacy-centric identifier for our use in real time bidding in digital advertising. These third parties may in turn link further demographic or interest-based information to your browser. You have the choice to opt-out of the use of your data by third-party service providers for this purpose at any time. Please find more information about opting out <a href="#your-rights-choices-opt-out">below</a>.</div><div>Please note that limiting third-party cookies via your browser controls does not prevent our first-party cookies from being set in this way. Also, please know, if you opt-out of interest-based advertising <strong class="underline">you will continue to receive ads on our free, ad-supported Quordle.com service, but not behaviorally targeted ads</strong>. Also, if you opt-out of Quordle.com\u2019s practices, you may continue to receive interest-based advertising through other companies. If you erase your browser\u2019s cookies, you may need to perform this process again.</div><ul class="mb-5 font-bold"><li>Anonymous data</li></ul><div>Anonymous aggregated data may be provided to other companies we do business with for statistical purposes. For example, we may report to advertisers that a certain percentage of our site\u2019s visitors are adults between the ages of 25 and 35.</div><ul class="mb-5 font-bold"><li>Device identifiers</li></ul><div class="mb-5 italic">For our legitimate business interests, we process your device identifiers as described in this section.</div><div>When you use a mobile device like a tablet or cell phone to access our Quordle.com service, we may access and monitor one or more "device identifiers." Device identifiers are small data files associated with your mobile device that uniquely identify your mobile device. A device identifier may deliver information to us or a third party partner about how you browse and use the services and may help us or others provide reports or personalized ads. Some features of the services may not function properly if use or availability of device identifiers is impaired or disabled.</div><div id="third-party-activities" class="subheading">Third-party activities</div><div class="mb-5 italic">For our legitimate business interests, and with your consent where this is required, we may process data collected by us for advertising, including interest-based advertising, as described in this section.</div><div>As described above, in order to monetize our free, ad-supported Quordle.com service, we work with third-party advertisers and advertising networks that use cookies and other similar technologies to target ads served to our free, ad-supported Quordle.com service. Our Privacy Notice does not cover the use of data that you provide directly to advertisers or third-party partners; that usage is governed by the advertiser\u2019s or third party partner\u2019s privacy policy.</div><div>What does it mean to "serve ads"? When you visit a website, your Internet browser transmits a "request" to the computer that hosts the website (the "host server") requesting that server to send you (or "serve") the Web page that you are seeking. Most Web pages contain components that are pulled from different sources, for example, a Web page at a news site may get its weather section from one provider, its sports results from a different source, and advertisements from other servers. Our Web pages contain coding that directs your browser to fill the ad spaces on the Web pages with content served by advertisers and networks of advertisers to whom we have sold the ad spaces. The advertisers and networks use cookies and beacons to help manage ad delivery and frequency and to identify audience segment(s) for customized advertising ("targeting"). These cookies are used to identify your IP address, so that when you visit another website using the same advertising network, the network will recognize the cookie as one of its own, read the information on the cookie (the record of which sites in the network you have visited) and serve you an ad that you might be interested in, based on your past visits to other sites in the network. Advertising targeted based on past Web surfing is known as "behavioral advertising."</div><div>Quordle.com does not provide any personal information to third-party advertisers about visitors to the Quordle.com service. Our Privacy Notice does not cover the use of information that they may have collected from you by third parties on other sites. If you would like to learn more about behavioral advertising or to opt-out of having this information used by companies that are part of the Network Advertising Initiative to deliver targeted ads, please visit <a href="https://www.networkadvertising.org">https://www.networkadvertising.org/</a>. Many of the same companies are members of the Self-Regulatory Program for Online Behavioral Advertising. You can learn more and opt-out of receiving targeted ads from them at <a href="https://www.aboutads.info/choices">https://www.aboutads.info/choices</a>.</div><div>Some advertising networks require that we specifically list their opt-out links below. When you opt-out of a network, you may receive a "opt-out" cookie so that the network will know not to assign you new cookies in the future. <strong class="underline">You will continue to receive ads from that network, but not behaviorally targeted ads</strong>. If you erase your browser\u2019s cookies, you may need to perform this process again.</div><div id="your-rights-choices-opt-out" class="heading">Your Rights & Choices; Opt-Out Choices</div><div>We participate in the IAB Transparency &amp; Consent Framework and comply with its <a href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/">Specifications and Policies</a>. Our Consent Management Platform (CMP) is LiveRamp with the CMP identification number 3.</div><div>Our Cookie Policy above more fully describes the cookies, beacons and other similar technology used on the Quordle.com service and provides information on when and how Users can accept or reject them.</div><div>You can opt-out of being behaviorally targeted by Quordle.com (and other companies employing online advertising) via the following options:</div><ul><li><a href="http://www.aboutads.info/choices/">Digital Advertising Alliance</a></li><li><a href="http://www.youradchoices.ca/">Digital Advertising Alliance Canada</a></li><li><a href="http://www.youronlinechoices.eu/">European Digital Advertising Alliance</a></li><li><a href="http://www.networkadvertising.org/managing/opt_out.asp">Network Advertising Initiative</a></li></ul><div class="mb-5 font-bold">Please remember, if you opt-out of interest-based advertising you will continue to receive ads on our free, ad-supported Quordle.com service, but not behaviorally targeted ads. Also, if you opt-out of Quordle.com\u2019s practices, you may continue to receive interest-based advertising through other companies.</div><div class="subheading">Browser controls</div><div>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Quordle.com service. For more information about cookies, please visit <a href="http://www.allaboutcookies.org/">http://www.allaboutcookies.org/</a>. Please note that limiting third-party cookies via your browser controls does not prevent our first-party cookies from being set in this way.</div><ul><li>To manage or delete browser cookies, please see your browser\u2019s privacy settings.</li><li>To manage or delete Flash cookies, please use the Adobe Flash Player Settings Manager here:<a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html">http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html</a></li></ul><div class="subheading">Google Analytics</div><div>You can control the use of your personal data by Google Analytics by visiting the 'Your privacy controls\u2019 section of the Google Privacy Policy located at <a href="https://policies.google.com/privacy?hl=en-US#infochoices">https://policies.google.com/privacy?hl=en-US#infochoices</a>. You also can use the Google Analytics Opt-Out Browser Add-on to disable tracking by Google Analytics. To delete these cookies, please see your browser\u2019s privacy settings or follow the above instructions.</div><div class="subheading">LiveRamp</div><div>To opt out of LiveRamp\u2019s use of your personal data, please head here: https://liveramp.com/opt_out/.</div><div class="subheading">How we respond to "Do Not Track" signals</div><div>When you visit a website in any browser, you automatically share information with that website, such as your IP address, and other standard PC information. If the website contains content provided by a third-party website (for example a web measurement tools such as a web beacon or scripts), some information about you may be automatically sent to the content provider. This type of arrangement has several benefits, such as allowing you to access third-party content from the Quordle.com service conveniently. Some internet browsers or other tools include "Do Not Track" (DNT) features that, when turned on, send a signal to websites you visit indicating you do not wish to be tracked across websites over time. However, since no technology standard for DNT signals has been developed or adopted to date, the Quordle.com service does not currently respond to DNT signals.</div><div id="security-of-your-information" class="heading">Security of Your Information</div><div>Any personally identifiable information collected through this site is stored on limited-access servers. We will maintain safeguards to protect these servers and the information they store. In addition, to help protect the privacy of data and personally identifiable information you transmit through use of our Quordle.com service, we maintain physical, technical and administrative safeguards. We update and test our security technology on an ongoing basis. We strive to restrict access to your personal data to those employees who need to know that information to provide benefits or services to you.</div><div id="data-storage-and-retention" class="heading">Data Storage and Retention</div><div>Your personal data is stored by us in the AWS Cloud \u2013 U.S. (eastern) and Singapore regions. We retain your information for the duration of your relationship with us and as long as necessary to permit us to use it for the legitimate business purposes that we have communicated to you and comply with applicable law or regulations. For more information on where and how long your personal data is stored, and for more information on your rights of erasure and portability, please contact Quordle.com\u2019s data protection officer at <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div id="consent-to-process-and-transfer-of-information-about-you" class="heading">Consent to Processing and Transfer of Information about You</div><div>Quordle.com\u2019s headquarters are located in the United States. Information we collect from you will be processed in the United States and may be stored, transferred to, and processed in any country where we have facilities or in which we engage service providers. These countries may be outside your country of residence, including the United States, and may have different data protection laws than your country.</div><div>If you are located in the European Economic Area (EEA), Quordle.com collects and transfers personal data out of the EEA only: with your consent; to perform a contract with you; or to fulfill a compelling legitimate interest of Quordle.com in a manner that does not outweigh your rights and freedoms. Quordle.com endeavors to apply suitable safeguards to protect the privacy and security of your personal data and to use it only consistent with your relationship with us and the practices described in this Privacy Notice.</div><div id="correcting-updating-or-removing-personal-information-account-deletion" class="heading">Correcting, Updating, or Removing Personal Information; Account Deletion</div><div>Users may opt out of certain Quordle.com features or correct, update, or remove certain personal information that Quordle.com has collected about them through any of the means listed below. Please be sure to include the following information in your correspondence:</div><div>Your email address<br>Your first and last name<br>Your mailing address (street, city, state, zip code, and country)</div><div><strong>Email us at:</strong> <a href="mailto:dpo@quordle.com">dpo@quordle.com</a></div><div class="subheading">Account Deletion:</div><div>If you no longer wish to have a registered account, you may terminate your account by sending an email to<a href="mailto:dpo@quordle.com">dpo@quordle.com</a>. Because of the way we maintain the Quordle.com service, such deletion may not be immediate, and residual copies of your profile information or posts may remain on backup media for up to ninety (90) days.</div><div id="privacy-notice-for-california-residents" class="heading">Privacy Notice for California Residents</div><div>This Privacy Notice for California Residents supplements the information contained elsewhere in this Privacy Notice and applies solely to all visitors, users, and others who reside in the State of California ("consumers" or "you"). We adopt this notice to comply with the California Consumer Privacy Act of 2018 (CCPA) and any terms defined in the CCPA have the same meaning when used in this notice.</div><div class="subheading">Information We Collect</div><div>The Quordle.com service collects information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device ("personal information"). In particular, the Quordle.com service may collect the following categories of personal information from its consumers:</div><table class="table-auto mb-5"><thead><tr><th>Category</th><th>Collected</th></tr></thead><tbody><tr><td>A. Identifiers</td><td>YES</td></tr><tr><td>B. Personal information categories listed in the California Customer Records statute (Cal. Civ. Code \xA7 1798.80(e))</td><td>YES</td></tr><tr><td>C. Protected classification characteristics under California or federal law</td><td>NO</td></tr><tr><td>D. Commercial information.</td><td>YES</td></tr><tr><td>E. Biometric information.</td><td>NO</td></tr><tr><td>F. Internet or other similar network activity.</td><td>YES</td></tr><tr><td>H. Sensory data.</td><td>NO</td></tr><tr><td>I. Professional or employment-related information.</td><td>NO</td></tr><tr><td>J. Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)).</td><td>NO</td></tr><tr><td>K. Inferences drawn from other personal information.</td><td>YES</td></tr></tbody></table><div>Personal information does not include:</div><ul><li>Publicly available information from government records.</li><li>Deidentified or aggregated consumer information.</li><li>Information excluded from the CCPA\u2019s scope, like:<ul><li>health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical Information Act (CMIA) or clinical trial data;</li><li>personal information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver\u2019s Privacy.</li></ul></li></ul><div class="subheading">Use of Personal Information</div><div>We may use or disclose the personal information we collect for one or more of the following business purposes:</div><ul><li>To fulfill or meet the reason you provided the information. For example, if you share your name and contact information to ask a question about the Quordle.com service, we will use that personal information to respond to your inquiry. If you provide your personal information to purchase a product or service, we or our third-party service providers will use that information to process your payment and facilitate delivery. We may also save your information to facilitate new product or service orders and requests.</li><li>To provide, support, personalize, and develop the Quordle.com services, emails, and other products, services and platforms.</li><li>To create, maintain, customize, and secure your account with us.</li><li>To process your requests, purchases, transactions, and payments and prevent transactional fraud.</li><li>To provide you with support and to respond to your inquiries, including investigating and addressing your concerns and monitoring and improving our responses.</li><li>To personalize your emails or Quordle.com experience and to deliver content and product and service offerings relevant to your interests, including targeted offers and ads through the Quordle.com service, and other products, services and platforms.</li><li>To help maintain the safety, security, and integrity of the Quordle.com service and our apps, emails, and other products, services and platforms, databases and other technology assets, and business.</li><li>For testing, research, analysis, and product development, including to develop and improve the Quordle.com service and our apps, emails, and other products, services and platforms.</li><li>To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.</li><li>As described to you when collecting your personal information or as otherwise set forth in the CCPA.</li><li>To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of the Quordle.com assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by Quordle.com about our Users is among the assets transferred.</li></ul><div>Quordle.com will not collect additional categories of personal information or use the personal information we collected for materially different, unrelated, or incompatible purposes without providing you notice.</div><div class="subheading">Sharing Personal Information</div><div>Quordle.com may disclose your personal information to a third-party for a business purpose or sell your personal information, subject to your right to opt-out of those sales (see '<em>Sales of Personal Information</em>\u2019 below). When we disclose personal information for a business purpose, we enter a contract that describes the purpose and requires the recipient to both keep that personal information confidential and not use it for any purpose except performing the contract. The CCPA prohibits third parties who purchase the personal information we hold from reselling it unless you have received explicit notice and an opportunity to opt-out of further sales (see '<em>Sales of Personal Information</em>\u2019 below).</div><div>We may share your personal information with the following categories of third parties:</div><ul><li>Subsidiaries and affiliates.</li><li>Contractors and service providers.</li><li>Data aggregators.</li><li>Third parties with whom we partner to offer products and services to you.</li></ul><div class="subheading">Disclosures of Personal Information for a Business Purpose</div><div>In the preceding twelve (12) months, Quordle.com has not disclosed any categories of personal information collect through the Quordle.com service for a business purpose.</div><div class="subheading">Sales of Personal Information</div><div>In the preceding twelve (12) months, Quordle.com has not sold any of the categories of personal information collected through the Quordle.com service.</div><div>As of the Effective Date of this Privacy Notice, the Company and our advertising partners will collect the personal information identified in the table above (such as the cookies stored on your browser, the advertising identifier on your mobile device, or the IP address of your device) when you visit the Quordle.com or open our emails. We, and our partners, will use this information to tailor and deliver ads to you on the Quordle.com service, or to help tailor ads to you when you visit others\u2019 sites (or use others\u2019 apps). To tailor ads that may be more relevant to you, we and/or our partners may share the information we collect with third parties.</div><div>If you do not wish for us or our partners to sell your personal information to third parties for advertising purposes, click the "<strong>Do Not Sell My Info</strong>" link accessible from the Quordle.com service. Note that although we will not sell your personal information after you click that button, we will continue to share some personal information with our partners (who will function as our service providers in such instance) to help us perform advertising-related functions such as, but not limited to, measuring the effectiveness of our ads, managing how many times you may see an ad, reporting on the performance of our ads, ensuring the Quordle.com service is working correctly and securely, providing aggregate statistics and analytics, improving when and where you may see ads and/or reducing ad fraud. If you access the Quordle.com service from other devices or browsers, visit our "<strong>Do Not Sell My Info</strong>" link from those devices or browsers to ensure your choice applies to the data collected when you use those devices or browsers. Additionally, although clicking the "<strong>Do Not Sell My Info</strong>" link will opt you out of the sale of your personal information for advertising purposes, <span class="underline">it will not opt you out of the use of previously collected and sold personal information (except for personal information sold within 90 days prior to your exercising your right to opt out) or all interest-based advertising</span>. If you would like more information about how to opt out of interest-based advertising in desktop and mobile browsers on a particular device, please visit <a href="http://optout.aboutads.info/#/">http://optout.aboutads.info/#/</a> and<a href="http://optout.networkadvertising.org/">http://optout.networkadvertising.org/#</a>. You may download the AppChoices app at <a href="http://www.aboutads.info/appchoices">http://www.aboutads.info/appchoices</a> to opt out in connection with mobile apps, or use the platform controls on your mobile device to opt out.</div><div class="subheading">Your Rights and Choices</div><div>The CCPA provides consumers (California residents) with specific rights regarding their personal information. This section describes your CCPA rights and explains how to exercise those rights.</div><div class="subheading italic">Access to Specific Information and Data Portability Rights</div><div>You have the right to request that the Company disclose certain information to you about our collection and use of your personal information over the past 12 months. Once we receive and confirm your verifiable consumer request, we will disclose to you:</div><ul><li>The categories of personal information we collected about you.</li><li>The categories of sources for the personal information we collected about you.</li><li>Our business or commercial purpose for collecting or selling that personal information.</li><li>The categories of third parties with whom we share that personal information.</li><li>The specific pieces of personal information we collected about you (also called a data portability request).</li><li>If we disclosed your personal information for a business purpose, we will identify the personal information categories that each category of recipient obtained.</li></ul><div class="subheading">Deletion Request Rights</div><div>You have the right to request that the Company delete any of your personal information that we collected from you and retained, subject to certain exceptions. Once we receive and confirm your verifiable consumer request, we will delete (and direct our service providers to delete) your personal information from our records, unless an exception applies.</div><div>We may deny your deletion request if retaining the information is necessary for us or our service provider(s) to:</div><ol><li>Complete the transaction for which we collected the personal information, provide a good or service that you requested, take actions reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform our contract with you.</li><li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.</li><li>Debug products to identify and repair errors that impair existing intended functionality.</li><li>Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.</li><li>Comply with the California Electronic Communications Privacy Act (Cal. Penal Code \xA7 1546 et. seq.).</li><li>Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when the information\u2019s deletion may likely render impossible or seriously impair the research\u2019s achievement, if you previously provided informed consent.</li><li>Enable solely internal uses that are reasonably aligned with consumer expectations based on your relationship with us.</li><li>Comply with a legal obligation.</li><li>Make other internal and lawful uses of that information that are compatible with the context in which you provided it.</li></ol><div class="subheading italic">Exercising Access, Data Portability, and Deletion Rights</div><div>To exercise the access, data portability, and deletion rights described above, please submit a verifiable consumer request to us by emailing us at <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div>Only you, or a person registered with the California Secretary of State that you authorize to act on your behalf, may make a verifiable consumer request related to your personal information. You may also make a verifiable consumer request on behalf of your minor child.</div><div>You may only make a verifiable consumer request for access or data portability twice within a 12-month period. The verifiable consumer request must:</div><ul><li>Provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal information or an authorized representative.</li><li>Describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.</li></ul><div>We cannot respond to your request or provide you with personal information if we cannot verify your identity or authority to make the request and confirm the personal information relates to you.</div><div>Making a verifiable consumer request does not require you to create an account with us.</div><div>We will only use personal information provided in a verifiable consumer request to verify the requestor\u2019s identity or authority to make the request.</div><div class="subheading italic">Response Timing and Format</div><div>We endeavor to respond to a verifiable consumer request within forty-five (45) days of its receipt. If we require more time, we will inform you of the reason and extension period in writing in accordance with CCPA requirements.</div><div>If you have an account with us, we will deliver our written response to that account. If you do not have an account with us, we will deliver our written response by mail or electronically, at your option.</div><div>Any disclosures we provide will only cover the 12-month period preceding the verifiable consumer request\u2019s receipt. The response we provide will also explain the reasons we cannot comply with a request, if applicable. For data portability requests, we will select a format to provide your personal information that is readily useable and should allow you to transmit the information from one entity to another entity without hindrance.</div><div>We do not charge a fee to process or respond to your verifiable consumer request unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will tell you why we made that decision and provide you with a cost estimate before completing your request.</div><div class="subheading">Personal Information Sales Opt-Out and Opt-In Rights</div><div>If you are 16 years of age or older, you have the right to direct us to not sell your personal information at any time (the "right to opt-out"). We do not sell the personal information of consumers we actually know are less than 16 years of age, unless we receive affirmative authorization (the "right to opt-in") from either the consumer who is between 13 and 16 years of age, or the parent or guardian of a consumer less than 13 years of age. Consumers who opt-in to personal information sales may opt-out of future sales at any time.</div><div>To exercise the right to opt-out, you (or your authorized representative) may submit a request to us by emailing<a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div>Once you make an opt-out request, we will wait at least twelve (12) months before asking you to reauthorize personal information sales. However, you may change your mind and opt back in to personal information sales at any time by clearing cookies from your browser or emailing <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div>You do not need to create an account with us to exercise your opt-out rights. We will only use personal information provided in an opt-out request to review and comply with the request.</div><div class="subheading">Non-Discrimination</div><div>We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by the CCPA, we will not:</div><ul><li>Deny you goods or services.</li><li>Charge you different prices or rates for like-goods or services, including through granting discounts or other benefits, or imposing penalties.</li><li>Provide you a different level or quality of like-goods or services.</li><li>Suggest that you may receive a different price or rate for like-goods or services or a different level or quality of like-goods or services.</li></ul><div>However, we may offer you certain financial incentives permitted by the CCPA that can result in different prices, rates, or quality levels. Any CCPA-permitted financial incentive we offer will reasonably relate to your Personal Information\u2019s value and contain written terms that describe the program\u2019s material aspects. Participation in a financial incentive program requires your prior opt in consent, which you may revoke at any time. We currently provide the following financial incentives:</div><div>COMING SOON</div><div class="subheading">Other California Privacy Rights</div><div>California\u2019s "Shine the Light" law (Civil Code Section \xA7 1798.83) permits Users of our websites, mobile applications, and other products, services and platforms that are California residents to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make such a request, please send an email to <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div class="subheading">Changes to Our Privacy Notice</div><div>Quordle.com reserves the right to amend this privacy notice at our discretion and at any time. When we make changes to this privacy notice, we will post the updated notice on our website at Quordle.com and update the notice\u2019s effective date. <strong>Your continued use of the Quordle.com service following the posting of changes constitutes your acceptance of such changes.</strong></div><div class="subheading">Contact Information</div><div>If you have any questions or comments about this notice, the ways in which Quordle.com collects and uses your information described herein, your choices and rights regarding such use, or wish to exercise your rights under California law, please do not hesitate to contact us at:</div><table><tbody><tr><td> Website:</td><td><a href="https://www.quordle.com">www.quordle.com</a></td></tr><tr><td>Email:</td><td><a href="mailto:dpo@quordle.com">dpo@quordle.com</a></td></tr></tbody></table><div id="eu-data-subject-rights" class="heading">EU Data Subject Rights</div><div>The EU and UK General Data Protection Regulations (GDPR) and other countries\u2019 privacy laws provide certain rights for data subjects. A good explanation of them (in English) is available on the website of the United Kingdom\u2019s <a href="https://ico.org.uk/for-organisations/data-protection-reform/overview-of-the-gdpr/individuals-rights/the-right-to-be-informed/">Information Commissioner\u2019s Office</a>.</div><div>If you wish to confirm that the Quordle.com service is processing your personal data, or to have access to the personal data that Quordle.com may have about you, please contact us at <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div><div id="eu-representative-and-data-protection-officer" class="heading">Data Protection Officer</div><div>Quordle.com is headquartered in the United States. Quordle.com has appointed a data protection officer for you to contact at <a href="mailto:dpo@quordle.com">dpo@quordle.com</a> if you have any questions or concerns about Quordle.com\u2019s personal data policies or practices.</div><div id="copyright" class="heading">Copyright</div><div>All of the content on the Quordle.com service is copyrighted, and it cannot be redistributed or used for commercial purposes.</div><div id="business-transfers" class="heading">Business Transfers</div><div>As we continue to develop our business, we might sell or buy subsidiaries, or business units. In such transactions, customer information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice or Policy (unless, of course, the customer consents otherwise). Also, in the unlikely event that Quordle.com, or substantially all of its assets are acquired, customer information will be one of the transferred assets, and will remain subject to our Privacy Notice.</div><div id="acceptance-of-privacy-notice-terms-and-conditions" class="heading">Acceptance of Privacy Notice Terms and Conditions</div><div>By using Quordle.com, you signify your agreement to the terms and conditions of this Quordle.com Privacy Notice. If you do not agree to these terms, please do not use this site. We reserve the right, at our sole discretion, to change, modify, add, or remove portions of this policy at any time. All amended terms automatically take effect 30 days after they are initially posted on the site. Please check this page periodically for any modifications. Your continued use of the Quordle.com service following the posting of any changes to these terms shall mean that you have accepted those changes.</div><div id="questions-comments-or-complaints" class="heading">Questions, Comments or Complaints</div><div>If you have questions about Quordle.com, please email us at <a href="mailto:help@quordle.com">help@quordle.com</a>. To correct, update, or remove personally identifiable information, please email us at <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>. If you have any questions or concerns, please send an email to <a href="mailto:dpo@quordle.com">dpo@quordle.com</a>.</div></div></div>`,
    ),
    vR = () => [
      y(ys, {}),
      (() => {
        const e = mR.cloneNode(!0),
          t = e.firstChild,
          r = t.firstChild,
          n = r.nextSibling,
          o = n.nextSibling,
          i = o.nextSibling,
          a = i.firstChild,
          s = a.nextSibling
        s.nextSibling
        const S = t.nextSibling,
          l = S.nextSibling,
          E = l.nextSibling,
          A = E.nextSibling,
          c = A.nextSibling,
          u = c.nextSibling,
          T = u.firstChild,
          f = T.nextSibling,
          I = f.nextSibling,
          R = I.nextSibling,
          m = R.nextSibling,
          N = m.nextSibling,
          v = N.nextSibling,
          g = v.nextSibling,
          O = g.nextSibling,
          D = O.nextSibling,
          h = D.nextSibling,
          L = h.nextSibling,
          M = L.nextSibling,
          F = M.nextSibling,
          H = F.nextSibling,
          J = H.nextSibling,
          j = J.nextSibling,
          Y = j.nextSibling,
          Se = Y.nextSibling,
          Oe = Se.nextSibling,
          ue = Oe.nextSibling,
          ye = ue.nextSibling,
          be = ye.nextSibling,
          x = be.nextSibling,
          z = x.nextSibling,
          q = z.nextSibling,
          Ee = q.nextSibling,
          Z = Ee.nextSibling,
          re = Z.firstChild,
          C = re.nextSibling
        return (
          C.nextSibling,
          d(t, y(ge, { href: '/terms', children: 'Terms of Use' }), n),
          d(i, y(ge, { href: '/terms', children: 'TERMS OF USE' }), s),
          d(i, y(ge, { href: '/terms', children: 'TERMS OF USE' }), null),
          d(Z, y(ge, { href: '/terms', children: 'Terms of Use' }), C),
          e
        )
      })(),
    ],
    NR = P(
      `<div id="legal-page" class="max-w-[550px] m-auto overflow-hidden px-4"><div class="text-2xl font-bold mt-5 text-center">QUORDLE.COM</div><div class="text-2xl font-bold text-center">Website Terms of Use</div><div class="text-center mb-5">Effective Date: August 17, 2022</div><div class="legalese"><div>These Website Terms of Use ("Terms of Use") govern your use of Quordle.com and, unless other terms and conditions expressly govern, any other services provided or made available by Quordle.com, including mobile application services (collectively, the "Services").</div><div class="font-bold">THESE TERMS OF USE CONTAIN <a href="#disclaimer-of-warranties">DISCLAIMERS OF WARRANTIES</a> AND <a href="#limitation-of-liability">LIABILITY</a>, A <a href="#governing-law">CHOICE OF LAW CLAUSE</a>, AND A <a href="#class-action-waiver">CLASS ACTION WAIVER</a>. THESE PROVISIONS AFFECT YOUR RIGHTS ABOUT HOW TO RESOLVE ANY DISPUTE WITH QUORDLE.COM. PLEASE READ THEM CAREFULLY BEFORE USING THE SERVICES.</div><div>For information on how Quordle.com collects, uses and shares any personal information, please see our <!>. If you reside outside of the European Economic Area, your acceptance of these Terms of Service constitutes your consent to the processing activities q</div><div class="subheading text-center">SECTION 1<br>Agreement to Terms of Use</div><div>Your use of the Services constitutes your agreement to these Terms of Use. If you do not agree with these Terms of Use, please do not use the Services. Quordle.com reserves the right to change, modify, add, or remove portions of these Terms of Use at any time, and the modified Terms of Use will be effective when posted on the Services. Please check this page periodically for any modifications. Your use of any of the Services following the posting of changes constitutes your acceptance of the changes.</div><div><strong>Ownership</strong>. The content on the Services is the property of Quordle.com, its affiliated companies or licensors, and is protected by international copyright, patent, and trademark laws. All materials published or available on the Services (including, but not limited to text, photographs, images, illustrations, designs, audio clips, video clips, "look and feel," metadata, data, or compilations, all also known as the "<strong>Content</strong>") are protected by copyright, and owned or controlled by Quordle.com, its affiliated companies or licensors, or the party credited as the provider of the Content. Quordle.com also owns copyright in the selection, coordination, compilation, and enhancement of such Content ("<strong>Arrangement</strong>"). You shall abide by all additional copyright notices, information, or restrictions contained in any Content accessed through the Services.</div><div><strong>Advertising</strong>. Advertisements, promotions, and marketing messages may appear on the Services from time to time. Please see our <!> for more information.</div><div><strong>Use of Content</strong>. You may display, reproduce, print or download content on the Services only for your personal, non-commercial use. In each case, however, you may not remove or alter any copyright, trademark, service mark or other proprietary notices or legends. You may not publish, distribute, retransmit, sell or provide access to the content on the Services, except as permitted under applicable law or as described in these Terms of Use. Quordle.com works to ensure that all the content on its Services complies with applicable U.S. copyright laws. You may not use data mining, robots, screen scraping, or similar data gathering and extraction tools on the Services, except with our express written permission. You may not decompile, reverse engineer or disassemble any software or other products or processes accessible through the Services, insert any code or product, or manipulate the content of the Services in any way that affects a user's experience.</div><div><strong>Mobile Application Services</strong>. If available, you may download certain Quordle.com mobile applications from either Quordle.com or third-party app stores. All of these Terms of Use, including our <!>, apply to the maximum extent relevant to your use of Quordle.com\u2019s mobile applications. If applicable, prices for our mobile applications may change at any time, and we do not provide price protection or refunds in the event of a price reduction or promotional offering.</div><div><strong>Use of your Data</strong>. Please see our <!> for details about how we use and process the data we collect from our Services.</div><div id="disclaimer-of-warranties" class="font-bold">Disclaimer of Warranties. THE SERVICES AND ALL INFORMATION, PRODUCTS, AND OTHER CONTENT INCLUDED IN OR ACCESSIBLE FROM THE SERVICES ARE PROVIDED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND (EXPRESS, IMPLIED, AND STATUTORY, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE), ALL OF WHICH QUORDLE.COM EXPRESSLY DISCLAIMS TO THE FULLEST EXTENT PERMITTED BY LAW.</div><div id="limitation-of-liability" class="font-bold">Limitation of Liability. IN NO EVENT SHALL QUORDLE.COM, ITS DIRECTORS, OFFICERS, SHAREHOLDERS, PARENTS, SUBSIDIARIES, AFFILIATES, AGENTS AND LICENSORS, OR CONTENT PROVIDERS BE LIABLE: (i) FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THE USE, INABILITY TO USE, PERFORMANCE OR NONPERFORMANCE OF THE SERVICES, EVEN IF QUORDLE.COM WAS PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF WHETHER SUCH DAMAGES ARISE IN CONTRACT, TORT, UNDER STATUTE, IN EQUITY, AT LAW, OR OTHERWISE; AND (ii) FOR ANY DAMAGES, LOSSES AND/OR CAUSES OF ACTION EXCEEDING ONE THOUSAND U.S. DOLLARS (US $1,000) IN THE AGGREGATE.</div><div class="font-bold">SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OF THE ABOVE LIMITATIONS AND EXCLUSIONS MAY NOT APPLY TO YOU.</div><div><strong>Indemnification</strong>. To the fullest extent permitted by law, you agree to indemnify and hold Quordle.com, its directors, officers, shareholders, parents, subsidiaries, affiliates, agents, and licensors harmless from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, arising out of (i) your use or unauthorized copying of the Services or any of their content; or (ii) your violation of these Terms of Use or any applicable laws or regulations.</div><div id="governing-law"><strong>Governing Law</strong>. You agree that all matters relating to your access to or use of the Services and these Terms of Use, including all disputes, will be governed by the laws of the United States and the State of Delaware, without giving effect to any principles of conflicts of laws, including the United Nations Convention on Contracts for the International Sale of Goods.</div><div id="class-action-waiver"><strong>Class Action Waiver. YOU AND QUORDLE.COM AGREE THAT EACH PARTY MAY BRING DISPUTES AGAINST THE OTHER PARTY ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING, INCLUDING, WITHOUT LIMITATION, A FEDERAL OR STATE CLASS ACTION LAWSUIT. NEITHER YOU NOR QUORDLE.COM WILL SEEK TO HAVE ANY DISPUTE HEARD AS A CLASS ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR IN ANY OTHER PROCEEDING IN WHICH EITHER PARTY ACTS OR PROPOSES TO ACT IN A REPRESENTATIVE CAPACITY.</strong>Nothing in this paragraph limits your right or Quordle.com\u2019s right to bring a lawsuit against each other as an individual plaintiff.</div><div><strong>Claims or Disputes Must be Filed within One Year</strong>. To the extent permitted by law, any claim or dispute arising out of or related to use of the Services or these Terms of Use must be filed within one year after such claim or dispute arose. The one-year period begins when the notice of such claim or dispute first could be filed. If such a claim or dispute is not filed within one year, it shall be permanently barred. Any claim by you that may arise in connection with these Terms of Use will be compensable by monetary damages and you will in no event be entitled to injunctive or other equitable relief.</div><div><strong>Opting Out of Pop Under Ads</strong>. Some of our pop-under ads are not detected by Safari and other browsers. To opt out of pop-under ads please see your browser\u2019s privacy settings.</div><div><strong>Severability</strong>. If any provision of these Terms of Use shall be unlawful, void or for any reason unenforceable, then that provision shall be deemed severable from these Terms of Use and shall not affect the validity and enforceability of any remaining provisions.</div><div><strong>Survival</strong>. The provisions of these Terms of Use which by their nature should survive the termination of these Terms of Use shall survive such termination.</div><div><strong>Waiver</strong>. No waiver of any provision of these Terms of Use shall be deemed a further or continuing waiver of such provision or any other provision, and your or our failure to assert any right or provision under these Terms of Use shall not constitute a waiver of such right or provision.</div><div><strong>Entire Agreement</strong>. These Terms of Use constitute the entire agreement between Quordle.com and you, superseding any prior or contemporaneous communications and proposals (whether oral, written or electronic).</div><div class="subheading text-center">SECTION 2<br>COPYRIGHT INFRINGEMENT CLAIMS</div><div>If you believe that any copyright infringement exists on the Services, please use the following process to notify Quordle.com. We will act expeditiously to remove infringing material once informed. Please direct all claims of copyright infringement with respect to Content that is contained on the Services to<a href="mailto:copyrights@quordle.com">copyrights@quordle.com</a>. (Please direct all general questions to <a href="mailto:help@quordle.com">help@quordle.com</a>.)</div><div>In addition, if you believe that your work has been copied in a way that constitutes copyright infringement, please provide us the following information in writing to <a href="mailto:copyrights@quordle.com">copyrights@quordle.com</a> (see 17 U.S.C. \xA7 512(c)(3) for further detail). Please be advised that to be effective, the Notice must include ALL of the following information:</div><ol><li>Your physical or electronic signature (as either the owner of an exclusive right that is allegedly infringed or as a person authorized to act on behalf of such owner).</li><li>Identification of the copyrighted work claimed to have been infringed or, if multiple copyrighted works at a single online site are covered by a single claim, a representative list of such works at that online site.</li><li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit Quordle.com to locate the material.</li><li>Information reasonably sufficient to permit Quordle.com to contact you, such as an address, telephone number and, if available, an electronic mail address.</li><li>A statement that you believe in good faith that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law.</li><li>A statement that the information in the notice is accurate and that, under penalty of perjury, you are the owner of an exclusive right that is allegedly infringed or are authorized to act on behalf of such owner.</li></ol></div></div>`,
    ),
    gR = () => [
      y(ys, {}),
      (() => {
        const e = NR.cloneNode(!0),
          t = e.firstChild,
          r = t.nextSibling,
          n = r.nextSibling,
          o = n.nextSibling,
          i = o.firstChild,
          a = i.nextSibling,
          s = a.nextSibling,
          S = s.firstChild,
          l = S.nextSibling
        l.nextSibling
        const E = s.nextSibling,
          A = E.nextSibling,
          c = A.nextSibling,
          u = c.nextSibling,
          T = u.firstChild,
          f = T.nextSibling,
          I = f.nextSibling
        I.nextSibling
        const R = u.nextSibling,
          m = R.nextSibling,
          N = m.firstChild,
          v = N.nextSibling,
          g = v.nextSibling
        g.nextSibling
        const O = m.nextSibling,
          D = O.firstChild,
          h = D.nextSibling,
          L = h.nextSibling
        return (
          L.nextSibling,
          d(s, y(ge, { href: '/privacy', children: 'Website Privacy Notice' }), l),
          d(u, y(ge, { href: '/privacy', children: 'Website Privacy Notice' }), I),
          d(m, y(ge, { href: '/privacy', children: 'Website Privacy Notice' }), g),
          d(O, y(ge, { href: '/privacy', children: 'Website Privacy Notice' }), L),
          e
        )
      })(),
    ],
    yR = () => {
      const e = b(() => st(to)),
        t = b(() => st(eo))
      return (
        le(() => {
          var n
          const r = document.querySelector('meta[name=theme-color]')
          ;(n = e()) != null && n[0].darkMode
            ? (document.documentElement.classList.add('dark'),
              r == null || r.setAttribute('content', '#111827'))
            : (document.documentElement.classList.remove('dark'),
              r == null || r.setAttribute('content', '#cbd5e1'))
        }),
        e() && t()
          ? y(Pl, {
              get children() {
                return [
                  y(wt, {
                    path: '/',
                    get element() {
                      return y(Ti, { mode: 'daily' })
                    },
                  }),
                  y(wt, {
                    path: '/practice',
                    get element() {
                      return y(Ti, { mode: 'free' })
                    },
                  }),
                  y(wt, {
                    path: '/privacy',
                    get element() {
                      return y(vR, {})
                    },
                  }),
                  y(wt, {
                    path: '/terms',
                    get element() {
                      return y(gR, {})
                    },
                  }),
                  y(wt, {
                    path: '/*all',
                    get element() {
                      return y(IR, {})
                    },
                  }),
                ]
              },
            })
          : null
      )
    }
  if ('serviceWorker' in navigator) {
    const e = Gl({
      onNeedRefresh() {
        e(!0)
      },
    })
  }
  nl(
    () =>
      y(Ul, {
        get source() {
          return ul()
        },
        get children() {
          return y(FA, {
            get children() {
              return y(ud, {
                get children() {
                  return y(yR, {})
                },
              })
            },
          })
        },
      }),
    document.getElementById('root'),
  )
})
export default CR()
//# sourceMappingURL=index.4ea3c566.js.map
