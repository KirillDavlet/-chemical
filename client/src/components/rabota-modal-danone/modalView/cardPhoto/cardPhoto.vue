<template>
  <div class="card-photo">
    <div class="card-photo-img" @click="openPhoto" :style="{backgroundImage: `url(${dataCard.url})`}">

    </div>
    <div class="card-photo-settings">
      <div class="card-photo-settings-date">
        <span><i>дата: </i>{{ dataCard.date }}</span>
      </div>
      <div class="card-photo-settings-download">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.717 8.64373C15.5605 8.64373 15.434 8.77031 15.434 8.92693V13.7886C15.434 14.5776 14.7918 15.2203 14.002 15.2203H1.99787C1.20836 15.2203 0.565867 14.5778 0.565867 13.7886V8.92675C0.565867 8.77013 0.439111 8.64355 0.282844 8.64355C0.126578 8.64355 0 8.77031 0 8.92675V13.7884C0 14.8898 0.896356 15.7861 1.99787 15.7861H14.002C15.1036 15.7861 16 14.8898 16 13.7884V8.92675C16 8.77031 15.8734 8.64373 15.717 8.64373Z"
            fill="#125BB5"/>
          <path
            d="M7.43704 10.9136C7.74779 11.2244 8.25375 11.2247 8.56468 10.9136L13.1455 6.33244C13.2559 6.22204 13.2559 6.04302 13.1455 5.93262C13.0351 5.82204 12.8557 5.82204 12.7453 5.93262L8.28379 10.3941V0.2832C8.28379 0.126578 8.15722 0 8.00077 0C7.8445 0 7.71775 0.126578 7.71775 0.2832V10.3943L3.25624 5.9328C3.14602 5.82222 2.96664 5.82222 2.85624 5.9328C2.74584 6.0432 2.74584 6.22222 2.85624 6.33262L7.43704 10.9136Z"
            fill="#125BB5"/>
        </svg>
        <a :href="dataCard.url" download="фото">Скачать</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cardPhoto",
        props: {
            dataCard: {
                type: Object,
                default: () => {}
            },
            typeCard: {
                type: String,
                default: ''
            }
        },
        methods: {
            // мето дотправки родителю открытие фотки
            openPhoto() {
                this.$emit('openPhoto', {url: this.dataCard.url, type: this.typeCard})
            }
        }
    }
</script>


<style lang="less">
  .card-photo {
    width: 317px;

    &-img {
      width: 100%;
      height: 190px;
      border-radius: 4px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &-settings {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      &-date {
        > span {
          font-family: Ubuntu;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0.3px;
          color: #1e1e1e;
          > i {
            font-style: initial;
            color: #748AA1;
          }
        }
      }
      &-download {
        display: flex;
        align-items: center;
        > svg {
          margin-right: 8px;
        }
        > a {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0.3px;
          text-decoration-line: underline;
          color: #125BB5;

        }
      }
    }
  }

  @media (max-width: 500px) {
    .card-photo {
      &-settings {
        &-date {
          > span {
            font-size: 12px;
          }
        }
        &-download {
          > a {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
