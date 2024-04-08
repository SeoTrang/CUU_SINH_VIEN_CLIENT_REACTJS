const ultilFunction = {
    sortCommentsByHierarchy: (comments) => {
        const commentDict = {};  // Dictionary to store comments by their parent_id
        const rootComments = [];  // Array to store root comments (those without a parent_id)

        // Group comments by their parent_id
        comments.forEach(comment => {
            const parentId = comment.parent_id;
            if (parentId === null) {
                rootComments.push(comment);
            } else {
                if (!commentDict[parentId]) {
                    commentDict[parentId] = [];
                }
                commentDict[parentId].push(comment);
            }
        });

        // Sort comments recursively
        function sortRecursively(comment) {
            comment.replies = commentDict[comment.id] ? commentDict[comment.id].sort((a, b) => a.createdAt.localeCompare(b.createdAt)) : [];
            comment.replies.forEach(reply => {
                sortRecursively(reply);
            });
        }

        // Sort root comments
        rootComments.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        rootComments.forEach(comment => {
            sortRecursively(comment);
        });

        return rootComments;
    }
};

export default ultilFunction;
