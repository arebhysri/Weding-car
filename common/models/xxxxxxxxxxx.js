'use strict';
var axios =  require('axios');
var app = require('../../server/server');

var async = require('async');
var bunyan = require('bunyan');
var moment = require('moment');

module.exports = function(employee) {
  employee.logsuccess = function (username, password, cb) {
    const bcrypt = require('bcrypt');

    const hashedPassword = bcrypt.hashSync(password, 10);
    var filter = { include: ['employee', 'leavetype', 'userRole', 'department'], fields: ['id', 'username', 'password', 'access_token', 'role_id', 'first_time', 'f_name', 'l_name', 'profile_img', 'department_id'], where: { and: [{ username: username }, { password: hashedPassword }, { status: 1 }] } };

    employee.find(filter, function (err, employee) {
      var returnEle = {};

      var success = false;
      var returnArray = [];

      if (employee.length == 1) {
        var emp = employee.pop();
        /*emp = emp.toJSON();*/

        returnEle['success'] = true;
        /* returnEle['id'] = emp.id;*/
        returnEle['f_name'] = emp.f_name;
        returnEle['l_name'] = emp.l_name;
        returnEle['role_id'] = emp.role_id;
        returnEle['profile_img'] = emp.profile_img;
        returnEle['department_id'] = emp.department_id;
        returnEle['first_time'] = emp.first_time;
        /*  returnEle['roleName'] =emp.userRole;*/

        /*            var cookieBits = employee.headers.match(/access_token=s%(+token+)/); */
        console.log(emp.id, emp.f_name, emp.l_name, emp.role_id, emp.password, emp.username, );
        employee.updateAll({ id: emp.id }, function (err, info) {
          cb(null, returnEle);
        });
        // cb(null,returnArray);
      } else {
        returnEle['success'] = false;

        returnArray.push(returnEle);
        cb(null, returnArray);
      }
    });
  };
  employee.remoteMethod('logsuccess', {
    accepts: [{
      arg: 'username',
      type: 'string',
      required: true,
    }, {
      arg: 'password',
      type: 'string',
      required: true,
    }],
    'http': { 'verb': 'post', 'path': '/logsuccess' },
    returns: { arg: 'employees', type: 'Array' },
  });
  employee.manageemployees = function(cb) {
    var log = bunyan.createLogger({
      name: 'leaveServer-logger', streams: [
        {
          level: 'info',
          path: './log/info/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        },
        {
          level: 'error',
          path: './log/error/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        }],
      serializers: {err: bunyan.stdSerializers.err},
    });
    log.info({
      type: 'info',
      time: moment().format('YYYY-MM-DD HH:mm').toString(),
      model: 'employee',
      method: 'manageemployee',
    }, 'manageemployee data - request');

    var filter = {
      include: ['department', 'userRole', {
        relation: 'createdby',
        scope: {
          fields: ['f_name', 'l_name']
        }
      }, {
        relation: 'modifiedby',
        scope: {
          fields: ['f_name', 'l_name']
        }
      }],
      fields: ['f_name', 'l_name', 'emp_no', 'role_id', 'created_by', 'modified_by', 'department_id', 'id', 'status'],
      where: {
        status: 1
      },
      order: 'f_name ASC'
    };

    //   var filter = { include: ['department', 'userRole','createdby', 'modifiedby']};
    employee.find(filter, function(err, employees) {
      var returnArray = [];
      var returnEle;

      employees.forEach(emp => {
        emp = emp.toJSON();
        // console.log(JSON.stringify(emp));
        returnEle = {};
        returnEle['name'] = emp.f_name + ' ' + emp.l_name;
        returnEle['emp_no'] = emp.emp_no;
        if (emp.department_id != null) {
          returnEle['department'] = emp.department.name;
        }        else            {
          returnEle['department'] = null;
        }
        if (emp.created_by != null) {
          returnEle['created_by'] = emp.createdby.f_name;
        }          else          {
          returnEle['created_by'] = null;
        }
        if (emp.modified_by != null) {
          returnEle['modified_by'] = emp.modifiedby.f_name + ' ' + emp.modifiedby.l_name;
        }          else {
          returnEle['modified_by'] = null;
        }
        returnEle['emp_type'] = emp.userRole.name;
        returnEle['id'] = emp.id;
        returnArray.push(returnEle);
      });
      // var emp = employees[0];
      if (err !== null) {
        log.error({
          type: 'error',
          model: 'employee',
          time: moment().format('YYYY-MM-DD HH:mm').toString(),
          method: 'manageemployee',
          err: err,
        }, 'manageemployee data - failed');
      } else {
        log.info({
          type: 'info',
          time: moment().format('YYYY-MM-DD HH:mm').toString(),
          model: 'employee',
          method: 'manageemployee',
        }, 'manageemployee data - success');
      }
      cb(null, returnArray);
    });
  };

  employee.remoteMethod('manageemployees', {
        // accepts: {arg: 'id', type: 'number', required: false},
    'http': {'verb': 'get', 'path': '/manageemp'},
    returns: {arg: 'employees', type: 'Array'},
    description: 'This is used for retrive data for the managae employee',
  });
  /*
  *developping the remote method for the View all profile
  */
  employee.viewAllProf = function(cb) {
    var log = bunyan.createLogger({
      name: 'leaveServer-logger', streams: [
        {
          level: 'info',
          path: './log/info/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        },
        {
          level: 'error',
          path: './log/error/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        }],
      serializers: {err: bunyan.stdSerializers.err},
    });
    log.info({
      type: 'info',
      time: moment().format('YYYY-MM-DD HH:mm').toString(),
      model: 'employee',
      method: 'viewAllProfile',
    }, 'viewAllProfile - request');
    var mainFilter = {
      fields: ['f_name', 'l_name', 'id'],
      where: {
        status: 1
      },
      order: 'f_name ASC'
    };

    var cEmp = null;
    employee.find(mainFilter, function(err, employees) {
      employee.count(mainFilter, function(error, count) {
        cEmp = count;
      });
      var returnArray = [];
      var returnEle;
      var leaveDetails = app.models.leaveDetails;

      // employees.forEach(emp=>{
      async.eachOf(employees, function(emp, index, acb) {
        // console.log('begining of the for each');
        returnEle = {};
        // returnEle['name'] = emp.f_name + ' ' + emp.l_name;
        // var anual = 0, casual = 0, medical = 0;
        // returnEle['anual'] = 0;
        // returnEle['anual'] = null;
        // returnEle['casual'] = null;
        // returnEle['medical'] = null;

        async.parallel({

          anual: function(pcb) {
            leaveDetails.dayCount(emp.id, 3, true, pcb);
          },

          casual: function(pcb) {
            leaveDetails.dayCount(emp.id, 1, true, pcb);
          },

          medical: function(pcb) {
            leaveDetails.dayCount(emp.id, 2, true, pcb);
          },
          no_pay: function(pcb) {
            leaveDetails.dayCount(emp.id, 8, true, pcb);
          },
         /*  special: function(pcb) {
            leaveDetails.count(
              {
                user_id: emp.id,
                leave_type: {inq: [4, 5, 6, 7]},
              }
              , pcb);
          }, */
          special: function (pcb) {
            leaveDetails.dayCount(emp.id,{inq:[4,5,6,7]},true , pcb);
          },
        }, function(err, result) {
          // final parallel callback, when all parallel count are finished
          if (err || !result) {
            return acb(err || true);
            log.error({
              type: 'error',
              time: moment().format('YYYY-MM-DD HH:mm').toString(),
              model: 'employee',
              method: 'viewAllProfile',
              err: err,
            }, 'viewAllProfile - failed');
          } else {
            result.name = emp.f_name + ' ' + emp.l_name;
            result.id = emp.id;

            // here result contains the 3 count in result["field1"], result["field2"] and result["field3"]

            returnArray.push(result);

            return acb(null);
          }
        });
        // returnArray.push(returnEle);
        // console.log(JSON.stringify(returnArray));
      }, function(err) {
        // final async.each of callback when all modules are proceed
        if (err) {
          log.error({
            type: 'error',
            time: moment().format('YYYY-MM-DD HH:mm').toString(),
            model: 'employee',
            method: 'viewAllProfile',
            err: err,
          }, 'viewAllProfile - failed');
          return cb(null, err);
        }        else {
          log.info({
            type: 'success',
            time: moment().format('YYYY-MM-DD HH:mm').toString(),
            model: 'employee',
            method: 'viewAllProfile',
          }, 'viewAllProfile - success');
          return cb(null, returnArray);
        }
      }
    );
    });
  };



  employee.remoteMethod('viewAllProf', {
    // accepts: {arg: 'id', type: 'number', required: false},
    'http': {'verb': 'get', 'path': '/viewAllProf'},
    returns: {arg: 'profiles', type: 'Array'},
    description: 'This is used for retrive data for the View All Profile',
  });

    employee.getAllSupervisor=function (cb) {
        var log = bunyan.createLogger({
            name: 'leaveServer-logger', streams: [
                {
                    level: 'info',
                    path: './log/info/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
                },
                {
                    level: 'error',
                    path: './log/error/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
                }],
            serializers: {err: bunyan.stdSerializers.err},
        });
        log.info({
            type: 'info',
            time: moment().format('YYYY-MM-DD HH:mm').toString(),
            model: 'employee',
            method: 'getAllSupervisor',
        }, 'getAllSupervisor data - request');
        var filter = { fields: ['id','f_name', 'l_name'], where: { and: [{ role_id:{inq:[2,3]}}, { status: 1 }] } };
employee.find(filter,function (err,employee) {
     var returnEle={};
    var returnArray = [];

    employee.forEach( emp =>{
        emp = emp.toJSON();
    // console.log(JSON.stringify(emp));
    returnEle = {};
    returnEle['id']= emp.id;
    returnEle['name'] = emp.f_name + ' ' + emp.l_name;
    returnArray.push(returnEle);
    });
    if (err !== null) {
        log.error({
            type: 'error',
            model: 'employee',
            time: moment().format('YYYY-MM-DD HH:mm').toString(),
            method: 'getAllSupervisor',
            err: err,
        }, 'getAllSupervisor data - failed');
    } else {
        log.info({
            type: 'info',
            time: moment().format('YYYY-MM-DD HH:mm').toString(),
            model: 'employee',
            method: 'getAllSupervisor',
        }, 'getAllSupervisor data - success');
    }
    cb(null, returnArray);
});
    };
    employee.remoteMethod('getAllSupervisor', {
        // accepts: {arg: 'id', type: 'number', required: false},
        'http': {'verb': 'get', 'path': '/getAllSupervisor'},
        returns: {arg: 'employees', type: 'array'},
        description: 'This is used for retrive all supervisor for the getAllSupervisor employee',
    });

    console.log('It prints this log here.');

    employee.on('resetPasswordRequest', function(info) {

        console.log('But it does not print this log here ever.');

      //var url = 'http://leaves.vizuamatix.com:6077/forgot-password/';
       var url = 'http://localhost:6075/forgot-password/';
       // var url = 'http://192.168.10.220:6075/forgot-password/';
        var html = 'Click <a href="' + url+ info.accessToken.id +'-'+info.accessToken.userId + '">'+url+info.accessToken.id+'</a>';
        employee.app.models.Email.send({
            to: info.email,
            from: 'hrm@tsdclanka.com',
            subject: 'Reset password',
            html: '<h3 style="text-align:center;"> Forgot Password - Reset Password</h3><p>  If you want to reset your username and password click on the link below. If you dont request for forgot password, please ignore this.</p>' + html + '<p align="justify"><i><small>This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited . The information contained in this mail is propriety and strictly confidential.</small></i></p><span style="float:right;"><a href="http://www.vizuamatix.com">powered by VizuaMatix</a></span>'
        }, function(err,email) {
            console.log('> sending password reset email to:', info.email);
            console.log('userid: ',info.accessToken.userId );
            if (err) return console.log('> error sending password reset email');
        });
    });

  employee.afterRemote('create', function(ctx, output, next) {
    var log = bunyan.createLogger({
      name: 'leaveServer-logger', streams: [
        {
          level: 'info',
          path: './log/info/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        },
        {
          level: 'error',
          path: './log/error/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        }],
      serializers: {err: bunyan.stdSerializers.err},
    });
    log.info({
      type: 'success',
      time: moment().format('YYYY-MM-DD HH:mm').toString(),
      model: 'employee',
      method: 'create',
      user: ctx.result.created_by,
    }, 'add new employee - success');
    // ctx.toJSON();
    console.log('employee added successfully');
    employee.app.models.Email.send({
      to: ctx.result.email,
      from: 'hrm@tsdclanka.com',
      subject: 'Credentials for the VX leave System',
      // text: 'my text',
      html: '<h1 style="text-align:center;">Hi ' + ctx.result.f_name + ', Welcome to VX Leave System</h1><h3>Credentials for your new Account</h3><ul><li><b>username: </b>' + ctx.result.username + '</li><li><b>password: </b>' + ctx.result.passwordTxt + '</li><li><b>Site URL: </b><a href="http://leaves.vizuamatix.com:6077">leaves.vizuamatix.com:6077</a></li></ul> <p>You can change your password and username when you logged in to your account first time.<p align="justify"><i><small>This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited . The information contained in this mail is propriety and strictly confidential.</small></i></p><span style="float:right;">powered by VizuaMatix</span>',



    }, function(err, mail) {
      if (err !== null) {
        log.error({
          type: 'error',
          time: moment().format('YYYY-MM-DD HH:mm').toString(),
          model: 'employee',
          method: 'create-email',
          err: err,
        }, 'add new employee email - failed');
      } else {
        log.info({
          type: 'success',
          time: moment().format('YYYY-MM-DD HH:mm').toString(),
          model: 'employee',
          method: 'create-email',
          err: err,
          email: mail,
        }, 'add new employee email - success');
      }
      console.log('email sent!');
      next(err);
    });

    // next(null);
  });

  employee.afterRemoteError('create', function(ctx, next) {
    var log = bunyan.createLogger({
      name: 'leaveServer-logger', streams: [
        {
          level: 'info',
          path: './log/info/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        },
        {
          level: 'error',
          path: './log/error/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        }],
      serializers: {err: bunyan.stdSerializers.err},
    });
    log.error({
      type: 'error',
      time: moment().format('YYYY-MM-DD HH:mm').toString(),
      model: 'employee',
      method: 'create',
      err: ctx.error,
      user: ctx.result.created_by,
    }, 'add new employee - failed');
    next();
  });
  employee.afterRemote('*.patchAttributes', function(ctx, output, next) {
    var log = bunyan.createLogger({
      name: 'leaveServer-logger', streams: [
        {
          level: 'info',
          path: './log/info/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        },
        {
          level: 'error',
          path: './log/error/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        }],
      serializers: {err: bunyan.stdSerializers.err},
    });
    if (ctx.args.status !== null && ctx.args.status == 0) {
      log.info({
        type: 'success',
        time: moment().format('YYYY-MM-DD HH:mm').toString(),
        model: 'employee',
        method: 'delete employee',
        user: ctx.result.modified_by,
      }, 'Delete employee - success');
    } else if (ctx.args.user_name !== null && ctx.args.password !== null && ctx.args.created_by == null) {
      log.info({
        type: 'success',
        time: moment().format('YYYY-MM-DD HH:mm').toString(),
        model: 'employee',
        method: 'change credentials',
        user: ctx.result.modified_by,
      }, 'Change credentials - success');
    } else {
      log.info({
        type: 'success',
        time: moment().format('YYYY-MM-DD HH:mm').toString(),
        model: 'employee',
        method: 'delete employee',
        user: ctx.result.modified_by,
      }, 'Edit employee - success');
    }
    next();
  });
  employee.afterRemoteError('*.patchAttributes', function(ctx, next) {
    var log = bunyan.createLogger({
      name: 'leaveServer-logger', streams: [
        {
          level: 'info',
          path: './log/info/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        },
        {
          level: 'error',
          path: './log/error/log_' + moment().format('YYYY-MM-DD').toString() + '.log',
        }],
      serializers: {err: bunyan.stdSerializers.err},
    });
    if (ctx.args.status !== null && ctx.args.status == 0) {
      log.error({
        type: 'error',
        time: moment().format('YYYY-MM-DD HH:mm').toString(),
        model: 'employee',
        method: 'delete employee',
        err: ctx.error,
        user: ctx.args.modified_by,
      }, 'Delete employee - failed');
    } else if (ctx.args.user_name !== null && ctx.args.password !== null && ctx.args.created_by == null) {
      log.error({
        type: 'error',
        time: moment().format('YYYY-MM-DD HH:mm').toString(),
        model: 'employee',
        method: 'change credentials',
        user: ctx.args.id,
      }, 'Change credentials - failed');
    } else {
      log.error({
        type: 'error',
        time: moment().format('YYYY-MM-DD HH:mm').toString(),
        model: 'employee',
        method: 'delete employee',
        err: ctx.error,
        user: ctx.args.modified_by,
      }, 'Edit employee - failed');
    }
    next();
  });
};

