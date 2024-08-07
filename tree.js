/**
 * Definition for a binary tree node.
 * 二叉树
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * 
 * N叉树
 * function _Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 * 
       5
     / \
    3   6
   / \
  2   4
 /   
1
 \
  4
 /
8
 */

/** 437. 路径总和 III
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）
 * 二叉树的节点个数的范围是 [0,1000]
 * @param {TreeNode} root -109 <= Node.val <= 109
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    /**
     * 路径求和II区别：
     * 1. 只需要计算数目，不需要返回路径
     * 2. 不需要从根节点开始，也不需要在叶子节点结束
     *
     * 关键点：
     * 1. 由于节点值可能是负数，所以一条线路上可能存在多个解，所以单次递归处理路径和获得targetSum后，还不能直接结束
     * 需要以路径为key，保存当前求和为targetSum的路径
     * 2. 是否存在不同子节点分支，但是路径值一样的路径呢？ ----> 那么保证是同一个index就行
     */

    // 减法运算

    if (root === null) return 0
    let res = nodeSum(root, targetSum)
    // 对两条子树进行 pathSum
    res += pathSum(root.left, targetSum)
    res += pathSum(root.right, targetSum)

    function nodeSum(node, target) {
        let count = 0
        if (node === null) return 0
        const val = node.val
        if (val === target) {
            count++
        }
        count += nodeSum(node.left, target - val)
        count += nodeSum(node.right, target - val)
        return count
    }
    return res

    // 求加法
    // let res = 0
    // function dfs(root, sum) {
    //     if (root === null) return
    //     if (root.val === targetSum) res++
    //     if (sum.length) {
    //         sum = sum.map((count) => {
    //             const sumCur = count + root.val
    //             if (sumCur === targetSum) res++
    //             return sumCur
    //         })
    //         sum.push(root.val)
    //     } else {
    //         sum = [root.val]
    //     }
    //     dfs(root.left, [...sum])
    //     dfs(root.right, [...sum])
    // }
    // dfs(root, [])
    // return res
}

/** 113. 路径总和 II
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径
 * 叶子节点 是指没有子节点的节点
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：[[5,4,11,2],[5,8,4,5]]
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
    /**
     * 1. 路径必须是从根节点要叶子节点
     * 2. 路径总和 = 目标值
     *
     * 优化思路：
     * 遍历的时候，计算和 - 引入 sum 变量
     */

    const res = []

    function dfs(root, nodeList, sum) {
        if (root === null) {
            return
        }
        nodeList.push(root.val)
        sum += root.val

        if (root.right === null && root.left === null) {
            if (sum === targetSum) {
                res.push(nodeList)
            }
        }

        dfs(root.left, [...nodeList], sum)
        dfs(root.right, [...nodeList], sum)
    }
    dfs(root, [], sum)

    return res

    /** 回溯思路 */
}

/**
 * 590. N 叉树的后序遍历
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
    const res = []
    function dfs(root) {
        if (root === null) return
        const childLen = root.children.length
        if (!!childLen) {
            for (let i = 0; i < childLen; i++) {
                const cRoot = root.children[i]
                dfs(cRoot)
            }
        }
        res.push(root.val)
    }
    dfs(root)
    return res
}

/**
 * 589. N 叉树的前序遍历
 * 给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。
 * n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）
 *
 * @param {_Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
    const res = []
    function dfs(root) {
        if (root === null) return
        res.push(root.val)
        const childLen = root.children.length
        if (!!childLen) {
            for (let i = 0; i < childLen; i++) {
                const cRoot = root.children[i]
                dfs(cRoot)
            }
        }
    }
    dfs(root)
    return res
}

/** 559. N 叉树的最大深度
 * 给定一个 N 叉树，找到其最大深度
 *
 * 要注意的是，这里的root的数结构，跟常规的 left， right 不一样，非左右子树结构
 * @param {_Node|null} root
 * @return {number}
 */
/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 * 
输入：root = [1,null,3,2,4,null,5,6]
{
  val: 1,
  children: [
    { val: 3, children: [Array] },
    { val: 2, children: [] },
    { val: 4, children: [] }
  ]
}
 * 
 */
var maxDepth = function (root) {
    if (root === null) return 0
    let maxDeep = 0
    function dfs(root, floor) {
        floor++
        console.log(root, floor)
        maxDeep = Math.max(maxDeep, floor)
        if (root.children) {
            for (let i = 0; i < root.children.length; i++) {
                dfs(root.children[i], floor)
            }
        }
    }
    dfs(root, 0)
    return maxDeep
}

/** LCR 054. 把二叉搜索树转换为累加树
 * 给定一个二叉搜索树，请将它的每个节点的值替换成树中大于或者等于该节点值的所有节点值之和
 * 输入：root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
 *                4
 *          1            6
 *       0    2        5    7
 *               3            8
 * 输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
 *
 * 输入：root = [3,2,4,1]
 *     3
 *   2   4
 * 1
 * 输出：[7,9,4,10]
 * @param {TreeNode} root 树中的节点数介于 0 和 104 之间  树中的所有值 互不相同
 * @return {TreeNode}
 */
var convertBST = function (root) {
    /** 思路：
     * 三次遍历
     * 1. 遍历找到单调递增数组
     * 2. 单调递增数组，通过前缀和拿到累加值
     * 3. 再次遍历，将累加值赋值到对应节点上
     */

    /** 二叉搜索树：中序遍历是单调递增序列
     * 需求：将它的每个节点的值替换成树中大于或者等于该节点值的所有节点值之和
     */

    const nodeList = []
    function getVal(root) {
        if (root === null) return
        getVal(root.left)
        nodeList.push(root.val)
        getVal(root.right)
    }

    /** 第一次遍历拿到节点的值 */
    getVal(root)

    /** 处理节点更新后的值 -》 前缀和 */

    for (let i = nodeList.length - 2; i >= 0; i--) {
        nodeList[i] = nodeList[i + 1] + nodeList[i]
    }

    console.log(nodeList)

    function setVal(root) {
        if (root === null) return
        setVal(root.left)
        root.val = nodeList.shift()
        setVal(root.right)
    }

    setVal(root)

    return root
}

/** LCR 045. 找树左下角的值
 * 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值
 * 假设二叉树中至少有一个节点。
 * 输入: root = [2,1,3]   输出: 1
 *
 * 输入: [1,2,3,4,null,5,6,null,null,7]
 *          1
 *    2           3
 * 4           5     6
 *           7
 * 输出: 7
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
    let curHeight = 0
    let curVal
    function dfs(root, height) {
        if (root === null) return
        height++
        dfs(root.left, height)
        dfs(root.right, height)
        if (height > curHeight) {
            curHeight = height
            curVal = root.val
        }
    }
    dfs(root, 0)
    return curVal

    /** 要满足两个条件 1. 最底层； 2. 最左边 */
    // 因为要找最左边，可以考虑 中序遍历
    // const res = []
    // function dfs(root, floor) {
    //     // floor处理层数
    //     if (root === null) return
    //     dfs(root.left, floor + 1)
    //     if (res[floor] === undefined) {
    //         res[floor] = root.val
    //     }
    //     dfs(root.right, floor + 1)
    // }
    // dfs(root, 0)
    // console.log(res)
    // const len = res.length
    // return res[len - 1]

    /** 官方 题解 dfs */
    // const dfs = (root, height) => {
    //     if (!root) {
    //         return
    //     }
    //     height++
    //     dfs(root.left, height)
    //     dfs(root.right, height)
    //     if (height > curHeight) {
    //         curHeight = height
    //         curVal = root.val
    //     }
    // }

    // let curHeight = 0
    // dfs(root, 0)
    // return curVal
}

/** 面试题 04.03. 特定深度节点链表
 * 给定一棵二叉树，设计一个算法，创建含有某一深度上所有节点的链表（比如，若一棵树的深度为 D，则会创建出 D 个链表）
 * 返回一个包含所有深度的链表的数组
 * 输入：[1,2,3,4,5,null,7,8]
         1
       /  \ 
      2    3
     / \    \ 
    4   5    7
   /
  8
  输出：[[1],[2,3],[4,5,7],[8]]
  * @param {TreeNode} tree
 * @return {ListNode[]}
 */
var listOfDepth = function (tree) {
    // 每一层为一个链表，链表从左到右
    // 为了方便链表遍历，每一层的数组需要保留对head节点的索引
    // 即 res[floor] = [head, last]
    // 在最后的返回值里，只需要返回 head ，舍弃 last 即可
    const res = []
    function dfs(root, floor) {
        if (root === null) return
        const linkNode = new ListNode(root.val)
        if (res[floor]) {
            res[floor][1].next = linkNode

            res[floor][1] = linkNode
        } else {
            res[floor] = [linkNode, linkNode]
        }
        dfs(root.left, floor + 1)
        dfs(root.right, floor + 1)
    }
    dfs(tree, 0)
    return res.map((item) => item[0])
}

