"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["quotesDetail"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    selected: {
      type: Boolean
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var orderIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    var imageSrc = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("/images/arrowUp.svg");
    var isHidden = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    var orderClick = function orderClick(event) {
      emit("hide-clicks", [orderIndex, event.target.textContent]);
      if (orderIndex.value == 1) {
        imageSrc.value = "/images/arrowUp.svg";
      } else {
        imageSrc.value = "/images/arrowDown.svg";
      }
      orderIndex.value *= -1;
    };
    return {
      imageSrc: imageSrc,
      orderClick: orderClick,
      isHidden: isHidden
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_HeaderLine_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/HeaderLine.vue */ "./resources/js/components/HeaderLine.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Quotes Detailed",
  components: {
    HeaderLine: _components_HeaderLine_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  setup: function setup() {
    var orderHashMap = {
      "OPERATOR": "tbl_export_import_land_Operator_carrier",
      "DOOR PICKUP": "NO",
      "DEPARTURE": "tbl_land_tariff_Departure_port",
      "DESTINATION": "tbl_export_import_land_Destination_Port",
      "SAILING VIA": "tbl_land_tariff_Via",
      "PORT-PORT": "tbl_export_import_land_TT",
      "CFS-CFS": "tbl_land_tariff_TT",
      "BASIC FREIGHT": "calculatedWeight"
    };
    var id = document.getElementById("csrf-token").getAttribute("content");
    var urlParams = new URLSearchParams(window.location.search);
    var isExport = urlParams.get("queryType") == "selling";
    var pickup;
    var headerArray = ["OPERATOR", "DEPARTURE", "DESTINATION", "SAILING VIA", "MODE", "PORT-PORT", "CFS-CFS", "PORT TAXES", "FREIGHT RATE", "TOTAL", "CURRENCY", "CHEAP/FAST"];
    if (isExport) {
      pickup = urlParams.get("Pickup");
      if (pickup != "") {
        headerArray.splice(1, 0, "DOOR PICKUP");
      }
    } else {
      pickup = urlParams.get("DoorDelivery");
      if (pickup != "") {
        headerArray.splice(3, 0, "DOOR DELIVERY");
      }
    }
    var elementArray = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
    var selectedItem = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
    var selectedHeader = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
    var sendDetails = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
    var fastestIndex = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
    var cheapestIndex = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
    fetch("/api/quotes/detail" + window.location.search + "&_token=" + id, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (json) {
      return json.json();
    }).then(function (value) {
      elementArray.value = value;
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_1__.watch)(elementArray, function () {
      if (elementArray.value.length == 0) return;
      var fastestValue = parseInt(elementArray.value[0].tbl_land_tariff_TT) + parseInt(elementArray.value[0].tbl_export_import_land_TT);
      var cheapestValue = elementArray.value[0].totalPrice;
      elementArray.value.forEach(function (val, i) {
        if (fastestValue > parseInt(val.tbl_land_tariff_TT) + parseInt(val.tbl_export_import_land_TT)) {
          fastestValue = parseInt(val.tbl_land_tariff_TT) + parseInt(val.tbl_export_import_land_TT);
          fastestIndex.value = i;
        }
        if (cheapestValue > val.totalPrice) {
          cheapestValue = val.totalPrice;
          cheapestIndex.value = i;
        }
      });
    });
    var mergeOptions = function mergeOptions(obj1, obj2) {
      var obj3 = {};
      for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
      }
      for (var _attrname in obj2) {
        obj3[_attrname] = obj2[_attrname];
      }
      return obj3;
    };
    var sendValues = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)(function () {
      var entries = Object.fromEntries(new URLSearchParams(location.search));
      return JSON.stringify(mergeOptions(entries, elementArray.value[selectedItem.value]));
    });
    var orderClick = function orderClick(varArray) {
      var orderBy = orderHashMap[varArray[1]];
      elementArray.value.sort(function (a, b) {
        if (a[orderBy] < b[orderBy]) return -1 * varArray[0].value;
        if (a[orderBy] > b[orderBy]) return 1 * varArray[0].value;
        return 0;
      });
    };
    return {
      elementArray: elementArray,
      selectedItem: selectedItem,
      isExport: isExport,
      sendDetails: sendDetails,
      sendValues: sendValues,
      headerArray: headerArray,
      selectedHeader: selectedHeader,
      orderClick: orderClick,
      pickup: pickup,
      fastestIndex: fastestIndex,
      cheapestIndex: cheapestIndex,
      id: id
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=template&id=2d39ac4c":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=template&id=2d39ac4c ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", {
    orderIndex: "1",
    onClick: _cache[0] || (_cache[0] = function () {
      return $setup.orderClick && $setup.orderClick.apply($setup, arguments);
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
      hidden: !$props.selected
    }),
    src: $setup.imageSrc
  }, null, 10 /* CLASS, PROPS */, _hoisted_1)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=template&id=54ec9572":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=template&id=54ec9572 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("picture", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("source", {
  "class": "background-image",
  srcset: "/images/quotesBack.webp",
  type: "../images/webp"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
  "class": "background-image",
  src: "/images/quotesBack.jpg"
})], -1 /* HOISTED */);
var _hoisted_2 = {
  "class": "pure-g"
};
var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "pure-u-1-24"
}, null, -1 /* HOISTED */);
var _hoisted_4 = {
  id: "mainSlide",
  "class": "pure-u-1 pure-u-md-22-24"
};
var _hoisted_5 = {
  "class": "pure-g"
};
var _hoisted_6 = {
  "class": "pure-u-1-1 main-table"
};
var _hoisted_7 = {
  cellpadding: "0",
  cellspacing: "0"
};
var _hoisted_8 = {
  id: "header"
};
var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* HOISTED */);
var _hoisted_10 = ["onClick"];
var _hoisted_11 = {
  key: 0
};
var _hoisted_12 = {
  key: 1
};
var _hoisted_13 = {
  key: 2
};
var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_15 = {
  key: 3
};
var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_17 = {
  key: 0
};
var _hoisted_18 = {
  key: 1
};
var _hoisted_19 = {
  "class": "pure-g center"
};
var _hoisted_20 = {
  "class": "pure-1-12"
};
var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "pure-g"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
  id: "deleteButton",
  href: "/"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
  id: "deleteImage",
  src: "/images/delete.svg"
})])], -1 /* HOISTED */);
var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "pure-u-1-24"
}, null, -1 /* HOISTED */);
var _hoisted_23 = {
  style: {
    "display": "none"
  }
};
var _hoisted_24 = {
  ref: "sendDetails",
  action: "/details",
  method: "POST"
};
var _hoisted_25 = ["value"];
var _hoisted_26 = ["value"];
var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
  name: "queryType",
  value: ""
}, null, -1 /* HOISTED */);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_HeaderLine = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("HeaderLine");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.headerArray, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_HeaderLine, {
      key: index,
      onHideClicks: function onHideClicks($event) {
        return $setup.orderClick($event), $setup.selectedHeader = index;
      },
      selected: index == $setup.selectedHeader
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)];
      }),
      _: 2 /* DYNAMIC */
    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onHideClicks", "selected"]);
  }), 128 /* KEYED_FRAGMENT */)), _hoisted_9])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.elementArray, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dataLine", {
        chosen: $setup.selectedItem == index
      }]),
      onClick: function onClick($event) {
        return $setup.selectedItem = index;
      },
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tbl_export_import_land_Operator_carrier), 1 /* TEXT */), $setup.isExport && $setup.pickup != '' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.pickup), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.isExport ? item.tbl_export_import_land_Departure_Port : item.tbl_export_import_land_Departure_Port), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.isExport ? item.tbl_export_import_land_Destination_Port : item.tbl_land_tariff_Destination_Port), 1 /* TEXT */), !$setup.isExport && $setup.pickup != '' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.pickup), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.isExport ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tbl_land_tariff_Via), 1 /* TEXT */), _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tbl_export_import_land_Via), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tbl_export_import_land_Via), 1 /* TEXT */), _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tbl_land_tariff_Via), 1 /* TEXT */)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.mode), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tbl_export_import_land_TT), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(parseInt(item.tbl_land_tariff_TT) + parseInt(item.tbl_export_import_land_TT)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.fullTaxes), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.fullFreightRate), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.totalPrice), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tbl_export_import_land_Currency), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [$setup.fastestIndex == index ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_17, "Fastest")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), $setup.cheapestIndex == index ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_18, "Cheapest")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 10 /* CLASS, PROPS */, _hoisted_10);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    id: "detailsButton",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $setup.sendDetails.submit();
    })
  }, "DETAILS")])]), _hoisted_21]), _hoisted_22]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    name: "_token",
    value: $setup.id
  }, null, 8 /* PROPS */, _hoisted_25), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    name: "data",
    value: $setup.sendValues
  }, null, 8 /* PROPS */, _hoisted_26), _hoisted_27], 512 /* NEED_PATCH */)])], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.hidden{\n\tvisibility:hidden;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n*{\n\tbox-sizing:border-box;\n}\n.main-table{\n\tmargin:auto;\n\ttext-align: center;\n\tpadding-bottom: 20px;\n\toverflow-x:auto;\n}\n#mainSlide{\n\tbackground-color: white;\n\tmargin:auto;\n\tborder-radius: 20px;\n\tposition: relative;\n\tbox-shadow: 10px 10px 58px 1px rgba(0,0,0,0.36);\n\tbottom:250px;\n\tpadding-top:20px;\n}\n#header th{\n\tcursor: pointer;\n\tpadding-bottom:10px;\n\tborder-bottom: 1px solid black;\n}\n#header th p{\n\tdisplay:inline-block;\n\tfont-size:calc(12px + 0.3vw);\n}\n#header th img{\n\tdisplay:inline-block;\n\twidth:20px;\n\theight:19px;\n\tposition: relative;\n\ttop:2px;\n}\n.main-table > table{\n\twidth:94%;\n\tmargin:auto;\n}\n.main-table > table th{\n\tpadding: 30px 0.7vw 0px 0.7vw;\n}\n.center{\n\tjustify-content: center;\n}\n.dataLine{\n\tcursor: pointer;\n}\n.dataLine td{\n\tpadding-top:20px;\n\tpadding-bottom:20px;\n}\n.dataLine:nth-child(even) td{\n\tbackground-color: #f3f3f3;\n}\n#detailsButton{\n\tcolor:white;\n\tborder:none;\n\tcursor: pointer;\n\tbackground-color: rgb(255, 182, 46);\n\tfont-weight: 100 !important;\n\tpadding: 15px 50px 15px 50px;\n\tborder-radius: 40px;\n\tmargin-left:20px;\n\tmargin-right:20px;\n\ttransition: background-color 0.8s ease;\n}\n#deleteButton{\n\tmargin-left:10px;\n\tmargin-bottom:10px;\n}\n#deleteImage{\n\twidth:50px;\n\theight:50px;\n\tbackground-color: rgb(255, 182, 46);\n\tborder-radius: 100px;\n}\n.chosen td{\n\tborder: 1px solid black;\n\tborder-left:0;\n\tborder-right:0;\n}\n.chosen td:first-child{\n\tborder-left: 1px solid black;\n\tborder-top-left-radius: 40px;\n\tborder-bottom-left-radius: 40px;\n}\n.chosen td:last-child{\n\tborder-top-right-radius: 40px;\n\tborder-bottom-right-radius: 40px;\n\tborder-right: 1px solid black;\n}\n\n/*Mobile navbar CSS*/\n#close{\n\tdisplay: flex;\n\tjustify-content: flex-end;\n}\n#close::after{\n\tcontent:none;\n}\n#closeImg{\n\tcursor: pointer;\n\theight:50px;\n}\n#mobileNavbar{\n\tposition: fixed;\n\twidth:0%;\n\theight:100vh;\n\tbackground-color: white;\n\tz-index: 1;\n\ttransition: width 0.7s ease;\n}\n.showMobile{\n\twidth:100% !important;\n}\n.showMobile p{\n\tpadding: 10px;\n}\n.navElement{\n\twidth:100%;\n\tfont-size: 2em;\n\toverflow: hidden;\n\ttext-align: center;\n\ttext-decoration: none;\n\tcolor:black;\n}\n.navElement p{\n\toverflow: hidden;\n}\n.navElement::after{\n\tdisplay:block;\n\tcontent:\"\";\n\twidth:20%;\n\tmargin:auto;\n\theight:1px;\n\tborder-bottom: 1px solid rgba(255, 182, 46,0.7);\n}\n.logo{\n\tdisplay:flex !important;\n\tjustify-content: center;\n\tflex: 1;\n}\n#hamburger{\n\tcursor: pointer;\n\tpadding:15px;\n}\n#hamburgerNav img{\n\theight: 80px;\n}\n#hamburgerNav{\n\tdisplay:none;\n\tposition: sticky;\n\ttop:0;\n\tbackground-color: white;\n\tz-index: 5;\n}\n#close{\n\tdisplay: flex;\n\tjustify-content: flex-end;\n}\n#closeImg{\n\tcursor: pointer;\n\theight:50px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_style_index_0_id_2d39ac4c_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_style_index_0_id_2d39ac4c_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_style_index_0_id_2d39ac4c_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_style_index_0_id_54ec9572_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_style_index_0_id_54ec9572_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_style_index_0_id_54ec9572_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/HeaderLine.vue":
/*!************************************************!*\
  !*** ./resources/js/components/HeaderLine.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HeaderLine_vue_vue_type_template_id_2d39ac4c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderLine.vue?vue&type=template&id=2d39ac4c */ "./resources/js/components/HeaderLine.vue?vue&type=template&id=2d39ac4c");
