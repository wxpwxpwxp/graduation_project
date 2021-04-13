<template>
  <div class="left_box" ref="left_box">
    <div class="guideList">
      <div class="guideItem" :class="{'categorySelected':now_selection_category === 0}"
           @click.prevent="categoryChange(0)">
        <div style="width: 100%;height: 4px"></div>
        <div class="CategoryItemBubble"
             style="background-color: rgb(76, 151, 255); border-color: rgb(51, 115, 204);"></div>
        <div class="CategoryMenuItemLabel">运动</div>
      </div>
      <div class="guideItem" :class="{'categorySelected':now_selection_category === 1}"
           @click.prevent="categoryChange(1)">
        <div style="width: 100%;height: 4px"></div>
        <div class="CategoryItemBubble"
             style="background-color: rgb(153, 102, 255); border-color: rgb(119, 77, 203);"></div>
        <div class="CategoryMenuItemLabel">外观</div>
      </div>
      <div class="guideItem" :class="{'categorySelected':now_selection_category === 2}"
           @click.prevent="categoryChange(2)">
        <div style="width: 100%;height: 4px"></div>
        <div class="CategoryItemBubble"
             style="background-color: rgb(255, 213, 0); border-color: rgb(204, 153, 0);"></div>
        <div class="CategoryMenuItemLabel">事件</div>
      </div>
      <div class="guideItem" :class="{'categorySelected':now_selection_category === 3}"
           @click.prevent="categoryChange(3)">
        <div style="width: 100%;height: 4px"></div>
        <div class="CategoryItemBubble"
             style="background-color: rgb(255, 171, 25); border-color: rgb(207, 139, 23);"></div>
        <div class="CategoryMenuItemLabel">控制</div>
      </div>
      <div class="guideItem" :class="{'categorySelected':now_selection_category === 4}"
           @click.prevent="categoryChange(4)">
        <div style="width: 100%;height: 4px"></div>
        <div class="CategoryItemBubble"
             style="background-color: rgb(76, 191, 230); border-color: rgb(46, 142, 184);"></div>
        <div class="CategoryMenuItemLabel">侦测</div>
      </div>
      <div class="guideItem" :class="{'categorySelected':now_selection_category === 5}"
           @click.prevent="categoryChange(5)">
        <div style="width: 100%;height: 4px"></div>
        <div class="CategoryItemBubble"
             style="background-color: rgb(64, 191, 74); border-color: rgb(56, 148, 56);"></div>
        <div class="CategoryMenuItemLabel">运算</div>
      </div>
    </div>
    <div class="Svg">
      <div class="svgBox">
        <svg ref="guideSvg" class="blocklyFlyout" width="189" height="2500" xmlns="http://www.w3.org/2000/svg"
             version="1.1" xlink:href="http://www.w3.org/1999/xlink">
          <filter id="drop-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.2"/>
            <feOffset dx="4" dy="4" result="offsetblur"/>
            <feFlood flood-color="rgba(0,0,0,0.3)"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="execute-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.2"/>
            <feOffset dx="8" dy="0" result="offsetblur"/>
            <feFlood flood-color="rgba(0,0,0,0.3)"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </svg>
        <svg ref="drawSvg" class="blocklyFlyout drawFlyout" width="calc(100% - 200)" height="100%"
             xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
        <svg class="blocklyScrollbarVertical blocklyFlyoutScrollbar" width="11" height="100%" display="block"
             xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect ref="scrollbackground" class="blocklyScrollbarBackground" width="11" height="100%"></rect>
            <rect ref="scroll" class="blocklyScrollbarHandle" rx="3" ry="3" width="6" x="2.5"></rect>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import motion_module from '../../../static/blocky_module/motion_module'
  import look_module from '../../../static/blocky_module/look_module'
  import event_module from '../../../static/blocky_module/event_module'
  import control_module from '../../../static/blocky_module/control_module'
  import sensing_module from '../../../static/blocky_module/sensing_module'
  import operator_module from '../../../static/blocky_module/operator_module'
  import pubsub from 'pubsub-js'

  export default {
    data () {
      return {
        scrollHeight: null,
        BackGroundHeight: null,
        now_visit_y: '0',
        now_selection_category: 0,
        positionForecast: null,
        positionMenu: null,
        sensingMenu:null,
        mousePosition:{
          x:0,
          y:0
        },
        keyCodeReference:{
          '空格':32
        }
      }
    },
    mounted () {
      let GSvg = this.$refs.guideSvg
      this.createEle(motion_module, GSvg)
      this.createEle(look_module, GSvg)
      this.createEle(event_module, GSvg)
      this.createEle(control_module, GSvg)
      this.createEle(sensing_module, GSvg)
      this.createEle(operator_module, GSvg)
      let dragArray = this.$refs.guideSvg.getElementsByClassName('blocklyDraggable')
      for (let i = 0; i < dragArray.length; i++) {
        this.addBlockyDragEvent(dragArray[i])
      }
      let argumentArray = this.$refs.guideSvg.getElementsByClassName('argumentDraggable')
      let booleanArray = this.$refs.guideSvg.getElementsByClassName('booleanDraggable')
      for (let i = 0; i < argumentArray.length; i++) {
        this.addBlockyArgumentEvent(argumentArray[i])
      }
      for (let i = 0; i < booleanArray.length; i++) {
        this.addBlockyBooleanEvent(booleanArray[i])
      }
      this.paintScroll()
      this.addScrollEvent()
      let that = this;
      this.addKeyDownlistener();
      document.getElementsByClassName('positionMenu')[0].onmousedown = function (ev) {
        ev.stopPropagation()
        if (document.onmousedown !== null) {
          document.onmousedown()
        }
        let {x,y} = that.getTransformXY(this.parentNode.getAttribute('transform'));
        x = x * 1 + 28;
        y = y * 1 + 30;
        let temp = 'translate(' + x + ',' + y + ')';
        let copy = that.positionMenu.cloneNode(true);
        copy.setAttribute('transform',temp);
        this.parentNode.parentNode.appendChild(copy);
        let menu = this;
        copy.onmousedown = function(ev){
          ev.stopPropagation();
          if(ev.target.classList.contains('blocklyText')){
            menu.getElementsByClassName('blocklyText')[0].textContent = ev.target.textContent;
            menu.parentNode.parentNode.removeChild(copy);
            copy = null;
            document.onmousedown = null;
          }
        }
        document.onmousedown = function (ev) {
          this.onmousedown = null;
          menu.parentNode.parentNode.removeChild(copy);
          copy = null;
        }
      }
      document.getElementsByClassName('sensingMenu')[0].onmousedown = function (ev) {
        ev.stopPropagation()
        if (document.onmousedown !== null) {
          document.onmousedown()
        }
        let {x,y} = that.getTransformXY(this.parentNode.getAttribute('transform'));
        x = x * 1 + 28;
        y = y * 1 + 30;
        let temp = 'translate(' + x + ',' + y + ')';
        let copy = that.sensingMenu.cloneNode(true);
        copy.setAttribute('transform',temp);
        this.parentNode.parentNode.appendChild(copy);
        let menu = this;
        copy.onmousedown = function(ev){
          ev.stopPropagation();
          if(ev.target.classList.contains('blocklyText')){
            menu.getElementsByClassName('blocklyText')[0].textContent = ev.target.textContent;
            menu.parentNode.parentNode.removeChild(copy);
            copy = null;
            document.onmousedown = null;
          }
        }
        document.onmousedown = function (ev) {
          this.onmousedown = null;
          menu.parentNode.parentNode.removeChild(copy);
          copy = null;
        }
      }
      let position_obj = {
        'tag':'g',
        'attributes':{//12  195   +28   +30
          'transform':'translate(40,225)'
        },
        'children':[
          {
            'tag':'path',
            'attributes':
              {
                'class':'blocklyPath',
                'stroke':'#3373CC',
                'fill':'#4C97FF',
                'fill-opacity':'1',
                'd':'M0,0 L100,0 L100,60 L0,60Z'
              }
          },
          {
            'tag':'text',
            'content':'鼠标位置',
            'attributes':{
              'class':'blocklyText',
              'text-anchor':'middle',
              'y':'0',
              'dominant-baseline':'middle',
              'dy':'0',
              'x':'0',
              'transform':'translate(50, 15)'
            }
          },
          {
            'tag':'text',
            'content':'随机位置',
            'attributes':{
              'class':'blocklyText',
              'text-anchor':'middle',
              'y':'0',
              'dominant-baseline':'middle',
              'dy':'0',
              'x':'0',
              'transform':'translate(50, 45)'
            }
          }
        ]
      }
      let sensing_obj = {
        'tag':'g',
        'attributes':{//12  195   +28   +30
          'transform':'translate(40,225)'
        },
        'children':[
          {
            'tag':'path',
            'attributes':
              {
                'class':'blocklyPath',
                'stroke':'#3373CC',
                'fill':'#4C97FF',
                'fill-opacity':'1',
                'd':'M0,0 L100,0 L100,60 L0,60Z'
              }
          },
          {
            'tag':'text',
            'content':'鼠标指针',
            'attributes':{
              'class':'blocklyText',
              'text-anchor':'middle',
              'y':'0',
              'dominant-baseline':'middle',
              'dy':'0',
              'x':'0',
              'transform':'translate(50, 15)'
            }
          },
          {
            'tag':'text',
            'content':'舞台边缘',
            'attributes':{
              'class':'blocklyText',
              'text-anchor':'middle',
              'y':'0',
              'dominant-baseline':'middle',
              'dy':'0',
              'x':'0',
              'transform':'translate(50, 45)'
            }
          }
        ]
      }
      this.positionMenu = this.createEle([position_obj]);
      this.sensingMenu = this.createEle([sensing_obj]);
      pubsub.subscribe('watchMouse',(subject)=>{
        this.watchMousePosition();
      })
      pubsub.subscribe('roleMouseDown',subject=>{
        let temp = this.$refs.drawSvg.getElementsByClassName('mousedownmark')
        if(temp.length !== 0){
          pubsub.publish('execute', temp[temp.length - 1].parentNode)
        }
      })
      setTimeout(()=>{
        pubsub.publish('guideComponent',this);
      },1000);

      pubsub.subscribe('word_event',(subject,answer)=>{
        let elements = that.$refs.drawSvg.getElementsByClassName('wordmark');
        for(let i = elements.length - 1 ; i >= 0 ; i--){
          if(answer === elements[i].firstChild.textContent){
            pubsub.publish('execute', elements[i].parentNode.parentNode)
          }
        }
      })
      pubsub.subscribe('save',(subject,filename)=>{
        let elements = this.$refs.drawSvg.childNodes;
        let temp = [];
        for(let i = 0 ; i < elements.length ; i++){
          let root = elements[i];
          let root_flag = true;
          while (root.prior){
            root = root.prior;
          }
          for(let j = 0 ; j < temp.length ; j++){
            if(temp[j] === root){
              root_flag = false;
            }
          }
          root_flag && temp.push(root);
        }
        let fileList = localStorage.getItem('fileList') || {};
        (typeof fileList === 'string') && (fileList = JSON.parse(fileList));
        for(let i = 0 ; i < temp.length ; i++){
          temp[i] = this.getString(temp[i]);
        }
        console.log(JSON.stringify(temp));
        fileList[filename] = temp;
        localStorage.setItem('fileList',JSON.stringify(fileList));
      })
      pubsub.subscribe('load_file',(subject,key)=>{
        let fileList = localStorage.getItem('fileList') || {};
        (typeof fileList === 'string') && (fileList = JSON.parse(fileList));
        if(fileList[key]){
          let elements = this.$refs.drawSvg.childNodes;
          for(let i = elements.length - 1; i >= 0 ; i --){
            this.$refs.drawSvg.removeChild(elements[i]);
          }
          this.createEle(fileList[key],this.$refs.drawSvg);


          let dragArray = this.$refs.drawSvg.getElementsByClassName('blocklyDraggable')
          for (let i = 0; i < dragArray.length; i++) {
            this.addDrawDragEvent(dragArray[i]);
          }

          let argumentArray = this.$refs.drawSvg.getElementsByClassName('argumentDraggable')
          let booleanArray = this.$refs.drawSvg.getElementsByClassName('booleanDraggable')
          for (let i = 0; i < argumentArray.length; i++) {
            this.addDrawArgumentEvent(argumentArray[i])
          }
          for (let i = 0; i < booleanArray.length; i++) {
            this.addDrawBooleanEvent(booleanArray[i])
          }

          let menuArray = this.$refs.drawSvg.getElementsByClassName('positionMenu');
          let that = this;
          for(let i = 0 ; i < menuArray.length ; i++){
            menuArray[i].onmousedown = function (ev) {
              ev.stopPropagation()
              if (document.onmousedown !== null) {
                document.onmousedown()
              }
              let {x,y} = that.getTransformXY(this.parentNode.getAttribute('transform'));
              x = x * 1 + 28;
              y = y * 1 + 30;
              let temp = 'translate(' + x + ',' + y + ')';
              let copy = that.positionMenu.cloneNode(true);
              copy.setAttribute('transform',temp);
              this.parentNode.parentNode.appendChild(copy);
              let menu = this;

              copy.onmousedown = function(ev){
                ev.stopPropagation();
                if(ev.target.classList.contains('blocklyText')){
                  menu.getElementsByClassName('blocklyText')[0].textContent = ev.target.textContent;
                  menu.parentNode.parentNode.removeChild(copy);
                  copy = null;
                  document.onmousedown = null;
                }
              }

              document.onmousedown = function (ev) {
                this.onmousedown = null;
                menu.parentNode.parentNode.removeChild(copy);
                copy = null;
              }
            }
          }

          let sensingMenu = this.$refs.drawSvg.getElementsByClassName('sensingMenu');
          for(let i = 0 ; i < sensingMenu.length ; i++){
            sensingMenu[i].onmousedown = function (ev) {
              ev.stopPropagation()
              if (document.onmousedown !== null) {
                document.onmousedown()
              }
              let x = this.parentNode.getBoundingClientRect().left - 260;
              let y = this.parentNode.getBoundingClientRect().top - 50;
              x = x * 1 + 28;
              y = y * 1 + 30;
              let temp = 'translate(' + x + ',' + y + ')';
              let copy = that.sensingMenu.cloneNode(true);
              copy.setAttribute('transform',temp);
              let parent = this.parentNode;
              while (parent = parent.parentNode){
                if(parent.classList.contains('drawFlyout')){
                  break;
                }
              }
              parent.appendChild(copy);
              let menu = this;
              copy.onmousedown = function(ev){
                ev.stopPropagation();
                if(ev.target.classList.contains('blocklyText')){
                  menu.getElementsByClassName('blocklyText')[0].textContent = ev.target.textContent;
                  parent.removeChild(copy);
                  copy = null;
                  document.onmousedown = null;
                }
              }
              document.onmousedown = function (ev) {
                this.onmousedown = null;
                parent.removeChild(copy);
                copy = null;
              }
            }
          }
        }
      })


    },
    methods: {
      addKeyDownlistener(){
        let that = this;
        document.onkeydown = function (ev) {
          if(ev.keyCode === 13){
            pubsub.publish('input_show')
          }else {
            let elements = that.$refs.drawSvg.getElementsByClassName('keydownmark');
            for(let i = elements.length - 1 ; i >= 0 ; i--){
              if(ev.keyCode === that.keyCodeReference[elements[i].getElementsByClassName('blocklyText')[0].textContent]){
                pubsub.publish('execute', elements[i].parentNode)
              }
            }
          }
        }
      },
      //点击导航栏类别
      categoryChange (index) {
        let refs = [10, 295, 635, 910, 1529, 1820, 2500]
        let max_height = 2500 - this.$refs.scrollbackground.getBoundingClientRect().height * 1
        refs[index] > max_height && (this.now_visit_y = max_height)
        refs[index] <= max_height && (this.now_visit_y = refs[index])
        let svgHeight = this.$refs.guideSvg.getAttribute('height')
        let temp = (this.now_visit_y / svgHeight * this.BackGroundHeight)
        this.$refs.scroll.setAttribute('y', temp + '')
      },
      //添加滚条的监听
      addScrollEvent () {
        //添加滚条监听
        let scroll = this.$refs.scroll
        let svg = this.$refs.guideSvg
        let that = this
        scroll.onmousedown = function (ev) {
          let event = ev || window.event  //兼容IE浏览器
          //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
          let client = this.getBoundingClientRect()
          let diffY = event.clientY - client.top
          document.onmousemove = function (ev) {
            let event = ev || window.event
            let moveY = event.clientY - diffY - 50
            if ((moveY >= 0) && (moveY <= that.BackGroundHeight - that.scrollHeight)) {
              scroll.setAttribute('y', moveY + '')
              let rate = moveY / that.BackGroundHeight
              let svgHeight = svg.getAttribute('height')
              that.now_visit_y = rate * svgHeight
            }
          }
          document.onmouseup = function (ev) {
            that.watchMousePosition();
            this.onmouseup = null
          }
        }

      },

      watchMousePosition(){
        let that = this;
        document.onmousemove = function (ev) {
          that.mousePosition.x = ev.clientX;
          that.mousePosition.y = ev.clientY;
        }
      },
      //绘画滚条
      paintScroll () {
        let svgHeight = this.$refs.guideSvg.getAttribute('height')
        this.BackGroundHeight = this.$refs.scrollbackground.getBoundingClientRect().height
        this.scrollHeight = Math.pow(this.BackGroundHeight, 2) / svgHeight
        let scroll = this.$refs.scroll
        scroll.setAttribute('height', this.scrollHeight)
        scroll.setAttribute('y', '0')
      },
      //创建元素算法
      createEle (eleArray, target) {
        for (let i = 0; i < eleArray.length; i++) {
          let dom = this.createTag(eleArray[i].attributes, eleArray[i].tag)
          if (eleArray[i].children) {
            this.createEle(eleArray[i].children, dom)
          }
          if (eleArray[i].content) {
            dom.textContent = eleArray[i].content
          }

          eleArray[i].next && this.load_file(dom,eleArray[i].next,target,'next');
          eleArray[i].innernext && this.load_file(dom,eleArray[i].innernext,target,'innernext');
          eleArray[i].ifnext && this.load_file(dom,eleArray[i].ifnext,target,'ifnext');
          eleArray[i].elsenext && this.load_file(dom,eleArray[i].elsenext,target,'elsenext');


          if(target){
            target.appendChild(dom)
          }else {
            return dom;
          }
        }
      },
      load_file(prior,obj,target,position){
        let dom = this.createTag(obj.attributes, obj.tag);

        if (obj.children) {
          this.createEle(obj.children, dom);
        }

        if (obj.content) {
          dom.textContent = obj.content;
        }

        prior[position] = dom;
        dom.prior = prior;
        target.appendChild(dom)
        obj.next && this.load_file(dom,obj.next,target,'next');
        obj.innernext && this.load_file(dom,obj.innernext,target,'innernext');
        obj.ifnext && this.load_file(dom,obj.ifnext,target,'ifnext');
        obj.elsenext && this.load_file(dom,obj.elsenext,target,'elsenext');
      },
      //创建标签算法
      createTag (attrs, tag) {
        let dom = document.createElementNS('http://www.w3.org/2000/svg', tag)
        let shape
        for (let attr in attrs) {
          if (attr === 'shape') {
            shape = attrs[attr]
          }
          if (attr === 'class') {
            dom.classList.add(attrs[attr])
            continue
          }
          if (attr === 'xlink:href') {
            dom.setAttributeNS('http://www.w3.org/1999/xlink', attr, attrs[attr])
            continue
          }
          dom.setAttribute(attr, attrs[attr])
        }
        if (shape === 'normal') {
          dom.setAttribute('d', dom.getAttribute('d1') + dom.getAttribute('d_width') + dom.getAttribute('d2'))
        }
        if (shape === 'c') {
          dom.setAttribute('d', dom.getAttribute('d1') + dom.getAttribute('c-width') + dom.getAttribute('d2') +
            dom.getAttribute('c-height') + dom.getAttribute('d3') + dom.getAttribute('c-width') +
            dom.getAttribute('d4') + dom.getAttribute('c-width') + dom.getAttribute('d5'))
        }
        if (shape === 'e') {
          dom.setAttribute('d', dom.getAttribute('d1') + dom.getAttribute('e-width') + dom.getAttribute('d2') +
            dom.getAttribute('e-if-height') + dom.getAttribute('d3') + dom.getAttribute('e-width') +
            dom.getAttribute('d4') + dom.getAttribute('e-width') + dom.getAttribute('d5') +
            dom.getAttribute('e-else-height') + dom.getAttribute('d6') + dom.getAttribute('e-width') + dom.getAttribute('d7'))
        }
        return dom
      },
      //blocky区域的拖动事件
      addBlockyDragEvent (drag) {
        let that = this
        let res, lastPosition
        drag.onmousedown = function (ev) {
          ev.stopPropagation()
          if (document.onmousedown !== null) {
            document.onmousedown()
          }
          if (ev.target.getAttribute('textArea')) {
            that.textEvent(ev)
          } else {
            let event = ev || window.event  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let client = this.getBoundingClientRect()
            let diffX = event.clientX - client.left
            let diffY = event.clientY - client.top
            let copy = drag.cloneNode(true)
            copy.classList.add('blocklySelected')
            that.addMyAttribute(copy)
            that.$refs.guideSvg.appendChild(copy)
            document.onmousemove = function (ev) {
              if (that.positionForecast) {
                let {x, y} = that.getTransformXY(that.positionForecast.getAttribute('transform'))
                let tar = that.getTransformXY(copy.getAttribute('transform'))
                tar.x = tar.x * 1 - 200
                tar.y = tar.y * 1 - that.now_visit_y * 1
                if (!that.interacts(x, y, tar.x, tar.y)) {
                  that.$refs.drawSvg.removeChild(that.positionForecast)
                  that.positionForecast_stop(lastPosition)
                  lastPosition === 'innernext' && that.positionForecast.next && that.innernextpaint(that.positionForecast.next, false)
                  lastPosition === 'ifnext' && that.positionForecast.next && that.innernextpaint(that.positionForecast.next, false)
                  lastPosition === 'elsenext' && that.positionForecast.next && that.innernextpaint(that.positionForecast.next, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.setAttribute('transform', that.positionForecast.getAttribute('transform'));
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.next && that.nextpaint(that.positionForecast.next.next, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.innernext && that.innernextpaint(that.positionForecast.next.innernext, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.ifnext && that.innernextpaint(that.positionForecast.next.ifnext, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.elsenext && that.elsenextpaint(that.positionForecast.next.elsenext, false)
                  that.prior_height_change(that.positionForecast, true)
                  that.positionForecast.prior = null
                  that.positionForecast.next = null
                  that.positionForecast.remove()
                  that.positionForecast = null
                }
              }
              if (!that.positionForecast) {
                res = that.connectable(copy, true)
                if (res.result) {
                  lastPosition = res.position
                  let width = copy.firstChild.getAttribute('d_width') || copy.firstChild.getAttribute('c-width') || copy.firstChild.getAttribute('e-width')
                  that.new_positionForecast(copy, width, true)
                  that.normalConnectedActive(that.positionForecast, res, false)
                }
              }
              let event = ev || window.event
              let moveX = event.clientX - diffX - 60
              let moveY = event.clientY - diffY - 50
              let temp_y = moveY * 1 + that.now_visit_y * 1
              let temp = 'translate(' + moveX + ',' + temp_y + ') scale(0.675)'
              copy.setAttribute('transform', temp)
            }
            document.onmouseup = function (ev) {
              that.watchMousePosition();
              this.onmouseup = null
              copy.classList.remove('blocklySelected')
              if (that.positionForecast) {
                that.positionForecast_stop(lastPosition)
                that.positionForecast.prior = null
                that.positionForecast.next = null
                that.positionForecast.remove()
                that.positionForecast = null
              }
              let t = copy.getAttribute('transform')
              let {x, y} = that.getTransformXY(t)
              if (that.isInDraw(x, y, true)) {
                that.paintInDraw(copy, x, y)
                res && res.result && that.normalConnectedActive(copy, res, false)
              } else {
                that.$refs.guideSvg.removeChild(copy)
              }
              lastPosition = ''
              res = null
            }
          }
        }
      },
      //获得transform中 x,y的函数
      getTransformXY (s) {
        s = s.match(/\((.+?)\)/g)[0]
        s = s.split(',')
        return {
          'x': s[0].slice(1),
          'y': s[1].slice(0, -1)
        }
      },
      //将拖动到draw区域的指令绘制在draw区域
      paintInDraw (ele, x, y) {
        x = x - 200
        y = y - this.now_visit_y * 1
        this.$refs.drawSvg.appendChild(ele)
        let temp = 'translate(' + x + ',' + y + ') scale(0.675)'
        ele.setAttribute('transform', temp)
        this.addDrawDragEvent(ele);
        if(ele.getElementsByClassName('positionMenu').length === 1){
          let that = this;
          ele.getElementsByClassName('positionMenu')[0].onmousedown = function (ev) {
            ev.stopPropagation()
            if (document.onmousedown !== null) {
              document.onmousedown()
            }
            let {x,y} = that.getTransformXY(this.parentNode.getAttribute('transform'));
            x = x * 1 + 28;
            y = y * 1 + 30;
            let temp = 'translate(' + x + ',' + y + ')';
            let copy = that.positionMenu.cloneNode(true);
            copy.setAttribute('transform',temp);
            this.parentNode.parentNode.appendChild(copy);
            let menu = this;

            copy.onmousedown = function(ev){
              ev.stopPropagation();
              if(ev.target.classList.contains('blocklyText')){
                menu.getElementsByClassName('blocklyText')[0].textContent = ev.target.textContent;
                menu.parentNode.parentNode.removeChild(copy);
                copy = null;
                document.onmousedown = null;
              }
            }

            document.onmousedown = function (ev) {
              this.onmousedown = null;
              menu.parentNode.parentNode.removeChild(copy);
              copy = null;
            }
          }
        }
      },
      paintArgumentInDraw (ele, x, y) {
        x = x - 200
        y = y - this.now_visit_y * 1
        this.$refs.drawSvg.appendChild(ele)
        let temp = 'translate(' + x + ',' + y + ') scale(0.675)'
        ele.setAttribute('transform', temp)
        this.addDrawArgumentEvent(ele)
      },
      paintBooleanInDraw (ele, x, y) {
        x = x - 200
        y = y - this.now_visit_y * 1
        this.$refs.drawSvg.appendChild(ele)
        let temp = 'translate(' + x + ',' + y + ') scale(0.675)'
        ele.setAttribute('transform', temp)
        this.addDrawBooleanEvent(ele)
        if(ele.getElementsByClassName('sensingMenu').length === 1){
          let that = this;
          ele.getElementsByClassName('sensingMenu')[0].onmousedown = function (ev) {
            ev.stopPropagation()
            if (document.onmousedown !== null) {
              document.onmousedown()
            }
            let x = this.parentNode.getBoundingClientRect().left - 260;
            let y = this.parentNode.getBoundingClientRect().top - 50;
            x = x * 1 + 28;
            y = y * 1 + 30;
            let temp = 'translate(' + x + ',' + y + ')';
            let copy = that.sensingMenu.cloneNode(true);
            copy.setAttribute('transform',temp);
            let parent = this.parentNode;
            while (parent = parent.parentNode){
              if(parent.classList.contains('drawFlyout')){
                break;
              }
            }
            parent.appendChild(copy);
            let menu = this;
            copy.onmousedown = function(ev){
              ev.stopPropagation();
              if(ev.target.classList.contains('blocklyText')){
                menu.getElementsByClassName('blocklyText')[0].textContent = ev.target.textContent;
                parent.removeChild(copy);
                copy = null;
                document.onmousedown = null;
              }
            }
            document.onmousedown = function (ev) {
              this.onmousedown = null;
              parent.removeChild(copy);
              copy = null;
            }
          }
        }
      },
      //判断指令是否在draw区域
      isInDraw (x, y, y_flag) {
        x = x - 200
        if (y_flag) {
          y = y * 1 - this.now_visit_y * 1
        } else {
          y = y * 1
        }
        let drawSvg = this.$refs.drawSvg
        let {width, height} = drawSvg.getBoundingClientRect()
        return (x > 0 && x < width) && (y > 0 && y < height)
      },
      //draw区域的拖动事件
      addDrawDragEvent (ele) {//逻辑区域的模块拖动事件
        let that = this
        let lastPosition
        let res
        let excuteFlag
        ele.onmousedown = function (ev) {
          ev.stopPropagation()
          if (document.onmousedown !== null) {
            document.onmousedown()
          }
          if (ev.target.getAttribute('textArea')) {
            that.textEvent(ev)
          } else {
            excuteFlag = true
            that.alwaysShow(ele)
            let event = ev || window.event  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let client = this.getBoundingClientRect()
            let diffX = event.clientX - client.left
            let diffY = event.clientY - client.top
            document.onmousemove = function (ev) {
              excuteFlag = false
              ele.prior && that.stop_prior_height_change(ele)//前驱断掉  以及c型指令的高度变化
              that.nextAddShadows(ele, 'blocklySelected')
              if (that.positionForecast) {
                let {x, y} = that.getTransformXY(that.positionForecast.getAttribute('transform'))
                let tar = that.getTransformXY(ele.getAttribute('transform'))
                if (!that.interacts(x, y, tar.x, tar.y)) {
                  that.$refs.drawSvg.removeChild(that.positionForecast)
                  that.positionForecast_stop(lastPosition)
                  lastPosition === 'innernext' && that.positionForecast.next && that.innernextpaint(that.positionForecast.next, false)
                  lastPosition === 'ifnext' && that.positionForecast.next && that.innernextpaint(that.positionForecast.next, false)
                  lastPosition === 'elsenext' && that.positionForecast.next && that.innernextpaint(that.positionForecast.next, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.setAttribute('transform', that.positionForecast.getAttribute('transform'));
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.next && that.nextpaint(that.positionForecast.next.next, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.innernext && that.innernextpaint(that.positionForecast.next.innernext, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.ifnext && that.innernextpaint(that.positionForecast.next.ifnext, false);
                  (lastPosition === 'prior' || lastPosition === 'next') && that.positionForecast.next && that.positionForecast.next.elsenext && that.elsenextpaint(that.positionForecast.next.elsenext, false)
                  that.prior_height_change(that.positionForecast, true)
                  that.positionForecast.prior = null
                  that.positionForecast.next = null
                  that.positionForecast.remove()
                  that.positionForecast = null
                }
              }
              if (!that.positionForecast) {
                res = that.connectable(ele, false)
                if (res.result) {
                  lastPosition = res.position
                  let width = ele.firstChild.getAttribute('d_width') || ele.firstChild.getAttribute('c-width') || ele.firstChild.getAttribute('e-width')
                  that.new_positionForecast(ele, width, false)
                  that.normalConnectedActive(that.positionForecast, res, false)
                }
              }
              let event = ev || window.event
              let moveX = event.clientX - diffX - 260
              let moveY = event.clientY - diffY - 50
              let temp = 'translate(' + moveX + ',' + moveY + ') scale(0.675)'
              ele.setAttribute('transform', temp)
              ele.innernext && that.innernextpaint(ele.innernext, false)
              ele.next && that.nextpaint(ele.next, false)
              ele.ifnext && that.innernextpaint(ele.ifnext, false)
              ele.elsenext && that.elsenextpaint(ele.elsenext, false)
            }
            document.onmouseup = function (ev) {
              that.watchMousePosition();
              this.onmouseup = null
              if (!excuteFlag) {
                if (that.positionForecast) {
                  that.positionForecast_stop(lastPosition)
                  that.positionForecast.prior = null
                  that.positionForecast.next = null
                  that.positionForecast.remove()
                  that.positionForecast = null
                }
                that.nextRemoveShadows(ele, 'blocklySelected')
                res && res.result && that.normalConnectedActive(ele, res, false)
                let t = ele.getAttribute('transform')
                let {x, y} = that.getTransformXY(t)
                if (!that.isInDraw(x * 1 + 200, y, false)) {
                  that.nextDelete(ele)
                }
                lastPosition = ''
                res = null
              } else {
                let start = ele
                while (start.prior) {
                  start = start.prior
                }
                that.addExecuteCss(start)
                pubsub.publish('execute', start)
              }
            }
          }
        }
      },
      getString(blockly){
        let innernext,next,ifnext,elsenext;
        blockly.innernext && (innernext = this.getString(blockly.innernext));
        blockly.next && (next = this.getString(blockly.next));
        blockly.ifnext && (ifnext = this.getString(blockly.ifnext));
        blockly.elsenext && (elsenext = this.getString(blockly.elsenext));

        let obj = {};
        obj.tag = blockly.tagName;
        blockly.attributes.length !== 0 && (obj.attributes = {})
        for(let attr in blockly.attributes){
          if(blockly.attributes[attr].nodeValue === undefined){
            break;
          }
          obj.attributes[blockly.attributes[attr].nodeName] = blockly.attributes[attr].nodeValue;
        }
        obj.children = this.getChildrenString(blockly.childNodes)

        blockly.innernext && (obj.innernext = innernext);
        blockly.next && (obj.next = next);
        blockly.ifnext && (obj.ifnext = ifnext);
        blockly.elsenext && (obj.elsenext = elsenext);
        return obj;
      },
      getChildrenString(childNodes){
        let res = [];
        Array.prototype.slice.call(childNodes).forEach(child =>{
            if(child.textContent !== '' && child.childNodes.length === 0){
              res =  child.textContent;
            }else{
              let obj = {}
              obj.tag = child.tagName;
              child.attributes && child.attributes.length !== 0 && (obj.attributes = {})
              for(let attr in child.attributes){
                if(child.attributes[attr].nodeValue === undefined){
                  break;
                }
                obj.attributes[child.attributes[attr].nodeName] = child.attributes[attr].nodeValue
              }
              let temp;
              child.childNodes.length !== 0 &&  (temp = this.getChildrenString(child.childNodes));
              typeof temp === 'string' && (obj.content = temp);
              typeof temp === 'object' && (obj.children = temp)
              res.push(obj);
            }
        })
        return res;
      },
      nextAddShadows (blockly, className) {
        blockly.classList.add(className)
        blockly.innernext && this.nextAddShadows(blockly.innernext, className)
        blockly.next && this.nextAddShadows(blockly.next, className)
        blockly.ifnext && this.nextAddShadows(blockly.ifnext, className)
        blockly.elsenext && this.nextAddShadows(blockly.elsenext, className)
      },
      nextRemoveShadows (blockly, className) {
        blockly.classList.remove(className)
        blockly.innernext && this.nextRemoveShadows(blockly.innernext, className)
        blockly.next && this.nextRemoveShadows(blockly.next, className)
        blockly.ifnext && this.nextRemoveShadows(blockly.ifnext, className)
        blockly.elsenext && this.nextRemoveShadows(blockly.elsenext, className)
      },
      //文本编辑监听函数
      textEvent (ev) {
        let textArea
        let that = this
        if (ev.target.parentNode.classList.contains('blocklyEditableTextArea')) {
          textArea = ev.target.parentNode
        } else {
          textArea = ev.target.parentNode.parentNode
        }
        let text = textArea.getElementsByClassName('blocklyEditableText')[0]
        // if(document.onmousedown !== null){
        //   document.onmousedown();
        // }
        textArea.firstChild.classList.add('blocklyEditableTextSelected')
        document.onkeydown = function (ev) {
          // 删除 keycode : 8 , # : 51
          let old_width = text.getBoundingClientRect().width
          if (ev.keyCode === 8) {
            if (text.textContent === '') {
              return
            }
            text.textContent = text.textContent.slice(0, -1)
          } else if ((ev.keyCode >= 48 && ev.keyCode <= 57) || (ev.keyCode >= 65 && ev.keyCode <= 90) || (ev.keyCode >= 96 && ev.keyCode <= 105) || ev.keyCode === 51 || ev.keyCode === 109 || ev.keyCode === 110 || ev.keyCode === 32) {
            text.textContent = text.textContent + ev.key
          } else {
            return
          }
          let new_width = text.getBoundingClientRect().width
          let diff_width = new_width - old_width
          textArea.parentNode.getAttribute('shape') === 'normal' && that.normalWidthChange(textArea, diff_width)
          textArea.parentNode.getAttribute('shape') === 'noPrior' && that.normalWidthChange(textArea, diff_width)
          textArea.parentNode.getAttribute('shape') === 'c' && that.cWidthChange(textArea, diff_width)
          textArea.parentNode.getAttribute('shape') === 'arg' && that.normalWidthChange(textArea, diff_width)
        }
        document.onmousedown = function (ev) {
          textArea.getElementsByTagName('path')[0].classList.remove('blocklyEditableTextSelected')
          this.onmousedown = null
          that.addKeyDownlistener();
        }
      },
      argumentTextEvent (ev) {
        let textArea
        let that = this
        if (ev.target.parentNode.classList.contains('blocklyEditableTextArea')) {
          textArea = ev.target.parentNode
        } else {
          textArea = ev.target.parentNode.parentNode
        }
        let text = textArea.getElementsByClassName('blocklyEditableText')[0]
        // if(document.onmousedown !== null){
        //   document.onmousedown();
        // }
        textArea.firstChild.classList.add('blocklyEditableTextSelected')
        let diff_width = 0
        document.onkeydown = function (ev) {
          // 删除 keycode : 8 , # : 51
          let old_width = text.getBoundingClientRect().width
          if (ev.keyCode === 8) {
            if (text.textContent === '') {
              return
            }
            text.textContent = text.textContent.slice(0, -1)
          } else if ((ev.keyCode >= 48 && ev.keyCode <= 57) || (ev.keyCode >= 65 && ev.keyCode <= 90) || (ev.keyCode >= 96 && ev.keyCode <= 105) || ev.keyCode === 51 || ev.keyCode === 109 || ev.keyCode === 110 || ev.keyCode === 32) {
            text.textContent = text.textContent + ev.key
          } else {
            return
          }
          let new_width = text.getBoundingClientRect().width
          diff_width = new_width - old_width
          that.normalWidthChange(textArea, diff_width)
          textArea.parentNode.parentNode.getAttribute('shape') === 'arg' && that.ArgumentNormalWidthChange(textArea.parentNode, diff_width)
        }
        document.onmousedown = function (ev) {
          textArea.getElementsByTagName('path')[0].classList.remove('blocklyEditableTextSelected')
          this.onmousedown = null
          that.addKeyDownlistener();
        }
      },
      //普通指令模块的width改变
      normalWidthChange (textArea, diff_width) {
        let path_1 = textArea.firstChild
        let path_2 = textArea.parentNode.firstChild
        path_1.setAttribute('d_width', (path_1.getAttribute('d_width') * 1 + diff_width / 0.675))
        path_1.setAttribute('d', path_1.getAttribute('d1') + path_1.getAttribute('d_width') + path_1.getAttribute('d2'))
        path_2.setAttribute('d_width', path_2.getAttribute('d_width') * 1 + diff_width / 0.675)
        path_2.setAttribute('d', path_2.getAttribute('d1') + path_2.getAttribute('d_width') + path_2.getAttribute('d2'))
        let next = textArea.nextSibling
        while (next) {
          let {x, y} = this.getTransformXY(next.getAttribute('transform'))
          x = x * 1 + diff_width / 0.675
          let temp = 'translate(' + x + ',' + y + ')'
          next.setAttribute('transform', temp)
          next = next.nextSibling
        }
      },
      //c型指令模块的width改变
      cWidthChange (textArea, diff_width) {
        let path_1 = textArea.firstChild
        let path_2 = textArea.parentNode.firstChild
        let path_2_new_width = path_2.getAttribute('c-width') * 1 + diff_width / 0.675
        path_1.setAttribute('d_width', (path_1.getAttribute('d_width') * 1 + diff_width / 0.675))
        path_1.setAttribute('d', path_1.getAttribute('d1') + path_1.getAttribute('d_width') + path_1.getAttribute('d2'))
        let temp_d = path_2.getAttribute('d1') + path_2_new_width + path_2.getAttribute('d2') +
          path_2.getAttribute('c-height') + path_2.getAttribute('d3') + path_2_new_width + path_2.getAttribute('d4') +
          path_2_new_width + path_2.getAttribute('d5')
        path_2.setAttribute('c-width', path_2_new_width)
        path_2.setAttribute('d', temp_d)
        let next = textArea.nextSibling
        while (next) {
          let {x, y} = this.getTransformXY(next.getAttribute('transform'))
          x = x * 1 + diff_width / 0.675
          let temp = 'translate(' + x + ',' + y + ')'
          next.setAttribute('transform', temp)
          next = next.nextSibling
        }
      },
      //模块碰撞算法
      connectable (tar, add_now_y_flag) {
        let dragArray = this.$refs.drawSvg.getElementsByClassName('blocklyDraggable');
        let {x, y} = this.getTransformXY(tar.getAttribute('transform'))
        let res_x, res_y, position
        if (add_now_y_flag) {
          y = y * 1 + this.now_visit_y * -1
          x = x * 1 - 200
        }
        let tar_x = x, tar_y = y, flag = false, index = -1, temp = 100
        let tar_shape = tar.getAttribute('shape')
        for (let i = 0; i < dragArray.length; i++) {
          if (dragArray[i] === tar || dragArray[i].classList.contains('blocklySelected')) {
            continue
          }
          let shape = dragArray[i].getAttribute('shape')
          let {x, y} = this.getTransformXY(dragArray[i].getAttribute('transform'))
          let top_x = x * 1, top_y = y * 1
          let bottom_x = x * 1, bottom_y = y * 1 + dragArray[i].getAttribute('shape-height') * 1
          if (this.interacts(top_x, top_y, tar_x, tar_y) && shape !== 'noPrior') {
            if (tar_shape === 'noPrior' && dragArray[i].prior) {
              continue
            }
            flag = true
            let t = Math.abs(top_x - tar_x) + Math.abs(top_y - tar_y)
            if (t < temp) {
              temp = t
              index = i
              res_x = top_x
              res_y = top_y
              position = 'prior'
            }
          }
          if (this.interacts(bottom_x, bottom_y, tar_x, tar_y) && tar_shape !== 'noPrior') {
            flag = true
            let t = Math.abs(bottom_x - tar_x) + Math.abs(bottom_y - tar_y)
            if (t < temp) {
              temp = t
              index = i
              res_x = bottom_x
              res_y = bottom_y
              position = 'next'
            }
          }
          if (shape === 'c' && tar_shape !== 'noPrior') {
            let inner_x = x * 1 + 11, inner_y = y * 1 + 33
            if (this.interacts(inner_x, inner_y, tar_x, tar_y)) {
              flag = true
              let t = Math.abs(inner_x - tar_x) + Math.abs(inner_y - tar_y)
              if (t < temp) {
                temp = t
                index = i
                res_x = inner_x
                res_y = inner_y
                position = 'innernext'
              }
            }
          }
          if (shape === 'e' && tar_shape !== 'noPrior') {
            let if_x = x * 1 + 11, if_y = y * 1 + 33
            if (this.interacts(if_x, if_y, tar_x, tar_y)) {
              flag = true
              let t = Math.abs(if_x - tar_x) + Math.abs(if_y - tar_y)
              if (t < temp) {
                temp = t
                index = i
                res_x = if_x
                res_y = if_y
                position = 'ifnext'
              }
            }
            let if_height = dragArray[i].getAttribute('if-height') * 1
            let else_x = x * 1 + 11, else_y = y * 1 + if_height + 55
            if (this.interacts(else_x, else_y, tar_x, tar_y)) {
              flag = true
              let t = Math.abs(else_x - tar_x) + Math.abs(else_y - tar_y)
              if (t < temp) {
                temp = t
                index = i
                res_x = else_x
                res_y = else_y
                position = 'elsenext'
              }
            }
          }
        }
        return {
          'result': flag,
          'matchResult': dragArray[index],
          'x': res_x,
          'y': res_y,
          'position': position
        }
      },
      //普通模块碰撞检测
      interacts (x, y, tar_x, tar_y) {
        return ((tar_y * 1 > (y * 1 - 33)) && (tar_y * 1 < (y * 1 + 33))) && ((tar_x * 1 > (x * 1 - 33)) && (tar_x * 1 < (x * 1 + 33)))
      },
      //模块连接
      normalConnectedActive (tar, refs, add_now_y_flag) {
        let connectable = refs.matchResult
        let x = refs.x * 1
        let y = refs.y * 1
        if (add_now_y_flag) {
          y = y + this.now_visit_y * 1
          x = x + 200
        }
        if (refs.position === 'next' || refs.position === 'innernext' || refs.position === 'ifnext' || refs.position === 'elsenext') {
          if (connectable[refs.position]) {
            let tar_next = tar
            while (tar_next.next) {
              tar_next = tar_next.next
            }
            tar_next.next = connectable[refs.position]
            connectable[refs.position].prior = tar_next
          }
          connectable[refs.position] = tar
          tar.prior = connectable
        } else {
          if (connectable.prior) {
            tar.prior = connectable.prior
            connectable.prior.next = tar
          }
          let tar_next = tar
          while (tar_next.next) {
            tar_next = tar_next.next
          }
          connectable.prior = tar_next
          tar_next.next = connectable
        }
        let temp = 'translate(' + x + ',' + y + ') scale(0.675)'
        tar.setAttribute('transform', temp)
        if (add_now_y_flag) {
          y = y - this.now_visit_y
          x = x - 200
        }
        tar.next && this.nextpaint(tar.next, add_now_y_flag)
        tar.innernext && this.innernextpaint(tar.innernext, false)
        tar.ifnext && this.innernextpaint(tar.ifnext, false)
        tar.elsenext && this.elsenextpaint(tar.elsenext, false)
        this.prior_height_change(tar)
      },
      //添加链表属性
      addMyAttribute (target) {
        target.next = null
        target.prior = null
        if (target.getAttribute('shape') === 'c') {
          target.innernext = null
        }
        if (target.getAttribute('shape') === 'e') {
          target.ifnext = null
          target.elsenext = null
        }
      },
      //shape-c模块高度变化算法
      cHeightchange (c_target) {
        let path = c_target.firstChild
        let old_height = path.getAttribute('c-height') * 1
        let new_height = 0
        let tar_next = c_target.innernext
        while (tar_next) {
          new_height = new_height + tar_next.getAttribute('shape-height') * 1
          tar_next = tar_next.next
        }
        new_height = new_height / 0.675 - 7
        if (new_height <= 33) {
          new_height = 16
        }
        let diff = new_height - old_height
        // new_height = new_height / 0.675;
        let temp_d = path.getAttribute('d1') + path.getAttribute('c-width') + path.getAttribute('d2') +
          new_height + path.getAttribute('d3') + path.getAttribute('c-width') + path.getAttribute('d4') +
          path.getAttribute('c-width') + path.getAttribute('d5')
        path.setAttribute('d', temp_d)
        path.setAttribute('c-height', new_height)
        c_target.setAttribute('shape-height', c_target.getAttribute('shape-height') * 1 + diff * 0.675)
        if (c_target.getAttribute('data-id') !== 'control_if') {
          let repeat_svg = c_target.lastChild
          let {x, y} = this.getTransformXY(repeat_svg.getAttribute('transform'))
          let new_y = y * 1 + diff
          let temp_transform = 'translate(' + x + ',' + new_y + ')'
          repeat_svg.setAttribute('transform', temp_transform)
        }
        //next的变化
        c_target.next && this.nextpaint(c_target.next, false)
      },
      eHeightchange (c_target) {
        let path = c_target.firstChild
        let old_if_height = path.getAttribute('e-if-height') * 1
        let old_else_height = path.getAttribute('e-else-height') * 1
        let new_if_height = 0, new_else_height = 0
        let tar_if_next = c_target.ifnext, tar_else_next = c_target.elsenext
        while (tar_if_next) {
          new_if_height = new_if_height + tar_if_next.getAttribute('shape-height') * 1
          tar_if_next = tar_if_next.next
        }
        c_target.setAttribute('if-height', new_if_height)
        new_if_height = new_if_height / 0.675 - 7
        while (tar_else_next) {
          new_else_height = new_else_height + tar_else_next.getAttribute('shape-height') * 1
          tar_else_next = tar_else_next.next
        }
        new_else_height = new_else_height / 0.675 - 7
        if (new_if_height <= 33) {
          new_if_height = 16
          c_target.setAttribute('if-height', new_if_height)
        }
        if (new_else_height <= 33) {
          new_else_height = 16
        }
        let diff_if = new_if_height - old_if_height
        let diff_else = new_else_height - old_else_height
        // new_height = new_height / 0.675;
        let temp_d = path.getAttribute('d1') + path.getAttribute('e-width') + path.getAttribute('d2') +
          new_if_height + path.getAttribute('d3') + path.getAttribute('e-width') +
          path.getAttribute('d4') + path.getAttribute('e-width') + path.getAttribute('d5') +
          new_else_height + path.getAttribute('d6') + path.getAttribute('e-width') + path.getAttribute('d7')
        path.setAttribute('d', temp_d)
        path.setAttribute('e-if-height', new_if_height)
        path.setAttribute('e-else-height', new_else_height)
        c_target.setAttribute('shape-height', c_target.getAttribute('shape-height') * 1 + diff_if * 0.675 + diff_else * 0.675)
        let _name = c_target.lastChild
        let {x, y} = this.getTransformXY(_name.getAttribute('transform'))
        let new_y = y * 1 + diff_if
        let temp_transform = 'translate(' + x + ',' + new_y + ')'
        _name.setAttribute('transform', temp_transform)
        //next的变化
        c_target.elsenext && this.elsenextpaint(c_target.elsenext, false)
        c_target.next && this.nextpaint(c_target.next, false)
      },
      nextpaint (target, blockyflag) {
        let {x, y} = this.getTransformXY(target.prior.getAttribute('transform'))
        if (blockyflag) {
          y = y * 1 - this.now_visit_y
          x = x * 1 - 200
          y = y + target.prior.getAttribute('shape-height') * 1
        } else {
          y = y * 1 + target.prior.getAttribute('shape-height') * 1
        }
        let temp_transform = 'translate(' + x + ',' + y + ') scale(0.675)'
        target.setAttribute('transform', temp_transform)
        target.innernext && this.innernextpaint(target.innernext, false)
        target.next && this.nextpaint(target.next, false)
        target.ifnext && this.innernextpaint(target.ifnext, false)
        target.elsenext && this.elsenextpaint(target.elsenext, false)
      },
      innernextpaint (target, blockyflag) {
        let {x, y} = this.getTransformXY(target.prior.getAttribute('transform'))
        if (blockyflag) {
          y = y * 1 + this.now_visit_y
          x = x * 1 + 200
          y = y * 1 + 33
          x = x * 1 + 11
        } else {
          y = y * 1 + 33
          x = x * 1 + 11
        }
        let temp_transform = 'translate(' + x + ',' + y + ') scale(0.675)'
        target.setAttribute('transform', temp_transform)
        target.innernext && this.innernextpaint(target.innernext, false)
        target.next && this.nextpaint(target.next, false)
        target.ifnext && this.innernextpaint(target.ifnext, false)
        target.elsenext && this.elsenextpaint(target.elsenext, false)
      },
      elsenextpaint (target, blockyflag) {
        let {x, y} = this.getTransformXY(target.prior.getAttribute('transform'))
        let if_shape_height = target.prior.getAttribute('if-height')
        if (blockyflag) {
          y = y * 1 + this.now_visit_y
          x = x * 1 + 200
          y = y * 1 + if_shape_height * 1 + 55
          x = x * 1 + 11
        } else {
          y = y * 1 + if_shape_height * 1 + 55
          x = x * 1 + 11
        }
        let temp_transform = 'translate(' + x + ',' + y + ') scale(0.675)'
        target.setAttribute('transform', temp_transform)
        target.innernext && this.innernextpaint(target.innernext, false)
        target.next && this.nextpaint(target.next, false)
        target.ifnext && this.innernextpaint(target.ifnext, false)
        target.elsenext && this.elsenextpaint(target.elsenext, false)
      },
      nextDelete (dom) {
        this.$refs.drawSvg.removeChild(dom)
        dom.onmousedown = null
        dom.remove()
        dom.next && this.nextDelete(dom.next)
        dom.innernext && this.nextDelete(dom.innernext)
        dom.ifnext && this.nextDelete(dom.ifnext)
        dom.elsenext && this.nextDelete(dom.elsenext)
        dom.prior = null
        dom.next = null
        if (dom.innernext) {
          dom.innernext = null
        }
        if (dom.ifnext) {
          dom.ifnext = null
        }
        if (dom.elsenext) {
          dom.elsenext = null
        }
      },
      alwaysShow (dom) {
        this.$refs.drawSvg.appendChild(dom)
        dom.next && this.alwaysShow(dom.next)
        dom.innernext && this.alwaysShow(dom.innernext)
        dom.ifnext && this.alwaysShow(dom.ifnext)
        dom.elsenext && this.alwaysShow(dom.elsenext)
      },
      new_positionForecast (before, width, blocky) {
        let g_refs = {
          'class': 'blocklyDraggable',
          'shape': 'normal',
          'shape-height': '33'
        }
        let g = this.createTag(g_refs, 'g')
        let path_refs = {
          'class': 'blocklyPath',
          'stroke': 'rgba(0, 0, 0, 0.2)',
          'fill': 'rgba(0, 0, 0, 0.2)',
          'fill-opacity': '1',
          'shape': 'normal',
          'd_width': width,
          'd1': 'm 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ',
          'd2': ' a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z'
        }
        g.appendChild(this.createTag(path_refs, 'path'))
        this.positionForecast = g
        this.positionForecast.prior = null
        this.positionForecast.next = null
        !blocky && this.$refs.drawSvg.insertBefore(this.positionForecast, before)
        blocky && this.$refs.drawSvg.appendChild(this.positionForecast)
      },
      //前驱断掉  以及c型指令的高度变化
      stop_prior_height_change (ele) {
        let prior = ele, mark = ele, arr = []
        while (prior = prior.prior) {
          if (prior.getAttribute('shape') === 'c' && prior.innernext === mark) {
            arr.push(prior)
          }
          if (prior.getAttribute('shape') === 'e' && (prior.ifnext === mark || prior.elsenext === mark)) {
            arr.push(prior)
          }
          mark = prior
        }
        if (ele.prior.innernext === ele) {
          ele.prior.innernext = null
          ele.prior = null
        } else if (ele.prior.ifnext === ele) {
          ele.prior.ifnext = null
          ele.prior = null
        } else if (ele.prior.elsenext === ele) {
          ele.prior.elsenext = null
          ele.prior = null
        } else {
          ele.prior.next = null
          ele.prior = null
        }
        for (let i = 0; i < arr.length; i++) {
          arr[i].getAttribute('shape') === 'c' && this.cHeightchange(arr[i])
          arr[i].getAttribute('shape') === 'e' && this.eHeightchange(arr[i])
        }
      },
      //各种指令的高度变化
      prior_height_change (ele, marknextflag) {
        let prior = ele, mark, arr = []
        if (marknextflag) {
          mark = ele.next
        } else {
          mark = ele
        }
        while (prior = prior.prior) {
          if (prior.getAttribute('shape') === 'c' && prior.innernext === mark) {
            arr.push(prior)
          }
          if (prior.getAttribute('shape') === 'e' && (prior.ifnext === mark || prior.elsenext === mark)) {
            arr.push(prior)
          }
          mark = prior
        }
        for (let i = 0; i < arr.length; i++) {
          arr[i].getAttribute('shape') === 'c' && this.cHeightchange(arr[i])
          arr[i].getAttribute('shape') === 'e' && this.eHeightchange(arr[i])
        }
      },
      positionForecast_stop (lastPosition) {
        if (lastPosition === 'innernext' || lastPosition === 'ifnext' || lastPosition === 'elsenext') {
          this.positionForecast.prior[lastPosition] = this.positionForecast.next
          if (this.positionForecast.next) {
            this.positionForecast.next.prior = this.positionForecast.prior
          }
        } else {
          if (this.positionForecast.prior) {
            this.positionForecast.prior.next = this.positionForecast.next
          }
          if (this.positionForecast.next) {
            this.positionForecast.next.prior = this.positionForecast.prior
          }
        }
      },
      addExecuteCss (blocky) {
        blocky.classList.add('blocklyExecute')
        blocky.next && this.addExecuteCss(blocky.next)
        blocky.innernext && this.addExecuteCss(blocky.innernext)
        blocky.ifnext && this.addExecuteCss(blocky.ifnext)
        blocky.elsenext && this.addExecuteCss(blocky.elsenext)
      },
      addBlockyArgumentEvent (blocky) {
        let that = this
        let res = null
        blocky.onmousedown = function (ev) {
          ev.stopPropagation()
          if (document.onmousedown !== null) {
            document.onmousedown()
          }
          if (ev.target.getAttribute('textArea')) {
            that.textEvent(ev)
          } else {
            let event = ev || window.event  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let client = this.getBoundingClientRect()
            let diffX = event.clientX - client.left
            let diffY = event.clientY - client.top
            let copy = blocky.cloneNode(true)
            copy.classList.add('blocklySelected')
            that.$refs.guideSvg.appendChild(copy)
            document.onmousemove = function (ev) {
              let event = ev || window.event
              let moveX = event.clientX - diffX - 60
              let moveY = event.clientY - diffY - 50
              let temp_y = moveY * 1 + that.now_visit_y * 1
              let temp = 'translate(' + moveX + ',' + temp_y + ') scale(0.675)'
              copy.setAttribute('transform', temp)
              if (res && res.result) {
                let x = res.matchResult.getBoundingClientRect().left - 260
                let y = res.matchResult.getBoundingClientRect().top - 50
                let copy_y = moveY * 1 + this.now_visit_y * -1
                let copy_x = moveX * 1 - 200
                if (!that.agrumentinteracts(x, y, copy_x, copy_y)) {
                  res.matchResult.firstChild.classList.remove('blocklyEditableTextSelected')
                  res = null
                }
              }
              if (!res || !res.result) {
                res = that.ArgumentConnectable(copy, true)
                if (res.result) {
                  res.matchResult.firstChild.classList.add('blocklyEditableTextSelected')
                }
              }
            }
            document.onmouseup = function (ev) {
              that.watchMousePosition();
              this.onmouseup = null
              copy.classList.remove('blocklySelected')
              let {x, y} = that.getTransformXY(copy.getAttribute('transform'))
              //let res = that.ArgumentConnectable(copy,true);
              if (res && res.result) {
                that.insertArgument(copy, res.matchResult)
                that.addDrawArgumentEvent(copy)
              } else {
                if (that.isInDraw(x, y, true)) {
                  that.paintArgumentInDraw(copy, x, y)
                } else {
                  that.$refs.guideSvg.removeChild(copy)
                }
              }
              res && res.result && res.matchResult.firstChild.classList.remove('blocklyEditableTextSelected')
              res = null
            }
          }
        }
      },
      addBlockyBooleanEvent (blocky) {
        let that = this
        let res = null
        blocky.onmousedown = function (ev) {
          ev.stopPropagation()
          if (document.onmousedown !== null) {
            document.onmousedown()
          }
          if (ev.target.getAttribute('textArea')) {
            that.textEvent(ev)
          } else {
            let event = ev || window.event  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let client = this.getBoundingClientRect()
            let diffX = event.clientX - client.left
            let diffY = event.clientY - client.top
            let copy = blocky.cloneNode(true)
            copy.classList.add('blocklySelected')
            that.$refs.guideSvg.appendChild(copy)
            document.onmousemove = function (ev) {
              let event = ev || window.event
              let moveX = event.clientX - diffX - 60
              let moveY = event.clientY - diffY - 50
              let temp_y = moveY * 1 + that.now_visit_y * 1
              let temp = 'translate(' + moveX + ',' + temp_y + ') scale(0.675)'
              copy.setAttribute('transform', temp)
              if (res && res.result) {
                let x = res.matchResult.getBoundingClientRect().left - 260
                let y = res.matchResult.getBoundingClientRect().top - 50
                let copy_y = moveY * 1 + this.now_visit_y * -1
                let copy_x = moveX * 1 - 200
                if (!that.agrumentinteracts(x, y, copy_x, copy_y)) {
                  res.matchResult.classList.remove('blocklyEditableTextSelected')
                  res = null
                }
              }
              if (!res || !res.result) {
                res = that.BooleanConnectable(copy, true)
                if (res.result) {
                  res.matchResult.classList.add('blocklyEditableTextSelected')
                }
              }
            }
            document.onmouseup = function (ev) {
              that.watchMousePosition();
              this.onmouseup = null
              copy.classList.remove('blocklySelected')
              let {x, y} = that.getTransformXY(copy.getAttribute('transform'))
              if (res && res.result) {
                that.insertBoolean(copy, res.matchResult)
                that.addDrawBooleanEvent(copy)
              } else {
                if (that.isInDraw(x, y, true)) {
                  that.paintBooleanInDraw(copy, x, y)
                } else {
                  that.$refs.guideSvg.removeChild(copy)
                }
              }
              res && res.result && res.matchResult.classList.remove('blocklyEditableTextSelected')
              res = null
            }
          }
        }
      },
      ArgumentNormalWidthChange (textArea, diff_width) {
        let path_2 = textArea.parentNode.firstChild
        path_2.setAttribute('d_width', path_2.getAttribute('d_width') * 1 + diff_width / 0.675)
        path_2.setAttribute('d', path_2.getAttribute('d1') + path_2.getAttribute('d_width') + path_2.getAttribute('d2'))
        let next = textArea.nextSibling
        while (next) {
          let {x, y} = this.getTransformXY(next.getAttribute('transform'))
          x = x * 1 + diff_width / 0.675
          let temp = 'translate(' + x + ',' + y + ')'
          next.setAttribute('transform', temp)
          next = next.nextSibling
        }
        textArea.parentNode.parentNode.getAttribute('shape') === 'normal' && this.ArgumentNormalWidthChange(textArea.parentNode, diff_width)
        textArea.parentNode.parentNode.getAttribute('shape') === 'c' && this.ArgumentCWidthChange(textArea.parentNode, diff_width)
        textArea.parentNode.parentNode.getAttribute('shape') === 'arg' && this.ArgumentNormalWidthChange(textArea.parentNode, diff_width)
        textArea.parentNode.parentNode.getAttribute('shape') === 'e' && this.ArgumentEWidthChange(textArea.parentNode, diff_width)
      },
      ArgumentCWidthChange (textArea, diff_width) {
        let path_2 = textArea.parentNode.firstChild
        let path_2_new_width = path_2.getAttribute('c-width') * 1 + diff_width / 0.675
        let temp_d = path_2.getAttribute('d1') + path_2_new_width + path_2.getAttribute('d2') +
          path_2.getAttribute('c-height') + path_2.getAttribute('d3') + path_2_new_width + path_2.getAttribute('d4') +
          path_2_new_width + path_2.getAttribute('d5')
        path_2.setAttribute('c-width', path_2_new_width)
        path_2.setAttribute('d', temp_d)
        let next = textArea.nextSibling
        while (next) {
          let {x, y} = this.getTransformXY(next.getAttribute('transform'))
          x = x * 1 + diff_width / 0.675
          let temp = 'translate(' + x + ',' + y + ')'
          next.setAttribute('transform', temp)
          next = next.nextSibling
        }
      },
      ArgumentEWidthChange (textArea, diff_width) {
        let path_2 = textArea.parentNode.firstChild
        let path_2_new_width = path_2.getAttribute('e-width') * 1 + diff_width / 0.675
        let temp_d = path_2.getAttribute('d1') + path_2_new_width + path_2.getAttribute('d2') +
          path_2.getAttribute('e-if-height') + path_2.getAttribute('d3') + path_2_new_width +
          path_2.getAttribute('d4') + path_2_new_width + path_2.getAttribute('d5') +
          path_2.getAttribute('e-else-height') + path_2.getAttribute('d6') + path_2_new_width + path_2.getAttribute('d7')
        path_2.setAttribute('e-width', path_2_new_width)
        path_2.setAttribute('d', temp_d)
        let next = textArea.nextSibling
        while (next) {
          let {x, y} = this.getTransformXY(next.getAttribute('transform'))
          x = x * 1 + diff_width / 0.675
          let temp = 'translate(' + x + ',' + y + ')'
          next.setAttribute('transform', temp)
          next = next.nextSibling
        }
      },
      addDrawArgumentEvent (blocky) {
        let that = this
        let res = null
        blocky.onmousedown = function (ev) {
          if (blocky.parentNode.classList.contains('drawFlyout')) {
            that.$refs.drawSvg.appendChild(blocky)
          }
          ev.stopPropagation()
          if (document.onmousedown !== null) {
            document.onmousedown()
          }
          if (ev.target.getAttribute('textArea')) {
            that.argumentTextEvent(ev)
          } else {
            let event = ev || window.event  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let client = this.getBoundingClientRect()
            let diffX = event.clientX - client.left
            let diffY = event.clientY - client.top
            blocky.classList.add('blocklySelected')
            document.onmousemove = function (ev) {
              if (!blocky.parentNode.classList.contains('drawFlyout')) {
                that.removeArgument(blocky)
              }
              let event = ev || window.event
              let moveX = event.clientX - diffX - 260
              let moveY = event.clientY - diffY - 50
              let temp = 'translate(' + moveX + ',' + moveY + ') scale(0.675)'
              blocky.setAttribute('transform', temp)
              if (res && res.result) {
                let x = res.matchResult.getBoundingClientRect().left - 260
                let y = res.matchResult.getBoundingClientRect().top - 50
                if (!that.agrumentinteracts(x, y, moveX, moveY)) {
                  res.matchResult.firstChild.classList.remove('blocklyEditableTextSelected')
                  res = null
                }
              }
              if (!res || !res.result) {
                res = that.ArgumentConnectable(blocky, false)
                if (res.result) {
                  res.matchResult.firstChild.classList.add('blocklyEditableTextSelected')
                }
              }
            }
            document.onmouseup = function (ev) {
              that.watchMousePosition();
              this.onmouseup = null
              blocky.classList.remove('blocklySelected')
              let {x, y} = that.getTransformXY(blocky.getAttribute('transform'))
              if (res && res.result) {
                that.insertArgument(blocky, res.matchResult)
              }
              if (that.isInDraw(x * 1 + 200, y, false)) {
                //
              } else {
                that.$refs.drawSvg.removeChild(blocky)
              }
              res && res.result && res.matchResult.firstChild.classList.remove('blocklyEditableTextSelected')
              res = null
            }
          }
        }
      },
      addDrawBooleanEvent (blocky) {
        let that = this
        let res = null
        blocky.onmousedown = function (ev) {
          if (blocky.parentNode.classList.contains('drawFlyout')) {
            that.$refs.drawSvg.appendChild(blocky)
          }
          ev.stopPropagation()
          if (document.onmousedown !== null) {
            document.onmousedown()
          }
          if (ev.target.getAttribute('textArea')) {
            that.argumentTextEvent(ev)
          } else {
            let event = ev || window.event  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            let client = this.getBoundingClientRect()
            let diffX = event.clientX - client.left
            let diffY = event.clientY - client.top
            blocky.classList.add('blocklySelected')
            document.onmousemove = function (ev) {
              if (!blocky.parentNode.classList.contains('drawFlyout')) {
                that.removeBoolean(blocky)
              }
              let event = ev || window.event
              let moveX = event.clientX - diffX - 260
              let moveY = event.clientY - diffY - 50
              let temp = 'translate(' + moveX + ',' + moveY + ') scale(0.675)'
              blocky.setAttribute('transform', temp)
              if (res && res.result) {
                let x = res.matchResult.getBoundingClientRect().left - 260
                let y = res.matchResult.getBoundingClientRect().top - 50
                if (!that.agrumentinteracts(x, y, moveX, moveY)) {
                  res.matchResult.classList.remove('blocklyEditableTextSelected')
                  res = null
                }
              }
              if (!res || !res.result) {
                res = that.BooleanConnectable(blocky, false)
                if (res.result) {
                  res.matchResult.classList.add('blocklyEditableTextSelected')
                }
              }
            }
            document.onmouseup = function (ev) {
              that.watchMousePosition();
              this.onmouseup = null
              blocky.classList.remove('blocklySelected')
              let {x, y} = that.getTransformXY(blocky.getAttribute('transform'))
              if (res && res.result) {
                that.insertBoolean(blocky, res.matchResult)
              }
              if (that.isInDraw(x * 1 + 200, y, false)) {
                //
              } else {
                that.$refs.drawSvg.removeChild(blocky)
              }
              res && res.result && res.matchResult.classList.remove('blocklyEditableTextSelected')
              res = null
            }
          }
        }
      },
      ArgumentConnectable (tar, add_now_y_flag) {
        let soltArray = []
        Array.prototype.slice.call(this.$refs.drawSvg.getElementsByClassName('blocklyEditableTextArea')).forEach(solt => {
          let parent = solt
          let flag = true
          while (parent = parent.parentNode) {
            if (parent === tar) {
              flag = false
            }
            if (parent.classList.contains('drawFlyout')) {
              break
            }
          }
          if (!(solt.getAttribute('visibility') === 'hidden') && flag) {
            soltArray.push(solt)
          }
        })
        let {x, y} = this.getTransformXY(tar.getAttribute('transform'))
        let res_x, res_y
        if (add_now_y_flag) {
          y = y * 1 + this.now_visit_y * -1
          x = x * 1 - 200
        }
        let tar_x = x, tar_y = y, flag = false, index = -1, temp = 100
        for (let i = 0; i < soltArray.length; i++) {
          if (soltArray[i] === tar) {
            continue
          }
          let x = soltArray[i].getBoundingClientRect().left - 260
          let y = soltArray[i].getBoundingClientRect().top - 50
          if (this.agrumentinteracts(soltArray[i].getBoundingClientRect().left - 260, soltArray[i].getBoundingClientRect().top - 50, tar_x, tar_y)) {
            flag = true
            let t = Math.abs(x - tar_x) + Math.abs(y - tar_y)
            if (t < temp) {
              temp = t
              index = i
              res_x = x
              res_y = y
            }
          }
        }
        return {
          'result': flag,
          'matchResult': soltArray[index]
        }
      },
      BooleanConnectable (tar, add_now_y_flag) {
        let soltArray = []
        Array.prototype.slice.call(this.$refs.drawSvg.getElementsByClassName('booleanArea')).forEach(solt => {
          let parent = solt
          let flag = true
          while (parent = parent.parentNode) {
            if (parent === tar) {
              flag = false
            }
            if (parent.classList.contains('drawFlyout')) {
              break
            }
          }
          if (!(solt.getAttribute('visibility') === 'hidden') && flag) {
            soltArray.push(solt)
          }
        })
        let {x, y} = this.getTransformXY(tar.getAttribute('transform'))
        let res_x, res_y
        if (add_now_y_flag) {
          y = y * 1 + this.now_visit_y * -1
          x = x * 1 - 200
        }
        let tar_x = x, tar_y = y, flag = false, index = -1, temp = 100
        for (let i = 0; i < soltArray.length; i++) {
          if (soltArray[i] === tar) {
            continue
          }
          let x = soltArray[i].getBoundingClientRect().left - 260
          let y = soltArray[i].getBoundingClientRect().top - 50
          if (this.agrumentinteracts(soltArray[i].getBoundingClientRect().left - 260, soltArray[i].getBoundingClientRect().top - 50, tar_x, tar_y)) {
            flag = true
            let t = Math.abs(x - tar_x) + Math.abs(y - tar_y)
            if (t < temp) {
              temp = t
              index = i
              res_x = x
              res_y = y
            }
          }
        }
        return {
          'result': flag,
          'matchResult': soltArray[index]
        }
      },
      agrumentinteracts (x, y, tar_x, tar_y) {
        return ((tar_y * 1 > (y * 1 - 20)) && (tar_y * 1 < (y * 1 + 20))) && ((tar_x * 1 > (x * 1 - 20)) && (tar_x * 1 < (x * 1 + 20)))
      },
      insertAfter (newElement, targetElement) {
        let parent = targetElement.parentNode
        if (parent.lastChild === targetElement) {
          parent.appendChild(newElement)
        } else {
          parent.insertBefore(newElement, targetElement.nextSibling)
        }
      },
      insertArgument (argument, target) {
        target.setAttribute('visibility', 'hidden')
        this.insertAfter(argument, target)
        let oldWidth = target.firstChild.getAttribute('d_width')
        let newWidth = argument.firstChild.getAttribute('d_width')
        let diff = newWidth - oldWidth
        let {x, y} = this.getTransformXY(target.getAttribute('transform'))
        let temp = 'translate(' + x + ',' + (y * 1 - 4) + ')'
        argument.setAttribute('transform', temp)
        target.parentNode.getAttribute('shape') === 'normal' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'noPrior' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'c' && this.ArgumentCWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'arg' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
      },
      insertBoolean (argument, target) {
        target.setAttribute('visibility', 'hidden')
        this.insertAfter(argument, target)
        let oldWidth = target.getAttribute('d_width')
        let newWidth = argument.firstChild.getAttribute('d_width')
        let diff = newWidth - oldWidth
        let {x, y} = this.getTransformXY(target.getAttribute('transform'))
        let temp = 'translate(' + x + ',' + (y * 1 - 4) + ')'
        argument.setAttribute('transform', temp)
        target.parentNode.getAttribute('shape') === 'arg' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'normal' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'c' && this.ArgumentCWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'e' && this.ArgumentEWidthChange(argument, diff * 0.675)
      },
      removeArgument (argument) {
        let target = argument.previousElementSibling
        let newWidth = target.firstChild.getAttribute('d_width')
        let oldWidth = argument.firstChild.getAttribute('d_width')
        let diff = newWidth - oldWidth
        target.setAttribute('visibility', 'visible')
        target.parentNode.getAttribute('shape') === 'arg' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'normal' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'c' && this.ArgumentCWidthChange(argument, diff * 0.675)
        this.$refs.drawSvg.appendChild(argument)
      },
      removeBoolean (argument) {
        let target = argument.previousElementSibling
        let newWidth = target.getAttribute('d_width')
        let oldWidth = argument.firstChild.getAttribute('d_width')
        let diff = newWidth - oldWidth
        target.setAttribute('visibility', 'visible')
        target.parentNode.getAttribute('shape') === 'arg' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'normal' && this.ArgumentNormalWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'c' && this.ArgumentCWidthChange(argument, diff * 0.675)
        target.parentNode.getAttribute('shape') === 'e' && this.ArgumentEWidthChange(argument, diff * 0.675)
        this.$refs.drawSvg.appendChild(argument)
      }
    },
    watch: {
      now_visit_y (val) {
        let that = this
        this.$refs.guideSvg.setAttribute('transform', 'translate(0 ,' + -1 * val + ')')
        let refs = [0, 295, 635, 910, 1529, 1820, 2500]
        for (let i = 0; i < refs.length; i++) {
          if (val < refs[i]) {
            that.now_selection_category = i - 1
            break
          }
        }
      }
    }
  }
</script>

<style scoped>
  .left_box {
    height: calc(100% - 2px);
    width: 100%;
    position: relative;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.15);
    /* border-top: 1px solid hsla(0, 0%, 0%, 0.15);*/
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    box-sizing: content-box;
    overflow: hidden;
  }

  .svgBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .drawFlyout {
    left: 200px;
    border-left: 1px solid hsla(0, 0%, 0%, 0.15);
    border-right: 1px solid hsla(0, 0%, 0%, 0.15);
    box-sizing: content-box;
    z-index: 10 !important;
  }

  .Svg {
    position: absolute;
    left: 60px;
    width: calc(100% - 60px);
    height: 100%;
    display: inline-block;
    background: #ffffff;
    border-right: 1px solid hsla(0, 0%, 0%, 0.15);
    box-sizing: content-box;
  }

  .guideList {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #fff;
    border-right: 1px solid hsla(0, 0%, 0%, 0.15);
    box-sizing: content-box;
    width: 60px;
    text-align: center;
    display: inline-block;
    z-index: 30;
    /*#575E75*/
  }

  .guideItem {
    position: relative;
    width: 60px;
    height: 50px;
    /*font-size: 25px;*/
    align-content: center;
    display: block;
    cursor: pointer;
  }

  .guideItem:hover {
    color: rgb(76, 151, 255);
  }

  .CategoryItemBubble {
    width: 20px;
    height: 20px;
    border: 1px solid;
    border-radius: 100%;
    margin: 0px auto 0px;
  }

  .CategoryMenuItemLabel {
    font-size: 12px;
    margin-top: 5px;
  }

  .categorySelected {
    background: #E9EEF2;
  }
</style>
