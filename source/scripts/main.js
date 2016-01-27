const $animationElements = $('.Smiles');
const $window = $(window);

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
      setTimeout(function timeout() {
        $element.addClass('in-view');
      }, 500);
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', checkIfInView);
