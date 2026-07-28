const {
  useState,
  useEffect
} = React;
const CFG = window.SWAPON_CONFIG || {};

// ---- palette / shared styles (from the SwapOn design spec) ----
const C = {
  bg: '#05070C',
  purple: '#AE9FFF',
  purple2: '#8E7CFF',
  mauve: '#CDBFFF',
  blue: '#5CC8FF',
  blue2: '#2E7BFF',
  green: '#3AD68E',
  gold: '#E8C77A',
  red: '#FF6B85',
  text: '#E8EAF2',
  sub: '#8A93A8',
  dim: '#59617A'
};
const mono = "'IBM Plex Mono',monospace";
const frameStyle = {
  width: 392,
  height: 812,
  background: '#0a0c12',
  borderRadius: 46,
  padding: 11,
  boxShadow: '0 40px 90px rgba(0,0,0,0.6),0 0 0 2px #1a1f2b,inset 0 0 0 2px #000'
};
const screenStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: '#090D14',
  borderRadius: 36,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};
const label = {
  fontSize: 12,
  fontWeight: 700,
  color: C.sub,
  letterSpacing: '0.02em',
  margin: '0 2px 9px'
};
const Logo = ({
  size = 40,
  round = false
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 256 256",
  width: size,
  height: size,
  style: {
    display: 'block'
  }
}, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
  id: "lbg",
  x1: "0",
  y1: "0",
  x2: "1",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0",
  stopColor: "#0E1526"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "1",
  stopColor: "#070A12"
})), /*#__PURE__*/React.createElement("linearGradient", {
  id: "larr",
  x1: "0",
  y1: "0",
  x2: "1",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0",
  stopColor: "#C6B8FF"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "1",
  stopColor: "#8E7CFF"
})), /*#__PURE__*/React.createElement("linearGradient", {
  id: "lorb",
  x1: "0",
  y1: "0",
  x2: "1",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0",
  stopColor: "#5CC8FF"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "1",
  stopColor: "#2E5BFF"
}))), /*#__PURE__*/React.createElement("rect", {
  x: "0",
  y: "0",
  width: "256",
  height: "256",
  rx: round ? 128 : 58,
  fill: "url(#lbg)"
}), /*#__PURE__*/React.createElement("rect", {
  x: "1",
  y: "1",
  width: "254",
  height: "254",
  rx: round ? 128 : 57,
  fill: "none",
  stroke: "rgba(174,159,255,0.18)",
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M128 44 A84 84 0 0 1 210 110",
  fill: "none",
  stroke: "url(#larr)",
  strokeWidth: "17",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M206 78 L214 116 L176 108 Z",
  fill: "#8E7CFF"
}), /*#__PURE__*/React.createElement("path", {
  d: "M128 212 A84 84 0 0 1 46 146",
  fill: "none",
  stroke: "url(#larr)",
  strokeWidth: "17",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M50 178 L42 140 L80 148 Z",
  fill: "#C6B8FF"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "128",
  cy: "128",
  r: "50",
  fill: "url(#lorb)"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "128",
  cy: "128",
  r: "50",
  fill: "none",
  stroke: "rgba(255,255,255,0.18)",
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "128",
  cy: "132",
  r: "34",
  fill: "#0A0F1C"
}), /*#__PURE__*/React.createElement("path", {
  d: "M110 120 A26 26 0 1 0 146 120",
  fill: "none",
  stroke: "#EAF3FF",
  strokeWidth: "9",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M128 108 L128 132",
  fill: "none",
  stroke: "#EAF3FF",
  strokeWidth: "9",
  strokeLinecap: "round"
}));
const Toggle = ({
  on,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  style: {
    width: 42,
    height: 24,
    borderRadius: 13,
    cursor: 'pointer',
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: 2.5,
    justifyContent: on ? 'flex-end' : 'flex-start',
    background: on ? 'linear-gradient(120deg,#AE9FFF,#8E7CFF)' : 'rgba(255,255,255,0.10)',
    border: on ? 'none' : '1px solid rgba(255,255,255,0.08)'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 19,
    height: 19,
    borderRadius: '50%',
    background: on ? '#fff' : '#8A93A8',
    display: 'block'
  }
}));
const StatusBar = () => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '13px 26px 6px',
    fontSize: 14,
    fontWeight: 600
  }
}, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 7,
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12
  }
}, "📶"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12
  }
}, "📡"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: mono,
    fontSize: 12
  }
}, "84%")));
const Seg = ({
  options,
  value,
  onChange
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 13,
    padding: 4,
    gap: 4,
    marginBottom: 12
  }
}, options.map(o => {
  const a = o.v === value;
  const accent = o.accent;
  return /*#__PURE__*/React.createElement("div", {
    key: o.v,
    onClick: () => onChange(o.v),
    style: {
      flex: 1,
      minHeight: 42,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      textAlign: 'center',
      padding: 4,
      borderRadius: 10,
      fontSize: 12,
      cursor: 'pointer',
      lineHeight: 1.2,
      fontWeight: a ? 700 : 600,
      color: a ? accent === 'gold' ? C.gold : accent === 'blue' ? '#8FC0FF' : C.mauve : accent === 'gold' ? C.gold : C.sub,
      background: a ? accent === 'gold' ? 'rgba(232,193,90,0.15)' : accent === 'blue' ? 'rgba(45,120,255,0.20)' : 'rgba(174,159,255,0.20)' : accent === 'gold' ? 'rgba(232,193,90,0.07)' : 'transparent',
      border: a ? accent === 'gold' ? '1px solid rgba(232,193,90,0.4)' : accent === 'blue' ? '1px solid rgba(45,120,255,0.38)' : '1px solid rgba(174,159,255,0.35)' : accent === 'gold' ? '1px solid rgba(232,193,90,0.32)' : '1px solid transparent'
    }
  }, o.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10
    }
  }, o.icon), o.label);
}));
const Nav = ({
  tab,
  setTab
}) => {
  const items = [['home', 'Главная'], ['face', 'Замена лица'], ['voice', 'Замена голоса'], ['set', 'Настройки']];
  const ic = {
    home: 'M3 10.5L12 3l9 7.5 M5 9.5V20h14V9.5',
    set: '',
    face: '',
    voice: ''
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      padding: '12px 14px 22px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(9,13,20,0.9)'
    }
  }, items.map(([k, lab]) => {
    const a = tab === k;
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      onClick: () => setTab(k),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: a ? C.purple : '#5E677E'
      }
    }, NavIcon(k)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: a ? 700 : 600,
        color: a ? C.purple : '#5E677E',
        whiteSpace: 'nowrap'
      }
    }, lab));
  }));
};
function NavIcon(k) {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  if (k === 'home') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "21",
    height: "21",
    ...p
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 10.5L12 3l9 7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 9.5V20h14V9.5"
  }));
  if (k === 'set') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "21",
    height: "21",
    ...p
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"
  }));
  if (k === 'face') return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "21",
    height: "21",
    ...p
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.3",
    cy: "10.5",
    r: "0.4",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14.7",
    cy: "10.5",
    r: "0.4",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 14.5a4 4 0 0 0 6 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.5 9A9.5 9.5 0 0 1 6 4.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21.5 15A9.5 9.5 0 0 1 18 19.8"
  }));
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "21",
    height: "21",
    ...p
  }, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.5",
    width: "6",
    height: "11",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 11a6 6 0 0 0 12 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17v3.5"
  }));
}

