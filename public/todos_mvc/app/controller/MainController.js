/*
 * File: app/controller/MainController.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TodosApp.controller.MainController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            mainPanel: '#mainPanel',
            listPanel: '#listPanel',
            editPanel: '#editPanel'
        },

        control: {
            "#taskTextField": {
                keyup: 'onTaskTextFieldKeyup'
            },
            "#taskList": {
                itemdoubletap: 'onTaskListItemDoubletap',
                itemtap: 'onTaskListItemTap',
                initialize: 'onTaskListInitialize'
            },
            "#markAllCheckbox": {
                check: 'onMarkAllCheckboxCheck',
                uncheck: 'onMarkAllCheckboxUncheck'
            }
        }
    },

    onTaskTextFieldKeyup: function(textfield, e, options) {
        var ENTER_KEY_CODE = 13,
            store, value;

        if (e.event.keyCode === ENTER_KEY_CODE) {
            value = textfield.getValue();
            if (value !== "") {
                store = Ext.getStore("Tasks");
                store.add({name: value, done: false});
                store.sync();
                textfield.reset();
            }
        }
    },

    onTaskListItemDoubletap: function(dataview, index, target, record, e, options) {
        TodosApp.editing = true;
        target.down(".view").setStyle("display","none");
        target.down(".edit").setStyle("display","block");
    },

    onTaskListItemTap: function(dataview, index, target, record, e, options) {
        var store;

        TodosApp.selectedTask = record;
        if (TodosApp.selectedTarget && TodosApp.selectedTarget !== target) {
            // reset the previous selected item
            TodosApp.selectedTarget.down(".destroy").setStyle("display","none");
            TodosApp.selectedTarget.down(".edit").setStyle("display","none");
            TodosApp.selectedTarget.down(".view").setStyle("display","block"); // could be hidden by doubletap
            TodosApp.editing = false;
        }

        TodosApp.selectedTarget = target;

        if (!TodosApp.editing) {
            store = Ext.getStore("Tasks");

            // work on the current item
            target.down(".destroy").setStyle("display","block");

            // handle checkbox tap
            if (TodosApp.selectedCheckbox) {
                setTimeout(function(){
                    record.set("done",TodosApp.selectedCheckbox.checked);
                    TodosApp.selectedCheckbox = undefined;
                    store.sync();
                },500);
            }
            // handle destroy link tap
            if (TodosApp.tappedDestroyLink) {
                TodosApp.tappedDestroyLink = false;
                store.remove(TodosApp.selectedTask);
                store.sync();
            }
        }
    },

    onTaskListInitialize: function(component, options) {
        // setup taskList to listen on the tap on the checkbox and record the selected checkbox 
        component.element.on({
            tap: function(e, el) {
                TodosApp.selectedCheckbox = el;    
            }, delegate: 'input[type=checkbox]'
        });

        // setup taskList to listen on the tap on the destroy link and set the flag (for itemtap) 
        component.element.on({
            tap: function(e, el) {
                TodosApp.tappedDestroyLink = true;    
            }, delegate: 'a'
        });

        // setup taskList listen on keyup for enter key, and persist the task name change
        component.element.on({
            keyup: function(e, el) {
                var ENTER_KEY_CODE = 13,
                    store = Ext.getStore("Tasks"),
                    value = el.value;

                if (e.event.keyCode === ENTER_KEY_CODE && value !== "") {
                    TodosApp.editing = false;
                    TodosApp.selectedTask.set("name",value);
                    store.sync();
                    TodosApp.selectedTarget.down("label").setHtml(value);
                    TodosApp.selectedTarget.down(".edit").setStyle("display","none");
                    TodosApp.selectedTarget.down(".view").setStyle("display","block");
                }
            }, delegate: 'input[type=text]'
        });
    },

    onMarkAllCheckboxCheck: function(checkboxfield, e, options) {
        this.updateTaskStatus(true);
    },

    onMarkAllCheckboxUncheck: function(checkboxfield, e, options) {
        this.updateTaskStatus(false);
    },

    init: function() {
        // setup store updaterecord and load event handler
        Ext.getStore("Tasks").on({
            scope: this,
            updaterecord: this.updateStoreInfo,
            load: this.updateStoreInfo
        });
    },

    updateStoreInfo: function() {
        var count,
            storeInfo = this.getListPanel().down("#storeInfo"),
            store = Ext.getStore("Tasks");

        store.filter("done",false);
        count = store.getCount();
        store.clearFilter();
        if (count > 0) {
            storeInfo.setHtml(count+" item"+(count>1?"s":"")+" left");
        } else {
            storeInfo.setHtml("");
        }
    },

    updateTaskStatus: function(done) {
        var store = Ext.getStore("Tasks");
        store.each(function(record){
            record.set("done",done);
        });
        store.sync();
    }

});