/** 面试题 04.05. 合法二叉搜索树
 * 实现一个函数，检查一棵二叉树是否为二叉搜索树
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    /** 利用中序遍历是单调递增序列 */

    // let res = []
    // function dfs(root) {
    //     if (root === null) return
    //     dfs(root.left)
    //     res.push(root.val)
    //     dfs(root.right)
    // }
    // dfs(root)

    // for (let i = 1; i < res.length; i++) {
    //     if (res[i] <= res[i - 1]) {
    //         return false
    //     }
    // }
    // return true

    let prev
    let flag = true
    function dfs(root) {
        if (root === null || !flag) return
        dfs(root.left)
        if (prev !== undefined && prev >= root.val) {
            flag = false
        }
        prev = root.val
        dfs(root.right)
    }
    dfs(root)
    return flag
}

/** 面试题 04.06. 后继者
 * 设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。 
 * 如果指定节点没有对应的“下一个”节点，则返回null
 * 输入: root = [2,1,3], p = 1  输出: 2
   2
 / \
1   3
 * 
 * 输入: root = [5,3,6,2,4,null,null,1], p = 6 输出: null
       5
     / \
    3   6
   / \
  2   4
 /   
1
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
    // let res = []
    // function dfs(root) {
    //     if (root == null) return
    //     dfs(root.left)
    //     res.push(root)
    //     dfs(root.right)
    // }
    // dfs(root)
    // const idx = res.findIndex((item) => item.val === p)
    // if (idx > -1) {
    //     return res[idx + 1] || null
    // }
    // return null

    /** 优化：一次遍历 */
    // let res = null
    // let flag = false
    // function dfs(root) {
    //     if (root == null) return
    //     dfs(root.left)
    //     if (flag && res === null) {
    //         res = root
    //     }
    //     if (root.val === p.val) {
    //         flag = true
    //     }
    //     dfs(root.right)
    // }
    // dfs(root)
    // return res

    /** 二叉搜索树: 利用二叉搜索树中序遍历是递增序列做剪枝操作 */
    let res = null
    let flag = false
    function dfs(root) {
        if (root == null || res) return
        // 下面这行代码直接执行用时拉满：击败 100.00% 使用 JavaScript 的用户
        if (root.val < p.val) return dfs(root.right)
        dfs(root.left)
        if (flag && res === null) {
            res = root
        }
        if (root.val === p.val) {
            flag = true
        }
        dfs(root.right)
    }
    dfs(root)
    return res
}

/** 面试题 04.08. 首个共同祖先
 * 设计并实现一个算法，找出二叉树中某两个节点的第一个共同祖先
 * 不得将其他的节点存储在另外的数据结构中 注意：这不一定是二叉搜索树
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1  输出: 3
 *     3
      / \
     5   1
    / \ / \
   6  2 0  8
     / \
    7   4
 * 解释: 节点 5 和节点 1 的最近公共祖先是节点 3
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4  输出: 5
 * 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    let res

    function dfs(root) {
        if (root === null) return false

        let leftNode = dfs(root.left)
        let rightNode = dfs(root.right)

        /** 走后序遍历，找到两个节点 */

        const exsitInSubTree = leftNode && rightNode
        const fromSide = leftNode || rightNode
        const curIsRoot = fromSide && (root.val === p.val || root.val === q.val)

        if (exsitInSubTree || curIsRoot) {
            res = root
        }

        return fromSide || root.val === p.val || root.val === q.val
    }
    dfs(root)

    return res
}

/** 面试题 04.10. 检查子树
 * 检查子树。你有两棵非常大的二叉树：T1，有几万个节点；T2，有几万个节点。
 * 设计一个算法，判断 T2 是否为 T1 的子树
 * 如果 T1 有这么一个节点 n，其子树与 T2 一模一样，则 T2 为 T1 的子树，也就是说，从节点 n 处把树砍断，得到的树与 T2 完全相同
 *  输入：t1 = [1, 2, 3], t2 = [2]  输出：true
 *  输入：t1 = [1, null, 2, 4], t2 = [3, 2]  输出：false
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {boolean}
 * 判断 T2 是否为 T1 的子树
 */
var checkSubTree = function (t1, t2) {
    if (t2 === null) return true

    let flag = false

    function dfs(root) {
        if (root === null) return
        if (flag) return
        flag = isSameTree(root, t2)
        dfs(root.left)
        dfs(root.right)
    }

    function isSameTree(root1, root2) {
        if (root1 === null && root2 !== null) return false
        if (root1 !== null && root2 === null) return false
        if (root1 === null && root2 === null) return true
        let left = isSameTree(root1.left, root2.left)
        let right = isSameTree(root1.right, root2.right)
        return root1.val === root2.val && left && right
    }

    dfs(t1)

    return falg
}

/** 面试题 04.12. 求和路径
 * 给定一棵二叉树，其中每个节点都含有一个整数数值(该值或正或负)
 * 设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量
 * 注意，路径不一定非得从二叉树的根节点或叶节点开始或结束，但是其方向必须向下(只能从父节点指向子节点方向)。
 * 给定如下二叉树，以及目标和 sum = 22，
 * 
 *            5
             / \
            4   8             --> [[5,4], [4]]
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1

 * 解释：和为 22 的路径有：[5,4,11,2], [5,8,4,5], [4,11,7]

 * @param {TreeNode} root 节点总数 <= 10000
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
    let count = 0

    /**
     * 维护 pathList - 路径表 值为 [ [path], [path], ... ]
     * 维护 sumCount - 路径和
     *
     */
    // function dfs(node, pathList, sumCount) {
    //     if (node === null) return
    //     if (pathList.length) {
    //         for (let i = 0; i < pathList.length; i++) {
    //             sumCount[i] = sumCount[i] + node.val
    //             pathList[i].push(node.val)
    //             if (sumCount[i] === sum) {
    //                 count++
    //                 // pathCount.add(pathList[i].join(''))
    //             }
    //         }
    //     }

    //     if (node.val === sum) {
    //         // 当前节点满足条件
    //         count++
    //     }

    //     pathList.push([node.val])
    //     sumCount.push(node.val)

    //     console.log(pathList, sumCount)

    //     dfs(node.left, [...pathList], [...sumCount])
    //     dfs(node.right, [...pathList], [...sumCount])
    // }

    // dfs(root, [], [])

    // 路径维护优化

    function dfs(node, sumCount) {
        if (node === null) return
        if (sumCount.length) {
            for (let i = 0; i < sumCount.length; i++) {
                sumCount[i] = sumCount[i] + node.val
                if (sumCount[i] === sum) {
                    count++
                }
            }
        }

        if (node.val === sum) {
            // 当前节点满足条件
            count++
        }

        sumCount.push(node.val)

        dfs(node.left, [...sumCount])
        dfs(node.right, [...sumCount])
    }

    dfs(root, [])

    return count
}

/** 669. 修剪二叉搜索树
 *  给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。通过修剪二叉搜索树，使得所有节点的值在[low, high]中
 *  修剪树 不应该 改变保留在树中的元素的相对结构 (即，如果没有被移除，原有的父代子代关系都应当保留)
 *
 *  所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {}

/** 129. 求根节点到叶节点数字之和
 *   给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 *  例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 *  计算从根节点到叶节点生成的 所有数字之和
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
    // 可以结合 每个节点都对应一个数字，等于其父节点对应的数字乘以 10 再加上该节点的值
    // 比如 1 -> 2 -> 3 ， 当节点遍历到2时，2节点对应为 1*10 +2 = 12, 遍历到节点3时， 12 * 10 + 3 = 123
    let count = 0
    function Dep(root, base) {
        if (root === null) return
        if (!root.left && !root.right) {
            const total = base + root.val
            count += Number(total)
        }
        Dep(root.left, base + root.val)
        Dep(root.right, base + root.val)
        return
    }
    Dep(root, '')
    return count
}

/** 199. 二叉树的右视图
 *  给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    /** 思路： 既然是右视图，那么只需要取每一层的最右端节点即可, 实际就是层序遍历问题 */
    const deepMap = {}
    function Dep(root, deep) {
        if (root === null) return
        if (!deepMap[deep]) {
            deepMap[deep] = [root.val]
        } else {
            deepMap[deep].push(root.val)
        }
        Dep(root.left, deep + 1)
        Dep(root.right, deep + 1)
    }
    Dep(root, 0)
    return Object.keys(deepMap).map((deep) => {
        const deepList = deepMap[deep]
        const len = deepList.length
        return deepList[len - 1]
    })
}

