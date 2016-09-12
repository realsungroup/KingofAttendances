var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
baseUrl = "http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?uiver=200&dynlogin=1";
getMethod = "ShowHostTableDatas_Ajax";
saveMethod = "SaveData_Ajax";
var baseObjectC = (function () {
    function baseObjectC() {
    }
    return baseObjectC;
}());
var LineManage = (function (_super) {
    __extends(LineManage, _super);
    function LineManage() {
        _super.apply(this, arguments);
    }
    return LineManage;
}(baseObjectC));
var Majordomo = (function (_super) {
    __extends(Majordomo, _super);
    function Majordomo() {
        _super.apply(this, arguments);
    }
    return Majordomo;
}(baseObjectC));
var ShiftrptofMajordomo = (function () {
    function ShiftrptofMajordomo(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    ShiftrptofMajordomo.prototype.start = function () {
        var _this = this;
        var jsonString = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toLocaleTimeString(); }, 500);
    };
    ShiftrptofMajordomo.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    ShiftrptofMajordomo.prototype.appendLineManage = function (parentelement, panelid, data, mini, dbs) {
        var aLineManage = new LineManage();
        aLineManage = data[0];
        this.mini_control = document.createElement('div');
        this.mini_control.id = panelid;
        if (data[0].C3_526393969049 == "Y") {
            this.mini_control.className = "mini-panel mini-panel-danger";
        }
        else {
            this.mini_control.className = "mini-panel mini-panel-success";
        }
        this.mini_control.title = data[0].C3_525699725094 + "排班" + data[0].C3_525716987383 + "人 " + " 排班" + data[0].C3_526578576195 + "小时";
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({ "width": "auto", "buttons": "collapse ", "expanded": false, "onbuttonclick": "onbuttonclick" });
        aPanel.set({ "height": "auto" });
        aPanel.load("./dist/component/shiftrptofmajordomo-weekform.html", function () {
            var iFrame = aPanel.getIFrameEl();
            var ucode = getQueryString('ucode');
            var user = getQueryString('user');
            iFrame.contentWindow.SetData(data, dbs);
        }, null);
    };
    ShiftrptofMajordomo.prototype.appendMajordomo = function (parentelement, data, subdata, mini, dbs) {
        var aMajordomo = new Majordomo();
        aMajordomo = data[0];
        this.mini_control = document.createElement('div');
        this.mini_control.id = "majordomo";
        this.mini_control.className = "mini-panel mini-panel-success";
        var yearmonth = aMajordomo.C3_526389709184;
        var dates = (aMajordomo.C3_526389708966);
        var startDate = new Date(dates.substr(0, 4) + '-' + dates.substr(4, 2) + '-' + dates.substr(6, 2));
        var title = dates + "日产线排班整体情况";
        this.mini_control.title = title;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aMajordomoPanel = mini.get("majordomo");
        aMajordomoPanel.set({ "width": "auto", "showCollapseButton": "true" });
        aMajordomoPanel.set({ "height": "400px" });
        aMajordomoPanel.load("./dist/component/shiftmajordomo.html", function () {
            var iFrame = aMajordomoPanel.getIFrameEl();
            var ucode = getQueryString('ucode');
            var user = getQueryString('user');
            iFrame.contentWindow.SetData(data, dbs);
        }, null);
    };
    return ShiftrptofMajordomo;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new ShiftrptofMajordomo(el);
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var resid = 526418740112;
    var subresid = 525699610587;
    var cmswhere = "C3_526389708467=27647";
    shiftPanel.start();
    var url;
    mini.parse();
    dbs.dbGetdata(resid, subresid, cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        shiftPanel.appendMajordomo(datagrids, data, subdata, mini, dbs);
        $.each(subdata, function (i, item) {
            var row = [];
            row.push(item);
            shiftPanel.appendLineManage(datagrids, "dynamicgrid" + i.toString(), row, mini, dbs);
        });
    }
    function fnerror(data) {
        alert(data.message);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) { alert(jqXHR.responseText); }
};