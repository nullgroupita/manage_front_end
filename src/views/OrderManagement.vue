<template>
  <el-table ref="filterTable" :data="orders" style="width: 100%" align="center">
    <el-table-column type="index" label="序号" width="300" align="center"></el-table-column>
    <el-table-column label="车牌号" width="300" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.carNumber}}</span>
      </template>
    </el-table-column>
    <el-table-column label="类型" width="300" align="center" :formatter="forType">
      <template slot-scope="scope">
        <span>{{2>=scope.row.status ? '停车' : '取车'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="300" align="center"
      :formatter="forStatus"
      :filters="[{text: '已接单', value: '1'}, {text: '未接单', value: '2'}]"
      :filter-method="filterHandler">
      <template slot-scope="scope">
        <span>{{scope.row.status === 0 || scope.row.status === 3 ? '未接单' : '已接单'}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="操作" width="300" align="center">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="assignOrder(scope.row.status)" v-if="scope.row.status===0||scope.row.status===3"
        >指派</el-button>
        <el-dialog title="指派停车订单" :visible.sync="dialogParkingFormVisible">
          <el-form>
            <el-form-item label="接单职员" :label-width="formLabelWidth">
              <el-select v-model="selectedBoy" @change="selectedParkingBoy" placeholder="请选择停车员">
                <el-option
                  v-for="item in parkingBoy"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="停车场" :label-width="formLabelWidth">
              <el-select v-model="selectedParkingLot" placeholder="请选择停车场">
                <el-option
                  v-for="item in selectedParkingLots"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogParkingFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendParkingOrder(scope.row)">确 定</el-button>
          </div>
        </el-dialog>
            <el-dialog title="指派取车订单" :visible.sync="dialogFetchingFormVisible">
                <el-form>
                  <el-form-item label="接单职员" :label-width="formLabelWidth">
                    <el-select v-model="selectedBoy"  placeholder="请选择停车员">
                      <el-option
                        v-for="item in parkingBoy"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFetchingFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="sendFetchingOrder(scope.row)">确 定</el-button>
                </div>
                </el-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {USER_INFO, GET_ALL_ORDERS} from '../common/constants'
import cookies from 'vue-cookies'
import api from '../api/index'
export default {
  name: 'OrderManagement',
  data () {
    return {
      managerId: '',
      dialogParkingFormVisible: false,
      dialogFetchingFormVisible: false,
      formLabelWidth: '120px',
      selectedBoy: ' ',
      selectedParkingLot: ' ',
      selectedParkingLots: [],
      parkingBoy: [
        {
          id: '1',
          name: 'zhangsan'
        }
      ]
    }
  },
  methods: {
    forStatus (row) {
      return row.status === '1' ? '已接单' : '未接单'
    },
    forType (row) {
      return row.type === '1' ? '停车' : '取车'
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    sendParkingOrder (order) {
      let obj = {
        orderId: order.id,
        parkingBoyId: this.selectedBoy,
        parkingLotId: this.selectedParkingLot
      }
      api.sendParkingOrder(obj)
    },
    sendFetchingOrder (order) {
      let obj = {
        orderId: order.id,
        parkingBoyId: this.selectedBoy,
        parkingLotId: order.parkingLot.id
      }
      api.sendFetchingOrder(obj)
    },
    async selectedParkingBoy () {
      let response = await api.getParkingLotByClerk(this.selectedBoy)
      this.selectedParkingLots = response.data.pageContent
    },
    assignOrder (value) {
      if (value === 0) {
        this.dialogParkingFormVisible = true
      } else {
        this.dialogFetchingFormVisible = true
      }
    }
  },
  computed: {
    orders: function () {
      return this.$store.state.orders
    }
  },
  mounted () {
    let userInfo = cookies.get(USER_INFO)
    this.managerId = userInfo.id
    this.$store.dispatch(GET_ALL_ORDERS, this.managerId)
  }
}
</script>

<style scoped>

</style>
