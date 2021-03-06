import { ListNode } from '../utils/linked-list';

function getVal(node: ListNode | null) {
  return node ? node.val : 0;
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null) {
  const resHeadNode = new ListNode(0);
  let lastCarry = 0; // 上一位数的进位值
  let tailNode = resHeadNode;

  while (l1 || l2) {
    const val1 = getVal(l1); // 当前位数值
    const val2 = getVal(l2);
    const tempSum = val1 + val2 + lastCarry;
    lastCarry = Math.floor(tempSum / 10); // 新的进位

    tailNode.next = new ListNode(tempSum % 10); // 个位

    tailNode = tailNode.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  if (lastCarry) {
    tailNode.next = new ListNode(lastCarry);
  }
  return resHeadNode.next;
}

export default addTwoNumbers;
