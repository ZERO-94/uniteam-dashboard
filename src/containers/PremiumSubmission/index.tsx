import { useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  Timestamp,
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  DONATE_COLLECTION,
  USER_COLLECTION,
} from "../../services/firebase/db/constants";
import db, { UserDB } from "../../services/firebase/db";
import { Donate, DonateDB } from "../../services/firebase/db/donates/type";
import { evaluateDonate } from "../../services/firebase/db/donates";

const columns: ColumnsType<Donate> | undefined = [
  {
    title: "Billing code",
    dataIndex: "billingCode",
    key: "billingCode",
  },
  {
    title: "User",
    key: "user",
    render: (_, record) => <span>{record?.owner?.displayName}</span>,
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value: Timestamp) => value.toDate().toLocaleString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    key: "action",
    render: (value, record) => (
      <div>
        {record.status === "PENDING" && (
          <>
            <a
              style={{ marginRight: "1rem" }}
              onClick={() =>
                evaluateDonate(record.ownerId, record.id, "APPROVED")
              }
            >
              Approve
            </a>
            <a
              onClick={() =>
                evaluateDonate(record.ownerId, record.id, "REJECTED")
              }
            >
              Reject
            </a>
          </>
        )}
      </div>
    ),
  },
];

export default function PremiumSubmission() {
  const [data, setData] = useState<Donate[]>([]);

  useEffect(() => {
    const getDonates = () => {
      const unsub = onSnapshot(
        query(
          collectionGroup(db, DONATE_COLLECTION),
          orderBy("createdAt", "desc")
        ),
        async (donateSnap) => {
          const donateData = donateSnap.docs.map(
            (doc) => doc.data() as DonateDB
          );
          const userCollectionRef = collection(db, USER_COLLECTION);
          const userSnaps = await getDocs(
            query(
              userCollectionRef,
              where(
                "id",
                "in",
                donateData.map((data) => data.ownerId)
              )
            )
          );
          const finalDonateData = donateData.map((data) => {
            const user = userSnaps.docs.find((doc) => doc.id === data.ownerId);
            return {
              ...data,
              owner: user?.data(),
            } as Donate;
          });
          setData(finalDonateData);
        }
      );

      return () => {
        unsub();
      };
    };

    getDonates();
  }, []);

  return (
    <div>
      <h1>Premium submission</h1>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
