

var ecto_baseurl = location.href.split('/', 3).join('/');

function Module(name) {
  this.name_ = name;
  this.inputs_ = [];
  this.outputs_ = [];
  this.params_ = [];
}

function initialize() {
  $.get(ecto_baseurl + '/module/list', function(data) {
    $('#modules').html('');
      $(data['list']).each(function (index, elem) {
	$('#modules').append($('<a></a>')
	.html(elem)
	.addClass('module')
	.attr('id', 'module_' + elem)
	.attr('href', 'javascript:mo_create("' + elem + '")')
	);
      });

      $.each(data['details'], function (name, infos) {
	var module = new moModule(name);
	$(infos['inputs']).each(function (index, elem) {
	  module.inputs.push(elem);
	});
	$(infos['outputs']).each(function (index, elem) {
	  module.outputs.push(elem);
	});
	mo_available_modules[name] = module;
      });
      mo_resize();
  });
}


// Initialize the data at teh beginning
$(document).ready(function() {
  initialize();
});