/** 107. 二叉树的层序遍历 II
 *  给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 *  输入：root = [3,9,20,null,null,15,7]  输出：[[15,7],[9,20],[3]]
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    let res = []
    function Dep(root, dep) {
        if (root === null) return
        if (res[dep]) {
            res[dep].push(root.val)
        } else {
            res[dep] = [root.val]
        }
        Dep(root.left, dep + 1)
        Dep(root.right, dep + 1)
    }
    Dep(root, 0)
    return res.reverse()
}

/** 99. 恢复二叉搜索树
 *  给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
    // 有且仅有两个节点错误，恢复这棵树就是对这两个节点的left，right,及其父节点(如果存在)的left或right 的引用修正
    let nodeList = []
    let numList = []
    function Dep(root, father, isLeft) {
        if (root === null) return
        Dep(root.left, root, true)
        // 中序遍历处理
        numList.push(root.val)
        nodeList.push({
            root,
            father,
            isLeft,
        })
        Dep(root.right, root, false)
    }
    Dep(root, null, false)
    numList.sort((a, b) => a - b) // 将numList排序
    let errorList = []
    for (let i = 0; i < numList.length; i++) {
        const curVal = numList[i]
        if (nodeList[i].root.val !== curVal) {
            errorList.push(nodeList[i])
        }
    }
    // 找到两个节点
    // console.log(errorList[0].root.val, errorList[1].root.val)

    // const isRoot = (node) => node.val === root.val // 校验是否是root节点

    // const firstNode = errorList[0]
    // const secondNode = errorList[1]

    resetNode(errorList[0], errorList[1])

    function resetNode(n1, n2) {
        let n1Left = n1.root.left
        let n1Right = n1.root.right
        // 修正父级
        if (n1.father) {
            if (n1.isLeft) {
                n1.father.left = n2.root
            } else {
                n1.father.right = n2.root
            }
        }
        if (n2.father) {
            if (n2.isLeft) {
                n2.father.left = n1.root
            } else {
                n2.father.right = n1.root
            }
        }
        n1.root.left = n2.root.left
        n1.root.right = n2.root.right
        n2.root.left = n1Left
        n2.root.right = n1Right
    }
}

/** 96. 不同的二叉搜索树
 *  给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数
 * node.val <= node.right;
 * node.val => node.left
 * @param {number} n 1 <= n <= 8
 * @return {number}
 */
var numTrees = function (n) {
    /**
     * 1. 构建节点数组
     * 2. 构建二叉搜索树
     * 思路错啦
     */
    // const numList = new Array(n).fill(0).map((_, index) => ++index)
    // for (let i = 0; i < numList.length; i++) {
    //     const curNum = numList[i]
    // }
    // let root = null
    // function createTree(list, left, right, mid) {
    //     if (left > right) return null
    //     const root = new TreeNode(list[mid])
    //     // const mid = Math.ceil((left + right) / 2)
    //     let getMid = mid
    //     if (!getMid) {
    //         getMid = Math.ceil((left + right) / 2)
    //     }
    //     root.left = createTree(list, 0, getMid)
    //     root.right = createTree(list, getMid + 1, right)
    //     return root
    // }

    /** 动态规划解法：
     *  假设n个节点存在二叉排序树的个数是G(n)，1为根节点，2为根节点，...，n为根节点，
     *  当1为根节点时，其左子树节点个数为0，右子树节点个数为n-1，
     *  同理当2为根节点时，其左子树节点个数为1，右子树节点为n-2，
     *  所以可得G(n) = G(0)G(n-1)+G(1)(n-2)+...+G(n-1)*G(0)
     *
     *  G(n): 长度为 n 的序列能构成的不同二叉搜索树的个数
     *  对于边界情况，当序列长度为 1（只有根）或为 0（空树）时，只有一种情况，即 G(0)=1, G(1)=1
     *
     * 给定一个有序序列 1⋯n
     * 为了构建出一棵二叉搜索树，我们可以遍历每个数字 iii，将该数字作为树根
     *  将 1⋯(i−1)序列作为左子树，将 (i+1)⋯n 序列作为右子树。接着我们可以按照同样的方式递归构建左子树和右子树
     *
     * 所有的可能性 = 每个节点的可能性之和
     */

    const G = new Array(n + 1).fill(0)
    G[0] = 1 // 节点为空，此时没有左右子树，所以只有一种情况
    G[1] = 1 // 节点为根节点，此时也只有一种情况
    for (let i = 2; i <= n; ++i) {
        for (let j = 1; j <= i; ++j) {
            G[i] = G[j - 1] * G[i - j]
        }
    }
    return G[n]
}

/** 114. 二叉树展开为链表 ListNode
 *  给你二叉树的根结点 root ，请你将它展开为一个单链表
 *  展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null
 *  展开后的单链表应该与二叉树 先序遍历 顺序相同
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    if (root === null) return []
    let nodeList = []
    function Dep(root) {
        if (root === null) return
        nodeList.push(root)
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)

    for (let i = 1; i < nodeList.length; i++) {
        const prev = i - 1
        nodeList[prev].right = nodeList[i]
        nodeList[prev].left = null
    }
    return nodeList
}

/** 面试题 17.12. BiNode
 *  二叉树数据结构TreeNode可用来表示单向链表（其中left置空，right为下一个链表节点）
 *  实现一个方法，把二叉搜索树转换为单向链表，要求依然符合二叉搜索树的性质，转换操作应是原址的，也就是在原始的二叉搜索树上直接修改
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBiNode = function (root) {
    /** 已知条件：
     *  1. 二叉搜索树
     *  2. 转换为单向链表，left -> null, right -> next
     */
    let headNode = null
    let curNode = null
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        if (!headNode) {
            headNode = new TreeNode(root.val)
            curNode = headNode
        } else {
            curNode.right = new TreeNode(root.val)
            curNode = curNode.right
        }
        Dep(root.right)
    }
    Dep(root)
    return headNode
}

/** 面试题 04.04. 检查平衡性
 * 实现一个函数，检查二叉树是否平衡。在这个问题中，平衡树的定义如下：任意一个节点，其两棵子树的高度差不超过 1。
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    let res = true
    function Dep(root, deep) {
        if (!res) return deep
        if (root === null) return deep
        // 高度的计算是从root节点向下的
        const leftH = Dep(root.left, deep + 1)
        const rightH = Dep(root.right, deep + 1)
        if (Math.abs(leftH - rightH) > 1 && res) {
            res = false
        }
        return Math.max(leftH, rightH)
    }
    Dep(root, 0)
    return res
}

/** 面试题 04.02. 最小高度树
 *  给定一个有序整数数组，元素各不相同且按升序排列，编写一个算法，创建一棵高度最小的二叉搜索树
 *  [-10,-3,0,5,9] 一个符合条件的答案是 [0,-3,9,-10,null,5]
 *  @param {number[]} nums
 *  @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    // 有序整数数组 元素各不相同且按升序排列 二叉搜索树
    /** 首先二叉搜索树是中序遍历后单调递增的特性，要保证高度最小，那么就是左右子树尽量一样，先试试取中点做root */
    if (nums.length === 0) return null
    function Dep(list, left, right) {
        if (left > right) return null
        const mid = Math.ceil((left + right) / 2)
        const rootNode = new TreeNode(nums[mid])
        rootNode.left = Dep(list, left, mid - 1)
        rootNode.right = Dep(list, mid + 1, right)
        return rootNode
    }
    return Dep(nums, 0, nums.length - 1)
}

/** LCR 194. 二叉树的最近公共祖先
 *  先找到两个节点的祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    let res = null
    function Dep(root) {
        if (root === null) return false
        if (res) return // 剪枝一下
        let leftNode = Dep(root.left)
        let rightNode = Dep(root.right)
        /** 后续遍历下，对每个根root节点的处理
         *  1. 存在左右子树中包含了p或者q
         *  2. 当前节点包含p或q节点，并且他的左右子树包含了另一个节点
         */
        if ((leftNode && rightNode) || ((root.val === p.val || root.val === q.val) && (leftNode || rightNode))) {
            res = root
        }
        /** 每个节点的返回值
         *  1. 是否包含左子树
         *  2. 是否包含右子树
         *  3. 子树中是否包含p节点或者q节点
         *  如果满足一个条件，那么就继续向上递归
         *  因为递归的起点是root===null ，所以 leftNode, rightNode起点为false，
         *  因此：leftNode || rightNode || root.val === p.val || root.val === q.val -> 实际上是找到存在pq节点的子树
         */
        return leftNode || rightNode || root.val === p.val || root.val === q.val
    }
    Dep(root)
    return res
}

