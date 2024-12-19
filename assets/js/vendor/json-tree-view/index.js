/**
 * @name @ethicdevs/json-tree-view
 * @license MIT
 * @maintainer <William Nemencha, EthicDevs, https://github.com/EthicDevs/json-tree-view>
 * @forked-from <前端通過元素展示Json樹狀資料，因, https://github.com/yuda-lyu/w-jsonview-tree>
 * @itself-forked-from <沒有加入預先展開數據功能，自己下載來修改, https://github.com/pgrabovets/json-view>
 */
/**
 * @export
 * @param {Object} jsonObj 輸入Json物件
 * @param {Element} rootElem 輸入初始化元素
 * @param {Object} [option={}] 輸入設定物件，預設為空物件
 * @param {Boolean} [option.expanded=false] 輸入是否預先展開，預設為false
 */
function renderJSONTreeView(jsonObj, rootElem, options) {
    if (options === void 0) { options = {}; }
    //default expanded
    var _expanded = false;
    function init() {
        //get expanded
        if (options) {
            _expanded = options["expanded"] === true;
        }
        //clear
        rootElem.innerHTML = "";
        //add class
        rootElem.classList.add("CompCssDJsonViewTree");
        //render
        var tree = createTree(jsonObj);
        render(tree, rootElem);
        return tree;
    }
    /**
     * Create html element
     * @param {String} type html element
     * @param {Object} config
     */
    function createElement(type, config) {
        var htmlElement = document.createElement(type);
        if (config === undefined) {
            return htmlElement;
        }
        if (config.className) {
            htmlElement.className = config.className;
        }
        if (config.content) {
            htmlElement.textContent = config.content;
        }
        if (config.children) {
            config.children.forEach(function (el) {
                if (el !== null) {
                    htmlElement.appendChild(el);
                }
            });
        }
        return htmlElement;
    }
    function createExpandedElement(node) {
        var _a, _b, _c;
        var iElem = createElement("i");
        if (node.expanded) {
            iElem.className = "wicon w-caret-down";
        }
        else {
            iElem.className = "wicon w-caret-right";
        }
        var caretElem = createElement("div", {
            className: "wjv-caret-icon",
            children: [iElem],
        });
        var handleClick = node.toggle.bind(node);
        caretElem.addEventListener("click", handleClick);
        var indexElem = createElement("div", {
            className: "wjv-json-index",
            content: node.key,
        });
        var typeElem = createElement("div", {
            className: "wjv-json-type",
            content: node.type,
        });
        var keyElem = createElement("div", {
            className: "wjv-json-key",
            content: node.key,
        });
        var sizeElem = createElement("div", {
            className: "wjv-json-size",
        });
        if (node.type === "array") {
            sizeElem.innerText = "[" + ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) + "]";
        }
        else if (node.type === "object") {
            sizeElem.innerText = "{" + ((_b = node.children) === null || _b === void 0 ? void 0 : _b.length) + "}";
        }
        var lineChildren;
        if (node.key === null) {
            lineChildren = [caretElem, typeElem, sizeElem];
        }
        else if (((_c = node === null || node === void 0 ? void 0 : node.parent) === null || _c === void 0 ? void 0 : _c.type) === "array") {
            lineChildren = [caretElem, indexElem, sizeElem];
        }
        else {
            lineChildren = [caretElem, keyElem, sizeElem];
        }
        var lineElem = createElement("div", {
            className: "wjv-line",
            children: lineChildren,
        });
        if (node.depth > 0) {
            //lineElem.style = 'margin-left: ' + node.depth * 24 + 'px;' //IE11 strict模式下無法指派, style為唯讀屬性
            lineElem.setAttribute("style", "margin-left: " + node.depth * 24 + "px;");
        }
        return lineElem;
    }
    /**
     * Create not expanded element
     * @param {Object} node
     * @return {HTMLElement}
     */
    function createNotExpandedElement(node) {
        var caretElem = createElement("div", {
            className: "wjv-empty-icon",
        });
        var keyElem = createElement("div", {
            className: "wjv-json-key",
            content: node.key,
        });
        var separatorElement = createElement("div", {
            className: "wjv-json-separator",
            content: ":",
        });
        var valueType = " wjv-json-" + typeof node.value;
        var valueContent = String(node.value);
        var valueElement = createElement("div", {
            className: "wjv-json-value" + valueType,
            content: valueContent,
        });
        var lineElem = createElement("div", {
            className: "wjv-line",
            children: [caretElem, keyElem, separatorElement, valueElement],
        });
        if (node.depth > 0) {
            //lineElem.style = 'margin-left: ' + node.depth * 24 + 'px;' //IE11 strict模式下無法指派, style為唯讀屬性
            lineElem.setAttribute("style", "margin-left: " + node.depth * 24 + "px;");
        }
        return lineElem;
    }
    /**
     * Create tree node
     * @return {Object}
     */
    function createNode() {
        return {
            key: null,
            parent: null,
            value: null,
            expanded: _expanded,
            type: null,
            children: null,
            elem: null,
            depth: 0,
            setCaretIconRight: function () {
                var _a;
                var icon = (_a = this.elem) === null || _a === void 0 ? void 0 : _a.querySelector(".wicon");
                icon === null || icon === void 0 ? void 0 : icon.classList.replace("w-caret-down", "w-caret-right");
            },
            setCaretIconDown: function () {
                var _a;
                var icon = (_a = this.elem) === null || _a === void 0 ? void 0 : _a.querySelector(".wicon");
                icon === null || icon === void 0 ? void 0 : icon.classList.replace("w-caret-right", "w-caret-down");
            },
            hideChildren: function () {
                if (this.children !== null) {
                    this.children.forEach(function (item) {
                        var _a;
                        (_a = item.elem) === null || _a === void 0 ? void 0 : _a.classList.add("wjv-json-hide");
                        if (item.expanded) {
                            item.hideChildren();
                        }
                    });
                }
            },
            showChildren: function () {
                if (this.children !== null) {
                    this.children.forEach(function (item) {
                        var _a;
                        (_a = item.elem) === null || _a === void 0 ? void 0 : _a.classList.remove("wjv-json-hide");
                        if (item.expanded) {
                            item.showChildren();
                        }
                    });
                }
            },
            toggle: function () {
                if (this.expanded) {
                    this.expanded = false;
                    this.hideChildren();
                    this.setCaretIconRight();
                }
                else {
                    this.expanded = true;
                    this.showChildren();
                    this.setCaretIconDown();
                }
            },
        };
    }
    /**
     * Return variable type
     * @param {*} val
     */
    function getType(val) {
        var type = typeof val;
        if (Array.isArray(val)) {
            type = "array";
        }
        else if (val === null) {
            type = "null";
        }
        return type;
    }
    /**
     * Recursively traverse json object
     * @param {Object} obj parsed json object
     * @param {Object} parent of object tree
     */
    function traverseObject(obj, parent) {
        for (var key in obj) {
            var child = createNode();
            child.parent = parent;
            child.key = key;
            child.type = getType(obj[key]);
            child.depth = parent.depth + 1;
            child.expanded = _expanded;
            if (typeof obj[key] === "object") {
                child.children = [];
                if (parent.children == null) {
                    parent.children = [];
                }
                parent.children.push(child);
                traverseObject(obj[key], child);
                child.elem = createExpandedElement(child);
            }
            else {
                child.value = obj[key];
                child.elem = createNotExpandedElement(child);
                if (parent.children == null) {
                    parent.children = [];
                }
                parent.children.push(child);
            }
        }
    }
    /**
     * Create root of a tree
     * @param {Object} obj Json object
     * @return {Object}
     */
    function createTree(obj) {
        var tree = createNode();
        tree.type = getType(obj);
        tree.children = [];
        tree.expanded = _expanded;
        traverseObject(obj, tree);
        tree.elem = createExpandedElement(tree);
        return tree;
    }
    /**
     * Recursively traverse Tree object
     * @param {Object} node
     * @param {Callback} callback
     */
    function traverseTree(node, callback) {
        callback(node);
        if (node.children !== null) {
            node.children.forEach(function (item) {
                traverseTree(item, callback);
            });
        }
    }
    /**
     * Render Tree object
     * @param {Object} tree
     * @param {String} rootElem
     */
    function render(tree, rootElem) {
        traverseTree(tree, function (node) {
            if (!node.expanded) {
                node.hideChildren();
            }
            if (node.elem) {
                rootElem.appendChild(node.elem);
            }
        });
    }
    return init();
}
