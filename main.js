document.addEventListener("DOMContentLoaded", () => {
    let taskList = {};

    const task = function(data = {}) {
        this.name = ko.observable(data.name || 'Новая задача');
        this.amount = ko.observable(data.amount || 0);
        this.order = ko.observable(data.order || '9');
        this.status = ko.observable(data.status || statusTODO);
        this.changeStatus = (newStatus) => {
            if (newStatus !== statusInWork || ~~taskList.sumInWork() + ~~this.amount() <= maxSumAmountInWork) {
                this.status(newStatus)
            } else {
                alert('В работе превышение бюджета!')
            }
        }
        this.toTODO = () => { this.changeStatus(statusTODO); };
        this.toInWork = () => { this.changeStatus(statusInWork); };
        this.toComplite = () => { this.changeStatus(statusComplite); };
        this.edit = () => { taskList.taskEdit(this); };
        this.del = () => {
            taskList.tasks.remove(this);
            taskList.closeEdit();
        };
   
    taskList = new vm();
    ko.applyBindings(taskList);
    taskList.tasks(dataTasks.map(x => new task(x)));


});
