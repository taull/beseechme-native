BeMe.Views.BusinessCalendar = Parse.View.extend({
  initialize: function () {
    this.render();
    BeMe.Calendar.DaysView = new BeMe.Views.DaysView({collection:new BeMe.Collections.WeeklyComments(), user: this.model});
  },

  template: _.template($('#business-calendar-view').text()),

  render: function () {
    this.$el.html(this.template(this.model));
    $('.body-container').append(this.el);
    BeMe.renderedViews.push(this);
  }
})