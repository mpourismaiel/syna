import serialize from './serialize';

function $(selector) {
  const nodes = typeof selector === 'string' ? Array.from((this && Array.isArray(this) ? this[0] : document).querySelectorAll(selector)) : [selector];

  const _returnee = {
    $nodes: nodes,
    $: $.bind(nodes),
    on: (event, callback) => {
      nodes.forEach(node => node[`on${event}`] = callback.bind(node));
      return _returnee;
    },
    addClass: className => {
      nodes.forEach(node => node.classList.add(className));
      return _returnee;
    },
    removeClass: className => {
      nodes.forEach(node => node.classList.remove(className));
      return _returnee;
    },
    attr: (attribute, value) => {
      if (value === undefined && nodes.length > 1) {
        throw new Error('Can\'t access value of several nodes\' attributes');
      }

      if (value === undefined) {
        return nodes[0].getAttribute(attribute);
      } else {
        nodes.forEach(node => node.setAttribute(attribute, value));
      }
    },
    append: innerHTML => {
      nodes.forEach(node => node.innerHTML += innerHTML);
    },
    html: innerHTML => {
      if (innerHTML === undefined) {
        if (nodes.length > 1) {
          throw new Error('Can\'t get several nodes innerHTML at once');
        }

        return nodes[0].innerHTML;
      }

      nodes.forEach(node => node.innerHTML = innerHTML);
    },
    text: innerText => {
      if (innerText === undefined) {
        if (nodes.length > 1) {
          throw new Error('Can\'t get several nodes innerText at once');
        }

        return nodes[0].innerText;
      }

      nodes.forEach(node => node.innerText = innerText);
    },
    val: value => {
      if (value === undefined) {
        if (nodes.length > 1) {
          throw new Error('Can\'t get several nodes value at once');
        }

        return nodes[0].value;
      }

      nodes.forEach(node => node.value = value);
    },
    submit: () => nodes.forEach(node => node.submit()),
    serialize: () => {
      if (nodes.length > 1) {
        throw new Error('Can\'t serialize forms at once');
      }

      return serialize(nodes[0]);
    },
    length: nodes.length,
  }

  nodes.forEach((node, index) => _returnee[index] = node);

  return _returnee;
}

$.scrollTo = function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
  }, 10);
}

$.ajax = function ajax({
  method,
  url,
  data,
  options = {},
}) {
  const contentType = options.contentType || "application/json;charset=UTF-8";
  const xhr = new XMLHttpRequest();
  xhr.open(method.toUpperCase(), url);
  xhr.setRequestHeader("Content-Type", contentType);
  xhr.send(data);

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (contentType === "application/json;charset=UTF-8") {
            resolve(JSON.parse(xhr.responseXML || xhr.responseText));
          } else {
            resolve(xhr.responseXML || xhr.responseText);
          }
        } else {
          reject(xhr.statusText);
        }
      }
    }
  })
}

$.post = (url, data, options) => $.ajax({ method: 'post', url, data, options })

export default $;
