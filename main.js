if (window.location.pathname.includes("index.html")) {
    var typed = new Typed(".typing", {
        strings: ["NU Student", "Biologist", "Graphic Designer", "Dean's List Student"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}



var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

if (window.location.pathname.includes("index.html")) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzmZX4m_ukj-VeJVVHyf-9EWobztsPvvIojY2z4iCVVMW1aCa-9XVfzeKi1w7dhlEQH/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")

    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                msg.innerHTML = "Message sent successfully"
                setTimeout(function () {
                    msg.innerHTML = ""
                }, 5000)
                form.reset()
            })
            .catch(error => console.error('Error!', error.message))
    });
}


$(document).ready(function () {
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function () {
        $('html').animate({
            scrollTop: 0
        });
    });
})



var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };
  var width = 1200 - margin.left - margin.right;
  var height = 600 - margin.top - margin.bottom;
  
  var svg = d3.select("#my-gpa")
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  d3.csv("../resources/gpa.csv").then(function(data) {
    data.forEach(function(d) {
      d.semester = d.semester.split("_").reverse().join(" ");
      d.gpa = +d.gpa;
    });
  
    var xScale = d3.scaleBand()
      .domain(data.map(function(d) { return d.semester; }))
      .range([0, width])
      .padding(0.2);
  
    var yScale = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.gpa; }), d3.max(data, function(d) { return d.gpa; })])
      .range([height, 0]);
  
    var line = d3.line()
      .x(function(d) { return xScale(d.semester) + xScale.bandwidth() / 2; })
      .y(function(d) { return yScale(d.gpa); })
      .curve(d3.curveMonotoneX);
  
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return xScale(d.semester) + xScale.bandwidth() / 2; })
      .attr("cy", function(d) { return yScale(d.gpa); })
      .attr("r", 5);
  
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "1rem")
      .attr("dx", "-.8em")
      .attr("dy", "0.4em")
      .attr("transform", function(d) {
          return "rotate(0)"
      });
  
    svg.append("g")
       .call(d3.axisLeft(yScale).ticks(10))
       .selectAll("text")
       .style("font-size", "1rem");
  
  }).catch(function(error) {
    console.log(error);
  });
  