/** LCR 193. 二叉搜索树的最近公共祖先
 *  给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先
 *  百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）
 *  所有节点的值都是唯一的。  p、q 为不同节点且均存在于给定的二叉搜索树中。
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    // 优化点：二叉搜索树的中序遍历是单调递增特性
    if (root == null) return
    if (root.val > p.val && root.val > q.val) {
        // 当前节点比p,q都要大，说明pq在左子树
        return lowestCommonAncestor(root.left, p, q)
    }
    if (root.val < p.val && root.val < q.val) {
        // 当前节点比p,q都要小，说明pq在右子树
        return lowestCommonAncestor(root.right, p, q)
    }
    return root
}

/** LCR 176. 判断是否为平衡二叉树 0 <= 树的结点个数 <= 10000
 *  输入一棵二叉树的根节点，判断该树是不是平衡二叉树。
 *  如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    // 平衡的定义：任意节点 的左右子树的深度相差不超过1，只求左右子树，不是整棵树, 以下为错误解法
    // if (root === null) return true
    // let isFlag = true
    // let minDep = undefined
    // let maxDep = undefined
    // function Dep(root, dep) {
    //     if (!isFlag) return
    //     if (root === null) {
    //         if (minDep === undefined) minDep = dep
    //         if (maxDep === undefined) maxDep = dep
    //         minDep = Math.min(minDep, dep)
    //         maxDep = Math.max(maxDep, dep)
    //         isFlag = isFlag && Math.abs(maxDep - minDep) < 2
    //         return
    //     }
    //     Dep(root.left, dep + 1)
    //     Dep(root.right, dep + 1)
    // }
    // Dep(root, 0)
    // return isFlag

    if (root === null) return true
    let isFlag = true

    function Dep(root, dep) {
        if (!isFlag) return 0
        if (root === null) return dep
        let leftCount = Dep(root.left, dep + 1)
        let rightCount = Dep(root.right, dep + 1)
        /** 深度的统计是从根节点到叶节点，所以用后续遍历，从上到下，先拿到当前节点的深度，再挨个处理各个节点的深度 */
        if (Math.abs(leftCount - rightCount) > 1 && isFlag) {
            isFlag = false
        }
        return Math.max(rightCount, leftCount)
    }
    return Dep(root, 0) && isFlag
}

/** LCR 175. 计算二叉树的深度
 *  某公司架构以二叉树形式记录，请返回该公司的层级数
 * @param {TreeNode} root
 * @return {number}
 */
var calculateDepth = function (root) {
    function Dep(root) {
        if (root === null) return 0
        return 1 + Math.max(Dep(root.left), Dep(root.right))
    }
    return Dep(root)
}

/** LCR 174. 寻找二叉搜索树中的目标节点
 *  某公司组织架构以二叉搜索树形式记录，节点值为处于该职位的员工编号。请返回第 cnt 大的员工编号
 *  root = [7, 3, 9, 1, 5], cnt = 2  输出：7
 * @param {TreeNode} root
 * @param {number} cnt
 * @return {number}
 */
var findTargetNode = function (root, cnt) {
    let count = []
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        count.push(root.val)
        Dep(root.right)
    }
    Dep(root)
    // 二叉搜索树的中序遍历是单电递增
    return count[count.length - cnt]
}

/** LCR 150. 彩灯装饰记录 II
 *  一棵圣诞树记作根节点为 root 的二叉树，节点值为该位置装饰彩灯的颜色编号。请按照从左到右的顺序返回每一层彩灯编号，每一层的结果记录于一行
 * 输入：root = [8,17,21,18,null,null,6]  输出：[[8],[17,21],[18,6]]
 * @param {TreeNode} root
 * @return {number[][]}
 */
var decorateRecord = function (root) {
    const totalCount = []
    function Dep(root, dep) {
        if (root === null) return
        let depCount = totalCount[dep]
        if (depCount) {
            depCount.push(root.val)
        } else {
            totalCount[dep] = [root.val]
        }
        Dep(root.left, dep + 1)
        Dep(root.right, dep + 1)
    }
    Dep(root, 0)
    return totalCount
}

/** LCR 145. 判断对称二叉树
 *  请设计一个函数判断一棵二叉树是否 轴对称
 * @param {TreeNode} root
 * @return {boolean}
 */
var checkSymmetricTree = function (root) {
    if (root === null) return false
    function checkTree(left, right) {
        if (left === null && right !== null) return false
        if (left !== null && right === null) return false
        if (left === null && right === null) return true
        return left.val === right.val && checkTree(left.left, right.right) && checkTree(left.right, right.left)
    }
    return checkTree(root.left, root.right)
}

/** LCR 144. 翻转二叉树
 *  给定一棵二叉树的根节点 root，请左右翻转这棵二叉树，并返回其根节点
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var mirrorTree = function (root) {
    function Dep(root) {
        if (root === null) return
        // 翻转单颗
        let tempRoot = root.left
        root.left = root.right
        root.right = tempRoot
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)
    return root

    // 官方解法：感觉还不如用临时变量交换有效率
    if (root === null) return root
    let left = mirrorTree(root.left)
    let right = mirrorTree(root.right)
    root.right = left
    root.left = right
    return root
}

/** LCR 052. 递增顺序搜索树
 *  给你一棵二叉搜索树，请 按中序遍历 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
    let newRoot = null
    let curNode = null
    function Dep(root) {
        if (root == null) return
        Dep(root.left)
        if (!newRoot) {
            newRoot = new TreeNode(root.val)
            curNode = newRoot
        } else {
            curNode.right = new TreeNode(root.val)
            curNode = curNode.right
        }
        Dep(root.right)
        return newRoot
    }
    return Dep(root)
}

/** LCP 44. 开幕式焰火
 *  输入：root = [1,3,2,1,null,2] 输出：3
 *  其实就是去重
 * @param {TreeNode} root
 * @return {number}
 */
var numColor = function (root) {
    // const colorSet = new Set()
    // function Dep(root) {
    //     if (root === null) return
    //     colorSet.add(root.val)
    //     Dep(root.left)
    //     Dep(root.right)
    // }
    // Dep(root)
    // return Array.from(colorSet).length

    const colorMap = {}
    let count = 0
    function Dep(root) {
        if (root === null) return
        if (!colorMap[root.val]) {
            count++
            colorMap[root.val] = true
        }
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)
    return count
}

/** 2331. 计算布尔二叉树的值
 *  叶子节点 要么值为 0 要么值为 1 ，其中 0 表示 False ，1 表示 True；
 *  非叶子节点 要么值为 2 要么值为 3 ，其中 2 表示逻辑或 OR ，3 表示逻辑与 AND
 *  如果节点是个叶子节点，那么节点的 值 为它本身，即 True 或者 False，否则，计算 两个孩子的节点值，然后将该节点的运算符对两个孩子值进行 运算
 *  返回根节点 root 的布尔运算值
 *  [叶子节点 是没有孩子的节点]
 *  @param {TreeNode} root
 *  @return {boolean}
 */
var evaluateTree = function (root) {
    function Dep(root) {
        if (root == null) return true
        if (root.val === 2) {
            return Dep(root.left) || Dep(root.right)
        } else if (root.val === 3) {
            return Dep(root.left) && Dep(root.right)
        }
        return !!root.val
    }
    return Dep(root)
}

/** 2236. 判断根结点是否等于子结点之和
 *  给你一个 二叉树 的根结点 root，该二叉树由恰好 3 个结点组成：根结点、左子结点和右子结点
 *  如果根结点值等于两个子结点值之和，返回 true ，否则返回 false
 * @param {TreeNode} root
 * @return {boolean}
 */
var checkTree = function (root) {
    return root.val === root.left.val + root.right.val
}

/** 1379. 找出克隆二叉树中的相同节点
 *  给你两棵二叉树，原始树 original 和克隆树 cloned，以及一个位于原始树 original 中的目标节点 target
 *  其中，克隆树 cloned 是原始树 original 的一个 副本
 *  请找出在树 cloned 中，与 target 相同 的节点，并返回对该节点的引用（在 C/C++ 等有指针的语言中返回 节点指针，其他语言返回节点本身）
 *  注意：你 不能 对两棵二叉树，以及 target 节点进行更改。只能 返回对克隆树 cloned 中已有的节点的引用
 *  输入: tree = [7,4,3,null,null,6,19], target = 3
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function (original, cloned, target) {
    let getTarget = null
    function crossTree(root) {
        if (root === null || getTarget) return
        if (root.val === target.val) {
            getTarget = root
        }
        crossTree(root.left)
        crossTree(root.right)
    }
    crossTree(cloned)
    return getTarget
}

/** 1022. 从根到叶的二进制数之和
 *  给出一棵二叉树，其上每个结点的值都是 0 或 1 。每一条从根到叶的路径都代表一个从最高有效位开始的二进制数
 *  例如，如果路径为 0 -> 1 -> 1 -> 0 -> 1，那么它表示二进制数 01101，也就是 13
 *  对树上的每一片叶子，我们都要找出从根到该叶子的路径所表示的数字
 *  返回这些数字之和。题目数据保证答案是一个 32 位 整数
 *  输入：root = [1,0,1,0,1,0,1] 输出：22
 *  解释：(100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
 * @param {TreeNode} root
 * @return {number}
 */
