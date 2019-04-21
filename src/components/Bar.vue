<template>
  <div id="vue-really-likes-to-have-a-root-container">
    <div class="leitner-chart_outer">
      <div
        v-for="(box, b) in boxes"
        :key="b"
        class="box"
      >
        <div class="box_inner">
          <div class="lbl">
            {{ box_labels[b] }}
          </div>
          <div class="btm" />
          <a
            href="#"
            class="bar bar1"
            :style="{
              height: getHeight(box[0]),
              backgroundColor: getColor(box[0].type)
            }"
            @click.prevent="onClick($event)"
          >
            <span :class="[ 'val', box[0].value ? '' : 'val-zero' ]">{{ box[0].value }}</span>
          </a>
          <a
            href="#"
            class="bar bar2"
            :style="{
              height: getHeight(box[1]),
              backgroundColor: getColor(box[1].type)
            }"
            @click.prevent="onClick($event)"
          >
            <span :class="[ 'val', box[1].value ? '' : 'val-zero' ]">{{ box[1].value }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- test the dynamic aspect of the chart -->
    <div style="margin:2em 0 0;">
      <button
        class="btn btn-success"
        @click="updateChartTestOne"
      >
        Add 1 New Card
      </button>
      <button
        class="btn btn-success"
        @click="updateChartTestTwo"
      >
        Randomize
      </button>
      <button
        class="btn btn-success"
        @click="addBox"
      >
        Add one box
      </button>
      <button
        class="btn btn-warning"
        @click="removeBox"
      >
        Remove one box
      </button>
    </div>
  </div>
</template>

<script>
"use strict";

// backend php would generate this (for example, encoded json in a input["hidden"])
var chart_data = {
  // eight Leitner boxes, each box contains 2 piles, each pile has { value: ..., type: ... }
  // first pile contains missed cards (failed) and new cards (new)
  // 2nd box and higher have due cards (due) and scheduled cards (fresh)
  "boxes":[
    [
      {
        "value":5,
        "type":"failed"
      },
      {
        "value":11,
        "type":"new"
      }
    ],
    [
      {
        "value":16,
        "type":"due"
      },
      {
        "value":0,
        "type":"fresh"
      }
    ],
    [
      {
        "value":4,
        "type":"due"
      },
      {
        "value":0,
        "type":"fresh"
      }
    ],
    [
      {
        "value":9,
        "type":"due"
      },
      {
        "value":0,
        "type":"fresh"
      }
    ],
    [
      {
        "value":0,
        "type":"due"
      },
      {
        "value":0,
        "type":"fresh"
      }
    ],
    [
      {
        "value":0,
        "type":"due"
      },
      {
        "value":1,
        "type":"fresh"
      }
    ],
    [
      {
        "value":26,
        "type":"due"
      },
      {
        "value":0,
        "type":"fresh"
      }
    ],
    [
      {
        "value":4,
        "type":"due"
      },
      {
        "value":9,
        "type":"fresh"
      }
    ]
  ]
};

  var Helpers = {
    getRandomIntInclusive: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };


export default {
    data: function() {
      return {
        boxes: chart_data.boxes,
        box_labels: [
          'Failed & New', 'One review', 'Two reviews', 'Three reviews', 'Four reviews', 'Five reviews', 'Six reviews', 'Seven+'
        ],

        colors: { failed: '#ff8257', new: '#40a8e5', fresh: '#5ad177', due: '#ffa443' }
      };
    },

    computed: {
      stacks: function() {
        // console.log("... update property: stacks ...");
        // reformat leitner data from 8 boxes to 16 stacks
        var bars = [];
        this.boxes.map( function(b) { bars.push(b[0], b[1]); });
        return bars;
      },

      maxHeight: function() {
        // console.log("... update property: maxHeight ...");
        var vals = this.stacks.map(function(s) { return s.value; });
        var c = Math.max.apply(null, vals);
        return c;
      }
    },

    methods: {
      getColor: function(type) {
        return this.colors[type];
      },
      getPercent: function(height) {
        // console.log('getPercent(%o)', height);
        return this.maxHeight > 0 ? Math.ceil(height * 100 / this.maxHeight) : 0;
      },
      getHeight: function(bar) {
        // console.log('getHeight(%o)', bar.value);
        var height = this.getPercent(bar.value);

        return (height > 0 && height < 4 ? '4px' : height + '%');
      },

      onClick: function(ev) {
        // console.log("onClick(%o) target: %o", ev, ev.target);
        return ev;
      },

      updateChartTestOne: function() {
        // increase one stack
        this.stacks[3].value++;
      },
      updateChartTestTwo: function() {
        // randomize
        this.stacks.forEach(function(stack, i) {
          // make it look like a typical review
          if (i < 2) {
            // failed & new
            stack.value = Math.max(Helpers.getRandomIntInclusive(0, (i % 2 === 0 ? 10 : 20)) + 5, 0);
          }
          else {
            // due and scheduled
            stack.value = Math.max(Helpers.getRandomIntInclusive(0, (i % 2 === 0 ? 20 : 30)) - 5, 0);
          }
        });
      },

      removeBox: function() {
        if (this.boxes.length > 1) {
          this.boxes.pop();         
        }
      },
      addBox: function() {
        var newbox = [
          { value: Helpers.getRandomIntInclusive(0,10), type: 'due' },
          { value: Helpers.getRandomIntInclusive(1,15), type: 'fresh' }
        ];
        this.boxes.push(newbox);
      }

    },

}
</script>

<style scoped>
/* common */
body { background:#f4f0e5; }

/* bootstrap overrides */
.panel { background-color:#e7e1d3; border-color: #e7e1d3; }
.panel-default > .panel-heading { background-color: #e7e1d3; }

/* leitner chart component (root) */
.leitner-chart_pane { background:#e7e1d3; padding:1em; border-radius:4px; }

.leitner-chart_outer { display:table; width:100%; padding:30px 0 30px; }
.leitner-chart_outer .box  { display:table-cell; }

.box_inner {
  position:relative;
  height:200px; /* */
}

  /* the link */
.box .bar { outline:none; }
.box .bar:hover .val { font-weight:bold; }

  /* two stacks per box */
.box .bar1 { position:absolute; left:10%; bottom:0;   width:39%;   background:#f8f8f8; }
.box .bar2 { position:absolute; left:51%; bottom:0;   width:39%;   background:#f8c8f8; }

.box .btm { position:absolute; bottom:0; left:10%; right:10%; background:#d2c9b7; height:4px; }

.box .lbl {
  position:absolute; left:5%; right:5%; bottom:-31px; /*width:100%; height:24px; */
  margin-bottom:4px; 
  color: #7d776a; font-size:1em; line-height:1.1em; white-space:nowrap; text-align:center;
}
.box .val {
  position: absolute; left:0; top:-26px; width:100%;
  padding: 0;
  color:#444; font-weight:normal; white-space: nowrap; text-align:center;
}
.box .val-zero { color:#a09a8b; display:none; }


/* mobile quick fix?
.box { min-width:100px; }
.overflow-vp { overflow-x:scroll; }
 */


</style>
