function test() {
    b(a)
    return 1;
    var a = '2';
    function b(num1) {
        console.log(num1)
    }
}
test()