var sumRootToLeaf = function (root) {
    const pathList = []
    // 1. 先遍历拿到所有的路径组合
    function Dep(root, path) {
        if (root === null) {
            // 可以将对path计算的方法抽成函数，在这里计算，减少后续多一次遍历
            pathList.push(path)
            return
        }
        path.unshift(root.val)
        if (root.left === null) {
            return Dep(root.right, [...path])
        }
        if (root.right === null) {
            return Dep(root.left, [...path])
        }
        Dep(root.left, [...path])
        Dep(root.right, [...path])
    }
    Dep(root, [])
    // 2. 路径组合求和
    let res = 0
    for (let i = 0; i < pathList.length; i++) {
        const curPath = pathList[i]
        const calcPath = curPath.reduce((total, item, index) => {
            total += Math.pow(2, index) * item
            return total
        }, 0)
        res += calcPath
    }
    return res

    /** 优化，能不能每一步计算拿到结果，然后往下传值呢 => 其实就是每一层的值，乘以 2^(层数-1)
     *  其实比较难，因为不确定每个路径的深度，所以拿不到层数，倒是可以考虑将层数记录下来，那样处理起来又有另外的麻烦，因为所处层数与当前节点的计算值并不一致。
     *  比如最底层，层数最大，但是在2进制的计算中，反而要从0开始
     */
}

/** 993. 二叉树的堂兄弟节点
 *  在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点
 *  每个节点的值都是唯一的、范围为 1 到 100 的整数
 *  只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false
 *
 * 【深度】计算原则：根节点位于深度 0 处，那么深度就是从root节点开始算
 * 满足两个条件：1.不同的父节点； 2.相同的节点深度
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
    const nodeList = []
    function Dep(root, dep, father) {
        if (root === null) return 0
        if (nodeList.length === 2) return
        if (root.val === x) {
            nodeList.push({ node: root, dep, father })
        } else if (root.val === y) {
            nodeList.push({ node: root, dep, father })
        }
        Dep(root.left, dep + 1, root)
        Dep(root.right, dep + 1, root)
    }
    // 考虑x,y可能为root的情况，所以初始值father参数为root
    Dep(root, 0, root)
    const nodeLeft = nodeList[0]
    const nodeRight = nodeList[1]
    if (nodeLeft.father.val === nodeRight.father.val || nodeLeft.dep !== nodeRight.dep) return false
    return true

    /** 错误思路：深度计算规则不对 */
    // const nodeList = []
    // function Dep(root, father) {
    //     if (root === null) return 0
    //     if (nodeList.length === 2) return
    //     if (root.val === x) {
    //         nodeList.push({ node: root, father })
    //     } else if (root.val === y) {
    //         nodeList.push({ node: root, father })
    //     }
    //     Dep(root.left, root)
    //     Dep(root.right, root)
    // }
    // // 第一步：先拿到两个节点，判断父节点是否相同
    // Dep(root, null)
    // if (nodeList[0].father.val === nodeList[1].father.val) return false
    // // 第二步：计算深度(从下往上算了，应该从上往下算)
    // function calcDep(root) {
    //     if (root === null) return 0
    //     return Math.max(1 + calcDep(root.left), 1 + calcDep(root.right))
    // }
    // const leftDep = calcDep(nodeList[0].node)
    // const rightDep = calcDep(nodeList[1].node)
    // return leftDep === rightDep
}

/** 965. 单值二叉树
 *  如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树 只有给定的树是单值二叉树时，才返回 true；否则返回 false
 * @param {TreeNode} root
 * @return {boolean}
 */
var isUnivalTree = function (root) {
    const baseVal = root.val
    let flag = true
    function Dep(root) {
        if (root === null) return baseVal
        flag = flag && baseVal === root.val
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)
    return flag
}

/** 938. 二叉搜索树的范围和
 *  给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和
 *  输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
 *  输出：32
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
    // let res = 0
    // function Dep(root) {
    //     if (root === null) return 0
    //     Dep(root.left)
    //     if (root.val >= low && root.val <= high) {
    //         res += root.val
    //     }
    //     Dep(root.right)
    // }
    // Dep(root)
    // return res

    // 因为是二叉搜索树，利用其特性
    function Dep(root) {
        if (root === null) return 0
        if (root.val < low) return Dep(root.right)
        if (root.val > high) return Dep(root.left)
        return root.val + Dep(root.left) + Dep(root.right)
    }
    return Dep(root)
}

/** 897. 递增顺序搜索树
 *  给你一棵二叉搜索树的 root ，请你 按中序遍历 将其重新排列为一棵递增顺序搜索树，
 * 使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
    let newRoot = null
    let curNode = null
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        if (!newRoot) {
            newRoot = new TreeNode(root.val)
            curNode = newRoot
        } else {
            curNode.right = new TreeNode(root.val)
            curNode = curNode.right
        }
        Dep(root.right)
    }
    Dep(root)
    return newRoot

    // let nodeList = []
    // function Dep(root) {
    //     if (root === null) return
    //     Dep(root.left)
    //     nodeList.push(root.val)
    //     Dep(root.right)
    // }
    // Dep(root)
    // let newRoot = new TreeNode(nodeList[0])
    // let curNode = newRoot
    // for (let i = 1; i < nodeList.length; i++) {
    //     curNode.left = null
    //     curNode.right = new TreeNode(nodeList[i])
    //     curNode = curNode.right
    // }
    // return newRoot
}

/** 872. 叶子相似的树
 *  请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
    /**
     * 1. 找到所有的叶子
     * 2. 对比两个叶子序列
     */
    function Dep(root, seq = []) {
        if (root == null) return
        if (!root.left && !root.right) {
            seq.push(root.val)
        }
        Dep(root.left, seq)
        Dep(root.right, seq)
    }
    let seq1 = []
    Dep(root1, seq1)
    let seq2 = []
    Dep(root2, seq2)
    return seq1.toString() === seq2.toString()
}

/** 783. 二叉搜索树节点最小距离
 *  给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值  差值是一个正数，其数值等于两值之差的绝对值。
 *  输入：root = [4,2,6,1,3] 输出：1
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
    /** 能否利用二叉搜索树特性：对于每一个子树，
     * node.val <= node.right;
     * node.val => node.left
     * 由于是任意两不同节点值之间的最小差值，二叉搜索树的优势在哪里呢: 答案是有序性
     * 既然是一个递增序列，那么最小的差值，肯定是在递增节点的前后节点中出现 [1,3,5,6,8] -> [5,6]，不存在非相连节点的差值会大于两个相连节点差值
     */
    let preVal = undefined
    let curDiff = Infinity
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        if (preVal === undefined) {
            preVal = root.val
        } else {
            const diff = Math.abs(preVal - root.val)
            curDiff = Math.min(curDiff, diff)
            preVal = root.val
        }
        Dep(root.right)
    }
    Dep(root)
    return curDiff

    /** 暴力解法：将问题转换为找到数组中最小差值 */
    let nodeList = []
    function crossTree(root) {
        if (root == null) return
        nodeList.push(root.val)
        crossTree(root.left)
        crossTree(root.right)
    }
    crossTree(root)
    let min = Infinity
    for (let i = 0; i < nodeList.length - 1; i++) {
        let right = i + 1
        while (right < nodeList.length) {
            min = Math.min(min, Math.abs(nodeList[right] - nodeList[i]))
            right++
        }
    }
    return min
}

