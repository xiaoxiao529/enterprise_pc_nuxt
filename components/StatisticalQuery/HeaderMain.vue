<template>
    <div class="wrap">
        <div class="l-head">
            <span>设备信息 &gt; 设备档案</span>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .wrap {
        position: relative;
        width: 100%;
        .l-head {
            margin-left: 1.6rem;
            overflow: hidden;
            height: 3rem;
            margin-top: 2rem;
            span {
                float: left;
                font-size: 1.8rem;
                color: #717171;
            }
        }
        .main {
            width: 98%;
            height: 49rem;
            background: #fff;
            border: 1px solid #dddedf;
            position: absolute;
            top: 3rem;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0 auto;
          /*  .police_title {
                width: 92%;
                border-bottom: 1px solid #dddedf;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: 0 auto;

            }*/
        }
    }
</style>
