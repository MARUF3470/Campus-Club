import React from "react";

const SingleMember = ({ member }) => {
  console.log(member);
  return (
    <tr>
      <th>{member.id}</th>
      <td>
        {member.fName} {member.lName}
      </td>
      <td>{member.email}</td>
      <td>{member.membershipType.toUpperCase()}</td>
      <td>{member.collegeYear.toUpperCase()}</td>
      <td>{member.collegeYear.toUpperCase()}</td>
      <td>{member.major.toUpperCase()}</td>
      <td>
        {member.Payment[0]?.membershipFee === "not-paid" ? (
          <button className="btn btn-xs btn-outline">Pending</button>
        ) : (
          <button className="btn btn-xs btn-disabled">Paid</button>
        )}
      </td>
      <td>
        {member.Payment[0]?.tShirtFee === "not-paid" ? (
          <button className="btn btn-xs btn-outline">Pending</button>
        ) : (
          <button className="btn btn-xs btn-disabled">Paid</button>
        )}
      </td>
      <td className="flex justify-center items-center">
        <button className="btn-circle btn-outline btn-xs btn">X</button>
      </td>
    </tr>
  );
};

export default SingleMember;
