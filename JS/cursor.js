var cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});
document.addEventListener('mousedown', function() {
    cursor.style.transform = 'scale(1.5)';
});

document.addEventListener('mouseup', function() {
    cursor.style.transform = 'scale(1)';
});