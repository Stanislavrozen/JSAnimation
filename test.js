// animation

document.addEventListener("DOMContentLoaded", function ()
{
    var anima = new Animation();

    var radius = 0; // parseInt(animationBox.getBoundingClientRect().width, 10);
    var start = Date.now();


    function AnimationGround(parent = document.body)
    {
        var delay = 20;
        var timer = null;
        var figures = [];
        var animations = [];
        var bindings = [];
        var colors = ["IndianRed", "LightCoral", "Salmon", "DarkSalmon", "LightSalmon", "Crimson", "Red", "FireBrick", "DarkRed", "NAME", "Pink", "LightPink", "HotPink", "DeepPink", "MediumVioletRed", "PaleVioletRed", "NAME", "LightSalmon", "Coral", "Tomato", "OrangeRed", "DarkOrange", "Orange", "NAME", "Gold", "Yellow", "LightYellow", "LemonChiffon", "LightGoldenrodYellow", "PapayaWhip", "Moccasin", "PeachPuff", "PaleGoldenrod", "Khaki", "DarkKhaki", "NAME", "Lavender", "Thistle", "Plum", "Violet", "Orchid", "Fuchsia", "Magenta", "MediumOrchid", "MediumPurple", "RebeccaPurple", "BlueViolet", "DarkViolet", "DarkOrchid", "DarkMagenta", "Purple", "Indigo", "SlateBlue", "DarkSlateBlue", "MediumSlateBlue", "NAME", "GreenYellow", "Chartreuse", "LawnGreen", "Lime", "LimeGreen", "PaleGreen", "LightGreen", "MediumSpringGreen", "SpringGreen", "MediumSeaGreen", "SeaGreen", "ForestGreen", "Green", "DarkGreen", "YellowGreen", "OliveDrab", "Olive", "DarkOliveGreen", "MediumAquamarine", "DarkSeaGreen", "LightSeaGreen", "DarkCyan", "Teal", "NAME", "Aqua", "Cyan", "LightCyan", "PaleTurquoise", "Aquamarine", "Turquoise", "MediumTurquoise", "DarkTurquoise", "CadetBlue", "SteelBlue", "LightSteelBlue", "PowderBlue", "LightBlue", "SkyBlue", "LightSkyBlue", "DeepSkyBlue", "DodgerBlue", "CornflowerBlue", "MediumSlateBlue", "RoyalBlue", "Blue", "MediumBlue", "DarkBlue", "Navy", "MidnightBlue", "NAME", "Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat", "BurlyWood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod", "DarkGoldenrod", "Peru", "Chocolate", "SaddleBrown", "Sienna", "Brown", "Maroon", "NAME", "White", "Snow", "HoneyDew", "MintCream", "Azure", "AliceBlue", "GhostWhite", "WhiteSmoke", "SeaShell", "Beige", "OldLace", "FloralWhite", "Ivory", "AntiqueWhite", "Linen", "LavenderBlush", "MistyRose", "NAME", "Gainsboro", "LightGray", "Silver", "DarkGray", "Gray", "DimGray", "LightSlateGray", "SlateGray", "DarkSlateGray", "Black"];
        var container = new function ()
        {
            let width = parent.getBoundingClientRect().width - 20 + "px";
            let elem = document.createElement("div");
            elem.style.cssText = "border:1px lightgray dotted;position:absolute;top:10px;left:10px;right:10px;bottom:10px;";
            parent.appendChild(elem);
            return elem;
        };
        var ground = new function ()
        {
            let elem = document.createElement("div");
            elem.style.cssText = "background-color:black;position:absolute;top:50px;left:10px;right:10px;bottom:10px;";
            container.appendChild(elem);
            return elem;
        }
        var ribbon = new function ()
        {
            let elem = document.createElement("div");
            elem.style.cssText = "position:absolute;left:10px;right:10px;top:10px;height:30px;background-color:lightpink"
            container.appendChild(elem);
            return elem;
        }
        var ignitionButton = document.createElement("input");
        ignitionButton.setAttribute("type", "button");
        ignitionButton.setAttribute("value", "Врубить");
        ignitionButton.switch = function ()
        {
            this.setAttribute("value", timer ? "Отрубить" : "Врубить");
        }
        ignitionButton.addEventListener("click", function ()
        {
            if (trigger())
            {
                this.switch();
            }
        });
        ignitionButton.setAttribute("class", "button");
        ribbon.appendChild(ignitionButton);

        var addButton = document.createElement("input");
        addButton.setAttribute("type", "button");
        addButton.setAttribute("value", "Добавить");
        addButton.addEventListener("click", function ()
        {
            addFigure();
        });
        addButton.setAttribute("class", "button");
        ribbon.appendChild(addButton);

        function getMeasure(value)
        {
            var number = parseInt(value, 10);
            var measure = value.replace(number, "");

            return { number, measure };
        }

        function Figure()
        {
            var animated = false;
            var size = Math.floor(Math.random() * 100);
            var color = colors[Math.floor(Math.random() * colors.length)];
            var elem = document.createElement("div");
            elem.style.position = "absolute";
            elem.style.width = size + "px";
            elem.style.height = size + "px";
            elem.style.backgroundColor = color;
            elem.animated = false;
            ground.appendChild(elem);
            elem.addEventListener("click", function ()
            {
                point(elem);

                if (elem.animated)
                {
                    unbind(elem);
                }
                else
                {
                    if(animations.length > 0)
                    {
                        bind(elem, animations[animations.length - 1]);
                    }
                }
            })
            return elem;
        }
        function Animation(params)
        {
            var index = null;
            var count = params.count;
            var prop = params.prop;
            var increment = params.increment;
            var progress = params.progress;
            var step = params.step;
            var end = params.end;

            var state = function (number)
            {
                count = count + 1;
                if (count % progress == 0) increment = increment + step
                return number + increment;
            }
            var draw = function (figure)
            {
                let computedStyle = getComputedStyle(figure);
                let computedProp = computedStyle[prop];
                let val = getMeasure(computedProp);

                if(end(prop))
                {
                    unbind(figure, this);
                }
                figure.style[prop] = state(val.number) + val.measure;
            }

            var run = function ()
            {
                index = animations.push(this);
            }

            var stop = function ()
            {
                animations.splice(index, 1);
                index = null;
            }

            this.run = run;
            this.stop = stop;
            this.draw = draw;
        }
        function bind(figure, animation)
        {
            bindings.push({figure, animation});
            figure.animated = true;
        }
        function unbind(figure, animation)
        {
            if(animation)
            {
                for (let i = 0; i < bindings.length; i++)
                {
                    if (bindings[i].figure == figure && bindings[i].animation == animation)
                    {
                        bindings.splice(i, 1);
                        i = i - 1;
                    }
                }
            }
            else
            {
                for (let i = 0; i < bindings.length; i++)
                {
                    if (bindings[i].figure == figure)
                    {
                        bindings.splice(i, 1);
                        i = i - 1;
                    }
                }
                figure.animated = false;
            }

            if(bindings.length < 1) turnoff();
        }
        function addFigure()
        {
            let figure = new Figure();
            point(figure);
            figures.push(figure);
            console.info(figures.length);
            return figure;
        }
        function addAnimation(params)
        {
            let animation = new Animation(params);
            animations.push(animation);
            return animation;
        }
        function point(figure)
        {
            let pointClass = "point";
            let old = ground.querySelector("." + pointClass);
            if (old)
            {
                old.className = old.className.replace("point", "").trim();
            }
            let classesArray = figure.className.split(" ");
            classesArray.push("point");
            figure.className = classesArray.join(" ").trim();
        }
        function engine()
        {
            timer = setInterval(function ()
            {

                for (var i = 0; i < bindings.length; i++)
                {
                    let binding = bindings[i];
                    bindings[i].animation.draw(bindings[i].figure);
                }
            }, delay);
        }
        function trigger()
        {
            if (timer == null)
            {
                return ignition();
            }
            else
            {
                return turnoff();;
            }
        }
        function ignition()
        {
            if (bindings.length < 1)
            {
                turnoff(); return false;
            }
            else
            {
                engine(); return true;
            }
        }
        function turnoff()
        {
            clearInterval(timer);
            timer = null;
            ignitionButton.switch();
            return true;
        }

        this.addAnimation = addAnimation;
        this.ground = ground;
        this.addFigure = addFigure;
        this.bind = bind;
        this.animations = animations;
        this.figures = figures;
        this.bindings = bindings;
        this.point = point;
        this.trigger = trigger;
        this.ignition = ignition;
        this.turnoff = turnoff;
    }

    let ground = new AnimationGround();
    let figure = ground.addFigure();
    let animation = ground.addAnimation({
        prop: "top",
        count: 0,
        increment: 1,
        progress: 0,
        end: function(prop)
        {
            return parseInt(figure.style[prop], 10) - figure.style.height  == figure.parentNode.getBoundingClientRect().height;
        }
    });

    ground.bind(figure, animation);
    ground.ignition();

    setInterval(function ()
    {
        let figure = ground.addFigure();

        ground.bind(figure, ground.addAnimation({
            prop: "top",
            count: 0,
            step: 0, // Math.random() * 10,
            increment: Math.floor(Math.random() * 3),
            progress: 0, // Math.random() * 10,
            end: function(prop)
            {
                let top = parseInt(figure.style[prop], 10);
                let height = parseInt(figure.style.height, 10)
                return top + height  >= figure.parentNode.getBoundingClientRect().height;
            }
        }));
        ground.bind(figure, ground.addAnimation({
            prop: "left",
            count: 0,
            step: 0, // Math.random() * 10,
            increment: Math.floor(Math.random() * 3),
            progress: 0, // Math.random() * 10,
            end: function(prop)
            {
                return parseInt(figure.style[prop], 10) + figure.getBoundingClientRect().width  >= figure.parentNode.getBoundingClientRect().width;
            }
        }));
        ground.bind(figure, ground.addAnimation({
            prop: "borderRadius",
            count: 0,
            step: 0,
            increment: 1,
            decrement: 1,
            progress: 0,
            end: function(prop)
            {
                return false;
            },
            reverse: function()
            {
                return parseInt(figure.style[prop], 10) >= parseInt(figure.style.width, 10);
            }
            // condition: function(val) 
            // {
            //     if(val == getMeasure(figure.style[prop]).number)
            //     {
            //         calc = calc
            //     }
            // }
        }));
    }, 1000)



    //ground.assign({figure:figure,animation:animation});


    // animation.run();
});
