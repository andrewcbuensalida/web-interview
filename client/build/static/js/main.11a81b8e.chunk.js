(this["webpackJsonpweb-interview"]=this["webpackJsonpweb-interview"]||[]).push([[0],{23:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n(17),c=n(9),i=n(2),r=n(5),o=n(6),l=n(8),d=n(7),p=n(12),h=(n(23),n(0)),u=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={isOpened:!1},s.handleOpen=s.handleOpen.bind(Object(p.a)(s)),s}return Object(o.a)(n,[{key:"handleOpen",value:function(){console.log("This is this.state.handleOpen"),console.log(this.state.handleOpen),this.setState({isOpened:!this.state.isOpened})}},{key:"render",value:function(){return Object(h.jsxs)("nav",{className:"navContainer",children:[Object(h.jsx)("div",{className:"navBlock"}),Object(h.jsxs)("ul",{className:"nav2 ".concat(this.state.isOpened&&"opened"),children:[Object(h.jsx)("div",{className:"icon",onClick:this.handleOpen,children:Object(h.jsx)("i",{className:"fa fa-2x fa-chevron-right"})}),Object(h.jsx)(c.b,{to:"/scheduledappointments",children:Object(h.jsx)("li",{className:"scheduledNav",children:"Scheduled appointments"})}),Object(h.jsx)(c.b,{to:"/createappointment",children:Object(h.jsx)("li",{className:"createNav",children:"Create an appointment"})})]})]})}}]),n}(s.Component),j=n.p+"static/media/logo.1583679e.png",m=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(h.jsxs)("div",{style:{maxWidth:600,margin:"8px auto",padding:"0 1em"},children:[Object(h.jsxs)("div",{className:"app-header",children:[Object(h.jsx)(u,{}),Object(h.jsx)("img",{src:j,className:"app-logo",alt:"Babylon Health"})]}),Object(h.jsx)(i.a,{})]})}}]),n}(s.Component),b=m,O=n(4),f=n(13),v=n(10),x=n.n(v),y=n(11),g=n.n(y),T=n(15),C="/api/v1",N=(n(27),function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={user:{},selectedConsultantType:"gp",availableSlots:[],selectedDateTime:"",selectedAppointmentType:"",notes:"",bookingSaved:!1},s}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(C,"/availableSlots")).then((function(e){return e.json()})).then((function(t){e.setState({availableSlots:t})})).catch((function(){})),fetch("".concat(C,"/users/1")).then((function(e){return e.json()})).then((function(t){e.setState({user:t})})).catch((function(){}))}},{key:"handleSelectConsultantType",value:function(e){this.setState({selectedConsultantType:e.target.innerText.toLowerCase()})}},{key:"handleSubmit",value:function(){var e=Object(f.a)(x.a.mark((function e(){var t,n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.state.user||(t=!0,document.getElementById("userError").style.display="inline"),this.state.selectedConsultantType||(t=!0,document.getElementById("consultantError").style.display="inline"),this.state.selectedDateTime||(t=!0,document.getElementById("dateTimeError").style.display="inline"),this.state.selectedAppointmentType||(t=!0,document.getElementById("appointmentError").style.display="inline"),t&&(document.getElementById("generalError").style.display="inline",this.setState({bookingSaved:!1})),t){e.next=25;break}return e.prev=6,e.next=9,fetch("".concat(C,"/appointments"),{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({notes:this.state.notes,userId:this.state.user.id,consultantType:this.state.selectedConsultantType+" appointment",appointmentType:this.state.selectedAppointmentType,dateTime:this.state.selectedDateTime})});case 9:return n=e.sent,e.next=12,n.json();case 12:e.sent,this.setState({selectedDateTime:"",selectedAppointmentType:"",notes:"",bookingSaved:!0}),document.getElementById("generalError").style.display="none",document.getElementById("userError").style.display="none",document.getElementById("consultantError").style.display="none",document.getElementById("dateTimeError").style.display="none",document.getElementById("appointmentError").style.display="none",e.next=25;break;case 21:e.prev=21,e.t0=e.catch(6),console.log("This is err"),console.log(e.t0);case 25:case"end":return e.stop()}}),e,this,[[6,21]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){for(var e=this,t=[],n=0;n<this.state.availableSlots.length;n++)for(var s=0;s<this.state.availableSlots[n].consultantType.length;s++)this.state.availableSlots[n].consultantType[s]===this.state.selectedConsultantType&&t.push(this.state.availableSlots[n]);var a={};t.forEach((function(e){a[e.time.slice(0,-14)]||(a[e.time.slice(0,-14)]=[]),a[e.time.slice(0,-14)].push(e)}));var c=[];this.state.availableSlots.forEach((function(e){e.consultantType.forEach((function(e){c.includes(e)||c.push(e)}))}));var i=[];return this.state.availableSlots.forEach((function(e){e.appointmentType.forEach((function(e){i.includes(e)||i.push(e)}))})),Object(h.jsxs)("main",{children:[Object(h.jsx)("h1",{children:"Create Appointment"}),Object(h.jsxs)("div",{className:"user",children:[Object(h.jsx)("img",{src:this.state.user.avatar}),this.state.user.firstName," ",this.state.user.lastName,Object(h.jsx)("span",{id:"userError",children:"Please Log In"})]}),Object(h.jsxs)("div",{className:"fadeContainer",children:[Object(h.jsxs)("h3",{children:[Object(h.jsx)("i",{className:"fas fa-stethoscope fa-lg"}),"Consultant Type ",Object(h.jsx)("span",{id:"consultantError",children:"Please select a consultant type"})]}),Object(h.jsx)("div",{className:"fade"}),Object(h.jsx)(T.a,{className:"optionsContainer",children:c.map((function(t){return Object(h.jsx)("div",{className:"button ".concat(e.state.selectedConsultantType===t&&"selected"),onClick:function(t){return e.handleSelectConsultantType(t)},tabIndex:"0",children:"gp"===t?"GP":t.charAt(0).toUpperCase()+t.slice(1)},t)}))})]}),Object(h.jsxs)("div",{children:[Object(h.jsxs)("h3",{children:[Object(h.jsx)("span",{children:Object(h.jsx)("i",{className:"far fa-clock fa-lg"})}),"Date and Time ",Object(h.jsx)("span",{id:"dateTimeError",children:"Please select a time slot"})]}),Object.entries(a).map((function(t){var n=Object(O.a)(t,2),s=n[0],a=n[1];return Object(h.jsxs)("div",{className:"fadeContainer",children:[Object(h.jsxs)("div",{className:"date",children:[" ",g()(s).format("MMM D[:]")]}),Object(h.jsx)("div",{className:"fade"}),Object(h.jsx)(T.a,{className:"optionsContainer",children:a.map((function(t,n){var s;return t.time!==(null===(s=a[n-1])||void 0===s?void 0:s.time)&&Object(h.jsx)("li",{className:"button ".concat(e.state.selectedDateTime===t.time&&"selected"),onClick:function(){e.setState({selectedDateTime:t.time})},children:g()(t.time).format("hh:mm a")},t.id)}))})]},s)}))]}),Object(h.jsxs)("div",{className:"fadeContainer",children:[Object(h.jsxs)("h3",{children:[Object(h.jsx)("span",{children:Object(h.jsx)("i",{className:"fas fa-video fa-lg"})}),"Appointment Type ",Object(h.jsx)("span",{id:"appointmentError",children:"Please select an appointment type"})]})," ",Object(h.jsx)("div",{className:"fade"}),Object(h.jsxs)(T.a,{className:"optionsContainer",children:[i.map((function(t){return Object(h.jsx)("div",{className:"button ".concat(e.state.selectedAppointmentType===t&&"selected"),onClick:function(n){return e.setState({selectedAppointmentType:t})},children:t.charAt(0).toUpperCase()+t.slice(1)},t)}))," "]})]}),Object(h.jsxs)("div",{children:[Object(h.jsxs)("h3",{children:[Object(h.jsx)("span",{children:Object(h.jsx)("i",{className:"fas fa-pencil-alt fa-lg"})}),"Notes"]}),Object(h.jsx)("textarea",{placeholder:"Describe your symptoms",value:this.state.notes,onChange:function(t){return e.setState({notes:t.target.value})}})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{className:"button book",onClick:function(){e.handleSubmit()},children:"Book"}),Object(h.jsx)("span",{id:"generalError",children:"Please fill missing information"}),this.state.bookingSaved&&Object(h.jsx)("span",{id:"savedMessage",children:"Booking saved!"})]})]})}}]),n}(s.Component)),S=N,E=(n(28),function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={appointments:null},s}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(C,"/appointments")).then((function(e){return e.json()})).then((function(t){e.setState({appointments:t})})).catch((function(e){}))}},{key:"handleCancel",value:function(){var e=Object(f.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(C,"/appointments"),{method:"DELETE",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({appointmentId:t})});case 3:e.sent,this.setState({appointments:this.state.appointments.filter((function(e){return e.id!==t}))}),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t=this;return Object(h.jsxs)("main",{children:[Object(h.jsx)("h1",{children:"Scheduled Appointments"}),null===(e=this.state.appointments)||void 0===e?void 0:e.map((function(e){return Object(h.jsxs)("div",{className:"ScheduledAppointments__appointment",children:["Date:",g()(e.dateTime).format("hh:mma MMM D[,] YYYY"),Object(h.jsx)("br",{}),"Consultant type:",e.consultantType,Object(h.jsx)("br",{}),"Appointment type:",e.appointmentType,Object(h.jsx)("br",{}),"Notes: ",e.notes,Object(h.jsx)("br",{}),Object(h.jsx)("button",{className:"Scheduled__cancel",onClick:function(){return t.handleCancel(e.id)},children:"Cancel"})]},e.id)}))]})}}]),n}(s.Component)),k=E;Object(a.render)(Object(h.jsx)(c.a,{children:Object(h.jsx)(i.d,{children:Object(h.jsxs)(i.b,{path:"/",element:Object(h.jsx)(b,{}),children:[Object(h.jsx)(i.b,{path:"createappointment",element:Object(h.jsx)(S,{})}),Object(h.jsx)(i.b,{path:"scheduledappointments",element:Object(h.jsx)(k,{})}),Object(h.jsx)(i.b,{path:"*",element:Object(h.jsx)("main",{style:{padding:"1rem"},children:Object(h.jsx)("p",{children:"There's nothing here!"})})})]})})}),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.11a81b8e.chunk.js.map