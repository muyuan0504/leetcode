/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/** 填充每个节点的下一个右侧节点指针 II
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL
 * 初始状态下，所有 next 指针都被设置为 NULL
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {};

/** 填充每个节点的下一个右侧节点指针
 * 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL
 * 初始状态下，所有 next 指针都被设置为 NULL
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
    function fillNode(left, right) {
        if (left === null) return;
        left.next = right;
        fillNode(left.left, left.right);
        fillNode(left.right, left.next ? left.next.left : null);
    }
    fillNode(root, null);
    return root;
};

/** 从前序与中序遍历序列构造二叉树
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点
 *
 * preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 *
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    let rootIdx = 0; // 前序遍历，第一项是根节点
    let midMap = new Map();
    inorder.forEach((val, idx) => {
        midMap.set(val, idx);
    });
    function createTree(left, right) {
        if (left > right) return null;
        const rootVal = preorder[rootIdx];
        const root = new TreeNode(rootVal);
        rootIdx++;
        const nextIdx = midMap.get(rootVal);
        root.left = createTree(left, nextIdx - 1);
        root.right = createTree(nextIdx + 1, right);
        return root;
    }
    return createTree(0, inorder.length - 1);
};

/** 从中序与后序遍历序列构造二叉树
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树
 *
 * 已知信息：
 * 后续遍历的最后一个节点是二叉树的根节点,首先获取的是子树的根节点。
 *
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    let rootIdx = postorder.length - 1; // 定义当前根节点的坐标
    let midMap = new Map(); // 用一个哈希表记录中序遍历数组的索引
    inorder.forEach((val, idx) => {
        midMap.set(val, idx);
    });
    function createTree(left, right) {
        if (left > right) return null;
        const rootVal = postorder[rootIdx];
        const root = new TreeNode(rootVal);
        rootIdx--; // 每次构建完当前子树的根节点后，后序遍历向前递归, 利用后续遍历构建子树的根节点；
        nextIdx = midMap.get(rootval);
        // 利用中序遍历，构建子树根节点的左右节点, 左右节点的范围，在中序区间left-right区间内
        root.right = createTree(nextIdx + 1, right);
        root.left = createTree(left, nextIdx - 1);
        return root;
    }
    return createTree(0, inorder.length - 1);

    // let rootIdx = postorder.length - 1,
    //     midMap = new Map();
    // /** 基于中序遍历建立键值对的哈希表 */
    // inorder.forEach((val, idx) => {
    //     midMap.set(val, idx);
    // });
    // // initLeft, initRight用来处理下一个子树的边界情况
    // function treeCreate(initLeft, initRight) {
    //     if (initLeft > initRight) return null;
    //     const rootVal = postorder[rootIdx];
    //     const root = new TreeNode(rootVal);
    //     rootIdx--;
    //     const treeIdx = midMap.get(rootVal);
    //     // inorder和postorder 的左子树要对应上。postorder每次pop末尾的值，构建完右子树刚好pop到了其左子树末尾。 因此不需要再单独找postorder的左子树末尾在哪里,直接treeIdx - 1即可
    //     root.right = treeCreate(treeIdx + 1, initRight);
    //     root.left = treeCreate(initLeft, treeIdx - 1);
    //     return root;
    // }
    // return treeCreate(0, inorder.length - 1);
};

/**
 * 从前序与中序遍历序列构造二叉树
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 * inorder 均出现在 preorder
 * preorder 和 inorder 均 无重复 元素
 * preorder 保证 为二叉树的前序遍历序列
 * inorder 保证 为二叉树的中序遍历序列
 * 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 */
var buildTree = function (preorder, inorder) {
    // 前序遍历，第一个节点为二叉树的root节点
    // 中序遍历，root节点划分左右子树
    const rootIdx = 0;
    const rootVal = preorder[rootIdx];
    const root = new TreeNode(rootVal);
    const rootIndex = inorder.findIndex((item) => item === rootVal);

    const treeCreate = (initLeft, initRight) => {
        if (initLeft < initRight) return null;
        rootIdx++;

        root.left = treeCreate(initLeft, rootIndex - 1);
        root.right = treeCreate(rootIndex + 1, initRight);

        return root;
    };
    return treeCreate(0, inorder.length - 1);
};

// 二叉树的序列化与反序列化---把二叉树转化为一个字符串，并且还能把这个字符串还原成原来的二叉树
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    if (root === null) return '#';
    const treeList = [];
    function transform(root, row) {
        if (!treeList[row]) {
            treeList[row] = [];
        }

        if (root == null) {
            treeList[row].push('#', ',');
            return;
        } else {
            treeList[row].push(root.val, ',');
        }
        transform(root.left, row + 1);
        transform(root.right, row + 1);
    }
    transform(root, 0);
    const strList = treeList.reduce((total, item) => {
        total.push(...item, '|');
        return total;
    }, []);
    console.log('hahah', treeList);
    return strList.join('');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 *
 * [ '1,', '2,3,', '#,#,4,5,', '#,#,#,#,', '' ]
 */
