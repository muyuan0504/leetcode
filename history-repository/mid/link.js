/** 相交链表 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null
 * 注意，函数返回结果后，链表必须 保持其原始结构
 * 题目数据 保证 整个链式结构中不存在环
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let curHeadA = headA;
    let curHeadB = headB;
    while(curHeadA || curHeadB) {
        curHeadA
    }
};

/** 奇偶链表
 * 给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表
 * 第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推
 * 你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题
 *
 * 输入: head = [1,2,3,4,5]
 * 输出: [1,3,5,2,4]
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
    if (head === null || head.next === null) {
        return head;
    }
    let oddHead = head; // 奇数链表的头节点
    let oddCur = oddHead; // 奇数链表的当前节点
    let evenHead = head.next; // 偶数链表的头结点
    let evenCur = evenHead; // 偶数链表的当前节点
    while (evenCur !== null && evenCur.next !== null) {
        oddCur.next = oddCur.next.next;
        evenCur.next = evenCur.next.next;
        // 奇偶指针往后移
        oddCur = oddCur.next;
        evenCur = evenCur.next;
    }
    oddCur.next = evenHead;
    return oddHead;
};

//
//
/**两数相加
 * 
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 
你可以假设除了数字 0 之外，这两个数都不会以 0 开头
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807.
 * 
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 * 
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
 * 
 * @param {ListNode} l1
 * @param {ListNode} l2
 * 0 <= Node.val <= 9
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    /** 执行用时： 196 ms , 在所有 JavaScript 提交中击败了 5.06% 的用户
     * 内存消耗： 50.5 MB , 在所有 JavaScript 提交中击败了 5.01% 的用户
     */
    //  const initNode = new ListNode(0);
    //  let curNode = initNode;
    //  let restNum = 0;
    // let left = l1;
    // let right = l2;
    // while (left || right) {
    //     const sum = (left?.val || 0) + (right?.val || 0) + restNum;
    //     if (sum < 10) {
    //         restNum = 0;
    //         curNode.val = sum;
    //     } else {
    //         restNum = 1;
    //         curNode.val = sum - 10;
    //     }
    //     left = left?.next;
    //     right = right?.next;
    //     if (left || right) {
    //         curNode.next = new ListNode(0);
    //         curNode = curNode.next;
    //     }
    // }
    // if (restNum) {
    //     curNode.next = new ListNode(restNum);
    // }

    /** 方法2 */
    const initNode = new ListNode(0);
    let curNode = initNode;
    let restNum = 0;
    while (l1 !== null || l2 !== null || restNum) {
        let carry = restNum;
        if (l1 !== null) {
            carry += l1.val;
            l1 = l1.next;
        }
        if (l2 !== null) {
            carry += l2.val;
            l2 = l2.next;
        }
        restNum = carry > 9 ? 1 : 0;
        curNode.next = new ListNode(carry % 10);
        curNode = curNode.next;
    }
    return initNode.next;
};
