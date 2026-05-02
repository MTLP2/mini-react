function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...(props ?? {}),
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child),
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  console.log(element, container);
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((element) => render(element, dom));

  container.append(dom);
}

const Reacto = {
  createElement,
  render,
};

const elementReacto = Reacto.createElement(
  "div",
  { id: "super" },
  Reacto.createElement("a", null, "test"),
  Reacto.createElement("p", null, "32"),
);

const elementToJSX = (
  <div id="jsx-demo">
    <a href="#">test</a>
    <p>52</p>
  </div>
);

const root = document.getElementById("root");
Reacto.render(elementToJSX, root);

export { Reacto, render, createElement, elementReacto };
