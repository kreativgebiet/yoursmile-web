const $animationElements = $('.Smiles');
const $window = $(window);
const $sidebar = $('.Sidebar');

let sidebarOffset;
if ($sidebar.length) {
  sidebarOffset = $sidebar.offset().top - 70;
}

function checkIfInView() {
  const windowHeight = $window.height();
  const windowTopPosition = $window.scrollTop();
  const windowBottomPosition = (windowTopPosition + windowHeight);

  $.each($animationElements, function eachElement() {
    const $element = $(this);
    const elementHeight = $element.outerHeight();
    const elementTopPosition = $element.offset().top;
    const elementBottomPosition = (elementTopPosition + elementHeight);

    // check to see if this current container is within viewport
    if ((elementBottomPosition >= windowTopPosition) &&
        (elementTopPosition <= windowBottomPosition)) {
      setTimeout(() => {
        $element.addClass('in-view');
      }, 200);
    } else {
      $element.removeClass('in-view');
    }
  });
}

function checkSidebarInViewport() {
  if ($window.scrollTop() >= sidebarOffset) {
    $sidebar.addClass('Sidebar--Fixed');
  } else {
    $sidebar.removeClass('Sidebar--Fixed');
  }
}

$window.on('scroll resize', checkIfInView);

if ($sidebar.length) {
  $window.on('scroll', checkSidebarInViewport);
}