var deserialize = function (data) {
    if (data === '#') return null;
    const nodeList = data.split('|');
    console.log(data, nodeList);
    const rootNode = new TreeNode(nodeList[0].split(',')[0]);
    function createTree(root, row) {
        rootNode.left = createTree(row + 1);
        rootNode.right = createTree(row + 1);
        return rootNode;
    }
    createTree(rootNode, 0);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

/**
 * 填充每个节点的下一个右侧节点指针
 * @param {Node} root
 * @return {Node}
 * 输入：root = [1,2,3,4,5,6,7]
 * 输出：[1,#,2,3,#,4,5,6,7,#]
 */
var connect = function (root) {
    if (root == null) return [];
    function dfs(left, right) {
        if (left == null || left.next == right) return;
        left.next = right;
        dfs(left.left, left.right);
        right.left ? dfs(left.right, right.left) : dfs(left.right, right.right);
        dfs(right.left, right.right);
    }
    dfs(root.left, root.right);
    return root;
};

/**
 * 从中序与后序遍历序列构造二叉树
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 * inorder 和 postorder 都由 不同 的值组成
 * postorder 中每一个值都在 inorder 中
 * inorder 保证是树的中序遍历
 * postorder 保证是树的后序遍历
 *
 * 输入：中序遍历inorder = [9,3,15,20,7], 后序遍历postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *
 * 【思路】
 * 后序遍历的最后一个节点是root节点，倒数第二个节点是右子树的第一个节点
 * 中序遍历的一定是以各个节点的子root为中心左右子树对半
 *
 */
var buildTree = function (inorder, postorder) {
    // const postorLen = postorder.length;
    // /** 找到root节点对应的值 */
    // const root = postorder[postorLen - 1];
    // const TreeNode = new TreeNode(root);
    // const leftList = [];
    // const rightList = [];
    // let leftFlag = true;
    // // 遍历中序遍历数组,划分左右子树数组
    // for (let i = 0; i < inorder.length; i++) {
    //     if (inorder[i] === root) {
    //         leftFlag = false;
    //         continue;
    //     }
    //     if (leftFlag) {
    //         leftList.push(inorder[i]);
    //     } else {
    //         rightList.push(inorder[i]);
    //     }
    // }
    // // 遍历后序遍历，构造二叉树
    // for (let j = postorLen - 2; j--; ) {}
    // function generateTee(root, rightIndex, leftIndex) {
    //     // 还需要通过中序遍历来判断单节点是左节点还是右节点
    //     root.right = postorder[rightIndex];
    //     root.left = postorder[leftIndex];
    // }
    // generateTee(root, postorLen - 1, postorLen - 2);
    // return TreeNode;

    // const inorderLen = inorder.length;
    // if (inorderLen == 0) return null;
    // function dfs(inorder, postorder, head1 = 0, tail1, head2 = 0, tail2) {
    //     if (head2 > tail2) return null;

    //     let val = postorder[tail2];
    //     let root = new TreeNode(val);
    //     if (head2 == tail2) return root;

    //     let mid = 0; // 拆分点mid的位置是相对的, 因为head1!=head2, 这里找到root所在的下标
    //     while (inorder[head1 + mid] != val) mid++;

    //     // 构造左子树, head1 + mid - 1: 左子树的最后一项
    //     root.left = dfs(inorder, postorder, head1, head1 + mid - 1, head2, head2 + mid - 1);
    //     // 构造右子树,
    //     root.right = dfs(inorder, postorder, head1 + mid + 1, tail1, head2 + mid, tail2 - 1);

    //     return root;
    // }
    // return dfs(inorder, postorder, 0, inorderLen - 1, 0, inorderLen - 1);

    let post_idx;
    const idx_map = new Map();
    const helper = (in_left, in_right) => {
        // 如果这里没有节点构造二叉树了，就结束
        if (in_left > in_right) {
            return null;
        }

        // 选择 post_idx 位置的元素作为当前子树根节点
        const root_val = postorder[post_idx];
        const root = new TreeNode(root_val);

        // 根据 root 所在位置分成左右两棵子树
        const index = idx_map.get(root_val);

        // 下标减一
        post_idx--;
        // 构造右子树
        root.right = helper(index + 1, in_right);
        // 构造左子树
        root.left = helper(in_left, index - 1);
        return root;
    };

    // 从后序遍历的最后一个元素开始
    post_idx = postorder.length - 1;

    // 建立（元素，下标）键值对的哈希表
    inorder.forEach((val, idx) => {
        idx_map.set(val, idx);
    });
    return helper(0, inorder.length - 1);
};

/**
 * 路径总和--减法处理
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    if (root == null) return false;
    if (root.left == null && root.right == null && targetSum - root.val === 0) {
        return true;
    }
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};

/**
 * 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    if (root == null) return;

    function checkTree(left, right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        return left.val == right.val && checkTree(left.left, right.right) && checkTree(left.right, right.left);
    }

    return checkTree(root, root);
};

/**
 * 二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    let depth = 0;

    function getDepth(root, dep) {
        if (root == null) return dep;
        /** +1 是因为要算上root这层深度 */
        return Math.max(getDepth(root.left, dep + 1), getDepth(root.right, dep + 1));
    }
    return getDepth(root, depth);
};
