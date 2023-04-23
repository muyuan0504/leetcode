/** 功能性题目，以解决问题为出发点 */

// 69. x 的平方根
/**给你一个非负整数 x ，计算并返回 x 的 算术平方根
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去
 * 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    let res = 0
    while (x > 2) {
        x = x / 2
        res++
    }
    return res
}

// 67. 二进制求和
/**给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和
 * 输入:a = "11", b = "1" 输出："100"
 * 输入：a = "1010", b = "1011" 输出："10101"
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    const minLen = Math.min(a.length, b.length)
    let minNum = a.length === minLen ? a : b
    const maxNum = a.length === minLen ? b : a
    const targetNum = maxNum.length - minNum.length
    let tempArray = new Array(targetNum).fill(0)
    let numArray = minNum.split('')
    numArray.unshift(...tempArray)
    minNum = numArray.join('')
    let last = 0,
        res = [] // 余数
    for (let i = maxNum.length - 1; i >= 0; i--) {
        const num1 = parseInt(maxNum[i]),
            num2 = parseInt(minNum[i]),
            count = num1 + num2 + last
        if (count > 1) {
            res.unshift(count - 2)
            last = 1
        } else {
            res.unshift(num1 || num2 || last)
            last = 0
        }
    }
    if (last) res.unshift(last)
    return res.join('')
}

// 58. 最后一个单词的长度
/**
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    // api解决
    // const strArray = s.trim().split(' ')
    // return strArray[strArray.length - 1].length

    // 效率最高
    s = s.trim()
    if (s.length < 2) return s.length
    let len = 0
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ' ') {
            if (!len) {
                continue
            } else {
                return len
            }
        }
        len++
    }
    return len
}

// 35. 搜索插入位置
/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置
 * @param {number[]} nums nums 为 无重复元素 的 升序 排列数组
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    const len = nums.length
    // if (target < nums[0]) return 0
    // if (target > nums[len - 1]) return len

    // const getIdx = nums.indexOf(target)
    // if (getIdx > -1) return getIdx
    // let len = nums.length
    // for (let i = 0; i < len; i++) {
    //     if (nums[i] > target && nums[i - 1] < target) {
    //         return i
    //     }
    // }
    // if (nums[len - 1] < target) return len
    // return 0

    // 二分法
    let left = 0,
        right = len - 1
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (nums[mid] > target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        } else {
            return mid
        }
    }
    return right + 1
}

// 27. 移除元素
/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
 * 输入：nums = [0,1,2,2,3,0,4,2], val = 2
 * 输出：5, nums = [0,1,4,0,3] 这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    if (!nums.length) return nums.length
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] === val) {
    //         nums[i].splice(i, 0)
    //     }
    // }
    // return nums.length

    // 不删除旧元素的做法, 这里其实也是利用了双指针的思想
    // let newIndex = 0
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] !== val) {
    //         nums[newIndex++] = nums[i] // 用正确的值覆盖下标
    //     }
    // }
    // return newIndex

    // 双指针优化,左指针只保留常规数，当左指针
    let left = 0,
        right = nums.length - 1
    // while (left <= right) {
    //     if (nums[right] === val) {
    //         right--
    //     } else if (nums[left] === val) {
    //         nums[left] = nums[right]
    //         left++
    //         right--
    //     } else {
    //         left++
    //     }
    // }
    while (left <= right) {
        if (nums[left] === val) {
            nums[left] = nums[right]
            right-- // 这里left不动是为了在下一轮验证交换过来的nums[right]的合法性
        } else {
            left++
        }
    }
    return left
}

// 13. 罗马数字转整数
/**
 * @param {string} s
 * @return {number}
 * I=1， V=5， X=10， L=50，C=100，D=500 和 M=1000
 * I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9
 * X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90
 * C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900
 * 给定一个罗马数字，将其转换成整数
 */
var romanToInt = function (s) {
    let res = 0,
        idx = 0
    const numMap = { I: 1, IV: 4, IX: 9, V: 5, X: 10, L: 50, XL: 40, XC: 90, C: 100, CD: 400, CM: 900, D: 500, M: 1000 }
    if (s.length < 2) return numMap[s]
    while (s[idx]) {
        const curNum = s[idx]
        const nextNum = s[idx + 1]
        if (curNum === 'I') {
            if (nextNum && ['V', 'X'].includes(nextNum)) {
                res += numMap[curNum + nextNum]
                idx += 2
            } else {
                res += numMap[curNum]
                idx++
            }
        } else if (curNum === 'X') {
            if (nextNum && ['L', 'C'].includes(nextNum)) {
                res += numMap[curNum + nextNum]
                idx += 2
            } else {
                res += numMap[curNum]
                idx++
            }
        } else if (curNum === 'C') {
            if (nextNum && ['D', 'M'].includes(nextNum)) {
                res += numMap[curNum + nextNum]
                idx += 2
            } else {
                res += numMap[curNum]
                idx++
            }
        } else {
            res += numMap[curNum]
            idx++
        }
    }
    return res
}
