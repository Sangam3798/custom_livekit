import { faChevronDown, faMicrophoneSlash, faMicrophone, faVideo, faVideoSlash, faStop, faDesktop, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { Room, LocalTrack, RemoteTrack, ConnectionQuality, LocalParticipant, Track, ConnectionState } from 'livekit-client';
import React__default, { useState, useCallback, useEffect, createElement, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'react-tiny-popover';
import { useParticipant, VideoRenderer, AudioRenderer, useRoom } from '@livekit/react-core';
export * from '@livekit/react-core';
import { AspectRatio } from 'react-aspect-ratio';
import { useMediaQuery } from 'react-responsive';

var styles = {"video":"_2WNzJ","participant":"_34YL4","speaker":"_1y2fW","placeholder":"_30KSQ","participantBar":"_2LCHl","name":"_55u8f","center":"_213aF","stats":"_te685","screenShare":"_1FIqv","iconRed":"_3LzZj","controlsWrapper":"_2kKks","buttonWrapper":"_3w3nM","button":"_hRq5k","icon":"_1Nxni","dangerButton":"_Rt0RH","dropdown":"_3Lz0y","hasDropdown":"_3Bgvz","separator":"_1VLMM","popoverMenu":"_3XXS4","list":"_dKNN7","container":"_14898","overlay":"_17KXW","unmuteButton":"_3QhLc"};

var ControlButton = function ControlButton(_ref) {
  var label = _ref.label,
    disabled = _ref.disabled,
    _onClick = _ref.onClick,
    icon = _ref.icon,
    className = _ref.className,
    menuItems = _ref.menuItems,
    popoverContainerClassName = _ref.popoverContainerClassName,
    popoverTriggerBtnClassName = _ref.popoverTriggerBtnClassName,
    popoverTriggerBtnSeparatorClassName = _ref.popoverTriggerBtnSeparatorClassName,
    onMenuItemClick = _ref.onMenuItemClick;
  var _useState = useState(false),
    menuVisible = _useState[0],
    setMenuVisible = _useState[1];
  var classes = styles.button;
  if (className) {
    classes += " " + className;
  }
  var handleMenuClick = function handleMenuClick(item) {
    setMenuVisible(false);
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
  };
  var menuTrigger;
  var menu = React__default.createElement("div", null);
  if (menuItems && menuItems.length > 0) {
    classes += " " + styles.hasDropdown;
    menuTrigger = React__default.createElement("button", {
      disabled: disabled,
      className: styles.button + " " + popoverTriggerBtnClassName + "  " + styles.dropdown,
      onClick: function onClick() {
        return setMenuVisible(!menuVisible);
      }
    }, React__default.createElement("div", {
      className: styles.separator + " " + popoverTriggerBtnSeparatorClassName
    }), React__default.createElement(FontAwesomeIcon, {
      height: 32,
      icon: faChevronDown
    }));
    menu = React__default.createElement("div", {
      className: styles.popoverMenu + " " + popoverContainerClassName
    }, React__default.createElement("ul", {
      className: styles.list
    }, menuItems === null || menuItems === void 0 ? void 0 : menuItems.map(function (item, i) {
      return React__default.createElement("li", {
        key: i,
        onClick: function onClick() {
          return handleMenuClick(item);
        }
      }, item.label);
    })));
  }
  var mainContent = React__default.createElement("button", {
    disabled: disabled,
    className: classes,
    onClick: function onClick() {
      setMenuVisible(false);
      if (_onClick) _onClick();
    }
  }, icon && React__default.createElement(FontAwesomeIcon, {
    className: styles.icon,
    height: 32,
    icon: icon
  }), label);
  if (!menuTrigger) {
    return mainContent;
  }
  return React__default.createElement(Popover, {
    isOpen: menuVisible,
    positions: ['top'],
    content: menu
  }, React__default.createElement("div", {
    className: styles.buttonWrapper
  }, mainContent, menuTrigger));
};

var AudioSelectButton = function AudioSelectButton(_ref) {
  var isMuted = _ref.isMuted,
    onClick = _ref.onClick,
    onSourceSelected = _ref.onSourceSelected,
    isButtonDisabled = _ref.isButtonDisabled,
    _ref$muteText = _ref.muteText,
    muteText = _ref$muteText === void 0 ? 'Mute' : _ref$muteText,
    _ref$unmuteText = _ref.unmuteText,
    unmuteText = _ref$unmuteText === void 0 ? 'Unmute' : _ref$unmuteText,
    _ref$requestPermissio = _ref.requestPermissions,
    requestPermissions = _ref$requestPermissio === void 0 ? true : _ref$requestPermissio,
    className = _ref.className,
    popoverContainerClassName = _ref.popoverContainerClassName,
    popoverTriggerBtnClassName = _ref.popoverTriggerBtnClassName,
    popoverTriggerBtnSeparatorClassName = _ref.popoverTriggerBtnSeparatorClassName;
  var _useState = useState([]),
    sources = _useState[0],
    setSources = _useState[1];
  var _useState2 = useState([]),
    menuItems = _useState2[0],
    setMenuItems = _useState2[1];
  var listAudioDevices = useCallback(function () {
    try {
      return Promise.resolve(Room.getLocalDevices('audioinput', requestPermissions)).then(function (devices) {
        setSources(devices);
        setMenuItems(devices.map(function (item) {
          return {
            label: item.label
          };
        }));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }, []);
  useEffect(function () {
    listAudioDevices();
    navigator.mediaDevices.addEventListener('devicechange', listAudioDevices);
    return function () {
      navigator.mediaDevices.removeEventListener('devicechange', listAudioDevices);
    };
  }, []);
  var handleMenuItem = function handleMenuItem(item) {
    var device = sources.find(function (d) {
      return d.label === item.label;
    });
    if (device && onSourceSelected) {
      onSourceSelected(device);
    }
  };
  return React__default.createElement(ControlButton, {
    label: isMuted ? unmuteText : muteText,
    icon: isMuted ? faMicrophoneSlash : faMicrophone,
    disabled: isButtonDisabled,
    onClick: onClick,
    menuItems: menuItems,
    onMenuItemClick: handleMenuItem,
    className: className,
    popoverContainerClassName: popoverContainerClassName,
    popoverTriggerBtnClassName: popoverTriggerBtnClassName,
    popoverTriggerBtnSeparatorClassName: popoverTriggerBtnSeparatorClassName
  });
};

var VideoSelectButton = function VideoSelectButton(_ref) {
  var isEnabled = _ref.isEnabled,
    onClick = _ref.onClick,
    onSourceSelected = _ref.onSourceSelected,
    _ref$disableText = _ref.disableText,
    disableText = _ref$disableText === void 0 ? 'Disable Video' : _ref$disableText,
    _ref$enableText = _ref.enableText,
    enableText = _ref$enableText === void 0 ? 'Enable Video' : _ref$enableText,
    _ref$requestPermissio = _ref.requestPermissions,
    requestPermissions = _ref$requestPermissio === void 0 ? true : _ref$requestPermissio,
    className = _ref.className,
    isButtonDisabled = _ref.isButtonDisabled,
    popoverContainerClassName = _ref.popoverContainerClassName,
    popoverTriggerBtnClassName = _ref.popoverTriggerBtnClassName,
    popoverTriggerBtnSeparatorClassName = _ref.popoverTriggerBtnSeparatorClassName;
  var _useState = useState([]),
    sources = _useState[0],
    setSources = _useState[1];
  var _useState2 = useState([]),
    menuItems = _useState2[0],
    setMenuItems = _useState2[1];
  var listVideoDevices = useCallback(function () {
    try {
      return Promise.resolve(Room.getLocalDevices('videoinput', requestPermissions)).then(function (devices) {
        setSources(devices);
        setMenuItems(devices.map(function (item) {
          return {
            label: item.label
          };
        }));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }, []);
  useEffect(function () {
    listVideoDevices();
    navigator.mediaDevices.addEventListener('devicechange', listVideoDevices);
    return function () {
      navigator.mediaDevices.removeEventListener('devicechange', listVideoDevices);
    };
  }, []);
  var handleMenuItem = function handleMenuItem(item) {
    var device = sources.find(function (d) {
      return d.label === item.label;
    });
    if (device && onSourceSelected) {
      onSourceSelected(device);
    }
  };
  return React__default.createElement(ControlButton, {
    label: isEnabled ? disableText : enableText,
    icon: isEnabled ? faVideo : faVideoSlash,
    disabled: isButtonDisabled,
    onClick: onClick,
    menuItems: menuItems,
    onMenuItemClick: handleMenuItem,
    className: className,
    popoverContainerClassName: popoverContainerClassName,
    popoverTriggerBtnClassName: popoverTriggerBtnClassName,
    popoverTriggerBtnSeparatorClassName: popoverTriggerBtnSeparatorClassName
  });
};

var ControlsView = function ControlsView(_ref) {
  var room = _ref.room,
    enableScreenShare = _ref.enableScreenShare,
    enableAudio = _ref.enableAudio,
    enableVideo = _ref.enableVideo,
    onLeave = _ref.onLeave;
  var _useParticipant = useParticipant(room.localParticipant),
    camPub = _useParticipant.cameraPublication,
    micPub = _useParticipant.microphonePublication;
  if (enableScreenShare === undefined) {
    enableScreenShare = true;
  }
  if (enableVideo === undefined) {
    enableVideo = true;
  }
  if (enableAudio === undefined) {
    enableAudio = true;
  }
  var _React$useState = React__default.useState(false),
    audioButtonDisabled = _React$useState[0],
    setAudioButtonDisabled = _React$useState[1];
  var muteButton;
  if (enableAudio) {
    var _micPub$isMuted;
    var enabled = !((_micPub$isMuted = micPub === null || micPub === void 0 ? void 0 : micPub.isMuted) != null ? _micPub$isMuted : true);
    muteButton = React__default.createElement(AudioSelectButton, {
      isMuted: !enabled,
      isButtonDisabled: audioButtonDisabled,
      onClick: function () {
        try {
          setAudioButtonDisabled(true);
          room.localParticipant.setMicrophoneEnabled(!enabled)["finally"](function () {
            return setAudioButtonDisabled(false);
          });
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      },
      onSourceSelected: function onSourceSelected(device) {
        setAudioButtonDisabled(true);
        room.switchActiveDevice('audioinput', device.deviceId)["finally"](function () {
          return setAudioButtonDisabled(false);
        });
      }
    });
  }
  var _React$useState2 = React__default.useState(false),
    videoButtonDisabled = _React$useState2[0],
    setVideoButtonDisabled = _React$useState2[1];
  var videoButton;
  if (enableVideo) {
    var _camPub$isMuted;
    var _enabled = !((_camPub$isMuted = camPub === null || camPub === void 0 ? void 0 : camPub.isMuted) != null ? _camPub$isMuted : true);
    videoButton = React__default.createElement(VideoSelectButton, {
      isEnabled: _enabled,
      isButtonDisabled: videoButtonDisabled,
      onClick: function onClick() {
        setVideoButtonDisabled(true);
        room.localParticipant.setCameraEnabled(!_enabled)["finally"](function () {
          return setVideoButtonDisabled(false);
        });
      },
      onSourceSelected: function onSourceSelected(device) {
        setVideoButtonDisabled(true);
        room.switchActiveDevice('videoinput', device.deviceId)["finally"](function () {
          return setVideoButtonDisabled(false);
        });
      }
    });
  }
  var _React$useState3 = React__default.useState(false),
    screenButtonDisabled = _React$useState3[0],
    setScreenButtonDisabled = _React$useState3[1];
  var screenButton;
  if (enableScreenShare) {
    var _enabled2 = room.localParticipant.isScreenShareEnabled;
    screenButton = React__default.createElement(ControlButton, {
      label: _enabled2 ? 'Stop sharing' : 'Share screen',
      icon: _enabled2 ? faStop : faDesktop,
      disabled: screenButtonDisabled,
      onClick: function onClick() {
        setScreenButtonDisabled(true);
        room.localParticipant.setScreenShareEnabled(!_enabled2)["finally"](function () {
          return setScreenButtonDisabled(false);
        });
      }
    });
  }
  return React__default.createElement("div", {
    className: styles.controlsWrapper
  }, muteButton, videoButton, screenButton, onLeave && React__default.createElement(ControlButton, {
    label: "End",
    className: styles.dangerButton,
    onClick: function onClick() {
      room.disconnect();
      onLeave(room);
    }
  }));
};

var DisplayContext = React__default.createContext({
  stageLayout: 'grid',
  showStats: false
});

var _path, _path2;
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function SvgConnectionQuality1(props) {
  return /*#__PURE__*/createElement("svg", _extends({
    width: 9,
    height: 9,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/createElement("path", {
    d: "M0 6h2v3H0V6z",
    fill: "#981010"
  })), _path2 || (_path2 = /*#__PURE__*/createElement("path", {
    d: "M3.5 3h2v6h-2V3zM7 0h2v9H7V0z",
    fill: "#1A1B1D"
  })));
}

var _path$1, _path2$1;
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function SvgConnectionQuality2(props) {
  return /*#__PURE__*/createElement("svg", _extends$1({
    width: 9,
    height: 9,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/createElement("path", {
    d: "M0 6h2v3H0V6zM3.5 3h2v6h-2V3z",
    fill: "#F89C13"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/createElement("path", {
    d: "M7 0h2v9H7V0z",
    fill: "#1A1B1D"
  })));
}

var _path$2;
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function SvgConnectionQuality3(props) {
  return /*#__PURE__*/createElement("svg", _extends$2({
    width: 9,
    height: 9,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/createElement("path", {
    d: "M0 6h2v3H0V6zM3.5 3h2v6h-2V3zM7 0h2v9H7V0z",
    fill: "#28994E"
  })));
}

var ParticipantView = function ParticipantView(_ref) {
  var participant = _ref.participant,
    width = _ref.width,
    height = _ref.height,
    className = _ref.className,
    speakerClassName = _ref.speakerClassName,
    aspectWidth = _ref.aspectWidth,
    aspectHeight = _ref.aspectHeight,
    orientation = _ref.orientation,
    displayName = _ref.displayName,
    showOverlay = _ref.showOverlay,
    showConnectionQuality = _ref.showConnectionQuality,
    onMouseEnter = _ref.onMouseEnter,
    onMouseLeave = _ref.onMouseLeave,
    onClick = _ref.onClick;
  var _useParticipant = useParticipant(participant),
    cameraPublication = _useParticipant.cameraPublication,
    isLocal = _useParticipant.isLocal,
    connectionQuality = _useParticipant.connectionQuality,
    isSpeaking = _useParticipant.isSpeaking;
  var _useState = useState(),
    videoSize = _useState[0],
    setVideoSize = _useState[1];
  var _useState2 = useState(),
    currentBitrate = _useState2[0],
    setCurrentBitrate = _useState2[1];
  var context = useContext(DisplayContext);
  var handleResize = useCallback(function (width, height) {
    setVideoSize(width + "x" + height);
  }, []);
  useEffect(function () {
    var interval = setInterval(function () {
      var total = 0;
      participant.tracks.forEach(function (pub) {
        if (pub.track instanceof LocalTrack || pub.track instanceof RemoteTrack) {
          total += pub.track.currentBitrate;
        }
      });
      setCurrentBitrate(total);
    }, 1000);
    return function () {
      clearInterval(interval);
    };
  }, []);
  var containerStyles = {
    width: width,
    height: height
  };
  var objectFit = "contain";
  var videoOrientation;
  if (!orientation && aspectWidth && aspectHeight) {
    orientation = aspectWidth > aspectHeight ? "landscape" : "portrait";
  }
  if (cameraPublication !== null && cameraPublication !== void 0 && cameraPublication.dimensions) {
    videoOrientation = cameraPublication.dimensions.width > cameraPublication.dimensions.height ? "landscape" : "portrait";
  }
  if (videoOrientation === orientation) {
    objectFit = "cover";
  }
  if (!displayName) {
    displayName = participant.name || participant.identity;
    if (isLocal) {
      displayName += " (You)";
    }
  }
  var mainElement;
  if (cameraPublication !== null && cameraPublication !== void 0 && cameraPublication.isSubscribed && cameraPublication !== null && cameraPublication !== void 0 && cameraPublication.track && !(cameraPublication !== null && cameraPublication !== void 0 && cameraPublication.isMuted)) {
    mainElement = React__default.createElement(VideoRenderer, {
      track: cameraPublication.track,
      isLocal: isLocal,
      objectFit: objectFit,
      width: "100%",
      height: "100%",
      className: styles.video,
      onSizeChanged: handleResize
    });
  } else {
    mainElement = React__default.createElement("div", {
      className: styles.placeholder
    });
  }
  var classes = [styles.participant];
  if (className) {
    classes.push(className);
  }
  if (isSpeaking) {
    classes.push(speakerClassName != null ? speakerClassName : styles.speaker);
  }
  var isAudioMuted = !participant.isMicrophoneEnabled;
  var statsContent;
  if (context.showStats) {
    statsContent = React__default.createElement("div", {
      className: styles.stats
    }, React__default.createElement("span", null, videoSize), currentBitrate !== undefined && currentBitrate > 0 && React__default.createElement("span", null, "\xA0", Math.round(currentBitrate / 1024), " kbps"));
  }
  var ConnectionQualityIndicator;
  if (showConnectionQuality) {
    switch (connectionQuality) {
      case ConnectionQuality.Excellent:
        ConnectionQualityIndicator = SvgConnectionQuality3;
        break;
      case ConnectionQuality.Good:
        ConnectionQualityIndicator = SvgConnectionQuality2;
        break;
      case ConnectionQuality.Poor:
        ConnectionQualityIndicator = SvgConnectionQuality1;
        break;
    }
  }
  return React__default.createElement("div", {
    className: classes.join(" "),
    style: containerStyles,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: onClick
  }, aspectWidth && aspectHeight && React__default.createElement(AspectRatio, {
    ratio: aspectWidth / aspectHeight
  }, mainElement), (!aspectWidth || !aspectHeight) && mainElement, (showOverlay || context.showStats) && React__default.createElement("div", {
    className: styles.participantBar
  }, React__default.createElement("div", {
    className: styles.name
  }, displayName), React__default.createElement("div", {
    className: styles.center
  }, statsContent), React__default.createElement("div", null, ConnectionQualityIndicator && React__default.createElement(ConnectionQualityIndicator, null)), React__default.createElement("div", null, React__default.createElement(FontAwesomeIcon, {
    icon: isAudioMuted ? faMicrophoneSlash : faMicrophone,
    height: 24,
    className: isAudioMuted ? styles.iconRed : styles.iconNormal
  }))));
};

var ScreenShareView = function ScreenShareView(_ref) {
  var track = _ref.track,
    width = _ref.width,
    height = _ref.height;
  return React__default.createElement("div", {
    className: styles.screenShare
  }, React__default.createElement(VideoRenderer, {
    track: track,
    isLocal: false,
    width: width,
    height: height,
    className: styles.video
  }));
};

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var styles$1 = {"container":"_2sm4e","stage":"_2VE66","stageCenter":"_2kKDi","sidebar":"_gA0MQ","controlsArea":"_1smc2","gridStage":"_2HbZ0","grid1x1":"_2ltyS","grid2x1":"_2vumQ","grid2x2":"_X-1Rk","grid3x3":"_3rLR0","grid4x4":"_3qF9s","grid5x5":"_mDdNR"};

var GridStage = function GridStage(_ref) {
  var roomState = _ref.roomState,
    participantRenderer = _ref.participantRenderer,
    controlRenderer = _ref.controlRenderer,
    onLeave = _ref.onLeave;
  var isConnecting = roomState.isConnecting,
    error = roomState.error,
    participants = roomState.participants,
    room = roomState.room;
  var _useState = useState([]),
    visibleParticipants = _useState[0],
    setVisibleParticipants = _useState[1];
  var _useState2 = useState(false),
    showOverlay = _useState2[0],
    setShowOverlay = _useState2[1];
  var _React$useState = React__default.useState(styles$1.grid1x1),
    gridClass = _React$useState[0],
    setGridClass = _React$useState[1];
  useEffect(function () {
    var _room$activeSpeakers;
    var numVisible = 1;
    if (participants.length === 1) {
      setGridClass(styles$1.grid1x1);
    } else if (participants.length === 2) {
      setGridClass(styles$1.grid2x1);
      numVisible = 2;
    } else if (participants.length <= 4) {
      setGridClass(styles$1.grid2x2);
      numVisible = Math.min(participants.length, 4);
    } else if (participants.length <= 9) {
      setGridClass(styles$1.grid3x3);
      numVisible = Math.min(participants.length, 9);
    } else if (participants.length <= 16) {
      setGridClass(styles$1.grid4x4);
      numVisible = Math.min(participants.length, 16);
    } else {
      setGridClass(styles$1.grid5x5);
      numVisible = Math.min(participants.length, 25);
    }
    var newParticipants = [];
    visibleParticipants.forEach(function (p) {
      if (room !== null && room !== void 0 && room.participants.has(p.sid) || (room === null || room === void 0 ? void 0 : room.localParticipant.sid) === p.sid) {
        newParticipants.push(p);
      }
    });
    room === null || room === void 0 ? void 0 : (_room$activeSpeakers = room.activeSpeakers) === null || _room$activeSpeakers === void 0 ? void 0 : _room$activeSpeakers.forEach(function (speaker) {
      if (newParticipants.includes(speaker) || speaker !== (room === null || room === void 0 ? void 0 : room.localParticipant) && !(room !== null && room !== void 0 && room.participants.has(speaker.sid))) {
        return;
      }
      var idx = newParticipants.findIndex(function (p) {
        return !p.isSpeaking;
      });
      if (idx >= 0) {
        newParticipants[idx] = speaker;
      } else {
        newParticipants.push(speaker);
      }
    });
    for (var _iterator = _createForOfIteratorHelperLoose(participants), _step; !(_step = _iterator()).done;) {
      var p = _step.value;
      if (newParticipants.length >= numVisible) {
        break;
      }
      if (newParticipants.includes(p) || p.isSpeaking) {
        continue;
      }
      newParticipants.push(p);
    }
    if (newParticipants.length > numVisible) {
      newParticipants.splice(numVisible, newParticipants.length - numVisible);
    }
    setVisibleParticipants(newParticipants);
  }, [participants]);
  if (error) {
    return React__default.createElement("div", null, "error ", error.message);
  }
  if (isConnecting) {
    return React__default.createElement("div", null, "connecting from deepak");
  }
  if (!room) {
    return React__default.createElement("div", null, "room closed from deepak");
  }
  if (participants.length === 0) {
    return React__default.createElement("div", null, "no one is in the room");
  }
  var ParticipantRenderer = participantRenderer != null ? participantRenderer : ParticipantView;
  var ControlRenderer = controlRenderer != null ? controlRenderer : ControlsView;
  return React__default.createElement("div", {
    className: styles$1.container
  }, React__default.createElement("div", {
    className: styles$1.gridStage + " " + gridClass
  }, visibleParticipants.map(function (participant) {
    return React__default.createElement(ParticipantRenderer, {
      key: participant.identity,
      participant: participant,
      orientation: "landscape",
      width: "100%",
      height: "100%",
      showOverlay: showOverlay,
      showConnectionQuality: true,
      onMouseEnter: function onMouseEnter() {
        return setShowOverlay(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowOverlay(false);
      }
    });
  })), React__default.createElement("div", {
    className: styles$1.controlsArea
  }, React__default.createElement(ControlRenderer, {
    room: room,
    onLeave: onLeave
  })));
};

function defaultSortParticipants(participants) {
  var sortedParticipants = [].concat(participants);
  sortedParticipants.sort(function (a, b) {
    var _a$joinedAt$getTime, _a$joinedAt, _b$joinedAt$getTime, _b$joinedAt;
    if (a.isSpeaking && b.isSpeaking) {
      return b.audioLevel - a.audioLevel;
    }
    if (a.isSpeaking !== b.isSpeaking) {
      if (a.isSpeaking) {
        return -1;
      } else {
        return 1;
      }
    }
    if (a.lastSpokeAt !== b.lastSpokeAt) {
      var _a$lastSpokeAt$getTim, _a$lastSpokeAt, _b$lastSpokeAt$getTim, _b$lastSpokeAt;
      var aLast = (_a$lastSpokeAt$getTim = (_a$lastSpokeAt = a.lastSpokeAt) === null || _a$lastSpokeAt === void 0 ? void 0 : _a$lastSpokeAt.getTime()) != null ? _a$lastSpokeAt$getTim : 0;
      var bLast = (_b$lastSpokeAt$getTim = (_b$lastSpokeAt = b.lastSpokeAt) === null || _b$lastSpokeAt === void 0 ? void 0 : _b$lastSpokeAt.getTime()) != null ? _b$lastSpokeAt$getTim : 0;
      return bLast - aLast;
    }
    var aVideo = a.videoTracks.size > 0;
    var bVideo = b.videoTracks.size > 0;
    if (aVideo !== bVideo) {
      if (aVideo) {
        return -1;
      } else {
        return 1;
      }
    }
    return ((_a$joinedAt$getTime = (_a$joinedAt = a.joinedAt) === null || _a$joinedAt === void 0 ? void 0 : _a$joinedAt.getTime()) != null ? _a$joinedAt$getTime : 0) - ((_b$joinedAt$getTime = (_b$joinedAt = b.joinedAt) === null || _b$joinedAt === void 0 ? void 0 : _b$joinedAt.getTime()) != null ? _b$joinedAt$getTime : 0);
  });
  var localParticipant = sortedParticipants.find(function (p) {
    return p instanceof LocalParticipant;
  });
  if (localParticipant) {
    var localIdx = sortedParticipants.indexOf(localParticipant);
    if (localIdx >= 0) {
      sortedParticipants.splice(localIdx, 1);
      if (sortedParticipants.length > 0) {
        sortedParticipants.splice(1, 0, localParticipant);
      } else {
        sortedParticipants.push(localParticipant);
      }
    }
  }
  return sortedParticipants;
}

var SpeakerStage = function SpeakerStage(_ref) {
  var roomState = _ref.roomState,
    participantRenderer = _ref.participantRenderer,
    controlRenderer = _ref.controlRenderer,
    onLeave = _ref.onLeave,
    sortParticipants = _ref.sortParticipants;
  var isConnecting = roomState.isConnecting,
    error = roomState.error,
    participants = roomState.participants,
    room = roomState.room;
  var _useState = useState(false),
    showOverlay = _useState[0],
    setShowOverlay = _useState[1];
  var sortFn = sortParticipants != null ? sortParticipants : defaultSortParticipants;
  var _useState2 = useState(sortFn(participants)),
    sortedParticipants = _useState2[0],
    setSortedParticipants = _useState2[1];
  useEffect(function () {
    setSortedParticipants(sortFn(participants));
  }, [participants, sortFn]);
  if (error) {
    return React__default.createElement("div", null, "error ", error.message);
  }
  if (isConnecting) {
    return React__default.createElement("div", null, "connecting");
  }
  if (!room) {
    return React__default.createElement("div", null, "room closed");
  }
  if (sortedParticipants.length === 0) {
    return React__default.createElement("div", null, "no one is in the room");
  }
  var ParticipantRenderer = participantRenderer != null ? participantRenderer : ParticipantView;
  var ControlRenderer = controlRenderer != null ? controlRenderer : ControlsView;
  var screenTrack;
  sortedParticipants.forEach(function (p) {
    if (screenTrack) {
      return;
    }
    var track = p.getTrack(Track.Source.ScreenShare);
    if (track !== null && track !== void 0 && track.isSubscribed && track.videoTrack) {
      screenTrack = track.videoTrack;
    }
  });
  var otherParticipants = sortedParticipants;
  var participantInFocus;
  var mainView;
  if (screenTrack) {
    mainView = React__default.createElement(ScreenShareView, {
      track: screenTrack,
      height: "100%",
      width: "100%"
    });
  } else {
    participantInFocus = sortedParticipants[0];
    otherParticipants = sortedParticipants.slice(1);
    mainView = React__default.createElement(ParticipantRenderer, {
      key: participantInFocus.identity,
      participant: participantInFocus,
      width: "100%",
      height: "100%",
      orientation: "landscape",
      showOverlay: showOverlay,
      showConnectionQuality: true,
      onMouseEnter: function onMouseEnter() {
        return setShowOverlay(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowOverlay(false);
      }
    });
  }
  return React__default.createElement("div", {
    className: styles$1.container
  }, React__default.createElement("div", {
    className: styles$1.stage
  }, React__default.createElement("div", {
    className: styles$1.stageCenter
  }, mainView), React__default.createElement("div", {
    className: styles$1.sidebar
  }, otherParticipants.map(function (participant) {
    return React__default.createElement(ParticipantRenderer, {
      key: participant.identity,
      participant: participant,
      width: "100%",
      aspectWidth: 16,
      aspectHeight: 9,
      showOverlay: showOverlay,
      onMouseEnter: function onMouseEnter() {
        return setShowOverlay(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowOverlay(false);
      }
    });
  }))), React__default.createElement("div", {
    className: styles$1.controlsArea
  }, React__default.createElement(ControlRenderer, {
    room: room,
    onLeave: onLeave
  })));
};

var styles$2 = {"container":"_2zM8F","stage":"_9PXrI","participantsArea":"_Tl5ht","participant":"_jGXiG","controlsArea":"_3MB5b"};

var MobileStage = function MobileStage(_ref) {
  var roomState = _ref.roomState,
    participantRenderer = _ref.participantRenderer,
    controlRenderer = _ref.controlRenderer,
    onLeave = _ref.onLeave,
    sortParticipants = _ref.sortParticipants;
  var isConnecting = roomState.isConnecting,
    error = roomState.error,
    participants = roomState.participants,
    room = roomState.room;
  var _useState = useState(false),
    showOverlay = _useState[0],
    setShowOverlay = _useState[1];
  var sortFn = sortParticipants != null ? sortParticipants : defaultSortParticipants;
  var _useState2 = useState(sortFn(participants)),
    sortedParticipants = _useState2[0],
    setSortedParticipants = _useState2[1];
  useEffect(function () {
    setSortedParticipants(sortFn(participants));
  }, [participants, sortFn]);
  if (error) {
    return React__default.createElement("div", null, "error ", error.message);
  }
  if (isConnecting) {
    return React__default.createElement("div", null, "connecting");
  }
  if (!room) {
    return React__default.createElement("div", null, "room closed");
  }
  if (sortedParticipants.length === 0) {
    return React__default.createElement("div", null, "no one is in the room");
  }
  var ParticipantRenderer = participantRenderer != null ? participantRenderer : ParticipantView;
  var ControlRenderer = controlRenderer != null ? controlRenderer : ControlsView;
  var screenTrack;
  sortedParticipants.forEach(function (p) {
    if (screenTrack) {
      return;
    }
    var track = p.getTrack(Track.Source.ScreenShare);
    if (track !== null && track !== void 0 && track.isSubscribed && track.videoTrack) {
      screenTrack = track.videoTrack;
    }
  });
  var otherParticipants = sortedParticipants;
  var participantInFocus;
  var mainView;
  if (screenTrack) {
    mainView = React__default.createElement(ScreenShareView, {
      track: screenTrack,
      height: "100%",
      width: "100%"
    });
  } else if (otherParticipants.length === 0) {
    mainView = React__default.createElement("div", null, "no one is in the room");
  } else {
    var _otherParticipants = otherParticipants;
    participantInFocus = _otherParticipants[0];
    otherParticipants = _otherParticipants.slice(1);
    mainView = React__default.createElement(ParticipantRenderer, {
      key: participantInFocus.identity,
      participant: participantInFocus,
      showOverlay: showOverlay,
      width: "100%",
      height: "100%",
      orientation: "portrait",
      showConnectionQuality: true,
      onMouseEnter: function onMouseEnter() {
        return setShowOverlay(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowOverlay(false);
      }
    });
  }
  return React__default.createElement("div", {
    className: styles$2.container
  }, React__default.createElement("div", {
    className: styles$2.stage
  }, mainView), React__default.createElement("div", {
    className: styles$2.participantsArea
  }, otherParticipants.map(function (participant) {
    return React__default.createElement(ParticipantRenderer, {
      key: participant.identity,
      participant: participant,
      className: styles$2.participant,
      aspectWidth: 4,
      aspectHeight: 3,
      showOverlay: showOverlay,
      onMouseEnter: function onMouseEnter() {
        return setShowOverlay(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowOverlay(false);
      }
    });
  })), React__default.createElement("div", {
    className: styles$2.controlsArea
  }, React__default.createElement(ControlRenderer, {
    room: room,
    enableScreenShare: false,
    onLeave: onLeave
  })));
};

var StageView = function StageView(stageProps) {
  var isMobile = useMediaQuery({
    query: '(max-width: 800px)'
  });
  var _stageProps$roomState = stageProps.roomState,
    room = _stageProps$roomState.room,
    participants = _stageProps$roomState.participants;
  var context = useContext(DisplayContext);
  var mainElement;
  if (isMobile) {
    mainElement = React__default.createElement(MobileStage, Object.assign({}, stageProps));
  } else {
    var screenTrack;
    participants.forEach(function (p) {
      if (screenTrack) {
        return;
      }
      var track = p.getTrack(Track.Source.ScreenShare);
      if (track !== null && track !== void 0 && track.isSubscribed && track.videoTrack) {
        screenTrack = track.videoTrack;
      }
    });
    if (context.stageLayout === 'grid' && screenTrack === undefined) {
      mainElement = React__default.createElement(GridStage, Object.assign({}, stageProps));
    } else {
      mainElement = React__default.createElement(SpeakerStage, Object.assign({}, stageProps));
    }
  }
  return React__default.createElement("div", {
    className: styles.container
  }, mainElement, stageProps.roomState.audioTracks.map(function (track) {
    return React__default.createElement(AudioRenderer, {
      key: track.sid,
      track: track,
      isLocal: false
    });
  }), (room === null || room === void 0 ? void 0 : room.canPlaybackAudio) === false && React__default.createElement("div", {
    className: styles.overlay
  }, React__default.createElement("button", {
    className: styles.unmuteButton,
    onClick: function onClick() {
      room.startAudio();
    }
  }, React__default.createElement(FontAwesomeIcon, {
    className: styles.icon,
    size: "1x",
    icon: faVolumeMute
  }), "Click to Unmute")));
};

var LiveKitRoom = function LiveKitRoom(_ref) {
  var url = _ref.url,
    token = _ref.token,
    roomOptions = _ref.roomOptions,
    connectOptions = _ref.connectOptions,
    stageRenderer = _ref.stageRenderer,
    participantRenderer = _ref.participantRenderer,
    controlRenderer = _ref.controlRenderer,
    onConnected = _ref.onConnected,
    onLeave = _ref.onLeave;
  var roomState = useRoom(roomOptions);
  useEffect(function () {
    if (roomState.room) {
      roomState.connect(url, token, connectOptions).then(function (room) {
        if (!room) {
          return;
        }
        if (onConnected && room.state === ConnectionState.Connected) {
          onConnected(room);
        }
      });
    }
    return function () {
      var _roomState$room;
      if (((_roomState$room = roomState.room) === null || _roomState$room === void 0 ? void 0 : _roomState$room.state) !== ConnectionState.Disconnected) {
        var _roomState$room2;
        (_roomState$room2 = roomState.room) === null || _roomState$room2 === void 0 ? void 0 : _roomState$room2.disconnect();
      }
    };
  }, [roomState.room]);
  var selectedStageRenderer = stageRenderer != null ? stageRenderer : StageView;
  return selectedStageRenderer({
    roomState: roomState,
    participantRenderer: participantRenderer,
    controlRenderer: controlRenderer,
    onLeave: onLeave
  });
};

export { AudioSelectButton, ControlButton, ControlsView, DisplayContext, LiveKitRoom, ParticipantView, ScreenShareView, StageView, VideoSelectButton };
//# sourceMappingURL=index.modern.js.map
