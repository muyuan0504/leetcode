/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

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