import React from 'react';

type User = 
{
    login: string;
    profileUrl: string;
    avatarUrl: string;
}

type IssueProps = {
    url: string;
    title: string;
    body: string;
    id: number;
    number: number;
    user: User;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { IssueProps, User };

const Issue = React.memo((issueProps : IssueProps) =>
{
    return (
        <tr className="issue">
            <td><a href={issueProps.url} target="_blank" rel="noopener noreferrer">{issueProps.title}</a> <br/> <strong>Issue #{issueProps.number}</strong></td>
            <td><p><img src={issueProps.user.avatarUrl} className="avatar"/><br/><a href={issueProps.user.profileUrl} target="_blank" rel="noopener noreferrer">{issueProps.user.login}</a></p></td>
            <td><p>{issueProps.body}</p></td>
            <td><p>{issueProps.state}</p></td>
            <td><p>{issueProps.createdAt.toLocaleString("en-US", { timeZone: "MST" })}</p></td>
            <td><p>{issueProps.updatedAt.toLocaleString("en-US", { timeZone: "MST" })}</p></td>
        </tr>
    );
});

export default Issue; 