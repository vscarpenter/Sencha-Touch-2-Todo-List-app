/*
 * File: app/view/MainPanel.js
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

Ext.define('TodosApp.view.MainPanel', {
    extend: 'Ext.Panel',

    config: {
        id: 'mainPanel',
        layout: {
            type: 'card'
        },
        items: [
            {
                xtype: 'panel',
                id: 'listPanel',
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'textfield',
                        id: 'taskTextField',
                        itemId: 'mytextfield',
                        padding: '0 0 0 10',
                        label: '',
                        placeHolder: 'What needs to be done?'
                    },
                    {
                        xtype: 'checkboxfield',
                        id: 'markAllCheckbox',
                        itemId: 'mycheckbox',
                        label: 'Mark all tasks done',
                        labelAlign: 'right',
                        labelWidth: '80%'
                    },
                    {
                        xtype: 'list',
                        id: 'taskList',
                        itemId: 'mylist',
                        layout: {
                            type: 'vbox'
                        },
                        itemTpl: [
                            '<div><input type="checkbox" <tpl  if="done">checked</tpl> /> {name} </div>'
                        ],
                        store: 'Tasks',
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        html: '<b>?</.b> items left',
                        id: 'storeInfo',
                        padding: '0 0 0 15'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                id: 'editPanel',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Edit Task',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'taskNameTextField',
                                label: 'Name'
                            },
                            {
                                xtype: 'checkboxfield',
                                id: 'taskDoneCheckbox',
                                label: 'Done'
                            }
                        ]
                    },
                    {
                        xtype: 'segmentedbutton',
                        layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'button',
                                id: 'deleteButton',
                                itemId: 'mybutton',
                                ui: 'decline',
                                iconCls: 'trash',
                                iconMask: true,
                                text: 'Delete'
                            },
                            {
                                xtype: 'button',
                                id: 'saveButton',
                                itemId: 'mybutton1',
                                ui: 'confirm',
                                iconCls: 'compose',
                                iconMask: true,
                                text: 'Save'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Todos',
                items: [
                    {
                        xtype: 'button',
                        hidden: true,
                        id: 'backButton',
                        itemId: 'mybutton2',
                        ui: 'back',
                        text: 'Back'
                    }
                ]
            }
        ]
    }

});