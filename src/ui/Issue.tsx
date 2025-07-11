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

function Issue(issueProps : IssueProps)
{
    console.log(issueProps);

    return (
        <tr className="issue">
            <td><a href={issueProps.url} target="_blank" rel="noopener noreferrer">{issueProps.title}</a></td>
            <td><p>{issueProps.body}</p></td>
            <td><p><strong>Issue #{issueProps.number}</strong> by <a href={issueProps.user.profileUrl} target="_blank" rel="noopener noreferrer">{issueProps.user.login}</a></p></td>
            <td><p>State: {issueProps.state}</p></td>
            <td><p>Created at: {issueProps.createdAt.toISOString()}</p></td>
            <td><p>Updated at: {issueProps.updatedAt.toISOString()}</p></td>
        </tr>
    );
}

export default Issue; 