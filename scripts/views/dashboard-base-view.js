BeMe.Views.DashboardBaseView = Parse.View.extend({
  render: function () {
    new BeMe.Views.Dashboard(); // the dependency template for the dashboard views
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  }
});