"use strict"

document.addEventListener("DOMContentLoaded", () => {
    let total = 0,
        current = 0,
        isPlus = false,
        isMinus = false,
        isMultiply = false,
        isDivide = false,
        isPercent = false,
        clearBeforeInput = false,
        doubleClick = "";


    //create form
    const btName = ["AC", "Back", "%", "/", "7", "8", "9", "*",
        "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="]
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    document.body.append(wrapper);

    const container = document.createElement("div");
    container.classList.add("container");
    wrapper.append(container);

    const screen = document.createElement("input");
    screen.classList.add("screen");
    screen.value = "0";
    container.append(screen);

    const btnBlock = document.createElement("div");
    btnBlock.classList.add("btn-block");
    container.append(btnBlock);

    btName.forEach(e => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = e;
        if ( e === "AC" || e === "Back" || e === "%" ||
            e === "/" || e === "*" || e === "-" ||
            e === "+" || e === "=" || e === "+/-" ) button.classList.add("orange");
        btnBlock.append(button);
    })

    // calc
    const buttonList = document.querySelectorAll("button");
    document.addEventListener("keydown", e => {
        e.preventDefault();
        buttonList.forEach(button => {
            if ( button.innerHTML === e.key ) {
                button.classList.add("push");
                setTimeout(() => {
                    button.classList.remove("push");
                }, 200);
            } else {
                button.classList.remove("push");
            }
        })

        switch (e.key) {
            case "Delete":
                clear(screen);
                break;
            case "1":
                num(screen, 1);
                break;
            case "2":
                num(screen, 2);
                break;
            case "3":
                num(screen, 3);
                break;
            case "4":
                num(screen, 4);
                break;
            case "5":
                num(screen, 5);
                break;
            case "6":
                num(screen, 6);
                break;
            case "7":
                num(screen, 7);
                break;
            case "8":
                num(screen, 8);
                break;
            case "9":
                num(screen, 9);
                break;
            case "0":
                num(screen, 0);
                break;
            case "Backspace":
                back(screen);
                break;
            case ".":
                point(screen);
                break;
            case "+":
                doubleClick = "+";
                plus();
                break;
            case "-":
                doubleClick = "-";
                minus();
                break;
            case "Enter":
                result();
                break;
            case "*":
                doubleClick = "*";
                multiply();
                break;
            case "/":
                doubleClick = "/";
                divide();
                break;
            case "Shift":
                changeSign();
                break;
        }
    })

    btnBlock.addEventListener("click", e => {
        if ( e.target && e.target.classList.contains("btn") ) {
            if ( doubleClick !== e.target.innerHTML ) {
                switch (e.target.innerHTML) {
                    case "AC":
                        clear(screen);
                        break;
                    case "1":
                        num(screen, 1);
                        break;
                    case "2":
                        num(screen, 2);
                        break;
                    case "3":
                        num(screen, 3);
                        break;
                    case "4":
                        num(screen, 4);
                        break;
                    case "5":
                        num(screen, 5);
                        break;
                    case "6":
                        num(screen, 6);
                        break;
                    case "7":
                        num(screen, 7);
                        break;
                    case "8":
                        num(screen, 8);
                        break;
                    case "9":
                        num(screen, 9);
                        break;
                    case "0":
                        num(screen, 0);
                        break;
                    case "Back":
                        back(screen);
                        break;
                    case ".":
                        point(screen);
                        break;
                    case "+":
                        doubleClick = "+";
                        plus();
                        break;
                    case "-":
                        doubleClick = "-";
                        minus();
                        break;
                    case "=":
                        result();
                        break;
                    case "*":
                        doubleClick = "*";
                        multiply();
                        break;
                    case "/":
                        doubleClick = "/";
                        divide();
                        break;
                    case "+/-":
                        changeSign();
                        break;
                    case "%":
                        percent();
                        break;
                }
            }
        }
    })

    //AC

    function num( field, number ) {
        doubleClick = number;
        if ( clearBeforeInput ) {
            screen.value = "0";
            clearBeforeInput = false;
        }

        if ( field.value === "0" ) {
            field.value = number;
        } else {
            field.value += number;
        }

        if ( isPlus || isMinus || isMultiply || isDivide ) {
            current = +field.value;
        } else {
            total = +field.value;
        }

    }


    function plus() {
        result();
        makeFalseAllIs();
        isPlus = true;
        current = 0;

    }

    function minus() {
        result();
        makeFalseAllIs();
        isMinus = true;
        current = 0;

    }

    function multiply() {
        result();
        makeFalseAllIs();
        isMultiply = true;
        current = 1;

    }

    function divide() {
        result();
        makeFalseAllIs();
        isDivide = true;
        current = 1;

    }

    function result() {
        if ( isPlus ) screen.value = (total + current).toString();
        if ( isMinus ) screen.value = (total - current).toString();
        if ( isMultiply ) screen.value = (total * current).toString();
        if ( isDivide ) screen.value = (total / current).toString();

        if ( isPercent && isMinus ) {
            if ( current === 0 ) {
                screen.value = (total).toString();
            } else {
                screen.value = (total - (total * (current / 100))).toString();
            }
        }

        if ( isPercent && isPlus ) {
            if ( current === 0 ) {
                screen.value = (total).toString();
            } else {
                screen.value = (total + (total * (current / 100))).toString();
            }
        }

        if ( isPercent && isMultiply ) {
            if ( current === 0 ) {
                screen.value = (0).toString();
            } else {
                screen.value = (total / (100 / current)).toString();
            }
        }

        if ( isPercent && isDivide ) {
            if ( current === 0 ) {
                screen.value = (0).toString();
            } else {
                screen.value = (total * (100 / current)).toString();
            }
        }

        total = +screen.value;
        makeFalseAllIs();

    }

    function percent() {
        isPercent = true;
        result();
    }

    function changeSign() {
        if ( screen.value > 0 ) {
            screen.value = "-" + screen.value;
        } else {
            screen.value = (Math.abs(+screen.value)).toString();
        }
        (current) ? current = -current : total = -total;
    }

    function clear( field ) {
        doubleClick = "";
        field.value = "0";
        total = 0;
        current = 0;
        makeFalseAllIs();
    }

    function back( field ) {
        if ( field.value.length === 1 ) {
            field.value = 0;
            current = +field.value;
        } else {
            field.value = field.value.slice(0, -1);
            current = +field.value;
            console.log(current);
        }
    }

    function point( field ) {

        if ( clearBeforeInput ) {
            screen.value = "0";
            clearBeforeInput = false;
        }

        const reg = /\./g;
        if ( !reg.test(field.value) ) {
            field.value += ".";
            current = +field.value;
        }

    }

    function makeFalseAllIs() {
        isPlus = false;
        isMinus = false;
        isMultiply = false;
        isDivide = false;
        isPercent = false;
        clearBeforeInput = true;
    }
})