/* harmony import */ var _HeaderLine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderLine.vue?vue&type=script&lang=js */ "./resources/js/components/HeaderLine.vue?vue&type=script&lang=js");
/* harmony import */ var _HeaderLine_vue_vue_type_style_index_0_id_2d39ac4c_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css */ "./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_HeaderLine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HeaderLine_vue_vue_type_template_id_2d39ac4c__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/HeaderLine.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/QuotesDetail.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/QuotesDetail.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QuotesDetail_vue_vue_type_template_id_54ec9572__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuotesDetail.vue?vue&type=template&id=54ec9572 */ "./resources/js/views/QuotesDetail.vue?vue&type=template&id=54ec9572");
/* harmony import */ var _QuotesDetail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuotesDetail.vue?vue&type=script&lang=js */ "./resources/js/views/QuotesDetail.vue?vue&type=script&lang=js");
/* harmony import */ var _QuotesDetail_vue_vue_type_style_index_0_id_54ec9572_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css */ "./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_QuotesDetail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_QuotesDetail_vue_vue_type_template_id_54ec9572__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/QuotesDetail.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/HeaderLine.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./resources/js/components/HeaderLine.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HeaderLine.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/QuotesDetail.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/views/QuotesDetail.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuotesDetail.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/HeaderLine.vue?vue&type=template&id=2d39ac4c":
/*!******************************************************************************!*\
  !*** ./resources/js/components/HeaderLine.vue?vue&type=template&id=2d39ac4c ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_template_id_2d39ac4c__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_template_id_2d39ac4c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HeaderLine.vue?vue&type=template&id=2d39ac4c */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=template&id=2d39ac4c");


/***/ }),

/***/ "./resources/js/views/QuotesDetail.vue?vue&type=template&id=54ec9572":
/*!***************************************************************************!*\
  !*** ./resources/js/views/QuotesDetail.vue?vue&type=template&id=54ec9572 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_template_id_54ec9572__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_template_id_54ec9572__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuotesDetail.vue?vue&type=template&id=54ec9572 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=template&id=54ec9572");


/***/ }),

/***/ "./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HeaderLine_vue_vue_type_style_index_0_id_2d39ac4c_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HeaderLine.vue?vue&type=style&index=0&id=2d39ac4c&lang=css");


/***/ }),

/***/ "./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuotesDetail_vue_vue_type_style_index_0_id_54ec9572_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/QuotesDetail.vue?vue&type=style&index=0&id=54ec9572&lang=css");


/***/ })

}]);