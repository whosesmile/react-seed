const easing = (pos) => {
  return Math.sin(pos * (Math.PI / 2));
};

// 滚动到特定位置
const scrollToY = (panel, endY, duration, callback) => {
  if (typeof duration === 'function') {
    callback = duration;
    duration = 300;
  }
  duration = duration || 300;
  callback = callback || function() {};
  var startT = Date.now();
  var startY = panel.scrollTop;
  var finishT = startT + duration;

  var limit = panel.scrollHeight - panel.clientHeight;
  endY = Math.min(limit, endY);
  var interpolate = function(source, target, shift) {
    return (source + (target - source) * shift);
  };

  var animate = function() {
    var now = Date.now();
    var shift = (now > finishT) ? 1 : (now - startT) / duration;
    panel.scrollTop = interpolate(startY, endY, easing(shift));
    if (now < finishT) {
      setTimeout(animate, 15);
    } else {
      panel.scrollTop = endY;
      // 不再触发scrollEvent
      setTimeout(callback, 0);
    }
  };

  animate();
};

export default scrollToY;
