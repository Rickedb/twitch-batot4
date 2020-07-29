let index = 0,
    displayTime = 5,
    idleTime = 5,
    header = "",
    animationIn = undefined,
    animationOut = undefined,
    messages = {},
    $headerElement = undefined,
    $messageElement = undefined,
    $elements = undefined;


window.addEventListener('onWidgetLoad', function(obj) {
    const fieldData = obj.detail.fieldData;
    displayTime = fieldData.displayTime * 1000;
    idleTime = fieldData.idleTime * 1000;
    header = fieldData.messageHeader;
    animationIn = fieldData.animationIn;
    animationOut = fieldData.animationOut;
    messages = fieldData.messages.split(',');

    $('#container').addClass(fieldData.theme);
    $headerElement = $('#header');
    $messageElement = $('#message');
    $elements = $('#header, #message');

    $headerElement.text(header);
    $messageElement.text(messages[0]);
    $elements.addClass('animate__animated ' + animationOut);
    loop();
});

function loop() {
    $elements.removeClass('animate__animated ' + animationOut);
    $elements.addClass('animate__animated ' + animationIn);
    $messageElement.bind('animationend', () => {
        setTimeout(next, displayTime);
    });
}

function next() {
    $messageElement.unbind('animationend');
    $elements.removeClass('animate__animated ' + animationIn);
    $messageElement.bind('animationend', () => {
        if (index < messages.length) {
            index++;
        } else {
            index = 0;
        }

        $messageElement.text(messages[index]);
        $messageElement.unbind('animationend');
        setTimeout(loop, idleTime);
    });

    $elements.addClass('animate__animated ' + animationOut);
}