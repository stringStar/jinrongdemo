import styles from "./index.less";
import router from "umi/router";
import React, { Component } from "react";
import Link from "umi/link";
import { Carousel } from "antd-mobile";
import moment from "moment";

import * as API from "../service";
import styels from "./index.less";

const card1 = require("../assets/images/card1.png");
const card2 = require("../assets/images/card2.png");
const title1 = require("../assets/images/title1.png");
const title2 = require("../assets/images/title2.png");
const tag1 = require("../assets/images/tag1.png");
const tag2 = require("../assets/images/tag2.png");
const tag3 = require("../assets/images/tag3.png");
const tag4 = require("../assets/images/tag4.png");

const tagMap = {
  活动中: tag1,
  放水: tag2,
  热门: tag3,
  免息: tag4
};

export function goToGoods({ productType, productId, href }) {
  API.getProduct({
    productType,
    productId,
    ip: window.returnCitySN["cip"],
    datetime: moment().format("YYYY-MM-DD HH_mm_ss")
  }).then(
    res => {
      window.location.href = href;
    },
    rej => {
      window.location.href = href;
      console.error("出错了");
    }
  );
}

export default class Home extends Component {
  state = {
    data: [
      {
        productId: 1
      },
      {
        productId: 2
      }
    ],
    imgHeight: 290,
    card: [],
    loan: []
  };
  componentDidMount() {
    API.getTopImg().then(res => {
      this.setState({
        data: res
      });
    });
    API.getIp({
      ip: window.returnCitySN["cip"],
      datetime: moment().format("YYYY-MM-DD HH_mm_ss")
    }).then(res => {});
    API.getIndexList().then(res => {
      const { card, loan } = res;
      this.setState({
        card,
        loan
      });
    });
  }

  goToLoan = () => {
    router.push("/loan");
  };
  goToCard = () => {
    router.push("/card");
  };

  render() {
    const { loan, card } = this.state;
    return (
      <div>
        <div className={styles.head}>
          <Carousel
            autoplay={true}
            infinite={true}
            beforeChange={(from, to) =>
              console.log(`slide from ${from} to ${to}`)
            }
            afterChange={index => console.log("slide to", index)}
          >
            {this.state.data.map(val => (
              <a
                key={val.productId}
                href={val.productUrl}
                className={styles.sliderItem}
              >
                <img src={val.productImg} />
              </a>
            ))}
          </Carousel>
        </div>

        {/* <WingBlank> */}
        <div className={styles.contentBox}>
          <div className={styles.contentIconBox} onClick={this.goToCard}>
            <div className={styles.contentIconImg}>
              <img src={card1} />
            </div>
            <div>信用卡秒申</div>
          </div>
          <div className={styles.contentIconBox} onClick={this.goToLoan}>
            <div className={styles.contentIconImg}>
              <img src={card2} />
            </div>
            <div>极速借款</div>
          </div>
        </div>
        <div className={styles.pageHead}>
          <img src={title1} />
          <Link to="/loan">更多</Link>
        </div>
        <div className={styles.contentList}>
          {loan &&
            loan.map(v => (
              <a
                href={v.productUrl}
                onClick={e => {
                  e.preventDefault();
                  goToGoods({
                    productType: "loan",
                    productId: v.productId,
                    href: v.productUrl
                  });
                }}
                key={v.productId}
              >
                <div className={styles.productTag}>
                  <img src={tagMap[v.productCue]} />
                </div>
                <div className={styles.listItem}>
                  <div className={styles.listItemContent}>
                    <div className={styles.listItemImg}>
                      <img src={v.productImg} />
                    </div>

                    <div className={styles.listItemTitle}>
                      <h5>{v.productName}</h5>
                      <p>{v.productFeature}</p>
                      <span>{v.productDec}</span>
                    </div>
                  </div>
                  <div className={styles.listItemText}>
                    <p>今日申请</p>
                    <span>{v.productPers}</span>
                  </div>
                </div>
              </a>
            ))}
        </div>
        <div className={styles.pageHead}>
          <img src={title2} />
          <div className={styles.titleBox} />
          <Link to="/card">更多</Link>
        </div>
        <div className={styles.IDList}>
          {card &&
            card.map(v => (
              <a
                href={v.productUrl}
                onClick={e => {
                  e.preventDefault();
                  goToGoods({
                    productType: "card",
                    productId: v.productId,
                    href: v.productUrl
                  });
                }}
                key={v.productId}
              >
                <div>
                  <div className={styles.IDListImg}>
                    <img src={v.productImg} />
                  </div>
                  <div className={styles.IDListText}>
                    <p>
                      推荐理由：
                      <br /> {v.productFeature}
                    </p>
                    <span>{v.productName}</span>
                  </div>
                </div>
              </a>
            ))}
        </div>
        {/* </WingBlank> */}
      </div>
    );
  }
}
