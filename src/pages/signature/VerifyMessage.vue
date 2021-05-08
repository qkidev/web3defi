<template>
  <div class="VerifyMessage">
    <h3 class="h3">验证</h3>
    <div class="alert">
      您可以轻松地验证任何钱包地址签名的信息。您只需要提供钱包地址，生成的签名和必须验证的消息即可。
    </div>
    <br />
    <div
      v-if="result!=''"
      class="alert"
      :class="result == form.signingAddress ? 'success' : 'error'"
    >
      {{
        result == form.signingAddress
          ? "消息签名已验证。"
          : "对不起！消息签名验证失败"
      }}
    </div>
    <br />
    <van-form
      ref="ruleForm"
      @failed="onFailed"
      @submit="submitVerify"
      :show-error-message="false"
      :show-error="false"
    >
      <div class="card">
        <div class="form-item">
          <p class="lable">[步骤1] 地址</p>
          <van-field
            class="field"
            v-model="form.signingAddress"
            placeholder="输入用于签名消息的地址"
            :rules="[{ required: true, message: '地址为必填项' }]"
          />
        </div>
        <div class="form-item">
          <p class="lable">[步骤2] 签名哈希</p>
          <van-field
            class="field"
            v-model="form.signature"
            placeholder="输入消息签名哈希"
            :rules="[{ required: true, message: '输入消息签名哈希' }]"
          />
        </div>

        <div class="form-item">
          <p class="lable">[步骤3] 输入已签名的消息</p>
          <van-field
            class="field"
            v-model="form.message"
            placeholder="输入消息签名哈希"
            :rules="[{ required: true, message: '不能为空' }]"
          />
        </div>
        <div class="form-item">
          <van-button type="info" native-type="submit">验 证</van-button>
          <van-button @click="resetForm" native-type="button">重 置</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import "vant/lib/field/style";
import "vant/lib/form/style";
import "vant/lib/button/style";
import { Form, Field, Button, Toast } from "vant";
import { ethers } from "ethers";
export default {
  name: "VerifyMessage",
  data() {
    return {
      resForm: {},
      result: "",
      form: {
        signature: "",
        signingAddress: "",
        message: "",
      }
    };
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  created() {
    this.resForm = Object.assign({}, this.form);
  },
  methods: {
    // 提交校验不通过
    onFailed({ errors }) {
      Toast(errors[0].message);
    },
    async submitVerify() {
      const { utils } = ethers;
      let signingAddress = await utils.verifyMessage(
        this.form.message,
        this.form.signature
      );
      this.result = signingAddress;
    },
    resetForm() {
      this.form = this.resForm;
    },
  },
};
</script>
<style lang="scss" scoped>
.VerifyMessage {
  text-align: left;
  padding: 15px;
}
.h3 {
  font-size: 40px;
}

::v-deep .van-button--normal {
  height: 70px;
  padding: 0 40px;
}
::v-deep .van-button--normal + .van-button--normal {
  margin-left: 20px;
}
::v-deep .van-button {
  border-radius: 4px;
}
::v-deep .van-cell {
  padding: 0;
}
.field ::v-deep input {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 80px;
  line-height: 80px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  &:focus {
    border-color: #409eff;
    outline: 0;
  }
}
.alert {
  background-color: #f4f4f5;
  color: #909399;
  width: 100%;
  padding: 18px 26px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 14px;
  font-size: 26px;
  line-height: 36px;
  text-align: left;
  &.success {
    background-color: #f0f9eb;
    color: #67c23a;
  }
  &.error {
    background-color: #fef0f0;
    color: #f56c6c;
  }
}
.card {
  padding: 30px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.form-item {
  margin-bottom: 44px;
  .lable {
    font-size: 28px;
    color: #606266;
    line-height: 40px;
    margin: 10px 0;
  }
}
</style>
