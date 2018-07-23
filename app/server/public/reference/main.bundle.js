webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    list-style: none;\n    padding: 0;\n}\n\nli {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    margin: 5px;\n}\n\na {\n    text-decoration: none;\n    color: black;\n    padding: 5px 10px;\n    border: 1px solid black;\n}\n\n.active {\n    background-color: black;\n    color: white;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!loggedIn\">\n    <h2>Login</h2>\n    <p>Username: <input [formControl]=\"userControl\" type=\"text\"></p>\n    <p>Password: <input [formControl]=\"passControl\" type=\"password\"></p>\n    <button (click)=\"logIn()\">Login</button>\n</div>\n\n<div *ngIf=\"loggedIn\">\n    <h2>Logged in as: {{username}}\n    <button (click)=\"logOut()\">Logout</button>\n    </h2>\n    <p>\n        Select event: \n        <select (change)=\"changeEvent($event.target.value)\" [formControl]=\"eventControl\">\n            <option disabled>Select an event</option>\n            <option *ngFor=\"let event of events\" [value]=\"event._id\">{{event.title}}</option>\n        </select>\n        <button (click)=\"setMode('add')\">New Event</button>\n        <button *ngIf=\"selectedEvent\" (click)=\"setMode('update')\">Edit Event</button>\n        <button *ngIf=\"selectedEvent\"(click)=\"deleteEvent()\">Delete Event</button>\n    </p>\n\n    <div *ngIf=\"editMode\">\n        <p>Title: <input [formControl]=\"titleControl\" type=\"text\"></p>\n        <p>Date: <input [formControl]=\"dateControl\" type=\"date\"></p>\n        <p>Location: <input [formControl]=\"locationControl\" type=\"text\"></p>\n        <p>Information: <input [formControl]=\"informationControl\" type=\"text\"></p>\n        <button (click)=\"saveEvent()\">Save</button>\n        <button (click)=\"cancelEdit()\">Cancel</button>\n    </div> \n    <div *ngIf=\"selectedEvent\">\n        <app-event-info [event]=\"selectedEvent\"></app-event-info>\n        <app-moderators [event]=\"selectedEvent\"></app-moderators>\n        <app-attendance [attendees]=\"selectedEvent.attendees\" [participants]=\"selectedEvent.participants\"></app-attendance>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_service__ = __webpack_require__("../../../../../src/app/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validation_service__ = __webpack_require__("../../../../../src/app/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_service__ = __webpack_require__("../../../../../src/app/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(eventService, validationService, userService) {
        this.eventService = eventService;
        this.validationService = validationService;
        this.userService = userService;
        this.events = [];
        this.loggedIn = false;
        this.userControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
        this.passControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
        this.eventControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
        this.titleControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
        this.dateControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
        this.locationControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
        this.informationControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
    }
    AppComponent.prototype.changeEvent = function ($event) {
        this.selectedEvent = this.events.find(function (event) { return event._id === $event; });
    };
    AppComponent.prototype.logIn = function () {
        var _this = this;
        this.validationService.validateUser(this.userControl.value, this.passControl.value)
            .then(function (res) {
            if (res.authenticated) {
                _this.eventService.getEvents(_this.userControl.value)
                    .then(function (res) {
                    _this.events = res;
                    if (_this.events.length > 0) {
                        _this.eventControl.setValue(_this.events[0]._id);
                        _this.selectedEvent = _this.events[0];
                    }
                })
                    .catch(function () { return alert('Unable to connect to server.'); });
                _this.username = _this.userControl.value;
                _this.password = _this.passControl.value;
                _this.userControl.reset();
                _this.passControl.reset();
                _this.loggedIn = true;
            }
            else {
                alert('Invalid username or password.');
            }
        })
            .catch(function (err) {
            alert('Server error, please try again.');
        });
    };
    AppComponent.prototype.logOut = function () {
        this.loggedIn = false;
        this.username = null;
        this.password = null;
        this.events = [];
        this.selectedEvent = null;
    };
    AppComponent.prototype.resetFields = function () {
        this.titleControl.reset();
        this.dateControl.reset();
        this.locationControl.reset();
        this.informationControl.reset();
    };
    AppComponent.prototype.cancelEdit = function () {
        this.editMode = null;
    };
    AppComponent.prototype.saveEvent = function () {
        var _this = this;
        // Validations
        if (this.dateControl.value === null) {
            alert('Please pick a date.');
            return;
        }
        var today = new Date();
        var other = new Date(this.dateControl.value);
        today = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
        if (other.getTime() < today.getTime()) {
            alert('Date cannot be in the past.');
            return;
        }
        var e = {
            title: this.titleControl.value,
            date: new Date(new Date(this.dateControl.value).setHours(24)),
            location: this.locationControl.value,
            information: this.informationControl.value
        };
        if (this.editMode === 'add') {
            e['creator'] = this.username;
            this.eventService.addEvent(e)
                .then(function (res) {
                if (res.success) {
                    _this.resetFields();
                    _this.events.push(res.data);
                    _this.eventControl.setValue(res.data._id);
                    _this.selectedEvent = res.data;
                    _this.editMode = null;
                }
                else {
                    alert('Missing fields');
                }
            });
        }
        else if (this.editMode === 'update') {
            this.eventService.updateEvent(this.selectedEvent._id, e)
                .then(function (res) {
                if (res.success) {
                    _this.events.some(function (event) {
                        if (event._id === _this.selectedEvent._id) {
                            Object.assign(event, e);
                            _this.selectedEvent = event;
                            return true;
                        }
                        return false;
                    });
                    _this.editMode = null;
                }
            });
        }
    };
    AppComponent.prototype.deleteEvent = function () {
        var _this = this;
        if (confirm('Are you sure you want to delete event: ' + this.selectedEvent.title + '?')) {
            this.eventService.removeEvent(this.selectedEvent._id)
                .then(function (res) {
                if (res.success) {
                    var index = _this.events.findIndex(function (event) { return event._id === _this.selectedEvent._id; });
                    if (index != -1) {
                        _this.events.splice(index, 1);
                    }
                    if (_this.events.length > 0) {
                        _this.eventControl.setValue(_this.events[0]._id);
                        _this.selectedEvent = _this.events[0];
                    }
                    else {
                        _this.selectedEvent = null;
                    }
                }
            });
        }
    };
    AppComponent.prototype.setMode = function (mode) {
        this.editMode = mode;
        if (mode === 'update') {
            this.titleControl.setValue(this.selectedEvent.title);
            this.dateControl.setValue(new Date(this.selectedEvent.date).toISOString().substr(0, 10));
            this.locationControl.setValue(this.selectedEvent.location);
            this.informationControl.setValue(this.selectedEvent.information);
        }
        else {
            this.resetFields();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__event_service__["a" /* EventService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__validation_service__["a" /* ValidationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__validation_service__["a" /* ValidationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_qrcode__ = __webpack_require__("../../../../angular2-qrcode/lib/angular2-qrcode.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__attendance_attendance_component__ = __webpack_require__("../../../../../src/app/attendance/attendance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__moderators_moderators_component__ = __webpack_require__("../../../../../src/app/moderators/moderators.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_service__ = __webpack_require__("../../../../../src/app/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__validation_service__ = __webpack_require__("../../../../../src/app/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__event_service__ = __webpack_require__("../../../../../src/app/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__event_info_event_info_component__ = __webpack_require__("../../../../../src/app/event-info/event-info.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var appRoutes = [
    { path: '', redirectTo: '/', pathMatch: 'full' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__attendance_attendance_component__["a" /* AttendanceComponent */],
            __WEBPACK_IMPORTED_MODULE_7__moderators_moderators_component__["a" /* ModeratorsComponent */],
            __WEBPACK_IMPORTED_MODULE_12__event_info_event_info_component__["a" /* EventInfoComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_angular2_qrcode__["a" /* QRCodeModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_10__event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_9__validation_service__["a" /* ValidationService */], __WEBPACK_IMPORTED_MODULE_8__user_service__["a" /* UserService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/attendance/attendance.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/attendance/attendance.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Attendance</h1>\n\n<h2>Participants</h2>\n<ol>\n    <li *ngFor=\"let participant of participants\">{{participant}}</li>\n</ol>\n\n<h2>Attendees</h2>\n<ol>\n    <li *ngFor=\"let attendee of attendees\">{{attendee}}</li>\n</ol>"

/***/ }),

/***/ "../../../../../src/app/attendance/attendance.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttendanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AttendanceComponent = (function () {
    function AttendanceComponent() {
    }
    AttendanceComponent.prototype.ngOnInit = function () {
    };
    return AttendanceComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], AttendanceComponent.prototype, "participants", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], AttendanceComponent.prototype, "attendees", void 0);
AttendanceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-attendance',
        template: __webpack_require__("../../../../../src/app/attendance/attendance.component.html"),
        styles: [__webpack_require__("../../../../../src/app/attendance/attendance.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AttendanceComponent);

//# sourceMappingURL=attendance.component.js.map

/***/ }),

/***/ "../../../../../src/app/event-info/event-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/event-info/event-info.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Event Info\r\n</h2>\r\n<p><span>Title:</span> {{event.title}}</p>\r\n<p><span>Date:</span> {{event.date | date}}</p>\r\n<p><span>Location:</span> {{event.location}}</p>\r\n<p><span>Information:</span> {{event.information}}</p>\r\n<div>\r\n<qr-code [value]=\"event._id\" [size]=\"150\"></qr-code>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/event-info/event-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventInfoComponent = (function () {
    function EventInfoComponent() {
    }
    EventInfoComponent.prototype.ngOnInit = function () {
    };
    return EventInfoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], EventInfoComponent.prototype, "event", void 0);
EventInfoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-event-info',
        template: __webpack_require__("../../../../../src/app/event-info/event-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/event-info/event-info.component.css")]
    }),
    __metadata("design:paramtypes", [])
], EventInfoComponent);

//# sourceMappingURL=event-info.component.js.map

/***/ }),