/** 671. 二叉树中第二小的节点
 * 给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。
 * 如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个
 * 更正式地说，即 root.val = min(root.left.val, root.right.val) 总成立
 * 给出这样的一个二叉树，你需要输出所有节点中的 第二小的值   如果第二小的值不存在的话，输出 -1
 * 输入：root = [2,2,5,null,null,5,7]  输出：5
 * 解释：最小的值是 2 ，第二小的值是 5 。
 * @param {TreeNode} root
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
    let minest = []
    function crossTree(root) {
        if (root === null) return
        if (!minest[0]) {
            minest[0] = root.val
        } else if (!minest[1]) {
            let init = root.val
            if (init < minest[0]) {
                init = minest[0]
                minest[0] = root.val
            }
            minest[1] = init
        } else if (minest[0] === minest[1]) {
            minest[1] = root.val
        } else if (root.val > minest[0] && root.val < minest[1]) {
            minest[1] = root.val
        } else if (root.val < minest[0]) {
            minest[1] = minest[0]
            minest[0] = root.val
        }
        crossTree(root.left)
        crossTree(root.right)
    }
    crossTree(root)
    console.log(minest)
    return minest[0] < minest[1] ? minest[1] : -1
}

/** 653. 两数之和 IV - 输入二叉搜索树
 *  给定一个二叉搜索树 root 和一个目标结果 k，如果二叉搜索树中存在两个元素且它们的和等于给定的目标结果，则返回 true
 *  输入: root = [5,3,6,2,4,null,7], k = 9  输出: true
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    // 构建数组解决：二叉搜索树的中序遍历是递增序列
    if (root === null) return false
    const numList = []
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        numList.push(root.val)
        Dep(root.right)
    }
    Dep(root)
    let left = 0,
        right = numList.length - 1
    while (left < right) {
        const findVal = k - numList[left]
        /** 边界处理 */
        if (numList[right] > findVal) {
            right--
        } else if (numList[right] === findVal) {
            return true
        } else {
            left++
            right = numList.length - 1 // 重置right锚点
        }
    }
    return false

    /** 优化:有什么可能不使用数组，直接遍历的时候查找呢: 利用Map，空间换时间 */
    const needMap = new Set()
    function Dep(root) {
        if (root === null) return false
        if (needMap.has(root.val)) {
            return true
        }
        needMap.add(k - root.val)
        return Dep(root.left) || Dep(root.right)
    }
    return Dep(root)
}

/** 637. 二叉树的层平均值
 *  给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10-5 以内的答案可以被接受
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[3.00000,14.50000,11.00000]
 * 解释：第 0 层的平均值为 3,第 1 层的平均值为 14.5 ( 9+20  / 2), 第 2 层的平均值为 11 ( 15+7  / 2)。因此返回 [3, 14.5, 11]
 *
 *  @param {TreeNode} root
 *  @return {number[]}
 */
var averageOfLevels = function (root) {
    // 解法1：构建 resCount对象，数据格式为：{ '0': [ 3 ], '1': [ 9, 20 ], '2': [ 15, 7 ] }
    let resCount = {}
    function crossTree(root, dep) {
        if (root === null) return
        if (resCount[dep]) {
            resCount[dep].push(root.val)
        } else {
            resCount[dep] = [root.val]
        }
        crossTree(root.left, dep + 1)
        crossTree(root.right, dep + 1)
    }
    crossTree(root, 0)
    const depList = Object.keys(resCount) // 拿到层级数组：[ '0', '1', '2' ]
    // depList.sort((a,b) => a-b)
    const result = []
    depList.forEach((dep) => {
        const depNums = resCount[dep].reduce((total, item) => (total += item), 0)
        result.push(depNums / resCount[dep].length)
    })
    return result

    // 优化一下：构建 resCount对象，数据格式为：{ '0': [ 3 ], '1': [ 9, 20 ], '2': [ 15, 7 ] }
    // let resCount = {}
    // function crossTree(root, dep) {
    //     if(root === null) return
    //     if(resCount[dep]) {
    //         const curDep = resCount[dep]
    //         curDep.val += root.val
    //         curDep.count++
    //         curDep.avarage = curDep.val / curDep.count
    //     } else {
    //         resCount[dep] = {
    //             val: root.val,
    //             count: 1,
    //             avarage: root.val
    //         }
    //     }
    //     crossTree(root.left, dep+1)
    //     crossTree(root.right, dep+1)
    // }
    // crossTree(root, 0)
    // console.log(resCount)
    // return Object.keys(resCount).map(dep => resCount[dep].avarage)
}

/** 606. 根据二叉树创建字符串
 * 给你二叉树的根节点 root ，请你采用前序遍历的方式，将二叉树转化为一个由括号和整数组成的字符串，返回构造出的字符串
 * 空节点使用一对空括号对 "()" 表示，转化后需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对
 * 输入：root = [1,2,3,4]        输出："1(2(4))(3)"       初步转化后得到 "1(2(4)())(3()())" ，但省略所有不必要的空括号对后，字符串应该是"1(2(4))(3)"
 * 输入：root = [1,2,3,null,4]   输出："1(2()(4))(3)"     只允许左子树为空时用()代替节点,右子树为空或者左右子树为空就都不处理
 * root(root.left)(root.right)
 * @param {TreeNode} root
 * @return {string}
 */
var tree2str = function (root) {
    /** 迭代法 */
    let res = ''
    let stack = [root]
    let crossNode = new Set()
    while (stack.length) {
        const node = stack[stack.length - 1]
        if (crossNode.has(node)) {
            /** 通过声明 crossNode, 保存遍历过的节点,在后续遍历中，补上节点的')' */
            if (node !== root) {
                /** 这里也需要边界检测，非root节点，不需要补上 ')'  */
                res += ')'
            }
            stack.pop()
        } else {
            crossNode.add(node)
            if (node !== root) {
                /** 当前不是root根节点,先拼上'(' */
                res += '('
            }
            res += '' + node.val
            if (!node.left && node.right) {
                /** 针对有左节点，没有右节点，补上'()' */
                res += '()'
            }
            if (node.right) {
                stack.push(node.right)
            }
            if (node.left) {
                stack.push(node.left)
            }
        }
    }
    return res

    /** 递归解法 */
    // function crossTree(root) {
    //     if (root === null) return ''
    //     if (!root.left && !root.right) {
    //         return '' + root.val
    //     }
    //     if (!root.right) {
    //         return root.val + '(' + tree2str(root.left) + ')'
    //     }
    //     const leftNode = tree2str(root.left)
    //     const rightNode = tree2str(root.right)
    //     return root.val + '(' + leftNode + ')(' + rightNode + ')'
    // }
    // return crossTree(root)
}

/** 563. 二叉树的坡度
 * 给你一个二叉树的根节点 root ，计算并返回 整个树 的坡度
 * 一个树的 节点的坡度 定义即为，【该节点左子树的节点之和和右子树节点之和的 差的绝对值 。】
 * 如果没有左子树的话，左子树的节点之和为 0 ；没有右子树的话也是一样。空结点的坡度是 0
 * 整个树 的坡度就是其所有节点的坡度之和
 *
 * 输入：root = [4,2,9,3,5,null,7]
 * 输出：15
 *
 * 思路： 前序遍历处理
 *
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function (root) {
    let count = 0
    function Dep(root) {
        if (root === null) return 0
        const leftCount = Dep(root.left)
        const rightCount = Dep(root.right)
        /** 收集当前节点的坡度 */
        count += Math.abs(leftCount - rightCount)
        /** 每个节点返回节点当前值以及左右节点的计算值 */
        return root.val + leftCount + rightCount
    }
    Dep(root)
    return count
}

