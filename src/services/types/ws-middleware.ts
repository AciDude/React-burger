import { TWSResponse } from '../../utils/data-types'

export type TWsActions = {
  connect(payload: string): {
    readonly type: string
    readonly payload: string
  }
  disconnect(): {
    readonly type: string
  }
  wsClose(): {
    readonly type: string
  }
  wsError(): {
    readonly type: string
  }
  wsOpen(): {
    readonly type: string
  }
  wsConnecting(): {
    readonly type: string
  }
  wsMessage(payload: TWSResponse): {
    readonly type: string
    readonly payload: TWSResponse
  }
}