// ---------------- screens ----------------
function Home({
  state,
  set,
  openStore
}) {
  const {
    on,
    front,
    back,
    vsrc,
    asrc,
    balance
  } = state;
  // billing v2: активная ставка = камера(+голос), фон = 0.05
  const camRate = vsrc === 'face' ? state.faceMode === 'pro' ? 2 : 1 : vsrc === 'stream' ? 0.3 : 0.1;
  const voiceRate = asrc === 'voice' ? 0.6 : 0;
  const activeRate = camRate + voiceRate;
  const fmt = min => {
    if (!isFinite(min)) return '∞';
    const h = Math.floor(min / 60),
      m = Math.round(min % 60);
    return h > 0 ? `${h} ч ${m} мин` : `${m} мин`;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    className: "scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 18px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 4px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 38
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 21,
      fontWeight: 800,
      letterSpacing: '-0.01em'
    }
  }, "SwapOn"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'rgba(174,159,255,0.12)',
      border: '1px solid rgba(174,159,255,0.30)',
      padding: '4px 4px 4px 11px',
      borderRadius: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.mauve,
      fontFamily: mono
    }
  }, balance, " Swaps"), /*#__PURE__*/React.createElement("button", {
    onClick: openStore,
    style: {
      width: 24,
      height: 24,
      border: 'none',
      borderRadius: '50%',
      background: 'linear-gradient(120deg,#AE9FFF,#8E7CFF)',
      color: '#0A0713',
      fontSize: 16,
      fontWeight: 800,
      cursor: 'pointer'
    }
  }, "+"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(150deg,rgba(174,159,255,0.14),rgba(45,120,255,0.06))',
      border: '1px solid rgba(174,159,255,0.26)',
      borderRadius: 18,
      padding: '17px 18px',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => set({
      on: !on
    }),
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      flex: 'none',
      cursor: 'pointer',
      border: `2px solid ${on ? 'rgba(58,214,142,0.55)' : 'rgba(255,255,255,0.2)'}`,
      background: on ? 'radial-gradient(circle at 50% 40%,rgba(58,214,142,0.28),rgba(58,214,142,0.06))' : 'rgba(255,255,255,0.04)',
      color: on ? C.green : C.sub,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: on ? '0 0 22px rgba(58,214,142,0.35)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "28",
    height: "28",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.3 6.6a8 8 0 1 0 11.4 0"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: '0.04em',
      color: on ? C.green : C.gold
    }
  }, on ? 'ON' : 'OFF'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#9AA3B8',
      marginTop: 2
    }
  }, on ? 'Нажмите, чтобы выключить' : 'Нажмите, чтобы включить'), on && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#7E8AA0',
      marginTop: 7,
      lineHeight: 1.5
    }
  }, "≈ ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#CDBFFF'
    }
  }, fmt(balance / activeRate)), " активной замены (", activeRate, " Swaps/мин)", /*#__PURE__*/React.createElement("br", null), "или ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#8FC0FF'
    }
  }, fmt(balance / 0.05)), " в фоне (0.05 Swaps/мин)"))), /*#__PURE__*/React.createElement("div", {
    style: label
  }, "ВЫБЕРИ КАМЕРУ ДЛЯ ЗАМЕНЫ ИЗОБРАЖЕНИЯ"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 11,
      marginBottom: 14
    }
  }, [['front', 'Фронтальная', front], ['back', 'Основная', back]].map(([k, t, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      background: v ? 'rgba(45,120,255,0.09)' : 'rgba(255,255,255,0.035)',
      border: `1px solid ${v ? 'rgba(45,120,255,0.28)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: 16,
      padding: '15px 15px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      background: v ? 'rgba(45,120,255,0.18)' : 'rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: v ? '#5CC8FF' : '#8A93A8',
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3.2"
  }))), /*#__PURE__*/React.createElement(Toggle, {
    on: v,
    onClick: () => set({
      [k]: !v
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      marginTop: 11,
      color: v ? C.text : '#C4CBDC'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: label
  }, "ОТКУДА БРАТЬ ВИДЕО"), /*#__PURE__*/React.createElement(Seg, {
    value: vsrc,
    onChange: v => set({
      vsrc: v
    }),
    options: [{
      v: 'local',
      label: 'Локальное видео'
    }, {
      v: 'stream',
      label: 'Трансляция',
      accent: 'blue'
    }, {
      v: 'face',
      label: 'Замена лица',
      icon: '✦',
      accent: 'gold'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: label
  }, "ОТКУДА БЕРЕМ ЗВУК"), /*#__PURE__*/React.createElement(Seg, {
    value: asrc,
    onChange: v => set({
      asrc: v
    }),
    options: [{
      v: 'stream',
      label: 'Звук из видео'
    }, {
      v: 'mic',
      label: 'Микрофон телефона'
    }, {
      v: 'voice',
      label: 'Замена голоса',
      icon: '✦',
      accent: 'gold'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      marginTop: 20
    }
  }, "ПРОФИЛЬ"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 14,
      padding: '11px 13px',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#229ED9,#5CC8FF)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 800,
      color: '#fff'
    }
  }, (state.username || 'A')[0].toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700
    }
  }, "@", state.username || 'aleksandr_k'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#6E7A90',
      fontFamily: mono
    }
  }, "ID ", state.tgId || '784120593')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.purple
    }
  }, "Профиль ›")), /*#__PURE__*/React.createElement("a", {
    href: `https://t.me/${CFG.botUsername || 'swap_on_bot'}`,
    target: "_blank",
    style: {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      width: '100%',
      border: '1px solid rgba(34,158,217,0.4)',
      background: 'rgba(34,158,217,0.12)',
      color: '#5CC8FF',
      fontSize: 13.5,
      fontWeight: 700,
      padding: 13,
      borderRadius: 13,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: C.green,
      boxShadow: '0 0 8px #3AD68E'
    }
  }), "Авторизован в Telegram-боте")));
}
function Face({
  state,
  set
}) {
  const m = state.faceMode;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    className: "scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 18px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 800,
      padding: '10px 2px 18px'
    }
  }, "Замена лица"), /*#__PURE__*/React.createElement("div", {
    style: label
  }, "КАЧЕСТВО"), [['lite', 'LITE', 'Быстро, экономно · 1 Swaps/мин'], ['pro', 'PRO', 'Максимум качества · 2 Swaps/мин']].map(([k, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => set({
      faceMode: k
    }),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10,
      cursor: 'pointer',
      borderRadius: 14,
      padding: '12px 14px',
      background: m === k ? 'linear-gradient(150deg,rgba(174,159,255,0.16),rgba(45,120,255,0.06))' : 'rgba(255,255,255,0.035)',
      border: `1.5px solid ${m === k ? 'rgba(174,159,255,0.5)' : 'rgba(255,255,255,0.08)'}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      border: `2px solid ${m === k ? C.purple : 'rgba(255,255,255,0.2)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, m === k && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: C.purple
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.sub,
      marginTop: 2
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      marginTop: 14
    }
  }, "ЛИЦО-ИСТОЧНИК"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 13,
      padding: '11px 13px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: 'rgba(232,193,90,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "✦"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700
    }
  }, "Загрузить фото лица"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.sub
    }
  }, "Будет подставлено вместо вашего")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.purple
    }
  }, "Выбрать"))));
}
function Voice({
  state,
  set,
  voices
}) {
  const tab = state.voiceTab;
  const list = tab === 'ready' ? voices.filter(v => !v.user_id) : voices.filter(v => v.user_id);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    className: "scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 18px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 800,
      padding: '10px 2px 16px'
    }
  }, "Замена голоса"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12,
      padding: 4,
      gap: 4,
      marginBottom: 14
    }
  }, [['ready', 'Готовые'], ['mine', 'Мои']].map(([k, t]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => set({
      voiceTab: k
    }),
    style: {
      flex: 1,
      textAlign: 'center',
      padding: '8px 0',
      borderRadius: 9,
      fontSize: 12.5,
      fontWeight: 700,
      cursor: 'pointer',
      background: tab === k ? 'rgba(174,159,255,0.2)' : 'transparent',
      color: tab === k ? C.mauve : '#9AA3B8',
      border: tab === k ? '1px solid rgba(174,159,255,0.35)' : '1px solid transparent'
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: C.sub,
      fontSize: 12.5,
      padding: '30px 0'
    }
  }, "Нет своих голосов. Импортируйте по ID ElevenLabs."), list.map(v => {
    const sel = state.selectedVoice === v.id;
    return /*#__PURE__*/React.createElement("div", {
      key: v.id,
      onClick: () => set({
        selectedVoice: v.id
      }),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        borderRadius: 13,
        padding: '11px 13px',
        cursor: 'pointer',
        background: sel ? 'linear-gradient(150deg,rgba(174,159,255,0.14),rgba(45,120,255,0.05))' : 'rgba(255,255,255,0.035)',
        border: `1.5px solid ${sel ? 'rgba(174,159,255,0.45)' : 'rgba(255,255,255,0.08)'}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `2px solid ${sel ? C.purple : 'rgba(255,255,255,0.2)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, sel && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: C.purple
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#8E7CFF,#5CC8FF)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 800,
        color: '#fff',
        flex: 'none'
      }
    }, v.name[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 700
      }
    }, v.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.sub
      }
    }, v.meta || 'ElevenLabs')));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...label,
      marginTop: 16
    }
  }, "ИМПОРТ ПО ID (ELEVENLABS)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "voice_id",
    value: state.newVoiceId,
    onChange: e => set({
      newVoiceId: e.target.value
    }),
    style: {
      flex: 1,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 9,
      padding: '9px 11px',
      outline: 'none',
      color: C.mauve,
      fontFamily: mono,
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 'none',
      background: 'linear-gradient(120deg,#AE9FFF,#8E7CFF)',
      color: '#0A0713',
      fontSize: 12.5,
      fontWeight: 800,
      padding: '0 14px',
      borderRadius: 9,
      cursor: 'pointer'
    }
  }, "Добавить"))));
}
function Settings({
  state,
  set,
  apps,
  setApps,
  onToggleApp
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    className: "scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 18px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 800,
      padding: '10px 2px 18px'
    }
  }, "Настройки"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: label
  }, "ЯЗЫК"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 10,
      padding: 3,
      gap: 3
    }
  }, ['RU', 'EN'].map(l => /*#__PURE__*/React.createElement("div", {
    key: l,
    onClick: () => set({
      lang: l
    }),
    style: {
      padding: '5px 14px',
      borderRadius: 8,
      fontSize: 12.5,
      fontWeight: 700,
      cursor: 'pointer',
      background: state.lang === l ? 'rgba(174,159,255,0.2)' : 'transparent',
      color: state.lang === l ? C.mauve : '#9AA3B8',
      border: state.lang === l ? '1px solid rgba(174,159,255,0.35)' : '1px solid transparent'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: label
  }, "ПРИЛОЖЕНИЯ ДЛЯ ЗАМЕНЫ"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 12
    }
  }, apps.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'rgba(255,255,255,0.035)',
      border: `1px solid ${a.enabled ? 'rgba(58,214,142,0.22)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 12,
      padding: '11px 13px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onToggleApp ? onToggleApp(a.pkg) : setApps(apps.map(x => x.id === a.id ? {
      ...x,
      enabled: !x.enabled
    } : x)),
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      flex: 'none',
      cursor: 'pointer',
      background: a.enabled ? C.green : '#404A5E',
      boxShadow: a.enabled ? '0 0 7px #3AD68E' : 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: a.enabled ? C.text : C.sub
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#6E7A90',
      fontFamily: mono
    }
  }, a.pkg)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: a.enabled ? C.green : '#7E8AA0',
      background: a.enabled ? 'rgba(58,214,142,0.12)' : 'rgba(255,255,255,0.05)',
      padding: '3px 8px',
      borderRadius: 6,
      fontFamily: mono
    }
  }, a.enabled ? 'вкл' : 'выкл')))), /*#__PURE__*/React.createElement("div", {
    style: label
  }, "АДРЕС ТРАНСЛЯЦИИ"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.35)',
      border: '1px solid rgba(174,159,255,0.28)',
      borderRadius: 12,
      padding: '13px 14px',
      fontFamily: mono,
      fontSize: 12.5,
      color: C.mauve,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#586A85'
    }
  }, "http://"), "127.0.0.1:8889/swap/whep"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16,
      overflow: 'hidden'
    }
  }, [['direct', 'Прямая подмена камеры', true], ['rotate', 'Автоповорот видео', true], ['mirror', 'Зеркалить фронтальную', false]].map(([k, t, d], i, arr) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 15px',
      borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600
    }
  }, t), /*#__PURE__*/React.createElement(Toggle, {
    on: state[k] !== undefined ? state[k] : d,
    onClick: () => set({
      [k]: !(state[k] !== undefined ? state[k] : d)
    })
  }))))));
}
function Store({
  packs,
  onClose,
  balance
}) {
  const [sel, setSel] = useState(3);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 60,
      background: '#090D14',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800
    }
  }, "Пополнить баланс"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub,
      marginTop: 3
    }
  }, "Оплата минут замены")), /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      width: 34,
      height: 34,
      borderRadius: 11,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 17,
      color: '#C4CBDC',
      cursor: 'pointer'
    }
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 20px 16px',
      background: 'linear-gradient(150deg,rgba(174,159,255,0.14),rgba(45,120,255,0.05))',
      border: '1px solid rgba(174,159,255,0.24)',
      borderRadius: 16,
      padding: '15px 18px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: '#9AA3B8'
    }
  }, "Текущий баланс"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: C.mauve,
      fontFamily: mono
    }
  }, balance, " Swaps")), /*#__PURE__*/React.createElement("div", {
    className: "scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, packs.map((p, i) => {
    const s = sel === i;
    const accent = p.tag === 'Популярно' ? {
      c: '174,159,255',
      t: C.mauve
    } : p.tag === 'Выгодно' ? {
      c: '232,193,90',
      t: C.gold
    } : null;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      onClick: () => setSel(i),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        borderRadius: 14,
        padding: '14px 15px',
        cursor: 'pointer',
        background: s ? 'linear-gradient(150deg,rgba(174,159,255,0.16),rgba(45,120,255,0.06))' : accent ? `rgba(${accent.c},0.08)` : 'rgba(255,255,255,0.035)',
        border: `1.5px solid ${s ? 'rgba(174,159,255,0.55)' : accent ? `rgba(${accent.c},0.35)` : 'rgba(255,255,255,0.08)'}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        flex: 'none',
        borderRadius: '50%',
        border: `2px solid ${s ? C.purple : 'rgba(255,255,255,0.2)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, s && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: C.purple
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 800
      }
    }, p.swaps, " Swaps"), p.tag && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: accent.t,
        background: `rgba(${accent.c},0.18)`,
        border: `1px solid rgba(${accent.c},0.45)`,
        padding: '2px 8px',
        borderRadius: 20
      }
    }, p.tag)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: C.sub,
        marginTop: 2
      }
    }, p.per_swap, " $ за SwapOn")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 800,
        color: C.mauve,
        fontFamily: mono
      }
    }, p.price_usd, " $"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 22px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `https://t.me/${CFG.botUsername || 'swap_on_bot'}`,
    target: "_blank",
    style: {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      width: '100%',
      border: 'none',
      background: 'linear-gradient(120deg,#229ED9,#38B6F0)',
      color: '#fff',
      fontSize: 15,
      fontWeight: 800,
      padding: 15,
      borderRadius: 14,
      boxShadow: '0 8px 24px rgba(34,158,217,0.32)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "19",
    height: "19",
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21.9 4.3l-3.3 15.6c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1 .5l.36-5.1L18 5.4c.4-.36-.1-.56-.62-.2L6.9 12.06 1.9 10.5c-1.1-.34-1.12-1.1.23-1.62L20.5 2.9c.9-.34 1.7.2 1.4 1.4z"
  })), "Купить в Telegram"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 11,
      color: '#6E7A90',
      marginTop: 9
    }
  }, "Оплата откроется в Telegram-боте")));
}
function App() {
  const [tab, setTab] = useState('home');
  const [store, setStore] = useState(false);
  const [packs, setPacks] = useState([{
    id: 1,
    swaps: 10,
    price_usd: 20,
    per_swap: '2.00',
    tag: ''
  }, {
    id: 2,
    swaps: 30,
    price_usd: 50,
    per_swap: '1.67',
    tag: ''
  }, {
    id: 3,
    swaps: 60,
    price_usd: 80,
    per_swap: '1.33',
    tag: ''
  }, {
    id: 4,
    swaps: 120,
    price_usd: 140,
    per_swap: '1.17',
    tag: 'Популярно'
  }, {
    id: 5,
    swaps: 300,
    price_usd: 300,
    per_swap: '1.00',
    tag: 'Выгодно'
  }]);
  const [voices, setVoices] = useState([{
    id: 'p0',
    name: 'Adam',
    meta: 'Мужской · Глубокий'
  }, {
    id: 'p1',
    name: 'Bella',
    meta: 'Женский · Мягкий'
  }, {
    id: 'p2',
    name: 'Antoni',
    meta: 'Робот · Нейтральный'
  }]);
  const [apps, setApps] = useState([{
    id: 1,
    name: 'Chrome',
    pkg: 'com.android.chrome',
    enabled: true
  }, {
    id: 2,
    name: 'Telegram',
    pkg: 'org.telegram.messenger',
    enabled: true
  }]);
  const [state, setState] = useState({
    on: true,
    front: true,
    back: false,
    vsrc: 'stream',
    asrc: 'stream',
    balance: 124,
    faceMode: 'pro',
    voiceTab: 'ready',
    selectedVoice: 'p0',
    newVoiceId: '',
    lang: 'RU',
    direct: true,
    rotate: true,
    mirror: false
  });
  const set = p => setState(s => ({
    ...s,
    ...p
  }));
  const [pricing, setPricing] = useState([]);
  const applyState = s => {
    if (Array.isArray(s.packs) && s.packs.length) setPacks(s.packs);
    if (Array.isArray(s.pricing)) setPricing(s.pricing);
    if (Array.isArray(s.voices)) setVoices(s.voices.map(v => ({
      id: v.id,
      name: v.name,
      meta: v.meta,
      user_id: v.user_id
    })));
    if (Array.isArray(s.apps)) setApps(s.apps.map(a => ({
      id: a.id,
      name: a.name,
      pkg: a.package,
      enabled: a.enabled
    })));
    set({
      balance: Number(s.balance),
      username: s.profile && s.profile.username,
      tgId: s.profile && s.profile.telegram_id,
      selectedVoice: s.settings && s.settings.selected_voice || s.voices && s.voices[0] && s.voices[0].id,
      faceMode: s.settings && s.settings.face_mode || 'pro'
    });
  };
  const tg = window.Telegram && window.Telegram.WebApp;
  const callApi = (action, extra = {}) => {
    if (!CFG.appApi || !tg || !tg.initData) return Promise.resolve(null);
    return fetch(CFG.appApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        initData: tg.initData,
        action,
        ...extra
      })
    }).then(r => r.ok ? r.json() : null).then(s => {
      if (s) applyState(s);
      return s;
    }).catch(() => null);
  };
  useEffect(() => {
    if (tg) {
      try {
        tg.ready();
        tg.expand();
      } catch (e) {}
    }
    if (tg && tg.initData) {
      callApi('state');
      return;
    }
    // fallback: public catalogs via anon key (when opened outside Telegram)
    if (!CFG.supabaseUrl || !CFG.supabaseAnonKey) return;
    const hdr = {
      apikey: CFG.supabaseAnonKey,
      Authorization: `Bearer ${CFG.supabaseAnonKey}`
    };
    fetch(`${CFG.supabaseUrl}/rest/v1/swap_packs?active=eq.true&order=sort`, {
      headers: hdr
    }).then(r => r.json()).then(d => Array.isArray(d) && d.length && setPacks(d)).catch(() => {});
    fetch(`${CFG.supabaseUrl}/rest/v1/pricing?order=category,key`, {
      headers: hdr
    }).then(r => r.json()).then(d => Array.isArray(d) && setPricing(d)).catch(() => {});
    fetch(`${CFG.supabaseUrl}/rest/v1/voices?user_id=is.null`, {
      headers: hdr
    }).then(r => r.json()).then(d => Array.isArray(d) && d.length && setVoices(d.map(v => ({
      id: v.id,
      name: v.name,
      meta: v.meta,
      user_id: null
    })))).catch(() => {});
  }, []);
  // wire app toggle through the API (falls back to local state outside Telegram)
  const toggleAppApi = pkg => {
    setApps(a => a.map(x => x.pkg === pkg ? {
      ...x,
      enabled: !x.enabled
    } : x));
    callApi('toggle_app', {
      package: pkg
    });
  };
  // ---- native engine bridge (inside the SwapOn Android app: ?native=1) ----
  const NATIVE = typeof window !== 'undefined' && new URLSearchParams(location.search).get('native') === '1' && window.SwapOnNative;
  useEffect(() => {
    if (!NATIVE) return;
    try {
      const c = JSON.parse(NATIVE.getConfig());
      set({
        on: c.enabled,
        front: c.front,
        back: c.back,
        vsrc: c.videoSource === 'pattern' ? 'local' : c.videoSource === 'face' ? 'face' : 'stream',
        asrc: c.audioSource === 'microphone' ? 'mic' : c.audioSource === 'voice' ? 'voice' : 'stream',
        faceMode: c.faceMode || 'pro',
        balance: c.balance,
        selectedVoice: c.voiceId || ''
      });
    } catch (e) {}
  }, []);
  const nset = p => {
    set(p);
    if (!NATIVE) return;
    try {
      if ('on' in p) NATIVE.setBool('enabled', !!p.on);
      if ('front' in p) NATIVE.setBool('inject_front_camera', !!p.front);
      if ('back' in p) NATIVE.setBool('inject_back_camera', !!p.back);
      if ('vsrc' in p) NATIVE.setStr('frame_source', p.vsrc === 'local' ? 'pattern' : p.vsrc === 'face' ? 'face' : 'whep');
      if ('asrc' in p) NATIVE.setStr('audio_source', p.asrc === 'mic' ? 'microphone' : p.asrc === 'voice' ? 'voice' : 'whep');
      if ('faceMode' in p) NATIVE.setStr('face_mode', p.faceMode);
      if ('selectedVoice' in p) NATIVE.setStr('cloud_voice_id', p.selectedVoice);
    } catch (e) {}
  };
  if (NATIVE && typeof document !== 'undefined') {
    document.body.style.padding = '0';
    document.body.style.display = 'block';
  }
  const shell = NATIVE ? {
    width: '100vw',
    height: '100vh'
  } : frameStyle;
  const inner = NATIVE ? {
    ...screenStyle,
    borderRadius: 0
  } : screenStyle;
  return /*#__PURE__*/React.createElement("div", {
    style: shell
  }, /*#__PURE__*/React.createElement("div", {
    style: inner
  }, !NATIVE && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#000',
      zIndex: 40
    }
  }), store && /*#__PURE__*/React.createElement(Store, {
    packs: packs,
    balance: state.balance,
    onClose: () => setStore(false)
  }), tab === 'home' && /*#__PURE__*/React.createElement(Home, {
    state: state,
    set: nset,
    openStore: () => setStore(true)
  }), tab === 'face' && /*#__PURE__*/React.createElement(Face, {
    state: state,
    set: nset
  }), tab === 'voice' && /*#__PURE__*/React.createElement(Voice, {
    state: state,
    set: nset,
    voices: voices
  }), tab === 'set' && /*#__PURE__*/React.createElement(Settings, {
    state: state,
    set: nset,
    apps: apps,
    setApps: setApps,
    onToggleApp: toggleAppApi
  }), /*#__PURE__*/React.createElement(Nav, {
    tab: tab,
    setTab: setTab
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));