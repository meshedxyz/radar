import IndexedDb from "./IndexedDb";
import { TrustList, TrustListStatus } from "../../../constants/API";

const RADAR_DB = "RadarLocalDB";
const TRUST_LIST_TABLE = "PrivateTrustList";
const TRUST_LIST_KEY = "domain";

const SETTINGS_TABLE = "Settings";
const SETTING_KEY = "setting";

class StorageService {
  private db: IndexedDb;

  constructor() {
    this.db = new IndexedDb(RADAR_DB);
  }

  async init() {
    return this.db
      .createObjectStore([
        { tableName: TRUST_LIST_TABLE, keyPath: TRUST_LIST_KEY },
        { tableName: SETTINGS_TABLE, keyPath: SETTING_KEY },
      ])
      .then(() => {
        return this;
      });
  }

  public async getSetting(key: string): Promise<any> {
    return this.db.getValue(SETTINGS_TABLE, key).then((val) => {
      return val.value;
    });
  }

  public async setSetting(key: string, value: any): Promise<void> {
    return this.db.putValue(SETTINGS_TABLE, {
      setting: key,
      value: value,
    });
  }

  public async getTrustList(): Promise<TrustList> {
    return this.db.getAllValue(TRUST_LIST_TABLE).then((arr) => {
      return arr.reduce((aggregator, current) => {
        return { ...aggregator, [current.domain]: current.state };
      }, {});
    });
  }

  public async updateTrustList(domain: any, state: any): Promise<void> {
    return this.db.putValue(TRUST_LIST_TABLE, {
      domain: domain,
      state: state,
    });
  }

  public async removeFromTrustList(domain: any): Promise<void> {
    return this.db.deleteValue(TRUST_LIST_TABLE, domain);
  }

  public async getTrustListStatus(
    domain: string
  ): Promise<TrustListStatus | null> {
    return this.db.getValue(TRUST_LIST_TABLE, domain).then((val) => {
      return val ? (val.state as TrustListStatus) : null;
    });
  }
}

export default StorageService;