/** 543. 二叉树的直径
 * 给你一棵二叉树的根节点，返回该树的 直径
 * 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root
 * 【两节点之间路径的 长度 由它们之间边数表示】
 * 输入：root = [1,2,3,4,5]
 * 输出：3 取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
 *
 * 就是找到这条路径所在节点的最优解，每个节点的所有可能的选择中，找到最长的那个
 *
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    let res = 0
    function crossTree(root) {
        if (root === null) return 0
        const leftCount = crossTree(root.left) + 1
        const rightCount = crossTree(root.right) + 1
        res = Math.max(res, leftCount + rightCount)

        return Math.max(leftCount, rightCount)
    }
    crossTree(root)
    return res
}

/** 530. 二叉搜索树的最小绝对差
 * 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值
 * 差值是一个正数，其数值等于两值之差的绝对值
 * 输入：root = [4,2,6,1,3]
 * 输出：1
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
    // // 既然是二叉搜索树，那么利用二叉搜索树的中序遍历是一个递增的序列
    // const queueNode = []
    // function cross(root) {
    //     if (root === null) return
    //     cross(root.left)
    //     queueNode.push(root.val)
    //     cross(root.right)
    // }
    // cross(root)
    // // 从递增序列 queueNode 中找到最小差值 - 利用滑动窗口
    // let left = 0
    // let right = left + 1
    // let minDis = Infinity
    // while (left < queueNode.length - 1) {
    //     let curDis = queueNode[right] - queueNode[left]
    //     minDis = Math.min(minDis, curDis)
    //     left++
    //     right++
    // }
    // return Math.abs(minDis)

    // 优化：在中序遍历期间进行比较计算
    const queueNode = []
    let pre = undefined
    let minDis = Infinity
    function cross(root) {
        if (root === null) return
        cross(root.left)
        if (pre === undefined) {
            pre = root.val
        } else {
            minDis = Math.min(minDis, root.val - pre)
            pre = root.val
        }
        queueNode.push(root.val)
        cross(root.right)
    }
    cross(root)
    return minDis
}

/** 222. 完全二叉树的节点个数
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数
 * 完全二叉树 的定义如下：
 * 在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的 若干位置（不一定意味左子树是满编）
 * 若最底层为第 h 层，则该层包含 1~ 2h 个节点
 *
 * 进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    // let count = 0
    // // 其实本质还是求节点数量
    // function crossTree(root) {
    //     if (root === null) return
    //     crossTree(root.left)
    //     count++
    //     crossTree(root.right)
    // }
    // crossTree(root)
    // return count

    function count(root) {
        if (root === null) return 0
        // 将问题转换为求左右子树的高度，在求左右子树高度的时，判断左右子树是否为满二叉树，如果是满二叉树，则利用二叉树特性，直接用公式计算
        let leftH = 0,
            rightH = 0,
            node = root
        while (node !== null) {
            leftH++
            node = node.left
        }
        while (node !== null) {
            rightH++
            node = node.right
        }
        if (leftH === rightH) {
            // 左右子树相等，说明是满二叉树，-1是为了
            return Math.pow(2, leftH + 1) - 1
        }
        return count(root.left) + count(root.right) + 1
    }
    return count(root)
}

/**
 * 501. 二叉搜索树中的众数
 * 给你一个含重复值的二叉搜索树（BST）的根节点 root ，
 * 找出并返回 BST 中的所有 众数（即，出现频率最高的元素）
 * 如果树中有不止一个众数，可以按 任意顺序 返回
 * 输入：root = [1,null,2,2] 输出：[2]
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
    // const nodeCount = {}
    // function crossTree(root) {
    //     if (root === null) return
    //     const countKey = root.val
    //     const curCount = nodeCount[countKey]
    //     if (curCount) {
    //         nodeCount[countKey]++
    //     } else {
    //         nodeCount[countKey] = 1
    //     }
    //     crossTree(root.left)
    //     crossTree(root.right)
    // }
    // crossTree(root)
    // let maxList = []
    // let maxNum = -Infinity
    // Object.keys(nodeCount).forEach((key) => {
    //     const val = nodeCount[key] // 取到对应num的数量
    //     if (val > maxNum) {
    //         maxNum = val
    //         maxList = [key]
    //     } else if (val === maxNum) {
    //         maxList.push(key)
    //     }
    // })
    // return Array.from(new Set(maxList))

    // const rootList = []
    // function crossTree(root) {
    //     if (root === null) return
    //     crossTree(root.left)
    //     rootList.push(root.val)
    //     crossTree(root.right)
    // }
    // crossTree(root)
    // // 问题转换为：从一个有序数组中找出所有的众数，并且通过base,count来缓存结果，减少了map对象的开销
    // let base = rootList[0]
    // let count = 0
    // let maxCount = 0
    // let maxList = [base]
    // for (let i = 0; i < rootList.length; i++) {
    //     const val = rootList[i]
    //     if (val === base) {
    //         count++
    //     } else {
    //         count = 1 // 重置单独某个数的计算初始值
    //         base = val
    //     }
    //     if (count > maxCount) {
    //         maxList = [base]
    //         maxCount = count // 更新最大值
    //     } else if (count === maxCount) {
    //         maxList.push(base)
    //     }
    // }
    // return maxList

    let base = null
    let count = 0
    let maxCount = 0
    let maxList = []
    function updateCount(val) {
        if (val === base) {
            count++
        } else {
            count = 1 // 重置单独某个数的计算初始值
            base = val
        }
        if (count > maxCount) {
            maxList = [base]
            maxCount = count // 更新最大值
        } else if (count === maxCount) {
            maxList.push(base)
        }
    }
    function crossTree(root) {
        if (root === null) return
        crossTree(root.left)
        updateCount(root.val)
        crossTree(root.right)
    }
    crossTree(root)
    return maxList

    /** morris 遍历 */
    let cur = root // 记录当前遍历的节点指针
    let prev = null // 记录当前节点的左子节点的最右侧根节点
    while (cur !== null) {
        if (cur.left === null) {
            // 到达左子树的根节点，可取值
            console.log(cur.val)
            cur = cur.right
            continue
        }
        pre = cur.left
        while (pre.right !== null && pre.right !== cur) {
            // 遍历到当前节点的左子树的最右侧节点
            pre = pre.right
        }
        // 处理最右侧节点
        if (pre.right === null) {
            // 第一次遍历的时候，右节点肯定是有终点的
            // 如果为空，则说明是当前节点延伸的最左边节点，且是第一次遍历；将当前节点的左子树的最右侧节点指向当前节点
            pre.right = cur
            cur = cur.left // 处理下一个左子节点
        } else {
            // 如果最右侧节点不为空，那么这里置空处理，并将指针指向当前节点的右子树
            pre.right = null
            console.log(cur.val)
            cur = cur.right // 这里是当前根节点左子树末位节点，那么将指针指回右节点，再pre.right === null 的逻辑中，cur.right指向的是当前节点的上级根节点
        }
    }

    let cur = root,
        pre = null
    while (cur !== null) {
        if (cur.left === null) {
            update(cur.val)
            cur = cur.right
            continue
        }
        pre = cur.left
        while (pre.right !== null && pre.right !== cur) {
            pre = pre.right
        }
        if (pre.right === null) {
            pre.right = cur
            cur = cur.left
        } else {
            pre.right = null
            update(cur.val)
            cur = cur.right
        }
    }
}

/**
 * 404. 左叶子之和
 * 给定二叉树的根节点 root ，返回所有左叶子之和
 * root = [3,9,20,null,null,15,7]  输出: 24
 * 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
    /** 递归解题思路
     *  找到所有左叶子，当前节点没有子节点，并且当前节点是左节点
     */
    // let nums = 0
    // function crossTree(root, isLeft) {
    //     if (root === null) return
    //     crossTree(root.left, true)
    //     // 判断当前节点是叶子节点，怎么在这个基础上找到左叶子呢, 做法是传入一个表示，只有左子树遍历的时候才带上标识
    //     if (root.left === null && root.right === null && isLeft) {
    //         nums += root.val
    //     }
    //     crossTree(root.right, false)
    // }
    // crossTree(root, false)
    // return nums

    // 迭代解题思路，运用堆栈处理数据
    let nums = 0
    let nodeQueue = [root]
    while (nodeQueue.length) {
        const node = nodeQueue.shift()
        const leftNode = node.left
        if (leftNode !== null && leftNode.left === null && leftNode.right === null) {
            nums += leftNode.val
        }
        if (leftNode !== null) {
            nodeQueue.push(leftNode)
        }
        if (node.right !== null) {
            nodeQueue.push(node.right)
        }
    }
    return nums
}

/** 257. 二叉树的所有路径
 * 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径 >  叶子节点 是指没有子节点的节点
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    while (root.left || root.right) {}

    /** 递归解法，数组透传 */
    // const pathTotal = []
    // function crossTree(root, pathArray) {
    //     if (root === null) return
    //     pathArray.push(root.val)
    //     if (root.left === null && root.right === null) {
    //         pathTotal.push(pathArray)
    //         // 这里提前return 减少递归次数
    //         return
    //     }
    //     // 左右子树递归，由于每次递归都需要执行 [...pathArray]，无疑增加了耗时和内存的占用
    //     crossTree(root.left, [...pathArray])
    //     crossTree(root.right, [...pathArray])
    // }
    // crossTree(root, [])
    // return pathTotal.map((path) => {
    //     pathString = path.join('->')
    //     return pathString
    // })

    /** 递归解法，对象占位法，每次路径向下查找的时候，都对当前路径节点重新赋值，到最底路径时，将数据收集；要注意的时候，可以前一次路径比当前路径更长，所以要对column可用性判断 */
    // const pathTotal = []
    // const pathMap = {}
    // function crossTree(root, column) {
    //     if (root === null) return
    //     pathMap[column] = root.val + ''
    //     if (root.left === null && root.right === null) {
    //         let total = ''
    //         const columnList = Object.keys(pathMap)
    //         /**
    //          * 遍历二叉树的每一行，取出当前循环终点上每个节点的值
    //          * for循环效率更高，并且通过break及时跳出循环 */
    //         for (let i = 0; i < columnList.length; i++) {
    //             const columnItem = pathMap[columnList[i]]
    //             /** column可用性判断 */
    //             if (i > column) break
    //             total = total ? total + '->' + columnItem : columnItem
    //         }
    //         /** 下面这种循环由于无法使用break，多产生无效循环次数 */
    //         // const curColumn = Object.keys(pathMap).reduce((total, key, index) => {
    //         //     if(index > column) return;
    //         //     const columnNum = pathMap[key]
    //         //     // 直接拼接字符串，减少后续二次遍历循环成本
    //         //     return total ? total + '->' + columnNum : columnNum
    //         // }, '')
    //         pathTotal.push(total)
    //         // 这里提前return 减少递归次数
    //         return
    //     }
    //     crossTree(root.left, column + 1)
    //     crossTree(root.right, column + 1)
    // }
    // crossTree(root, 0)
    // return pathTotal

    /** 递归解法，对象占位法升级，在每次递归的时候，构建出对应路径的合并字符串 -> 接近官方最优解法 */
    // const pathTotal = []
    // const pathMap = {}
    // function crossTree(root, column) {
    //     if (root === null) return

    //     const prevColumn = pathMap[column - 1]
    //     if (prevColumn) {
    //         pathMap[column] = prevColumn + '->' + root.val
    //     } else {
    //         pathMap[column] = root.val + ''
    //     }

    //     if (root.left === null && root.right === null) {
    //         pathTotal.push(pathMap[column])
    //         // 这里提前return 减少递归次数
    //         return
    //     }
    //     crossTree(root.left, column + 1)
    //     crossTree(root.right, column + 1)
    // }
    // crossTree(root, 0)
    // return pathTotal

    /** 官方解法，直接传入path */
    const paths = []
    const construct_paths = (root, path) => {
        if (root) {
            path += root.val.toString()
            if (root.left === null && root.right === null) {
                // 当前节点是叶子节点
                paths.push(path) // 把路径加入到答案中
            } else {
                path += '->' // 当前节点不是叶子节点，继续递归遍历
                construct_paths(root.left, path)
                construct_paths(root.right, path)
            }
        }
    }
    construct_paths(root, '')
    return paths
}

