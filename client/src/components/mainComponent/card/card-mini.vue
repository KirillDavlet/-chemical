<template>
  <div class="card-mini">
    <div class="card-mini-img"
         v-if="dataCard.img && dataCard.img !== ''">

    </div>
    <div class="card-mini-default"
         v-else>
      <svg width="64" height="77" viewBox="0 0 64 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32.0585 16.5469C21.1926 16.5469 12.3153 25.4242 12.3153 36.29C12.3153 41.9715 14.801 47.4399 18.9911 51.1329C22.1159 54.2577 21.8318 60.9335 21.7608 61.0045C21.7608 61.3596 21.8318 61.6437 22.1159 61.9277C22.3289 62.1408 22.684 62.2828 22.9681 62.2828H41.0778C41.4329 62.2828 41.717 62.1408 41.93 61.9277C42.1431 61.7147 42.2851 61.3596 42.2851 61.0045C42.2851 60.9335 41.93 54.2577 45.0549 51.1329C45.1259 51.0619 45.1969 50.9909 45.2679 50.9199C49.387 47.1559 51.8016 41.8295 51.8016 36.29C51.8016 25.4242 42.9243 16.5469 32.0585 16.5469ZM43.4214 49.2864C43.3504 49.3574 43.2084 49.4995 43.2084 49.5705C40.4387 52.5533 39.9415 57.4536 39.8705 59.7972H24.1754C24.1044 57.4536 23.6073 52.3402 20.6245 49.2864C16.8605 46.0196 14.6589 41.2613 14.6589 36.219C14.6589 26.6315 22.3999 18.8905 31.9874 18.8905C41.575 18.8905 49.316 26.6315 49.316 36.219C49.316 41.2613 47.1854 46.0196 43.4214 49.2864Z"
          fill="white"/>
        <path
          d="M31.9873 21.5898C31.3482 21.5898 30.78 22.158 30.78 22.7972C30.78 23.4363 31.3482 24.0045 31.9873 24.0045C39.1602 24.0045 44.9127 29.828 44.9127 36.9298C44.9127 37.569 45.4809 38.1372 46.12 38.1372C46.7592 38.1372 47.3274 37.569 47.3274 36.9298C47.3984 28.4786 40.5096 21.5898 31.9873 21.5898Z"
          fill="white"/>
        <path
          d="M39.8705 63.6289H24.1044C22.4709 63.6289 21.1216 64.9783 21.1216 66.6117C21.1216 68.2451 22.4709 69.5945 24.1044 69.5945H39.7995C41.5039 69.5234 42.8533 68.2451 42.8533 66.6117C42.8533 64.9783 41.5039 63.6289 39.8705 63.6289ZM39.8705 67.1088H24.1044C23.8203 67.1088 23.5362 66.8958 23.5362 66.5407C23.5362 66.1856 23.7493 65.9725 24.1044 65.9725H39.7995C40.0835 65.9725 40.3676 66.1856 40.3676 66.5407C40.3676 66.8958 40.1546 67.1088 39.8705 67.1088Z"
          fill="white"/>
        <path
          d="M37.5268 70.8047H26.4479C24.8144 70.8047 23.4651 72.154 23.4651 73.7875C23.4651 75.4209 24.8144 76.7702 26.4479 76.7702H37.5268C39.1602 76.7702 40.5095 75.4209 40.5095 73.7875C40.5095 72.083 39.1602 70.8047 37.5268 70.8047ZM37.5268 74.2846H26.4479C26.1638 74.2846 25.8797 74.0715 25.8797 73.7165C25.8797 73.3614 26.0928 73.1483 26.4479 73.1483H37.5268C37.8108 73.1483 38.0949 73.3614 38.0949 73.7165C38.0949 74.0715 37.8108 74.2846 37.5268 74.2846Z"
          fill="white"/>
        <path
          d="M31.9873 10.6528C32.6975 10.6528 33.1947 10.0846 33.1947 9.44547V1.20732C33.1947 0.568148 32.6265 0 31.9873 0C31.3482 0 30.78 0.568148 30.78 1.20732V9.44547C30.78 10.0846 31.3482 10.6528 31.9873 10.6528Z"
          fill="white"/>
        <path
          d="M52.0856 6.10737C51.5174 5.68126 50.8072 5.89432 50.4521 6.39145L45.9069 13.2092C45.4808 13.7774 45.6229 14.5586 46.191 14.9137C46.4041 15.0557 46.6171 15.1267 46.8302 15.1267C47.2563 15.1267 47.6114 14.9137 47.8244 14.5586L52.3696 7.7408C52.7957 7.24367 52.6537 6.46247 52.0856 6.10737Z"
          fill="white"/>
        <path
          d="M17.5706 14.8433C17.7836 14.8433 17.9967 14.7723 18.2098 14.6302C18.7779 14.2751 18.9199 13.4939 18.5649 12.9258L14.1617 6.03697C13.8066 5.46882 13.0254 5.32678 12.4573 5.68188C11.8891 6.03697 11.7471 6.81817 12.1022 7.38632L16.5053 14.2751C16.7894 14.7012 17.1445 14.8433 17.5706 14.8433Z"
          fill="white"/>
        <path
          d="M8.97736 22.3711L1.80449 18.4651C1.23634 18.181 0.455134 18.3941 0.17106 18.9623C-0.184033 19.5304 0.029023 20.3116 0.66819 20.5957L7.84106 24.5017C8.05412 24.5727 8.19616 24.6437 8.40921 24.6437C8.83532 24.6437 9.26144 24.4307 9.47449 24.0046C9.75857 23.4364 9.54551 22.6552 8.97736 22.3711Z"
          fill="white"/>
        <path
          d="M63.8747 18.9623C63.5907 18.3941 62.8095 18.181 62.2413 18.4651L54.9974 22.3711C54.4293 22.6552 54.2162 23.4364 54.5003 24.0046C54.7133 24.4307 55.1394 24.6437 55.5656 24.6437C55.7786 24.6437 55.9917 24.5727 56.1337 24.5017L63.3776 20.5957C63.9457 20.3116 64.1588 19.5304 63.8747 18.9623Z"
          fill="white"/>
      </svg>
    </div>
    <div class="card-mini-description">
      <div class="card-mini-description__title"
           v-if="dataCard.title && dataCard.title !== ''">
        <span>{{ dataCard.title.length > 30 ? dataCard.title.substr(0,27) + '...' : dataCard.title }}</span>
      </div>
      <div class="card-mini-description__description"
           v-if="dataCard.description && dataCard.description !== ''">
        <span>{{ dataCard.description.length > 60 ? dataCard.description.substr(0,55) + '...' : dataCard.description }}</span>
      </div>
      <div class="card-mini-description__link" v-if="dataCard.link && dataCard.link !== ''">
        <span>подробно</span>
        <!--          :TODO написать переход к описанию-->
      </div>
    </div>
  </div>
</template>

<script>
    /***
     * комопнент карточки мини, использоваться будт чаще всего в виджетах
     */
    export default {
        name: "card-mini",
        props: {
            dataCard: {
                type: Object,
                default: () => {
                }
            }
        }
    }
</script>

<style lang="less">
  .card-mini {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    &-img, &-default {
      width: 100%;
      height: 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;

      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(30, 30, 30, 0.09);
        z-index: 1000;
      }
    }

    &-default {
      display: flex;
      justify-content: center;
      align-items: center;

      > svg {
        z-index: 50000;
      }
    }

    &-description {
      margin-top: .5em;
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 .5em;

      > div:not(:last-child) {
        margin-bottom: .4em;
      }

      &__title, &__description {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      &__title {
        > span {
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0.02em;
          color: #1E1E1E;
        }
      }

      &__description {
        > span {
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.15px;
          color: #3E4E6C;
        }
      }

      &__link {
        width: 60%;
        max-width: 150px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid gray;
        border-radius: 4px;
        margin-top: 1em;
        cursor: pointer;

        > span {
          color: #1e1e1e;
          font-size: 14px;
        }
      }
    }
  }
</style>