/***/ "../../../../../src/app/event.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventService = (function () {
    function EventService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + 'api/events';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    EventService.prototype.getEvents = function (creator) {
        return this.http
            .get(this.url + '?creator=' + creator)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    EventService.prototype.addEvent = function (event) {
        return this.http
            .post(this.url, JSON.stringify(event), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    EventService.prototype.updateEvent = function (eventId, event) {
        return this.http
            .put(this.url + '/' + eventId, JSON.stringify(event), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    EventService.prototype.removeEvent = function (eventId) {
        return this.http
            .delete(this.url + '/' + eventId)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    EventService.prototype.addModerator = function (eventId, moderator) {
        return this.http
            .post(this.url + '/' + eventId + '/moderators', JSON.stringify({ username: moderator }), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    EventService.prototype.removeModerator = function (eventId, moderator) {
        return this.http
            .delete(this.url + '/' + eventId + '/moderators/' + moderator)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    return EventService;
}());
EventService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], EventService);

var _a;
//# sourceMappingURL=event.service.js.map

/***/ }),

/***/ "../../../../../src/app/moderators/moderators.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/moderators/moderators.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Moderators</h1>\n<p>Add Moderator:</p> <input [formControl]=\"modControl\" type=\"text\"> <button (click)=\"addModerator()\">Add</button>\n\n<h2>Current Moderators:</h2>\n<ul>\n<li *ngFor=\"let moderator of event.moderators\">{{moderator}} <button (click)=\"removeModerator(moderator)\">x</button></li>\n</ul>"

/***/ }),

/***/ "../../../../../src/app/moderators/moderators.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModeratorsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_service__ = __webpack_require__("../../../../../src/app/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__("../../../../../src/app/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModeratorsComponent = (function () {
    function ModeratorsComponent(eventService, userService) {
        this.eventService = eventService;
        this.userService = userService;
        this.modControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]();
    }
    ModeratorsComponent.prototype.ngOnInit = function () {
    };
    ModeratorsComponent.prototype.addModerator = function () {
        var _this = this;
        // add moderator to participants
        if (this.modControl.value == null || this.modControl.value === '') {
            alert('Please enter moderator username');
            return;
        }
        if (this.modControl.value === this.event.creator) {
            alert('Cannot add yourself as a moderator');
            return;
        }
        if (this.event.moderators.some(function (mod) { return mod === _this.modControl.value; })) {
            alert('Moderator already exists!');
            return;
        }
        this.userService.userExists(this.modControl.value)
            .then(function (res) {
            if (res._id === null) {
                alert('Username does not exist!');
            }
            else {
                _this.eventService.addModerator(_this.event._id, _this.modControl.value)
                    .then(function (res) {
                    if (res.success) {
                        _this.event.moderators.push(_this.modControl.value);
                        if (!_this.event.participants.find(function (user) { return user === _this.modControl.value; })) {
                            _this.event.participants.push(_this.modControl.value);
                            _this.event.attendees.push(_this.modControl.value);
                        }
                        _this.modControl.reset();
                    }
                });
            }
        })
            .catch(function (err) {
            alert('Username does not exist!');
        });
    };
    ModeratorsComponent.prototype.removeModerator = function (moderator) {
        var _this = this;
        this.eventService.removeModerator(this.event._id, moderator)
            .then(function (res) {
            if (res.success) {
                var index = _this.event.moderators.indexOf(moderator);
                if (index != -1) {
                    _this.event.moderators.splice(index, 1);
                }
            }
        });
    };
    return ModeratorsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ModeratorsComponent.prototype, "event", void 0);
ModeratorsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-moderators',
        template: __webpack_require__("../../../../../src/app/moderators/moderators.component.html"),
        styles: [__webpack_require__("../../../../../src/app/moderators/moderators.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__event_service__["a" /* EventService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === "function" && _b || Object])
], ModeratorsComponent);

var _a, _b;
//# sourceMappingURL=moderators.component.js.map

/***/ }),

/***/ "../../../../../src/app/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + 'api/users';
    }
    UserService.prototype.userExists = function (username) {
        return this.http
            .get(this.url + "/" + username)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/validation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ValidationService = (function () {
    function ValidationService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + 'api/loginvalidation';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    ValidationService.prototype.validateUser = function (username, password) {
        return this.http
            .post(this.url + '/login', JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    return ValidationService;
}());
ValidationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ValidationService);

var _a;
//# sourceMappingURL=validation.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    apiUrl: 'https://event-organization-app.herokuapp.com/'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map