/** 226. 翻转二叉树
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
 * 输入：root = [4,2,7,1,3,6,9]  输出：[4,7,2,9,6,3,1]
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    function crossTree(root) {
        if (root === null) return
        let newRoot = new TreeNode(root.val)
        newRoot.left = crossTree(root.right)
        newRoot.right = crossTree(root.left)
        return newRoot
    }
    return crossTree(root)

    /** 官方题解 */
    if (root === null) {
        return null
    }
    const left = invertTree(root.left)
    const right = invertTree(root.right)
    root.left = right
    root.right = left
    return root
}

/** 617. 合并二叉树
 * 给你两棵二叉树： root1 和 root2; 需要将这两棵树合并成一棵新二叉树。
 * 合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点
 * 合并过程必须从两个树的根节点开始
 */
var mergeTrees = function (root1, root2) {
    function crossTree(root1, root2) {
        if (root1 === null || root2 === null) {
            return root1 || root2
        }
        let root = new TreeNode(root1.val + root2.val)
        root.left = crossTree(root1.left, root2.left)
        root.right = crossTree(root1.right, root2.right)
        return root
    }
    return crossTree(root1, root2)
}

/**  572. 另一棵树的子树
 *   给你两棵二叉树 root 和 subRoot 。
 *   检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false
 *   二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树
 * 输入：root = [3,4,5,1,2], subRoot = [4,1,2] 输出：true
 *
 *   思路： 递归遍历两棵树，先假设是子树；如果有不同的部分，则说明非子树，否则是子树
 */
let isSub = true
var isSubtree = function (root, subRoot) {
    function isSameTrue(root, subRoot) {
        if (root === null && subRoot === null) return true
        if (root === null && subRoot !== null) return false
        if (root !== null && subRoot === null) return false
        if (root.val !== subRoot.val) return false
        return isSameTrue(root.left, subRoot.left) && isSameTrue(root.right, subRoot.right)
    }
    if (root === null && subRoot === null) return true
    if (root === null && subRoot !== null) return false
    /** 一棵树是另一棵树的子树，则满足以下条件之一：
     *  1. 这两棵树相等；
     *  2. 这个树是左数的子树；
     *  3. 这个树是右树的子树；
     */
    return isSameTrue(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}

/** 111. 二叉树的最小深度
 * 给定一个二叉树，找出其最小深度
 */
var minDepth = function (root) {
    if (root === null) return 0
    function findMin(root, deep) {
        if (root === null) return deep
        /** 子树为空需要过滤 */
        if (root.left === null && root.right !== null) {
            return findMin(root.right, deep + 1)
        }
        if (root.right === null && root.left !== null) {
            return findMin(root.left, deep + 1)
        }
        const leftDeep = findMin(root.left, deep + 1)
        const rightDeep = findMin(root.right, deep + 1)
        return Math.min(leftDeep, rightDeep)
    }
    return findMin(root, 0)
}

/** 110. 平衡二叉树
 * 给定一个二叉树，判断它是否是高度平衡的二叉树
 * 一棵高度平衡二叉树定义为 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 -> 深度差最大为1
 */
var isBalanced = function (root) {
    if (root === null) return true
    let flag = true
    // 构建递归函数
    function getDeep(root, deep) {
        if (root === null) return deep
        const leftDeep = getDeep(root.left, deep + 1)
        const rightDeep = getDeep(root.right, deep + 1)
        if (Math.abs(leftDeep - rightDeep) > 1 && flag) {
            flag = false
        }
        return Math.max(leftDeep, rightDeep)
    }
    return getDeep(root, 0) && flag
}

/** 108. 将有序数组转换为二叉搜索树
 * 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树
 * 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树
 * 输入：nums = [-10,-3,0,5,9] 输出：[0,-3,9,-10,null,5]
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    function createTree(nums, left, right) {
        if (left > right) return null
        const mid = left + Math.floor((right - left) / 2)
        let root = new TreeNode(nums[mid])
        root.left = createTree(nums, left, mid - 1)
        root.right = createTree(nums, mid + 1, right)
        return root
    }
    return createTree(nums, 0, nums.length - 1)
}

/** 面试题 17.12. BiNode
 * 二叉树数据结构TreeNode可用来表示单向链表（其中left置空，right为下一个链表节点）
 * 实现一个方法，把二叉搜索树转换为单向链表，要求依然符合二叉搜索树的性质，转换操作应是原址的，也就是在原始的二叉搜索树上直接修改。
 * 返回转换后的单向链表的头节点。
 * 输入： [4,2,5,1,3,null,6,0]
 * 输出： [0,null,1,null,2,null,3,null,4,null,5,null,6]
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBiNode = function (root) {
    if (root === null) return root
    let headNode = (head = new TreeNode(0))
    function crossTree(root) {
        if (root === null) {
            head.left = null
            return
        }
        crossTree(root.left)
        head.left = new TreeNode(root.val)
        head = head.left
        crossTree(root.right)
    }
    crossTree(root)
    return headNode.left
}

/** 145. 二叉树的前序遍历 —— 迭代法
 *  核心原理：构建调用栈，模拟递归实现
 */
var postorderTraversal = function (root) {
    // if (root === null) return []
    // let res = []
    // function crossTree(root) {
    //     if (root === null) return
    //     crossTree(root.left)
    //     crossTree(root.right)
    //     res.push(root.val)
    // }
    // crossTree(root)
    // return res

    /** 前序遍历 */
    // if (root === null) return []
    // let res = []
    // let stack = []
    // let node = root
    // while (stack.length || node !== null) {
    //     // 当前根节点处理
    //     if (node !== null) {
    //         res.push(node.val) // 前序遍历，root节点保存
    //         stack.push(node)
    //     }
    //     // 左子树遍历到null
    //     while (node !== null && node.left) {
    //         node = node.left
    //         res.push(node.val)
    //         stack.push(node)
    //     }

    //     // 回退一步
    //     node = stack.pop()
    //     node = node.right
    // }
    // return res

    /** 中序遍历 */
    // if (root === null) return []
    // let res = []
    // let stack = []
    // let node = root
    // while (stack.length || node !== null) {
    //     // 当前根节点处理
    //     if (node !== null) {
    //         stack.push(node)
    //     }
    //     // 左子树遍历到null
    //     while (node !== null && node.left) {
    //         node = node.left
    //         stack.push(node)
    //     }
    //     // 回退一步
    //     node = stack.pop()
    //     res.push(node.val)
    //     node = node.right
    // }
    // return res

    /** 后序遍历 */
    if (root === null) return []
    let res = []
    let stack = []
    let node = root
    let prev = null
    while (stack.length || node !== null) {
        if (node !== null) stack.push(node)
        while (node !== null && node.left) {
            node = node.left
            stack.push(node)
        }
        // 回退一步
        node = stack.pop()
        if (node.right == null || node.right === prev) {
            /** 右节点为空或者为右节点出栈节点 */
            res.push(node.val)
            prev = node
            node = null // 重置node节点为空，跳过循环内if,while判断
        } else {
            stack.push(node) // 右节点不为空，将当前子节点压回入栈
            node = node.right
        }
    }
    return res
}
